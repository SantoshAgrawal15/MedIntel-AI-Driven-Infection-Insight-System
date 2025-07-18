'use client';
import React, { useState, useEffect } from 'react';
import { Heart, Award, Users, Clock, Star, MapPin, Phone, Mail, Shield, Zap, Brain, Target } from 'lucide-react';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [counters, setCounters] = useState({
    patients: 0,
    surgeries: 0,
    doctors: 0,
    years: 0
  });

  // Animated counters
  useEffect(() => {
    const targets = { patients: 50000, surgeries: 25000, doctors: 150, years: 25 };
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = duration / steps;

    const timer = setInterval(() => {
      setCounters(prev => {
        const newCounters = {};
        let allComplete = true;

        Object.keys(targets).forEach(key => {
          const target = targets[key];
          const current = prev[key];
          const step = target / steps;
          
          if (current < target) {
            newCounters[key] = Math.min(current + step, target);
            allComplete = false;
          } else {
            newCounters[key] = target;
          }
        });

        if (allComplete) clearInterval(timer);
        return newCounters;
      });
    }, increment);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: Users, label: 'Patients Treated', value: Math.floor(counters.patients), suffix: '+' },
    { icon: Heart, label: 'Successful Surgeries', value: Math.floor(counters.surgeries), suffix: '+' },
    { icon: Award, label: 'Expert Doctors', value: Math.floor(counters.doctors), suffix: '+' },
    { icon: Clock, label: 'Years of Excellence', value: Math.floor(counters.years), suffix: '' }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      specialty: "Surgical Oncology",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      bio: "Leading surgical innovations with 15+ years of experience",
      achievements: ["Harvard Medical Graduate", "200+ Publications", "AI Surgery Pioneer"]
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Head of Orthopedics",
      specialty: "Orthopedic Surgery",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      bio: "Revolutionizing joint replacement with robotic assistance",
      achievements: ["Johns Hopkins Graduate", "Robotic Surgery Expert", "500+ Joint Replacements/Year"]
    },
    {
      name: "Dr. Emily Johnson",
      role: "Director of Innovation",
      specialty: "AI & Medical Technology",
      image: "https://images.unsplash.com/photo-1594824721432-e2b0e6cd25c8?w=400&h=400&fit=crop&crop=face",
      bio: "Pioneering AI-driven surgical site infection prevention",
      achievements: ["MIT Medical AI Graduate", "20+ AI Patents", "TED Speaker"]
    },
    {
      name: "Dr. James Wilson",
      role: "Emergency Medicine Chief",
      specialty: "Emergency & Trauma",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      bio: "Expert in critical care and emergency surgical procedures",
      achievements: ["Stanford Medical Graduate", "Trauma Level 1 Certified", "Emergency Medicine Board"]
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Every patient receives personalized, empathetic treatment with the highest standards of medical ethics."
    },
    {
      icon: Brain,
      title: "AI-Powered Medicine",
      description: "Leveraging cutting-edge artificial intelligence to predict, prevent, and treat surgical complications."
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Advanced infection prevention protocols and real-time monitoring ensure the safest surgical outcomes."
    },
    {
      icon: Zap,
      title: "Innovation Excellence",
      description: "Constantly advancing medical technology and surgical techniques to deliver world-class healthcare."
    },
    {
      icon: Target,
      title: "Precision Medicine",
      description: "Tailored treatment plans using data-driven insights for optimal patient outcomes."
    },
    {
      icon: Users,
      title: "Collaborative Team",
      description: "Multidisciplinary approach bringing together the best minds in medicine, technology, and patient care."
    }
  ];

  const milestones = [
    { year: "1999", event: "Hospital Foundation", description: "Established as a leading surgical center" },
    { year: "2005", event: "First Robotic Surgery", description: "Pioneered minimally invasive procedures" },
    { year: "2015", event: "AI Research Lab", description: "Launched cutting-edge medical AI research" },
    { year: "2020", event: "COVID-19 Response", description: "Led pandemic response with innovative protocols" },
    { year: "2023", event: "SSI Prevention AI", description: "Deployed world's first AI-powered infection prediction system" },
    { year: "2025", event: "Global Recognition", description: "Awarded Best Innovation in Healthcare Technology" }
  ];

  const certifications = [
    { name: "Joint Commission Accredited", icon: "🏆" },
    { name: "Magnet Hospital Status", icon: "🌟" },
    { name: "ISO 9001 Certified", icon: "✅" },
    { name: "AI Ethics Certified", icon: "🤖" },
    { name: "Green Hospital Initiative", icon: "🌱" },
    { name: "Patient Safety Excellence", icon: "🛡️" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">AstroPlasty</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Revolutionizing healthcare through AI-powered surgical innovation, compassionate care, and cutting-edge technology
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-teal-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
                Our Mission
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300 transform hover:scale-105">
                Meet Our Team
              </button>
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-yellow-300 opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-green-300 opacity-15 rounded-full animate-ping"></div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-2 mb-8">
          <div className="flex flex-wrap justify-center space-x-2">
            {[
              { id: 'overview', label: '🏥 Overview', icon: Heart },
              { id: 'team', label: '👨‍⚕️ Our Team', icon: Users },
              { id: 'values', label: '💎 Our Values', icon: Star },
              { id: 'history', label: '📅 Our Journey', icon: Clock },
              { id: 'contact', label: '📞 Contact Us', icon: Phone }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-fade-in">
            
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <stat.icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-3xl p-8 text-white shadow-2xl">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-xl leading-relaxed mb-8">
                  To revolutionize surgical care through artificial intelligence, preventing infections before they occur, 
                  and ensuring every patient receives the safest, most effective treatment possible. We combine cutting-edge 
                  technology with compassionate human care to create the future of medicine.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white bg-opacity-20 rounded-xl p-4">
                    <Brain className="w-8 h-8 mx-auto mb-2" />
                    <h3 className="font-semibold">AI-Powered</h3>
                    <p className="text-sm">Advanced machine learning for better outcomes</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-xl p-4">
                    <Heart className="w-8 h-8 mx-auto mb-2" />
                    <h3 className="font-semibold">Patient-Centered</h3>
                    <p className="text-sm">Every decision prioritizes patient wellbeing</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-xl p-4">
                    <Zap className="w-8 h-8 mx-auto mb-2" />
                    <h3 className="font-semibold">Innovation-Driven</h3>
                    <p className="text-sm">Constantly pushing medical boundaries</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Accreditations & Certifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-center p-4 rounded-xl hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                    <div className="text-4xl mb-2">{cert.icon}</div>
                    <div className="font-semibold text-gray-800">{cert.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Meet Our Expert Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-600 to-transparent opacity-0 group-hover:opacity-30 rounded-full transition-opacity duration-300"></div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                    <p className="text-teal-600 font-semibold mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{member.specialty}</p>
                    <p className="text-gray-700 text-sm mb-4">{member.bio}</p>
                    <div className="space-y-1">
                      {member.achievements.map((achievement, i) => (
                        <div key={i} className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full inline-block mr-1">
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Values Tab */}
        {activeTab === 'values' && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-teal-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Journey Through Time</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-teal-500 to-blue-600 rounded-full"></div>
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                      <div className="text-2xl font-bold text-teal-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{milestone.event}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Get In Touch</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Information */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-3xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <MapPin className="w-6 h-6 mr-4" />
                      <div>
                        <div className="font-semibold">Main Hospital</div>
                        <div className="text-blue-100">123 Medical Center Drive, Healthcare City, HC 12345</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-6 h-6 mr-4" />
                      <div>
                        <div className="font-semibold">24/7 Emergency</div>
                        <div className="text-blue-100">+1 (555) 123-4567</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-6 h-6 mr-4" />
                      <div>
                        <div className="font-semibold">General Inquiries</div>
                        <div className="text-blue-100">info@astroplasty.com</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-6 h-6 mr-4" />
                      <div>
                        <div className="font-semibold">Visiting Hours</div>
                        <div className="text-blue-100">Daily: 8:00 AM - 8:00 PM</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Form */}
                <div className="bg-white rounded-3xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Message</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300"
                      />
                    </div>
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300"
                    ></textarea>
                    <button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Find Us</h3>
                <div className="bg-gradient-to-br from-teal-100 to-blue-100 rounded-2xl h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                    <div className="text-xl font-semibold text-gray-800 mb-2">Interactive Map</div>
                    <div className="text-gray-600">Hospital location and directions</div>
                  </div>
                </div>
                
                {/* Departments List */}
                <div className="mt-8">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Our Departments</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {[
                      "Emergency Medicine", "Surgical Services", "Cardiology", "Orthopedics",
                      "Neurology", "Pediatrics", "Radiology", "Laboratory Services"
                    ].map((dept, index) => (
                      <div key={index} className="bg-teal-50 text-teal-700 px-3 py-2 rounded-lg text-center hover:bg-teal-100 transition-colors duration-200 cursor-pointer">
                        {dept}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUs;