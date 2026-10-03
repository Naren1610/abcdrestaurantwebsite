import time
import cloudinary
import cloudinary.utils
import cloudinary.uploader
from app.core.config import settings

# Configure Cloudinary globally
cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True,
)

def generate_upload_signature(folder: str, public_id: str) -> dict:
    """
    Generates a secure signature for direct client-side upload to Cloudinary.
    Locks the upload to a specific folder and filename (public_id).
    """
    timestamp = int(time.time())
    
    # Parameters that must be signed to lock the upload
    params_to_sign = {
        "folder": folder,
        "public_id": public_id,
        "timestamp": timestamp,
    }
    
    signature = cloudinary.utils.api_sign_request(
        params_to_sign, 
        settings.CLOUDINARY_API_SECRET
    )
    
    return {
        "signature": signature,
        "timestamp": timestamp,
        "cloud_name": settings.CLOUDINARY_CLOUD_NAME,
        "api_key": settings.CLOUDINARY_API_KEY,
        "folder": folder,
        "public_id": public_id
    }

def delete_image_from_url(image_url: str):
    """
    Extracts the public_id and folder from a full Cloudinary secure_url and deletes the asset.
    Example url: https://res.cloudinary.com/<cloud_name>/image/upload/v1234567/abcd-restaurant/menu/butter-chicken-1234.jpg
    """
    if not image_url or "cloudinary.com" not in image_url:
        return
        
    try:
        # Extract everything after the /upload/v.../ or /upload/
        # e.g., 'abcd-restaurant/menu/butter-chicken-1234.jpg'
        parts = image_url.split('/upload/')
        if len(parts) > 1:
            path = parts[1]
            # Strip version 'v123456/' if present
            if path.startswith('v'):
                path = path.split('/', 1)[1]
            # Strip file extension
            public_id = path.rsplit('.', 1)[0]
            
            # Delete from cloudinary
            cloudinary.uploader.destroy(public_id)
            print(f"Deleted old image from Cloudinary: {public_id}")
    except Exception as e:
        print(f"Failed to delete old image from Cloudinary: {e}")

