from pydantic import BaseModel, HttpUrl, EmailStr
from typing import List, Optional

class SocialLinkBase(BaseModel):
    platform: str
    url: str

class SocialLinkCreate(SocialLinkBase):
    pass

class SocialLinkResponse(SocialLinkBase):
    id: int

    class Config:
        from_attributes = True

class OperatingHourBase(BaseModel):
    day: str
    hours: str
    
    

class OperatingHourCreate(OperatingHourBase):
    pass

class OperatingHourResponse(OperatingHourBase):
    id: int

    class Config:
        from_attributes = True

class GlobalSettingsBase(BaseModel):
    email: EmailStr
    phone: str
    address: str
    map_url: Optional[str] = None

class GlobalSettingsCreate(GlobalSettingsBase):
    social_links: List[SocialLinkCreate] = []
    operating_hours: List[OperatingHourCreate] = []

class GlobalSettingsResponse(GlobalSettingsBase):
    id: int
    social_links: List[SocialLinkResponse] = []
    operating_hours: List[OperatingHourResponse] = []

    class Config:
        from_attributes = True
