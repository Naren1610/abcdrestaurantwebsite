from typing import List, Optional
import math
from fastapi import APIRouter, Query
from fastapi import Depends, HTTPException, status
from app.schemas.common import PaginatedResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database.session import get_db
from app.models.gallery import GalleryCategory, GalleryImage
from app.schemas.gallery import (
    ClientGalleryTopPick,
    ClientGalleryResponse, ClientGalleryImage,
    GalleryCategoryCreate, GalleryCategoryUpdate, GalleryCategoryResponse, GalleryCategoryReorder,
    GalleryImageCreate, GalleryImageUpdate, GalleryImageResponse
)

router = APIRouter()


@router.get("/top-picks", response_model=List[ClientGalleryTopPick])
async def get_gallery_top_picks(db: AsyncSession = Depends(get_db)):
    stmt = (
        select(GalleryImage)
        .filter(GalleryImage.is_top_pick == True)
        .order_by(GalleryImage.created_at.desc())
        .limit(4)
    )
    result = await db.execute(stmt)
    return result.scalars().all()


@router.get("/client", response_model=ClientGalleryResponse)
async def get_client_gallery(db: AsyncSession = Depends(get_db)):
    from sqlalchemy.orm import selectinload
    
    # Fetch all active categories ordered by display_order
    cat_stmt = select(GalleryCategory).filter(GalleryCategory.is_active == True).order_by(GalleryCategory.display_order)
    cat_result = await db.execute(cat_stmt)
    categories = cat_result.scalars().all()
    category_names = [cat.name for cat in categories]
    
    # Fetch all images
    img_stmt = select(GalleryImage).options(selectinload(GalleryImage.category)).order_by(GalleryImage.created_at.desc())
    img_result = await db.execute(img_stmt)
    images = img_result.scalars().all()
    
    active_cat_names = set(category_names)
    
    client_images = []
    for img in images:
        cat_name = img.category.name if img.category else "Other"
        if cat_name in active_cat_names:
            client_images.append({
                "id": img.id,
                "image_url": img.image_url,
                "title": img.title or img.caption or "Gallery Image",
                "category_name": cat_name
            })
            
    return {
        "categories": category_names,
        "images": client_images
    }

# --- Categories ---

@router.get("/categories", response_model=PaginatedResponse[GalleryCategoryResponse])
async def get_categories(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    db: AsyncSession = Depends(get_db)
):
    # Get total count
    from sqlalchemy import func
    total = await db.scalar(select(func.count()).select_from(GalleryCategory))
    
    # Get paginated data
    stmt = select(GalleryCategory).order_by(GalleryCategory.display_order).offset((page - 1) * size).limit(size)
    result = await db.execute(stmt)
    items = result.scalars().all()
    
    return {
        "items": items,
        "total": total,
        "page": page,
        "size": size,
        "pages": math.ceil(total / size) if total > 0 else 0
    }

@router.post("/categories", response_model=GalleryCategoryResponse, status_code=status.HTTP_201_CREATED)
async def create_category(category_in: GalleryCategoryCreate, db: AsyncSession = Depends(get_db)):
    db_obj = GalleryCategory(**category_in.model_dump())
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

@router.put("/categories/{category_id}", response_model=GalleryCategoryResponse)
async def update_category(category_id: int, category_in: GalleryCategoryUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(GalleryCategory).filter(GalleryCategory.id == category_id))
    db_obj = result.scalars().first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Category not found")
    
    update_data = category_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_obj, field, value)
        
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

@router.delete("/categories/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_category(category_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(GalleryCategory).filter(GalleryCategory.id == category_id))
    db_obj = result.scalars().first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Category not found")
    
    await db.delete(db_obj)
    await db.commit()

@router.patch("/categories/reorder", status_code=status.HTTP_200_OK)
async def reorder_categories(items: List[GalleryCategoryReorder], db: AsyncSession = Depends(get_db)):
    for item in items:
        result = await db.execute(select(GalleryCategory).filter(GalleryCategory.id == item.id))
        db_obj = result.scalars().first()
        if db_obj:
            db_obj.display_order = item.display_order
    await db.commit()
    return {"message": "Categories reordered successfully"}

# --- Images ---

@router.get("/images", response_model=PaginatedResponse[GalleryImageResponse])
async def get_images(
    category_id: Optional[int] = None, 
    is_top_pick: Optional[bool] = None,
    page: int = Query(1, ge=1),
    size: int = Query(12, ge=1, le=100),
    db: AsyncSession = Depends(get_db)
):
    from sqlalchemy import func
    
    # Base statement for count and data
    base_stmt = select(GalleryImage)
    if category_id:
        base_stmt = base_stmt.filter(GalleryImage.category_id == category_id)
    if is_top_pick is not None:
        base_stmt = base_stmt.filter(GalleryImage.is_top_pick == is_top_pick)
        
    # Get total count
    count_stmt = select(func.count()).select_from(base_stmt.subquery())
    total = await db.scalar(count_stmt)
    
    # Get paginated data
    stmt = base_stmt.order_by(GalleryImage.created_at.desc()).offset((page - 1) * size).limit(size)
    result = await db.execute(stmt)
    items = result.scalars().all()
    
    return {
        "items": items,
        "total": total,
        "page": page,
        "size": size,
        "pages": math.ceil(total / size) if total > 0 else 0
    }

@router.post("/images", response_model=GalleryImageResponse, status_code=status.HTTP_201_CREATED)
async def create_image(image_in: GalleryImageCreate, db: AsyncSession = Depends(get_db)):
    db_obj = GalleryImage(**image_in.model_dump())
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

@router.put("/images/{image_id}", response_model=GalleryImageResponse)
async def update_image(image_id: int, image_in: GalleryImageUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(GalleryImage).filter(GalleryImage.id == image_id))
    db_obj = result.scalars().first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Image not found")
    
    update_data = image_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_obj, field, value)
        
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

@router.delete("/images/{image_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_image(image_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(GalleryImage).filter(GalleryImage.id == image_id))
    db_obj = result.scalars().first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Image not found")
    
    await db.delete(db_obj)
    await db.commit()


@router.get("/images/{image_id}", response_model=GalleryImageResponse)
async def get_image(image_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(GalleryImage).filter(GalleryImage.id == image_id))
    db_obj = result.scalars().first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Image not found")
    return db_obj
