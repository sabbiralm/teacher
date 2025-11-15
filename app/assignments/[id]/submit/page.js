// app/assignments/[id]/submit/page.jsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

const AssignmentSubmitPage = () => {
  const params = useParams();
  const assignmentId = params.id;
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    writtenAnswer: '',
    files: [],
    comments: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock assignment data
  const assignmentData = {
    id: assignmentId,
    title: 'বীজগণিতের মৌলিক সমস্যা সমাধান',
    subject: 'গণিত',
    chapter: 'বীজগণিত',
    dueDate: '২০২৪-০১-২০',
    marks: 20,
    instructions: `
      ১. নিম্নলিখিত সমস্যাগুলো সমাধান করে জমা দিন।
      ২. প্রতিটি ধাপ বিস্তারিতভাবে দেখাতে হবে।
      ৩. হাতে লেখা হলে স্ক্যান করে আপলোড করুন।
      ৪. ডিজিটাল হলে PDF ফরম্যাটে জমা দিন।
    `,
    questions: [
      {
        id: 1,
        question: 'নিচের দ্বিঘাত সমীকরণটি সমাধান করুন: x² - 5x + 6 = 0',
        marks: 5
      },
      {
        id: 2,
        question: 'প্রমাণ করুন যে (a+b)² = a² + 2ab + b²',
        marks: 5
      },
      {
        id: 3,
        question: 'সরল করুন: (3x² + 2x - 1) + (2x² - 3x + 4)',
        marks: 5
      },
      {
        id: 4,
        question: 'নিচের রৈখিক সমীকরণটি লেখচিত্র আঁকুন: y = 2x + 3',
        marks: 5
      }
    ]
  };

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...selectedFiles]
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Submitting:', formData);
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
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
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              উত্তর সফলভাবে জমা দেওয়া হয়েছে!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              আপনার অ্যাসাইনমেন্টটি গ্রহণ করা হয়েছে এবং মূল্যায়নের জন্য প্রেরণ করা হয়েছে।
            </p>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto border border-green-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">জমা দেওয়ার বিবরণ</h3>
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">অ্যাসাইনমেন্ট:</span>
                  <span className="font-medium">{assignmentData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">জমা দেওয়ার সময়:</span>
                  <span className="font-medium">{new Date().toLocaleString('bn-BD')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ফাইল সংখ্যা:</span>
                  <span className="font-medium">{formData.files.length}টি</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-8">
              <Link 
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                ড্যাশবোর্ডে ফিরে যান
              </Link>
              <Link 
                href="/courses"
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                অন্যান্য কোর্স দেখুন
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
                <Link href="/assignments" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  অ্যাসাইনমেন্ট
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
        {/* Assignment Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{assignmentData.title}</h1>
              <div className="flex items-center space-x-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {assignmentData.subject}
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {assignmentData.chapter}
                </span>
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                  {assignmentData.marks} নম্বর
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">জমা দেওয়ার শেষ তারিখ</div>
              <div className="text-red-600 font-medium">{assignmentData.dueDate}</div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
              <span className="mr-2">📋</span>
              নির্দেশাবলী
            </h3>
            <div className="text-yellow-700 whitespace-pre-line text-sm">
              {assignmentData.instructions}
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">প্রশ্নসমূহ</h2>
          <div className="space-y-4">
            {assignmentData.questions.map((q, index) => (
              <div key={q.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {index + 1}. {q.question}
                  </h3>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium">
                    {q.marks} নম্বর
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">উত্তর জমা দিন</h2>

          {/* Written Answer */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-900 mb-3">
              লিখিত উত্তর
            </label>
            <textarea
              name="writtenAnswer"
              value={formData.writtenAnswer}
              onChange={handleInputChange}
              placeholder="এখানে আপনার উত্তর টাইপ করুন... (যদি অনলাইনে উত্তর দিতে চান)"
              className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              আপনি চাইলে ফাইল আপলোড করতে পারেন অথবা সরাসরি এখানে উত্তর টাইপ করতে পারেন
            </p>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-900 mb-3">
              ফাইল আপলোড (ঐচ্ছিক)
            </label>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-4xl mb-4">📎</div>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  ফাইল নির্বাচন করুন
                </p>
                <p className="text-gray-500 text-sm">
                  PDF, Word, বা ইমেজ ফাইল (সর্বোচ্চ ১০MB)
                </p>
              </label>
            </div>

            {/* Uploaded Files List */}
            {formData.files.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">আপলোডকৃত ফাইলসমূহ:</h4>
                <div className="space-y-2">
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-blue-600">📄</span>
                        <div>
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-500">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Additional Comments */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-900 mb-3">
              অতিরিক্ত মন্তব্য (ঐচ্ছিক)
            </label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              placeholder="যেকোনো অতিরিক্ত মন্তব্য বা ব্যাখ্যা..."
              className="w-full h-24 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
            />
          </div>

          {/* Submission Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
              <span className="mr-2">ℹ️</span>
              জমা দেওয়ার আগে নিশ্চিত করুন
            </h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• সব প্রশ্নের উত্তর দেওয়া হয়েছে কিনা</li>
              <li>• ফাইলগুলো সঠিকভাবে আপলোড হয়েছে কিনা</li>
              <li>• উত্তরগুলো নির্দেশনা অনুযায়ী দেওয়া হয়েছে কিনা</li>
              <li>• একবার জমা দিলে আর এডিট করা যাবে না</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <Link 
              href="/assignments"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              বাতিল করুন
            </Link>
            
            <button
              type="submit"
              disabled={isSubmitting || (!formData.writtenAnswer && formData.files.length === 0)}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>জমা হচ্ছে...</span>
                </>
              ) : (
                <>
                  <span>✅</span>
                  <span>উত্তর জমা দিন</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AssignmentSubmitPage;