import asyncio
from sqlalchemy import text
from app.database.session import engine, Base
from app.models.settings import GlobalSettings, SocialLink, OperatingHour

async def recreate():
    async with engine.begin() as conn:
        await conn.execute(text("DROP TABLE IF EXISTS operating_hours CASCADE;"))
        await conn.run_sync(Base.metadata.create_all)
        print('operating_hours table recreated.')

if __name__ == '__main__':
    asyncio.run(recreate())
