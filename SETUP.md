# 🚀 Skin Disease Classification API - Setup Guide

## Prerequisites
- Python 3.8+
- Model file: `backend/skin_disease_classifier_improved_efficientnetb1.h5`
- Class names file: `backend/class_names_improved.txt`

## Installation

### 1️⃣ Install Dependencies
```powershell
pip install -r requirements.txt
```

Or manually:
```powershell
pip install fastapi uvicorn tensorflow pillow python-multipart
```

### 2️⃣ Prepare Model & Class Names

**Option A: From Jupyter Notebook**
Run your training notebook and save:
- ✅ `backend/skin_disease_classifier_improved_efficientnetb1.h5`
- ✅ `backend/class_names_improved.txt`

**Option B: Use Existing Models**
If you have trained models in the backend folder, the API will automatically find them.

### 3️⃣ Run the API Server

```powershell
# From root directory
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Expected output:
```
╔════════════════════════════════════════════════════════╗
║   Skin Disease Classification API - v2.0              ║
║   Model: EfficientNetB1 with Progressive Fine-tuning  ║
╚════════════════════════════════════════════════════════╝

✅ Model loaded from: backend/skin_disease_classifier_improved_efficientnetb1.h5
✅ Class names loaded from: backend/class_names_improved.txt
✅ API ready! Model has 9 classes

Uvicorn running on http://0.0.0.0:8000
```

## API Endpoints

### 1. Health Check
```
GET http://localhost:8000/
```
**Response:**
```json
{
  "message": "Skin Disease Classification API v2.0",
  "status": "healthy",
  "model_loaded": true,
  "num_classes": 9,
  "endpoints": { ... }
}
```

### 2. Detailed Health Check
```
GET http://localhost:8000/health
```
**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "classes_loaded": true,
  "num_classes": 9,
  "class_names": ["Acne", "Blackheads", "Dark Spots", ...]
}
```

### 3. Predict Skin Condition (Main Endpoint)
```
POST http://localhost:8000/predict
Content-Type: multipart/form-data

file: <image_file>
```

**Response:**
```json
{
  "predicted_class": "Acne",
  "confidence": 0.92,
  "all_predictions": {
    "Acne": 0.92,
    "Oily Skin": 0.05,
    "Blackheads": 0.02,
    ...
  }
}
```

## Testing the API

### Option 1: Interactive Docs
Visit: http://localhost:8000/docs

Click "Try it out" on the `/predict` endpoint to test with your own images.

### Option 2: Python Test Script
```python
import requests

# Read image
with open("test_image.jpg", "rb") as f:
    response = requests.post(
        "http://localhost:8000/predict",
        files={"file": f}
    )

print(response.json())
```

### Option 3: cURL Command
```bash
curl -X POST "http://localhost:8000/predict" \
  -F "file=@test_image.jpg"
```

## Connecting Frontend

In your React app, the frontend should send requests to:
```javascript
const response = await fetch('http://localhost:8000/predict', {
  method: 'POST',
  body: formData,
});
```

The frontend is already configured to use this endpoint in `src/utils/mockAnalysis.ts`

## Troubleshooting

### ❌ Model not loading
**Solution:** 
- Check file path is correct
- Ensure `backend/skin_disease_classifier_improved_efficientnetb1.h5` exists
- Check console logs for specific error

### ❌ CORS errors from frontend
**Solution:**
- API already has CORS enabled for React dev servers
- Check React is running on: `http://localhost:5173` or `http://localhost:5174`

### ❌ Out of memory
**Solution:**
- Use smaller batch size in predictions
- Close other applications
- Use GPU if available (CUDA)

## Model Information

**Architecture:** EfficientNetB1 + Custom Head
**Training Method:** 3-phase progressive fine-tuning
**Input Size:** 224×224
**Preprocessing:** EfficientNet standardized preprocessing
**Classes:** 9 skin conditions
**Expected Accuracy:** 75%+

## Next Steps

1. ✅ Run this API server
2. ✅ Start React frontend: `npm run dev`
3. ✅ Test upload flow
4. ✅ Verify predictions work
5. ✅ Deploy to production (change CORS origins, use gunicorn, etc.)
