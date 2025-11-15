// app/guardian/dashboard/page.jsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const GuardianDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState(0);
  
  const guardianData = {
    guardian: {
      name: 'মো: করিম আহমেদ',
      relationship: 'পিতা',
      phone: '+880 1XXX-XXXXXX',
      email: 'karim.ahmed@email.com'
    },
    students: [
      {
        id: 1,
        name: 'আহমেদ হাসান',
        class: 'নবম',
        roll: '০১',
        avatar: 'আ',
        overallScore: 85,
        attendance: 92,
        recentActivities: [
          { type: 'assignment', title: 'গণিত অ্যাসাইনমেন্ট', score: '১৮/২০', date: 'আজ' },
          { type: 'attendance', title: 'ক্লাস উপস্থিতি', status: 'উপস্থিত', date: 'আজ' },
          { type: 'quiz', title: 'ইংরেজি কুইজ', score: '১৬/২০', date: 'গতকাল' }
        ],
        upcomingDeadlines: [
          { title: 'বিজ্ঞান প্রজেক্ট', dueDate: 'আগামীকাল', subject: 'বিজ্ঞান' },
          { title: 'বাংলা রচনা', dueDate: '৩ দিন পর', subject: 'বাংলা' }
        ]
      },
      {
        id: 2,
        name: 'ফাতিমা হাসান',
        class: 'সপ্তম',
        roll: '১২',
        avatar: 'ফ',
        overallScore: 78,
        attendance: 88,
        recentActivities: [
          { type: 'assignment', title: 'গণিত সমস্যা', score: '১৫/২০', date: 'গতকাল' },
          { type: 'quiz', title: 'বিজ্ঞান কুইজ', score: '১৪/২০', date: '২ দিন আগে' }
        ],
        upcomingDeadlines: [
          { title: 'ইংরেজি প্রজেক্ট', dueDate: '৪ দিন পর', subject: 'ইংরেজি' }
        ]
      }
    ],
    notifications: [
      {
        id: 1,
        type: 'attendance',
        title: 'উপস্থিতি সতর্কতা',
        message: 'আহমেদের গত সপ্তাহে ২টি ক্লাস মিস হয়েছে',
        date: '২০২৪-০১-১৮',
        priority: 'high'
      },
      {
        id: 2,
        type: 'result',
        title: 'নতুন ফলাফল',
        message: 'ফাতিমার গণিত অ্যাসাইনমেন্টের ফলাফল প্রকাশিত',
        date: '২০২৪-০১-১৭',
        priority: 'medium'
      }
    ]
  };

  const currentStudent = guardianData.students[selectedStudent];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mr-3"></div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  শিহ্মক - অভিভাবক
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">{guardianData.guardian.name}</p>
                <p className="text-sm text-gray-600">অভিভাবক</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                ক
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">সন্তান নির্বাচন করুন</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guardianData.students.map((student, index) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(index)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedStudent === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {student.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.class} শ্রেণী - রোল: {student.roll}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Student Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{currentStudent.overallScore}%</div>
                <div className="text-gray-600">সামগ্রিক স্কোর</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{currentStudent.attendance}%</div>
                <div className="text-gray-600">উপস্থিতি</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {currentStudent.upcomingDeadlines.length}
                </div>
                <div className="text-gray-600">আসন্ন অ্যাসাইনমেন্ট</div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">সাম্প্রতিক কার্যক্রম</h3>
              <div className="space-y-3">
                {currentStudent.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        activity.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'quiz' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {activity.type === 'assignment' ? '📝' : 
                         activity.type === 'quiz' ? '🧠' : '✅'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                    </div>
                    {activity.score && (
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{activity.score}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">আসন্ন ডেডলাইন</h3>
              <div className="space-y-3">
                {currentStudent.upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div>
                      <p className="font-medium text-gray-900">{deadline.title}</p>
                      <p className="text-sm text-gray-600">{deadline.subject}</p>
                    </div>
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                      {deadline.dueDate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Notifications & Quick Actions */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">সতর্কতা ও নোটিশ</h3>
              <div className="space-y-3">
                {guardianData.notifications.map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg border ${
                    notification.priority === 'high' 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-start space-x-2">
                      <span className={notification.priority === 'high' ? 'text-red-600' : 'text-blue-600'}>
                        {notification.priority === 'high' ? '⚠️' : 'ℹ️'}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">{notification.title}</p>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">দ্রুত একশন</h3>
              <div className="space-y-3">
                <Link 
                  href={`/guardian/attendance/${currentStudent.id}`}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-blue-600">📊</span>
                  <span>উপস্থিতি রিপোর্ট</span>
                </Link>
                <Link 
                  href={`/guardian/results/${currentStudent.id}`}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-green-600">📈</span>
                  <span>ফলাফল দেখুন</span>
                </Link>
                <Link 
                  href={`/guardian/schedule/${currentStudent.id}`}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-purple-600">📅</span>
                  <span>ক্লাস সিডিউল</span>
                </Link>
                <button className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors w-full">
                  <span className="text-orange-600">💬</span>
                  <span>শিক্ষকের সাথে কথা বলুন</span>
                </button>
              </div>
            </div>

            {/* Contact Teacher */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-3">শিক্ষকের সাথে যোগাযোগ</h3>
              <p className="text-blue-100 mb-4">সন্তানের performance নিয়ে আলোচনা করুন</p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors w-full">
                মেসেজ পাঠান
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuardianDashboard;