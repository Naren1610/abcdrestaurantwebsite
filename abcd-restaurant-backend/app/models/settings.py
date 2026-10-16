from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database.session import Base

class GlobalSettings(Base):
    __tablename__ = 'global_settings'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    address = Column(String(500), nullable=False)
    map_url = Column(String(500), nullable=True)

    is_online_ordering_enabled = Column(Boolean, default=False, nullable=False)
    is_table_reservation_enabled = Column(Boolean, default=True, nullable=False)

    social_links = relationship('SocialLink', back_populates='settings', cascade='all, delete-orphan')
    operating_hours = relationship('OperatingHour', back_populates='settings', cascade='all, delete-orphan')

class SocialLink(Base):
    __tablename__ = 'social_links'

    id = Column(Integer, primary_key=True, index=True)
    settings_id = Column(Integer, ForeignKey('global_settings.id'), nullable=False)
    platform = Column(String(100), nullable=False)
    url = Column(String(500), nullable=False)
    display_order = Column(Integer, default=0)

    settings = relationship('GlobalSettings', back_populates='social_links')

class OperatingHour(Base):
    __tablename__ = 'operating_hours'

    id = Column(Integer, primary_key=True, index=True)
    settings_id = Column(Integer, ForeignKey('global_settings.id'), nullable=False)
    day = Column(String(100), nullable=False)
    hours = Column(String(500), nullable=False)
    
    display_order = Column(Integer, default=0)

    settings = relationship('GlobalSettings', back_populates='operating_hours')
