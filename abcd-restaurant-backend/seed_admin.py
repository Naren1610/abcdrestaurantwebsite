import asyncio
from sqlalchemy.future import select
from app.database.session import AsyncSessionLocal
from app.models.role import Role
from app.models.user import User
from app.core.security import get_password_hash

async def seed_db():
    async with AsyncSessionLocal() as db:
        result = await db.execute(select(Role).filter(Role.name == "super_admin"))
        admin_role = result.scalars().first()
        if not admin_role:
            admin_role = Role(name="super_admin", description="Full Access")
            db.add(admin_role)
            await db.commit()
            await db.refresh(admin_role)
            
        result = await db.execute(select(User).filter(User.email == "admin@abcd.com"))
        admin_user = result.scalars().first()
        if not admin_user:
            admin_user = User(
                email="admin@abcd.com",
                name="Super Admin",
                hashed_password=get_password_hash("admin123"),
                role_id=admin_role.id
            )
            db.add(admin_user)
            await db.commit()
            print("Admin user created: admin@abcd.com / admin123")
        else:
            print("Admin already exists.")

if __name__ == '__main__':
    asyncio.run(seed_db())
