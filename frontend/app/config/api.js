const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-api.com' 
    : 'http://localhost:3001',
  
  ENDPOINTS: {
    LOGIN: '/login',
    REGISTER: '/register',
    PATIENTS: '/user',
    PATIENT_BY_ID: '/user',
    GENERAL: '/general',
    ANTIBIOTIC: '/antibiotic',
    PATIENT: '/patient',
    SEND_OTP: '/send-otp',
    SYMPTOMS: '/user/symptoms',
    TEST_ML: '/test-ml'
  }
};

export default API_CONFIG;