# 🧬 MedIntel: AI-Driven Infection Insight System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.11-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.0.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.10-blue.svg)](https://python.org/)

An intelligent healthcare platform that revolutionizes surgical site infection (SSI) prediction through advanced machine learning algorithms and comprehensive hospital management tools.

## 🌟 Features

### 🤖 AI-Powered Predictions
- **Real-time SSI Risk Assessment**: ML models analyze 46+ clinical features
- **Risk Level Classification**: Low, Medium, High risk categorization with confidence scores
- **Predictive Analytics**: Infection probability calculation with actionable insights

### 🏥 Hospital Management
- **Patient Registration**: Complete patient data management with 3-step forms
- **Surgery Management**: OR scheduling, live monitoring, and performance analytics
- **Appointment Booking**: Interactive 4-step appointment scheduling system
- **Daily Symptom Tracking**: Post-operative monitoring for early infection detection

### 📊 Advanced Analytics
- **Real-time Dashboards**: Live surgery monitoring with vital signs
- **Risk Alerts**: AI-powered alerts for high-risk patients
- **Performance Metrics**: Surgeon performance and hospital statistics
- **Report Generation**: Professional PDF reports with ML predictions

### 💊 Medical Intelligence
- **Antibiotic Management**: Resistance tracking and susceptibility analysis
- **Clinical Decision Support**: Evidence-based treatment recommendations
- **Laboratory Integration**: Culture results and bacterial analysis

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14.2.11 with React 18
- **Styling**: Tailwind CSS with custom gradients and animations
- **UI Components**: Lucide React icons, responsive design
- **State Management**: React Hooks (useState, useEffect)

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt encryption
- **Email**: Nodemailer with Gmail integration

### Machine Learning
- **Framework**: Flask API with Python 3.10
- **ML Models**: Random Forest Classifier (trained on medical data)
- **Libraries**: scikit-learn, pandas, joblib
- **Features**: 46 clinical parameters for risk assessment

### Infrastructure
- **Database**: MongoDB Atlas (cloud)
- **Email Service**: Gmail SMTP
- **File Storage**: Local file system for ML models

## 🚀 System Overview

MedIntel transforms traditional healthcare workflows by integrating cutting-edge artificial intelligence with intuitive user interfaces. The system provides real-time surgical risk assessment, comprehensive patient management, and data-driven clinical decision support.

## 📖 User Guide

### For Doctors
1. **Register/Login**: Create doctor account and login
2. **Patient Registration**: Complete 3-step patient form
3. **View Predictions**: Access AI risk assessments in Lab Reports
4. **Monitor Patients**: Track daily symptoms and recovery

### For Administrators
1. **Surgery Management**: Schedule and monitor operations
2. **Analytics Dashboard**: View hospital performance metrics
3. **Risk Alerts**: Respond to high-risk patient notifications

## 🔬 ML Model Details

### Training Data
- **Features**: 46 clinical parameters including:
  - Patient demographics (age, BMI, gender)
  - Surgical factors (procedure type, duration, wound class)
  - Medical history (diabetes, comorbidities)
  - Antibiotic usage patterns

### Model Performance
- **Algorithm**: Random Forest Classifier
- **Accuracy**: 85%+ on validation data
- **Output**: Risk probability (0-100%) and classification (Low/Medium/High)

### Prediction Pipeline
1. **Data Collection**: Patient information through forms
2. **Feature Engineering**: Categorical encoding and scaling
3. **Model Inference**: Real-time prediction via Flask API
4. **Risk Assessment**: Clinical recommendations based on risk level

## 🏗️ Project Structure

```
medintel-infection-insight/
│
├── smart_ssi_detector/          # Frontend (Next.js)
│   ├── app/
│   │   ├── Dashboard/
│   │   ├── Patient1/
│   │   ├── LabReport/
│   │   ├── Appointment/
│   │   └── About/
│   ├── components/
│   └── public/
│
├── ssi_backend/                 # Backend (Node.js/Express)
│   ├── models/
│   │   ├── Patient.js
│   │   ├── users.js
│   │   └── symptom.js
│   ├── routes/
│   │   └── index.js
│   ├── utils/
│   │   └── helper.js
│   └── index.js
│
├── ml_model/                    # ML API (Python/Flask)
│   ├── app.py
│   ├── trained_model.joblib
│   ├── training_columns.joblib
│   └── scaler.joblib
│
└── docs/                        # Documentation
    ├── API.md
    ├── FEATURES.md
    └── ARCHITECTURE.md
```

## 🔄 Workflow

1. **Patient Registration**: Doctor registers patient with medical details
2. **Data Processing**: System collects surgical and medical parameters
3. **ML Prediction**: AI model analyzes risk factors and generates prediction
4. **Risk Assessment**: Clinical recommendations provided based on risk level
5. **Monitoring**: Daily symptom tracking for early detection
6. **Reporting**: Professional PDF reports with AI insights

## 🚨 Key Capabilities

### Common Issues

**Performance Optimization:**
- Implemented lazy loading for faster page renders
- Optimized ML model inference for real-time predictions
- Efficient database queries with proper indexing

**Scalability Features:**
- Microservices architecture for independent scaling
- Load balancing support for high-traffic scenarios
- Caching mechanisms for frequently accessed data

**Security Measures:**
- JWT-based authentication with secure token management
- Input validation and sanitization
- Encrypted data transmission and storage

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write descriptive commit messages
- Add tests for new features
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Medical data and domain expertise from healthcare professionals
- Open-source libraries and frameworks used in development
- Research papers on surgical site infection prediction

## 📞 Contact

For inquiries and collaboration:
- **Project Lead**: Medical AI Research Team
- **Documentation**: [Project Wiki](https://github.com/yourusername/medintel-infection-insight/wiki)
- **Research Papers**: Available in docs/research/
- **Issues**: [GitHub Issues](https://github.com/yourusername/medintel-infection-insight/issues)

## 🔮 Future Enhancements

- [ ] Mobile app for patient monitoring
- [ ] Integration with hospital EHR systems
- [ ] Advanced ML models (XGBoost, Neural Networks)
- [ ] Real-time IoT sensor integration
- [ ] Multi-language support
- [ ] Telemedicine capabilities

---

**Built with ❤️ for better healthcare outcomes**
