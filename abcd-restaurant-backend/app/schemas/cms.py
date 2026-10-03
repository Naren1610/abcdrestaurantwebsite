from pydantic import BaseModel, Field, HttpUrl
from typing import Optional, Union, Literal

# --- Sub-Schemas for SiteContent JSONB ---

class HeroBannerContent(BaseModel):
    title: str
    subtitle: str
    image_url: HttpUrl

class StoreHoursContent(BaseModel):
    mon_fri: str = Field(..., description="e.g. 10:00 AM - 10:00 PM")
    sat_sun: str
    closed_on: Optional[str] = None

class ReservationCTAContent(BaseModel):
    heading: str
    button_text: str

# Use a discriminated union or custom validator at the route level to enforce this.
# e.g., if key == 'home_hero', validate against HeroBannerContent.

# --- Response/Create Schemas for Collections ---

class TeamMemberBase(BaseModel):
    name: str
    role: str
    bio: Optional[str] = None
    image_url: Optional[HttpUrl] = None
    display_order: int = 0
    is_active: bool = True

class TeamMemberCreate(TeamMemberBase):
    pass

class TeamMemberResponse(TeamMemberBase):
    id: int

    class Config:
        from_attributes = True
