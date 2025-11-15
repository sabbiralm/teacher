// app/teacher/check-answers/page.jsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const AnswerCheckingPage = () => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [evaluationData, setEvaluationData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock data - submitted answers by students
  const submissionsData = [
    {
      id: 1,
      student: {
        name: 'আহমেদ হাসান',
        roll: '০১',
        class: 'নবম',
        avatar: 'আ'
      },
      assignment: {
        title: 'বীজগণিতের মৌলিক সমস্যা সমাধান',
        subject: 'গণিত',
        chapter: 'বীজগণিত',
        totalMarks: 20,
        dueDate: '২০২৪-০১-২০',
        submittedAt: '২০২৪-০১-১৮, ১০:৩০ AM'
      },
      answers: [
        {
          id: 1,
          question: 'নিচের দ্বিঘাত সমীকরণটি সমাধান করুন: x² - 5x + 6 = 0',
          type: 'written',
          studentAnswer: 'x² - 5x + 6 = 0\n=> (x-2)(x-3) = 0\n=> x = 2, 3',
          marks: 5,
          obtainedMarks: 0,
          teacherFeedback: '',
          status: 'pending' // pending, evaluated
        },
        {
          id: 2,
          question: 'প্রমাণ করুন যে (a+b)² = a² + 2ab + b²',
          type: 'written',
          studentAnswer: 'বাম পক্ষ = (a+b)² = (a+b)(a+b) = a² + ab + ba + b² = a² + 2ab + b² = ডান পক্ষ',
          marks: 5,
          obtainedMarks: 0,
          teacherFeedback: '',
          status: 'pending'
        },
        {
          id: 3,
          question: 'সরল করুন: (3x² + 2x - 1) + (2x² - 3x + 4)',
          type: 'written',
          studentAnswer: '3x² + 2x² = 5x², 2x - 3x = -x, -1 + 4 = 3\nসুতরাং উত্তর: 5x² - x + 3',
          marks: 5,
          obtainedMarks: 0,
          teacherFeedback: '',
          status: 'pending'
        },
        {
          id: 4,
          question: 'নিচের রৈখিক সমীকরণটি লেখচিত্র আঁকুন: y = 2x + 3',
          type: 'written',
          studentAnswer: 'গ্রাফে দেখানো হয়েছে যে যখন x=0, y=3 এবং যখন x=1, y=5। এই দুই বিন্দু যোগ করে সরলরেখা আঁকা হয়েছে।',
          marks: 5,
          obtainedMarks: 0,
          teacherFeedback: '',
          status: 'pending'
        }
      ],
      overallFeedback: '',
      status: 'pending' // pending, in-progress, evaluated
    },
    {
      id: 2,
      student: {
        name: 'সাদিয়া ইসলাম',
        roll: '০২',
        class: 'নবম',
        avatar: 'স'
      },
      assignment: {
        title: 'বীজগণিতের মৌলিক সমস্যা সমাধান',
        subject: 'গণিত',
        chapter: 'বীজগণিত',
        totalMarks: 20,
        dueDate: '২০২৪-০১-২০',
        submittedAt: '২০২৪-০১-১৮, ১১:১৫ AM'
      },
      answers: [
        {
          id: 1,
          question: 'নিচের দ্বিঘাত সমীকরণটি সমাধান করুন: x² - 5x + 6 = 0',
          type: 'written',
          studentAnswer: 'x = 2, 3',
          marks: 5,
          obtainedMarks: 4,
          teacherFeedback: 'সঠিক উত্তর, কিন্তু ধাপগুলো দেখানো হয়নি',
          status: 'evaluated'
        },
        {
          id: 2,
          question: 'প্রমাণ করুন যে (a+b)² = a² + 2ab + b²',
          type: 'written',
          studentAnswer: '(a+b)² = a² + 2ab + b²',
          marks: 5,
          obtainedMarks: 2,
          teacherFeedback: 'শুধু সূত্রটি লিখেছেন, প্রমাণ করেননি',
          status: 'evaluated'
        },
        {
          id: 3,
          question: 'সরল করুন: (3x² + 2x - 1) + (2x² - 3x + 4)',
          type: 'written',
          studentAnswer: '5x² - x + 3',
          marks: 5,
          obtainedMarks: 5,
          teacherFeedback: 'নির্ভুল উত্তর',
          status: 'evaluated'
        },
        {
          id: 4,
          question: 'নিচের রৈখিক সমীকরণটি লেখচিত্র আঁকুন: y = 2x + 3',
          type: 'written',
          studentAnswer: 'গ্রাফ জমা দেওয়া হয়েছে',
          marks: 5,
          obtainedMarks: 3,
          teacherFeedback: 'গ্রাফ সঠিক, কিন্তু লেবেল করা হয়নি',
          status: 'evaluated'
        }
      ],
      overallFeedback: 'ভালো প্রচেষ্টা, কিন্তু গণনার ধাপগুলো বিস্তারিত দেখাতে হবে।',
      status: 'evaluated'
    },
    {
      id: 3,
      student: {
        name: 'রফিক আহমেদ',
        roll: '০৩',
        class: 'নবম',
        avatar: 'র'
      },
      assignment: {
        title: 'বীজগণিতের মৌলিক সমস্যা সমাধান',
        subject: 'গণিত',
        chapter: 'বীজগণিত',
        totalMarks: 20,
        dueDate: '২০২৪-০১-২০',
        submittedAt: '২০২৪-০১-১৭, ০৩:৪৫ PM'
      },
      answers: [
        {
          id: 1,
          question: 'নিচের দ্বিঘাত সমীকরণটি সমাধান করুন: x² - 5x + 6 = 0',
          type: 'written',
          studentAnswer: 'x² - 5x + 6 = 0\n=> x = [5 ± √(25-24)]/2\n=> x = [5 ± 1]/2\n=> x = 3, 2',
          marks: 5,
          obtainedMarks: 0,
          teacherFeedback: '',
          status: 'pending'
        },
        {
          id: 2,
          question: 'প্রমাণ করুন যে (a+b)² = a² + 2ab + b²',
          type: 'written',
          studentAnswer: 'LHS = (a+b)² = a² + 2ab + b² = RHS',
          marks: 5,
          obtainedMarks: 0,
          teacherFeedback: '',
          status: 'pending'
        },
        {
          id: 3,
          question: 'সরল করুন: (3x² + 2x - 1) + (2x² - 3x + 4)',
          type: 'written',
          studentAnswer: '5x² - x + 3',
          marks: 5,
          obtainedMarks: 0,
          teacherFeedback: '',
          status: 'pending'
        },
        {
          id: 4,
          question: 'নিচের রৈখিক সমীকরণটি লেখচিত্র আঁকুন: y = 2x + 3',
          type: 'written',
          studentAnswer: '',
          marks: 5,
          obtainedMarks: 0,
          teacherFeedback: '',
          status: 'pending'
        }
      ],
      overallFeedback: '',
      status: 'in-progress'
    }
  ];

  const handleMarkChange = (questionId, marks) => {
    if (selectedSubmission) {
      const updatedAnswers = selectedSubmission.answers.map(answer =>
        answer.id === questionId 
          ? { ...answer, obtainedMarks: Math.min(marks, answer.marks) }
          : answer
      );
      
      setSelectedSubmission(prev => ({
        ...prev,
        answers: updatedAnswers
      }));

      // Update evaluation data
      setEvaluationData(prev => ({
        ...prev,
        [questionId]: {
          ...prev[questionId],
          obtainedMarks: Math.min(marks, selectedSubmission.answers.find(a => a.id === questionId)?.marks || 0)
        }
      }));
    }
  };

  const handleFeedbackChange = (questionId, feedback) => {
    if (selectedSubmission) {
      const updatedAnswers = selectedSubmission.answers.map(answer =>
        answer.id === questionId 
          ? { ...answer, teacherFeedback: feedback, status: 'evaluated' }
          : answer
      );
      
      setSelectedSubmission(prev => ({
        ...prev,
        answers: updatedAnswers
      }));

      setEvaluationData(prev => ({
        ...prev,
        [questionId]: {
          ...prev[questionId],
          teacherFeedback: feedback
        }
      }));
    }
  };

  const handleOverallFeedbackChange = (feedback) => {
    if (selectedSubmission) {
      setSelectedSubmission(prev => ({
        ...prev,
        overallFeedback: feedback
      }));
    }
  };

  const calculateTotalMarks = (answers) => {
    return answers.reduce((total, answer) => total + (answer.obtainedMarks || 0), 0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'evaluated': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'evaluated': return 'মূল্যায়ন completed';
      case 'in-progress': return 'মূল্যায়ন underway';
      case 'pending': return 'মূল্যায়ন pending';
      default: return 'অবস্থা অজানা';
    }
  };

  const EvaluationInterface = ({ submission }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Student Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {submission.student.avatar}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{submission.student.name}</h2>
              <p className="text-gray-600">
                রোল: {submission.student.roll} • {submission.student.class} • জমা: {submission.assignment.submittedAt}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
              {getStatusText(submission.status)}
            </div>
            <div className="text-lg font-bold text-gray-900 mt-2">
              মোট: {calculateTotalMarks(submission.answers)}/{submission.assignment.totalMarks}
            </div>
          </div>
        </div>
      </div>

      {/* Questions Evaluation */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">প্রশ্নভিত্তিক মূল্যায়ন</h3>
        
        <div className="space-y-6">
          {submission.answers.map((answer, index) => (
            <div key={answer.id} className="border border-gray-200 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {index + 1}. {answer.question}
                  </h4>
                  <div className="flex items-center space-x-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      {answer.marks} নম্বর
                    </span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      answer.status === 'evaluated' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {answer.status === 'evaluated' ? 'মূল্যায়ন completed' : 'মূল্যায়ন প্রয়োজন'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Student Answer */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  শিক্ষার্থীর উত্তর:
                </label>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-gray-800 whitespace-pre-line">
                    {answer.studentAnswer || 'কোন উত্তর দেওয়া হয়নি'}
                  </p>
                </div>
              </div>

              {/* Marking Interface */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    নম্বর দিন (০-{answer.marks}):
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      min="0"
                      max={answer.marks}
                      value={answer.obtainedMarks || 0}
                      onChange={(e) => handleMarkChange(answer.id, parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span className="text-gray-600">/ {answer.marks}</span>
                    <div className={`w-3 h-3 rounded-full ${
                      answer.obtainedMarks === answer.marks ? 'bg-green-500' :
                      answer.obtainedMarks >= answer.marks * 0.5 ? 'bg-yellow-500' :
                      answer.obtainedMarks > 0 ? 'bg-orange-500' : 'bg-gray-300'
                    }`}></div>
                  </div>

                  {/* Quick Marks Buttons */}
                  <div className="flex space-x-2 mt-3">
                    {[0, Math.floor(answer.marks/2), answer.marks].map(mark => (
                      <button
                        key={mark}
                        onClick={() => handleMarkChange(answer.id, mark)}
                        className={`px-3 py-1 text-sm rounded border ${
                          answer.obtainedMarks === mark
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {mark}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ফিডব্যাক দিন:
                  </label>
                  <textarea
                    value={answer.teacherFeedback || ''}
                    onChange={(e) => handleFeedbackChange(answer.id, e.target.value)}
                    placeholder="শিক্ষার্থীকে ফিডব্যাক দিন... যেমন: ভালো হয়েছে, উন্নতির প্রয়োজন ইত্যাদি"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Feedback */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            সামগ্রিক ফিডব্যাক
          </label>
          <textarea
            value={submission.overallFeedback || ''}
            onChange={(e) => handleOverallFeedbackChange(e.target.value)}
            placeholder="শিক্ষার্থীর সামগ্রিক performance সম্পর্কে feedback দিন..."
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => setSelectedSubmission(null)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            তালিকায় ফিরে যান
          </button>
          
          <div className="space-x-3">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              খসড়া সেভ
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              মূল্যায়ন সম্পন্ন
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
                <Link href="/teacher/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  টিচার ড্যাশবোর্ড
                </Link>
                <Link href="/question-bank" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  প্রশ্ন ব্যাংক
                </Link>
                <Link href="/teacher/create-question" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  প্রশ্ন তৈরি
                </Link>
                <Link href="/teacher/check-answers" className="bg-blue-100 text-blue-700 px-3 py-2 rounded-md font-medium">
                  উত্তর চেক
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">উত্তর মূল্যায়ন</h1>
          <p className="text-xl text-gray-600">শিক্ষার্থীদের জমা দেওয়া উত্তরগুলো চেক করুন এবং নম্বর দিন</p>
        </div>

        {selectedSubmission ? (
          <EvaluationInterface submission={selectedSubmission} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Statistics */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{submissionsData.length}</div>
                  <div className="text-sm text-gray-600">মোট জমা</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">
                    {submissionsData.filter(s => s.status === 'evaluated').length}
                  </div>
                  <div className="text-sm text-gray-600">মূল্যায়ন completed</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-600">
                    {submissionsData.filter(s => s.status === 'in-progress').length}
                  </div>
                  <div className="text-sm text-gray-600">চলমান</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">
                    {submissionsData.filter(s => s.status === 'pending').length}
                  </div>
                  <div className="text-sm text-gray-600">বাকি</div>
                </div>
              </div>
            </div>

            {/* Submissions List */}
            {submissionsData.map((submission, index) => (
              <div
                key={submission.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedSubmission(submission)}
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {submission.student.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{submission.student.name}</h3>
                      <p className="text-sm text-gray-600">
                        রোল: {submission.student.roll} • {submission.assignment.subject}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
                      {getStatusText(submission.status)}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>জমা দেওয়ার সময়:</span>
                      <span className="font-medium">{submission.assignment.submittedAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>প্রাপ্ত নম্বর:</span>
                      <span className="font-bold text-gray-900">
                        {calculateTotalMarks(submission.answers)}/{submission.assignment.totalMarks}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>মূল্যায়নকৃত প্রশ্ন:</span>
                      <span className="font-medium">
                        {submission.answers.filter(a => a.status === 'evaluated').length}/{submission.answers.length}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {submission.assignment.title}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        মূল্যায়ন করুন →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AnswerCheckingPage;