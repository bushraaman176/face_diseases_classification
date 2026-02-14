# 🏗️ System Architecture & Flow

## Complete Application Flow

```
┌─────────────────────────────────────────────────────────┐
│                   USER INTERACTION                      │
│                  (Browser Interface)                    │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
    ┌──────────────────────────────────────────────────┐
    │          FRONTEND (React 19 + TypeScript)        │
    │         http://localhost:5173                     │
    ├──────────────────────────────────────────────────┤
    │  Components:                                     │
    │  ├─ Hero.tsx          (Landing page)            │
    │  ├─ ImageUpload.tsx   (File upload/drag-drop)   │
    │  ├─ AnalysisResults.tsx (Display predictions)   │
    │  ├─ ProductRecommendations.tsx (Products)       │
    │  └─ ExerciseVideos.tsx (Exercises)              │
    ├──────────────────────────────────────────────────┤
    │  Libraries:                                      │
    │  • React 19.1.1 (UI)                             │
    │  • React Router v7 (Navigation)                  │
    │  • Tailwind CSS (Styling)                        │
    │  • Shadcn/UI (Components)                        │
    │  • Vite (Bundler)                                │
    └──────────────────┬───────────────────────────────┘
                       │
                       │ HTTP POST
                       │ /predict
                       │ multipart/form-data
                       ▼
    ┌──────────────────────────────────────────────────┐
    │     BACKEND API (FastAPI + TensorFlow)           │
    │      http://localhost:8000                        │
    ├──────────────────────────────────────────────────┤
    │  Main Components:                                │
    │                                                  │
    │  1. Request Handler                              │
    │     ├─ Receive image file                        │
    │     ├─ Validate format (jpg/png/webp)           │
    │     └─ Validate size (<10MB)                     │
    │                                                  │
    │  2. Image Preprocessor                           │
    │     ├─ Decode image bytes                        │
    │     ├─ Convert to RGB                            │
    │     ├─ Resize → 224×224 (LANCZOS)               │
    │     └─ Apply EfficientNet normalization          │
    │         └─ pixel values [-1, 1]                  │
    │                                                  │
    │  3. Model Inference                              │
    │     ├─ Load: skin_disease_classifier_           │
    │     │       improved_efficientnetb1.h5           │
    │     ├─ Model: EfficientNetB1 (trained)          │
    │     ├─ Input: 224×224×3 RGB image              │
    │     └─ Output: 9 class probabilities             │
    │                                                  │
    │  4. Response Handler                             │
    │     ├─ Extract top prediction                    │
    │     ├─ Get confidence score                      │
    │     ├─ Sort all predictions                      │
    │     └─ Return JSON response                      │
    │                                                  │
    │  Endpoints:                                      │
    │  ├─ GET  /          → API info                   │
    │  ├─ GET  /health    → Status & model info        │
    │  ├─ POST /predict   → Main endpoint (image)      │
    │  ├─ GET  /docs      → Swagger UI documentation  │
    │  └─ GET  /openapi.json → OpenAPI spec           │
    └──────────────────┬───────────────────────────────┘
                       │
                       │ JSON Response
                       │ {
                       │   "predicted_class": "Acne",
                       │   "confidence": 0.923,
                       │   "all_predictions": {...}
                       │ }
                       ▼
    ┌──────────────────────────────────────────────────┐
    │           DISPLAY RESULTS TO USER                │
    │     (Analysis Results Component)                 │
    ├──────────────────────────────────────────────────┤
    │                                                  │
    │  ✓ Detected Classes                              │
    │    - Acne (92.3%) [HIGH]                         │
    │    - Oily Skin (4.8%) [MEDIUM]                   │
    │    - Blackheads (1.5%) [LOW]                     │
    │                                                  │
    │  ✓ Recommended Actions                           │
    │    1. View Product Recommendations               │
    │    2. View Exercise Recommendations              │
    │                                                  │
    │  ✓ Next Steps                                    │
    │    - Analyze Another Photo                       │
    │    - Learn More                                  │
    │                                                  │
    └──────────────────────────────────────────────────┘
```

---

## 📁 File Organization

```
face_diseases_classification/
│
├── 📂 backend/                          (ML Models & Training)
│   ├── 📄 Face_diseases_classification.ipynb
│   │   └─ Training pipeline (27 cells)
│   │     • Data download & preprocessing
│   │     • Class balancing (merge + augmentation)
│   │     • EfficientNetB1 training (3 phases)
│   │     • Model evaluation & testing
│   │
│   ├── 🤖 skin_disease_classifier_improved_efficientnetb1.h5
│   │   └─ Trained model (180MB)
│   │     • EfficientNetB1 base + custom head
│   │     • Input: 224×224×3 RGB
│   │     • Output: 9 class probabilities
│   │     • Accuracy: 75%+ on test set
│   │
│   ├── 📄 class_names_improved.txt
│   │   └─ 9 class labels (one per line)
│   │
│   └── 📂 Skin-Problem-MultiLabel-1/
│       ├── train/          (75% of data)
│       ├── val/            (15% of data)
│       └── test/           (10% of data)
│
├── 📂 Frontend/                         (React Frontend)
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   │
│   └── 📂 src/
│       ├── 📄 App.tsx              (Main app router)
│       ├── 📄 main.tsx             (Entry point)
│       │
│       ├── 📂 pages/
│       │   ├── Index.tsx           (Main page with all logic)
│       │   └── NotFound.tsx        (404 page)
│       │
│       ├── 📂 components/
│       │   ├── Hero.tsx            (Landing section)
│       │   ├── ImageUpload.tsx     (File uploader)
│       │   ├── AnalysisResults.tsx (Results display)
│       │   ├── ProductRecommendations.tsx
│       │   ├── ExerciseVideos.tsx
│       │   └─ ui/                  (Shadcn components)
│       │
│       ├── 📂 utils/
│       │   └── mockAnalysis.ts     (API calls)
│       │
│       ├── 📂 data/
│       │   ├── mockProducts.ts
│       │   └── mockExercises.ts
│       │
│       └── 📂 hooks/
│           └── use-toast.ts
│
├── 🔧 main.py                         (FastAPI Backend) ✨
│   ├─ Load model on startup
│   ├─ Image preprocessing
│   ├─ Model inference (/predict endpoint)
│   └─ CORS configuration
│
├── 📋 requirements.txt                (Python dependencies)
│   ├─ fastapi
│   ├─ uvicorn
│   ├─ tensorflow
│   └─ pillow
│
├── 📖 README.md                       (Full documentation)
├── 🚀 QUICKSTART.md                   (5-minute setup)
├── 📝 SETUP.md                        (Detailed guide)
└── 🧪 test_api.py                    (API test suite)
```

---

## 🔄 Data Flow During Prediction

```
                      USER UPLOADS IMAGE
                              │
                              ▼
┌─────────────────────────────────────────────────┐
│  Frontend: Image Processing                     │
├─────────────────────────────────────────────────┤
│  1. Read file from input                        │
│  2. Validate: type (image/*)                    │
│  3. Validate: size (<10MB)                      │
│  4. Create: FormData with file                  │
│  5. Display: Preview to user                    │
└────────────────┬────────────────────────────────┘
                 │
                 ▼ POST /predict
    ┌────────────────────────────────────┐
    │  Request Headers                   │
    ├────────────────────────────────────┤
    │  Content-Type: multipart/form-data │
    │  Origin: http://localhost:5173     │
    └────────────────┬────────────────────┘
                     │
                     ▼
    ┌────────────────────────────────────┐
    │  Backend: Receive Request          │
    ├────────────────────────────────────┤
    │  1. Validate CORS origin           │
    │  2. Check file exists              │
    │  3. Check content-type is image    │
    └────────────────┬────────────────────┘
                     │
                     ▼
    ┌────────────────────────────────────┐
    │  Backend: Preprocess Image         │
    ├────────────────────────────────────┤
    │  1. Decode image bytes             │
    │  2. Convert to RGB (if needed)     │
    │  3. Resize to 224×224              │
    │  4. Normalize (EfficientNet)       │
    │  5. Add batch dimension [1,224,224,3]
    │  6. Ready for model                │
    └────────────────┬────────────────────┘
                     │
                     ▼
    ┌────────────────────────────────────┐
    │  TensorFlow Model Inference        │
    ├────────────────────────────────────┤
    │  Input: [1, 224, 224, 3]           │
    │         (batch, height, width, RGB)│
    │                                    │
    │  Model: EfficientNetB1 (trained)   │
    │  ├─ Base: EfficientNetB1           │
    │  │  └─ Pooling: Average            │
    │  │                                 │
    │  └─ Head: Custom layers            │
    │     ├─ Dense(512) + BatchNorm      │
    │     ├─ Dense(256) + BatchNorm      │
    │     ├─ Dense(128) + BatchNorm      │
    │     └─ Dense(9) + Softmax          │
    │                                    │
    │  Output: [1, 9] probabilities      │
    │          (batch, 9 classes)        │
    └────────────────┬────────────────────┘
                     │
                     ▼
    ┌────────────────────────────────────┐
    │  Backend: Process Results          │
    ├────────────────────────────────────┤
    │  1. Extract predictions [1, 9]     │
    │  2. Get predicted_idx = argmax()   │
    │  3. Get confidence = max(probs)    │
    │  4. Map idx → class name           │
    │  5. Create dict of all predictions │
    │  6. Sort by confidence (descending)│
    │  7. Build JSON response            │
    └────────────────┬────────────────────┘
                     │
                     ▼ HTTP 200 OK
    ┌────────────────────────────────────┐
    │  JSON Response                     │
    ├────────────────────────────────────┤
    │  {                                 │
    │    "predicted_class": "Acne",      │
    │    "confidence": 0.923,            │
    │    "all_predictions": {            │
    │      "Acne": 0.923,                │
    │      "Oily Skin": 0.048,           │
    │      "Blackheads": 0.015,          │
    │      ...                           │
    │    }                               │
    │  }                                 │
    └────────────────┬────────────────────┘
                     │
                     ▼
    ┌────────────────────────────────────┐
    │  Frontend: Display Results         │
    ├────────────────────────────────────┤
    │  1. Parse JSON response            │
    │  2. Extract top predictions        │
    │  3. Filter >5% confidence          │
    │  4. Create SkinIssue objects       │
    │  5. Map to product recommendations │
    │  6. Map to exercise recommendations│
    │  7. Render AnalysisResults         │
    │  8. Show recommendations choice    │
    └────────────────┬────────────────────┘
                     │
                     ▼
                USER SEES RESULTS
```

---

## 🔌 Technology Stack

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| React | UI Library | 19.1.1 |
| TypeScript | Type Safety | 5.x |
| Vite | Bundler | 5.x |
| Tailwind CSS | Styling | 3.x |
| React Router | Navigation | 7.9.5 |
| Shadcn/UI | Components | Latest |
| Lucide React | Icons | 0.552.0 |

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| FastAPI | Web Framework | 0.104.1 |
| Uvicorn | ASGI Server | 0.24.0 |
| TensorFlow | ML Framework | 2.14.0 |
| Keras | Neural Networks | Built-in |
| Pillow | Image Processing | 10.1.0 |
| NumPy | Numerical Ops | 1.24.3 |
| Pydantic | Validation | 2.5.0 |

### ML Model
| Component | Details |
|-----------|---------|
| Base Model | EfficientNetB1 (ImageNet weights) |
| Input Size | 224×224×3 RGB |
| Output | 9 class probabilities |
| Training Method | 3-phase progressive fine-tuning |
| Loss Function | Categorical Crossentropy (label smoothing 0.1) |
| Optimizer | Adam (adaptive learning rate) |
| Accuracy | 75%+ on test set |

---

## 📊 Model Architecture

```
┌────────────────────────────────┐
│   Input Layer (224×224×3)      │
└──────────────┬─────────────────┘
               │
      ┌────────▼────────────┐
      │  EfficientNetB1      │ (Pretrained on ImageNet)
      │  (Backbone)          │ • 231 convolutional layers
      │  Remove top layer    │ • ~5.3M parameters
      │  Add Pooling (Avg)   │ • Output: 1280 features
      └────────┬─────────────┘
               │
      ┌────────▼────────────┐
      │  Custom Head         │ (Trainable)
      ├──────────────────────┤
      │ Dropout(0.5)         │
      │ Dense(512) + ReLU    │
      │ BatchNorm()          │
      │ Dropout(0.4)         │
      │                      │
      │ Dense(256) + ReLU    │
      │ BatchNorm()          │
      │ Dropout(0.3)         │
      │                      │
      │ Dense(128) + ReLU    │
      │ BatchNorm()          │
      │ Dropout(0.2)         │
      │                      │
      │ Dense(9) + Softmax   │
      └────────┬─────────────┘
               │
     ┌─────────▼──────────────┐
     │ Output Layer (9 classes)│
     └────────────────────────┘

Classes: Acne, Blackheads, Dark Spots, Dry Skin,
         Eye Bags, Normal Skin, Oily Skin,
         Pores, Skin Redness, Wrinkles
```

---

## ⚙️ Model Training Process

```
Phase 1: HEAD ONLY (Base Frozen)
├─ Freeze EfficientNetB1 weights
├─ Train only custom head (512→256→128→9)
├─ 25 epochs with early stopping
└─ Best validation accuracy: ~85%

            ↓

Phase 2: PROGRESSIVE UNFREEZING
├─ Unfreeze last 50 layers of EfficientNetB1
├─ Lower learning rate (5e-5)
├─ Fine-tune head + last layers
├─ 20 epochs with early stopping
└─ Best validation accuracy: ~88%

            ↓

Phase 3: FULL MODEL TRAINING
├─ Keep first 20% layers frozen
├─ Training rest 80% of model
├─ Even lower learning rate (2e-5)
├─ 15 epochs with early stopping
└─ Final validation accuracy: ~90%+
```

---

## 🔐 API Security

- ✅ CORS enabled for React dev servers
- ✅ File type validation (image/* only)
- ✅ File size limit (10MB max)
- ✅ Error handling (no sensitive info leaked)
- ✅ Input validation (PIL image parsing)
- 🔄 To add: Authentication, rate limiting, HTTPS

---

## 📈 Performance Characteristics

| Metric | Value |
|--------|-------|
| Model Size | ~180MB |
| Inference Time | 1-2 seconds |
| Accuracy | 75%+ |
| Top-2 Accuracy | 85%+ |
| Supported Image Formats | JPG, PNG, WebP, GIF, BMP |
| Max Image Size | 10MB |
| Batch Size | 1 (single image) |
| Number of Classes | 9 |
| Model Type | CNN (EfficientNetB1) |

---

This architecture ensures:
- 🚀 Fast predictions (GPU-optimized)
- 🎯 High accuracy (domain-specific training)
- 📱 Responsive UI (async loading states)
- 🔄 Seamless integration (CORS-enabled API)
- 🛡️ Robustness (comprehensive error handling)
