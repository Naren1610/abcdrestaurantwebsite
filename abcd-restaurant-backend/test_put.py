import httpx
import asyncio

async def main():
    payload = {
        "name": "Murgh Malai Tikka",
        "description": "Silken chicken infused with cream...",
        "price": 18.99,
        "category_id": 4,
        "is_veg": True,
        "is_spicy": False,
        "is_chef_special": False,
        "image_url": "blob:http://localhost:3000/1234-abcd"
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.put("http://127.0.0.1:8000/api/v1/menu/items/1", json=payload)
        print("Status:", response.status_code)
        print("Response:", response.text)

if __name__ == '__main__':
    asyncio.run(main())
