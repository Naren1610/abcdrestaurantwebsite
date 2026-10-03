from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.session import get_db
from app.schemas.menu import CategoryCreate, CategoryUpdate, CategoryResponse, MenuItemCreate, MenuItemUpdate, MenuItemResponse, BulkDelete, BulkReorder
from app.schemas.common import PaginatedResponse, PaginationParams
from app.services.menu_service import menu_service

# from app.api.dependencies import get_current_active_admin

router = APIRouter()

# --- Categories ---
@router.get("/categories/{category_id}", response_model=CategoryResponse)
async def get_category(category_id: int, db: AsyncSession = Depends(get_db)):
    return await menu_service.get_category_by_id(db, category_id)

@router.get("/categories", response_model=PaginatedResponse[CategoryResponse])
async def get_categories(
    params: PaginationParams = Depends(),
    search: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    return await menu_service.get_all_categories(db, params=params, search=search)

@router.post("/categories", response_model=CategoryResponse)
async def create_category(category_in: CategoryCreate, db: AsyncSession = Depends(get_db)):
    return await menu_service.create_category(db, category_in)

@router.put("/categories/{category_id}", response_model=CategoryResponse)
async def update_category(category_id: int, category_in: CategoryUpdate, db: AsyncSession = Depends(get_db)):
    return await menu_service.update_category(db, category_id, category_in)

@router.delete("/categories/bulk")
async def bulk_delete_categories(payload: BulkDelete, db: AsyncSession = Depends(get_db)):
    return await menu_service.bulk_delete_categories(db, payload)

@router.patch("/categories/reorder")
async def bulk_reorder_categories(payload: BulkReorder, db: AsyncSession = Depends(get_db)):
    return await menu_service.bulk_reorder_categories(db, payload)

@router.delete("/categories/{category_id}")
async def delete_category(category_id: int, db: AsyncSession = Depends(get_db)):
    return await menu_service.delete_category(db, category_id)

# --- Menu Items ---
@router.get("/items/{item_id}", response_model=MenuItemResponse)
async def get_menu_item(item_id: int, db: AsyncSession = Depends(get_db)):
    return await menu_service.get_menu_item_by_id(db, item_id)

@router.get("/items", response_model=PaginatedResponse[MenuItemResponse])
async def get_menu_items(
    params: PaginationParams = Depends(),
    search: Optional[str] = None,
    category_id: Optional[int] = Query(None),
    is_vegetarian: Optional[bool] = Query(None),
    is_spicy: Optional[bool] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    return await menu_service.get_all_menu_items(
        db, 
        params=params, 
        search=search, 
        category_id=category_id, 
        is_vegetarian=is_vegetarian, 
        is_spicy=is_spicy
    )

@router.post("/items", response_model=MenuItemResponse)
async def create_menu_item(item_in: MenuItemCreate, db: AsyncSession = Depends(get_db)):
    return await menu_service.create_menu_item(db, item_in)

@router.put("/items/{item_id}", response_model=MenuItemResponse)
async def update_menu_item(item_id: int, item_in: MenuItemUpdate, db: AsyncSession = Depends(get_db)):
    return await menu_service.update_menu_item(db, item_id, item_in)

@router.delete("/items/bulk")
async def bulk_delete_menu_items(payload: BulkDelete, db: AsyncSession = Depends(get_db)):
    return await menu_service.bulk_delete_menu_items(db, payload)

@router.patch("/items/reorder")
async def bulk_reorder_menu_items(payload: BulkReorder, db: AsyncSession = Depends(get_db)):
    return await menu_service.bulk_reorder_menu_items(db, payload)

@router.delete("/items/{item_id}")
async def delete_menu_item(item_id: int, db: AsyncSession = Depends(get_db)):
    return await menu_service.delete_menu_item(db, item_id)
