from pydantic import BaseModel, Field
from typing import Optional, List

# --- Sub-Schemas for SiteContent JSONB ---

class HeroBannerContent(BaseModel):
    title: str
    subtitle: str
    image_url: Optional[str] = None

class StoreHoursContent(BaseModel):
    mon_fri: str = Field(..., description="e.g. 10:00 AM - 10:00 PM")
    sat_sun: str
    closed_on: Optional[str] = None

class ReservationCTAContent(BaseModel):
    heading: str
    button_text: str

# --- Schemas for Team Members / Chefs ---

class TeamMemberBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    role: str = Field(..., min_length=1, max_length=200)
    bio: Optional[str] = None
    image_url: Optional[str] = None
    display_order: int = 0
    is_active: bool = True

class TeamMemberCreate(TeamMemberBase):
    pass

class TeamMemberUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    role: Optional[str] = Field(None, min_length=1, max_length=200)
    bio: Optional[str] = None
    image_url: Optional[str] = None
    display_order: Optional[int] = None
    is_active: Optional[bool] = None

class TeamMemberResponse(TeamMemberBase):
    id: int

    class Config:
        from_attributes = True

class TeamMemberBulkItem(BaseModel):
    id: Optional[int] = None
    name: str = Field(..., min_length=1, max_length=200)
    role: str = Field(..., min_length=1, max_length=200)
    bio: Optional[str] = None
    image_url: Optional[str] = None
    display_order: int = 0
    is_active: bool = True
