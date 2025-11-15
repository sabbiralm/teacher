// app/results/[id]/page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const ResultsPage = () => {
  const params = useParams();
  const resultId = params.id;
  const [activeTab, setActiveTab] = useState('overview');
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours for written evaluation

  // Mock results data
  const resultsData = {
    id: resultId,
    type: 'mixed', // 'mcq', 'written', 'mixed'
    title: 'বীজগণিতের মৌলিক সমস্যা সমাধান',
    subject: 'গণিত',
    submittedAt: '২০২৪-০১-১৮, ১০:৩০ AM',
    evaluatedAt: '২০২৪-০১-১৮, ০২:১৫ PM',
    totalMarks: 20,
    obtainedMarks: 16,
    percentage: 80,
    grade: 'A-',
    status: 'evaluated', // 'evaluated', 'pending', 'processing'
    teacher: 'মো: রহিম উদ্দিন',
    teacherComment: 'ভালো প্রচেষ্টা! তবে কিছু গণনায় ভুল হয়েছে। আরও অনুশীলন প্রয়োজন।',
    
    questions: [
      {
        id: 1,
        question: 'নিচের দ্বিঘাত সমীকরণটি সমাধান করুন: x² - 5x + 6 = 0',
        type: 'mcq',
        options: ['x=2,3', 'x=1,6', 'x=2,4', 'x=3,3'],
        correctAnswer: 0,
        studentAnswer: 0,
        marks: 5,
        obtainedMarks: 5,
        explanation: 'সঠিক! x² - 5x + 6 = (x-2)(x-3) = 0, তাই x=2,3'
      },
      {
        id: 2,
        question: 'প্রমাণ করুন যে (a+b)² = a² + 2ab + b²',
        type: 'written',
        studentAnswer: 'বাম পক্ষ = (a+b)² = (a+b)(a+b) = a(a+b) + b(a+b) = a² + ab + ab + b² = a² + 2ab + b² = ডান পক্ষ',
        correctAnswer: 'বাম পক্ষ = (a+b)² = (a+b)(a+b) = a² + ab + ba + b² = a² + 2ab + b² = ডান পক্ষ',
        marks: 5,
        obtainedMarks: 4,
        teacherFeedback: 'প্রমাণটি সঠিক, কিন্তু ba এর পরিবর্তে ab লেখা উচিত ছিল',
        explanation: 'বীজগাণিতিক সূত্র ব্যবহার করে প্রমাণ করা হয়েছে'
      },
      {
        id: 3,
        question: 'সরল করুন: (3x² + 2x - 1) + (2x² - 3x + 4)',
        type: 'written',
        studentAnswer: '3x² + 2x² = 5x², 2x - 3x = -x, -1 + 4 = 3, so answer is 5x² - x + 3',
        correctAnswer: '5x² - x + 3',
        marks: 5,
        obtainedMarks: 5,
        teacherFeedback: 'নির্ভুল সমাধান!',
        explanation: 'সদৃশ পদগুলো সঠিকভাবে যোগ করা হয়েছে'
      },
      {
        id: 4,
        question: 'নিচের রৈখিক সমীকরণটি লেখচিত্র আঁকুন: y = 2x + 3',
        type: 'written',
        studentAnswer: 'আমি গ্রাফ আঁকেছি যেখানে x=0 হলে y=3 এবং x=1 হলে y=5',
        correctAnswer: 'সরলরেখা যেখানে y-intercept = 3 এবং slope = 2',
        marks: 5,
        obtainedMarks: 2,
        teacherFeedback: 'গ্রাফ জমা দেওয়া হয়নি। শুধু বর্ণনা দেওয়া হয়েছে।',
        explanation: 'গ্রাফের জন্য নির্দিষ্ট বিন্দু এবং সরলরেখা আঁকতে হবে'
      }
    ],

    performance: {
      excellent: ['বীজগাণিতিক যোগ', 'সূত্রের প্রয়োগ'],
      good: ['সমীকরণ সমাধান'],
      needImprovement: ['গ্রাফ আঁকা', 'বিস্তারিত ব্যাখ্যা']
    },

    suggestions: [
      'গ্রাফ আঁকায় আরও অনুশীলন প্রয়োজন',
      'গাণিতিক সমস্যা সমাধানে ধাপগুলো বিস্তারিত লিখুন',
      'নিয়মিত অনুশীলন চালিয়ে যান'
    ]
  };

  // Timer for written evaluation
  useEffect(() => {
    if (resultsData.status === 'pending') {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resultsData.status]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}ঘ ${minutes}ম`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'evaluated': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'evaluated': return 'মূল্যায়ন completed';
      case 'processing': return 'মূল্যায়ন underway';
      case 'pending': return 'মূল্যায়ন pending';
      default: return 'অবস্থা অজানা';
    }
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'text-green-600';
    if (grade.includes('B')) return 'text-blue-600';
    if (grade.includes('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  const QuestionReview = ({ question, index }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {index + 1}. {question.question}
          </h3>
          <div className="flex items-center space-x-3">
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
              {question.marks} নম্বর
            </span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
              প্রাপ্ত নম্বর: {question.obtainedMarks}
            </span>
            <span className={`px-2 py-1 rounded text-sm ${
              question.obtainedMarks === question.marks ? 'bg-green-100 text-green-700' :
              question.obtainedMarks >= question.marks * 0.5 ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {((question.obtainedMarks / question.marks) * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      {question.type === 'mcq' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {question.options.map((option, optIndex) => (
              <div
                key={optIndex}
                className={`p-3 rounded-lg border-2 ${
                  optIndex === question.correctAnswer
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : optIndex === question.studentAnswer && optIndex !== question.correctAnswer
                    ? 'bg-red-100 border-red-500 text-red-800'
                    : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                    optIndex === question.correctAnswer
                      ? 'bg-green-500 border-green-500 text-white'
                      : optIndex === question.studentAnswer && optIndex !== question.correctAnswer
                      ? 'bg-red-500 border-red-500 text-white'
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}>
                    {String.fromCharCode(65 + optIndex)}
                  </div>
                  <span>{option}</span>
                  {optIndex === question.correctAnswer && (
                    <span className="ml-auto bg-green-500 text-white px-2 py-1 rounded text-xs">
                      সঠিক উত্তর
                    </span>
                  )}
                  {optIndex === question.studentAnswer && optIndex !== question.correctAnswer && (
                    <span className="ml-auto bg-red-500 text-white px-2 py-1 rounded text-xs">
                      আপনার উত্তর
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {question.type === 'written' && (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">আপনার উত্তর:</h4>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-gray-800 whitespace-pre-line">{question.studentAnswer}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">শিক্ষকের মন্তব্য:</h4>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-gray-800">{question.teacherFeedback}</p>
            </div>
          </div>

          {question.explanation && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">ব্যাখ্যা:</h4>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-800">{question.explanation}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {question.explanation && question.type !== 'written' && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-800 mb-2">ব্যাখ্যা:</h4>
          <p className="text-green-700">{question.explanation}</p>
        </div>
      )}
    </div>
  );

  if (resultsData.status === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/dashboard" className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mr-3"></div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    শিহ্মক
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">⏳</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              উত্তর মূল্যায়ন চলছে
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              আপনার উত্তরটি শিক্ষক দ্বারা মূল্যায়ন করা হচ্ছে
            </p>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto border border-blue-200">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">অ্যাসাইনমেন্ট:</span>
                  <span className="font-medium">{resultsData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">জমা দেওয়ার সময়:</span>
                  <span className="font-medium">{resultsData.submittedAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">আনুমানিক সময়:</span>
                  <span className="font-medium text-blue-600">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link 
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                ড্যাশবোর্ডে ফিরে যান
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{resultsData.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {resultsData.subject}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(resultsData.status)}`}>
                  {getStatusText(resultsData.status)}
                </span>
              </div>
              <p className="text-gray-600">
                মূল্যায়ন করেছেন: <span className="font-medium">{resultsData.teacher}</span> • {resultsData.evaluatedAt}
              </p>
            </div>
            
            {/* Score Card */}
            <div className="text-center bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
              <div className="text-5xl font-bold text-green-600 mb-2">{resultsData.percentage}%</div>
              <div className={`text-2xl font-bold ${getGradeColor(resultsData.grade)} mb-2`}>
                {resultsData.grade}
              </div>
              <div className="text-lg text-gray-700">
                <span className="font-bold">{resultsData.obtainedMarks}</span> / {resultsData.totalMarks} নম্বর
              </div>
            </div>
          </div>

          {/* Teacher Comment */}
          {resultsData.teacherComment && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                <span className="mr-2">💬</span>
                শিক্ষকের মন্তব্য
              </h3>
              <p className="text-blue-700 text-lg">{resultsData.teacherComment}</p>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8">
          {[
            { id: 'overview', name: 'ওভারভিউ', icon: '📊' },
            { id: 'questions', name: 'প্রশ্নসমূহ', icon: '❓' },
            { id: 'analysis', name: 'বিশ্লেষণ', icon: '🔍' }
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Performance Areas */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">পারফরম্যান্স এলাকা</h3>
              <div className="space-y-4">
                {Object.entries(resultsData.performance).map(([area, topics]) => (
                  <div key={area} className="border-l-4 pl-4" style={{
                    borderColor: 
                      area === 'excellent' ? '#10B981' :
                      area === 'good' ? '#3B82F6' : '#EF4444'
                  }}>
                    <h4 className="font-semibold text-gray-900 capitalize mb-2">
                      {area === 'excellent' ? 'চমৎকার' : 
                       area === 'good' ? 'ভালো' : 'উন্নতির প্রয়োজন'}
                    </h4>
                    <ul className="text-gray-600 space-y-1">
                      {topics.map((topic, index) => (
                        <li key={index}>• {topic}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">উন্নতির পরামর্শ</h3>
              <div className="space-y-3">
                {resultsData.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <span className="text-yellow-600 mt-1">💡</span>
                    <p className="text-gray-700">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'questions' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">প্রশ্নভিত্তিক রিভিউ</h2>
            <div className="space-y-6">
              {resultsData.questions.map((question, index) => (
                <QuestionReview key={question.id} question={question} index={index} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Statistics */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">পরিসংখ্যান</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">সঠিক উত্তর:</span>
                  <span className="font-bold text-green-600">
                    {resultsData.questions.filter(q => q.obtainedMarks === q.marks).length} / {resultsData.questions.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">গড় স্কোর:</span>
                  <span className="font-bold text-blue-600">
                    {(resultsData.obtainedMarks / resultsData.questions.length).toFixed(1)} / প্রশ্ন
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">সাফল্যের হার:</span>
                  <span className="font-bold text-purple-600">{resultsData.percentage}%</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">পরবর্তী পদক্ষেপ</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">📚</span>
                  <span className="text-gray-700">দুর্বল বিষয়গুলো রিভিশন দিন</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">🎯</span>
                  <span className="text-gray-700">অনুরূপ আরও সমস্যা সমাধান করুন</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-600">🔄</span>
                  <span className="text-gray-700">পরবর্তী অ্যাসাইনমেন্টের জন্য প্রস্তুত হোন</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-12">
          <Link 
            href="/assignments"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            অন্যান্য অ্যাসাইনমেন্ট দেখুন
          </Link>
          <Link 
            href="/dashboard"
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            ড্যাশবোর্ডে ফিরে যান
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;