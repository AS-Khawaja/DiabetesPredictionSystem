from flask import Flask, request, jsonify
import pandas as pd
import pickle
from flask_cors import CORS

# Load the trained model from .pkl
with open('./diabetes.pkl', 'rb') as file:
    model = pickle.load(file)

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        df = pd.DataFrame([data])

        prediction = model.predict(df)[0]
        probabilities = model.predict_proba(df)[0]
        probability = probabilities[1]  # Probability of class 1 (diabetes)

        print(f"Prediction: {prediction}, Probability of Diabetes: {probability:.4f}")

        return jsonify({
            "Diabetes": int(prediction),
            "Probability": probability
        }), 200

    except Exception as e:
        import traceback
        traceback.print_exc()

        return jsonify({"error": str(e)}), 500

@app.route('/')
def home():
    return "Welcome to the Diabetes Prediction API"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
