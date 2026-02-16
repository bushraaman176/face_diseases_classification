from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from typing import Dict

# ---------------------------------------------------------
# 🚀 Initialize FastAPI App
# ---------------------------------------------------------
app = FastAPI(
    title="Skin Disease Classification API",
    description="API for predicting skin conditions from face images",
    version="1.0.0"
)

# ---------------------------------------------------------
# 🌐 CORS Middleware Configuration
# ---------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:8080",
        "http://127.0.0.1:8080"
    ],  # Your React frontend URLs
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# ---------------------------------------------------------
# 🧠 Load Trained Model
# ---------------------------------------------------------
model = None

@app.on_event("startup")
async def load_model():
    """Load the Keras model on application startup"""
    global model
    try:
        model = tf.keras.models.load_model("backend/best_head_only.h5")
        print("✅ Model loaded successfully!")
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        raise e

# ---------------------------------------------------------
# 🏷️ Class Names (Must match training order)
# ---------------------------------------------------------
CLASS_NAMES = [
    'Acne', 'Blackheads', 'Dark Spots', 'Dry Skin',
    'Eye Bags', 'Normal Skin', 'Oily Skin',
    'Pores', 'Skin Redness', 'Wrinkles'
]

# ---------------------------------------------------------
# 📦 Response Model
# ---------------------------------------------------------
class PredictionResponse(BaseModel):
    predicted_class: str
    confidence: float
    all_predictions: Dict[str, float]

# ---------------------------------------------------------
# 🖼️ Image Preprocessing Function
# ---------------------------------------------------------
def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """
    Preprocess uploaded image for model prediction
    - Resize to (224, 224)
    - Normalize pixel values to [0, 1]
    - Add batch dimension
    """
    try:
        # Open image from bytes
        img = Image.open(io.BytesIO(image_bytes))
        
        # Convert to RGB if needed (handles RGBA, grayscale, etc.)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize to model input size
        img = img.resize((224, 224))
        
        # Convert to numpy array and normalize
        img_array = np.array(img, dtype=np.float32) / 255.0
        
        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)
        
        return img_array
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image format: {str(e)}")

# ---------------------------------------------------------
# 🔮 Prediction Endpoint
# ---------------------------------------------------------
@app.post("/predict", response_model=PredictionResponse)
async def predict_skin_condition(file: UploadFile = File(...)):
    """
    Predict skin condition from uploaded image
    
    Args:
        file: Uploaded image file (jpg, jpeg, png)
    
    Returns:
        JSON with predicted class, confidence, and all predictions
    """
    # Validate model is loaded
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    # Validate file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        # Read image bytes
        image_bytes = await file.read()
        
        # Preprocess image
        processed_image = preprocess_image(image_bytes)
        
        # Make prediction
        predictions = model.predict(processed_image, verbose=0)[0]
        
        # Get predicted class (highest probability)
        predicted_idx = np.argmax(predictions)
        predicted_class = CLASS_NAMES[predicted_idx]
        confidence = float(predictions[predicted_idx])
        
        # Create dictionary of all predictions
        all_predictions = {
            class_name: float(prob)
            for class_name, prob in zip(CLASS_NAMES, predictions)
        }
        
        # Sort predictions by confidence (descending)
        all_predictions = dict(sorted(
            all_predictions.items(),
            key=lambda x: x[1],
            reverse=True
        ))
        
        return PredictionResponse(
            predicted_class=predicted_class,
            confidence=confidence,
            all_predictions=all_predictions
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

# ---------------------------------------------------------
# 🏥 Health Check Endpoint
# ---------------------------------------------------------
@app.get("/")
async def root():
    """Root endpoint - API health check"""
    return {
        "message": "Skin Disease Classification API is running",
        "status": "healthy",
        "model_loaded": model is not None,
        "endpoints": {
            "predict": "/predict (POST)",
            "docs": "/docs",
            "health": "/health"
        }
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy" if model is not None else "unhealthy",
        "model_loaded": model is not None,
        "classes": CLASS_NAMES,
        "num_classes": len(CLASS_NAMES)
    }

# ---------------------------------------------------------
# 📋 Run Instructions
# ---------------------------------------------------------
# To run this API:
# 1. Install dependencies: pip install fastapi uvicorn tensorflow pillow python-multipart
# 2. Run server: uvicorn main:app --reload
# 3. Access API docs: http://localhost:8000/docs
# 4. Test prediction: Upload image via /predict endpoint
