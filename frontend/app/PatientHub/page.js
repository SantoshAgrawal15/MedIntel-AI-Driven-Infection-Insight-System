'use client';
import React, { useState, useEffect } from 'react';
import { Users, AlertTriangle, TrendingUp, Search, Filter, Plus, Activity, Clock, CheckCircle, Heart, User, Calendar, Edit3, Eye, FileText } from 'lucide-react';

const PatientHub = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Mock patient data with ML risk scores
  const patients = [
    {
      id: 1003,
      name: "Sarah Johnson",
      age: 55,
      gender: "Female",
      admissionDate: "2025-07-10",
      procedure: "Knee Replacement",
      surgeon: "Dr. Michael Rodriguez",
      status: "post-operative",
      daysSinceSurgery: 5,
      riskScore: 35,
      riskLevel: "medium",
      diabetes: "Yes",
      bmi: 28.5,
      vitalSigns: {
        bp: "140/90",
        hr: 78,
        temp: 99.2,
        o2: 97
      },
      complications: [],
      medications: ["Amoxicillin", "Ibuprofen"],
      nextCheckup: "2025-07-20",
      insurance: "BlueCross",
      emergencyContact: "John Johnson - (555) 123-4567"
    },
    {
      id: 1006,
      name: "John Smith",
      age: 21,
      gender: "Male",
      admissionDate: "2025-07-12",
      procedure: "Gallbladder Surgery",
      surgeon: "Dr. Sarah Chen",
      status: "pre-operative",
      daysSinceSurgery: 0,
      riskScore: 15,
      riskLevel: "low",
      diabetes: "No",
      bmi: 22.1,
      vitalSigns: {
        bp: "120/80",
        hr: 72,
        temp: 98.6,
        o2: 99
      },
      complications: [],
      medications: ["Preparation medication"],
      nextCheckup: "2025-07-15",
      insurance: "Aetna",
      emergencyContact: "Mary Smith - (555) 987-6543"
    },
    {
      id: 1007,
      name: "Mary Wilson",
      age: 68,
      gender: "Female",
      admissionDate: "2025-07-08",
      procedure: "Cardiac Bypass",
      surgeon: "Dr. Sarah Chen",
      status: "post-operative",
      daysSinceSurgery: 7,
      riskScore: 75,
      riskLevel: "high",
      diabetes: "Yes",
      bmi: 31.2,
      vitalSigns: {
        bp: "110/70",
        hr: 68,
        temp: 97.8,
        o2: 96
      },
      complications: ["Minor bleeding - controlled"],
      medications: ["Vancomycin", "Insulin", "Metformin"],
      nextCheckup: "2025-07-18",
      insurance: "Medicare",
      emergencyContact: "Robert Wilson - (555) 456-7890"
    },
    {
      id: 1008,
      name: "Robert Brown",
      age: 45,
      gender: "Male",
      admissionDate: "2025-07-14",
      procedure: "Appendectomy",
      surgeon: "Dr. Emily Johnson",
      status: "recovering",
      daysSinceSurgery: 1,
      riskScore: 28,
      riskLevel: "medium",
      diabetes: "No",
      bmi: 25.8,
      vitalSigns: {
        bp: "125/85",
        hr: 75,
        temp: 98.8,
        o2: 98
      },
      complications: [],
      medications: ["Ciprofloxacin", "Morphine"],
      nextCheckup: "2025-07-17",
      insurance: "UnitedHealth",
      emergencyContact: "Linda Brown - (555) 321-0987"
    },
    {
      id: 1009,
      name: "Lisa Davis",
      age: 38,
      gender: "Female",
      admissionDate: "2025-07-13",
      procedure: "Hernia Repair",
      surgeon: "Dr. Michael Rodriguez",
      status: "post-operative",
      daysSinceSurgery: 2,
      riskScore: 12,
      riskLevel: "low",
      diabetes: "No",
      bmi: 23.4,
      vitalSigns: {
        bp: "118/75",
        hr: 70,
        temp: 98.4,
        o2: 99
      },
      complications: [],
      medications: ["Amoxicillin"],
      nextCheckup: "2025-07-19",
      insurance: "Cigna",
      emergencyContact: "Mark Davis - (555) 654-3210"
    }
  ];

  const stats = [
    { label: "Total Patients", value: 156, icon: Users, color: "bg-blue-500" },
    { label: "High Risk", value: 12, icon: AlertTriangle, color: "bg-red-500" },
    { label: "Active Surgeries", value: 8, icon: Activity, color: "bg-green-500" },
    { label: "Due for Checkup", value: 23, icon: Clock, color: "bg-orange-500" }
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'post-operative': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'pre-operative': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'recovering': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.procedure.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.surgeon.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'all' || patient.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  const highRiskPatients = patients.filter(p => p.riskLevel === 'high');
  const todayCheckups = patients.filter(p => p.nextCheckup === '2025-07-15');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">👥 Patient Hub</h1>
          <p className="text-gray-600">Comprehensive patient management with real-time ML risk assessment</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-xl p-2 mb-8">
          <div className="flex flex-wrap space-x-2">
            {[
              { id: 'overview', label: '📊 Overview', icon: Users },
              { id: 'high-risk', label: '🚨 High Risk Alerts', icon: AlertTriangle },
              { id: 'checkups', label: '📅 Today\'s Checkups', icon: Calendar },
              { id: 'analytics', label: '📈 Analytics', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search patients, procedures, doctors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 w-80"
                    />
                  </div>
                  
                  <select
                    value={filterRisk}
                    onChange={(e) => setFilterRisk(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                  >
                    <option value="all">All Risk Levels</option>
                    <option value="high">High Risk</option>
                    <option value="medium">Medium Risk</option>
                    <option value="low">Low Risk</option>
                  </select>
                </div>

                <button className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Patient
                </button>
              </div>
            </div>

            {/* Patient Cards */}
            <div className="grid grid-cols-1 gap-6">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{patient.name}</h3>
                        <p className="text-gray-600">ID: {patient.id} • {patient.age}yr {patient.gender}</p>
                        <p className="text-gray-600">{patient.procedure} • {patient.surgeon}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getRiskColor(patient.riskLevel)}`}>
                        {patient.riskLevel.toUpperCase()} RISK ({patient.riskScore}%)
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(patient.status)}`}>
                        {patient.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    
                    {/* Patient Info */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 mb-3">👤 Patient Info</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-semibold">Admission:</span> {patient.admissionDate}</p>
                        <p><span className="font-semibold">BMI:</span> {patient.bmi}</p>
                        <p><span className="font-semibold">Diabetes:</span> {patient.diabetes}</p>
                        <p><span className="font-semibold">Insurance:</span> {patient.insurance}</p>
                      </div>
                    </div>

                    {/* Vital Signs */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 mb-3">💓 Vital Signs</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span>Blood Pressure:</span>
                          <span className="font-semibold">{patient.vitalSigns.bp}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Heart Rate:</span>
                          <span className="font-semibold">{patient.vitalSigns.hr} bpm</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Temperature:</span>
                          <span className="font-semibold">{patient.vitalSigns.temp}°F</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>O2 Saturation:</span>
                          <span className="font-semibold">{patient.vitalSigns.o2}%</span>
                        </div>
                      </div>
                    </div>

                    {/* AI Risk Assessment */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 mb-3">🤖 AI Risk Assessment</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full ${
                                patient.riskScore > 60 ? 'bg-red-500' : 
                                patient.riskScore > 30 ? 'bg-orange-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${patient.riskScore}%` }}
                            ></div>
                          </div>
                          <span className="font-bold text-gray-800">{patient.riskScore}%</span>
                        </div>
                        <div className="text-xs space-y-1">
                          <p className="text-gray-600">Risk Factors:</p>
                          <div className="flex flex-wrap gap-1">
                            {patient.age > 60 && <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">Age</span>}
                            {patient.diabetes === 'Yes' && <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Diabetes</span>}
                            {patient.bmi > 30 && <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">BMI</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions & Schedule */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 mb-3">⚡ Actions</h4>
                      <div className="space-y-2">
                        <p className="text-sm"><span className="font-semibold">Next Checkup:</span> {patient.nextCheckup}</p>
                        <p className="text-sm"><span className="font-semibold">Medications:</span> {patient.medications.length} active</p>
                        
                        <div className="flex flex-col space-y-2 mt-3">
                          <button 
                            onClick={() => setSelectedPatient(patient)}
                            className="bg-green-100 text-green-700 px-4 py-2 rounded-xl hover:bg-green-200 transition-all duration-300 flex items-center text-sm"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Full Record
                          </button>
                          <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-200 transition-all duration-300 flex items-center text-sm">
                            <FileText className="w-4 h-4 mr-2" />
                            Lab Report
                          </button>
                          <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-xl hover:bg-purple-200 transition-all duration-300 flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule Visit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Complications Alert */}
                  {patient.complications.length > 0 && (
                    <div className="mt-4 p-4 bg-red-50 rounded-xl border-l-4 border-red-500">
                      <h5 className="font-semibold text-red-800 mb-2">⚠️ Active Complications:</h5>
                      <ul className="text-red-700 text-sm">
                        {patient.complications.map((comp, index) => (
                          <li key={index}>• {comp}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* High Risk Alerts Tab */}
        {activeTab === 'high-risk' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">🚨 High Risk Patient Alerts</h2>
              
              <div className="space-y-4">
                {highRiskPatients.map((patient) => (
                  <div key={patient.id} className="border-l-4 border-red-500 bg-red-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-red-800">{patient.name}</h3>
                          <p className="text-red-600">Risk Score: {patient.riskScore}% • {patient.procedure}</p>
                        </div>
                      </div>
                      <span className="bg-red-200 text-red-800 px-4 py-2 rounded-full font-semibold">
                        CRITICAL
                      </span>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">🤖 AI Recommendations:</h4>
                      <ul className="text-gray-700 space-y-1 text-sm">
                        <li>• Enhanced antibiotic prophylaxis protocol</li>
                        <li>• Daily wound monitoring and assessment</li>
                        <li>• Glucose level monitoring (diabetes patient)</li>
                        <li>• Consider infection prevention specialist consultation</li>
                        <li>• Extended post-operative monitoring period</li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Today's Checkups Tab */}
        {activeTab === 'checkups' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📅 Today's Scheduled Checkups</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {todayCheckups.map((patient) => (
                  <div key={patient.id} className="border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{patient.name}</h3>
                        <p className="text-gray-600">{patient.procedure}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Risk Level:</span> {patient.riskLevel} ({patient.riskScore}%)</p>
                      <p><span className="font-semibold">Days Post-Op:</span> {patient.daysSinceSurgery}</p>
                      <p><span className="font-semibold">Current Status:</span> {patient.status}</p>
                    </div>
                    
                    <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                      Start Checkup
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Risk Distribution</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-semibold">Low Risk Patients</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {patients.filter(p => p.riskLevel === 'low').length} patients
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-600 font-semibold">Medium Risk Patients</span>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                      {patients.filter(p => p.riskLevel === 'medium').length} patients
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 font-semibold">High Risk Patients</span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      {patients.filter(p => p.riskLevel === 'high').length} patients
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">📈 Outcomes Tracking</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Infection Rate</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">2.1%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Avg Recovery Time</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">12.5 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Patient Satisfaction</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">96.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Complete Patient Record - {selectedPatient.name}</h2>
              <button
                onClick={() => setSelectedPatient(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <p><strong>Patient ID:</strong> {selectedPatient.id}</p>
                    <p><strong>Age:</strong> {selectedPatient.age} years</p>
                    <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                    <p><strong>BMI:</strong> {selectedPatient.bmi}</p>
                    <p><strong>Diabetes:</strong> {selectedPatient.diabetes}</p>
                    <p><strong>Insurance:</strong> {selectedPatient.insurance}</p>
                    <p><strong>Emergency Contact:</strong> {selectedPatient.emergencyContact}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Current Medications</h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    {selectedPatient.medications.map((med, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                        <span className="font-medium">{med}</span>
                        <span className="text-green-600 text-sm">Active</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Medical History</h3>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <p><strong>Current Procedure:</strong> {selectedPatient.procedure}</p>
                    <p><strong>Surgeon:</strong> {selectedPatient.surgeon}</p>
                    <p><strong>Admission Date:</strong> {selectedPatient.admissionDate}</p>
                    <p><strong>Status:</strong> {selectedPatient.status}</p>
                    <p><strong>Days Since Surgery:</strong> {selectedPatient.daysSinceSurgery}</p>
                    <p><strong>Next Checkup:</strong> {selectedPatient.nextCheckup}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Risk Assessment</h3>
                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold">Infection Risk Score</span>
                      <span className="text-2xl font-bold">{selectedPatient.riskScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                      <div 
                        className={`h-4 rounded-full ${
                          selectedPatient.riskScore > 60 ? 'bg-red-500' : 
                          selectedPatient.riskScore > 30 ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${selectedPatient.riskScore}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Risk Level: <span className={`font-semibold ${
                        selectedPatient.riskLevel === 'high' ? 'text-red-600' :
                        selectedPatient.riskLevel === 'medium' ? 'text-orange-600' : 'text-green-600'
                      }`}>{selectedPatient.riskLevel.toUpperCase()}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-4">
              <button 
                onClick={() => setSelectedPatient(null)}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all duration-300"
              >
                Close
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300">
                Generate Lab Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientHub;