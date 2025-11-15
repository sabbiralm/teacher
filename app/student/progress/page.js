// app/student/progress/page.jsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const StudentProgressPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('monthly');

  // Mock student progress data
  const progressData = {
    student: {
      name: 'আহমেদ হাসান',
      roll: '০১',
      class: 'নবম',
      avatar: 'আ',
      joinDate: '২০২৩-০১-১৫'
    },
    overview: {
      overallScore: 85,
      attendance: 92,
      completedAssignments: 24,
      totalAssignments: 28,
      classRank: 5,
      totalStudents: 45,
      improvement: 12,
      streak: 15
    },
    subjectPerformance: [
      {
        subject: 'গণিত',
        score: 88,
        trend: 'up',
        assignments: 8,
        completed: 7,
        weakAreas: ['ত্রিকোণমিতি', 'জ্যামিতির উপপাদ্য'],
        strongAreas: ['বীজগণিত', 'সমীকরণ']
      },
      {
        subject: 'ইংরেজি',
        score: 82,
        trend: 'up',
        assignments: 6,
        completed: 6,
        weakAreas: ['Grammar Rules', 'Essay Writing'],
        strongAreas: ['Vocabulary', 'Reading Comprehension']
      },
      {
        subject: 'বিজ্ঞান',
        score: 85,
        trend: 'stable',
        assignments: 7,
        completed: 6,
        weakAreas: ['রসায়নের সূত্র', 'জীববিজ্ঞান টার্মিনোলজি'],
        strongAreas: ['পদার্থবিজ্ঞান', 'পরীক্ষণ']
      },
      {
        subject: 'বাংলা',
        score: 78,
        trend: 'down',
        assignments: 7,
        completed: 5,
        weakAreas: ['রচনা লেখা', 'ব্যাকরণ'],
        strongAreas: ['কবিতা বিশ্লেষণ', 'গদ্য']
      }
    ],
    weakAreas: [
      {
        topic: 'ত্রিকোণমিতি',
        subject: 'গণিত',
        currentScore: 45,
        targetScore: 80,
        improvementTips: [
          'মৌলিক সূত্রগুলো বারবার পড়ুন',
          'প্র্যাকটিস সমস্যা বেশি বেশি সমাধান করুন',
          'ত্রিকোণমিতির প্রয়োগ সমস্যা বুঝুন'
        ]
      },
      {
        topic: 'Grammar Rules',
        subject: 'ইংরেজি',
        currentScore: 50,
        targetScore: 85,
        improvementTips: [
          'দিনে ১০টি নতুন Grammar rule শিখুন',
          'ইংরেজি newspaper পড়ার অভ্যাস করুন',
          'Grammar exercise নিয়মিত করুন'
        ]
      },
      {
        topic: 'রচনা লেখা',
        subject: 'বাংলা',
        currentScore: 40,
        targetScore: 75,
        improvementTips: [
          'প্রতিদিন একটি করে রচনা লিখুন',
          'ভালো রচনা পড়ে স্টাইল observe করুন',
          'শিক্ষকের feedback অনুযায়ী improve করুন'
        ]
      }
    ],
    progressTrend: [
      { month: 'জানু', score: 73 },
      { month: 'ফেব্রু', score: 76 },
      { month: 'মার্চ', score: 78 },
      { month: 'এপ্রিল', score: 80 },
      { month: 'মে', score: 82 },
      { month: 'জুন', score: 85 }
    ],
    recentActivities: [
      {
        id: 1,
        type: 'assignment',
        title: 'বীজগণিত অ্যাসাইনমেন্ট',
        subject: 'গণিত',
        score: 18,
        maxScore: 20,
        date: '২০২৪-০১-১৮',
        status: 'completed'
      },
      {
        id: 2,
        type: 'quiz',
        title: 'ইংরেজি Grammar কুইজ',
        subject: 'ইংরেজি',
        score: 16,
        maxScore: 20,
        date: '২০২৪-০১-১৬',
        status: 'completed'
      },
      {
        id: 3,
        type: 'test',
        title: 'ত্রৈমাসিক পরীক্ষা',
        subject: 'সকল বিষয়',
        score: 82,
        maxScore: 100,
        date: '২০২৪-০১-১০',
        status: 'completed'
      },
      {
        id: 4,
        type: 'assignment',
        title: 'বাংলা রচনা',
        subject: 'বাংলা',
        score: null,
        maxScore: 15,
        date: '২০২৪-০১-২০',
        status: 'pending'
      }
    ],
    improvementPlan: {
      dailyGoals: [
        '২ ঘন্টা গণিত অনুশীলন',
        '৩০ মিনিট ইংরেজি পড়া',
        '১টি বাংলা রচনা লেখা'
      ],
      weeklyTargets: [
        'সকল অ্যাসাইনমেন্ট সময়মতো জমা দেওয়া',
        'কমপক্ষে ৫টি কুইজ দেওয়া',
        'দুর্বল বিষয়গুলো রিভিশন দেওয়া'
      ],
      monthlyGoals: [
        'সকল বিষয়ে ৮০%+ স্কোর অর্জন',
        'ক্লাস র‍্যাংক ৫-এর মধ্যে রাখা',
        'নিয়মিত উপস্থিতি বজায় রাখা'
      ]
    }
  };

  const timeRanges = [
    { value: 'weekly', label: 'সাপ্তাহিক' },
    { value: 'monthly', label: 'মাসিক' },
    { value: 'quarterly', label: 'ত্রৈমাসিক' },
    { value: 'yearly', label: 'বার্ষিক' }
  ];

  const ProgressBar = ({ percentage, color = 'blue', height = 'h-3', showLabel = true }) => (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>প্রগ্রেস</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${height}`}>
        <div 
          className={`${height} rounded-full transition-all duration-500 ${
            color === 'blue' ? 'bg-blue-500' : 
            color === 'green' ? 'bg-green-500' : 
            color === 'red' ? 'bg-red-500' : 
            'bg-yellow-500'
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
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

  const SubjectCard = ({ subject }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{subject.subject}</h3>
          <p className="text-sm text-gray-600">
            {subject.completed}/{subject.assignments} অ্যাসাইনমেন্ট completed
          </p>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${
            subject.score >= 80 ? 'text-green-600' :
            subject.score >= 60 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {subject.score}%
          </div>
          <div className={`flex items-center text-sm ${
            subject.trend === 'up' ? 'text-green-600' :
            subject.trend === 'down' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {subject.trend === 'up' ? '↗ উন্নতিশীল' : 
             subject.trend === 'down' ? '↘ অবনতিশীল' : '→ স্থিতিশীল'}
          </div>
        </div>
      </div>

      <ProgressBar percentage={subject.score} />

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">💪 শক্তিশালী দিক</h4>
          <ul className="text-xs text-green-600 space-y-1">
            {subject.strongAreas.map((area, index) => (
              <li key={index}>• {area}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">⚠️ উন্নয়ন প্রয়োজন</h4>
          <ul className="text-xs text-red-600 space-y-1">
            {subject.weakAreas.map((area, index) => (
              <li key={index}>• {area}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const WeakAreaCard = ({ area }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-200 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{area.topic}</h3>
          <p className="text-sm text-gray-600">{area.subject}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-red-600">{area.currentScore}%</div>
          <div className="text-sm text-gray-600">লক্ষ্য: {area.targetScore}%</div>
        </div>
      </div>

      <ProgressBar percentage={area.currentScore} color="red" />

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">💡 উন্নতির পরামর্শ</h4>
        <ul className="space-y-2">
          {area.improvementTips.map((tip, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
              <span className="text-green-600 mt-1">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors">
        অনুশীলন শুরু করুন
      </button>
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
                <Link href="/student/progress" className="bg-blue-100 text-blue-700 px-3 py-2 rounded-md font-medium">
                  আমার প্রগ্রেস
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">{progressData.student.name}</p>
                <p className="text-sm text-gray-600">{progressData.student.class} • রোল: {progressData.student.roll}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {progressData.student.avatar}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">আমার অগ্রগতি</h1>
            <p className="text-xl text-gray-600">আপনার learning journey এবং performance analysis</p>
          </div>
          
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8">
          {[
            { id: 'overview', name: 'ওভারভিউ', icon: '📊' },
            { id: 'subjects', name: 'বিষয়ভিত্তিক', icon: '📚' },
            { id: 'weakareas', name: 'দুর্বল দিক', icon: '🎯' },
            { id: 'improvement', name: 'উন্নয়ন পরিকল্পনা', icon: '💡' }
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
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="সামগ্রিক স্কোর" 
                value={`${progressData.overview.overallScore}%`}
                icon="📈"
                color="bg-blue-500"
                trend={{ value: progressData.overview.improvement }}
              />
              <StatCard 
                title="উপস্থিতি" 
                value={`${progressData.overview.attendance}%`}
                subtitle="এই মাসে"
                icon="✅"
                color="bg-green-500"
              />
              <StatCard 
                title="ক্লাস র‍্যাংক" 
                value={`#${progressData.overview.classRank}`}
                subtitle={`${progressData.overview.totalStudents} জনের মধ্যে`}
                icon="🏆"
                color="bg-purple-500"
              />
              <StatCard 
                title="লার্নিং স্ট্রীক" 
                value={`${progressData.overview.streak} দিন`}
                subtitle="ধারাবাহিকভাবে"
                icon="🔥"
                color="bg-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Progress Trend */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 অগ্রগতি ট্রেন্ড</h3>
                <div className="flex items-end space-x-2 h-32">
                  {progressData.progressTrend.map((month, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t transition-all hover:from-blue-600 hover:to-blue-400"
                        style={{ height: `${(month.score / 100) * 80}%` }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-2">{month.month}</span>
                      <span className="text-xs font-medium text-gray-700">{month.score}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🔄 সাম্প্রতিক কার্যক্রম</h3>
                <div className="space-y-3">
                  {progressData.recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          activity.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                          activity.type === 'quiz' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {activity.type === 'assignment' ? '📝' : 
                           activity.type === 'quiz' ? '🧠' : '📊'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.subject} • {activity.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.score !== null ? (
                          <div className={`font-bold ${
                            activity.score >= activity.maxScore * 0.8 ? 'text-green-600' :
                            activity.score >= activity.maxScore * 0.6 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {activity.score}/{activity.maxScore}
                          </div>
                        ) : (
                          <div className="text-orange-600 font-medium">Pending</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {progressData.subjectPerformance.map((subject, index) => (
              <SubjectCard key={index} subject={subject} />
            ))}
          </div>
        )}

        {activeTab === 'weakareas' && (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center">
                <span className="mr-2">💡</span>
                উন্নয়নের সুযোগ
              </h3>
              <p className="text-yellow-700">
                এই বিষয়গুলোতে আপনার আরও অনুশীলন প্রয়োজন। নিচের পরামর্শগুলো follow করুন এবং regular practice করুন।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {progressData.weakAreas.map((area, index) => (
                <WeakAreaCard key={index} area={area} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'improvement' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Daily Goals */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">🌅</span>
                দৈনিক লক্ষ্য
              </h3>
              <div className="space-y-3">
                {progressData.improvementPlan.dailyGoals.map((goal, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <input type="checkbox" className="text-green-600 rounded" />
                    <span className="text-gray-700">{goal}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                প্রতিদিন সকালে লক্ষ্য সেট করুন
              </div>
            </div>

            {/* Weekly Targets */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📅</span>
                সাপ্তাহিক লক্ষ্য
              </h3>
              <div className="space-y-3">
                {progressData.improvementPlan.weeklyTargets.map((target, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <input type="checkbox" className="text-blue-600 rounded" />
                    <span className="text-gray-700">{target}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                সপ্তাহের শেষে রিভিউ করুন
              </div>
            </div>

            {/* Monthly Goals */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">🎯</span>
                মাসিক লক্ষ্য
              </h3>
              <div className="space-y-3">
                {progressData.improvementPlan.monthlyGoals.map((goal, index) => (
                  <div key={index} className="p-3 bg-purple-50 rounded-lg">
                    <span className="text-gray-700">{goal}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                মাসের শেষে achievement চেক করুন
              </div>
            </div>

            {/* Improvement Tips */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🚀 সাফল্যের টিপস</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
                  <div className="text-2xl mb-2">⏰</div>
                  <h4 className="font-semibold text-gray-900 mb-2">নিয়মিত পড়ুন</h4>
                  <p className="text-sm text-gray-600">প্রতিদিন নির্দিষ্ট সময় পড়ার অভ্যাস করুন</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl">
                  <div className="text-2xl mb-2">📝</div>
                  <h4 className="font-semibold text-gray-900 mb-2">নোট তৈরি করুন</h4>
                  <p className="text-sm text-gray-600">গুরুত্বপূর্ণ পয়েন্টগুলো নোট করে রাখুন</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl">
                  <div className="text-2xl mb-2">🔁</div>
                  <h4 className="font-semibold text-gray-900 mb-2">রিভিশন দিন</h4>
                  <p className="text-sm text-gray-600">শেখা topics নিয়মিত রিভিশন করুন</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Motivation Quote */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 italic">
              "সাফল্য চূড়ান্ত নয়, ব্যর্থতা মারাত্মক নয়: এগিয়ে যাওয়ার সাহসই গুরুত্বপূর্ণ"
            </p>
            <p className="text-sm text-gray-500 mt-2">- উইনস্টন চার্চিল</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProgressPage;