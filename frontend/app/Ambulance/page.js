'use client';
import React, { useState, useEffect } from 'react';
import { Truck, AlertTriangle, TrendingUp, Search, Filter, Plus, Activity, Clock, CheckCircle, MapPin, Users, Phone, Radio, Zap } from 'lucide-react';
import PropTypes from 'prop-types';

const AmbulanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('dispatch');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [isMapLoading, setIsMapLoading] = useState(true);

  // Mock ambulance data
  const ambulances = [
    {
      id: 'AMB001',
      callSign: 'Alpha-1',
      status: 'en-route',
      crew: ['EMT Sarah Johnson', 'Paramedic Mike Rodriguez'],
      patient: {
        name: 'Emergency Patient',
        age: 45,
        condition: 'Chest Pain',
        priority: 'high',
        vitals: { bp: '160/95', hr: 110, o2: 94 },
      },
      location: {
        current: 'Oak Street & 5th Ave',
        destination: 'AstroPlasty Emergency',
        eta: '8 minutes',
        distance: '2.3 miles',
      },
      callTime: '14:23',
      dispatchTime: '14:25',
      equipment: ['Defibrillator', 'Oxygen', 'IV Kit', 'Medications'],
    },
    {
      id: 'AMB002',
      callSign: 'Bravo-2',
      status: 'available',
      crew: ['EMT Lisa Davis', 'Paramedic Robert Brown'],
      patient: null,
      location: {
        current: 'AstroPlasty Hospital',
        destination: null,
        eta: null,
        distance: null,
      },
      callTime: null,
      dispatchTime: null,
      equipment: ['Defibrillator', 'Oxygen', 'IV Kit', 'Medications', 'Surgical Kit'],
    },
    {
      id: 'AMB003',
      callSign: 'Charlie-3',
      status: 'responding',
      crew: ['EMT John Wilson', 'Paramedic Emily Chen'],
      patient: {
        name: 'Traffic Accident Victim',
        age: 28,
        condition: 'Multiple Trauma',
        priority: 'critical',
        vitals: { bp: '90/60', hr: 125, o2: 88 },
      },
      location: {
        current: 'Highway 101 Mile Marker 25',
        destination: 'Trauma Center',
        eta: '15 minutes',
        distance: '8.7 miles',
      },
      callTime: '14:45',
      dispatchTime: '14:47',
      equipment: ['Defibrillator', 'Oxygen', 'IV Kit', 'Trauma Kit', 'Spine Board'],
    },
    {
      id: 'AMB004',
      callSign: 'Delta-4',
      status: 'at-hospital',
      crew: ['EMT Mark Taylor', 'Paramedic Anna Wilson'],
      patient: {
        name: 'Mary Johnson',
        age: 72,
        condition: 'Stroke Symptoms',
        priority: 'high',
        vitals: { bp: '180/100', hr: 88, o2: 96 },
      },
      location: {
        current: 'AstroPlasty Emergency',
        destination: 'Transfer Complete',
        eta: 'Arrived',
        distance: '0 miles',
      },
      callTime: '13:15',
      dispatchTime: '13:17',
      equipment: ['Defibrillator', 'Oxygen', 'IV Kit', 'Stroke Protocol Kit'],
    },
  ];

  const emergencyCalls = [
    {
      id: 'CALL001',
      time: '14:58',
      caller: 'John Smith',
      phone: '(555) 123-4567',
      location: '123 Main Street',
      nature: 'Cardiac Emergency',
      priority: 'critical',
      status: 'dispatched',
      assignedUnit: 'AMB002',
      notes: '67-year-old male, chest pain, difficulty breathing',
    },
    {
      id: 'CALL002',
      time: '15:05',
      caller: 'Maria Garcia',
      phone: '(555) 987-6543',
      location: '456 Elm Street',
      nature: 'Fall Injury',
      priority: 'medium',
      status: 'pending',
      assignedUnit: null,
      notes: 'Elderly female, possible hip fracture, conscious and alert',
    },
    {
      id: 'CALL003',
      time: '15:12',
      caller: 'Police Dispatch',
      phone: '(555) 911-0000',
      location: 'Downtown Park',
      nature: 'Drug Overdose',
      priority: 'high',
      status: 'pending',
      assignedUnit: null,
      notes: 'Multiple casualties, Naloxone administered, need immediate transport',
    },
  ];

  const hospitalReadiness = {
    emergencyBeds: { available: 8, total: 15 },
    traumaBeds: { available: 2, total: 6 },
    surgicalRooms: { available: 3, total: 8 },
    bloodBank: { oNeg: 15, oPos: 22, aNeg: 8, aPos: 18 },
    specialists: {
      cardiology: { available: 2, oncall: 1 },
      trauma: { available: 1, oncall: 2 },
      neurology: { available: 1, oncall: 1 },
    },
  };

  const stats = [
    { label: 'Active Ambulances', value: 4, icon: Truck, color: 'bg-blue-500' },
    { label: 'Emergency Calls', value: 12, icon: Phone, color: 'bg-red-500' },
    { label: 'Response Time Avg', value: '6.2 min', icon: Clock, color: 'bg-green-500' },
    { label: 'Hospital Readiness', value: '85%', icon: Activity, color: 'bg-purple-500' },
  ];

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => setIsMapLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'en-route':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'responding':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'at-hospital':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'out-of-service':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredAmbulances = ambulances.filter((ambulance) => {
    const matchesSearch =
      ambulance.callSign.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ambulance.crew.some((member) => member.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || ambulance.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleContactUnit = (ambulance) => {
    setSelectedAmbulance(ambulance);
    console.log(`Contacting unit: ${ambulance.callSign}`);
    // Add real contact logic here (e.g., open communication modal)
  };

  const handleDispatchUnit = (call) => {
    console.log(`Dispatching unit for call: ${call.id}`);
    // Add real dispatch logic here (e.g., assign unit to call)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8" aria-labelledby="dashboard-title">
          <h1 id="dashboard-title" className="text-4xl font-bold text-gray-800 mb-2">
            🚑 Emergency Services
          </h1>
          <p className="text-gray-600">Real-time ambulance tracking and emergency response coordination</p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              role="region"
              aria-label={stat.label}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <nav className="bg-white rounded-2xl shadow-xl p-2 mb-8" aria-label="Dashboard tabs">
          <div className="flex flex-wrap space-x-2">
            {[
              { id: 'dispatch', label: '🚨 Live Dispatch', icon: Radio },
              { id: 'ambulances', label: '🚑 Fleet Status', icon: Truck },
              { id: 'hospital', label: '🏥 Hospital Readiness', icon: Activity },
              { id: 'analytics', label: '📊 Response Analytics', icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Live Dispatch Tab */}
        {activeTab === 'dispatch' && (
          <div className="space-y-6">
            {/* Emergency Map Placeholder */}
            <section className="bg-white rounded-2xl p-6 shadow-xl" aria-labelledby="map-title">
              <h2 id="map-title" className="text-2xl font-bold text-gray-800 mb-6">
                🗺️ Live Emergency Map
              </h2>
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl h-64 flex items-center justify-center relative overflow-hidden">
                {isMapLoading ? (
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading map...</p>
                  </div>
                ) : (
                  <>
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" aria-hidden="true" />
                      <div className="text-xl font-semibold text-gray-800 mb-2">Real-Time Emergency Map</div>
                      <div className="text-gray-600">Ambulance locations and active calls</div>
                    </div>
                    {/* Animated ambulance icons */}
                    <div className="absolute top-4 left-4 bg-red-500 text-white p-2 rounded-full animate-pulse">
                      <Truck className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="absolute bottom-8 right-8 bg-blue-500 text-white p-2 rounded-full animate-bounce">
                      <Truck className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="absolute top-1/2 left-1/3 bg-orange-500 text-white p-2 rounded-full animate-ping">
                      <Truck className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* Active Emergency Calls */}
            <section className="bg-white rounded-2xl p-6 shadow-xl" aria-labelledby="calls-title">
              <div className="flex items-center justify-between mb-6">
                <h2 id="calls-title" className="text-2xl font-bold text-gray-800">
                  📞 Active Emergency Calls
                </h2>
                <button
                  className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
                  aria-label="Add new emergency call"
                >
                  <Plus className="w-5 h-5 mr-2" aria-hidden="true" />
                  New Emergency Call
                </button>
              </div>
              <div className="space-y-4">
                {emergencyCalls.map((call) => (
                  <div
                    key={call.id}
                    className="border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                    role="region"
                    aria-labelledby={`call-${call.id}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                          <Phone className="w-6 h-6" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 id={`call-${call.id}`} className="text-lg font-bold text-gray-800">
                            {call.nature}
                          </h3>
                          <p className="text-gray-600">
                            Call Time: {call.time} • Caller: {call.caller}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold border ${getPriorityColor(call.priority)}`}
                        >
                          {call.priority.toUpperCase()}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                            call.status === 'dispatched'
                              ? 'text-blue-600 bg-blue-50 border-blue-200'
                              : 'text-orange-600 bg-orange-50 border-orange-200'
                          }`}
                        >
                          {call.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">📍 Location</h4>
                        <p className="text-gray-600">{call.location}</p>
                        <p className="text-sm text-gray-500">Phone: {call.phone}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">📝 Details</h4>
                        <p className="text-gray-600 text-sm">{call.notes}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">🚑 Response</h4>
                        {call.assignedUnit ? (
                          <p className="text-green-600 font-semibold">Assigned: {call.assignedUnit}</p>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-orange-600 font-semibold">Awaiting Assignment</p>
                            <button
                              onClick={() => handleDispatchUnit(call)}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                              aria-label={`Dispatch unit for ${call.nature}`}
                            >
                              Dispatch Unit
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Fleet Status Tab */}
        {activeTab === 'ambulances' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <section className="bg-white rounded-2xl p-6 shadow-xl" aria-label="Search and filter ambulances">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      placeholder="Search ambulances, crew members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 w-80"
                      aria-label="Search ambulances or crew members"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300"
                    aria-label="Filter by ambulance status"
                  >
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="en-route">En Route</option>
                    <option value="responding">Responding</option>
                    <option value="at-hospital">At Hospital</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Ambulance Fleet */}
            <section className="grid grid-cols-1 gap-6" aria-label="Ambulance fleet status">
              {filteredAmbulances.length === 0 ? (
                <div className="bg-white rounded-2xl p-6 shadow-xl text-center">
                  <p className="text-gray-600">No ambulances match the current filters.</p>
                </div>
              ) : (
                filteredAmbulances.map((ambulance) => (
                  <div
                    key={ambulance.id}
                    className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                    role="region"
                    aria-labelledby={`ambulance-${ambulance.id}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          <Truck className="w-8 h-8" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 id={`ambulance-${ambulance.id}`} className="text-xl font-bold text-gray-800">
                            {ambulance.callSign}
                          </h3>
                          <p className="text-gray-600">Unit ID: {ambulance.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(ambulance.status)}`}
                        >
                          {ambulance.status.replace('-', ' ').toUpperCase()}
                        </span>
                        {ambulance.status !== 'available' && (
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" aria-hidden="true" />
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {/* Crew Information */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800 mb-3">👥 Crew</h4>
                        <div className="space-y-2 text-sm">
                          {ambulance.crew.map((member, index) => (
                            <p key={index}>
                              <span className="font-semibold">{member}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                      {/* Location & Status */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800 mb-3">📍 Location</h4>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-semibold">Current:</span> {ambulance.location.current}
                          </p>
                          {ambulance.location.destination && (
                            <>
                              <p>
                                <span className="font-semibold">Destination:</span>{' '}
                                {ambulance.location.destination}
                              </p>
                              <p>
                                <span className="font-semibold">ETA:</span> {ambulance.location.eta}
                              </p>
                              <p>
                                <span className="font-semibold">Distance:</span> {ambulance.location.distance}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      {/* Patient Information */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800 mb-3">🏥 Patient</h4>
                        {ambulance.patient ? (
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="font-semibold">Condition:</span> {ambulance.patient.condition}
                            </p>
                            <p>
                              <span className="font-semibold">Priority:</span>
                              <span
                                className={`ml-2 px-2 py-1 rounded text-xs ${
                                  ambulance.patient.priority === 'critical'
                                    ? 'bg-red-100 text-red-700'
                                    : ambulance.patient.priority === 'high'
                                    ? 'bg-orange-100 text-orange-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}
                              >
                                {ambulance.patient.priority.toUpperCase()}
                              </span>
                            </p>
                            {ambulance.patient.vitals && (
                              <div className="bg-gray-50 p-2 rounded mt-2">
                                <p className="text-xs">
                                  <strong>Vitals:</strong>
                                </p>
                                <p className="text-xs">BP: {ambulance.patient.vitals.bp}</p>
                                <p className="text-xs">HR: {ambulance.patient.vitals.hr} bpm</p>
                                <p className="text-xs">O2: {ambulance.patient.vitals.o2}%</p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-500 italic text-sm">No current patient</p>
                        )}
                      </div>
                      {/* Equipment & Actions */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800 mb-3">🎒 Equipment</h4>
                        <div className="space-y-2">
                          <div className="text-xs space-y-1">
                            {ambulance.equipment.slice(0, 3).map((item, index) => (
                              <div
                                key={index}
                                className="bg-green-50 text-green-700 px-2 py-1 rounded text-center"
                              >
                                {item}
                              </div>
                            ))}
                            {ambulance.equipment.length > 3 && (
                              <div className="text-gray-500 text-center">
                                +{ambulance.equipment.length - 3} more
                              </div>
                            )}
                          </div>
                          <div className="mt-4 space-y-2">
                            <button
                              onClick={() => handleContactUnit(ambulance)}
                              className="w-full bg-blue-100 text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-200 transition-all duration-300 flex items-center justify-center text-sm"
                              aria-label={`Contact ${ambulance.callSign}`}
                            >
                              <Radio className="w-4 h-4 mr-2" aria-hidden="true" />
                              Contact Unit
                            </button>
                            {ambulance.status === 'available' && (
                              <button
                                onClick={() => handleDispatchUnit(ambulance)}
                                className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-xl hover:bg-red-200 transition-all duration-300 flex items-center justify-center text-sm"
                                aria-label={`Dispatch ${ambulance.callSign}`}
                              >
                                <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
                                Dispatch
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Timeline */}
                    {ambulance.callTime && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                        <h5 className="font-semibold text-gray-800 mb-2">⏱️ Timeline</h5>
                        <div className="flex space-x-6 text-sm">
                          <div>
                            <span className="font-semibold">Call Received:</span> {ambulance.callTime}
                          </div>
                          <div>
                            <span className="font-semibold">Dispatched:</span> {ambulance.dispatchTime}
                          </div>
                          <div>
                            <span className="font-semibold">Response Time:</span>
                            {(() => {
                              const call = new Date(`2025-07-15T${ambulance.callTime}:00`);
                              const dispatch = new Date(`2025-07-15T${ambulance.dispatchTime}:00`);
                              const diff = Math.floor((dispatch - call) / 60000);
                              return ` ${diff} minutes`;
                            })()}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </section>
          </div>
        )}

        {/* Hospital Readiness Tab */}
        {activeTab === 'hospital' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bed Availability */}
              <section className="bg-white rounded-2xl p-6 shadow-xl" aria-labelledby="beds-title">
                <h3 id="beds-title" className="text-xl font-bold text-gray-800 mb-4">
                  🛏️ Bed Availability
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Emergency Beds</span>
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {hospitalReadiness.emergencyBeds.available} available
                      </span>
                      <span className="text-gray-600 text-sm">/ {hospitalReadiness.emergencyBeds.total}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Trauma Beds</span>
                    <div className="flex items-center space-x-2">
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                        {hospitalReadiness.traumaBeds.available} available
                      </span>
                      <span className="text-gray-600 text-sm">/ {hospitalReadiness.traumaBeds.total}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Surgical Rooms</span>
                    <div className="flex items-center space-x-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {hospitalReadiness.surgicalRooms.available} available
                      </span>
                      <span className="text-gray-600 text-sm">/ {hospitalReadiness.surgicalRooms.total}</span>
                    </div>
                  </div>
                </div>
              </section>
              {/* Blood Bank Status */}
              <section className="bg-white rounded-2xl p-6 shadow-xl" aria-labelledby="blood-bank-title">
                <h3 id="blood-bank-title" className="text-xl font-bold text-gray-800 mb-4">
                  🩸 Blood Bank Status
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(hospitalReadiness.bloodBank).map(([type, units]) => (
                    <div key={type} className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-bold text-lg">{units}</div>
                      <div className="text-sm text-gray-600">{type.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </section>
              {/* Specialist Availability */}
              <section
                className="bg-white rounded-2xl p-6 shadow-xl md:col-span-2"
                aria-labelledby="specialists-title"
              >
                <h3 id="specialists-title" className="text-xl font-bold text-gray-800 mb-4">
                  👨‍⚕️ Specialist Availability
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(hospitalReadiness.specialists).map(([specialty, staff]) => (
                    <div key={specialty} className="border-2 border-gray-200 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 capitalize mb-3">{specialty}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span>Available:</span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            {staff.available}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>On-Call:</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            {staff.oncall}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {/* Analytics Tab Placeholder */}
        {activeTab === 'analytics' && (
          <section className="bg-white rounded-2xl p-6 shadow-xl" aria-labelledby="analytics-title">
            <h2 id="analytics-title" className="text-2xl font-bold text-gray-800 mb-6">
              📊 Response Analytics
            </h2>
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" aria-hidden="true" />
              <p className="text-gray-600">Analytics dashboard coming soon...</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// PropTypes for type-checking
AmbulanceDashboard.propTypes = {
  // No props are passed to this component, but this can be extended if needed
};

export default AmbulanceDashboard;