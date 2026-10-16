import re
from uuid import uuid4
from fastapi import APIRouter, HTTPException, Depends
from app.schemas.upload import UploadSignatureRequest, UploadSignatureResponse
from app.services.cloudinary_service import generate_upload_signature

# Add authentication dependency later once CMS auth is built
# from app.api.dependencies import get_current_active_admin

router = APIRouter()

ALLOWED_FOLDERS = {
    "menu": "abcd-restaurant/menu",
    "team": "abcd-restaurant/cms/team",
    "gallery": "abcd-restaurant/cms/gallery",
    "content": "abcd-restaurant/cms/content",
}

def slugify(text: str) -> str:
    # Convert to lowercase, replace spaces with hyphens, remove non-alphanumerics
    text = text.lower().strip()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text)
    return text

@router.post("/signature", response_model=UploadSignatureResponse)
async def get_cloudinary_signature(
    request: UploadSignatureRequest,
    # current_user = Depends(get_current_active_admin)
):
    if request.entity_type not in ALLOWED_FOLDERS:
        raise HTTPException(status_code=400, detail="Invalid entity_type for upload.")
    
    folder = ALLOWED_FOLDERS[request.entity_type]
    
    # Generate a safe filename: 'butter-chicken-a1b2c3d4'
    slugified_name = slugify(request.entity_name)
    short_uuid = str(uuid4())[:8]
    public_id = f"{slugified_name}-{short_uuid}"
    
    signature_data = generate_upload_signature(folder, public_id)
    return signature_data
