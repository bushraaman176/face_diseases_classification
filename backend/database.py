from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb://127.0.0.1:27017"
client = AsyncIOMotorClient(MONGO_URI)

db = client["skincareDB"]
product_collection = db["products"]
