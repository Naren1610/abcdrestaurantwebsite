from fastapi import APIRouter
from app.api.v1.routes import upload, menu, auth, settings
from app.api.v1.routes import gallery


api_router = APIRouter()

api_router.include_router(upload.router, prefix="/upload", tags=["Upload"])
api_router.include_router(menu.router, prefix="/menu", tags=["Menu"])


api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])

api_router.include_router(settings.router, prefix='/settings', tags=['Settings'])

api_router.include_router(gallery.router, prefix="/gallery", tags=["gallery"])
