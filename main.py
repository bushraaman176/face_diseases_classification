from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from typing import Dict, List
from motor.motor_asyncio import AsyncIOMotorClient
import os

# ---------------------------------------------------------
# 🚀 Initialize FastAPI App
# ---------------------------------------------------------
app = FastAPI(
    title="Skin Disease Classification API",
    description="API for predicting skin conditions and recommending products",
    version="2.0.0"
)

# ---------------------------------------------------------
# 🌐 CORS Middleware
# ---------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# 🗄️ MongoDB Connection
# ---------------------------------------------------------
MONGO_URI = "mongodb://127.0.0.1:27017"
client = AsyncIOMotorClient(MONGO_URI)
db = client["skincareDB"]
product_collection = db["products"]

# Connection status tracker
db_connected = False
db_connection_error = None

# ---------------------------------------------------------
# 🧠 Load Model & Connect Database
# ---------------------------------------------------------
model = None

@app.on_event("startup")
async def load_model():
    global model, db_connected, db_connection_error
    
    # Load Model
    try:
        model = tf.keras.models.load_model("backend/best_head_only.h5")
        print("✅ Model loaded successfully!")
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        model = None
    
    # Test Database Connection
    try:
        await db.command("ping")
        db_connected = True
        db_connection_error = None
        product_count = await product_collection.count_documents({})
        print(f"✅ Database connected successfully!")
        print(f"   - Database: skincareDB")
        print(f"   - Products in collection: {product_count}")
    except Exception as e:
        db_connected = False
        db_connection_error = str(e)
        print(f"❌ Error connecting to database: {e}")
        print(f"   - Make sure MongoDB is running at {MONGO_URI}")

# ---------------------------------------------------------
# 🏷️ Class Names
# ---------------------------------------------------------
CLASS_NAMES = [
    'Acne', 'Blackheads', 'Dark Spots', 'Dry Skin',
    'Eye Bags', 'Normal Skin', 'Oily Skin',
    'Pores', 'Skin Redness', 'Wrinkles'
]

# ---------------------------------------------------------
# 📦 Response Model
# ---------------------------------------------------------
class ProductResponse(BaseModel):
    name: str
    category: str
    skinType: str
    ingredients: List[str]

class PredictionResponse(BaseModel):
    predicted_class: str
    confidence: float
    all_predictions: Dict[str, float]
    recommended_products: List[ProductResponse]

# ---------------------------------------------------------
# 🖼️ Image Preprocessing
# ---------------------------------------------------------
def preprocess_image(image_bytes: bytes) -> np.ndarray:
    try:
        img = Image.open(io.BytesIO(image_bytes))
        if img.mode != 'RGB':
            img = img.convert('RGB')

        img = img.resize((224, 224))
        img_array = np.array(img, dtype=np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        return img_array

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image format: {str(e)}")

# ---------------------------------------------------------
# 🔮 Prediction + Recommendation Endpoint
# ---------------------------------------------------------
@app.post("/predict", response_model=PredictionResponse)
async def predict_skin_condition(file: UploadFile = File(...)):

    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        image_bytes = await file.read()
        processed_image = preprocess_image(image_bytes)

        predictions = model.predict(processed_image, verbose=0)[0]

        predicted_idx = np.argmax(predictions)
        predicted_class = CLASS_NAMES[predicted_idx]
        confidence = float(predictions[predicted_idx])

        # Create sorted predictions dictionary
        all_predictions = {
            class_name: float(prob)
            for class_name, prob in zip(CLASS_NAMES, predictions)
        }

        all_predictions = dict(sorted(
            all_predictions.items(),
            key=lambda x: x[1],
            reverse=True
        ))

        # -------------------------------------------------
        # 🛍️ Fetch Recommended Products from MongoDB
        # -------------------------------------------------
        recommended_products = []
        
        if db_connected:
            try:
                products_cursor = product_collection.find(
                    {"class": predicted_class}
                )
                products = await products_cursor.to_list(length=10)

                # Remove MongoDB _id
                for product in products:
                    recommended_products.append({
                        "name": product.get("type", ""),
                        "category": product.get("type", ""),
                        "skinType": product.get("class", ""),
                        "ingredients": product.get("ingredients", [])
                    })
            except Exception as e:
                print(f"Warning: Could not fetch products: {e}")
                # Continue without products rather than failing
        else:
            print(f"Warning: Database not connected. No products will be recommended.")

        return PredictionResponse(
            predicted_class=predicted_class,
            confidence=confidence,
            all_predictions=all_predictions,
            recommended_products=recommended_products
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

# ---------------------------------------------------------
# 🏥 Health Check
# ---------------------------------------------------------
@app.get("/")
async def root():
    return {
        "message": "Skin Disease Classification API is running",
        "status": "healthy",
        "model_loaded": model is not None
    }

@app.get("/health")
async def health_check():
    """
    Detailed health check including database status
    """
    # Get product count if connected
    product_count = 0
    if db_connected:
        try:
            product_count = await product_collection.count_documents({})
        except:
            pass
    
    status = "healthy" if (model is not None and db_connected) else "unhealthy"
    
    return {
        "status": status,
        "components": {
            "model": {
                "loaded": model is not None,
                "model_name": "MobileNet",
                "classes": CLASS_NAMES
            },
            "database": {
                "connected": db_connected,
                "uri": MONGO_URI,
                "database": "skincareDB",
                "collection": "products",
                "documents_count": product_count,
                "error": db_connection_error
            }
        }
    }

@app.get("/db-status")
async def database_status():
    """
    Quick database status check
    """
    if db_connected:
        product_count = await product_collection.count_documents({})
        return {
            "connected": True,
            "message": "✅ Database is connected",
            "details": {
                "uri": MONGO_URI,
                "database": "skincareDB",
                "products_count": product_count
            }
        }
    else:
        return {
            "connected": False,
            "message": "❌ Database is NOT connected",
            "error": db_connection_error,
            "troubleshooting": [
                "1. Make sure MongoDB is running",
                "2. Check if MongoDB is at: mongodb://127.0.0.1:27017",
                "3. Verify the database 'skincareDB' exists",
                "4. Run: mongod (on Windows) or brew services start mongodb-community (on Mac)"
            ]
        }
