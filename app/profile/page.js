// app/profile/page.jsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    personalInfo: {
      name: 'আহমেদ হাসান',
      email: 'ahmed.hasan@student.shikhmok.com',
      phone: '+880 1XXX-XXXXXX',
      roll: '০১',
      class: 'নবম',
      section: 'ক',
      birthDate: '২০০৮-০৩-১৫',
      address: '১২/৩, এলিফ্যান্ট রোড, ঢাকা-১২০৫',
      joinDate: '২০২৩-০১-১৫'
    },
    academicInfo: {
      overallScore: 85,
      attendance: 92,
      completedAssignments: 24,
      totalAssignments: 28,
      classRank: 5,
      totalStudents: 45,
      streak: 15,
      subjects: [
        { name: 'গণিত', score: 88, progress: 85 },
        { name: 'ইংরেজি', score: 82, progress: 78 },
        { name: 'বিজ্ঞান', score: 85, progress: 82 },
        { name: 'বাংলা', score: 78, progress: 72 },
        { name: 'সামাজিক বিজ্ঞান', score: 80, progress: 75 }
      ]
    },
    settings: {
      notifications: {
        email: true,
        push: true,
        assignmentAlerts: true,
        resultAlerts: true,
        feedbackAlerts: true
      },
      privacy: {
        profileVisible: true,
        showResults: true,
        showAttendance: false,
        contactVisible: true
      },
      preferences: {
        language: 'bangla',
        theme: 'light',
        fontSize: 'medium',
        autoSave: true
      }
    }
  });

  const [editForm, setEditForm] = useState(profileData.personalInfo);

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    setProfileData(prev => ({
      ...prev,
      personalInfo: editForm
    }));
    setIsEditing(false);
  };

  const handleSettingChange = (category, field, value) => {
    setProfileData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [category]: {
          ...prev.settings[category],
          [field]: value
        }
      }
    }));
  };

  const ProgressBar = ({ percentage, color = 'blue', height = 'h-2' }) => (
    <div className="w-full bg-gray-200 rounded-full">
      <div 
        className={`${height} rounded-full transition-all duration-500 ${
          color === 'blue' ? 'bg-blue-500' : 
          color === 'green' ? 'bg-green-500' : 
          color === 'yellow' ? 'bg-yellow-500' : 
          'bg-purple-500'
        }`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );

  const StatCard = ({ title, value, subtitle, icon, trend, color }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${color} text-white text-2xl`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className={`flex items-center mt-3 text-sm ${trend.value > 0 ? 'text-green-600' : 'text-red-600'}`}>
          <span>{trend.value > 0 ? '↗' : '↘'}</span>
          <span className="ml-1">{Math.abs(trend.value)}% গত মাস থেকে</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mr-3"></div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  শিহ্মক
                </h1>
              </Link>
              <nav className="ml-8 flex space-x-4">
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  ড্যাশবোর্ড
                </Link>
                <Link href="/courses" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  কোর্সসমূহ
                </Link>
                <Link href="/assignments" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  অ্যাসাইনমেন্ট
                </Link>
                <Link href="/profile" className="bg-blue-100 text-blue-700 px-3 py-2 rounded-md font-medium">
                  প্রোফাইল
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                আ
              </div>
              <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors">
                ✎
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {profileData.personalInfo.name}
                  </h1>
                  <p className="text-xl text-gray-600 mb-4">
                    {profileData.personalInfo.class} শ্রেণী - বিভাগ {profileData.personalInfo.section}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      রোল: {profileData.personalInfo.roll}
                    </div>
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      📧 {profileData.personalInfo.email}
                    </div>
                    <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                      📞 {profileData.personalInfo.phone}
                    </div>
                  </div>
                </div>

                <div className="mt-4 lg:mt-0">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    {isEditing ? 'এডিট বাতিল' : 'প্রোফাইল এডিট'}
                  </button>
                </div>
              </div>

              {/* Join Date */}
              <div className="text-gray-600">
                <span className="font-medium">সদস্য since:</span> {profileData.personalInfo.joinDate}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8">
          {[
            { id: 'overview', name: 'ওভারভিউ', icon: '👤' },
            { id: 'academic', name: 'একাডেমিক', icon: '📚' },
            { id: 'settings', name: 'সেটিংস', icon: '⚙️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors flex-1 justify-center ${
                activeTab === tab.id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {isEditing ? (
              /* Edit Form */
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">প্রোফাইল এডিট করুন</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      পুরো নাম
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ইমেইল
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ফোন নম্বর
                    </label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      জন্ম তারিখ
                    </label>
                    <input
                      type="date"
                      value={editForm.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ঠিকানা
                    </label>
                    <textarea
                      value={editForm.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-8">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    বাতিল
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    সেভ করুন
                  </button>
                </div>
              </div>
            ) : (
              /* View Mode */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Personal Information */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">ব্যক্তিগত তথ্য</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-600">পুরো নাম</label>
                      <p className="text-gray-900">{profileData.personalInfo.name}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-600">ইমেইল</label>
                      <p className="text-gray-900">{profileData.personalInfo.email}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-600">ফোন নম্বর</label>
                      <p className="text-gray-900">{profileData.personalInfo.phone}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-600">জন্ম তারিখ</label>
                      <p className="text-gray-900">{profileData.personalInfo.birthDate}</p>
                    </div>
                    
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-sm font-medium text-gray-600">ঠিকানা</label>
                      <p className="text-gray-900">{profileData.personalInfo.address}</p>
                    </div>
                  </div>
                </div>

                {/* Academic Summary */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">একাডেমিক সারাংশ</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">শ্রেণী</span>
                      <span className="font-semibold">{profileData.personalInfo.class}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">বিভাগ</span>
                      <span className="font-semibold">{profileData.personalInfo.section}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">রোল নম্বর</span>
                      <span className="font-semibold">{profileData.personalInfo.roll}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">সদস্য since</span>
                      <span className="font-semibold">{profileData.personalInfo.joinDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="সামগ্রিক স্কোর" 
                value={`${profileData.academicInfo.overallScore}%`}
                icon="📈"
                color="bg-blue-500"
              />
              <StatCard 
                title="উপস্থিতি" 
                value={`${profileData.academicInfo.attendance}%`}
                icon="✅"
                color="bg-green-500"
              />
              <StatCard 
                title="ক্লাস র‍্যাংক" 
                value={`#${profileData.academicInfo.classRank}`}
                subtitle={`${profileData.academicInfo.totalStudents} জনের মধ্যে`}
                icon="🏆"
                color="bg-purple-500"
              />
              <StatCard 
                title="লার্নিং স্ট্রীক" 
                value={`${profileData.academicInfo.streak} দিন`}
                icon="🔥"
                color="bg-orange-500"
              />
            </div>
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="space-y-6">
            {/* Academic Performance */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">বিষয়ভিত্তিক পারফরম্যান্স</h2>
              
              <div className="space-y-4">
                {profileData.academicInfo.subjects.map((subject, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-900">{subject.score}%</span>
                        <span className="text-sm text-gray-600 ml-2">স্কোর</span>
                      </div>
                    </div>
                    
                    <ProgressBar percentage={subject.progress} />
                    
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>কোর্স প্রগ্রেস: {subject.progress}%</span>
                      <span>অ্যাসাইনমেন্ট: ৮/১০</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignment Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">অ্যাসাইনমেন্ট প্রগ্রেস</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>সম্পূর্ণ</span>
                      <span>{profileData.academicInfo.completedAssignments}/{profileData.academicInfo.totalAssignments}</span>
                    </div>
                    <ProgressBar 
                      percentage={(profileData.academicInfo.completedAssignments / profileData.academicInfo.totalAssignments) * 100} 
                      color="green" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{profileData.academicInfo.completedAssignments}</div>
                      <div className="text-sm text-gray-600">সম্পূর্ণ</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {profileData.academicInfo.totalAssignments - profileData.academicInfo.completedAssignments}
                      </div>
                      <div className="text-sm text-gray-600">বাকি</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">সাম্প্রতিক অর্জন</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-600">🏆</span>
                    <span className="text-sm">টপ ৫ এ রয়েছেন</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <span className="text-green-600">✅</span>
                    <span className="text-sm">১৫ দিন ধারাবাহিক এক্টিভ</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-600">📚</span>
                    <span className="text-sm">৫টি বিষয়ে ৮০%+ স্কোর</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Notification Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">নোটিফিকেশন সেটিংস</h2>
              
              <div className="space-y-4">
                {Object.entries(profileData.settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">
                        {key === 'email' && 'ইমেইল নোটিফিকেশন'}
                        {key === 'push' && 'পুশ নোটিফিকেশন'}
                        {key === 'assignmentAlerts' && 'অ্যাসাইনমেন্ট alerts'}
                        {key === 'resultAlerts' && 'ফলাফল alerts'}
                        {key === 'feedbackAlerts' && 'ফিডব্যাক alerts'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {key === 'email' && 'আপনার ইমেইলে নোটিফিকেশন পাঠানো হবে'}
                        {key === 'push' && 'ওয়েবসাইটে পুশ নোটিফিকেশন দেখানো হবে'}
                        {key === 'assignmentAlerts' && 'নতুন অ্যাসাইনমেন্ট সম্পর্কে alerts'}
                        {key === 'resultAlerts' && 'ফলাফল প্রকাশিত হলে alerts'}
                        {key === 'feedbackAlerts' && 'শিক্ষকের ফিডব্যাক পাওয়া গেলে alerts'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('notifications', key, !value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">প্রাইভেসি সেটিংস</h2>
              
              <div className="space-y-4">
                {Object.entries(profileData.settings.privacy).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">
                        {key === 'profileVisible' && 'প্রোফাইল দৃশ্যমান'}
                        {key === 'showResults' && 'ফলাফল দেখান'}
                        {key === 'showAttendance' && 'উপস্থিতি দেখান'}
                        {key === 'contactVisible' && 'কন্টাক্ট তথ্য দেখান'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {key === 'profileVisible' && 'অন্যান্য শিক্ষার্থীরা আপনার প্রোফাইল দেখতে পারবে'}
                        {key === 'showResults' && 'আপনার ফলাফল অন্যরা দেখতে পারবে'}
                        {key === 'showAttendance' && 'আপনার উপস্থিতির হার দেখানো হবে'}
                        {key === 'contactVisible' && 'আপনার কন্টাক্ট তথ্য দেখানো হবে'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('privacy', key, !value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">পছন্দসমূহ</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ভাষা
                  </label>
                  <select
                    value={profileData.settings.preferences.language}
                    onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="bangla">বাংলা</option>
                    <option value="english">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    থিম
                  </label>
                  <select
                    value={profileData.settings.preferences.theme}
                    onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="light">লাইট</option>
                    <option value="dark">ডার্ক</option>
                    <option value="auto">অটো</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ফন্ট সাইজ
                  </label>
                  <select
                    value={profileData.settings.preferences.fontSize}
                    onChange={(e) => handleSettingChange('preferences', 'fontSize', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="small">ছোট</option>
                    <option value="medium">মাধ্যমিক</option>
                    <option value="large">বড়</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">অটো সেভ</p>
                    <p className="text-sm text-gray-600">অটোমেটিকভাবে কাজগুলো সেভ হবে</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('preferences', 'autoSave', !profileData.settings.preferences.autoSave)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      profileData.settings.preferences.autoSave ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        profileData.settings.preferences.autoSave ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-200">
              <h2 className="text-xl font-semibold text-red-900 mb-4">ডেঞ্জার জোন</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">অ্যাকাউন্ট ডিলিট</p>
                    <p className="text-sm text-gray-600">আপনার অ্যাকাউন্ট স্থায়ীভাবে ডিলিট হয়ে যাবে</p>
                  </div>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    অ্যাকাউন্ট ডিলিট
                  </button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">ডেটা এক্সপোর্ট</p>
                    <p className="text-sm text-gray-600">আপনার সকল ডেটা ডাউনলোড করুন</p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    ডেটা এক্সপোর্ট
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;