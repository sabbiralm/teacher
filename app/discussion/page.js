// app/discussion/page.jsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const DiscussionPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock discussion data
  const discussionData = {
    questions: [
      {
        id: 1,
        title: 'ত্রিভুজের তিন কোণের সমষ্টি কেন ১৮০ ডিগ্রী?',
        content: 'আমি বুঝতে পারছি না为什么 ত্রিভুজের তিনটি কোণের সমষ্টি সর্বদা ১৮০ ডিগ্রী হয়। কেউ কি সহজভাবে ব্যাখ্যা করতে পারেন?',
        subject: 'গণিত',
        chapter: 'জ্যামিতি',
        askedBy: {
          name: 'রফিক আহমেদ',
          roll: '০৩',
          avatar: 'র'
        },
        timestamp: '২০২৪-০১-১৮, ১০:৩০ AM',
        votes: 12,
        answers: 5,
        tags: ['ত্রিভুজ', 'কোণ', 'জ্যামিতি'],
        isResolved: true,
        discussions: [
          {
            id: 1,
            user: {
              name: 'আহমেদ হাসান',
              roll: '০১',
              avatar: 'আ',
              type: 'student'
            },
            comment: 'এটি ইউক্লিডীয় জ্যামিতির একটি মৌলিক উপপাদ্য। আপনি একটি ত্রিভুজ আঁকুন এবং এর শীর্ষবিন্দু থেকে ভূমির সমান্তরাল একটি রেখা আঁকুন, তাহলে বুঝতে পারবেন।',
            timestamp: '২০২৪-০১-১৮, ১১:১৫ AM',
            votes: 8,
            isTeacher: false,
            isHelpful: true
          },
          {
            id: 2,
            user: {
              name: 'মো: রহিম উদ্দিন',
              roll: 'শিক্ষক',
              avatar: 'র',
              type: 'teacher'
            },
            comment: 'ভালো প্রশ্ন! আসুন একটি সহজ প্রমাণ দেখি:\n\n১. একটি ত্রিভুজ ABC নিন\n২. A বিন্দুতে BC এর সমান্তরাল একটি রেখা আঁকুন\n৩. আপনি দেখবেন যে কোণগুলো একান্তর কোণ হিসেবে অবস্থান করে\n৪. তাই ∠A + ∠B + ∠C = ১৮০°',
            timestamp: '২০২৪-০১-১৮, ০২:৩০ PM',
            votes: 15,
            isTeacher: true,
            isHelpful: true
          },
          {
            id: 3,
            user: {
              name: 'সাদিয়া ইসলাম',
              roll: '০২',
              avatar: 'স',
              type: 'student'
            },
            comment: 'আমিও এই same problem face করছিলাম। teacher এর explanation খুব helpful লাগছে। ধন্যবাদ!',
            timestamp: '২০২৪-০১-১৮, ০৩:৪৫ PM',
            votes: 3,
            isTeacher: false,
            isHelpful: false
          }
        ]
      },
      {
        id: 2,
        title: 'পানির রাসায়নিক সংকেত লিখতে H₂O কেন?',
        content: 'আমি জানি পানির রাসায়নিক সংকেত H₂O, কিন্তু কেন H₂O? কেন HO₂ নয়? হাইড্রোজেন এবং অক্সিজেনের মধ্যে bond কিভাবে কাজ করে?',
        subject: 'বিজ্ঞান',
        chapter: 'রসায়ন',
        askedBy: {
          name: 'সুমাইয়া আক্তার',
          roll: '০৫',
          avatar: 'স'
        },
        timestamp: '২০২৪-০১-১৭, ০৩:২০ PM',
        votes: 8,
        answers: 3,
        tags: ['পানি', 'রাসায়নিক সংকেত', 'বন্ধন'],
        isResolved: false,
        discussions: [
          {
            id: 1,
            user: {
              name: 'ড. আলমগীর হোসেন',
              roll: 'শিক্ষক',
              avatar: 'আ',
              type: 'teacher'
            },
            comment: 'Excellent question! H₂O হয় কারণ:\n\n১. অক্সিজেনের ভ্যালেন্সি ২ (২টি ইলেকট্রন নিতে পারে)\n২. প্রতিটি হাইড্রোজেনের ভ্যালেন্সি ১ (১টি ইলেকট্রন দিতে পারে)\n৩. তাই ২টি হাইড্রোজেন ১টি অক্সিজেনের সাথে bond তৈরি করে\n\nHO₂ হতো যদি অক্সিজেন ১টি হাইড্রোজেনের সাথে bond করত, কিন্তু তা chemically stable নয়।',
            timestamp: '২০২৪-০১-১৭, ০৪:১৫ PM',
            votes: 12,
            isTeacher: true,
            isHelpful: true
          }
        ]
      },
      {
        id: 3,
        title: 'Present Perfect Tense vs Past Simple Tense - পার্থক্য কী?',
        content: 'আমি Present Perfect Tense এবং Past Simple Tense এর মধ্যে confuse হয়ে যাই। কখন কোন Tense ব্যবহার করতে হবে? উদাহরণ সহ বুঝলে ভালো হয়।',
        subject: 'ইংরেজি',
        chapter: 'Grammar',
        askedBy: {
          name: 'আহমেদ হাসান',
          roll: '০১',
          avatar: 'আ'
        },
        timestamp: '২০২৪-০১-১৬, ০৯:১৫ AM',
        votes: 6,
        answers: 2,
        tags: ['Tense', 'Grammar', 'ইংরেজি'],
        isResolved: false,
        discussions: []
      }
    ],
    popularTags: [
      { name: 'গণিত', count: 23 },
      { name: 'জ্যামিতি', count: 15 },
      { name: 'রসায়ন', count: 12 },
      { name: 'ইংরেজি', count: 18 },
      { name: 'Tense', count: 8 },
      { name: 'বীজগণিত', count: 11 }
    ]
  };

  const subjects = ['সব বিষয়', 'গণিত', 'ইংরেজি', 'বিজ্ঞান', 'বাংলা', 'সামাজিক বিজ্ঞান'];
  const filters = [
    { id: 'all', name: 'সব আলোচনা' },
    { id: 'unanswered', name: 'উত্তর প্রয়োজন' },
    { id: 'resolved', name: 'সমাধান হয়েছে' },
    { id: 'myquestions', name: 'আমার প্রশ্ন' }
  ];

  const QuestionCard = ({ question }) => (
    <div 
      className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => setSelectedQuestion(question)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                {question.subject}
              </span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                {question.chapter}
              </span>
              {question.isResolved && (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  ✅ সমাধান হয়েছে
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{question.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{question.content}</p>
          </div>
          
          <div className="text-right">
            <div className="bg-gray-100 rounded-lg p-2 text-center min-w-16">
              <div className="text-lg font-bold text-gray-900">{question.votes}</div>
              <div className="text-xs text-gray-600">ভোট</div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {question.askedBy.avatar}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{question.askedBy.name}</p>
              <p className="text-xs text-gray-600">{question.timestamp}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <span>💬</span>
              <span>{question.answers} উত্তর</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>👁️</span>
              <span>{Math.floor(question.votes * 2.5)}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {question.tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const DiscussionThread = ({ question }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Question Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <button 
          onClick={() => setSelectedQuestion(null)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
        >
          <span>←</span>
          <span>সব আলোচনায় ফিরে যান</span>
        </button>

        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                {question.subject}
              </span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                {question.chapter}
              </span>
              {question.isResolved && (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  ✅ সমাধান হয়েছে
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{question.title}</h1>
            <p className="text-gray-700 leading-relaxed">{question.content}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              {question.askedBy.avatar}
            </div>
            <div>
              <p className="font-medium text-gray-900">{question.askedBy.name}</p>
              <p className="text-sm text-gray-600">রোল: {question.askedBy.roll} • {question.timestamp}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <span>👍</span>
              <span>ভোট দিন</span>
              <span className="bg-white px-2 py-1 rounded text-sm">{question.votes}</span>
            </button>
            {!question.isResolved && (
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                সমাধান মার্ক করুন
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Discussions */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {question.discussions.length}টি উত্তর
          {question.discussions.some(d => d.isTeacher) && (
            <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
              শিক্ষক উত্তর দিয়েছেন
            </span>
          )}
        </h2>

        {question.discussions.length > 0 ? (
          <div className="space-y-6">
            {question.discussions.map((discussion) => (
              <div 
                key={discussion.id} 
                className={`border rounded-xl p-6 ${
                  discussion.isTeacher 
                    ? 'border-blue-300 bg-blue-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      discussion.isTeacher 
                        ? 'bg-blue-500' 
                        : 'bg-gradient-to-r from-green-500 to-teal-500'
                    }`}>
                      {discussion.user.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-gray-900">{discussion.user.name}</p>
                        {discussion.isTeacher && (
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                            👨‍🏫 শিক্ষক
                          </span>
                        )}
                        {discussion.isHelpful && !discussion.isTeacher && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            💡 সহায়ক
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {discussion.user.roll} • {discussion.timestamp}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600">
                      <span>👍</span>
                      <span className="text-sm">{discussion.votes}</span>
                    </button>
                    {!discussion.isTeacher && (
                      <button className="text-gray-500 hover:text-blue-600 text-sm">
                        💡 সহায়ক
                      </button>
                    )}
                  </div>
                </div>

                <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                  {discussion.comment}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">কোন উত্তর নেই</h3>
            <p className="text-gray-600">প্রথম উত্তরদাতা হোন!</p>
          </div>
        )}

        {/* Add Comment */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">আপনার উত্তর লিখুন</h3>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="আপনার উত্তর বা মন্তব্য লিখুন... (স্পষ্ট এবং বন্ধুত্বপূর্ণ ভাষায় লিখুন)"
            rows="6"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Markdown supported • সহায়ক এবং respectful উত্তর দিন
            </div>
            <button 
              disabled={!newComment.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              উত্তর পোস্ট করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const filteredQuestions = discussionData.questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeTab === 'all' || 
                         (activeTab === 'unanswered' && question.answers === 0) ||
                         (activeTab === 'resolved' && question.isResolved) ||
                         (activeTab === 'myquestions' && question.askedBy.name === 'আহমেদ হাসান');

    return matchesSearch && matchesFilter;
  });

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
                <Link href="/discussion" className="bg-blue-100 text-blue-700 px-3 py-2 rounded-md font-medium">
                  আলোচনা
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">আহমেদ হাসান</p>
                <p className="text-sm text-gray-600">নবম শ্রেণী</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                আ
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedQuestion ? (
          <DiscussionThread question={selectedQuestion} />
        ) : (
          <>
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">আলোচনা ফোরাম</h1>
                <p className="text-xl text-gray-600">প্রশ্ন করুন, উত্তর দিন এবং একসাথে শিখুন</p>
              </div>
              
              <Link 
                href="/discussion/ask"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                + নতুন প্রশ্ন
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Search */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="আলোচনা খুঁজুন..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <span className="text-gray-400">🔍</span>
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">ফিল্টার</h3>
                  <div className="space-y-2">
                    {filters.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setActiveTab(filter.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          activeTab === filter.id
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {filter.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Tags */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">জনপ্রিয় ট্যাগ</h3>
                  <div className="flex flex-wrap gap-2">
                    {discussionData.popularTags.map((tag, index) => (
                      <button
                        key={index}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
                      >
                        #{tag.name} <span className="text-gray-500">({tag.count})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Forum Stats */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">ফোরাম স্ট্যাটস</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">মোট প্রশ্ন:</span>
                      <span className="font-medium">{discussionData.questions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">উত্তর দেওয়া:</span>
                      <span className="font-medium">
                        {discussionData.questions.filter(q => q.answers > 0).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">সমাধান হয়েছে:</span>
                      <span className="font-medium">
                        {discussionData.questions.filter(q => q.isResolved).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Questions List */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {filteredQuestions.length}টি আলোচনা
                    </h2>
                    <div className="flex space-x-2">
                      <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>সর্বশেষ</option>
                        <option>সর্বাধিক ভোট</option>
                        <option>সর্বাধিক উত্তর</option>
                      </select>
                    </div>
                  </div>
                </div>

                {filteredQuestions.length > 0 ? (
                  <div className="space-y-4">
                    {filteredQuestions.map((question) => (
                      <QuestionCard key={question.id} question={question} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
                    <div className="text-6xl mb-4">💭</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">কোন আলোচনা নেই</h3>
                    <p className="text-gray-600 mb-6">আপনার সার্চ বা ফিল্টারের সাথে মিলছে না</p>
                    <Link 
                      href="/discussion/ask"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      প্রথম প্রশ্ন করুন
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default DiscussionPage;