// app/teacher/analytics/page.jsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClass, setSelectedClass] = useState('নবম');
  const [selectedSubject, setSelectedSubject] = useState('গণিত');
  const [timeRange, setTimeRange] = useState('monthly');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalStudents: 45,
      averagePerformance: 78,
      totalAssignments: 12,
      completedEvaluations: 38,
      topPerformer: {
        name: 'আহমেদ হাসান',
        score: 95,
        improvement: 12
      },
      needAttention: [
        { name: 'রফিক আহমেদ', score: 45, reason: 'নিয়মিত অনুপস্থিত' },
        { name: 'সুমাইয়া আক্তার', score: 52, reason: 'বেসিক কনসেপ্ট দুর্বল' }
      ]
    },
    classPerformance: {
      'নবম': {
        averageScore: 78,
        attendance: 92,
        assignments: 12,
        performanceTrend: [65, 70, 72, 75, 78, 80],
        subjectWise: [
          { subject: 'গণিত', average: 82, topScore: 98, lowScore: 45 },
          { subject: 'ইংরেজি', average: 75, topScore: 92, lowScore: 50 },
          { subject: 'বিজ্ঞান', average: 80, topScore: 95, lowScore: 55 },
          { subject: 'বাংলা', average: 74, topScore: 88, lowScore: 48 }
        ]
      },
      'দশম': {
        averageScore: 82,
        attendance: 94,
        assignments: 15,
        performanceTrend: [70, 74, 76, 79, 82, 85],
        subjectWise: [
          { subject: 'গণিত', average: 85, topScore: 98, lowScore: 60 },
          { subject: 'ইংরেজি', average: 78, topScore: 94, lowScore: 55 },
          { subject: 'বিজ্ঞান', average: 83, topScore: 96, lowScore: 58 },
          { subject: 'বাংলা', average: 80, topScore: 90, lowScore: 52 }
        ]
      }
    },
    questionAnalysis: {
      mostDifficult: [
        {
          id: 1,
          question: 'ত্রিকোণমিতির প্রয়োগ সমস্যা',
          subject: 'গণিত',
          correctRate: 35,
          commonMistakes: ['সূত্র ভুল প্রয়োগ', 'ক্যালকুলেশন ভুল']
        },
        {
          id: 2,
          question: 'জৈব রসায়নের বিক্রিয়া',
          subject: 'বিজ্ঞান',
          correctRate: 42,
          commonMistakes: ['সূত্র ভুল মনে করা', 'ব্যালান্স করতে না পারা']
        }
      ],
      mostEasy: [
        {
          id: 3,
          question: 'সরল সমীকরণ সমাধান',
          subject: 'গণিত',
          correctRate: 92,
          commonMistakes: ['বেসিক Arithmetic ভুল']
        },
        {
          id: 4,
          question: 'মৌলিক ব্যাকরণ',
          subject: 'বাংলা',
          correctRate: 88,
          commonMistakes: ['বানান ভুল']
        }
      ]
    },
    studentProgress: [
      {
        id: 1,
        name: 'আহমেদ হাসান',
        roll: '০১',
        overallScore: 95,
        attendance: 98,
        trend: 'up',
        subjectScores: {
          'গণিত': 98,
          'ইংরেজি': 92,
          'বিজ্ঞান': 95,
          'বাংলা': 88
        }
      },
      {
        id: 2,
        name: 'সাদিয়া ইসলাম',
        roll: '০২',
        overallScore: 85,
        attendance: 95,
        trend: 'up',
        subjectScores: {
          'গণিত': 88,
          'ইংরেজি': 82,
          'বিজ্ঞান': 85,
          'বাংলা': 80
        }
      },
      {
        id: 3,
        name: 'রফিক আহমেদ',
        roll: '০৩',
        overallScore: 45,
        attendance: 65,
        trend: 'down',
        subjectScores: {
          'গণিত': 40,
          'ইংরেজি': 50,
          'বিজ্ঞান': 45,
          'বাংলা': 48
        }
      }
    ]
  };

  const classes = ['নবম', 'দশম', 'একাদশ', 'দ্বাদশ'];
  const subjects = ['গণিত', 'ইংরেজি', 'বিজ্ঞান', 'বাংলা', 'সামাজিক বিজ্ঞান'];
  const timeRanges = [
    { value: 'weekly', label: 'সাপ্তাহিক' },
    { value: 'monthly', label: 'মাসিক' },
    { value: 'quarterly', label: 'ত্রৈমাসিক' },
    { value: 'yearly', label: 'বার্ষিক' }
  ];

  const ProgressBar = ({ percentage, color = 'blue', height = 'h-3' }) => (
    <div className={`w-full bg-gray-200 rounded-full ${height}`}>
      <div 
        className={`${height} rounded-full ${color === 'blue' ? 'bg-blue-500' : color === 'green' ? 'bg-green-500' : color === 'red' ? 'bg-red-500' : 'bg-yellow-500'}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );

  const StatCard = ({ title, value, subtitle, icon, trend, color }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
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

  const PerformanceChart = ({ data, title }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="flex items-end space-x-2 h-32">
        {data.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t transition-all hover:from-blue-600 hover:to-blue-400"
              style={{ height: `${(value / 100) * 80}%` }}
            ></div>
            <span className="text-xs text-gray-500 mt-2">W{index + 1}</span>
          </div>
        ))}
      </div>
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
                <Link href="/teacher/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  টিচার ড্যাশবোর্ড
                </Link>
                <Link href="/question-bank" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  প্রশ্ন ব্যাংক
                </Link>
                <Link href="/teacher/create-question" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  প্রশ্ন তৈরি
                </Link>
                <Link href="/teacher/check-answers" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  উত্তর চেক
                </Link>
                <Link href="/teacher/analytics" className="bg-blue-100 text-blue-700 px-3 py-2 rounded-md font-medium">
                  অ্যানালিটিক্স
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">মো: রহিম উদ্দিন</p>
                <p className="text-sm text-gray-600">গণিত শিক্ষক</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                র
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">একাডেমিক অ্যানালিটিক্স</h1>
            <p className="text-xl text-gray-600">ক্লাস এবং শিক্ষার্থীদের performance এর বিস্তারিত বিশ্লেষণ</p>
          </div>
          
          {/* Filters */}
          <div className="flex space-x-4">
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {classes.map(className => (
                <option key={className} value={className}>{className}</option>
              ))}
            </select>
            
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
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8">
          {[
            { id: 'overview', name: 'ওভারভিউ', icon: '📊' },
            { id: 'class', name: 'ক্লাস পারফরমেন্স', icon: '👨‍🎓' },
            { id: 'questions', name: 'প্রশ্ন বিশ্লেষণ', icon: '❓' },
            { id: 'students', name: 'শিক্ষার্থী প্রগ্রেস', icon: '📈' }
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
                title="মোট শিক্ষার্থী" 
                value={analyticsData.overview.totalStudents}
                icon="👨‍🎓"
                color="bg-blue-500"
              />
              <StatCard 
                title="গড় পারফরমেন্স" 
                value={`${analyticsData.overview.averagePerformance}%`}
                subtitle="সকল বিষয়ে"
                icon="📈"
                color="bg-green-500"
                trend={{ value: 5 }}
              />
              <StatCard 
                title="মোট অ্যাসাইনমেন্ট" 
                value={analyticsData.overview.totalAssignments}
                icon="📝"
                color="bg-purple-500"
              />
              <StatCard 
                title="মূল্যায়ন completed" 
                value={analyticsData.overview.completedEvaluations}
                subtitle="জমা দেওয়া"
                icon="✅"
                color="bg-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Performer */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🏆 শীর্ষ performer</h3>
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    আ
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{analyticsData.overview.topPerformer.name}</h4>
                    <p className="text-green-600 font-bold text-lg">{analyticsData.overview.topPerformer.score}% স্কোর</p>
                    <p className="text-sm text-gray-600">{analyticsData.overview.topPerformer.improvement}% উন্নতি</p>
                  </div>
                </div>
              </div>

              {/* Need Attention */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">⚠️ মনোযোগ প্রয়োজন</h3>
                <div className="space-y-3">
                  {analyticsData.overview.needAttention.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.reason}</p>
                        </div>
                      </div>
                      <span className="text-red-600 font-bold">{student.score}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Trend */}
            <PerformanceChart 
              data={analyticsData.classPerformance[selectedClass].performanceTrend}
              title="ক্লাস পারফরমেন্স ট্রেন্ড"
            />
          </div>
        )}

        {activeTab === 'class' && (
          <div className="space-y-6">
            {/* Class Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {analyticsData.classPerformance[selectedClass].averageScore}%
                </div>
                <div className="text-gray-600">গড় স্কোর</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {analyticsData.classPerformance[selectedClass].attendance}%
                </div>
                <div className="text-gray-600">উপস্থিতি</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {analyticsData.classPerformance[selectedClass].assignments}
                </div>
                <div className="text-gray-600">অ্যাসাইনমেন্ট</div>
              </div>
            </div>

            {/* Subject-wise Performance */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">বিষয়ভিত্তিক পারফরমেন্স</h3>
              <div className="space-y-4">
                {analyticsData.classPerformance[selectedClass].subjectWise.map((subject, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-gray-900">{subject.subject}</h4>
                      <div className="text-right">
                        <span className="font-bold text-gray-900">{subject.average}%</span>
                        <span className="text-sm text-gray-600 ml-2">গড়</span>
                      </div>
                    </div>
                    
                    <ProgressBar percentage={subject.average} />
                    
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>সর্বনিম্ন: {subject.lowScore}%</span>
                      <span>সর্বোচ্চ: {subject.topScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Most Difficult Questions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 সবচেয়ে কঠিন প্রশ্ন</h3>
              <div className="space-y-4">
                {analyticsData.questionAnalysis.mostDifficult.map((question, index) => (
                  <div key={question.id} className="border border-red-200 rounded-xl p-4 bg-red-50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{question.question}</h4>
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                        {question.correctRate}% সঠিক
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{question.subject}</p>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">সাধারণ ভুল:</p>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {question.commonMistakes.map((mistake, i) => (
                          <li key={i}>{mistake}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Easy Questions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ সবচেয়ে সহজ প্রশ্ন</h3>
              <div className="space-y-4">
                {analyticsData.questionAnalysis.mostEasy.map((question, index) => (
                  <div key={question.id} className="border border-green-200 rounded-xl p-4 bg-green-50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{question.question}</h4>
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                        {question.correctRate}% সঠিক
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{question.subject}</p>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">সাধারণ ভুল:</p>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {question.commonMistakes.map((mistake, i) => (
                          <li key={i}>{mistake}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-6">
            {/* Students Progress List */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">শিক্ষার্থীদের প্রগ্রেস</h3>
              <div className="space-y-4">
                {analyticsData.studentProgress.map((student) => (
                  <div key={student.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{student.name}</h4>
                          <p className="text-sm text-gray-600">রোল: {student.roll} • উপস্থিতি: {student.attendance}%</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          student.overallScore >= 80 ? 'text-green-600' :
                          student.overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {student.overallScore}%
                        </div>
                        <div className={`flex items-center text-sm ${
                          student.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {student.trend === 'up' ? '↗ উন্নতিশীল' : '↘ অবনতিশীল'}
                        </div>
                      </div>
                    </div>

                    {/* Subject Scores */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(student.subjectScores).map(([subject, score]) => (
                        <div key={subject} className="text-center">
                          <div className="text-sm text-gray-600 mb-1">{subject}</div>
                          <div className={`text-lg font-bold ${
                            score >= 80 ? 'text-green-600' :
                            score >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {score}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Export Options */}
        <div className="flex justify-end mt-8">
          <div className="space-x-3">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              📄 PDF রিপোর্ট
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              📊 এক্সেল এক্সপোর্ট
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              🔄 রিফ্রেশ ডেটা
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;