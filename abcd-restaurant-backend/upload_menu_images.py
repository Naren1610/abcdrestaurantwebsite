"""
Upload Menu Images to Cloudinary and Map to Database Menu Items
Follows the exact backend upload flow:
- Folder: abcd-restaurant/menu
- Public ID format: {slugify(entity_name)}-{short_uuid}
- Secure URL stored in MenuItem.image_url and menu_data.json
"""
import asyncio
import json
import os
import re
from pathlib import Path
from uuid import uuid4

import cloudinary
import cloudinary.uploader
from sqlalchemy import select, update
from app.core.config import settings
from app.database.session import AsyncSessionLocal
from app.models.menu import MenuItem, Category

# Configure Cloudinary
cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True,
)

IMAGES_DIR = Path(r"C:\Users\Mani\Downloads\menu-images")
JSON_PATH = Path(r"c:\Users\Mani\Desktop\ABCD Restaurant Project\.brain\cms-analysis\Menu-Mock\menu_data.json")
FOLDER = "abcd-restaurant/menu"

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text)
    return text

# Mappings: (filename, target_menu_item_name, is_primary_mapping)
# For the 3 items with duplicate shots, the second shot is marked is_primary=True,
# and the first shot is uploaded with '-alt' suffix.
IMAGE_MAPPINGS = [
    # Tandoor
    ("IMG_9148.JPG", "Classic Tandoori Chicken", True),
    ("IMG_9152.JPG", "Malai Silk Murgh Kebab", True),
    ("IMG_9153.JPG", "Lamb Chops", True),
    ("IMG_9395.JPG", "Crimson Kashmiri Murgh Tikka", True),
    
    # Non-Veg Entrees
    ("IMG_9149.JPG", "Chicken Kolhapuri", True),
    ("IMG_9155.JPG", "Delhi Waala Butter Chicken", False),  # Alt shot
    ("IMG_9385.JPG", "Delhi Waala Butter Chicken", True),   # Primary shot
    ("IMG_9384.JPG", "Anda Masala", True),
    ("IMG_9391.JPG", "Mutton Rogan Josh", True),
    ("IMG_9392.JPG", "Telangana Dhaavath Mutton Chops Curry", True),
    
    # Indo Chinese Non-Veg
    ("IMG_9150.JPG", "Chicken Majestic", False),  # Alt shot
    ("IMG_9382.JPG", "Chicken Majestic", True),   # Primary shot
    ("IMG_9383.JPG", "Chicken Manchurian", True),
    ("IMG_9156.JPG", "Hyderabadi Chicken 65", True),
    
    # Biryani
    ("IMG_9381.JPG", "Hyderabadi Chicken Dum Biryani", False),  # Alt shot
    ("IMG_9393.JPG", "Hyderabadi Chicken Dum Biryani", True),   # Primary shot
    
    # Veg Entrees
    ("IMG_9154.JPG", "Makhanwala Paneer Butter Masala", True),
    
    # Indo Chinese Veg
    ("IMG_9386.JPG", "Veg Manchurian", True),
    
    # Wok & Fire
    ("IMG_9387.JPG", "Chicken Wok Fired Soft Noodles", True),
    ("IMG_9388.JPG", "Veg Wok Fired Soft Noodles", True),
    
    # Naan Breads (mapping Lachha Paratha to DB item Lacha Paratha)
    ("IMG_9389.JPG", "Garlic Naan", True),
    ("IMG_9390.JPG", "Lacha Paratha", True),
    
    # Soups
    ("IMG_9397.JPG", "Chicken Tom Yum Soup", True),
]

async def upload_and_map():
    print(f"Starting upload from: {IMAGES_DIR}")
    print(f"Target Cloudinary folder: {FOLDER}")
    print(f"Total mappings configured: {len(IMAGE_MAPPINGS)}")

    uploaded_results = {}
    primary_urls = {}

    for filename, item_name, is_primary in IMAGE_MAPPINGS:
        file_path = IMAGES_DIR / filename
        if not file_path.exists():
            print(f"WARNING: File {filename} does not exist at {file_path}, skipping.")
            continue

        slug = slugify(item_name)
        short_id = str(uuid4())[:8]
        if not is_primary:
            public_id = f"{slug}-alt-{short_id}"
        else:
            public_id = f"{slug}-{short_id}"

        print(f"Uploading {filename} for '{item_name}' (primary={is_primary}) as '{public_id}'...")
        try:
            upload_res = cloudinary.uploader.upload(
                str(file_path),
                folder=FOLDER,
                public_id=public_id,
                overwrite=True,
                resource_type="image"
            )
            secure_url = upload_res.get("secure_url")
            print(f"  -> Uploaded successfully: {secure_url}")
            uploaded_results[filename] = secure_url

            if is_primary:
                primary_urls[item_name] = secure_url
        except Exception as e:
            print(f"  -> ERROR uploading {filename}: {e}")

    print("\n--- Cloudinary Upload Summary ---")
    print(f"Total files uploaded: {len(uploaded_results)}")
    print(f"Primary menu item mappings: {len(primary_urls)}")

    # 1. Update Database
    print("\n--- Updating PostgreSQL Database ---")
    async with AsyncSessionLocal() as db:
        updated_db_items = 0
        for item_name, secure_url in primary_urls.items():
            result = await db.execute(
                update(MenuItem).where(MenuItem.name == item_name).values(image_url=secure_url)
            )
            if result.rowcount > 0:
                updated_db_items += result.rowcount
                print(f"  DB updated: '{item_name}' -> {secure_url}")
            else:
                print(f"  DB WARNING: No row found for '{item_name}'")
        await db.commit()
        print(f"Database: successfully updated {updated_db_items} menu items.")

    # 2. Update JSON master file
    print("\n--- Updating menu_data.json ---")
    if JSON_PATH.exists():
        with open(JSON_PATH, "r", encoding="utf-8") as f:
            menu_json = json.load(f)

        updated_json_items = 0
        for cat in menu_json.get("categories", []):
            for item in cat.get("items", []):
                name = item.get("name")
                if name in primary_urls:
                    item["image_url"] = primary_urls[name]
                    updated_json_items += 1

        with open(JSON_PATH, "w", encoding="utf-8") as f:
            json.dump(menu_json, f, indent=2, ensure_ascii=False)
        print(f"JSON: successfully updated {updated_json_items} items in {JSON_PATH}")

    # 3. Print Verification Table
    print("\n--- Final Mapping Verification ---")
    async with AsyncSessionLocal() as db:
        res = await db.execute(
            select(MenuItem.name, MenuItem.image_url, Category.name.label("category"))
            .join(Category)
            .where(MenuItem.image_url.is_not(None))
            .order_by(Category.display_order, MenuItem.display_order)
        )
        mapped = res.all()
        print(f"Total items in DB with real image_url: {len(mapped)}")
        for r_name, r_img, r_cat in mapped:
            print(f"  [{r_cat}] {r_name} -> {r_img}")

if __name__ == "__main__":
    asyncio.run(upload_and_map())
