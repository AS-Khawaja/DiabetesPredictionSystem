
# 🩺 Diabetes Prediction System

A web-based system that predicts the likelihood of diabetes using machine learning.  
Built with a **React + TypeScript frontend** and a **Flask + Python backend**.

---

## 📁 Project Structure

```
diabetes-prediction-system/
├── backend/               # Flask backend and ML model
│   ├── app.py             # Flask application
│   ├── model.pkl          # Trained ML model
│   ├── requirements.txt   # Backend dependencies
│
└── frontend/              # React TypeScript frontend
    ├── src/
    ├── public/
    ├── package.json
    └── tsconfig.json
```

---

## ⚙️ Tech Stack

### 🧠 Backend:
- Python 3.8+
- Flask
- scikit-learn
- pickle
- Flask-CORS

### 🌐 Frontend:
- React
- TypeScript
---

## 🚀 Getting Started

### 🔧 Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- pip / virtualenv

---

## 🔙 Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. (Optional) Create and activate a virtual environment:

```bash
python -m venv venv
# On Linux/macOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run the Flask server:

```bash
python app.py
```

The Flask backend will run at: `http://127.0.0.1:5000`

---

## 🌐 Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install frontend dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

---

## 🔁 Connecting Frontend with Backend

Ensure your frontend code is sending requests to the correct backend URL.  
Example using Axios:

```ts
const BASE_URL = "http://127.0.0.1:5000";
axios.post(`${BASE_URL}/predict`, inputData);
```

---

## 🧪 Using the App

1. Open the frontend in your browser.
2. Fill out the form with medical values:
   - Glucose
   - Blood Pressure
   - BMI
   - Age
   - etc.
3. Click the **Predict** button.
4. View the prediction result: **"Diabetic"** or **"Not Diabetic"**.

---

## 📄 License

MIT License.

---

## 👤 Author

**AS Khawaja**  
_If you find this useful, contributions and suggestions are welcome!_
