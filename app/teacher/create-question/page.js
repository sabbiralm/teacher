// app/teacher/create-question/page.jsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const CreateQuestionPage = () => {
  const [formData, setFormData] = useState({
    question: '',
    type: 'mcq',
    subject: '',
    chapter: '',
    difficulty: 'medium',
    marks: 1,
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    tags: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const subjects = [
    'গণিত',
    'ইংরেজি', 
    'বিজ্ঞান',
    'বাংলা',
    'সামাজিক বিজ্ঞান',
    'ধর্ম',
    'আইসিটি'
  ];

  const chapters = {
    'গণিত': ['বীজগণিত', 'জ্যামিতি', 'ত্রিকোণমিতি', 'পরিসংখ্যান', 'ক্যালকুলাস'],
    'ইংরেজি': ['Grammar', 'Writing', 'Reading', 'Vocabulary', 'Literature'],
    'বিজ্ঞান': ['পদার্থবিজ্ঞান', 'রসায়ন', 'জীববিজ্ঞান', 'পরিবেশ বিজ্ঞান'],
    'বাংলা': ['ব্যাকরণ', 'রচনা', 'সাহিত্য', 'কবিতা'],
    'সামাজিক বিজ্ঞান': ['ইতিহাস', 'ভূগোল', 'নাগরিকত্ব', 'অর্থনীতি']
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const handleAddOption = () => {
    if (formData.options.length < 6) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, '']
      }));
    }
  };

  const handleRemoveOption = (index) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        options: newOptions,
        correctAnswer: prev.correctAnswer >= index ? Math.max(0, prev.correctAnswer - 1) : prev.correctAnswer
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.question.trim()) {
      alert('প্রশ্ন লিখুন');
      setIsSubmitting(false);
      return;
    }

    if (formData.type === 'mcq') {
      const emptyOptions = formData.options.filter(opt => !opt.trim());
      if (emptyOptions.length > 0) {
        alert('সকল বিকল্প পূরণ করুন');
        setIsSubmitting(false);
        return;
      }
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Question created:', formData);
      alert('প্রশ্ন সফলভাবে তৈরি হয়েছে!');
      
      // Reset form
      setFormData({
        question: '',
        type: 'mcq',
        subject: '',
        chapter: '',
        difficulty: 'medium',
        marks: 1,
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: '',
        tags: ''
      });
    } catch (error) {
      console.error('Error creating question:', error);
      alert('প্রশ্ন তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const QuestionPreview = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4">প্রশ্ন প্রিভিউ</h3>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
            {formData.subject}
          </span>
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
            {formData.chapter}
          </span>
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
            {formData.marks} নম্বর
          </span>
          <span className={`px-2 py-1 rounded text-sm ${
            formData.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
            formData.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {formData.difficulty === 'easy' ? 'সহজ' : 
             formData.difficulty === 'medium' ? 'মধ্যম' : 'কঠিন'}
          </span>
        </div>
        
        <p className="text-lg text-gray-900 mb-4">{formData.question}</p>
      </div>

      {formData.type === 'mcq' && (
        <div className="space-y-2">
          {formData.options.map((option, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border-2 ${
                index === formData.correctAnswer
                  ? 'bg-green-100 border-green-500 text-green-800'
                  : 'bg-gray-50 border-gray-200 text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                  index === formData.correctAnswer
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option || 'খালি বিকল্প'}</span>
                {index === formData.correctAnswer && (
                  <span className="ml-auto bg-green-500 text-white px-2 py-1 rounded text-xs">
                    সঠিক উত্তর
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {formData.type === 'written' && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-gray-600">লিখিত উত্তর - শিক্ষার্থীরা তাদের উত্তর টাইপ করবে</p>
        </div>
      )}

      {formData.type === 'true_false' && (
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg border-2 text-center ${
            formData.correctAnswer === 0
              ? 'bg-green-100 border-green-500 text-green-800'
              : 'bg-gray-50 border-gray-200 text-gray-700'
          }`}>
            <div className="text-2xl mb-2">✅</div>
            <span className="font-medium">সত্য</span>
            {formData.correctAnswer === 0 && (
              <div className="mt-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                সঠিক উত্তর
              </div>
            )}
          </div>
          <div className={`p-4 rounded-lg border-2 text-center ${
            formData.correctAnswer === 1
              ? 'bg-green-100 border-green-500 text-green-800'
              : 'bg-gray-50 border-gray-200 text-gray-700'
          }`}>
            <div className="text-2xl mb-2">❌</div>
            <span className="font-medium">মিথ্যা</span>
            {formData.correctAnswer === 1 && (
              <div className="mt-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                সঠিক উত্তর
              </div>
            )}
          </div>
        </div>
      )}

      {formData.explanation && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">ব্যাখ্যা:</h4>
          <p className="text-blue-700">{formData.explanation}</p>
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
                <Link href="/teacher/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  টিচার ড্যাশবোর্ড
                </Link>
                <Link href="/question-bank" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  প্রশ্ন ব্যাংক
                </Link>
                <Link href="/teacher/create-question" className="bg-blue-100 text-blue-700 px-3 py-2 rounded-md font-medium">
                  প্রশ্ন তৈরি
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">নতুন প্রশ্ন তৈরি করুন</h1>
          <p className="text-xl text-gray-600">আপনার প্রয়োজন অনুযায়ী কাস্টম প্রশ্ন তৈরি করুন</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              {/* Basic Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">মৌলিক তথ্য</h3>
                
                {/* Question Type */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    প্রশ্নের ধরন <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'mcq', label: 'MCQ', icon: '🔘' },
                      { value: 'written', label: 'লিখিত', icon: '📝' },
                      { value: 'true_false', label: 'সত্য/মিথ্যা', icon: '✅' }
                    ].map(type => (
                      <button
                        type="button"
                        key={type.value}
                        onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                        className={`p-3 rounded-lg border-2 text-center transition-colors ${
                          formData.type === type.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-lg mb-1">{type.icon}</div>
                        <div className="text-sm font-medium">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject and Chapter */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      বিষয় <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">বিষয় নির্বাচন করুন</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      অধ্যায় <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="chapter"
                      value={formData.chapter}
                      onChange={handleInputChange}
                      required
                      disabled={!formData.subject}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    >
                      <option value="">অধ্যায় নির্বাচন করুন</option>
                      {formData.subject && chapters[formData.subject]?.map(chapter => (
                        <option key={chapter} value={chapter}>{chapter}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Difficulty and Marks */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      কঠিনতার মাত্রা
                    </label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="easy">সহজ</option>
                      <option value="medium">মধ্যম</option>
                      <option value="hard">কঠিন</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      নম্বর <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="marks"
                      value={formData.marks}
                      onChange={handleInputChange}
                      min="1"
                      max="20"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="প্রশ্নের নম্বর"
                    />
                  </div>
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  প্রশ্ন লিখুন <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">(স্পষ্ট এবং বোধগম্য ভাষায় লিখুন)</span>
                </label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="উদাহরণ: ত্রিভুজের তিনটি কোণের সমষ্টি কত?"
                />
              </div>

              {/* MCQ Options */}
              {formData.type === 'mcq' && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      বিকল্পসমূহ <span className="text-red-500">*</span>
                      <span className="text-xs text-gray-500 ml-2">(সঠিক উত্তরটি সিলেক্ট করুন)</span>
                    </label>
                    {formData.options.length < 6 && (
                      <button
                        type="button"
                        onClick={handleAddOption}
                        className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        + বিকল্প যোগ
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {formData.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={formData.correctAnswer === index}
                          onChange={() => setFormData(prev => ({ ...prev, correctAnswer: index }))}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          placeholder={`বিকল্প ${String.fromCharCode(65 + index)} লিখুন...`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                        {formData.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveOption(index)}
                            className="text-red-600 hover:text-red-800 p-2"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* True/False Options */}
              {formData.type === 'true_false' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    সঠিক উত্তর নির্বাচন করুন <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: 0, label: 'সত্য', icon: '✅' },
                      { value: 1, label: 'মিথ্যা', icon: '❌' }
                    ].map(option => (
                      <button
                        type="button"
                        key={option.value}
                        onClick={() => setFormData(prev => ({ ...prev, correctAnswer: option.value }))}
                        className={`p-4 rounded-lg border-2 text-center transition-colors ${
                          formData.correctAnswer === option.value
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-2">{option.icon}</div>
                        <div className="font-medium">{option.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Explanation */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ব্যাখ্যা
                  <span className="text-xs text-gray-500 ml-2">(ঐচ্ছিক - শিক্ষার্থীদের বুঝতে সাহায্য করবে)</span>
                </label>
                <textarea
                  name="explanation"
                  value={formData.explanation}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="উত্তরের ব্যাখ্যা লিখুন..."
                />
              </div>

              {/* Tags */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ট্যাগ
                  <span className="text-xs text-gray-500 ml-2">(কমা দ্বারা আলাদা করুন, যেমন: ত্রিভুজ, কোণ, জ্যামিতি)</span>
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ট্যাগ যোগ করুন..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  {showPreview ? 'ফর্ম দেখুন' : 'প্রিভিউ দেখুন'}
                </button>
                
                <div className="space-x-3">
                  <button
                    type="button"
                    onClick={() => setFormData({
                      question: '',
                      type: 'mcq',
                      subject: '',
                      chapter: '',
                      difficulty: 'medium',
                      marks: 1,
                      options: ['', '', '', ''],
                      correctAnswer: 0,
                      explanation: '',
                      tags: ''
                    })}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    রিসেট
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    {isSubmitting ? 'সেভ হচ্ছে...' : 'প্রশ্ন সেভ করুন'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            {showPreview ? (
              <QuestionPreview />
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">নির্দেশনা</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <span>💡</span>
                    <p>প্রশ্নটি স্পষ্ট এবং বোধগম্য ভাষায় লিখুন</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span>📝</span>
                    <p>MCQ প্রশ্নের জন্য কমপক্ষে ২টি বিকল্প দিন</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span>🎯</span>
                    <p>সঠিক উত্তর সিলেক্ট করতে ভুলবেন না</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span>🔍</span>
                    <p>ব্যাখ্যা যোগ করলে শিক্ষার্থীদের বুঝতে সুবিধা হবে</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span>🏷️</span>
                    <p>প্রাসঙ্গিক ট্যাগ যোগ করে প্রশ্ন খুঁজে পেতে সুবিধা করুন</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateQuestionPage;