#!/usr/bin/env python3
"""
Test script for Skin Disease Classification API
Run this to verify the API is working correctly
"""

import requests
import json
from pathlib import Path
from PIL import Image
import io

API_URL = "http://localhost:8000"

def test_health_check():
    """Test if API is running"""
    print("\n" + "="*60)
    print("🏥 Testing Health Check Endpoint")
    print("="*60)
    
    try:
        response = requests.get(f"{API_URL}/health")
        data = response.json()
        
        print(f"✅ Status: {data['status']}")
        print(f"✅ Model Loaded: {data['model_loaded']}")
        print(f"✅ Classes Loaded: {data['classes_loaded']}")
        print(f"✅ Number of Classes: {data['num_classes']}")
        print(f"✅ Classes: {', '.join(data['class_names'])}")
        
        return True
    except requests.exceptions.ConnectionError:
        print("❌ ERROR: Cannot connect to API!")
        print("   Make sure to run: uvicorn main:app --reload")
        return False
    except Exception as e:
        print(f"❌ ERROR: {e}")
        return False


def test_prediction_with_test_image():
    """Test prediction with a test image"""
    print("\n" + "="*60)
    print("🖼️  Testing Prediction Endpoint")
    print("="*60)
    
    # List of test images to find
    test_image_paths = [
        "test_image.jpg",
        "test.jpg",
        "backend/Skin-Problem-MultiLabel-1/test/Acne/",
    ]
    
    test_image = None
    for path in test_image_paths:
        p = Path(path)
        if p.is_file():
            test_image = p
            break
        elif p.is_dir():
            # Find first image in directory
            images = list(p.glob("*.jpg")) + list(p.glob("*.png"))
            if images:
                test_image = images[0]
                break
    
    if not test_image:
        print("⚠️  No test image found. Creating a test image...")
        test_image = create_test_image()
    
    if not test_image:
        print("❌ ERROR: Could not create test image")
        return False
    
    print(f"📷 Using image: {test_image}")
    
    try:
        with open(test_image, "rb") as f:
            files = {"file": f}
            response = requests.post(f"{API_URL}/predict", files=files)
        
        if response.status_code != 200:
            print(f"❌ ERROR: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
        
        data = response.json()
        
        print(f"\n✅ PREDICTION SUCCESSFUL!")
        print(f"   Predicted Class: {data['predicted_class']}")
        print(f"   Confidence: {data['confidence']:.1%}")
        print(f"\n📊 All Predictions (Top 5):")
        
        for i, (cls, prob) in enumerate(list(data['all_predictions'].items())[:5], 1):
            bar_len = int(prob * 30)
            bar = "█" * bar_len + "░" * (30 - bar_len)
            print(f"   {i}. {cls:20} {bar} {prob:.1%}")
        
        return True
        
    except requests.exceptions.ConnectionError:
        print("❌ ERROR: Cannot connect to API!")
        return False
    except Exception as e:
        print(f"❌ ERROR: {e}")
        return False


def create_test_image():
    """Create a simple test image"""
    try:
        img = Image.new('RGB', (224, 224), color='blue')
        img_path = Path("test_image.jpg")
        img.save(img_path)
        print(f"✅ Created test image: {img_path}")
        return img_path
    except Exception as e:
        print(f"❌ Failed to create test image: {e}")
        return None


def test_cors():
    """Test CORS settings"""
    print("\n" + "="*60)
    print("🌐 Testing CORS Configuration")
    print("="*60)
    
    try:
        response = requests.get(
            f"{API_URL}/health",
            headers={
                "Origin": "http://localhost:5173",
                "Access-Control-Request-Method": "POST"
            }
        )
        
        cors_origin = response.headers.get("access-control-allow-origin")
        if cors_origin:
            print(f"✅ CORS Enabled for: {cors_origin}")
        else:
            print("⚠️  CORS headers not found (may still work)")
        
        return True
    except Exception as e:
        print(f"❌ ERROR: {e}")
        return False


def main():
    """Run all tests"""
    print("""
╔════════════════════════════════════════════════════════╗
║   Skin Disease Classification API - Test Suite        ║
╚════════════════════════════════════════════════════════╝
    """)
    
    print("Checking if API is running at:", API_URL)
    
    tests = [
        ("Health Check", test_health_check),
        ("CORS Configuration", test_cors),
        ("Prediction", test_prediction_with_test_image),
    ]
    
    results = []
    for test_name, test_func in tests:
        result = test_func()
        results.append((test_name, result))
    
    print("\n" + "="*60)
    print("📋 TEST SUMMARY")
    print("="*60)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    all_passed = all(result for _, result in results)
    
    if all_passed:
        print("\n🎉 ALL TESTS PASSED!")
        print("✅ API is ready to use with the React frontend!")
    else:
        print("\n⚠️  Some tests failed. Check the errors above.")
    
    print("\n" + "="*60)
    print("Next Steps:")
    print("  1. Start React frontend: cd Frontend && npm run dev")
    print("  2. Open browser: http://localhost:5173")
    print("  3. Upload an image to test the full pipeline")
    print("="*60 + "\n")


if __name__ == "__main__":
    main()
