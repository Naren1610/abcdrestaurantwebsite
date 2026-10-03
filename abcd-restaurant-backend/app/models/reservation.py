from sqlalchemy import Column, Integer, String, Date, Time, Text, DateTime
from datetime import datetime, timezone
from app.database.session import Base

class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(200), nullable=False)
    customer_email = Column(String(255), nullable=False)
    customer_phone = Column(String(50), nullable=False)
    
    reservation_date = Column(Date, nullable=False)
    reservation_time = Column(Time, nullable=False)
    party_size = Column(Integer, nullable=False)
    
    special_requests = Column(Text, nullable=True)
    status = Column(String(50), default="pending") # 'pending', 'confirmed', 'cancelled'

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
