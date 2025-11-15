'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ExamCard from '@/components/ExamCard'

export default function Exams() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [showCreateExam, setShowCreateExam] = useState(false)
  const [newExam, setNewExam] = useState({
    title: '',
    subject: '',
    date: '',
    duration: '',
    totalMarks: '',
    description: ''
  })

  // Sample exam data
  const exams = {
    upcoming: [
      {
        id: 1,
        title: 'পাইথন প্রোগ্রামিং মিড টার্ম পরীক্ষা',
        subject: 'কম্পিউটার বিজ্ঞান',
        teacher: 'ড. সুমনা খান',
        date: '২০২৩-১২-০৫',
        time: '১০:০০ AM',
        duration: '২ ঘন্টা',
        totalMarks: 100,
        status: 'upcoming',
        description: 'পাইথন প্রোগ্রামিং এর বেসিক থেকে এডভান্সড পর্যন্ত সকল টপিক কভার করা হবে।'
      },
      {
        id: 2,
        title: 'ডাটা স্ট্রাকচার অ্যাসাইনমেন্ট',
        subject: 'কম্পিউটার বিজ্ঞান',
        teacher: 'ড. সুমনা খান',
        date: '২০২৩-১২-১০',
        time: '১১:৩০ AM',
        duration: '৩ ঘন্টা',
        totalMarks: 50,
        status: 'upcoming',
        description: 'লিংকড লিস্ট, স্ট্যাক এবং কিউ এর উপর প্র্যাকটিক্যাল অ্যাসাইনমেন্ট।'
      }
    ],
    ongoing: [
      {
        id: 3,
        title: 'ওয়েব ডেভেলপমেন্ট কুইজ',
        subject: 'কম্পিউটার বিজ্ঞান',
        teacher: 'ড. সুমনা খান',
        date: '২০২৩-১১-২০',
        time: '০২:০০ PM',
        duration: '১ ঘন্টা',
        totalMarks: 30,
        status: 'ongoing',
        description: 'HTML, CSS এবং JavaScript এর বেসিক কনসেপ্ট নিয়ে কুইজ।',
        timeRemaining: '২৫ মিনিট'
      }
    ],
    completed: [
      {
        id: 4,
        title: 'অবজেক্ট ওরিয়েন্টেড প্রোগ্রামিং ফাইনাল',
        subject: 'কম্পিউটার বিজ্ঞান',
        teacher: 'ড. সুমনা খান',
        date: '২০২৩-১১-১০',
        time: '০৯:০০ AM',
        duration: '২ ঘন্টা',
        totalMarks: 100,
        status: 'completed',
        description: 'OOP এর সকল কনসেপ্ট এবং Java প্রোগ্রামিং নিয়ে ফাইনাল পরীক্ষা।',
        obtainedMarks: 85,
        grade: 'A'
      },
      {
        id: 5,
        title: 'ডাটাবেস ম্যানেজমেন্ট সিস্টেম',
        subject: 'কম্পিউটার বিজ্ঞান',
        teacher: 'প্রফেসর রেজাউল করিম',
        date: '২০২৩-১১-০৫',
        time: '১০:৩০ AM',
        duration: '২.৫ ঘন্টা',
        totalMarks: 100,
        status: 'completed',
        description: 'SQL, Normalization এবং Database Design নিয়ে পরীক্ষা।',
        obtainedMarks: 78,
        grade: 'B+'
      }
    ]
  }

  const handleCreateExam = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Creating new exam:', newExam)
    setShowCreateExam(false)
    setNewExam({
      title: '',
      subject: '',
      date: '',
      duration: '',
      totalMarks: '',
      description: ''
    })
    // Show success message
    alert('পরীক্ষা সফলভাবে তৈরি হয়েছে!')
  }

  const startExam = (examId) => {
    // Navigate to exam page or start the exam
    alert(`পরীক্ষা শুরু হচ্ছে: ${examId}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">পরীক্ষা ব্যবস্থাপনা</h1>
          <button 
            onClick={() => setShowCreateExam(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 flex items-center space-x-2"
          >
            <i className="fas fa-plus"></i>
            <span>নতুন পরীক্ষা তৈরি করুন</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'upcoming'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                আসন্ন পরীক্ষা
                <span className="ml-2 bg-blue-100 text-blue-600 py-1 px-2 rounded-full text-xs">
                  {exams.upcoming.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('ongoing')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'ongoing'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                চলমান পরীক্ষা
                <span className="ml-2 bg-green-100 text-green-600 py-1 px-2 rounded-full text-xs">
                  {exams.ongoing.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'completed'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                সম্পন্ন পরীক্ষা
                <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                  {exams.completed.length}
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams[activeTab].map(exam => (
            <ExamCard 
              key={exam.id} 
              exam={exam} 
              onStartExam={startExam}
            />
          ))}
        </div>

        {exams[activeTab].length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-clipboard-list text-gray-300 text-6xl mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-500 mb-2">কোনো পরীক্ষা পাওয়া যায়নি</h3>
            <p className="text-gray-400">
              {activeTab === 'upcoming' && 'বর্তমানে কোনো আসন্ন পরীক্ষা নেই।'}
              {activeTab === 'ongoing' && 'বর্তমানে কোনো চলমান পরীক্ষা নেই।'}
              {activeTab === 'completed' && 'এখনও কোনো পরীক্ষা সম্পন্ন হয়নি।'}
            </p>
          </div>
        )}

        {/* Create Exam Modal */}
        {showCreateExam && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800">নতুন পরীক্ষা তৈরি করুন</h3>
              </div>
              
              <form onSubmit={handleCreateExam} className="p-6 space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">পরীক্ষার শিরোনাম</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="পরীক্ষার শিরোনাম লিখুন"
                    value={newExam.title}
                    onChange={(e) => setNewExam({...newExam, title: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">বিষয়</label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newExam.subject}
                      onChange={(e) => setNewExam({...newExam, subject: e.target.value})}
                      required
                    >
                      <option value="">বিষয় নির্বাচন করুন</option>
                      <option value="কম্পিউটার বিজ্ঞান">কম্পিউটার বিজ্ঞান</option>
                      <option value="গণিত">গণিত</option>
                      <option value="পদার্থবিজ্ঞান">পদার্থবিজ্ঞান</option>
                      <option value="রসায়ন">রসায়ন</option>
                      <option value="ইংরেজি">ইংরেজি</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">মোট নম্বর</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="মোট নম্বর"
                      value={newExam.totalMarks}
                      onChange={(e) => setNewExam({...newExam, totalMarks: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">তারিখ</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newExam.date}
                      onChange={(e) => setNewExam({...newExam, date: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">সময়</label>
                    <input 
                      type="time" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newExam.duration}
                      onChange={(e) => setNewExam({...newExam, duration: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">বর্ণনা</label>
                  <textarea 
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="পরীক্ষার বিস্তারিত বর্ণনা লিখুন"
                    value={newExam.description}
                    onChange={(e) => setNewExam({...newExam, description: e.target.value})}
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowCreateExam(false)}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
                  >
                    বাতিল
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    পরীক্ষা তৈরি করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}