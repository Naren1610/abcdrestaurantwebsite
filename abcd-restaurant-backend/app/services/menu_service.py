from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from sqlalchemy import or_, func
from fastapi import HTTPException
from app.models.menu import Category, MenuItem
from app.services.cloudinary_service import delete_image_from_url
from app.schemas.menu import CategoryCreate, CategoryUpdate, MenuItemCreate, MenuItemUpdate, BulkDelete, BulkReorder
from app.schemas.common import PaginatedResponse, PaginationParams
import math

class MenuService:
    # --- Category Logic ---
    async def get_category_by_id(self, db: AsyncSession, category_id: int):
        db_category = await db.get(Category, category_id)
        if not db_category:
            raise HTTPException(status_code=404, detail="Category not found")
        return db_category

    async def get_all_categories(
        self, 
        db: AsyncSession, 
        params: PaginationParams,
        search: str | None = None
    ):
        query = select(Category)
        
        if search:
            query = query.filter(Category.name.ilike(f"%{search}%"))
            
        # Get total count
        count_query = select(func.count()).select_from(query.subquery())
        total_result = await db.execute(count_query)
        total = total_result.scalar() or 0
        
        # Add pagination and ordering
        query = query.order_by(Category.display_order).offset((params.page - 1) * params.size).limit(params.size)
        result = await db.execute(query)
        items = result.scalars().all()
        
        pages = math.ceil(total / params.size) if params.size > 0 else 0
        return PaginatedResponse(
            items=items,
            total=total,
            page=params.page,
            size=params.size,
            pages=pages
        )

    async def create_category(self, db: AsyncSession, category_in: CategoryCreate):
        db_category = Category(**category_in.model_dump())
        db.add(db_category)
        try:
            await db.commit()
            await db.refresh(db_category)
            return db_category
        except Exception:
            await db.rollback()
            raise HTTPException(status_code=400, detail="Category with this name may already exist.")

    async def update_category(self, db: AsyncSession, category_id: int, category_in: CategoryUpdate):
        db_category = await db.get(Category, category_id)
        if not db_category:
            raise HTTPException(status_code=404, detail="Category not found")
        
        update_data = category_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_category, key, value)
            
        await db.commit()
        await db.refresh(db_category)
        return db_category

    async def delete_category(self, db: AsyncSession, category_id: int):
        db_category = await db.get(Category, category_id)
        if not db_category:
            raise HTTPException(status_code=404, detail="Category not found")
        
        await db.delete(db_category)
        await db.commit()
        return {"message": "Category deleted successfully"}

    async def bulk_delete_categories(self, db: AsyncSession, payload: BulkDelete):
        query = select(Category).filter(Category.id.in_(payload.ids))
        result = await db.execute(query)
        categories = result.scalars().all()
        for cat in categories:
            await db.delete(cat)
        await db.commit()
        return {"message": f"Successfully deleted {len(categories)} categories"}

    async def bulk_reorder_categories(self, db: AsyncSession, payload: BulkReorder):
        for item in payload.items:
            db_category = await db.get(Category, item.id)
            if db_category:
                db_category.display_order = item.display_order
        await db.commit()
        return {"message": "Categories reordered successfully"}

    # --- MenuItem Logic ---
    async def get_menu_item_by_id(self, db: AsyncSession, item_id: int):
        query = select(MenuItem).options(selectinload(MenuItem.category)).filter(MenuItem.id == item_id)
        result = await db.execute(query)
        db_item = result.scalar_one_or_none()
        if not db_item:
            raise HTTPException(status_code=404, detail="MenuItem not found")
        return db_item

    async def get_all_menu_items(
        self, 
        db: AsyncSession,
        params: PaginationParams,
        search: str | None = None,
        category_id: int | None = None,
        is_vegetarian: bool | None = None,
        is_spicy: bool | None = None
    ):
        query = select(MenuItem).options(selectinload(MenuItem.category))
        
        if search:
            query = query.filter(
                or_(
                    MenuItem.name.ilike(f"%{search}%"),
                    MenuItem.description.ilike(f"%{search}%")
                )
            )
        if category_id is not None:
            query = query.filter(MenuItem.category_id == category_id)
        if is_vegetarian is not None:
            query = query.filter(MenuItem.is_veg == is_vegetarian)
        if is_spicy is not None:
            query = query.filter(MenuItem.is_spicy == is_spicy)
            
        count_query = select(func.count()).select_from(query.subquery())
        total_result = await db.execute(count_query)
        total = total_result.scalar() or 0
        
        query = query.order_by(MenuItem.display_order).offset((params.page - 1) * params.size).limit(params.size)
        result = await db.execute(query)
        items = result.scalars().all()
        
        pages = math.ceil(total / params.size) if params.size > 0 else 0
        return PaginatedResponse(
            items=items,
            total=total,
            page=params.page,
            size=params.size,
            pages=pages
        )

    async def create_menu_item(self, db: AsyncSession, item_in: MenuItemCreate):
        category = await db.get(Category, item_in.category_id)
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")
            
        # Check for duplicates (case-insensitive, trimmed)
        dup_query = select(MenuItem).filter(
            MenuItem.category_id == item_in.category_id,
            func.lower(func.trim(MenuItem.name)) == item_in.name.strip().lower()
        )
        dup_result = await db.execute(dup_query)
        if dup_result.scalar_one_or_none():
            raise HTTPException(status_code=400, detail="A menu item with this name already exists in this category.")
            
        data = item_in.model_dump()
        if data.get('image_url'):
            data['image_url'] = str(data['image_url'])

        db_item = MenuItem(**data)
        db.add(db_item)
        await db.commit()
        await db.refresh(db_item)
        await db.refresh(db_item, ['category'])
        return db_item

    async def update_menu_item(self, db: AsyncSession, item_id: int, item_in: MenuItemUpdate):
        query = select(MenuItem).options(selectinload(MenuItem.category)).filter(MenuItem.id == item_id)
        result = await db.execute(query)
        db_item = result.scalar_one_or_none()
        
        if not db_item:
            raise HTTPException(status_code=404, detail="MenuItem not found")
            
        if item_in.category_id:
            category = await db.get(Category, item_in.category_id)
            if not category:
                raise HTTPException(status_code=404, detail="Category not found")
                
        update_data = item_in.model_dump(exclude_unset=True)
        
        # Check for duplicates if name or category changes
        new_name = update_data.get('name', db_item.name)
        new_cat_id = update_data.get('category_id', db_item.category_id)
        
        if 'name' in update_data or 'category_id' in update_data:
            dup_query = select(MenuItem).filter(
                MenuItem.id != item_id,
                MenuItem.category_id == new_cat_id,
                func.lower(func.trim(MenuItem.name)) == new_name.strip().lower()
            )
            dup_result = await db.execute(dup_query)
            if dup_result.scalar_one_or_none():
                raise HTTPException(status_code=400, detail="A menu item with this name already exists in this category.")
        
        if 'image_url' in update_data and update_data['image_url'] is not None:
            update_data['image_url'] = str(update_data['image_url'])
            if db_item.image_url and db_item.image_url != update_data['image_url']:
                delete_image_from_url(db_item.image_url)
            
        for key, value in update_data.items():
            setattr(db_item, key, value)
            
        await db.commit()
        await db.refresh(db_item)
        return db_item

    async def delete_menu_item(self, db: AsyncSession, item_id: int):
        db_item = await db.get(MenuItem, item_id)
        if not db_item:
            raise HTTPException(status_code=404, detail="MenuItem not found")
            
        if db_item.image_url:
            delete_image_from_url(db_item.image_url)
            
        await db.delete(db_item)
        await db.commit()
        return {"message": "MenuItem deleted successfully"}

    async def bulk_delete_menu_items(self, db: AsyncSession, payload: BulkDelete):
        query = select(MenuItem).filter(MenuItem.id.in_(payload.ids))
        result = await db.execute(query)
        items = result.scalars().all()
        for item in items:
            if item.image_url:
                delete_image_from_url(item.image_url)
            await db.delete(item)
        await db.commit()
        return {"message": f"Successfully deleted {len(items)} menu items"}

    async def bulk_reorder_menu_items(self, db: AsyncSession, payload: BulkReorder):
        for item in payload.items:
            db_item = await db.get(MenuItem, item.id)
            if db_item:
                db_item.display_order = item.display_order
        await db.commit()
        return {"message": "Menu items reordered successfully"}


    async def get_client_menu(self, db: AsyncSession):
        import re
        from collections import defaultdict
        
        cat_query = select(Category).order_by(Category.display_order)
        cat_result = await db.execute(cat_query)
        categories = cat_result.scalars().all()
        
        item_query = select(MenuItem).filter(MenuItem.is_active == True).order_by(MenuItem.display_order)
        item_result = await db.execute(item_query)
        items = item_result.scalars().all()
        
        grouped_items = defaultdict(list)
        for item in items:
            tags = []
            if item.is_veg:
                tags.append("veg")
            else:
                tags.append("non-veg")
            if item.is_spicy:
                tags.append("spicy")
                
            client_item = {
                "id": str(item.id),
                "name": item.name,
                "description": item.description,
                "price": item.price,
                "image": item.image_url,
                "tags": tags,
                "isChefPick": item.is_chef_special
            }
            grouped_items[item.category_id].append(client_item)
            
        result = []
        for cat in categories:
            slug = re.sub(r'[^a-z0-9]+', '-', cat.name.lower()).strip('-')
            cat_items = grouped_items.get(cat.id, [])
            if cat_items:
                result.append({
                    "id": slug,
                    "title": cat.name,
                    "subtitle": cat.subtitle,
                    "items": cat_items
                })
                
        return result


menu_service = MenuService()
