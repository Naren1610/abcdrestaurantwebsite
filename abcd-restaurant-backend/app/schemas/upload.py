from pydantic import BaseModel, Field

class UploadSignatureRequest(BaseModel):
    entity_type: str = Field(..., description="E.g., 'menu', 'team', 'gallery', 'content'")
    entity_name: str = Field(..., description="E.g., 'Butter Chicken'")

class UploadSignatureResponse(BaseModel):
    signature: str
    timestamp: int
    cloud_name: str
    api_key: str
    folder: str
    public_id: str
