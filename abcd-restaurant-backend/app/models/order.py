import uuid
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.database.session import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    public_id = Column(String(36), unique=True, index=True, default=lambda: str(uuid.uuid4()))
    customer_name = Column(String(200), nullable=False)
    customer_email = Column(String(255), nullable=False)
    customer_phone = Column(String(50), nullable=False)
    order_type = Column(String(50), nullable=False) # 'delivery' or 'pickup'
    address = Column(String(500), nullable=True) # Optional for pickup

    total_amount = Column(Float, nullable=False)
    stripe_session_id = Column(String(255), unique=True, index=True, nullable=True)
    
    payment_status = Column(String(50), default="pending") # 'pending', 'paid', 'failed'
    fulfillment_status = Column(String(50), default="preparing") # 'preparing', 'ready', 'completed', 'cancelled'

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    menu_item_id = Column(Integer, ForeignKey("menu_items.id"), nullable=True) # Nullable in case item is deleted later
    
    item_name_snapshot = Column(String(200), nullable=False)
    price_snapshot = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False, default=1)

    order = relationship("Order", back_populates="items")
