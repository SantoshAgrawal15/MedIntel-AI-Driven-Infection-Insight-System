'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, AlertTriangle, CheckCircle, Activity, TrendingUp, Bell, Filter, Search, Eye, Edit3, Plus } from 'lucide-react';

const SurgeryDashboard = () => {
  const [activeView, setActiveView] = useState('schedule');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSurgery, setSelectedSurgery] = useState(null);

  // Mock surgery data
  const surgeries = [
    {
      id: 1,
      patient: "Sarah Johnson",
      patientId: 1003,
      age: 55,
      procedure: "Knee Replacement",
      surgeon: "Dr. Michael Rodriguez",
      assistantSurgeon: "Dr. Emily Johnson",
      anesthesiologist: "Dr. James Wilson",
      scheduledTime: "08:00",
      estimatedDuration: "2.5 hours",
      actualStartTime: "08:15",
      status: "in-progress",
      riskLevel: "medium",
      riskScore: 35,
      theatre: "OR 2",
      preOpNotes: "Patient diabetic, requires enhanced monitoring",
      complications: [],
      bloodLoss: "150ml",
      vitalSigns: { bp: "120/80", hr: 72, temp: 98.6, o2: 98 }
    },
    {
      id: 2,
      patient: "John Smith",
      patientId: 1006,
      age: 21,
      procedure: "Gallbladder Surgery",
      surgeon: "Dr. Sarah Chen",
      assistantSurgeon: "Dr. Emily Johnson",
      anesthesiologist: "Dr. Wilson",
      scheduledTime: "10:30",
      estimatedDuration: "1.5 hours",
      actualStartTime: null,
      status: "scheduled",
      riskLevel: "low",
      riskScore: 15,
      theatre: "OR 1",
      preOpNotes: "Young, healthy patient. Standard protocol",
      complications: [],
      bloodLoss: null,
      vitalSigns: null
    },
    {
      id: 3,
      patient: "Mary Wilson",
      patientId: 1007,
      age: 68,
      procedure: "Cardiac Bypass",
      surgeon: "Dr. Sarah Chen",
      assistantSurgeon: "Dr. Rodriguez",
      anesthesiologist: "Dr. James Wilson",
      scheduledTime: "14:00",
      estimatedDuration: "4 hours",
      actualStartTime: "14:05",
      status: "completed",
      riskLevel: "high",
      riskScore: 75,
      theatre: "OR 3",
      preOpNotes: "High-risk cardiac patient, multiple comorbidities",
      complications: ["Minor bleeding - controlled"],
      bloodLoss: "450ml",
      vitalSigns: { bp: "110/70", hr: 68, temp: 97.8, o2: 96 }
    },
    {
      id: 4,
      patient: "Robert Brown",
      patientId: 1008,
      age: 45,
      procedure: "Appendectomy",
      surgeon: "Dr. Emily Johnson",
      assistantSurgeon: "Dr. Rodriguez",
      anesthesiologist: "Dr. Wilson",
      scheduledTime: "16:30",
      estimatedDuration: "1 hour",
      actualStartTime: null,
      status: "scheduled",
      riskLevel: "low",
      riskScore: 20,
      theatre: "OR 1",
      preOpNotes: "Emergency appendectomy, patient stable",
      complications: [],
      bloodLoss: null,
      vitalSigns: null
    }
  ];

  const stats = [
    { label: "Today's Surgeries", value: 4, icon: Calendar, color: "bg-blue-500" },
    { label: "In Progress", value: 1, icon: Activity, color: "bg-green-500" },
    { label: "Completed", value: 1, icon: CheckCircle, color: "bg-teal-500" },
    { label: "High Risk Cases", value: 1, icon: AlertTriangle, color: "bg-red-500" }
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
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'in-progress': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'scheduled': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'delayed': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredSurgeries = surgeries.filter(surgery => {
    const matchesStatus = filterStatus === 'all' || surgery.status === filterStatus;
    const matchesSearch = surgery.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         surgery.procedure.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         surgery.surgeon.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏥 Surgery Management</h1>
          <p className="text-gray-600">Real-time surgical operations monitoring and AI-powered risk assessment</p>
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
              { id: 'schedule', label: '📅 Surgery Schedule', icon: Calendar },
              { id: 'monitoring', label: '📊 Live Monitoring', icon: Activity },
              { id: 'analytics', label: '📈 Analytics', icon: TrendingUp },
              { id: 'alerts', label: '🚨 Risk Alerts', icon: Bell }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeView === tab.id
                    ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule View */}
        {activeView === 'schedule' && (
          <div className="space-y-6">
            
            {/* Filters and Search */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search patients, procedures, surgeons..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 w-80"
                    />
                  </div>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300"
                  >
                    <option value="all">All Status</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="delayed">Delayed</option>
                  </select>
                </div>

                <div className="flex items-center space-x-4">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300"
                  />
                  <button className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-teal-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    New Surgery
                  </button>
                </div>
              </div>
            </div>

            {/* Surgery List */}
            <div className="grid grid-cols-1 gap-6">
              {filteredSurgeries.map((surgery) => (
                <div key={surgery.id} className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {surgery.patient.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{surgery.patient}</h3>
                        <p className="text-gray-600">ID: {surgery.patientId} • Age: {surgery.age}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getRiskColor(surgery.riskLevel)}`}>
                        {surgery.riskLevel.toUpperCase()} RISK ({surgery.riskScore}%)
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(surgery.status)}`}>
                        {surgery.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Surgery Details */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 mb-3">🏥 Surgery Details</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-semibold">Procedure:</span> {surgery.procedure}</p>
                        <p><span className="font-semibold">Theatre:</span> {surgery.theatre}</p>
                        <p><span className="font-semibold">Scheduled:</span> {surgery.scheduledTime}</p>
                        <p><span className="font-semibold">Duration:</span> {surgery.estimatedDuration}</p>
                        {surgery.actualStartTime && (
                          <p><span className="font-semibold">Started:</span> {surgery.actualStartTime}</p>
                        )}
                      </div>
                    </div>

                    {/* Medical Team */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 mb-3">👨‍⚕️ Medical Team</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-semibold">Surgeon:</span> {surgery.surgeon}</p>
                        <p><span className="font-semibold">Assistant:</span> {surgery.assistantSurgeon}</p>
                        <p><span className="font-semibold">Anesthesia:</span> {surgery.anesthesiologist}</p>
                      </div>
                    </div>

                    {/* Live Status */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 mb-3">📊 Live Status</h4>
                      {surgery.status === 'in-progress' && surgery.vitalSigns ? (
                        <div className="space-y-2 text-sm">
                          <p><span className="font-semibold">BP:</span> {surgery.vitalSigns.bp}</p>
                          <p><span className="font-semibold">Heart Rate:</span> {surgery.vitalSigns.hr} bpm</p>
                          <p><span className="font-semibold">Temperature:</span> {surgery.vitalSigns.temp}°F</p>
                          <p><span className="font-semibold">O2 Sat:</span> {surgery.vitalSigns.o2}%</p>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                            <span className="text-green-600 font-semibold">STABLE</span>
                          </div>
                        </div>
                      ) : surgery.status === 'completed' ? (
                        <div className="space-y-2 text-sm">
                          <p><span className="font-semibold">Blood Loss:</span> {surgery.bloodLoss}</p>
                          <p><span className="font-semibold">Complications:</span> {surgery.complications.length > 0 ? surgery.complications.join(', ') : 'None'}</p>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span className="text-green-600 font-semibold">COMPLETED</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-600">Pre-operative preparation</p>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-blue-500 mr-2" />
                            <span className="text-blue-600 font-semibold">SCHEDULED</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pre-op Notes */}
                  {surgery.preOpNotes && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                      <h5 className="font-semibold text-blue-800 mb-2">📝 Pre-operative Notes:</h5>
                      <p className="text-blue-700 text-sm">{surgery.preOpNotes}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6 flex justify-end space-x-3">
                    <button 
                      onClick={() => setSelectedSurgery(surgery)}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </button>
                    <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-200 transition-all duration-300 flex items-center">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 rounded-xl hover:from-teal-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                      View Patient (ID: {surgery.patientId})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Monitoring View */}
        {activeView === 'monitoring' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">🔴 Live Surgery Monitoring</h2>
              
              {/* Active Surgeries */}
              {filteredSurgeries.filter(s => s.status === 'in-progress').map((surgery) => (
                <div key={surgery.id} className="border-2 border-blue-200 rounded-2xl p-6 mb-6 bg-blue-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <h3 className="text-xl font-bold text-gray-800">LIVE: {surgery.patient} - {surgery.procedure}</h3>
                    </div>
                    <div className="text-sm text-gray-600">
                      Started: {surgery.actualStartTime} | {surgery.theatre}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">{surgery.vitalSigns?.bp || 'N/A'}</div>
                      <div className="text-sm text-gray-600">Blood Pressure</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{surgery.vitalSigns?.hr || 'N/A'}</div>
                      <div className="text-sm text-gray-600">Heart Rate (bpm)</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{surgery.vitalSigns?.temp || 'N/A'}°F</div>
                      <div className="text-sm text-gray-600">Temperature</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">{surgery.vitalSigns?.o2 || 'N/A'}%</div>
                      <div className="text-sm text-gray-600">Oxygen Saturation</div>
                    </div>
                  </div>

                  <div className="mt-4 bg-white rounded-xl p-4">
                    <h4 className="font-semibold mb-2">🤖 AI Risk Assessment</h4>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            surgery.riskScore > 60 ? 'bg-red-500' : 
                            surgery.riskScore > 30 ? 'bg-orange-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${surgery.riskScore}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-gray-800">{surgery.riskScore}%</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Real-time infection risk based on current surgical parameters
                    </p>
                  </div>
                </div>
              ))}

              {filteredSurgeries.filter(s => s.status === 'in-progress').length === 0 && (
                <div className="text-center py-12">
                  <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Active Surgeries</h3>
                  <p className="text-gray-500">All surgeries are either scheduled or completed</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analytics View */}
        {activeView === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Risk Distribution */}
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Risk Distribution</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-semibold">Low Risk</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {surgeries.filter(s => s.riskLevel === 'low').length} cases
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-600 font-semibold">Medium Risk</span>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                      {surgeries.filter(s => s.riskLevel === 'medium').length} cases
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 font-semibold">High Risk</span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      {surgeries.filter(s => s.riskLevel === 'high').length} cases
                    </span>
                  </div>
                </div>
              </div>

              {/* Surgeon Performance */}
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">👨‍⚕️ Surgeon Performance</h3>
                <div className="space-y-4">
                  {['Dr. Sarah Chen', 'Dr. Michael Rodriguez', 'Dr. Emily Johnson'].map((surgeon, index) => (
                    <div key={surgeon} className="flex items-center justify-between">
                      <span className="font-semibold">{surgeon}</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-lg ${i < 4 + index ? 'text-yellow-400' : 'text-gray-300'}`}>⭐</span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {surgeries.filter(s => s.surgeon === surgeon).length} surgeries
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Risk Alerts View */}
        {activeView === 'alerts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">🚨 AI Risk Alerts & Recommendations</h2>
              
              <div className="space-y-4">
                {surgeries.filter(s => s.riskScore > 50).map((surgery) => (
                  <div key={surgery.id} className="border-l-4 border-red-500 bg-red-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-red-800">HIGH RISK ALERT - {surgery.patient}</h4>
                      <span className="text-red-600 font-semibold">{surgery.riskScore}% Risk</span>
                    </div>
                    <p className="text-red-700 text-sm mb-3">{surgery.preOpNotes}</p>
                    <div className="bg-white rounded-lg p-3">
                      <h5 className="font-semibold text-gray-800 mb-2">🤖 AI Recommendations:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Enhanced antibiotic prophylaxis protocol</li>
                        <li>• Continuous glucose monitoring during surgery</li>
                        <li>• Extended post-operative monitoring</li>
                        <li>• Consider infection prevention specialist consultation</li>
                      </ul>
                    </div>
                  </div>
                ))}

                {surgeries.filter(s => s.riskScore > 25 && s.riskScore <= 50).map((surgery) => (
                  <div key={surgery.id} className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-orange-800">MEDIUM RISK - {surgery.patient}</h4>
                      <span className="text-orange-600 font-semibold">{surgery.riskScore}% Risk</span>
                    </div>
                    <p className="text-orange-700 text-sm mb-3">{surgery.preOpNotes}</p>
                    <div className="bg-white rounded-lg p-3">
                      <h5 className="font-semibold text-gray-800 mb-2">🤖 AI Recommendations:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Standard antibiotic prophylaxis with enhanced timing</li>
                        <li>• Monitor blood glucose levels closely</li>
                        <li>• Regular post-operative assessments</li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Surgery Detail Modal */}
      {selectedSurgery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Surgery Details - {selectedSurgery.patient}</h2>
              <button
                onClick={() => setSelectedSurgery(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Patient Information</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <p><strong>Name:</strong> {selectedSurgery.patient}</p>
                  <p><strong>Patient ID:</strong> {selectedSurgery.patientId}</p>
                  <p><strong>Age:</strong> {selectedSurgery.age}</p>
                  <p><strong>Procedure:</strong> {selectedSurgery.procedure}</p>
                  <p><strong>Risk Level:</strong> <span className={getRiskColor(selectedSurgery.riskLevel).split(' ')[0]}>{selectedSurgery.riskLevel.toUpperCase()}</span></p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Medical Team</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <p><strong>Surgeon:</strong> {selectedSurgery.surgeon}</p>
                  <p><strong>Assistant:</strong> {selectedSurgery.assistantSurgeon}</p>
                  <p><strong>Anesthesiologist:</strong> {selectedSurgery.anesthesiologist}</p>
                  <p><strong>Theatre:</strong> {selectedSurgery.theatre}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-4">
              <button 
                onClick={() => setSelectedSurgery(null)}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all duration-300"
              >
                Close
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl hover:from-teal-700 hover:to-blue-700 transition-all duration-300">
                View Full Patient Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurgeryDashboard;