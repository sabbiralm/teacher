// app/questions/[id]/page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const QuestionViewPage = () => {
  const params = useParams();
  const questionId = params.id;
  
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [selectedOption, setSelectedOption] = useState(null);
  const [writtenAnswer, setWrittenAnswer] = useState('');
  const [trueFalseAnswer, setTrueFalseAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Mock question data - in real app, this would come from API
  const questionData = {
    id: 1,
    question: "ত্রিভুজের তিনটি কোণের সমষ্টি কত?",
    type: "mcq",
    subject: "গণিত",
    chapter: "জ্যামিতি",
    difficulty: "easy",
    marks: 2,
    timer: 1800, // 30 minutes
    options: [
      "৯০°",
      "১৮০°", 
      "২৭০°",
      "৩৬০°"
    ],
    correctAnswer: 1,
    explanation: "যেকোনো ত্রিভুজের তিনটি কোণের সমষ্টি সর্বদা ১৮০ ডিগ্রী হয়। এটি ইউক্লিডীয় জ্যামিতির একটি মৌলিক উপপাদ্য।",
    hints: [
      "সমবাহু ত্রিভুজের প্রতিটি কোণ ৬০°",
      "সমকোণী ত্রিভুজের একটি কোণ ৯০° হয়",
      "ত্রিভুজের বাহু ও কোণের সম্পর্ক মনে রাখুন"
    ]
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleAutoSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowExplanation(true);
  };

  const handleAutoSubmit = () => {
    setIsSubmitted(true);
    setShowExplanation(true);
    alert('সময় শেষ! আপনার উত্তর স্বয়ংক্রিয়ভাবে জমা দেওয়া হয়েছে।');
  };

  const getAnswerStatus = () => {
    if (questionData.type === 'mcq') {
      return selectedOption === questionData.correctAnswer ? 'correct' : 'incorrect';
    } else if (questionData.type === 'true_false') {
      return trueFalseAnswer === questionData.correctAnswer ? 'correct' : 'incorrect';
    }
    return 'submitted';
  };

  const renderQuestionContent = () => {
    switch (questionData.type) {
      case 'mcq':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900 mb-4">সঠিক বিকল্পটি নির্বাচন করুন:</h4>
            {questionData.options.map((option, index) => (
              <div
                key={index}
                onClick={() => !isSubmitted && setSelectedOption(index)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  isSubmitted
                    ? index === questionData.correctAnswer
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : selectedOption === index
                      ? 'bg-red-100 border-red-500 text-red-800'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                    : selectedOption === index
                    ? 'bg-blue-100 border-blue-500 text-blue-800'
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                    isSubmitted
                      ? index === questionData.correctAnswer
                        ? 'bg-green-500 border-green-500 text-white'
                        : selectedOption === index
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'bg-gray-200 border-gray-300 text-gray-500'
                      : selectedOption === index
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-lg">{option}</span>
                  {isSubmitted && index === questionData.correctAnswer && (
                    <span className="ml-auto bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      সঠিক উত্তর
                    </span>
                  )}
                  {isSubmitted && selectedOption === index && index !== questionData.correctAnswer && (
                    <span className="ml-auto bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      আপনার উত্তর
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case 'written':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900 mb-4">আপনার উত্তর লিখুন:</h4>
            <textarea
              value={writtenAnswer}
              onChange={(e) => !isSubmitted && setWrittenAnswer(e.target.value)}
              placeholder="এখানে আপনার উত্তর টাইপ করুন..."
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
              disabled={isSubmitted}
            />
            {isSubmitted && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h5 className="font-medium text-green-800 mb-2">সঠিক উত্তর:</h5>
                <p className="text-green-700">{questionData.correctAnswer}</p>
              </div>
            )}
          </div>
        );

      case 'true_false':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900 mb-4">সঠিক উত্তর নির্বাচন করুন:</h4>
            <div className="grid grid-cols-2 gap-4">
              {[true, false].map((value) => (
                <div
                  key={value}
                  onClick={() => !isSubmitted && setTrueFalseAnswer(value)}
                  className={`p-6 rounded-xl border-2 cursor-pointer text-center transition-all ${
                    isSubmitted
                      ? value === questionData.correctAnswer
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : trueFalseAnswer === value
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                      : trueFalseAnswer === value
                      ? 'bg-blue-100 border-blue-500 text-blue-800'
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-2">
                    {value ? '✅' : '❌'}
                  </div>
                  <span className="text-lg font-medium">
                    {value ? 'সত্য' : 'মিথ্যা'}
                  </span>
                  {isSubmitted && value === questionData.correctAnswer && (
                    <div className="mt-2 bg-green-500 text-white px-2 py-1 rounded text-sm">
                      সঠিক উত্তর
                    </div>
                  )}
                  {isSubmitted && trueFalseAnswer === value && value !== questionData.correctAnswer && (
                    <div className="mt-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                      আপনার উত্তর
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const answerStatus = getAnswerStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
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
                <Link href="/question-bank" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  প্রশ্ন ব্যাংক
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Timer and Progress */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/question-bank"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>←</span>
              <span>প্রশ্ন ব্যাংকে ফিরে যান</span>
            </Link>
          </div>
          
          <div className={`px-4 py-2 rounded-full font-bold text-lg ${
            timeLeft > 300 
              ? 'bg-green-100 text-green-800' 
              : timeLeft > 60 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            ⏰ {formatTime(timeLeft)}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 mb-6">
          {/* Question Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {questionData.subject}
                  </span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    {questionData.chapter}
                  </span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    {questionData.marks} নম্বর
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 leading-relaxed">
                  {questionData.question}
                </h1>
              </div>
              
              {isSubmitted && (
                <div className={`px-4 py-2 rounded-full font-bold ${
                  answerStatus === 'correct' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {answerStatus === 'correct' ? '✓ সঠিক' : '✗ ভুল'}
                </div>
              )}
            </div>
          </div>

          {/* Question Content */}
          <div className="p-6">
            {renderQuestionContent()}
          </div>

          {/* Action Buttons */}
          {!isSubmitted && (
            <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  {showExplanation ? 'হিন্ট লুকান' : 'হিন্ট দেখুন'}
                </button>
                
                <button
                  onClick={handleSubmit}
                  disabled={
                    (questionData.type === 'mcq' && selectedOption === null) ||
                    (questionData.type === 'written' && writtenAnswer.trim() === '') ||
                    (questionData.type === 'true_false' && trueFalseAnswer === null)
                  }
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  উত্তর জমা দিন
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Hints Section */}
        {showExplanation && questionData.hints && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center">
              <span className="mr-2">💡</span>
              হিন্টস
            </h3>
            <ul className="space-y-2">
              {questionData.hints.map((hint, index) => (
                <li key={index} className="text-yellow-700 flex items-start">
                  <span className="mr-2">•</span>
                  {hint}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Explanation Section */}
        {isSubmitted && showExplanation && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center">
              <span className="mr-2">📚</span>
              ব্যাখ্যা
            </h3>
            <p className="text-blue-700 leading-relaxed">
              {questionData.explanation}
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            <span>←</span>
            <span>পূর্ববর্তী প্রশ্ন</span>
          </button>
          
          {isSubmitted ? (
            <Link 
              href="/question-bank"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              পরবর্তী প্রশ্ন →
            </Link>
          ) : (
            <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              <span>পরবর্তী প্রশ্ন</span>
              <span>→</span>
            </button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">প্রশ্নের অগ্রগতি</span>
            <span className="text-sm font-medium text-gray-700">১/১০</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-blue-600 h-3 rounded-full" style={{ width: '10%' }}></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestionViewPage;