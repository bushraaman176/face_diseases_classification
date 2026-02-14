# 🚀 Quick Start - 5 Minutes to Running

## Step 1: Install Backend Dependencies (1 min)

```powershell
# In your project root directory
pip install -r requirements.txt
```

## Step 2: Verify Model Files Exist (30 sec)

Check these files are in `backend/` folder:
- ✅ `skin_disease_classifier_improved_efficientnetb1.h5` (180MB)
- ✅ `class_names_improved.txt` (small text file)

If missing, run your training notebook first (see `SETUP.md`)

## Step 3: Start API Server (30 sec)

```powershell
# From project root directory
uvicorn main:app --reload
```

You should see:
```
╔════════════════════════════════════════════════════════╗
║   Skin Disease Classification API - v2.0              ║
║   Model: EfficientNetB1 with Progressive Fine-tuning  ║
╚════════════════════════════════════════════════════════╝

✅ Model loaded from: backend/skin_disease_classifier_improved_efficientnetb1.h5
✅ Class names loaded from: backend/class_names_improved.txt
✅ API ready! Model has 9 classes

INFO:     Uvicorn running on http://0.0.0.0:8000
```

**💡 Test API:** Open http://localhost:8000/docs and try uploading an image

## Step 4: Start React Frontend (1 min)

**In a NEW terminal window:**

```bash
cd Frontend
npm install          # (only first time)
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms
  
  ➜  Local:   http://localhost:5173/
```

**Open browser:** http://localhost:5173

## Step 5: Test Full Application (1 min)

1. Click **"Get Started"** button
2. Upload or drag-drop an image of a face
3. Wait for analysis (1-2 seconds)
4. View skin condition predictions
5. Explore product/exercise recommendations

---

## 📊 What Was Created

| File | Purpose |
|------|---------|
| `main.py` | FastAPI backend with prediction endpoint ✨ |
| `requirements.txt` | Python dependencies |
| `README.md` | Complete project documentation |
| `SETUP.md` | Detailed setup & deployment guide |
| `test_api.py` | Automated API testing script |

---

## ✨ Key Features

✅ **AI Model:** EfficientNetB1 with 3-phase progressive fine-tuning  
✅ **Accuracy:** 75%+ on 9 skin conditions  
✅ **Speed:** 1-2 seconds per prediction  
✅ **UI:** Modern React 19 with Tailwind CSS  
✅ **API Docs:** Interactive Swagger UI at /docs  
✅ **Error Handling:** Comprehensive error messages  
✅ **CORS Ready:** Configured for React frontend  

---

## 🔧 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | API info & status |
| `/health` | GET | Model & system status |
| `/predict` | POST | Main prediction endpoint |
| `/docs` | GET | Interactive API docs |

---

## 🧪 Verify Everything Works

```powershell
python test_api.py
```

This will check:
- ✅ Backend connectivity
- ✅ Model loading
- ✅ Image processing
- ✅ Prediction accuracy
- ✅ CORS settings

---

## 🎯 File Upload Flow

```
User clicks upload → Image → Frontend
                              ↓
                        POST /predict
                              ↓
                           Backend
                              ↓
                     Preprocess image (224×224)
                              ↓
                     EfficientNetB1 model
                              ↓
                     Return predictions (JSON)
                              ↓
                     Frontend displays results
```

---

## 📱 Supported Image Formats

- JPG / JPEG
- PNG
- WebP
- GIF
- BMP

**Max size:** 10MB

---

## ⚡ Performance Tips

- Keep images under 5MB for fastest processing
- Use well-lit photos for best accuracy
- Ensure face is clearly visible
- Center the face in image

---

## 🆘 Troubleshooting

### "Model not found" error
```powershell
# Check file exists
ls backend/skin_disease_classifier_improved_efficientnetb1.h5
ls backend/class_names_improved.txt
```

### "Port 8000 already in use"
```powershell
# Use different port
uvicorn main:app --reload --port 8001

# Then update Frontend/src/utils/mockAnalysis.ts
# Change: 'http://localhost:8000/predict'
# To:     'http://localhost:8001/predict'
```

### CORS errors in browser
- API already configured for React dev servers
- Ensure React is on `localhost:5173` or `5174`
- API running on `localhost:8000`

### Out of memory
- Close other applications
- Use smaller images (224×224)
- Reduce batch processing

---

## 📚 Next Steps

1. ✅ **Run tests:** `python test_api.py`
2. ✅ **Try API docs:** http://localhost:8000/docs
3. ✅ **Use frontend:** http://localhost:5173
4. ✅ **Read full docs:** See `README.md` and `SETUP.md`
5. 📦 **Deploy:** Follow guide in `SETUP.md` deployment section

---

## 📞 Need Help?

1. Check `test_api.py` output for diagnostics
2. Review console logs in both terminal windows
3. Check API docs at http://localhost:8000/docs
4. See troubleshooting in `SETUP.md`

---

**Happy analyzing! 🎉**

Your AI skincare advisor is now live! 💅✨
