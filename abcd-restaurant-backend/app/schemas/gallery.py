from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# Category Schemas
class GalleryCategoryBase(BaseModel):
    name: str
    display_order: Optional[int] = 0
    is_active: Optional[bool] = True

class GalleryCategoryCreate(GalleryCategoryBase):
    pass

class GalleryCategoryUpdate(BaseModel):
    name: Optional[str] = None
    display_order: Optional[int] = None
    is_active: Optional[bool] = None

class GalleryCategoryResponse(GalleryCategoryBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Image Schemas
class GalleryImageBase(BaseModel):
    category_id: int
    title: Optional[str] = None
    image_url: str
    is_top_pick: Optional[bool] = False
    caption: Optional[str] = None

class GalleryImageCreate(GalleryImageBase):
    pass

class GalleryImageUpdate(BaseModel):
    category_id: Optional[int] = None
    title: Optional[str] = None
    image_url: Optional[str] = None
    is_top_pick: Optional[bool] = None
    caption: Optional[str] = None

class GalleryImageResponse(GalleryImageBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class GalleryCategoryReorder(BaseModel):
    id: int
    display_order: int


# --- Client (BFF) Schemas ---
class ClientGalleryImage(BaseModel):
    id: int
    image_url: str
    title: str
    category_name: str

class ClientGalleryResponse(BaseModel):
    categories: List[str]
    images: List[ClientGalleryImage]
