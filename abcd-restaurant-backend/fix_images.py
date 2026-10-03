import asyncio
from app.database.session import get_db
from sqlalchemy import text

async def main():
    try:
        db_gen = get_db()
        db = await db_gen.__anext__()
        await db.execute(text("UPDATE menu_items SET image_url = 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg' WHERE image_url IS NULL"))
        await db.commit()
        print("Updated image_url!")
    except Exception as e:
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    asyncio.run(main())
