import asyncio
from app.database.session import get_db
from app.models.menu import MenuItem
from sqlalchemy.future import select

async def main():
    try:
        db_gen = get_db()
        db = await db_gen.__anext__()
        result = await db.execute(select(MenuItem))
        print("Success!", len(result.scalars().all()))
    except Exception as e:
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    asyncio.run(main())
