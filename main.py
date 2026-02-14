# =========================================================
# Skin Disease Classification API - Final Version
# Model: EfficientNetB1 (Improved)
# =========================================================

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tensorflow as tf
from tensorflow.keras.applications import efficientnet, mobilenet
import numpy as np
from PIL import Image
import io
import os
from typing import Dict
import warnings

# Suppress TensorFlow warnings
warnings.filterwarnings("ignore")
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

# =========================================================
# 🚀 Initialize FastAPI
# =========================================================

app = FastAPI(
    title="Skin Disease Classification API",
    description="AI-powered skin disease detection using EfficientNetB1",
    version="3.0.0"
)

# =========================================================
# 🌐 CORS Configuration (for React frontend)
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================================
# 📂 Model & Class Paths
# =========================================================

MODEL_PATH = "backend/skin_disease_classifier_improved_efficientnetb1.h5"
FALLBACK_MODEL_PATH = "backend/best_model.h5"
CLASS_NAMES_PATH = "backend/class_names_improved.txt"

model = None
CLASS_NAMES = []
LOADED_MODEL_PATH = None
MODEL_PREPROCESSING = None  # Track which preprocessing to use

CONFIDENCE_THRESHOLD = 0.60  # Minimum confidence required

# =========================================================
# 🧠 Load Model on Startup
# =========================================================

@app.on_event("startup")
async def load_model():
    global model, CLASS_NAMES, LOADED_MODEL_PATH, MODEL_PREPROCESSING

    print("\n" + "=" * 60)
    print("🚀 Loading Skin Disease Classification Model...")
    print("=" * 60)

    # Custom Dense layer to handle quantization_config parameter from newer TensorFlow versions
    class CustomDense(tf.keras.layers.Dense):
        def __init__(self, *args, **kwargs):
            kwargs.pop('quantization_config', None)  # Remove unknown parameter
            super().__init__(*args, **kwargs)

    # Try preferred model first
    model_attempts = [
        (MODEL_PATH, "efficientnet"),
        (FALLBACK_MODEL_PATH, "mobilenet"),
    ]

    for model_to_load, model_type in model_attempts:
        if not os.path.exists(model_to_load):
            print(f"⚠️  {model_to_load} not found, trying next...")
            continue

        try:
            # Try with custom Dense layer
            model = tf.keras.models.load_model(
                model_to_load, 
                compile=False,
                custom_objects={'Dense': CustomDense}
            )
            LOADED_MODEL_PATH = model_to_load
            MODEL_PREPROCESSING = model_type  # Store preprocessing type
            print(f"✅ Model Loaded: {model_to_load}")
            print(f"✅ Preprocessing Type: {model_type.upper()}")
            break
        except Exception as e:
            print(f"⚠️  Failed to load {model_to_load}: {str(e)[:100]}")
            model = None
            continue

    if model is None:
        raise RuntimeError("❌ Could not load any model. Check backend/ folder.")

    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-4),
        loss="categorical_crossentropy",
        metrics=["accuracy"]
    )

    # Load class names
    if not os.path.exists(CLASS_NAMES_PATH):
        raise RuntimeError(f"❌ Class names file not found at {CLASS_NAMES_PATH}")

    with open(CLASS_NAMES_PATH, "r") as f:
        CLASS_NAMES = [line.strip() for line in f.readlines() if line.strip()]

    print(f"✅ Classes Loaded: {len(CLASS_NAMES)}")

    # Warmup (prevents slow first request)
    dummy = np.zeros((1, 224, 224, 3))
    if MODEL_PREPROCESSING == "efficientnet":
        dummy = efficientnet.preprocess_input(dummy)
    else:
        dummy = mobilenet.preprocess_input(dummy)
    model.predict(dummy)

    print("✅ API READY")
    print("=" * 60 + "\n")

# =========================================================
# 📦 Response Model
# =========================================================

class PredictionResponse(BaseModel):
    predicted_class: str
    confidence: float
    all_predictions: Dict[str, float]

# =========================================================
# 🖼 Image Preprocessing
# =========================================================

def preprocess_image(image_bytes: bytes) -> np.ndarray:
    try:
        img = Image.open(io.BytesIO(image_bytes))

        # Convert to RGB if needed
        if img.mode != "RGB":
            img = img.convert("RGB")

        # Resize to 224x224
        img = img.resize((224, 224), Image.LANCZOS)

        img_array = np.array(img, dtype=np.float32)
        img_array = np.expand_dims(img_array, axis=0)

        # Apply correct preprocessing based on loaded model
        if MODEL_PREPROCESSING == "efficientnet":
            img_array = efficientnet.preprocess_input(img_array)
        elif MODEL_PREPROCESSING == "mobilenet":
            img_array = mobilenet.preprocess_input(img_array)
        else:
            # Fallback to MobileNet if unknown
            img_array = mobilenet.preprocess_input(img_array)

        return img_array

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image format: {str(e)}")

# =========================================================
# 🔮 Prediction Endpoint
# =========================================================

@app.post("/predict", response_model=PredictionResponse)
async def predict_skin_condition(file: UploadFile = File(...)):

    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    image_bytes = await file.read()

    if not image_bytes:
        raise HTTPException(status_code=400, detail="Empty image file")

    # Limit file size to 5MB
    if len(image_bytes) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Image too large (Max 5MB)")

    try:
        processed_image = preprocess_image(image_bytes)

        predictions = model.predict(processed_image, verbose=0)[0]

        # Get top 2 predictions only
        top_2_indices = np.argsort(predictions)[-2:][::-1]
        
        all_predictions = {
            CLASS_NAMES[i]: float(predictions[i])
            for i in top_2_indices
        }

        # Get top prediction
        predicted_class = CLASS_NAMES[top_2_indices[0]]
        confidence = float(predictions[top_2_indices[0]])

        # Apply confidence threshold
        if confidence < CONFIDENCE_THRESHOLD:
            predicted_class = "Uncertain - Please upload a clearer image"

        return PredictionResponse(
            predicted_class=predicted_class,
            confidence=confidence,
            all_predictions=all_predictions
        )

    except Exception as e:
        print(f"❌ Prediction error: {e}")
        raise HTTPException(status_code=500, detail="Prediction failed")

# =========================================================
# 🏥 Health Check Endpoints
# =========================================================

@app.get("/")
async def root():
    return {
        "status": "API Running",
        "model_loaded": model is not None,
        "num_classes": len(CLASS_NAMES),
        "model_type": f"{MODEL_PREPROCESSING.upper()} Architecture" if MODEL_PREPROCESSING else "Unknown"
    }

@app.get("/health")
async def health():
    return {
        "status": "healthy" if model is not None else "unhealthy",
        "model_loaded": model is not None,
        "model_type": f"{MODEL_PREPROCESSING.upper()} Architecture" if MODEL_PREPROCESSING else "Unknown",
        "model_path": LOADED_MODEL_PATH,
        "num_classes": len(CLASS_NAMES),
        "class_names": CLASS_NAMES
    }

# =========================================================
# 📋 Startup Info
# =========================================================

print("""
╔════════════════════════════════════════════════════════╗
║   Skin Disease Classification API - FINAL VERSION     ║
║   Model: EfficientNetB1 (Improved Fine-Tuned Model)   ║
╚════════════════════════════════════════════════════════╝
""")

print("""
🚀 To run:
   pip install fastapi uvicorn tensorflow pillow python-multipart
   uvicorn main:app --reload --host 0.0.0.0 --port 8000

📄 Docs:
   http://localhost:8000/docs
""")
