'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Grades() {
  const [selectedClass, setSelectedClass] = useState('python-2023')
  const [activeTab, setActiveTab] = useState('overview')
  const [gradingScale, setGradingScale] = useState([
    { grade: 'A+', min: 90, max: 100, points: 4.0 },
    { grade: 'A', min: 85, max: 89, points: 3.7 },
    { grade: 'A-', min: 80, max: 84, points: 3.3 },
    { grade: 'B+', min: 75, max: 79, points: 3.0 },
    { grade: 'B', min: 70, max: 74, points: 2.7 },
    { grade: 'C+', min: 65, max: 69, points: 2.3 },
    { grade: 'C', min: 60, max: 64, points: 2.0 },
    { grade: 'D', min: 50, max: 59, points: 1.0 },
    { grade: 'F', min: 0, max: 49, points: 0.0 }
  ])

  const classes = [
    { id: 'python-2023', name: 'পাইথন প্রোগ্রামিং - ব্যাচ ২০২৩', students: 25 },
    { id: 'web-dev', name: 'ওয়েব ডেভেলপমেন্ট - এডভান্সড', students: 18 }
  ]

  const gradeData = {
    'python-2023': [
      {
        id: 1,
        name: 'আনিকা ইসলাম',
        roll: '2023001',
        assignments: [85, 90, 88, 92],
        quizzes: [95, 88, 92],
        midterm: 89,
        final: 93,
        projects: 95,
        total: 90.5,
        grade: 'A+',
        gpa: 4.0
      },
      {
        id: 2,
        name: 'রহিম আহমেদ',
        roll: '2023002',
        assignments: [78, 82, 85, 80],
        quizzes: [85, 80, 78],
        midterm: 82,
        final: 85,
        projects: 88,
        total: 83.2,
        grade: 'A-',
        gpa: 3.3
      }
    ]
  }

  const calculateGrade = (total) => {
    const scale = gradingScale.find(s => total >= s.min && total <= s.max)
    return scale || { grade: 'N/A', points: 0.0 }
  }

  const exportGradebook = () => {
    alert('গ্রেডবুক এক্সপোর্ট করা হয়েছে!')
  }

  const publishGrades = () => {
    alert('গ্রেডস প্রকাশ করা হয়েছে!')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">গ্রেড ব্যবস্থাপনা</h1>
            <p className="text-gray-600 mt-2">গ্রেড ক্যালকুলেশন, ট্র্যাকিং এবং রিপোর্টিং</p>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={exportGradebook}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 flex items-center space-x-2"
            >
              <i className="fas fa-download"></i>
              <span>এক্সপোর্ট</span>
            </button>
            <button 
              onClick={publishGrades}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 flex items-center space-x-2"
            >
              <i className="fas fa-share"></i>
              <span>গ্রেডস প্রকাশ করুন</span>
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

            {/* Grading Scale */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">গ্রেডিং স্কেল</h3>
              <div className="space-y-2">
                {gradingScale.map((scale, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium text-gray-800">{scale.grade}</span>
                      <span className="text-sm text-gray-600 ml-2">
                        ({scale.min}-{scale.max}%)
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{scale.points}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">গ্রেড পরিসংখ্যান</h3>
              <div className="space-y-3">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">৮৫.২%</div>
                  <div className="text-sm text-gray-600">গড় স্কোর</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">৩.৫</div>
                  <div className="text-sm text-gray-600">গড় GPA</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">৮</div>
                  <div className="text-sm text-gray-600">A+ গ্রেড</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-lg shadow-md">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  {[
                    { id: 'overview', name: 'ওভারভিউ', icon: 'fa-chart-bar' },
                    { id: 'gradebook', name: 'গ্রেডবুক', icon: 'fa-book' },
                    { id: 'distribution', name: 'ডিস্ট্রিবিউশন', icon: 'fa-chart-pie' },
                    { id: 'settings', name: 'সেটিংস', icon: 'fa-cog' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-6 text-center border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <i className={`fas ${tab.icon}`}></i>
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Grade Distribution Chart */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold mb-4 text-gray-800">গ্রেড ডিস্ট্রিবিউশন</h4>
                      <div className="space-y-3">
                        {[
                          { grade: 'A+', count: 8, percentage: 32 },
                          { grade: 'A', count: 6, percentage: 24 },
                          { grade: 'A-', count: 4, percentage: 16 },
                          { grade: 'B+', count: 3, percentage: 12 },
                          { grade: 'B', count: 2, percentage: 8 },
                          { grade: 'C+', count: 1, percentage: 4 },
                          { grade: 'F', count: 1, percentage: 4 }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center space-x-4">
                            <div className="w-12 text-sm font-medium text-gray-600">{item.grade}</div>
                            <div className="flex-grow">
                              <div className="w-full bg-gray-200 rounded-full h-4">
                                <div 
                                  className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                                  style={{ width: `${item.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="w-20 text-sm text-gray-600 text-right">
                              {item.count} শিক্ষার্থী ({item.percentage}%)
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-green-50 p-6 rounded-lg text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">৮৫.২%</div>
                        <div className="text-gray-600">গড় স্কোর</div>
                      </div>
                      <div className="bg-blue-50 p-6 rounded-lg text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">৩.৫</div>
                        <div className="text-gray-600">গড় GPA</div>
                      </div>
                      <div className="bg-purple-50 p-6 rounded-lg text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">৯২%</div>
                        <div className="text-gray-600">পাসের হার</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'gradebook' && (
                  <div className="space-y-6">
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              অ্যাসাইনমেন্ট
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              কুইজ
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              মিডটার্ম
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              ফাইনাল
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              প্রজেক্ট
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              মোট
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              গ্রেড
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              GPA
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {gradeData[selectedClass]?.map(student => (
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
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {student.assignments.join(', ')}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {student.quizzes.join(', ')}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {student.midterm}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {student.final}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {student.projects}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  student.total >= 90 ? 'bg-green-100 text-green-800' :
                                  student.total >= 80 ? 'bg-blue-100 text-blue-800' :
                                  student.total >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {student.total}%
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                                <span className={`${
                                  student.grade === 'A+' ? 'text-green-600' :
                                  student.grade === 'A' ? 'text-blue-600' :
                                  student.grade === 'A-' ? 'text-yellow-600' :
                                  'text-red-600'
                                }`}>
                                  {student.grade}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">
                                {student.gpa}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}