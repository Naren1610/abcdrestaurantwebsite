"""
Seed script for ABCD Restaurant Menu
Loads structured menu data from .brain/cms-analysis/Menu-Mock/menu_data.json
and populates categories and menu_items tables in PostgreSQL.
"""
import asyncio
import json
import os
import sys
from pathlib import Path

from sqlalchemy import select, delete, func
from app.database.session import AsyncSessionLocal
from app.models.menu import Category, MenuItem

BASE_DIR = Path(__file__).resolve().parent
JSON_PATH = BASE_DIR.parent / ".brain" / "cms-analysis" / "Menu-Mock" / "menu_data.json"

async def seed_menu():
    if not JSON_PATH.exists():
        print(f"Error: JSON file not found at {JSON_PATH}")
        sys.exit(1)

    print(f"Loading menu data from: {JSON_PATH}")
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    categories_data = data.get("categories", [])
    total_categories = len(categories_data)
    total_items = sum(len(c.get("items", [])) for c in categories_data)

    print(f"Found {total_categories} categories and {total_items} items to seed.")

    async with AsyncSessionLocal() as db:
        # Clear existing menu items and categories
        print("Cleaning existing menu items and categories...")
        await db.execute(delete(MenuItem))
        await db.execute(delete(Category))
        await db.commit()
        print("Existing menu tables cleared.")

        # Seed categories and items
        seeded_categories_count = 0
        seeded_items_count = 0

        for cat_data in categories_data:
            cat_name = cat_data["name"]
            cat_subtitle = cat_data.get("subtitle")
            cat_order = cat_data.get("display_order", 0)

            category = Category(
                name=cat_name,
                subtitle=cat_subtitle,
                display_order=cat_order
            )
            db.add(category)
            await db.flush() # Flush to obtain category.id
            seeded_categories_count += 1

            for item_data in cat_data.get("items", []):
                menu_item = MenuItem(
                    name=item_data["name"],
                    description=item_data.get("description"),
                    price=float(item_data["price"]),
                    image_url=item_data.get("image_url"), # None
                    is_veg=item_data.get("is_veg", False),
                    is_spicy=item_data.get("is_spicy", False),
                    is_chef_special=item_data.get("is_chef_special", False),
                    is_signature_dish=item_data.get("is_signature_dish", False),
                    is_active=item_data.get("is_active", True),
                    display_order=item_data.get("display_order", 0),
                    category_id=category.id
                )
                db.add(menu_item)
                seeded_items_count += 1

        await db.commit()
        print(f"Successfully seeded {seeded_categories_count} categories and {seeded_items_count} menu items.")

        # Verification check
        cat_count_res = await db.execute(select(func.count(Category.id)))
        item_count_res = await db.execute(select(func.count(MenuItem.id)))
        print(f"Verification in DB: Categories={cat_count_res.scalar()}, Items={item_count_res.scalar()}")

if __name__ == "__main__":
    asyncio.run(seed_menu())
