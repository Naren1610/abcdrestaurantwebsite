import asyncio
from app.database.session import engine, Base
from app.models.settings import GlobalSettings, SocialLink, OperatingHour

async def init_models():
    async with engine.begin() as conn:
        # Create all tables (doesn't drop existing ones)
        await conn.run_sync(Base.metadata.create_all)
        print('Tables created.')

if __name__ == '__main__':
    asyncio.run(init_models())
