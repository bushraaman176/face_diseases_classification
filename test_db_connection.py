"""
Database Connection Test Script
Run this to verify your MongoDB connection
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import sys

MONGO_URI = "mongodb://127.0.0.1:27017"

async def test_connection():
    print("=" * 60)
    print("🔍 TESTING DATABASE CONNECTION")
    print("=" * 60)
    print(f"\n📍 Attempting to connect to: {MONGO_URI}\n")
    
    try:
        # Create client
        client = AsyncIOMotorClient(MONGO_URI)
        
        # Ping database
        await client.admin.command('ping')
        print("✅ MongoDB Server: CONNECTED")
        
        # Get database
        db = client["skincareDB"]
        
        # Check collections
        collections = await db.list_collection_names()
        print(f"✅ Database 'skincareDB': EXISTS")
        print(f"   Collections found: {collections}")
        
        # Check products collection
        if "products" in collections:
            product_collection = db["products"]
            count = await product_collection.count_documents({})
            print(f"✅ Collection 'products': EXISTS")
            print(f"   Documents count: {count}")
            
            # Show sample products
            if count > 0:
                sample = await product_collection.find_one({})
                print(f"\n   📦 Sample product:")
                for key, value in list(sample.items())[:5]:
                    if key != "_id":
                        print(f"      - {key}: {value}")
        else:
            print(f"⚠️  Collection 'products': NOT FOUND")
            print(f"   You need to create this collection and add products")
        
        # Close connection
        client.close()
        
        print("\n" + "=" * 60)
        print("✅ ALL CHECKS PASSED - Database is Working!")
        print("=" * 60)
        return True
        
    except Exception as e:
        print(f"❌ Connection Failed: {str(e)}\n")
        print("=" * 60)
        print("🔧 TROUBLESHOOTING:")
        print("=" * 60)
        print("\n1️⃣  Check if MongoDB is running:")
        print("   Windows: Open Services and look for 'MongoDB Server'")
        print("   macOS: brew services list")
        print("   Linux: sudo systemctl status mongod\n")
        
        print("2️⃣  Start MongoDB:")
        print("   Windows: Run 'mongod' in terminal")
        print("   macOS: brew services start mongodb-community")
        print("   Linux: sudo systemctl start mongod\n")
        
        print("3️⃣  Verify connection string:")
        print(f"   Current: {MONGO_URI}")
        print("   Common issues:")
        print("   - Wrong IP: Check if MongoDB is listening on 127.0.0.1:27017")
        print("   - Port mismatch: Default is 27017\n")
        
        print("4️⃣  Check MongoDB installation:")
        print("   Command: mongo --version  or  mongosh --version\n")
        
        return False

if __name__ == "__main__":
    success = asyncio.run(test_connection())
    sys.exit(0 if success else 1)
