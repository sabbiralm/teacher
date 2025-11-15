// app/dashboard/page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const DashboardPage = () => {
  const [userRole, setUserRole] = useState('student');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Comprehensive mock data
  const studentData = {
    profile: {
      name: 'আহমেদ হাসান',
      class: 'নবম শ্রেণী',
      roll: '০১',
      avatar: '/avatar.png'
    },
    overview: {
      totalCourses: 8,
      completedAssignments: 24,
      pendingAssignments: 3,
      attendancePercentage: 92,
      averageScore: 85,
      rank: 5,
      totalStudents: 45
    },
    courses: [
      { id: 1, name: 'গণিত', progress: 85, teacher: 'মো: রহিম', nextClass: 'আজ ১০:০০ AM', color: 'blue' },
      { id: 2, name: 'ইংরেজি', progress: 72, teacher: 'মিসেস জাহান', nextClass: 'আজ ২:০০ PM', color: 'green' },
      { id: 3, name: 'বিজ্ঞান', progress: 90, teacher: 'ড. আলম', nextClass: 'কাল ৯:০০ AM', color: 'purple' },
      { id: 4, name: 'বাংলা', progress: 68, teacher: 'মিসেস চৌধুরী', nextClass: 'কাল ১১:০০ AM', color: 'orange' }
    ],
    recentActivities: [
      { id: 1, type: 'assignment', subject: 'গণিত', action: 'অ্যাসাইনমেন্ট জমা দিয়েছেন', score: 18, maxScore: 20, time: '২ ঘন্টা আগে', icon: '📝' },
      { id: 2, type: 'attendance', subject: 'ইংরেজি', action: 'ক্লাসে উপস্থিত ছিলেন', time: '১ দিন আগে', icon: '✅' },
      { id: 3, type: 'quiz', subject: 'বিজ্ঞান', action: 'কুইজ সম্পন্ন করেছেন', score: 16, maxScore: 20, time: '২ দিন আগে', icon: '🧪' },
      { id: 4, type: 'achievement', subject: 'গণিত', action: 'টপ পারফর্মার অ্যাওয়ার্ড পেয়েছেন', time: '৩ দিন আগে', icon: '🏆' }
    ],
    upcomingDeadlines: [
      { id: 1, title: 'বীজগণিত অ্যাসাইনমেন্ট', subject: 'গণিত', dueDate: 'আগামীকাল', priority: 'high' },
      { id: 2, title: 'ইংরেজি প্রবন্ধ', subject: 'ইংরেজি', dueDate: '৩ দিন পর', priority: 'medium' },
      { id: 3, title: 'বিজ্ঞান প্রজেক্ট', subject: 'বিজ্ঞান', dueDate: '১ সপ্তাহ পর', priority: 'low' }
    ],
    performance: {
      math: { score: 88, trend: 'up' },
      english: { score: 75, trend: 'up' },
      science: { score: 92, trend: 'stable' },
      bangla: { score: 70, trend: 'down' }
    }
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">ড্যাশবোর্ড লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  const ProgressBar = ({ percentage, color }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );

  const StatCard = ({ title, value, subtitle, icon, trend, color }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${color} text-white`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
      {trend && (
        <div className={`flex items-center mt-3 text-sm ${trend.value > 0 ? 'text-green-600' : 'text-red-600'}`}>
          <span>{trend.value > 0 ? '↗' : '↘'}</span>
          <span className="ml-1">{Math.abs(trend.value)}% গত সপ্তাহ থেকে</span>
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
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mr-3"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                শিহ্মক
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">{studentData.profile.name}</p>
                <p className="text-sm text-gray-600">{studentData.profile.class} • রোল: {studentData.profile.roll}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {studentData.profile.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            আসসালামু আলাইকুম, {studentData.profile.name}!
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            আপনার আজকের শিক্ষা যাত্রা শুরু হোক
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="মোট কোর্স" 
            value={studentData.overview.totalCourses} 
            icon="📚"
            color="bg-blue-500"
            trend={{ value: 2 }}
          />
          <StatCard 
            title="উপস্থিতি" 
            value={`${studentData.overview.attendancePercentage}%`}
            subtitle="এই মাসে"
            icon="✅"
            color="bg-green-500"
          />
          <StatCard 
            title="গড় স্কোর" 
            value={studentData.overview.averageScore}
            subtitle="সকল বিষয়ে"
            icon="📊"
            color="bg-purple-500"
            trend={{ value: 5 }}
          />
          <StatCard 
            title="ক্লাস র‍্যাংক" 
            value={`#${studentData.overview.rank}`}
            subtitle={`${studentData.overview.totalStudents} জনের মধ্যে`}
            icon="🏆"
            color="bg-orange-500"
            trend={{ value: 3 }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Courses & Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Courses Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">কোর্স প্রোগ্রেস</h2>
                <Link href="/courses" className="text-blue-600 hover:text-blue-700 font-medium">
                  সব দেখুন
                </Link>
              </div>
              <div className="space-y-4">
                {studentData.courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-${course.color}-100 rounded-lg flex items-center justify-center`}>
                        <span className="text-2xl">
                          {course.name === 'গণিত' && '➗'}
                          {course.name === 'ইংরেজি' && '🔤'}
                          {course.name === 'বিজ্ঞান' && '🔬'}
                          {course.name === 'বাংলা' && '📖'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{course.name}</h3>
                        <p className="text-sm text-gray-600">{course.teacher}</p>
                        <p className="text-xs text-gray-500">{course.nextClass}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-600">{course.progress}%</span>
                        <div className="w-24">
                          <ProgressBar percentage={course.progress} color={`bg-${course.color}-500`} />
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        ক্লাসে যান
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">বিষয়ভিত্তিক পারফরম্যান্স</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(studentData.performance).map(([subject, data]) => (
                  <div key={subject} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900 capitalize">{subject}</span>
                      <span className={`text-sm ${
                        data.trend === 'up' ? 'text-green-600' : 
                        data.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {data.trend === 'up' ? '↑' : data.trend === 'down' ? '↓' : '→'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            data.score >= 80 ? 'bg-green-500' : 
                            data.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${data.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{data.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Activities & Deadlines */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">সাম্প্রতিক কার্যক্রম</h2>
              <div className="space-y-4">
                {studentData.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-2xl mt-1">{activity.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.subject}</span> - {activity.action}
                      </p>
                      {activity.score && (
                        <p className="text-xs text-gray-600 mt-1">
                          স্কোর: {activity.score}/{activity.maxScore}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">আসন্ন ডেডলাইন</h2>
              <div className="space-y-3">
                {studentData.upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className={`p-3 rounded-lg border-l-4 ${
                    deadline.priority === 'high' ? 'border-red-500 bg-red-50' :
                    deadline.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                    'border-green-500 bg-green-50'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{deadline.title}</h4>
                        <p className="text-sm text-gray-600">{deadline.subject}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        deadline.priority === 'high' ? 'bg-red-100 text-red-800' :
                        deadline.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {deadline.dueDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
              <h2 className="text-xl font-bold mb-4">দ্রুত এক্সেস</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/courses" className="bg-white/20 hover:bg-white/30 p-3 rounded-lg text-center transition-colors">
                  <div className="text-2xl mb-1">📚</div>
                  <span className="text-sm">কোর্স</span>
                </Link>
                <Link href="/attendance" className="bg-white/20 hover:bg-white/30 p-3 rounded-lg text-center transition-colors">
                  <div className="text-2xl mb-1">✅</div>
                  <span className="text-sm">উপস্থিতি</span>
                </Link>
                <Link href="/assignments" className="bg-white/20 hover:bg-white/30 p-3 rounded-lg text-center transition-colors">
                  <div className="text-2xl mb-1">📝</div>
                  <span className="text-sm">অ্যাসাইনমেন্ট</span>
                </Link>
                <Link href="/quiz" className="bg-white/20 hover:bg-white/30 p-3 rounded-lg text-center transition-colors">
                  <div className="text-2xl mb-1">🧠</div>
                  <span className="text-sm">কুইজ</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;