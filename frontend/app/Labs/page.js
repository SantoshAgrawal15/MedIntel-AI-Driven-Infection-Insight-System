'use client';
import React, { useState, useEffect } from 'react';
import { Microscope, AlertTriangle, TrendingUp, Search, Filter, Plus, Activity, Clock, CheckCircle, FileText, Eye, Download, Beaker, Target } from 'lucide-react';

const LabsDashboard = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedResult, setSelectedResult] = useState(null);

  // Mock lab data
  const labResults = [
    {
      id: 'LAB001',
      patientId: 1003,
      patientName: "Sarah Johnson",
      testType: "Blood Culture",
      sampleType: "Blood",
      collectionDate: "2025-07-10",
      completionDate: "2025-07-12",
      status: "completed",
      priority: "high",
      results: {
        organism: "Staphylococcus aureus",
        growth: "Positive",
        quantity: "Heavy growth",
        resistance: {
          penicillin: "Resistant",
          vancomycin: "Sensitive",
          clindamycin: "Intermediate"
        }
      },
      aiAnalysis: {
        infectionRisk: 85,
        recommendation: "Immediate antibiotic therapy with Vancomycin",
        confidence: 92
      },
      doctor: "Dr. Sarah Chen",
      technician: "Lab Tech Mike"
    },
    {
      id: 'LAB002',
      patientId: 1006,
      patientName: "John Smith",
      testType: "Wound Swab",
      sampleType: "Wound",
      collectionDate: "2025-07-13",
      completionDate: null,
      status: "processing",
      priority: "normal",
      results: null,
      aiAnalysis: null,
      doctor: "Dr. Michael Rodriguez",
      technician: "Lab Tech Sarah"
    },
    {
      id: 'LAB003',
      patientId: 1007,
      patientName: "Mary Wilson",
      testType: "Urine Culture",
      sampleType: "Urine",
      collectionDate: "2025-07-11",
      completionDate: "2025-07-13",
      status: "completed",
      priority: "high",
      results: {
        organism: "Escherichia coli",
        growth: "Positive",
        quantity: "Moderate growth",
        resistance: {
          ampicillin: "Resistant",
          ciprofloxacin: "Sensitive",
          trimethoprim: "Resistant"
        }
      },
      aiAnalysis: {
        infectionRisk: 72,
        recommendation: "Ciprofloxacin therapy recommended",
        confidence: 88
      },
      doctor: "Dr. Emily Johnson",
      technician: "Lab Tech Lisa"
    },
    {
      id: 'LAB004',
      patientId: 1008,
      patientName: "Robert Brown",
      testType: "Sputum Culture",
      sampleType: "Sputum",
      collectionDate: "2025-07-14",
      completionDate: null,
      status: "pending",
      priority: "urgent",
      results: null,
      aiAnalysis: null,
      doctor: "Dr. Sarah Chen",
      technician: "Lab Tech Mike"
    },
    {
      id: 'LAB005',
      patientId: 1009,
      patientName: "Lisa Davis",
      testType: "Blood Culture",
      sampleType: "Blood",
      collectionDate: "2025-07-13",
      completionDate: "2025-07-15",
      status: "completed",
      priority: "normal",
      results: {
        organism: "No growth",
        growth: "Negative",
        quantity: "No organisms detected",
        resistance: {}
      },
      aiAnalysis: {
        infectionRisk: 8,
        recommendation: "No antibiotic therapy required",
        confidence: 95
      },
      doctor: "Dr. Michael Rodriguez",
      technician: "Lab Tech Sarah"
    }
  ];

  const stats = [
    { label: "Pending Tests", value: 23, icon: Clock, color: "bg-orange-500" },
    { label: "Completed Today", value: 15, icon: CheckCircle, color: "bg-green-500" },
    { label: "Critical Results", value: 3, icon: AlertTriangle, color: "bg-red-500" },
    { label: "AI Analyzed", value: 18, icon: Target, color: "bg-purple-500" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'processing': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'normal': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredResults = labResults.filter(result => {
    const matchesSearch = result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || result.testType.toLowerCase().includes(filterType.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'pending' && result.status === 'pending') ||
                      (activeTab === 'processing' && result.status === 'processing') ||
                      (activeTab === 'completed' && result.status === 'completed') ||
                      (activeTab === 'critical' && result.aiAnalysis?.infectionRisk > 70);
    return matchesSearch && matchesType && matchesTab;
  });

  const criticalResults = labResults.filter(r => r.aiAnalysis?.infectionRisk > 70);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🧪 Laboratory Integration</h1>
          <p className="text-gray-600">Advanced laboratory management with AI-powered result analysis</p>
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
              { id: 'pending', label: '⏳ Pending Tests', icon: Clock },
              { id: 'processing', label: '🔄 Processing', icon: Activity },
              { id: 'completed', label: '✅ Completed', icon: CheckCircle },
              { id: 'critical', label: '🚨 Critical Results', icon: AlertTriangle }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-xl mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search patients, tests, lab IDs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 w-80"
                />
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
              >
                <option value="all">All Test Types</option>
                <option value="blood">Blood Culture</option>
                <option value="wound">Wound Swab</option>
                <option value="urine">Urine Culture</option>
                <option value="sputum">Sputum Culture</option>
              </select>
            </div>

            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              New Test Order
            </button>
          </div>
        </div>

        {/* Lab Results */}
        <div className="space-y-6">
          {activeTab === 'critical' && (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl mb-6">
              <h3 className="text-red-800 font-bold text-lg mb-2">🚨 Critical Results Requiring Immediate Attention</h3>
              <p className="text-red-700">The following results indicate high infection risk and require urgent medical intervention.</p>
            </div>
          )}

          {filteredResults.map((result) => (
            <div key={result.id} className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    <Microscope className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{result.patientName}</h3>
                    <p className="text-gray-600">Lab ID: {result.id} • Patient ID: {result.patientId}</p>
                    <p className="text-gray-600">{result.testType} • {result.doctor}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getPriorityColor(result.priority)}`}>
                    {result.priority.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(result.status)}`}>
                    {result.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* Test Information */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 mb-3">🧪 Test Info</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Sample Type:</span> {result.sampleType}</p>
                    <p><span className="font-semibold">Collected:</span> {result.collectionDate}</p>
                    <p><span className="font-semibold">Completed:</span> {result.completionDate || 'In progress'}</p>
                    <p><span className="font-semibold">Technician:</span> {result.technician}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 mb-3">📊 Results</h4>
                  {result.results ? (
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Organism:</span> {result.results.organism}</p>
                      <p><span className="font-semibold">Growth:</span> 
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${
                          result.results.growth === 'Positive' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {result.results.growth}
                        </span>
                      </p>
                      <p><span className="font-semibold">Quantity:</span> {result.results.quantity}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Results pending...</p>
                  )}
                </div>

                {/* Antibiotic Resistance */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 mb-3">🦠 Resistance</h4>
                  {result.results?.resistance && Object.keys(result.results.resistance).length > 0 ? (
                    <div className="space-y-2">
                      {Object.entries(result.results.resistance).map(([antibiotic, sensitivity]) => (
                        <div key={antibiotic} className="flex items-center justify-between text-sm">
                          <span className="capitalize">{antibiotic}:</span>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            sensitivity === 'Resistant' ? 'bg-red-100 text-red-700' :
                            sensitivity === 'Sensitive' ? 'bg-green-100 text-green-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {sensitivity}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic text-sm">No resistance data</p>
                  )}
                </div>

                {/* AI Analysis */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 mb-3">🤖 AI Analysis</h4>
                  {result.aiAnalysis ? (
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold">Infection Risk</span>
                          <span className="font-bold">{result.aiAnalysis.infectionRisk}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${
                              result.aiAnalysis.infectionRisk > 70 ? 'bg-red-500' :
                              result.aiAnalysis.infectionRisk > 40 ? 'bg-orange-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${result.aiAnalysis.infectionRisk}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-xs">
                        <p className="font-semibold mb-1">Recommendation:</p>
                        <p className="text-gray-600">{result.aiAnalysis.recommendation}</p>
                        <p className="mt-2"><span className="font-semibold">Confidence:</span> {result.aiAnalysis.confidence}%</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic text-sm">Analysis pending...</p>
                  )}
                </div>
              </div>

              {/* Critical Alert */}
              {result.aiAnalysis?.infectionRisk > 70 && (
                <div className="mt-4 p-4 bg-red-50 rounded-xl border-l-4 border-red-500">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h5 className="font-semibold text-red-800">Critical Result - Immediate Action Required</h5>
                  </div>
                  <p className="text-red-700 text-sm mt-2">
                    High infection risk detected. Contact attending physician immediately for treatment protocol.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setSelectedResult(result)}
                  className="bg-purple-100 text-purple-700 px-4 py-2 rounded-xl hover:bg-purple-200 transition-all duration-300 flex items-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
                <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-200 transition-all duration-300 flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </button>
                <button className="bg-green-100 text-green-700 px-4 py-2 rounded-xl hover:bg-green-200 transition-all duration-300 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Send to Doctor
                </button>
              </div>
            </div>
          ))}

          {filteredResults.length === 0 && (
            <div className="text-center py-12">
              <Beaker className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Results Found</h3>
              <p className="text-gray-500">No lab results match your current filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Result Detail Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Detailed Lab Report - {selectedResult.id}</h2>
              <button
                onClick={() => setSelectedResult(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Patient & Test Information</h3>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <p><strong>Patient:</strong> {selectedResult.patientName}</p>
                    <p><strong>Patient ID:</strong> {selectedResult.patientId}</p>
                    <p><strong>Test Type:</strong> {selectedResult.testType}</p>
                    <p><strong>Sample Type:</strong> {selectedResult.sampleType}</p>
                    <p><strong>Collection Date:</strong> {selectedResult.collectionDate}</p>
                    <p><strong>Completion Date:</strong> {selectedResult.completionDate || 'In progress'}</p>
                    <p><strong>Ordering Doctor:</strong> {selectedResult.doctor}</p>
                    <p><strong>Lab Technician:</strong> {selectedResult.technician}</p>
                  </div>
                </div>

                {selectedResult.results && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Results</h3>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <p><strong>Organism Identified:</strong> {selectedResult.results.organism}</p>
                      <p><strong>Growth Status:</strong> {selectedResult.results.growth}</p>
                      <p><strong>Quantity:</strong> {selectedResult.results.quantity}</p>
                      
                      {Object.keys(selectedResult.results.resistance).length > 0 && (
                        <div>
                          <p className="font-semibold mb-2">Antibiotic Sensitivity:</p>
                          <div className="grid grid-cols-1 gap-2">
                            {Object.entries(selectedResult.results.resistance).map(([antibiotic, sensitivity]) => (
                              <div key={antibiotic} className="flex items-center justify-between p-2 bg-white rounded">
                                <span className="capitalize">{antibiotic}</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                  sensitivity === 'Resistant' ? 'bg-red-100 text-red-700' :
                                  sensitivity === 'Sensitive' ? 'bg-green-100 text-green-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {sensitivity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-6">
                {selectedResult.aiAnalysis && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Analysis Report</h3>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">Infection Risk Score</span>
                          <span className="text-2xl font-bold">{selectedResult.aiAnalysis.infectionRisk}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div 
                            className={`h-4 rounded-full ${
                              selectedResult.aiAnalysis.infectionRisk > 70 ? 'bg-red-500' :
                              selectedResult.aiAnalysis.infectionRisk > 40 ? 'bg-orange-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${selectedResult.aiAnalysis.infectionRisk}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="font-semibold mb-2">Clinical Recommendation:</p>
                          <p className="text-gray-700 bg-white p-3 rounded-lg">{selectedResult.aiAnalysis.recommendation}</p>
                        </div>
                        
                        <div>
                          <p className="font-semibold">Model Confidence: <span className="font-normal">{selectedResult.aiAnalysis.confidence}%</span></p>
                        </div>
                        
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>Note:</strong> This AI analysis is meant to assist clinical decision-making and should be used in conjunction with professional medical judgment.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-4">
              <button 
                onClick={() => setSelectedResult(null)}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all duration-300"
              >
                Close
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                Generate Full Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabsDashboard;