import streamlit as st
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from PIL import Image

# ---------------------------------------------------------
# 🧩 Load your trained model
# ---------------------------------------------------------
@st.cache_resource
def load_face_disease_model():
    model = tf.keras.models.load_model("best_head_only.h5")  # update if different name
    return model

model = load_face_disease_model()

# ---------------------------------------------------------
# 🏷️ Define class names (same as training order)
# ---------------------------------------------------------
class_names = ['Acne', 'Blackheads', 'Dark Spots', 'Dry Skin',
               'Eye Bags', 'Normal Skin', 'Oily Skin',
               'Pores', 'Skin Redness', 'Wrinkles']

# ---------------------------------------------------------
# ⚙️ Function to preprocess and predict
# ---------------------------------------------------------
def predict_disease(img):
    img = img.resize((224, 224))  # adjust to your model input size
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    preds = model.predict(img_array)[0]
    preds_percent = preds * 100
    return dict(zip(class_names, preds_percent))

# ---------------------------------------------------------
# 🎨 Streamlit UI
# ---------------------------------------------------------
st.set_page_config(page_title="Face Disease Classifier", page_icon="🧠", layout="centered")

st.title("🧠 Face Disease Classification")
st.write("Upload a face image, and the model will predict possible **skin disease probabilities**.")

uploaded_file = st.file_uploader("📤 Upload an image", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    # Show the uploaded image
    img = Image.open(uploaded_file)
    st.image(img, caption="Uploaded Image", use_column_width=True)

    # Predict button
    if st.button("🔍 Predict Face Disease"):
        with st.spinner("Analyzing the image..."):
            results = predict_disease(img)

        st.success("✅ Prediction Complete!")
        st.subheader("Disease Probabilities (%)")

        # Display results in a clean table
        for disease, prob in results.items():
            st.write(f"**{disease}**: {prob:.2f}%")

        # Optional: show bar chart
        st.bar_chart(results)

st.markdown("---")
st.markdown("👨‍⚕️ *Developed by Bushra Aman — AI-powered Skin Health Analysis System*")
