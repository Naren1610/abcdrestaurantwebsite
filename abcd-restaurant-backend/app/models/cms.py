import enum
from sqlalchemy import Column, Integer, String, Text, Boolean, Enum
from sqlalchemy.dialects.postgresql import JSONB
from app.database.session import Base

class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    role = Column(String(200), nullable=False)
    bio = Column(Text, nullable=True)
    image_url = Column(String(500), nullable=True)
    
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(200), nullable=False)
    rating = Column(Integer, nullable=False, default=5) # 1-5
    review = Column(Text, nullable=False)
    
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

class SiteContent(Base):
    """
    Key-Value store for flexible singleton content chunks.
    e.g., key='home_hero', value={'title': '...', 'subtitle': '...'}
    """
    __tablename__ = "site_content"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), unique=True, index=True, nullable=False)
    value = Column(JSONB, nullable=False)
