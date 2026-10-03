import asyncio
from app.database.session import get_db
from sqlalchemy import text

async def main():
    try:
        db_gen = get_db()
        db = await db_gen.__anext__()
        await db.execute(text("UPDATE menu_items SET is_veg = false WHERE is_veg IS NULL"))
        await db.execute(text("UPDATE menu_items SET is_spicy = false WHERE is_spicy IS NULL"))
        await db.execute(text("UPDATE menu_items SET is_active = true WHERE is_active IS NULL"))
        await db.commit()
        print("Updated booleans!")
    except Exception as e:
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    asyncio.run(main())
