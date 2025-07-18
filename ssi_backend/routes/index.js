
const express = require('express');
const router = express.Router();
const user = require('../models/users');
const symptom = require('../models/symptom');
const bcrypt = require('bcrypt');
const { getToken } = require('../utils/helper');
const Patient = require('../models/Patient');
const nodemailer = require('nodemailer');
const axios = require('axios');

// Improved prediction function with better error handling
async function getPrediction(inputData) {
  try {
    console.log('🔄 Sending prediction request:', inputData);
    
    // Check if Flask API is running
    const healthCheck = await axios.get('http://127.0.0.1:5000/health', { timeout: 5000 });
    console.log('✅ Flask API health check passed:', healthCheck.data);
    
    // Send prediction request
    const response = await axios.post('http://127.0.0.1:5000/predict', {
      data: inputData,
    }, { timeout: 10000 });

    console.log('📤 Prediction response:', response.data);
    return { success: true, prediction: response.data };
    
  } catch (error) {
    console.error('❌ Error during prediction:', error.message);
    
    // Check if it's a connection error
    if (error.code === 'ECONNREFUSED') {
      return { 
        success: false, 
        message: 'ML prediction service is not running. Please start the Flask API on port 5000.', 
        error: 'Connection refused'
      };
    }
    
    return { 
      success: false, 
      message: 'Prediction service failed', 
      error: error.message 
    };
  }
}

// Email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'ptojec09@gmail.com',
    pass: 'hnas qhql jkqi bjtp'
  }
});

// Test route for creating initial user
router.get('/', async function (req, res, next) {
  const newUser = {
    name: "Santosh",
    email: "ptojec09@gmail.com",
    password: await bcrypt.hash("yourPasswordHere", 10),
    age: 25,
    gender: "Male",
    dob: new Date('1998-01-01'),
    address: "123 Street, City",
    phone: 1234567890,
    role: "User"
  };

  try {
    if (await user.findOne({ email: newUser.email })) {
      return res.json({ message: 'User already exists', status: 'info' });
    }
    const createdUser = await user.create(newUser);
    console.log(createdUser);
    return res.json({ message: 'User created successfully', status: 'success' });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: 'Error creating user', status: 'error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', req.body);

  try {
    const User = await user.findOne({ email: email });
    if (!User) {
      return res.status(403).json({ Error: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, User.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ Error: "Password is incorrect" });
    }

    const token = await getToken(email, User);
    const userToken = { ...User.toJSON(), token };
    delete userToken.password;
    return res.status(200).json(userToken);
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ Error: "Login failed" });
  }
});

// Patient registration endpoint
router.post('/general', async (req, res) => {
  const { 
    name, age, email, diabietic, gender, height, weight, bmi, 
    admission_date, discharge_date, admittingDepartment, procedure_name, 
    surgeon, theatre, wound_class, pap_given, antibiotics_given, 
    ssi_event_occurred, event_date, duration_of_pap 
  } = req.body;

  console.log('Patient registration:', req.body);

  try {
    const existingPatient = await Patient.findOne({ email: email });
    if (existingPatient) {
      return res.status(403).json({ Error: "Patient already exists" });
    }

    const newPatient = {
      name, age, email, height, weight, bmi, gender, diabietic,
      admission_date, discharge_date, admittingDepartment, procedure_name,
      surgeon, theatre, wound_class, pap_given, antibiotics_given,
      ssi_event_occurred, event_date, duration_of_pap
    };

    const createdPatient = await Patient.create(newPatient);
    console.log("Patient created:", createdPatient.patient_id);
    
    const token = await getToken(email, createdPatient);
    const patientToken = { ...createdPatient.toJSON(), token };
    return res.status(200).json(patientToken);
  } catch (error) {
    console.error("Error creating patient:", error);
    return res.status(500).json({ message: 'Error creating patient', error: error.message });
  }
});

// Enhanced patient data endpoint with better prediction handling
router.get('/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch patient from the database
    const patient = await Patient.findOne({ patient_id: id });
    console.log('Found patient:', patient?.patient_id);
    
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Prepare data for ML prediction
    const inputData = {
      Age: patient.age || 0,
      BMI: patient.bmi || 0,
      Procedure_Duration: patient.procedure_duration || 120, // Default duration
      Diabetes_Status: patient.diabietic === 'Yes' ? 'Yes' : 'No',
      Gender: patient.gender === 'male' || patient.gender === 'Male' ? 'Male' : 'Female',
      Wound_Class: patient.wound_class || 'clean',
      Procedure_Name: patient.procedure_name || 'Unknown'
    };

    console.log('Prepared input data for prediction:', inputData);

    // Get prediction from ML service
    const predictionResult = await getPrediction(inputData);

    if (predictionResult.success) {
      return res.json({
        success: true,
        patient,
        prediction: predictionResult.prediction,
        ml_input: inputData
      });
    } else {
      // Return patient data even if prediction fails
      return res.json({
        success: true,
        patient,
        prediction: null,
        ml_error: predictionResult.message,
        ml_input: inputData
      });
    }
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ error: 'Failed to fetch patient', details: error.message });
  }
});

// Test ML API endpoint
router.get('/test-ml', async (req, res) => {
  try {
    const testData = {
      Age: 45,
      BMI: 25.5,
      Procedure_Duration: 120,
      Diabetes_Status: 'No',
      Gender: 'Male',
      Wound_Class: 'clean',
      Procedure_Name: 'Hip prosthesis'
    };

    const result = await getPrediction(testData);
    res.json({
      message: 'ML API test',
      test_data: testData,
      result: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// OTP generation and sending
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: process.env.EMAIL_USER || 'ptojec09@gmail.com',
    to: email,
    subject: 'Your OTP Code - SSI Detection System',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #00796b;">SSI Detection System</h2>
        <p>Your OTP code is: <strong style="font-size: 24px; color: #00796b;">${otp}</strong></p>
        <p>This code will expire in 10 minutes.</p>
        <p style="color: #666;">If you didn't request this code, please ignore this email.</p>
      </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP email:', error);
      return res.status(500).json({ error: 'Failed to send OTP email' });
    } else {
      console.log('OTP email sent:', info.response);
      return res.status(200).json({ 
        message: 'OTP email sent successfully', 
        otp: otp // Remove this in production for security
      });
    }
  });
});
// router.post('/send-otp', async (req, res) => {
//   const { email } = req.body;

//   if (!email || !/\S+@\S+\.\S+/.test(email)) {
//     return res.status(400).json({ error: 'Invalid email address' });
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000);

//   const mailOptions = {
//     from: 'ptojec09@gmail.com',
//     to: email,
//     subject: 'Your OTP Code',
//     text: `Your OTP code is: ${otp}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending OTP email:', error);
//       return res.status(500).json({ error: 'Failed to send OTP email' });
//     } else {
//       console.log('OTP email sent:', info.response);
//       return res.status(200).json({ message: 'OTP email sent successfully', otp: otp });
//     }
//   });
// });

// Get all patients
router.get('/user', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json({
      success: true,
      patients,
      count: patients.length
    });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

// Register new user
router.post('/register', async (req, res) => {
  const { email, password, name, age, gender, dob, address, phone, role } = req.body;

  try {
    const existingUser = await user.findOne({ email: email });
    if (existingUser) {
      return res.status(403).json({ Error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email, password: hashedPassword, name, age, gender, dob, address, phone, role
    };

    const createdUser = await user.create(newUser);
    const token = await getToken(email, createdUser);
    const userToReturn = { ...createdUser.toJSON(), token };
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
  } catch (error) {
    console.error('Error during user registration:', error);
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Other existing routes...
// (Include all your other routes like /antibiotic, /patient, symptoms routes, etc.)
// Antibiotics data saving
router.post('/antibiotic', async (req, res) => {
  const { organism1, organism2, isolate1, isolate2, patientId } = req.body;

  try {
    const patient = await Patient.findOne({ patient_id: patientId });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    patient.microorganisms = { organism1, organism2 };
    patient.isolate1 = isolate1;
    patient.isolate2 = isolate2;

    await patient.save({ validateModifiedOnly: true });
    res.status(200).json({ message: 'Antibiotic data saved successfully' });
  } catch (error) {
    console.error('Error processing antibiotic data:', error);
    res.status(500).json({ message: 'Error processing antibiotic data', error: error.message });
  }
});

// Patient antibiotics and times
router.post('/patient', async (req, res) => {
  const { patientId, priorAntibiotics, prePeriAntibiotics, postAntibiotics, times } = req.body;

  try {
    const patient = await Patient.findOne({ patient_id: patientId });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    patient.priorAntibiotics = priorAntibiotics;
    patient.prePeriAntibiotics = prePeriAntibiotics;
    patient.postAntibiotics = postAntibiotics;
    patient.times = times;

    await patient.save({ validateModifiedOnly: true });
    res.status(200).json({ message: 'Patient data saved successfully' });
  } catch (error) {
    console.error('Error processing patient data:', error);
    res.status(500).json({ message: 'Error processing patient data', error: error.message });
  }
});

// Symptoms routes
router.post('/user/symptoms/:patient_id', async (req, res) => {
  try {
    const { symptoms } = req.body.formData;

    const symptomsData = Object.keys(symptoms).map(symptomName => {
      return {
        symptom_name: symptomName,
        days: symptoms[symptomName] 
      };
    });

    let patient = await symptom.findOne({ patient_id: req.params.patient_id });

    if (!patient) {
      patient = new symptom({
        patient_id: req.params.patient_id,
        symptoms: symptomsData,
      });
      await patient.save();
      return res.json({ message: 'New patient created and symptoms data saved successfully', patient });
    }

    for (const symptomData of symptomsData) {
      const existingSymptom = patient.symptoms.find(s => s.symptom_name === symptomData.symptom_name);
      if (existingSymptom) {
        existingSymptom.days = symptomData.days;
      } else {
        patient.symptoms.push({
          symptom_name: symptomData.symptom_name,
          days: symptomData.days,
        });
      }
    }

    await patient.save();
    res.json({ message: 'Symptoms data updated successfully', patient });

  } catch (err) {
    console.error("Error in saving/updating patient data:", err);
    res.status(500).send('Server Error');
  }
});

router.get('/user/symptoms/:patient_id', async (req, res) => {
  try {
    const { patient_id } = req.params;
    const patient = await symptom.findOne({ patient_id });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add these routes to your existing backend router file

// Enhanced appointment booking with email confirmation
router.post('/appointment/book', async (req, res) => {
  const { 
    name, email, phone, age, gender, emergencyContact, 
    medicalHistory, appointmentType, preferredDate, 
    preferredTime, selectedDoctor, symptoms 
  } = req.body;

  try {
    // Create appointment record
    const appointment = {
      name,
      email,
      phone,
      age,
      gender,
      emergencyContact,
      medicalHistory,
      appointmentType,
      preferredDate,
      preferredTime,
      selectedDoctor,
      symptoms,
      status: 'confirmed',
      createdAt: new Date(),
      appointmentId: `APT-${Date.now()}`
    };

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER || 'ptojec09@gmail.com',
      to: email,
      subject: '✅ Appointment Confirmed - AstroPlasty Hospital',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); color: white; padding: 30px; border-radius: 15px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">🏥 Appointment Confirmed!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Your appointment has been successfully booked</p>
          </div>
          
          <div style="background: #f8fafc; padding: 25px; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #0891b2; margin-top: 0;">📋 Appointment Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold;">Patient:</td><td>${name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Doctor:</td><td>${selectedDoctor?.name || 'TBD'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Date:</td><td>${preferredDate}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Time:</td><td>${preferredTime}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Type:</td><td>${appointmentType}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Appointment ID:</td><td>${appointment.appointmentId}</td></tr>
            </table>
          </div>

          <div style="background: #dcfdf4; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0;">
            <h3 style="color: #047857; margin-top: 0;">📝 Important Instructions</h3>
            <ul style="color: #065f46; margin: 0; padding-left: 20px;">
              <li>Please arrive 15 minutes before your appointment</li>
              <li>Bring a valid ID and insurance card</li>
              <li>List any current medications you're taking</li>
              <li>Bring any relevant medical records</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #64748b; font-size: 14px;">
              📞 Need to reschedule? Call us at <strong>(555) 123-4567</strong><br>
              📧 Reply to this email for any questions
            </p>
          </div>

          <div style="border-top: 2px solid #e2e8f0; padding-top: 20px; text-align: center;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              AstroPlasty Hospital - Excellence in Healthcare<br>
              123 Medical Center Drive, Healthcare City, HC 12345
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({
      success: true,
      message: 'Appointment booked successfully',
      appointment: appointment
    });

  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to book appointment',
      error: error.message
    });
  }
});

// Get available appointment slots
router.get('/appointment/slots/:date', async (req, res) => {
  const { date } = req.params;
  
  try {
    // Mock available slots - in real app, check against existing appointments
    const slots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];
    
    res.json({
      success: true,
      date: date,
      availableSlots: slots
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get available doctors
router.get('/doctors', async (req, res) => {
  try {
    const doctors = [
      {
        id: 1,
        name: "Dr. Sarah Chen",
        specialty: "Surgical Oncology",
        rating: 4.9,
        experience: "15 years",
        education: "Harvard Medical School",
        languages: ["English", "Mandarin"],
        consultationFee: "$150",
        nextAvailable: "Today 2:00 PM"
      },
      {
        id: 2,
        name: "Dr. Michael Rodriguez",
        specialty: "Orthopedic Surgery",
        rating: 4.8,
        experience: "12 years",
        education: "Johns Hopkins",
        languages: ["English", "Spanish"],
        consultationFee: "$180",
        nextAvailable: "Tomorrow 10:00 AM"
      },
      {
        id: 3,
        name: "Dr. Emily Johnson",
        specialty: "General Surgery",
        rating: 4.7,
        experience: "8 years",
        education: "Stanford Medical",
        languages: ["English", "French"],
        consultationFee: "$120",
        nextAvailable: "Today 4:30 PM"
      }
    ];

    res.json({
      success: true,
      doctors: doctors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Surgery management endpoints
router.get('/surgery/schedule/:date', async (req, res) => {
  const { date } = req.params;
  
  try {
    // Mock surgery schedule data
    const surgeries = [
      {
        id: 1,
        patient: "Sarah Johnson",
        patientId: 1003,
        age: 55,
        procedure: "Knee Replacement",
        surgeon: "Dr. Michael Rodriguez",
        scheduledTime: "08:00",
        estimatedDuration: "2.5 hours",
        status: "in-progress",
        riskLevel: "medium",
        riskScore: 35,
        theatre: "OR 2"
      },
      {
        id: 2,
        patient: "John Smith",
        patientId: 1006,
        age: 21,
        procedure: "Gallbladder Surgery",
        surgeon: "Dr. Sarah Chen",
        scheduledTime: "10:30",
        estimatedDuration: "1.5 hours",
        status: "scheduled",
        riskLevel: "low",
        riskScore: 15,
        theatre: "OR 1"
      }
    ];

    res.json({
      success: true,
      date: date,
      surgeries: surgeries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get surgery analytics
router.get('/surgery/analytics', async (req, res) => {
  try {
    const analytics = {
      totalSurgeries: 156,
      completedToday: 8,
      inProgress: 2,
      upcomingToday: 5,
      riskDistribution: {
        low: 45,
        medium: 35,
        high: 20
      },
      surgeonPerformance: [
        { name: "Dr. Sarah Chen", surgeries: 45, rating: 4.9 },
        { name: "Dr. Michael Rodriguez", surgeries: 38, rating: 4.8 },
        { name: "Dr. Emily Johnson", surgeries: 32, rating: 4.7 }
      ]
    };

    res.json({
      success: true,
      analytics: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Enhanced patient endpoint with risk assessment
router.get('/patients/risk-assessment', async (req, res) => {
  try {
    const patients = await Patient.find({}).sort({ createdAt: -1 });
    
    const patientsWithRisk = await Promise.all(
      patients.map(async (patient) => {
        const inputData = {
          Age: patient.age || 0,
          BMI: patient.bmi || 0,
          Procedure_Duration: 120,
          Diabetes_Status: patient.diabietic === 'Yes' ? 'Yes' : 'No',
          Gender: patient.gender === 'male' ? 'Male' : 'Female',
          Wound_Class: patient.wound_class || 'clean',
          Procedure_Name: patient.procedure_name || 'Unknown'
        };

        const predictionResult = await getPrediction(inputData);
        
        return {
          ...patient.toJSON(),
          riskAssessment: predictionResult.success ? predictionResult.prediction : null,
          riskScore: predictionResult.success ? predictionResult.prediction.probability_positive : null
        };
      })
    );

    res.json({
      success: true,
      patients: patientsWithRisk,
      totalPatients: patients.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Contact form submission
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'ptojec09@gmail.com',
      to: 'admin@astroplasty.com', // Your admin email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">New Contact Form Submission</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 10px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 5px;">${message}</p>
          </div>
          <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
            Sent from AstroPlasty Hospital Contact Form
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Error sending contact form:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Enhanced test endpoint
router.get('/api/test', async (req, res) => {
  try {
    res.json({
      message: 'Backend is working!',
      timestamp: new Date().toISOString(),
      database: 'Connected',
      port: process.env.PORT || '3001',
      services: {
        ml_api: 'Available',
        email: 'Configured',
        database: 'Connected'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get hospital statistics
router.get('/hospital/stats', async (req, res) => {
  try {
    const stats = {
      totalPatients: await Patient.countDocuments(),
      todayPatients: await Patient.countDocuments({
        createdAt: { 
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lt: new Date(new Date().setHours(23, 59, 59, 999))
        }
      }),
      highRiskPatients: await Patient.countDocuments({
        $or: [
          { diabietic: 'Yes' },
          { age: { $gte: 65 } }
        ]
      }),
      recentSurgeries: 25,
      availableORs: 8,
      activeStaff: 45
    };

    res.json({
      success: true,
      stats: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
module.exports = router;


// //routes index.js
// const express = require('express');
// const router = express.Router();
// const user = require('../models/users');
// const symptom= require('../models/symptom');
// const bcrypt = require('bcrypt');
// const { getToken } = require('../utils/helper');
// const Patient = require('../models/Patient');
// const Antibiotic = require('../models/antibiotic'); 
// const nodemailer = require('nodemailer');
// const axios = require('axios');
// /*router.get('/predict', async (req, res) => {
//   const inputData = [5.1, 3.5, 1.4, 0.2]; // Hardcoded input data
//   try {
//       const response = await axios.post('http://127.0.0.1:5000/predict', {
//           data: inputData,
//       });
//       console.log('Prediction:', response.data);
//       res.status(200).json({ success: true, prediction: response.data });
//   } catch (error) {
//       console.error('Error during prediction:', error.message);
//       res.status(500).json({ success: false, message: 'Prediction service failed', error: error.message });
//   }
// });
// */
// async function getPrediction(inputData) {
//   try {
//     // Sending data in the correct format to Flask API
//     const response = await axios.post('http://127.0.0.1:5000/predict', {
//       data: inputData,  // Ensure that data is wrapped inside "data" key
//     });

//     return { success: true, prediction: response.data };
//   } catch (error) {
//     console.error('Error during prediction:', error.message);
//     return { success: false, message: 'Prediction service failed', error: error.message };
//   }
// }

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'vimarshm813@gmail.com',
//     pass: 'yefv dtwz ptgi vfox'
//   }
// })
// router.get('/', async function (req, res, next) {
//   const newUser = {
//     name: "Vimarsh",
//     email: "vimarshmishra@gmail.com",
//     password: await bcrypt.hash("yourPasswordHere", 10), // Hash the password
//     age: 25,
//     gender: "Male",
//     dob: new Date('1998-01-01'),
//     address: "123 Street, City",
//     phone: 1234567890,
//     role: "User"
//   };

//   try {
//     if (await user.findOne({ email: newUser.email })) {
//       return res.send('User already exists');
//     }
//     const createdUser = await user.create(newUser);
//     console.log(createdUser);
//     return res.send('User created successfully');
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return res.status(500).send('Error creating user');
//   }
// });

// // User login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body);

//   const User = await user.findOne({ email: email });
//   if (!User) {
//     return res.status(403).json({ Error: "User does not exist" });
//   }

//   const isPasswordCorrect = await bcrypt.compare(password, User.password);
//   console.log(User.password);
//   if (!isPasswordCorrect) {
//     return res.status(403).json({ Error: "Password is incorrect" });
//   }

//   const token = await getToken(email, User);
//   const userToken = { ...User.toJSON(), token };
//   delete userToken.password; // Don't return password in response
//   return res.status(200).json(userToken);
// });

// // Patient registration endpoint
// router.post('/general', async (req, res) => {
//   const { name, age,email,diabietic, gender,height, weight, bmi, admission_date, discharge_date, admittingDepartment, procedure_name, surgeon, theatre, wound_class, pap_given, antibiotics_given, ssi_event_occurred, event_date, duration_of_pap } = req.body;
// console.log(req.body);
//   const existingPatient = await Patient.findOne({ email: email });
//   if (existingPatient) {
//     console.log(existingPatient);
//     return res.status(403).json({ Error: "Patient already exists" });
//   }

//   const newPatient = {
//     name,
//     age,
//     email,
//     height,
//     weight,
//     bmi,
//     gender,
//     diabietic,
//     admission_date,
//     discharge_date,
//     admittingDepartment,
//     procedure_name,
//     surgeon,
//     theatre,
//     wound_class,
//     pap_given,
//     antibiotics_given,
//     ssi_event_occurred,
//     event_date,
//     duration_of_pap
//   };
//   console.log(newPatient);
//   try {
//     const createdPatient = await Patient.create(newPatient);
//     console.log("1");
//     console.log(createdPatient);
//     const token = await getToken(email, createdPatient);
//     const patientToken = { ...createdPatient.toJSON(), token };
//     return res.status(200).json(patientToken);
//   } catch (error) {
//     console.error("Error creating patient:", error);
//     return res.status(500).send('Error creating patient');
//   }
// });

// // OTP generation and sending
// router.post('/send-otp', async (req, res) => {
//   const { email } = req.body;

//   // Validate the email address
//   if (!email || !/\S+@\S+\.\S+/.test(email)) {
//     return res.status(400).json({ error: 'Invalid email address' });
//   }

//   // Generate a random 6-digit OTP
//   const otp = Math.floor(100000 + Math.random() * 900000);

//   // Mail options
//   const mailOptions = {
//     from: 'vimarshm813@gmail.com',
//     to: email,
//     subject: 'Your OTP Code',
//     text: `Your OTP code is: ${otp}`,
//   };

//   // Sending the OTP email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending OTP email:', error);
//       return res.status(500).json({ error: 'Failed to send OTP email' });
//     } else {
//       console.log('OTP email sent:', info.response);
//       return res.status(200).json({ message: 'OTP email sent successfully',otp:otp });
//     }
//   });
// });
// // Antibiotics data saving
// router.post('/antibiotic', async (req, res) => {
//   const { organism1, organism2, isolate1, isolate2, patientId } = req.body;

//   try {
//     // Find the patient document by patientId
//     const patient = await Patient.findOne({ patient_id: patientId });

//     if (!patient) {
//       return res.status(404).json({ message: 'Patient not found' });
//     }

//     // Update the relevant fields in the patient document
//     patient.microorganisms = { organism1, organism2 };
//     patient.isolate1 = isolate1;
//     patient.isolate2 = isolate2;

//     // Force saving by using validateModifiedOnly option to skip unchanged fields
//     await patient.save({ validateModifiedOnly: true });

//     res.status(200).json({ message: 'Antibiotic data saved successfully' });
//   } catch (error) {
//     console.error('Error processing antibiotic data:', error);
//     res.status(500).json({ message: 'Error processing antibiotic data', error: error.message });
//   }
// });

// // Register new user
// router.post('/register', async (req, res) => {
//   const { email, password, name, age, gender, dob, address, phone, role } = req.body;

//   const existingUser = await user.findOne({ email: email });
//   if (existingUser) {
//     return res.status(403).json({ Error: "User already exists" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = {
//     email,
//     password: hashedPassword,
//     name,
//     age,
//     gender,
//     dob,
//     address,
//     phone,
//     role
//   };

//   try {
//     const createdUser = await user.create(newUser);
//     const token = await getToken(email, createdUser);
//     const userToReturn = { ...createdUser.toJSON(), token };
//     delete userToReturn.password;
//     return res.status(200).json(userToReturn);
//   } catch (error) {
//     console.error('Error during user registration:', error);
//     return res.status(500).json({ message: 'Error registering user', error: error.message });
//   }
// });

// // Get all patients
// router.get('/user', async (req, res) => {
//   try {
//     const patients = await Patient.find();

//     res.json({
//       success: true,
//       patients,
//       symptom,
//     });
//   } catch (error) {
//     console.error('Error fetching patients:', error);
//     res.status(500).json({ error: 'Failed to fetch patients' });
//   }
// });
// router.post('/user/symptoms/:patient_id', async (req, res) => {
//   try {
//     console.log("Request Body:", req.body);

//     const { symptoms } = req.body.formData; // Destructure the symptoms from the request

//     // Prepare the symptomsData in the expected format (array)
//     const symptomsData = Object.keys(symptoms).map(symptomName => {
//       return {
//         symptom_name: symptomName,
//         days: symptoms[symptomName] 
//       };
//     });

//     // Find the patient by patient_id
//     let patient = await symptom.findOne({ patient_id: req.params.patient_id });

//     if (!patient) {
//       console.log("Patient not found, creating a new patient...");

//       // If patient doesn't exist, create a new patient with provided symptomsData
//       patient = new symptom({
//         patient_id: req.params.patient_id,
//         symptoms: symptomsData,
//       });

//       // Save the new patient to the database
//       await patient.save();
//       console.log("New patient created:", symptom.find());

//       return res.json({ message: 'New patient created and symptoms data saved successfully', patient });
//     }

//     console.log("Patient found, updating symptoms...");

//     // If patient exists, update their symptoms
//     for (const symptom of symptomsData) {
//       const existingSymptom = patient.symptoms.find(s => s.symptom_name === symptom.symptom_name);

//       if (existingSymptom) {
//         // If the symptom exists, update its days
//         existingSymptom.days = symptom.days;
//       } else {
//         // If the symptom doesn't exist, add a new symptom entry
//         patient.symptoms.push({
//           symptom_name: symptom.symptom_name,
//           days: symptom.days,
//         });
//       }
//     }

//     // Save the updated patient record
//     await patient.save();
//     p=await symptom.find();
//     console.log("Patient updated:", p);

//     res.json({ message: 'Symptoms data updated successfully', patient });

//   } catch (err) {
//     console.error("Error in saving/updating patient data:", err);
//     res.status(500).send('Server Error');
//   }
// });

// router.get('/user/symptoms/:patient_id', async (req, res) => {
//   try {
//     const { patient_id } = req.params;
//     const patient = await symptom.findOne({ patient_id });

//     if (!patient) {
//       return res.status(404).json({ message: 'Patient not found' });
//     }

//     res.json(patient);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// router.post('/patient', async (req, res) => {
//   const { patientId, priorAntibiotics, prePeriAntibiotics, postAntibiotics, times } = req.body;

//   try {
//     // Find the patient document by patientId
//     const patient = await Patient.findOne({ patient_id: patientId });

//     if (!patient) {
//       return res.status(404).json({ message: 'Patient not found' });
//     }

//     // Update the relevant fields in the patient document
//     patient.priorAntibiotics = priorAntibiotics;
//     patient.prePeriAntibiotics = prePeriAntibiotics;
//     patient.postAntibiotics = postAntibiotics;
//     patient.times = times;
// console.log(patient);
//     // Force saving by using validateModifiedOnly option to skip unchanged fields
//     await patient.save({ validateModifiedOnly: true });

//     res.status(200).json({ message: 'Patient data saved successfully' });
//   } catch (error) {
//     console.error('Error processing patient data:', error);
//     res.status(500).json({ message: 'Error processing patient data', error: error.message });
//   }
// });
// router.get('/user/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Fetch patient from the database
//     const patient = await Patient.findOne({ patient_id: id });
//     console.log(patient);
//     if (!patient) {
//       return res.status(404).json({ error: 'Patient not found' });
//     }

//     // Ensure the data format matches what Flask expects
//     const inputData = {
//       Age: patient.age || 0,  // Age
//       BMI: patient.bmi || 0,   // BMI
//       Diabetes_Status: patient.diabetes === 'yes' ? 'Yes' : 'No',  // Diabetes status as "Yes" or "No"
//       Gender: patient.gender === 'male' ? 'Male' : 'Female',  // Gender as string
//       Wound_Class: patient.wound_class || 'Clean', // Wound Class (must match one of the possible values)
//       Procedure_Name: patient.procedure_name || 'Unknown',  // Procedure Name (ensure valid string)
//       Procedure_Duration: patient.procedure_duration || 0,  // Procedure Duration (numeric)
//     };

//     // Send the formatted input data for prediction
//     const predictionResult = await getPrediction(inputData);

//     if (predictionResult.success) {
//       return res.json({
//         success: true,
//         patient,
//         prediction: predictionResult.prediction,  // The prediction returned from Flask
//       });
//     } else {
//       return res.status(500).json({
//         success: false,
//         patient,
//         message: 'Failed to get prediction',
//       });
//     }
//   } catch (error) {
//     console.error('Error fetching patient:', error);
//     res.status(500).json({ error: 'Failed to fetch patient' });
//   }
// });
// module.exports = router;
