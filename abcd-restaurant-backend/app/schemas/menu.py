from pydantic import BaseModel, Field, HttpUrl
from typing import Optional, List

# --- Category Schemas ---
class CategoryBase(BaseModel):
    name: str = Field(..., max_length=100)
    subtitle: Optional[str] = Field(None, max_length=200)
    display_order: int = 0

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=100)
    subtitle: Optional[str] = Field(None, max_length=200)
    display_order: Optional[int] = None

class CategoryResponse(CategoryBase):
    id: int

    class Config:
        from_attributes = True

# --- MenuItem Schemas ---
class MenuItemBase(BaseModel):
    name: str = Field(..., max_length=200)
    description: Optional[str] = None
    price: float = Field(..., gt=0)
    image_url: Optional[str] = None
    is_veg: bool = False
    is_spicy: bool = False
    is_chef_special: bool = False
    is_active: bool = True
    display_order: int = 0
    category_id: int

class MenuItemCreate(MenuItemBase):
    pass

class MenuItemUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=200)
    description: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    image_url: str
    is_veg: Optional[bool] = None
    is_spicy: Optional[bool] = None
    is_chef_special: Optional[bool] = None
    is_active: Optional[bool] = None
    display_order: Optional[int] = None
    category_id: Optional[int] = None

class MenuItemResponse(MenuItemBase):
    id: int
    category: Optional[CategoryResponse] = None

    class Config:
        from_attributes = True

# --- Bulk Action Schemas ---
class BulkDelete(BaseModel):
    ids: List[int]

class ReorderItem(BaseModel):
    id: int
    display_order: int

class BulkReorder(BaseModel):
    items: List[ReorderItem]


# --- Client (BFF) Schemas ---
class ClientMenuItemResponse(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    price: float
    image: Optional[str] = None
    tags: List[str]
    isChefPick: bool

class ClientMenuCategoryResponse(BaseModel):
    id: str
    title: str
    subtitle: Optional[str] = None
    items: List[ClientMenuItemResponse]

