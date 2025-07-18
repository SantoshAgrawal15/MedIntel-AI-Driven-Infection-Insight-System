# # app.py
# from flask import Flask, request, jsonify
# import joblib
# import numpy as np
# import pandas as pd

# app = Flask(__name__)

# # Load the trained model and training columns
# model = joblib.load('iris_model.joblib')
# training_columns = joblib.load('training_columns.joblib')

# def encode_features(data):
#     df = pd.DataFrame([data])
#     df_encoded = pd.get_dummies(df, columns=["Procedure_Name", "Gender", "Diabetes_Status", "Wound_Class"], drop_first=True)
#     aligned_data = pd.DataFrame(0, index=np.arange(1), columns=training_columns)
#     aligned_data.update(df_encoded)
#     return aligned_data.to_numpy()

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         input_data = request.json.get('data')
#         if not isinstance(input_data, dict):
#             return jsonify({'error': 'Input data must be a dictionary'}), 400

#         input_array = encode_features(input_data)
#         print("Input shape:", input_array.shape)  # Debugging: check input shape

#         prediction = model.predict(input_array)[0]
#         return jsonify({"prediction": prediction}), 200

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)

# app.py
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import joblib
# import numpy as np
# import pandas as pd
# import os

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Global variables for model and columns
# model = None
# training_columns = None
# scaler = None

# def load_models():
#     global model, training_columns, scaler
    
#     try:
#         # Try to load different model files in order of preference
#         model_files = ['trained_model.joblib', 'ssi_model.joblib', 'iris_model.joblib']
        
#         for model_file in model_files:
#             if os.path.exists(model_file):
#                 print(f"🔄 Loading model from {model_file}...")
#                 model = joblib.load(model_file)
#                 print(f"✅ Model loaded successfully from {model_file}")
#                 break
        
#         # Load training columns
#         if os.path.exists('training_columns.joblib'):
#             training_columns = joblib.load('training_columns.joblib')
#             print(f"✅ Training columns loaded: {len(training_columns)} features")
#             print(f"📋 Features: {training_columns[:5]}..." if len(training_columns) > 5 else f"📋 Features: {training_columns}")
#         else:
#             print("⚠️ training_columns.joblib not found")
            
#         # Try to load scaler if available
#         if os.path.exists('scaler.joblib'):
#             scaler = joblib.load('scaler.joblib')
#             print("✅ Scaler loaded successfully")
#         else:
#             print("ℹ️ No scaler found - will proceed without scaling")
            
#         return model is not None
        
#     except Exception as e:
#         print(f"❌ Error loading models: {e}")
#         return False

# def encode_features(data):
#     """
#     Convert input data to the format expected by the trained model
#     """
#     try:
#         print(f"🔄 Processing input data: {data}")
        
#         # Create DataFrame from input data
#         df = pd.DataFrame([data])
        
#         # Handle categorical encoding - match your training process
#         categorical_columns = ["Procedure_Name", "Gender", "Diabetes_Status", "Wound_Class"]
        
#         # One-hot encode categorical variables (drop_first=True to match training)
#         df_encoded = pd.get_dummies(df, columns=categorical_columns, drop_first=True)
        
#         print(f"📊 After encoding: {df_encoded.columns.tolist()}")
        
#         if training_columns is not None:
#             # Create DataFrame with all training columns initialized to 0
#             aligned_data = pd.DataFrame(0, index=np.arange(1), columns=training_columns)
            
#             # Update with encoded data where columns match
#             for col in df_encoded.columns:
#                 if col in training_columns:
#                     aligned_data[col] = df_encoded[col].values
                    
#             print(f"✅ Data aligned to training format: {aligned_data.shape}")
#             result = aligned_data.to_numpy()
#         else:
#             print("⚠️ Using encoded data without alignment")
#             result = df_encoded.to_numpy()
            
#         # Apply scaling if scaler is available
#         if scaler is not None:
#             result = scaler.transform(result)
#             print("✅ Data scaled")
            
#         return result
        
#     except Exception as e:
#         print(f"❌ Error in encode_features: {e}")
#         raise e

# @app.route('/test', methods=['GET'])
# def test():
#     return jsonify({
#         'message': 'Flask ML API is working!',
#         'model_loaded': model is not None,
#         'training_columns_loaded': training_columns is not None,
#         'scaler_loaded': scaler is not None,
#         'num_features': len(training_columns) if training_columns else 0,
#         'status': 'success'
#     })

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         # Get input data
#         request_data = request.get_json()
        
#         if not request_data or 'data' not in request_data:
#             return jsonify({'error': 'No data provided. Expected format: {"data": {...}}'}), 400
        
#         input_data = request_data['data']
#         print(f"📥 Received data: {input_data}")
        
#         if model is None:
#             return jsonify({'error': 'Model not loaded'}), 500
        
#         # Convert input data to the format expected by the model
#         if isinstance(input_data, dict):
#             # Map frontend field names to model expected names
#             processed_data = {
#                 'Age': input_data.get('Age', 0),
#                 'BMI': input_data.get('BMI', 0),
#                 'Procedure_Duration': input_data.get('Procedure_Duration', 0),
#                 'Procedure_Name': input_data.get('Procedure_Name', 'Unknown'),
#                 'Gender': input_data.get('Gender', 'Male'),
#                 'Diabetes_Status': input_data.get('Diabetes_Status', 'No'),
#                 'Wound_Class': input_data.get('Wound_Class', 'Clean')
#             }
#         else:
#             return jsonify({'error': 'Input data must be a dictionary'}), 400
        
#         # Encode features
#         input_array = encode_features(processed_data)
#         print(f"📐 Input array shape: {input_array.shape}")
        
#         # Make prediction
#         prediction = model.predict(input_array)
#         pred_value = int(prediction[0])
        
#         # Get prediction probability if available
#         try:
#             probability = model.predict_proba(input_array)
#             if len(probability[0]) > 1:
#                 prob_positive = float(probability[0][1])  # Probability of positive class
#                 prob_negative = float(probability[0][0])  # Probability of negative class
#             else:
#                 prob_positive = float(probability[0][0])
#                 prob_negative = 1.0 - prob_positive
#         except Exception as prob_error:
#             print(f"⚠️ Could not get probabilities: {prob_error}")
#             prob_positive = 0.5
#             prob_negative = 0.5
        
#         # Determine risk level
#         if prob_positive > 0.7:
#             risk_level = 'High'
#             risk_color = 'red'
#         elif prob_positive > 0.4:
#             risk_level = 'Medium'
#             risk_color = 'orange'
#         else:
#             risk_level = 'Low'
#             risk_color = 'green'
        
#         result = {
#             'prediction': pred_value,
#             'probability_positive': round(prob_positive, 4),
#             'probability_negative': round(prob_negative, 4),
#             'risk_level': risk_level,
#             'risk_color': risk_color,
#             'confidence': round(max(prob_positive, prob_negative), 4),
#             'input_processed': processed_data,
#             'message': 'Prediction successful'
#         }
        
#         print(f"📤 Prediction result: {result}")
#         return jsonify(result), 200
        
#     except Exception as e:
#         print(f"❌ Error during prediction: {e}")
#         return jsonify({
#             'error': f'Prediction failed: {str(e)}',
#             'input_received': request_data.get('data', 'No data') if 'request_data' in locals() else 'No data'
#         }), 500

# @app.route('/health', methods=['GET'])
# def health():
#     return jsonify({
#         'status': 'healthy',
#         'model_status': 'loaded' if model else 'not_loaded',
#         'features_count': len(training_columns) if training_columns else 0
#     })

# @app.route('/model-info', methods=['GET'])
# def model_info():
#     """Get information about the loaded model"""
#     if model is None:
#         return jsonify({'error': 'No model loaded'}), 404
    
#     try:
#         model_info = {
#             'model_type': str(type(model).__name__),
#             'features_count': len(training_columns) if training_columns else 0,
#             'has_scaler': scaler is not None
#         }
        
#         # Try to get more model info
#         if hasattr(model, 'n_estimators'):
#             model_info['n_estimators'] = model.n_estimators
#         if hasattr(model, 'feature_importances_'):
#             model_info['has_feature_importance'] = True
            
#         return jsonify(model_info)
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     print("🚀 Starting Flask ML API...")
    
#     # Load models on startup
#     if load_models():
#         print("🎯 All models loaded successfully!")
#     else:
#         print("⚠️ Some models failed to load, but server will still start")
    
#     print("🌐 API will be available at: http://127.0.0.1:5000")
#     print("🧪 Test endpoints:")
#     print("   - GET  /test")
#     print("   - GET  /health") 
#     print("   - GET  /model-info")
#     print("   - POST /predict")
    
#     app.run(debug=True, host='127.0.0.1', port=5000)



from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Global variables for model and columns
model = None
training_columns = None
scaler = None

def load_models():
    global model, training_columns, scaler
    
    try:
        # Try to load different model files in order of preference
        model_files = ['trained_model.joblib', 'ssi_model.joblib', 'iris_model.joblib']
        
        for model_file in model_files:
            if os.path.exists(model_file):
                print(f"🔄 Loading model from {model_file}...")
                model = joblib.load(model_file)
                print(f"✅ Model loaded successfully from {model_file}")
                break
        
        # Load training columns
        if os.path.exists('training_columns.joblib'):
            training_columns = joblib.load('training_columns.joblib')
            print(f"✅ Training columns loaded: {len(training_columns)} features")
            print(f"📋 Features: {training_columns[:5]}..." if len(training_columns) > 5 else f"📋 Features: {training_columns}")
        else:
            print("⚠️ training_columns.joblib not found")
            
        # Try to load scaler if available
        if os.path.exists('scaler.joblib'):
            scaler = joblib.load('scaler.joblib')
            print("✅ Scaler loaded successfully")
        else:
            print("ℹ️ No scaler found - will proceed without scaling")
            
        return model is not None
        
    except Exception as e:
        print(f"❌ Error loading models: {e}")
        return False

def encode_features_simple(data):
    """
    Simple feature encoding without pandas - using basic Python lists
    """
    try:
        print(f"🔄 Processing input data: {data}")
        
        # Create a basic feature vector
        # Start with numerical features
        features = [
            float(data.get('Age', 0)),
            float(data.get('BMI', 0)),
            float(data.get('Procedure_Duration', 120))
        ]
        
        # Add categorical features (simplified one-hot encoding)
        # Gender
        features.append(1 if data.get('Gender', '').lower() == 'male' else 0)
        
        # Diabetes Status
        features.append(1 if data.get('Diabetes_Status', '').lower() == 'yes' else 0)
        
        # Wound Class (simplified)
        wound_class = data.get('Wound_Class', 'clean').lower()
        features.append(1 if 'contaminated' in wound_class and 'clean' in wound_class else 0)  # Clean-contaminated
        features.append(1 if wound_class == 'contaminated' else 0)  # Contaminated
        features.append(1 if 'dirty' in wound_class else 0)  # Dirty
        
        # If we have training columns, try to match them
        if training_columns:
            aligned_features = [0] * len(training_columns)
            
            # Map basic features
            feature_mapping = {
                'Age': float(data.get('Age', 0)),
                'BMI': float(data.get('BMI', 0)),
                'Procedure_Duration': float(data.get('Procedure_Duration', 120)),
                'Gender_Male': 1 if data.get('Gender', '').lower() == 'male' else 0,
                'Diabetes_Status_Yes': 1 if data.get('Diabetes_Status', '').lower() == 'yes' else 0,
                'Wound_Class_Clean-contaminated': 1 if 'contaminated' in wound_class and 'clean' in wound_class else 0,
                'Wound_Class_Contaminated': 1 if wound_class == 'contaminated' else 0,
                'Wound_Class_Dirty': 1 if 'dirty' in wound_class else 0
            }
            
            # Fill in the aligned features
            for i, col in enumerate(training_columns):
                if col in feature_mapping:
                    aligned_features[i] = feature_mapping[col]
            
            features = aligned_features
        else:
            # Pad features to a reasonable size if no training columns
            while len(features) < 46:
                features.append(0)
        
        # Convert to 2D array format (list of lists) for sklearn
        result = [features]
        
        # Apply scaling if scaler is available
        if scaler is not None:
            try:
                result = scaler.transform(result)
                print("✅ Data scaled")
                # Convert back to list if it's numpy array
                if hasattr(result, 'tolist'):
                    result = result.tolist()
            except Exception as e:
                print(f"⚠️ Scaling failed: {e}")
        
        return result
        
    except Exception as e:
        print(f"❌ Error in encode_features: {e}")
        raise e

@app.route('/test', methods=['GET'])
def test():
    return jsonify({
        'message': 'Flask ML API is working!',
        'model_loaded': model is not None,
        'training_columns_loaded': training_columns is not None,
        'scaler_loaded': scaler is not None,
        'num_features': len(training_columns) if training_columns else 0,
        'status': 'success'
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data
        request_data = request.get_json()
        
        if not request_data or 'data' not in request_data:
            return jsonify({'error': 'No data provided. Expected format: {"data": {...}}'}), 400
        
        input_data = request_data['data']
        print(f"📥 Received data: {input_data}")
        
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 500
        
        # Convert input data to the format expected by the model
        if isinstance(input_data, dict):
            processed_data = {
                'Age': input_data.get('Age', 0),
                'BMI': input_data.get('BMI', 0),
                'Procedure_Duration': input_data.get('Procedure_Duration', 120),
                'Procedure_Name': input_data.get('Procedure_Name', 'Unknown'),
                'Gender': input_data.get('Gender', 'Male'),
                'Diabetes_Status': input_data.get('Diabetes_Status', 'No'),
                'Wound_Class': input_data.get('Wound_Class', 'Clean')
            }
        else:
            return jsonify({'error': 'Input data must be a dictionary'}), 400
        
        # Encode features
        input_array = encode_features_simple(processed_data)
        print(f"📐 Input array length: {len(input_array[0]) if input_array else 0}")
        
        # Make prediction
        prediction = model.predict(input_array)
        print(f"🔍 Raw prediction: {prediction}")
        print(f"🔍 Prediction type: {type(prediction[0])}")
        
        # Handle different prediction types
        if isinstance(prediction[0], str):
            # Model returns text like 'Superficial', 'Deep', 'Organ', 'No Infection'
            pred_text = prediction[0]
            # Convert to binary: any infection type = 1, no infection = 0
            pred_value = 0 if pred_text.lower() in ['no infection', 'none', 'negative'] else 1
        else:
            # Model returns numeric prediction
            pred_value = int(prediction[0])
            pred_text = 'Infection Risk' if pred_value == 1 else 'No Infection'
        
        # Get prediction probability if available
        try:
            probability = model.predict_proba(input_array)
            if len(probability[0]) > 1:
                prob_positive = float(probability[0][1])  # Probability of positive class
                prob_negative = float(probability[0][0])  # Probability of negative class
            else:
                prob_positive = float(probability[0][0])
                prob_negative = 1.0 - prob_positive
        except Exception as prob_error:
            print(f"⚠️ Could not get probabilities: {prob_error}")
            # Use simple logic based on prediction
            if pred_value == 1:
                prob_positive = 0.75
                prob_negative = 0.25
            else:
                prob_positive = 0.25
                prob_negative = 0.75
        
        # Determine risk level
        if prob_positive > 0.7:
            risk_level = 'High'
            risk_color = 'red'
        elif prob_positive > 0.4:
            risk_level = 'Medium'
            risk_color = 'orange'
        else:
            risk_level = 'Low'
            risk_color = 'green'
        
        result = {
            'prediction': pred_value,
            'prediction_text': pred_text,
            'probability_positive': round(prob_positive, 4),
            'probability_negative': round(prob_negative, 4),
            'risk_level': risk_level,
            'risk_color': risk_color,
            'confidence': round(max(prob_positive, prob_negative), 4),
            'input_processed': processed_data,
            'message': f'Prediction successful: {pred_text}'
        }
        
        print(f"📤 Prediction result: {result}")
        return jsonify(result), 200
        
    except Exception as e:
        print(f"❌ Error during prediction: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({
            'error': f'Prediction failed: {str(e)}',
            'input_received': request_data.get('data', 'No data') if 'request_data' in locals() else 'No data'
        }), 500
# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         # Get input data
#         request_data = request.get_json()
        
#         if not request_data or 'data' not in request_data:
#             return jsonify({'error': 'No data provided. Expected format: {"data": {...}}'}), 400
        
#         input_data = request_data['data']
#         print(f"📥 Received data: {input_data}")
        
#         if model is None:
#             return jsonify({'error': 'Model not loaded'}), 500
        
#         # Convert input data to the format expected by the model
#         if isinstance(input_data, dict):
#             # Map frontend field names to model expected names
#             processed_data = {
#                 'Age': input_data.get('Age', 0),
#                 'BMI': input_data.get('BMI', 0),
#                 'Procedure_Duration': input_data.get('Procedure_Duration', 120),
#                 'Procedure_Name': input_data.get('Procedure_Name', 'Unknown'),
#                 'Gender': input_data.get('Gender', 'Male'),
#                 'Diabetes_Status': input_data.get('Diabetes_Status', 'No'),
#                 'Wound_Class': input_data.get('Wound_Class', 'Clean')
#             }
#         else:
#             return jsonify({'error': 'Input data must be a dictionary'}), 400
        
#         # Encode features
#         input_array = encode_features_simple(processed_data)
#         print(f"📐 Input array length: {len(input_array[0]) if input_array else 0}")
        
#         # Make prediction
#         prediction = model.predict(input_array)
#         pred_value = int(prediction[0])
        
#         # Get prediction probability if available
#         try:
#             probability = model.predict_proba(input_array)
#             if len(probability[0]) > 1:
#                 prob_positive = float(probability[0][1])  # Probability of positive class
#                 prob_negative = float(probability[0][0])  # Probability of negative class
#             else:
#                 prob_positive = float(probability[0][0])
#                 prob_negative = 1.0 - prob_positive
#         except Exception as prob_error:
#             print(f"⚠️ Could not get probabilities: {prob_error}")
#             prob_positive = 0.5
#             prob_negative = 0.5
        
#         # Determine risk level
#         if prob_positive > 0.7:
#             risk_level = 'High'
#             risk_color = 'red'
#         elif prob_positive > 0.4:
#             risk_level = 'Medium'
#             risk_color = 'orange'
#         else:
#             risk_level = 'Low'
#             risk_color = 'green'
        
#         result = {
#             'prediction': pred_value,
#             'probability_positive': round(prob_positive, 4),
#             'probability_negative': round(prob_negative, 4),
#             'risk_level': risk_level,
#             'risk_color': risk_color,
#             'confidence': round(max(prob_positive, prob_negative), 4),
#             'input_processed': processed_data,
#             'message': 'Prediction successful'
#         }
        
#         print(f"📤 Prediction result: {result}")
#         return jsonify(result), 200
        
#     except Exception as e:
#         print(f"❌ Error during prediction: {e}")
#         return jsonify({
#             'error': f'Prediction failed: {str(e)}',
#             'input_received': request_data.get('data', 'No data') if 'request_data' in locals() else 'No data'
#         }), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model_status': 'loaded' if model else 'not_loaded',
        'features_count': len(training_columns) if training_columns else 0
    })

@app.route('/model-info', methods=['GET'])
def model_info():
    """Get information about the loaded model"""
    if model is None:
        return jsonify({'error': 'No model loaded'}), 404
    
    try:
        model_info = {
            'model_type': str(type(model).__name__),
            'features_count': len(training_columns) if training_columns else 0,
            'has_scaler': scaler is not None
        }
        
        # Try to get more model info
        if hasattr(model, 'n_estimators'):
            model_info['n_estimators'] = model.n_estimators
        if hasattr(model, 'feature_importances_'):
            model_info['has_feature_importance'] = True
            
        return jsonify(model_info)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("🚀 Starting Flask ML API...")
    
    # Load models on startup
    if load_models():
        print("🎯 All models loaded successfully!")
    else:
        print("⚠️ Some models failed to load, but server will still start")
    
    print("🌐 API will be available at: http://127.0.0.1:5000")
    print("🧪 Test endpoints:")
    print("   - GET  /test")
    print("   - GET  /health") 
    print("   - GET  /model-info")
    print("   - POST /predict")
    
    app.run(debug=True, host='127.0.0.1', port=5000)