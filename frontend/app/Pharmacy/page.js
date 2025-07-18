'use client';
import React, { useState, useEffect } from 'react';
import { Pill, AlertTriangle, TrendingUp, Search, Filter, Plus, BarChart3, Users, Clock, CheckCircle, Package, Eye, Edit3 } from 'lucide-react';

const PharmacyDashboard = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedDrug, setSelectedDrug] = useState(null);

  // Mock pharmacy data
  const inventory = [
    {
      id: 1,
      name: "Amoxicillin",
      category: "Antibiotic",
      stock: 150,
      minStock: 50,
      unit: "tablets",
      expiry: "2025-12-15",
      resistance: 15,
      cost: "$0.45",
      supplier: "MedCorp",
      location: "A1-25"
    },
    {
      id: 2,
      name: "Vancomycin",
      category: "Antibiotic",
      stock: 25,
      minStock: 20,
      unit: "vials",
      expiry: "2026-03-20",
      resistance: 5,
      cost: "$45.80",
      supplier: "PharmaTech",
      location: "B2-10"
    },
    {
      id: 3,
      name: "Ciprofloxacin",
      category: "Antibiotic",
      stock: 8,
      minStock: 25,
      unit: "tablets",
      expiry: "2025-08-10",
      resistance: 35,
      cost: "$1.20",
      supplier: "MedCorp",
      location: "A1-30"
    },
    {
      id: 4,
      name: "Insulin",
      category: "Hormone",
      stock: 45,
      minStock: 15,
      unit: "vials",
      expiry: "2025-09-30",
      resistance: 0,
      cost: "$25.00",
      supplier: "DiabetesCare",
      location: "C1-05"
    },
    {
      id: 5,
      name: "Morphine",
      category: "Analgesic",
      stock: 12,
      minStock: 10,
      unit: "ampoules",
      expiry: "2026-01-15",
      resistance: 0,
      cost: "$15.60",
      supplier: "PainRelief Inc",
      location: "D1-02"
    }
  ];

  const prescriptions = [
    {
      id: 1,
      patient: "Sarah Johnson",
      patientId: 1003,
      doctor: "Dr. Sarah Chen",
      drugs: [
        { name: "Amoxicillin", dosage: "500mg", frequency: "3x daily", duration: "7 days" },
        { name: "Ibuprofen", dosage: "400mg", frequency: "As needed", duration: "5 days" }
      ],
      status: "pending",
      priority: "normal",
      date: "2025-07-15"
    },
    {
      id: 2,
      patient: "John Smith",
      patientId: 1006,
      doctor: "Dr. Michael Rodriguez",
      drugs: [
        { name: "Vancomycin", dosage: "1g", frequency: "2x daily", duration: "10 days" }
      ],
      status: "dispensed",
      priority: "high",
      date: "2025-07-15"
    },
    {
      id: 3,
      patient: "Mary Wilson",
      patientId: 1007,
      doctor: "Dr. Emily Johnson",
      drugs: [
        { name: "Insulin", dosage: "10 units", frequency: "Before meals", duration: "Ongoing" },
        { name: "Metformin", dosage: "500mg", frequency: "2x daily", duration: "Ongoing" }
      ],
      status: "ready",
      priority: "normal",
      date: "2025-07-15"
    }
  ];

  const resistanceData = [
    { drug: "Penicillin", resistance: 85, trend: "increasing", patients: 45 },
    { drug: "Ciprofloxacin", resistance: 35, trend: "stable", patients: 28 },
    { drug: "Vancomycin", resistance: 5, trend: "decreasing", patients: 12 },
    { drug: "Amoxicillin", resistance: 15, trend: "stable", patients: 67 }
  ];

  const stats = [
    { label: "Total Medications", value: 347, icon: Package, color: "bg-blue-500" },
    { label: "Low Stock Items", value: 12, icon: AlertTriangle, color: "bg-red-500" },
    { label: "Pending Prescriptions", value: 8, icon: Clock, color: "bg-orange-500" },
    { label: "High Resistance Drugs", value: 3, icon: TrendingUp, color: "bg-purple-500" }
  ];

  const getStockStatus = (current, minimum) => {
    if (current <= minimum) return { status: 'critical', color: 'text-red-600 bg-red-50 border-red-200' };
    if (current <= minimum * 1.5) return { status: 'low', color: 'text-orange-600 bg-orange-50 border-orange-200' };
    return { status: 'good', color: 'text-green-600 bg-green-50 border-green-200' };
  };

  const getPrescriptionStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'ready': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'dispensed': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">💊 Pharmacy Management</h1>
          <p className="text-gray-600">Advanced drug management with AI-powered resistance tracking</p>
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
              { id: 'inventory', label: '📦 Inventory', icon: Package },
              { id: 'prescriptions', label: '📋 Prescriptions', icon: Users },
              { id: 'resistance', label: '🦠 Resistance Tracking', icon: BarChart3 },
              { id: 'analytics', label: '📊 Analytics', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search medications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 w-80"
                    />
                  </div>
                  
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  >
                    <option value="all">All Categories</option>
                    <option value="antibiotic">Antibiotics</option>
                    <option value="hormone">Hormones</option>
                    <option value="analgesic">Analgesics</option>
                  </select>
                </div>

                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Medication
                </button>
              </div>
            </div>

            {/* Inventory Grid */}
            <div className="grid grid-cols-1 gap-6">
              {filteredInventory.map((item) => {
                const stockStatus = getStockStatus(item.stock, item.minStock);
                return (
                  <div key={item.id} className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                          <p className="text-gray-600">{item.category} • {item.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${stockStatus.color}`}>
                          {stockStatus.status.toUpperCase()}
                        </span>
                        {item.resistance > 0 && (
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                            item.resistance > 30 ? 'text-red-600 bg-red-50 border-red-200' : 
                            item.resistance > 15 ? 'text-orange-600 bg-orange-50 border-orange-200' : 
                            'text-yellow-600 bg-yellow-50 border-yellow-200'
                          }`}>
                            {item.resistance}% RESISTANCE
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      
                      {/* Stock Information */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800 mb-3">📦 Stock Info</h4>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-semibold">Current Stock:</span> {item.stock} {item.unit}</p>
                          <p><span className="font-semibold">Minimum Stock:</span> {item.minStock} {item.unit}</p>
                          <p><span className="font-semibold">Unit Cost:</span> {item.cost}</p>
                          <p><span className="font-semibold">Supplier:</span> {item.supplier}</p>
                        </div>
                      </div>

                      {/* Expiry & Safety */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800 mb-3">⏰ Expiry & Safety</h4>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-semibold">Expiry Date:</span> {item.expiry}</p>
                          <p><span className="font-semibold">Days to Expiry:</span> {
                            Math.ceil((new Date(item.expiry) - new Date()) / (1000 * 60 * 60 * 24))
                          } days</p>
                          <p><span className="font-semibold">Storage:</span> Room Temp</p>
                        </div>
                      </div>

                      {/* Resistance Tracking */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800 mb-3">🦠 Resistance</h4>
                        {item.resistance > 0 ? (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-3">
                                <div 
                                  className={`h-3 rounded-full ${
                                    item.resistance > 30 ? 'bg-red-500' : 
                                    item.resistance > 15 ? 'bg-orange-500' : 'bg-yellow-500'
                                  }`}
                                  style={{ width: `${item.resistance}%` }}
                                ></div>
                              </div>
                              <span className="font-bold text-gray-800">{item.resistance}%</span>
                            </div>
                            <p className="text-xs text-gray-600">
                              Based on 150 recent cultures
                            </p>
                          </div>
                        ) : (
                          <p className="text-green-600 font-semibold">No resistance detected</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800 mb-3">⚡ Actions</h4>
                        <div className="flex flex-col space-y-2">
                          <button 
                            onClick={() => setSelectedDrug(item)}
                            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-200 transition-all duration-300 flex items-center text-sm"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </button>
                          <button className="bg-green-100 text-green-700 px-4 py-2 rounded-xl hover:bg-green-200 transition-all duration-300 flex items-center text-sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Reorder
                          </button>
                          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center text-sm">
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Prescriptions Tab */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Active Prescriptions</h2>
              
              <div className="space-y-4">
                {prescriptions.map((prescription) => (
                  <div key={prescription.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                          {prescription.patient.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{prescription.patient}</h3>
                          <p className="text-gray-600">Dr. {prescription.doctor} • ID: {prescription.patientId}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {prescription.priority === 'high' && (
                          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700 border border-red-200">
                            HIGH PRIORITY
                          </span>
                        )}
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getPrescriptionStatusColor(prescription.status)}`}>
                          {prescription.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">💊 Medications</h4>
                        <div className="space-y-2">
                          {prescription.drugs.map((drug, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg">
                              <p className="font-semibold">{drug.name} {drug.dosage}</p>
                              <p className="text-sm text-gray-600">{drug.frequency} for {drug.duration}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Prescription Date</p>
                          <p className="font-semibold text-lg">{prescription.date}</p>
                          <div className="mt-4 space-x-2">
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                              Process
                            </button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                              View Patient
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Resistance Tracking Tab */}
        {activeTab === 'resistance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">🦠 Antibiotic Resistance Monitoring</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {resistanceData.map((drug, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{drug.drug}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        drug.trend === 'increasing' ? 'bg-red-100 text-red-700' :
                        drug.trend === 'decreasing' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {drug.trend.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold">Resistance Level</span>
                          <span className="font-bold text-lg">{drug.resistance}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div 
                            className={`h-4 rounded-full ${
                              drug.resistance > 50 ? 'bg-red-500' :
                              drug.resistance > 25 ? 'bg-orange-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${drug.resistance}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <p><strong>Patients Tested:</strong> {drug.patients}</p>
                        <p><strong>Recommendation:</strong> {
                          drug.resistance > 50 ? 'Consider alternative antibiotics' :
                          drug.resistance > 25 ? 'Monitor closely, consider alternatives' :
                          'Safe to use as first-line treatment'
                        }</p>
                      </div>
                    </div>
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
                <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Usage Analytics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Most Prescribed</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Amoxicillin</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Cost Savings This Month</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">$12,450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Inventory Turnover</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">92%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">⚠️ Alerts & Notifications</h3>
                <div className="space-y-3">
                  <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                    <p className="text-red-700 font-semibold">Critical Stock: Ciprofloxacin</p>
                    <p className="text-red-600 text-sm">Only 8 tablets remaining</p>
                  </div>
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded">
                    <p className="text-orange-700 font-semibold">Expiry Alert: Insulin</p>
                    <p className="text-orange-600 text-sm">Expires in 45 days</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                    <p className="text-blue-700 font-semibold">Resistance Alert: Penicillin</p>
                    <p className="text-blue-600 text-sm">85% resistance detected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Drug Detail Modal */}
      {selectedDrug && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">{selectedDrug.name} Details</h2>
              <button
                onClick={() => setSelectedDrug(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Basic Information</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <p><strong>Category:</strong> {selectedDrug.category}</p>
                  <p><strong>Location:</strong> {selectedDrug.location}</p>
                  <p><strong>Supplier:</strong> {selectedDrug.supplier}</p>
                  <p><strong>Unit Cost:</strong> {selectedDrug.cost}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Stock & Expiry</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <p><strong>Current Stock:</strong> {selectedDrug.stock} {selectedDrug.unit}</p>
                  <p><strong>Minimum Stock:</strong> {selectedDrug.minStock} {selectedDrug.unit}</p>
                  <p><strong>Expiry Date:</strong> {selectedDrug.expiry}</p>
                  <p><strong>Resistance:</strong> {selectedDrug.resistance}%</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-4">
              <button 
                onClick={() => setSelectedDrug(null)}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all duration-300"
              >
                Close
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                Reorder Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacyDashboard;