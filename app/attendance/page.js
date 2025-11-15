'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Attendance() {
  const [selectedClass, setSelectedClass] = useState('python-2023')
  const [dateRange, setDateRange] = useState('today')
  const [showQR, setShowQR] = useState(false)

  const classes = [
    { id: 'python-2023', name: 'পাইথন প্রোগ্রামিং - ব্যাচ ২০২৩', students: 25 },
    { id: 'web-dev', name: 'ওয়েব ডেভেলপমেন্ট - এডভান্সড', students: 18 },
    { id: 'data-science', name: 'ডাটা সায়েন্স বেসিক', students: 22 }
  ]

  const attendanceData = {
    'python-2023': [
      {
        id: 1,
        name: 'আনিকা ইসলাম',
        roll: '2023001',
        attendance: [
          { date: '২০২৩-১১-২০', status: 'present', time: '১০:০৫ AM' },
          { date: '২০২৩-১১-১৯', status: 'present', time: '১০:০২ AM' },
          { date: '২০২৩-১১-১৮', status: 'absent', time: '-' },
          { date: '২০২৩-১১-১৭', status: 'late', time: '১০:১৫ AM' },
          { date: '২০২৩-১১-১৬', status: 'present', time: '১০:০০ AM' }
        ],
        present: 4,
        absent: 1,
        late: 1,
        percentage: 80
      },
      {
        id: 2,
        name: 'রহিম আহমেদ',
        roll: '2023002',
        attendance: [
          { date: '২০২৩-১১-২০', status: 'present', time: '১০:০০ AM' },
          { date: '২০২৩-১১-১৯', status: 'present', time: '১০:০১ AM' },
          { date: '২০২৩-১১-১৮', status: 'present', time: '১০:০৩ AM' },
          { date: '২০২৩-১১-১৭', status: 'present', time: '১০:০০ AM' },
          { date: '২০২৩-১১-১৬', status: 'present', time: '১০:০২ AM' }
        ],
        present: 5,
        absent: 0,
        late: 0,
        percentage: 100
      }
    ]
  }

  const todayStats = {
    total: 25,
    present: 20,
    absent: 3,
    late: 2,
    percentage: 80
  }

  const takeAttendance = () => {
    // Attendance taking logic
    alert('উপস্থিতি নেওয়া শুরু হয়েছে!')
  }

  const generateQR = () => {
    setShowQR(true)
    // QR generation logic
  }

  const exportReport = () => {
    // Export logic
    alert('উপস্থিতি রিপোর্ট ডাউনলোড করা হয়েছে!')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">উপস্থিতি ব্যবস্থাপনা</h1>
            <p className="text-gray-600 mt-2">স্বয়ংক্রিয় উপস্থিতি ট্র্যাকিং এবং রিপোর্টিং</p>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={generateQR}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 flex items-center space-x-2"
            >
              <i className="fas fa-qrcode"></i>
              <span>QR কোড তৈরি করুন</span>
            </button>
            <button 
              onClick={takeAttendance}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 flex items-center space-x-2"
            >
              <i className="fas fa-check-circle"></i>
              <span>উপস্থিতি নিন</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Class Selection */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">ক্লাস নির্বাচন</h3>
              <div className="space-y-3">
                {classes.map(classItem => (
                  <button
                    key={classItem.id}
                    onClick={() => setSelectedClass(classItem.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition duration-300 ${
                      selectedClass === classItem.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{classItem.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{classItem.students} শিক্ষার্থী</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Today's Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">আজকের উপস্থিতি</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">উপস্থিত</p>
                    <p className="text-2xl font-bold text-green-600">{todayStats.present}</p>
                  </div>
                  <i className="fas fa-user-check text-green-500 text-2xl"></i>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">অনুপস্থিত</p>
                    <p className="text-2xl font-bold text-red-600">{todayStats.absent}</p>
                  </div>
                  <i className="fas fa-user-times text-red-500 text-2xl"></i>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">লেট</p>
                    <p className="text-2xl font-bold text-yellow-600">{todayStats.late}</p>
                  </div>
                  <i className="fas fa-clock text-yellow-500 text-2xl"></i>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">উপস্থিতির হার</p>
                    <p className="text-2xl font-bold text-blue-600">{todayStats.percentage}%</p>
                  </div>
                  <i className="fas fa-chart-pie text-blue-500 text-2xl"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-lg shadow-md">
              <div className="border-b border-gray-200">
                <div className="flex justify-between items-center p-6">
                  <h2 className="text-2xl font-bold text-gray-800">উপস্থিতি রেকর্ড</h2>
                  <div className="flex space-x-3">
                    <select 
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="input-field"
                    >
                      <option value="today">আজ</option>
                      <option value="week">এই সপ্তাহ</option>
                      <option value="month">এই মাস</option>
                      <option value="custom">কাস্টম</option>
                    </select>
                    <button 
                      onClick={exportReport}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
                    >
                      <i className="fas fa-download mr-2"></i>
                      এক্সপোর্ট
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Attendance Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{todayStats.present}</div>
                    <div className="text-sm text-gray-600">উপস্থিত</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">{todayStats.absent}</div>
                    <div className="text-sm text-gray-600">অনুপস্থিত</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-600">{todayStats.late}</div>
                    <div className="text-sm text-gray-600">লেট</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{todayStats.percentage}%</div>
                    <div className="text-sm text-gray-600">উপস্থিতির হার</div>
                  </div>
                </div>

                {/* Attendance Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          শিক্ষার্থী
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          রোল
                        </th>
                        {attendanceData[selectedClass]?.[0]?.attendance.map((day, index) => (
                          <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {day.date}
                          </th>
                        ))}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          উপস্থিতি
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          কর্ম
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {attendanceData[selectedClass]?.map(student => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                                {student.name.charAt(0)}
                              </div>
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.roll}
                          </td>
                          {student.attendance.map((att, index) => (
                            <td key={index} className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                att.status === 'present' 
                                  ? 'bg-green-100 text-green-800'
                                  : att.status === 'absent'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {att.status === 'present' && '✅ উপস্থিত'}
                                {att.status === 'absent' && '❌ অনুপস্থিত'}
                                {att.status === 'late' && '⚠️ লেট'}
                                {att.time && ` (${att.time})`}
                              </span>
                            </td>
                          ))}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full" 
                                  style={{ width: `${student.percentage}%` }}
                                ></div>
                              </div>
                              <span>{student.percentage}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              এডিট
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              রিপোর্ট
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">দ্রুত উপস্থিতি</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition duration-300 flex flex-col items-center">
                      <i className="fas fa-check-circle text-2xl mb-2"></i>
                      <span>সবাই উপস্থিত</span>
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition duration-300 flex flex-col items-center">
                      <i className="fas fa-times-circle text-2xl mb-2"></i>
                      <span>সবাই অনুপস্থিত</span>
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition duration-300 flex flex-col items-center">
                      <i className="fas fa-undo text-2xl mb-2"></i>
                      <span>রিসেট করুন</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Modal */}
        {showQR && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">উপস্থিতি QR কোড</h3>
                <button 
                  onClick={() => setShowQR(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-100 p-8 rounded-lg mb-4 flex items-center justify-center">
                  {/* QR Code Placeholder */}
                  <div className="text-center">
                    <div className="text-6xl mb-4">📱</div>
                    <p className="text-gray-600">QR কোড এখানে দেখানো হবে</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  শিক্ষার্থীরা এই QR কোড স্ক্যান করে উপস্থিতি মার্ক করতে পারবে
                </p>
                
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300">
                    ডাউনলোড করুন
                  </button>
                  <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition duration-300">
                    শেয়ার করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}