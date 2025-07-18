'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, MapPin, Star, Send, CheckCircle } from 'lucide-react';

const AppointmentBooking = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    emergencyContact: '',
    medicalHistory: '',
    appointmentType: '',
    preferredDate: '',
    preferredTime: '',
    selectedDoctor: null,
    symptoms: ''
  });

  const [availableTimes, setAvailableTimes] = useState([]);
  const [recommendedDoctors, setRecommendedDoctors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);

  // Mock doctors data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialty: "Surgical Oncology",
      rating: 4.9,
      experience: "15 years",
      education: "Harvard Medical School",
      languages: ["English", "Mandarin"],
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      nextAvailable: "Today 2:00 PM",
      consultationFee: "$150"
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      specialty: "Orthopedic Surgery",
      rating: 4.8,
      experience: "12 years",
      education: "Johns Hopkins",
      languages: ["English", "Spanish"],
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
      nextAvailable: "Tomorrow 10:00 AM",
      consultationFee: "$180"
    },
    {
      id: 3,
      name: "Dr. Emily Johnson",
      specialty: "General Surgery",
      rating: 4.7,
      experience: "8 years",
      education: "Stanford Medical",
      languages: ["English", "French"],
      image: "https://images.unsplash.com/photo-1594824721432-e2b0e6cd25c8?w=300&h=300&fit=crop&crop=face",
      nextAvailable: "Today 4:30 PM",
      consultationFee: "$120"
    }
  ];

  const appointmentTypes = [
    { id: 'consultation', name: 'Initial Consultation', duration: '30 min', icon: '🩺' },
    { id: 'follow-up', name: 'Follow-up Visit', duration: '20 min', icon: '📋' },
    { id: 'surgery', name: 'Surgical Consultation', duration: '45 min', icon: '🏥' },
    { id: 'emergency', name: 'Urgent Care', duration: '15 min', icon: '🚨' }
  ];

  // Generate available times based on selected date
  useEffect(() => {
    if (formData.preferredDate) {
      const times = [
        '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
        '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
      ];
      setAvailableTimes(times);
    }
  }, [formData.preferredDate]);

  // Recommend doctors based on appointment type
  useEffect(() => {
    if (formData.appointmentType) {
      const filtered = doctors.filter(doc => 
        formData.appointmentType === 'surgery' ? 
        doc.specialty.includes('Surgery') : true
      );
      setRecommendedDoctors(filtered);
    }
  }, [formData.appointmentType]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Send email (simulate)
    console.log('Sending appointment confirmation email...');
    
    setIsSubmitting(false);
    setAppointmentConfirmed(true);
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  if (appointmentConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center transform animate-pulse">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Appointment Confirmed! 🎉</h2>
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-green-800 mb-2">Appointment Details:</h3>
              <p><strong>Patient:</strong> {formData.name}</p>
              <p><strong>Doctor:</strong> {formData.selectedDoctor?.name}</p>
              <p><strong>Date:</strong> {formData.preferredDate}</p>
              <p><strong>Time:</strong> {formData.preferredTime}</p>
              <p><strong>Type:</strong> {appointmentTypes.find(t => t.id === formData.appointmentType)?.name}</p>
            </div>
            <div className="text-sm text-gray-600 mb-6">
              📧 Confirmation email sent to {formData.email}<br/>
              📱 SMS reminder sent to {formData.phone}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step >= stepNum ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-20 h-1 mx-4 transition-all duration-300 ${
                    step > stepNum ? 'bg-teal-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Step {step} of 4: {
                step === 1 ? 'Personal Information' :
                step === 2 ? 'Appointment Type' :
                step === 3 ? 'Select Doctor & Time' :
                'Confirmation'
              }
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                👋 Let's Get to Know You
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="inline w-4 h-4 mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 group-hover:border-teal-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="inline w-4 h-4 mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 group-hover:border-teal-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 group-hover:border-teal-300"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 group-hover:border-teal-300"
                      placeholder="25"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 group-hover:border-teal-300"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="group md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 group-hover:border-teal-300"
                    placeholder="Emergency contact name and phone"
                  />
                </div>

                <div className="group md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Brief Medical History / Current Symptoms
                  </label>
                  <textarea
                    value={formData.medicalHistory}
                    onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                    rows={4}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 group-hover:border-teal-300"
                    placeholder="Please describe your symptoms or reason for visit..."
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={nextStep}
                  disabled={!formData.name || !formData.email || !formData.phone}
                  className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                >
                  Continue to Appointment Type →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Appointment Type */}
          {step === 2 && (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                🩺 What Type of Appointment Do You Need?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {appointmentTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => handleInputChange('appointmentType', type.id)}
                    className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      formData.appointmentType === type.id
                        ? 'border-teal-500 bg-teal-50 shadow-xl'
                        : 'border-gray-200 hover:border-teal-300 hover:shadow-lg'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-4">{type.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{type.name}</h3>
                      <p className="text-gray-600 text-sm">Duration: {type.duration}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={prevStep}
                  className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-all duration-300"
                >
                  ← Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!formData.appointmentType}
                  className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                >
                  Choose Doctor & Time →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Doctor & Time Selection */}
          {step === 3 && (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                👨‍⚕️ Select Your Doctor & Preferred Time
              </h2>

              {/* Date Selection */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  <Calendar className="inline w-5 h-5 mr-2" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full md:w-auto p-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300"
                />
              </div>

              {/* Doctor Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Available Doctors</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {recommendedDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => handleInputChange('selectedDoctor', doctor)}
                      className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        formData.selectedDoctor?.id === doctor.id
                          ? 'border-teal-500 bg-teal-50 shadow-xl'
                          : 'border-gray-200 hover:border-teal-300 hover:shadow-lg'
                      }`}
                    >
                      <div className="text-center">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                        />
                        <h4 className="font-bold text-gray-800 mb-2">{doctor.name}</h4>
                        <p className="text-teal-600 text-sm font-semibold mb-2">{doctor.specialty}</p>
                        <div className="flex items-center justify-center mb-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{doctor.experience}</p>
                        <p className="text-xs text-green-600 font-semibold">{doctor.nextAvailable}</p>
                        <p className="text-sm font-bold text-gray-800 mt-2">{doctor.consultationFee}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {formData.preferredDate && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    <Clock className="inline w-5 h-5 mr-2" />
                    Available Times
                  </h3>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleInputChange('preferredTime', time)}
                        className={`p-3 border-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                          formData.preferredTime === time
                            ? 'border-teal-500 bg-teal-500 text-white shadow-xl'
                            : 'border-gray-200 hover:border-teal-300 hover:shadow-lg'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-all duration-300"
                >
                  ← Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!formData.selectedDoctor || !formData.preferredDate || !formData.preferredTime}
                  className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                >
                  Review & Confirm →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                ✅ Review Your Appointment
              </h2>

              <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4">Patient Information</h3>
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone:</strong> {formData.phone}</p>
                    <p><strong>Age:</strong> {formData.age}</p>
                    <p><strong>Gender:</strong> {formData.gender}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-4">Appointment Details</h3>
                    <p><strong>Type:</strong> {appointmentTypes.find(t => t.id === formData.appointmentType)?.name}</p>
                    <p><strong>Doctor:</strong> {formData.selectedDoctor?.name}</p>
                    <p><strong>Specialty:</strong> {formData.selectedDoctor?.specialty}</p>
                    <p><strong>Date:</strong> {formData.preferredDate}</p>
                    <p><strong>Time:</strong> {formData.preferredTime}</p>
                    <p><strong>Fee:</strong> {formData.selectedDoctor?.consultationFee}</p>
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-6">
                  <p className="text-sm text-blue-800">
                    📧 Confirmation email will be sent to <strong>{formData.email}</strong><br/>
                    📱 SMS reminder will be sent to <strong>{formData.phone}</strong>
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-all duration-300"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 shadow-xl flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Booking Appointment...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Confirm Appointment
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;