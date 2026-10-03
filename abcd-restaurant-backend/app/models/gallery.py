from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database.session import Base

class GalleryCategory(Base):
    __tablename__ = "gallery_categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    images = relationship("GalleryImage", back_populates="category", cascade="all, delete-orphan")

class GalleryImage(Base):
    __tablename__ = "gallery_images"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("gallery_categories.id"), nullable=False)
    title = Column(String(255), nullable=True)
    image_url = Column(String(500), nullable=False)
    is_top_pick = Column(Boolean, default=False)
    caption = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    category = relationship("GalleryCategory", back_populates="images")
