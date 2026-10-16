from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import delete
from app.database.session import get_db
from app.models.cms import TeamMember
from app.schemas.cms import (
    TeamMemberCreate,
    TeamMemberUpdate,
    TeamMemberResponse,
    TeamMemberBulkItem,
)

router = APIRouter()

@router.get("/", response_model=List[TeamMemberResponse])
async def get_team_members(db: AsyncSession = Depends(get_db)):
    """Public endpoint: fetch all active team members/chefs sorted by display_order."""
    stmt = (
        select(TeamMember)
        .filter(TeamMember.is_active == True)
        .order_by(TeamMember.display_order.asc(), TeamMember.id.asc())
    )
    result = await db.execute(stmt)
    return result.scalars().all()

@router.get("/admin", response_model=List[TeamMemberResponse])
async def get_all_team_members_admin(db: AsyncSession = Depends(get_db)):
    """Admin endpoint: fetch all team members including inactive ones."""
    stmt = select(TeamMember).order_by(TeamMember.display_order.asc(), TeamMember.id.asc())
    result = await db.execute(stmt)
    return result.scalars().all()

@router.get("/{member_id}", response_model=TeamMemberResponse)
async def get_team_member(member_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TeamMember).filter(TeamMember.id == member_id))
    member = result.scalars().first()
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found")
    return member

@router.post("/", response_model=TeamMemberResponse, status_code=status.HTTP_201_CREATED)
async def create_team_member(member_in: TeamMemberCreate, db: AsyncSession = Depends(get_db)):
    db_obj = TeamMember(**member_in.model_dump())
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

@router.put("/{member_id}", response_model=TeamMemberResponse)
async def update_team_member(member_id: int, member_in: TeamMemberUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TeamMember).filter(TeamMember.id == member_id))
    db_obj = result.scalars().first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    update_data = member_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_obj, field, value)
        
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

@router.delete("/{member_id}", status_code=status.HTTP_200_OK)
async def delete_team_member(member_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TeamMember).filter(TeamMember.id == member_id))
    db_obj = result.scalars().first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    await db.delete(db_obj)
    await db.commit()
    return {"message": "Team member deleted successfully"}

@router.put("/sync/bulk", response_model=List[TeamMemberResponse])
async def sync_team_members(items: List[TeamMemberBulkItem], db: AsyncSession = Depends(get_db)):
    """
    Synchronizes the full array of team members from the CMS form in one atomic transaction:
    - Existing members with an ID are updated.
    - New members without an ID are created.
    - Members omitted from the list are removed.
    """
    kept_ids = []
    
    for index, item in enumerate(items):
        item_data = item.model_dump()
        item_id = item_data.pop("id", None)
        item_data["display_order"] = index
        
        if item_id:
            result = await db.execute(select(TeamMember).filter(TeamMember.id == item_id))
            db_obj = result.scalars().first()
            if db_obj:
                for field, val in item_data.items():
                    setattr(db_obj, field, val)
                kept_ids.append(item_id)
                continue
        
        # New member
        new_obj = TeamMember(**item_data)
        db.add(new_obj)
        await db.flush()
        kept_ids.append(new_obj.id)
        
    if kept_ids:
        await db.execute(delete(TeamMember).filter(~TeamMember.id.in_(kept_ids)))
    else:
        await db.execute(delete(TeamMember))
        
    await db.commit()
    
    stmt = select(TeamMember).order_by(TeamMember.display_order.asc(), TeamMember.id.asc())
    refreshed = await db.execute(stmt)
    return refreshed.scalars().all()
