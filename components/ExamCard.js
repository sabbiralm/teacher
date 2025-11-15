'use client'
import { useState } from 'react'

export default function ExamCard({ exam, onStartExam }) {
  const [showDetails, setShowDetails] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'ongoing':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming':
        return 'আসন্ন'
      case 'ongoing':
        return 'চলমান'
      case 'completed':
        return 'সম্পন্ন'
      default:
        return status
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-800">{exam.title}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(exam.status)}`}>
            {getStatusText(exam.status)}
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <i className="fas fa-book-open w-5 mr-2"></i>
            <span>{exam.subject}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <i className="fas fa-user-graduate w-5 mr-2"></i>
            <span>{exam.teacher}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <i className="fas fa-calendar-alt w-5 mr-2"></i>
            <span>{exam.date} | {exam.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <i className="fas fa-clock w-5 mr-2"></i>
            <span>{exam.duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <i className="fas fa-star w-5 mr-2"></i>
            <span>মোট নম্বর: {exam.totalMarks}</span>
          </div>
          
          {exam.status === 'completed' && (
            <>
              <div className="flex items-center text-green-600 font-semibold">
                <i className="fas fa-trophy w-5 mr-2"></i>
                <span>প্রাপ্ত নম্বর: {exam.obtainedMarks}/{exam.totalMarks}</span>
              </div>
              <div className="flex items-center text-blue-600 font-semibold">
                <i className="fas fa-grade w-5 mr-2"></i>
                <span>গ্রেড: {exam.grade}</span>
              </div>
            </>
          )}
          
          {exam.status === 'ongoing' && exam.timeRemaining && (
            <div className="flex items-center text-red-600 font-semibold">
              <i className="fas fa-hourglass-half w-5 mr-2"></i>
              <span>সময় বাকি: {exam.timeRemaining}</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-500 hover:text-blue-600 font-medium flex items-center space-x-1"
          >
            <span>{showDetails ? 'কম দেখান' : 'বিস্তারিত দেখুন'}</span>
            <i className={`fas fa-chevron-${showDetails ? 'up' : 'down'} text-sm`}></i>
          </button>
          
          {exam.status === 'upcoming' && (
            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300">
              শীঘ্রই আসছে
            </button>
          )}
          
          {exam.status === 'ongoing' && (
            <button 
              onClick={() => onStartExam(exam.id)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 flex items-center space-x-2"
            >
              <i className="fas fa-play"></i>
              <span>পরীক্ষা শুরু করুন</span>
            </button>
          )}
          
          {exam.status === 'completed' && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
              ফলাফল দেখুন
            </button>
          )}
        </div>

        {showDetails && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">পরীক্ষার বিস্তারিত:</h4>
            <p className="text-gray-700">{exam.description}</p>
            
            {exam.status === 'completed' && (
              <div className="mt-3 p-3 bg-white rounded border">
                <h5 className="font-semibold mb-2">ফলাফল বিশ্লেষণ:</h5>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full" 
                    style={{ width: `${(exam.obtainedMarks / exam.totalMarks) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  আপনি {exam.obtainedMarks} নম্বর পেয়েছেন যা {exam.totalMarks} এর {(exam.obtainedMarks / exam.totalMarks) * 100}%
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}