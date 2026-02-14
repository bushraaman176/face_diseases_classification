# 🩺 Face Diseases Classification - Full Stack Application

A complete AI-powered web application for skin disease detection and personalized skincare recommendations using deep learning.

## 📋 Project Overview

This project combines:
- **Backend:** FastAPI + TensorFlow with EfficientNetB1 model
- **Frontend:** React 19 + TypeScript + Tailwind CSS + Vite
- **Features:** Image upload, AI analysis, product/exercise recommendations

### 🎯 Supported Skin Conditions
1. Acne
2. Blackheads
3. Dark Spots
4. Dry Skin
5. Eye Bags
6. Normal Skin
7. Oily Skin
8. Pores
9. Skin Redness
10. Wrinkles

## 📁 Project Structure

```
face_diseases_classification/
├── backend/                          # Python ML Backend
│   ├── Face_diseases_classification.ipynb  # Training notebook
│   ├── skin_disease_classifier_improved_efficientnetb1.h5  # Trained model
│   ├── best_model_v2.h5
│   ├── class_names_improved.txt     # Model class labels
│   └── Skin-Problem-MultiLabel-1/   # Training dataset
│
├── Frontend/                         # React Web Application
│   ├── src/
│   │   ├── components/              # React components
│   │   ├── pages/                   # Page components
│   │   ├── utils/                   # Utilities (API calls)
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── main.py                          # FastAPI server (NEW!)
├── requirements.txt                 # Python dependencies
├── SETUP.md                         # Detailed setup guide
├── test_api.py                      # API test script
└── README.md                        # This file
```

## 🚀 Quick Start (5 minutes)

### 1️⃣ Start Backend API

```powershell
# Install dependencies
pip install -r requirements.txt

# Run API server
uvicorn main:app --reload
```

✅ Open http://localhost:8000/docs to see interactive API documentation

### 2️⃣ Start Frontend

```powershell
# Navigate to frontend
cd Frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

✅ Open http://localhost:5173 in your browser

### 3️⃣ Test the Application

1. Click "Get Started" button
2. Upload a face image
3. Wait for AI analysis
4. View detected skin conditions
5. Get product/exercise recommendations

## 🤖 How It Works

### Image Analysis Flow

```
User Upload
    ↓
[Frontend React App]
    ↓
HTTP POST /predict
    ↓
[FastAPI Backend]
    ├─ Receive image
    ├─ Preprocess (224×224, EfficientNet normalization)
    ├─ Load model: EfficientNetB1
    └─ Run inference
    ↓
Return JSON Response
    ├─ predicted_class: "Acne"
    ├─ confidence: 0.92
    └─ all_predictions: {...}
    ↓
[Frontend Display Results]
    ├─ Show detected conditions
    ├─ Display confidence levels
    └─ Offer recommendations
```

### Backend API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | Health check & info |
| `/health` | GET | Detailed status |
| `/predict` | POST | Image analysis (main) |
| `/docs` | GET | Interactive API docs |

## 📊 Model Information

**Architecture:** EfficientNetB1 (pretrained on ImageNet)

**Training Strategy:** 3-phase progressive fine-tuning
- Phase 1: Train custom head (frozen base)
- Phase 2: Fine-tune last 50 layers
- Phase 3: Full model fine-tuning (80% unfrozen)

**Performance:**
- Input size: 224×224 pixels
- Accuracy target: 75%+
- Model size: ~180MB

**Data Processing:**
- Balanced classes: 150-600 images per class
- Data augmentation: Rotation, zoom, brightness, shifts
- Train/Val/Test split: 75% / 15% / 10%

## 🔧 Setup & Configuration

### Prerequisites
- Python 3.8+
- Node.js 16+
- ~2GB disk space (for models)

### Backend Setup

```powershell
# 1. Install dependencies
pip install -r requirements.txt

# 2. Verify model files exist
# backend/skin_disease_classifier_improved_efficientnetb1.h5
# backend/class_names_improved.txt

# 3. Run test
python test_api.py

# 4. Start server
uvicorn main:app --reload --port 8000
```

### Frontend Setup

```bash
# 1. Install dependencies
cd Frontend
npm install

# 2. Configure API URL (already set to localhost:8000)
# See: src/utils/mockAnalysis.ts

# 3. Start dev server
npm run dev
```

## 📝 API Documentation

### Test Prediction Endpoint

**Request:**
```bash
curl -X POST "http://localhost:8000/predict" \
  -F "file=@skin_image.jpg"
```

**Response (200 OK):**
```json
{
  "predicted_class": "Acne",
  "confidence": 0.923,
  "all_predictions": {
    "Acne": 0.923,
    "Oily Skin": 0.048,
    "Blackheads": 0.015,
    "Dry Skin": 0.008,
    "Normal Skin": 0.003,
    "Eye Bags": 0.001,
    "Dark Spots": 0.001,
    "Skin Redness": 0.001,
    "Pores": 0.0,
    "Wrinkles": 0.0
  }
}
```

### Error Responses

**400 Bad Request** - Invalid image:
```json
{"detail": "File must be an image (jpg, png, etc.)"}
```

**503 Service Unavailable** - Model not loaded:
```json
{"detail": "Model not loaded. Please check server logs."}
```

## 🧪 Testing

### Run Test Suite
```powershell
python test_api.py
```

Tests:
- ✅ API connectivity
- ✅ Model loading
- ✅ Image processing
- ✅ Prediction accuracy
- ✅ CORS configuration

### Manual Testing

**Option 1: Interactive Docs**
Visit: http://localhost:8000/docs

**Option 2: Python Script**
```python
import requests

with open("test.jpg", "rb") as f:
    resp = requests.post("http://localhost:8000/predict", files={"file": f})
    print(resp.json())
```

**Option 3: Frontend UI**
Simply upload an image through the React app

## 📦 Dependencies

### Backend
- **fastapi** - Web framework
- **uvicorn** - ASGI server
- **tensorflow** - ML framework
- **pillow** - Image processing
- **python-multipart** - File uploads
- **numpy** - Numerical computing

### Frontend
- **react** 19 - UI library
- **typescript** - Type safety
- **tailwind** - Styling
- **vite** - Bundler
- **react-router** - Navigation
- **shadcn/ui** - Components

## 🐛 Troubleshooting

### Backend Issues

**Problem:** "ModuleNotFoundError: No module named 'tensorflow'"
```powershell
# Solution
pip install --upgrade tensorflow
```

**Problem:** "Model not found"
```powershell
# Check these paths exist:
# ✓ backend/skin_disease_classifier_improved_efficientnetb1.h5
# ✓ backend/class_names_improved.txt
```

**Problem:** Port 8000 already in use
```powershell
# Solution - use different port
uvicorn main:app --port 8001
# Update frontend API URL to localhost:8001
```

### Frontend Issues

**Problem:** CORS errors from API
- API already has CORS enabled
- Check React running on `localhost:5173` or `5174`
- Verify API is running on `localhost:8000`

**Problem:** Images not uploading
- Check file size < 10MB
- Ensure format is jpg/png/webp
- Check browser console for errors

## 🚢 Deployment

### Production Setup

**Backend:**
```powershell
# Use Gunicorn instead of uvicorn
pip install gunicorn
gunicorn main:app -w 4 -b 0.0.0.0:8000

# Or Docker
docker build -t skin-classifier .
docker run -p 8000:8000 skin-classifier
```

**Frontend:**
```bash
# Build production bundle
npm run build

# Serve with nginx
# Configure CORS for your domain in main.py
```

### Environment Variables

Create `.env` file:
```
API_URL=https://api.yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

## 📚 Training & Using the Model

### From Scratch

1. Use the Jupyter notebook: `backend/Face_diseases_classification.ipynb`
2. Download data from Roboflow or use `backend/Skin-Problem-MultiLabel-1/`
3. Follow cells 1-27 for complete training pipeline
4. Export model to `backend/skin_disease_classifier_improved_efficientnetb1.h5`

### Using Existing Model

1. Model is already trained in `backend/`
2. API automatically loads it on startup
3. No retraining needed to use the app

## 📊 Model Training Details

Training data: Multi-label skin disease dataset (Roboflow)
Classes balanced: 150-600 images per class
Total images: ~5,000

Data augmentation techniques:
- Rotation (30°)
- Shift (20%)
- Shear (15%)
- Zoom (20%)
- Brightness adjustment (0.8-1.2)

## 🎨 UI Features

- **Hero Section** - Landing page with CTA
- **Image Upload** - Drag & drop, file selector
- **Loading State** - Animated spinner during analysis
- **Results Display** - Cards with severity badges
- **Confidence Bars** - Visual progress indicators
- **Recommendations** - Products and exercises suggestions
- **Responsive Design** - Mobile, tablet, desktop

## 📈 Performance Metrics

- 💾 Model size: ~180MB
- ⚡ Inference time: 1-2 seconds per image
- 📊 Accuracy: 75%+ on test set
- 🎯 Top-2 accuracy: 85%+

## 🔐 Security Considerations

- ✅ CORS configured for specific origins
- ✅ File size limit (10MB max)
- ✅ File type validation
- ✅ Error messages don't leak sensitive info
- 🔄 Consider adding: Authentication, rate limiting, HTTPS

## 📞 Support & Questions

For issues:
1. Check `SETUP.md` for detailed configuration
2. Review logs in console
3. Run `test_api.py` to diagnose issues
4. Check API docs at http://localhost:8000/docs

## 📄 License

This project is for educational purposes.

## 🎓 Made with

- TensorFlow & Keras
- FastAPI
- React 19
- Tailwind CSS

---

**👨‍💻 Created:** 2026 | FYP: Face Diseases Classification

**Last Updated:** February 2026

