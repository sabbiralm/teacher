// app/question-bank/page.jsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const QuestionBankPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [difficulty, setDifficulty] = useState('all');

  // Mock questions data
  const questionsData = {
    questions: [
      {
        id: 1,
        question: "ত্রিভুজের তিনটি কোণের সমষ্টি কত?",
        type: "mcq",
        subject: "গণিত",
        chapter: "জ্যামিতি",
        difficulty: "easy",
        marks: 2,
        options: ["৯০°", "১৮০°", "২৭০°", "৩৬০°"],
        correctAnswer: 1,
        explanation: "যেকোনো ত্রিভুজের তিনটি কোণের সমষ্টি সর্বদা ১৮০ ডিগ্রী হয়।",
        createdBy: "মো: রহিম উদ্দিন",
        createdAt: "২০২৪-০১-১৫",
        usedIn: ["মিড টার্ম পরীক্ষা ২০২৪"],
        tags: ["ত্রিভুজ", "কোণ", "জ্যামিতি"]
      },
      {
        id: 2,
        question: "নিম্নলিখিতগুলোর মধ্যে কোনটি মৌলিক সংখ্যা?",
        type: "mcq",
        subject: "গণিত",
        chapter: "সংখ্যা তত্ত্ব",
        difficulty: "easy",
        marks: 1,
        options: ["১", "৯", "১১", "১৫"],
        correctAnswer: 2,
        explanation: "১১ একটি মৌলিক সংখ্যা কারণ এটি শুধুমাত্র ১ এবং নিজে দ্বারা বিভাজ্য।",
        createdBy: "মো: রহিম উদ্দিন",
        createdAt: "২০২৪-০১-১০",
        usedIn: ["কুইজ - ১"],
        tags: ["মৌলিক সংখ্যা", "সংখ্যা"]
      },
      {
        id: 3,
        question: "পানির রাসায়নিক সংকেত লিখুন।",
        type: "written",
        subject: "বিজ্ঞান",
        chapter: "রসায়ন",
        difficulty: "easy",
        marks: 1,
        correctAnswer: "H₂O",
        explanation: "পানির রাসায়নিক সংকেত H₂O, যা দুটি হাইড্রোজেন পরমাণু এবং একটি অক্সিজেন পরমাণু নিয়ে গঠিত।",
        createdBy: "ড. আলমগীর হোসেন",
        createdAt: "২০২৪-০১-১২",
        usedIn: ["ইউনিট টেস্ট"],
        tags: ["রাসায়নিক সংকেত", "পানি"]
      },
      {
        id: 4,
        question: "বায়ুমণ্ডলের প্রধান গ্যাস কোনটি?",
        type: "mcq",
        subject: "বিজ্ঞান",
        chapter: "পদার্থবিজ্ঞান",
        difficulty: "medium",
        marks: 2,
        options: ["অক্সিজেন", "নাইট্রোজেন", "কার্বন ডাই-অক্সাইড", "আর্গন"],
        correctAnswer: 1,
        explanation: "বায়ুমণ্ডলের প্রায় ৭৮% নাইট্রোজেন গ্যাস দ্বারা গঠিত।",
        createdBy: "ড. আলমগীর হোসেন",
        createdAt: "২০২৪-০১-০৮",
        usedIn: ["অর্ধবার্ষিক পরীক্ষা"],
        tags: ["বায়ুমণ্ডল", "গ্যাস"]
      },
      {
        id: 5,
        question: "১৯৭১ সালে বাংলাদেশের মুক্তিযুদ্ধ সংঘটিত হয়।",
        type: "true_false",
        subject: "সামাজিক বিজ্ঞান",
        chapter: "ইতিহাস",
        difficulty: "easy",
        marks: 1,
        correctAnswer: true,
        explanation: "বাংলাদেশের মুক্তিযুদ্ধ ১৯৭১ সালে সংঘটিত হয়েছিল এবং ১৬ ডিসেম্বর বাংলাদেশ বিজয় অর্জন করে।",
        createdBy: "মো: কামাল হোসেন",
        createdAt: "২০২৪-০১-০৫",
        usedIn: ["বার্ষিক পরীক্ষা ২০২৩"],
        tags: ["মুক্তিযুদ্ধ", "১৯৭১"]
      },
      {
        id: 6,
        question: "নিউটনের প্রথম সূত্রটি বিবৃত করুন।",
        type: "written",
        subject: "বিজ্ঞান",
        chapter: "পদার্থবিজ্ঞান",
        difficulty: "hard",
        marks: 5,
        correctAnswer: "বাহ্যিক কোনো বল প্রয়োগ না করলে স্থির বস্তু স্থির থাকবে এবং গতিশীল বস্তু সুষম গতিতে সরলরেখায় চলতে থাকবে।",
        explanation: "এটি জড়তার সূত্র নামেও পরিচিত। কোনো বস্তুর গতির অবস্থার পরিবর্তন করতে বলের প্রয়োজন হয়।",
        createdBy: "ড. আলমগীর হোসেন",
        createdAt: "২০২৪-০১-১৮",
        usedIn: [],
        tags: ["নিউটনের সূত্র", "জড়তা"]
      }
    ]
  };

  const subjects = [
    { id: 'all', name: 'সব বিষয়', count: questionsData.questions.length },
    { id: 'math', name: 'গণিত', count: questionsData.questions.filter(q => q.subject === 'গণিত').length },
    { id: 'science', name: 'বিজ্ঞান', count: questionsData.questions.filter(q => q.subject === 'বিজ্ঞান').length },
    { id: 'social', name: 'সামাজিক বিজ্ঞান', count: questionsData.questions.filter(q => q.subject === 'সামাজিক বিজ্ঞান').length }
  ];

  const chapters = {
    math: ['জ্যামিতি', 'সংখ্যা তত্ত্ব', 'বীজগণিত'],
    science: ['রসায়ন', 'পদার্থবিজ্ঞান', 'জীববিজ্ঞান'],
    social: ['ইতিহাস', 'ভূগোল', 'নাগরিকত্ব']
  };

  const difficulties = [
    { id: 'all', name: 'সব লেভেল', color: 'gray' },
    { id: 'easy', name: 'সহজ', color: 'green' },
    { id: 'medium', name: 'মধ্যম', color: 'yellow' },
    { id: 'hard', name: 'কঠিন', color: 'red' }
  ];

  const questionTypes = [
    { id: 'all', name: 'সব ধরন', icon: '📝' },
    { id: 'mcq', name: 'MCQ', icon: '🔘' },
    { id: 'written', name: 'লিখিত', icon: '📄' },
    { id: 'true_false', name: 'সত্য/মিথ্যা', icon: '✅' }
  ];

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'mcq': return '🔘';
      case 'written': return '📄';
      case 'true_false': return '✅';
      default: return '📝';
    }
  };

  const filteredQuestions = questionsData.questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSubject = selectedSubject === 'all' || 
                          question.subject.toLowerCase().includes(selectedSubject);
    
    const matchesChapter = selectedChapter === 'all' || question.chapter === selectedChapter;
    const matchesDifficulty = difficulty === 'all' || question.difficulty === difficulty;
    const matchesType = activeTab === 'all' || question.type === activeTab;

    return matchesSearch && matchesSubject && matchesChapter && matchesDifficulty && matchesType;
  });

  const QuestionCard = ({ question }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        {/* Question Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
              question.type === 'mcq' ? 'bg-blue-100 text-blue-600' :
              question.type === 'written' ? 'bg-green-100 text-green-600' :
              'bg-purple-100 text-purple-600'
            }`}>
              {getTypeIcon(question.type)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg leading-relaxed">
                {question.question}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                  {question.subject}
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                  {question.chapter}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty === 'easy' ? 'সহজ' : 
                   question.difficulty === 'medium' ? 'মধ্যম' : 'কঠিন'}
                </span>
                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                  {question.marks} নম্বর
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Question Content */}
        {question.type === 'mcq' && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">বিকল্পসমূহ:</h4>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <div key={index} className={`flex items-center space-x-3 p-2 rounded-lg ${
                  index === question.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                }`}>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                    index === question.correctAnswer 
                      ? 'border-green-500 bg-green-500 text-white' 
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className={index === question.correctAnswer ? 'text-green-800 font-medium' : 'text-gray-700'}>
                    {option}
                  </span>
                  {index === question.correctAnswer && (
                    <span className="text-green-600 text-sm font-medium ml-auto">সঠিক উত্তর</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {question.type === 'true_false' && (
          <div className="mb-4">
            <div className={`flex items-center space-x-3 p-3 rounded-lg ${
              question.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                question.correctAnswer ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {question.correctAnswer ? '✓' : '✗'}
              </div>
              <span className={question.correctAnswer ? 'text-green-800 font-medium' : 'text-red-800 font-medium'}>
                {question.correctAnswer ? 'সত্য' : 'মিথ্যা'}
              </span>
              <span className="ml-auto text-sm font-medium">
                {question.correctAnswer ? 'সঠিক উত্তর' : 'ভুল উত্তর'}
              </span>
            </div>
          </div>
        )}

        {question.type === 'written' && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">সঠিক উত্তর:</h4>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p className="text-gray-800">{question.correctAnswer}</p>
            </div>
          </div>
        )}

        {/* Explanation */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">ব্যাখ্যা:</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{question.explanation}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {question.tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            <span>তৈরি করেছেন: {question.createdBy}</span>
            <span className="mx-2">•</span>
            <span>{question.createdAt}</span>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
              ব্যবহার করুন
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              এডিট
            </button>
          </div>
        </div>
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
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  ড্যাশবোর্ড
                </Link>
                <Link href="/courses" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  কোর্সসমূহ
                </Link>
                <Link href="/question-bank" className="bg-blue-100 text-blue-700 px-3 py-2 rounded-md font-medium">
                  প্রশ্ন ব্যাংক
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                নতুন প্রশ্ন
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                আ
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">প্রশ্ন ব্যাংক</h1>
          <p className="text-xl text-gray-600">একটি সমৃদ্ধ সংগ্রহশালা যেখানে আপনি প্রয়োজনীয় প্রশ্ন খুঁজে পাবেন</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="প্রশ্ন বা ট্যাগ খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
            </div>

            {/* Subject Filter */}
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} ({subject.count})
                </option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select 
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {difficulties.map(diff => (
                <option key={diff.id} value={diff.id}>
                  {diff.name}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Filter */}
          {selectedSubject !== 'all' && chapters[selectedSubject] && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">অধ্যায় নির্বাচন করুন:</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedChapter('all')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedChapter === 'all' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  সব অধ্যায়
                </button>
                {chapters[selectedSubject].map(chapter => (
                  <button
                    key={chapter}
                    onClick={() => setSelectedChapter(chapter)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedChapter === chapter 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {chapter}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question Type Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {questionTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
                  activeTab === type.id 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{type.icon}</span>
                <span>{type.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredQuestions.length}টি প্রশ্ন পাওয়া গেছে
          </h2>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              এক্সপোর্ট
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              ব্যাচ এড
            </button>
          </div>
        </div>

        {/* Questions Grid */}
        {filteredQuestions.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredQuestions.map(question => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-6xl mb-4">❓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">কোন প্রশ্ন পাওয়া যায়নি</h3>
            <p className="text-gray-600 mb-6">আপনার সার্চ বা ফিল্টারের সাথে মিলছে না</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              নতুন প্রশ্ন তৈরি করুন
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuestionBankPage;