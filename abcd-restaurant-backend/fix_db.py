import asyncio
from app.database.session import get_db
from sqlalchemy import text

async def main():
    try:
        db_gen = get_db()
        db = await db_gen.__anext__()
        await db.execute(text("UPDATE menu_items SET is_chef_special = false WHERE is_chef_special IS NULL"))
        await db.commit()
        print("Update successful!")
    except Exception as e:
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    asyncio.run(main())
