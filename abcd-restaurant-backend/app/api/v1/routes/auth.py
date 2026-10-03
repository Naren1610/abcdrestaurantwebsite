from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.database.session import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.schemas.user import UserLogin, UserResponse
from app.core.security import verify_password, create_access_token
from datetime import datetime, timezone

router = APIRouter()

@router.post("/login")
async def login(response: Response, login_data: UserLogin, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).filter(User.email == login_data.email))
    user = result.scalars().first()
    
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    user.last_login = datetime.now(timezone.utc)
    await db.commit()

    access_token = create_access_token(subject=user.id)
    
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        max_age=3600,
        expires=3600,
        samesite="lax",
        secure=False,
    )
    return {"message": "Successfully logged in", "expires_in": 3600}

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(key="access_token", httponly=True, samesite="lax")
    return {"message": "Successfully logged out"}

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user




from app.schemas.user import UserUpdate, PasswordUpdate
from app.core.security import get_password_hash

@router.put("/me", response_model=UserResponse)
async def update_me(user_in: UserUpdate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    if user_in.name is not None:
        current_user.name = user_in.name
    if user_in.email is not None:
        # Check if email is taken
        if user_in.email != current_user.email:
            result = await db.execute(select(User).filter(User.email == user_in.email))
            if result.scalars().first():
                raise HTTPException(status_code=400, detail="Email already registered")
        current_user.email = user_in.email
        
    await db.commit()
    await db.refresh(current_user)
    return current_user

@router.put("/password")
async def update_password(pass_in: PasswordUpdate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not verify_password(pass_in.current_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect password")
        
    current_user.hashed_password = get_password_hash(pass_in.new_password)
    await db.commit()
    return {"message": "Password updated successfully"}
