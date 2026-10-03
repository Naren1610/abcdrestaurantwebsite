import os

path = "app/services/menu_service.py"
with open(path, "r") as f:
    content = f.read()

# Add import if not exists
if "delete_image_from_url" not in content:
    content = content.replace("from app.models.menu import Category, MenuItem", "from app.models.menu import Category, MenuItem\nfrom app.services.cloudinary_service import delete_image_from_url")

# Replace update logic
old_block = '''        update_data = item_in.model_dump(exclude_unset=True)
        if 'image_url' in update_data and update_data['image_url'] is not None:
            update_data['image_url'] = str(update_data['image_url'])
            
        for key, value in update_data.items():'''

new_block = '''        update_data = item_in.model_dump(exclude_unset=True)
        if 'image_url' in update_data and update_data['image_url'] is not None:
            update_data['image_url'] = str(update_data['image_url'])
            if db_item.image_url and db_item.image_url != update_data['image_url']:
                delete_image_from_url(db_item.image_url)
            
        for key, value in update_data.items():'''

content = content.replace(old_block, new_block)

# Replace delete logic to also delete image when menu item is completely deleted
old_delete_block = '''    async def delete_menu_item(self, db: AsyncSession, item_id: int):
        db_item = await db.get(MenuItem, item_id)
        if not db_item:
            raise HTTPException(status_code=404, detail="MenuItem not found")
            
        await db.delete(db_item)'''

new_delete_block = '''    async def delete_menu_item(self, db: AsyncSession, item_id: int):
        db_item = await db.get(MenuItem, item_id)
        if not db_item:
            raise HTTPException(status_code=404, detail="MenuItem not found")
            
        if db_item.image_url:
            delete_image_from_url(db_item.image_url)
            
        await db.delete(db_item)'''

content = content.replace(old_delete_block, new_delete_block)

with open(path, "w") as f:
    f.write(content)

print("Updated menu_service.py successfully!")
