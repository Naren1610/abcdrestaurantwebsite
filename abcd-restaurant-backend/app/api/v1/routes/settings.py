from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from sqlalchemy import delete
from app.database.session import get_db
from app.models.settings import GlobalSettings, SocialLink, OperatingHour
from app.schemas.settings import GlobalSettingsResponse, GlobalSettingsCreate, OperationalSettingsUpdate
from typing import List

router = APIRouter()

@router.get("/", response_model=GlobalSettingsResponse)
async def get_settings(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(GlobalSettings)
        .options(selectinload(GlobalSettings.social_links), selectinload(GlobalSettings.operating_hours))
        .filter(GlobalSettings.id == 1)
    )
    settings = result.scalars().first()
    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found")
    
    # Sort related lists by display_order
    settings.social_links = sorted(settings.social_links, key=lambda x: x.display_order or 0)
    settings.operating_hours = sorted(settings.operating_hours, key=lambda x: x.display_order or 0)
    
    return settings

@router.patch("/operations", response_model=GlobalSettingsResponse)
async def update_operational_settings(
    operations_in: OperationalSettingsUpdate,
    db: AsyncSession = Depends(get_db)
):
    """
    Safely update operational controls (Online Ordering, Table Reservations)
    without touching or deleting social links or operating hours.
    """
    result = await db.execute(
        select(GlobalSettings)
        .options(selectinload(GlobalSettings.social_links), selectinload(GlobalSettings.operating_hours))
        .filter(GlobalSettings.id == 1)
    )
    settings = result.scalars().first()
    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found")
    
    if operations_in.is_online_ordering_enabled is not None:
        settings.is_online_ordering_enabled = operations_in.is_online_ordering_enabled
    if operations_in.is_table_reservation_enabled is not None:
        settings.is_table_reservation_enabled = operations_in.is_table_reservation_enabled
        
    await db.commit()
    await db.refresh(settings, ["social_links", "operating_hours"])
    
    settings.social_links = sorted(settings.social_links, key=lambda x: x.display_order or 0)
    settings.operating_hours = sorted(settings.operating_hours, key=lambda x: x.display_order or 0)
    return settings

@router.put("/", response_model=GlobalSettingsResponse)
async def update_settings(settings_in: GlobalSettingsCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(GlobalSettings)
        .options(selectinload(GlobalSettings.social_links), selectinload(GlobalSettings.operating_hours))
        .filter(GlobalSettings.id == 1)
    )
    settings = result.scalars().first()
    
    if not settings:
        # Create if not exists
        settings = GlobalSettings(
            id=1,
            email=settings_in.email,
            phone=settings_in.phone,
            address=settings_in.address,
            map_url=settings_in.map_url,
            is_online_ordering_enabled=settings_in.is_online_ordering_enabled,
            is_table_reservation_enabled=settings_in.is_table_reservation_enabled
        )
        db.add(settings)
    else:
        # Update existing
        settings.email = settings_in.email
        settings.phone = settings_in.phone
        settings.address = settings_in.address
        settings.map_url = settings_in.map_url
        settings.is_online_ordering_enabled = settings_in.is_online_ordering_enabled
        settings.is_table_reservation_enabled = settings_in.is_table_reservation_enabled
        
        # Clear existing relations
        await db.execute(delete(SocialLink).where(SocialLink.settings_id == 1))
        await db.execute(delete(OperatingHour).where(OperatingHour.settings_id == 1))

    await db.commit()

    # Create new social links
    for idx, sl in enumerate(settings_in.social_links):
        db.add(SocialLink(
            settings_id=1,
            platform=sl.platform,
            url=sl.url,
            display_order=idx
        ))

    # Create new operating hours
    for idx, oh in enumerate(settings_in.operating_hours):
        db.add(OperatingHour(
            settings_id=1,
            day=oh.day,
            hours=oh.hours,
            display_order=idx
        ))
        
    await db.commit()
    await db.refresh(settings)
    
    # Needs re-query to load the newly inserted relationships
    result = await db.execute(
        select(GlobalSettings)
        .options(selectinload(GlobalSettings.social_links), selectinload(GlobalSettings.operating_hours))
        .filter(GlobalSettings.id == 1)
    )
    settings = result.scalars().first()
    
    settings.social_links = sorted(settings.social_links, key=lambda x: x.display_order or 0)
    settings.operating_hours = sorted(settings.operating_hours, key=lambda x: x.display_order or 0)
    
    return settings
