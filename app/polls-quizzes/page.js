'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PollsQuizzes() {
  const [activeTab, setActiveTab] = useState('create')
  const [quizType, setQuizType] = useState('mcq')
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 1
  })

  const livePolls = [
    {
      id: 1,
      question: 'আপনি কি পাইথন OOP কনসেপ্ট বুঝতে পেরেছেন?',
      options: ['হ্যাঁ সম্পূর্ণ', 'আংশিক', 'মোটামুটি', 'না বুঝি'],
      votes: [15, 8, 5, 2],
      totalVotes: 30,
      live: true
    },
    {
      id: 2,
      question: 'পরবর্তী ক্লাস কখন হওয়া উচিত?',
      options: ['সোমবার', 'বুধবার', 'শুক্রবার', 'রবিবার'],
      votes: [12, 8, 6, 4],
      totalVotes: 30,
      live: true
    }
  ]

  const quizzes = [
    {
      id: 1,
      title: 'পাইথন OOP বেসিক কুইজ',
      questions: 10,
      time: 15,
      attempts: 45,
      averageScore: 85,
      status: 'active'
    },
    {
      id: 2,
      title: 'ডাটা স্ট্রাকচার মিড-টার্ম',
      questions: 20,
      time: 30,
      attempts: 30,
      averageScore: 78,
      status: 'completed'
    }
  ]

  const addQuestion = () => {
    if (currentQuestion.question && currentQuestion.options.every(opt => opt.trim())) {
      setQuestions([...questions, { ...currentQuestion, id: questions.length + 1 }])
      setCurrentQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        points: 1
      })
    }
  }

  const startLivePoll = () => {
    // Start live poll logic
    alert('লাইভ পোল শুরু হয়েছে!')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">পোলস এবং কুইজেস</h1>
            <p className="text-gray-600 mt-2">ইন্টারঅ্যাক্টিভ পোল এবং অ্যাসেসমেন্ট তৈরি ও পরিচালনা করুন</p>
          </div>
          
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 flex items-center space-x-2">
            <i className="fas fa-plus"></i>
            <span>নতুন কুইজ তৈরি করুন</span>
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">দ্রুত পরিসংখ্যান</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">সক্রিয় কুইজ</p>
                    <p className="text-2xl font-bold text-blue-600">5</p>
                  </div>
                  <i className="fas fa-play-circle text-blue-500 text-2xl"></i>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">মোট অংশগ্রহণ</p>
                    <p className="text-2xl font-bold text-green-600">156</p>
                  </div>
                  <i className="fas fa-users text-green-500 text-2xl"></i>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">গড় স্কোর</p>
                    <p className="text-2xl font-bold text-purple-600">82%</p>
                  </div>
                  <i className="fas fa-chart-line text-purple-500 text-2xl"></i>
                </div>
              </div>
            </div>

            {/* Live Polls */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">লাইভ পোলস</h3>
              <div className="space-y-4">
                {livePolls.map(poll => (
                  <div key={poll.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">{poll.question}</h4>
                    <div className="space-y-2 mb-3">
                      {poll.options.map((option, index) => {
                        const percentage = poll.totalVotes > 0 ? (poll.votes[index] / poll.totalVotes) * 100 : 0
                        return (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-700">{option}</span>
                              <span className="text-gray-600">{poll.votes[index]} ভোট ({percentage.toFixed(1)}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <button 
                      onClick={startLivePoll}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300"
                    >
                      লাইভ ভোট দিন
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  {[
                    { id: 'create', name: 'কুইজ তৈরি করুন', icon: 'fa-plus' },
                    { id: 'manage', name: 'কুইজ ব্যবস্থাপনা', icon: 'fa-cog' },
                    { id: 'results', name: 'ফলাফল', icon: 'fa-chart-bar' },
                    { id: 'templates', name: 'টেমপ্লেট', icon: 'fa-layer-group' }
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
                {activeTab === 'create' && (
                  <div className="space-y-6">
                    {/* Quiz Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2">কুইজের শিরোনাম</label>
                        <input type="text" className="input-field text-gray-900" placeholder="কুইজের নাম লিখুন" />
                      </div>
                      <div>
                        <label className="block text-gray-900 mb-2">কুইজের ধরন</label>
                        <select 
                          value={quizType}
                          onChange={(e) => setQuizType(e.target.value)}
                          className="input-field text-gray-900"
                        >
                          <option value="mcq">এমসিকিউ</option>
                          <option value="written">লিখিত</option>
                          <option value="mixed">মিশ্র</option>
                          <option value="poll">পোল</option>
                        </select>
                      </div>
                    </div>

                    {/* Question Builder */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">প্রশ্ন তৈরি করুন</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 mb-2">প্রশ্ন</label>
                          <textarea 
                            value={currentQuestion.question}
                            onChange={(e) => setCurrentQuestion({...currentQuestion, question: e.target.value})}
                            className="input-field text-gray-900"
                            rows="3"
                            placeholder="আপনার প্রশ্ন লিখুন..."
                          ></textarea>
                        </div>

                        <div>
                          <label className="block text-gray-700 mb-2">অপশনসমূহ</label>
                          <div className="space-y-2 text-gray-900">
                            {currentQuestion.options.map((option, index) => (
                              <div key={index} className="flex items-center space-x-3">
                                <input
                                  type="radio"
                                  name="correctAnswer"
                                  checked={currentQuestion.correctAnswer === index}
                                  onChange={() => setCurrentQuestion({...currentQuestion, correctAnswer: index})}
                                  className="text-blue-500"
                                />
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...currentQuestion.options]
                                    newOptions[index] = e.target.value
                                    setCurrentQuestion({...currentQuestion, options: newOptions})
                                  }}
                                  className="input-field flex-grow"
                                  placeholder={`অপশন ${index + 1}`}
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            <label className="block text-gray-700 mb-2">পয়েন্ট</label>
                            <input
                              type="number"
                              placeholder={`10`}
                              value={currentQuestion.points}
                              onChange={(e) => setCurrentQuestion({...currentQuestion, points: parseInt(e.target.value)})}
                              className="input-field border-gray-300 text-gray-900 w-20"
                              min="1"
                            />
                          </div>
                          <button 
                            onClick={addQuestion}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300"
                          >
                            প্রশ্ন যোগ করুন
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Questions List */}
                    {questions.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold mb-4">প্রশ্ন তালিকা ({questions.length})</h4>
                        <div className="space-y-3">
                          {questions.map((q, index) => (
                            <div key={q.id} className="border border-gray-300 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-medium text-gray-800">{index + 1}. {q.question}</h5>
                                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                                  {q.points} পয়েন্ট
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                {q.options.map((opt, optIndex) => (
                                  <div 
                                    key={optIndex}
                                    className={`p-2 rounded ${
                                      optIndex === q.correctAnswer 
                                        ? 'bg-green-100 text-green-800 border border-green-200' 
                                        : 'bg-gray-100 text-gray-700'
                                    }`}
                                  >
                                    {opt} {optIndex === q.correctAnswer && '✓'}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'manage' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-800">কুইজ ব্যবস্থাপনা</h3>
                      <div className="flex space-x-3">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300">
                          <i className="fas fa-download mr-2"></i>
                          এক্সপোর্ট
                        </button>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300">
                          <i className="fas fa-sync mr-2"></i>
                          সিঙ্ক করুন
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {quizzes.map(quiz => (
                        <div key={quiz.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition duration-300">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800">{quiz.title}</h4>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                <span><i className="fas fa-question-circle mr-1"></i> {quiz.questions} প্রশ্ন</span>
                                <span><i className="fas fa-clock mr-1"></i> {quiz.time} মিনিট</span>
                                <span><i className="fas fa-users mr-1"></i> {quiz.attempts} প্রচেষ্টা</span>
                                <span><i className="fas fa-chart-line mr-1"></i> {quiz.averageScore}% গড়</span>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              quiz.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {quiz.status === 'active' ? 'সক্রিয়' : 'সম্পন্ন'}
                            </span>
                          </div>
                          
                          <div className="flex space-x-3">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm">
                              এডিট করুন
                            </button>
                            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm">
                              ফলাফল দেখুন
                            </button>
                            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm">
                              শেয়ার করুন
                            </button>
                            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm">
                              ডিলিট করুন
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'results' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800">কুইজ ফলাফল বিশ্লেষণ</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">৮৫%</div>
                        <div className="text-sm text-gray-600">গড় স্কোর</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600 mb-1">৪৫</div>
                        <div className="text-sm text-gray-600">মোট অংশগ্রহণ</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-1">১২.৫ মিনিট</div>
                        <div className="text-sm text-gray-600">গড় সময়</div>
                      </div>
                    </div>

                    {/* Performance Chart */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold mb-4">স্কোর ডিস্ট্রিবিউশন</h4>
                      <div className="space-y-3">
                        {[
                          { range: '৯০-১০০%', students: 15, percentage: 33 },
                          { range: '৮০-৮৯%', students: 12, percentage: 27 },
                          { range: '৭০-৭৯%', students: 10, percentage: 22 },
                          { range: '৬০-৬৯%', students: 5, percentage: 11 },
                          { range: '০-৫৯%', students: 3, percentage: 7 }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center space-x-4">
                            <div className="w-20 text-sm text-gray-600">{item.range}</div>
                            <div className="flex-grow">
                              <div className="w-full bg-gray-200 rounded-full h-4">
                                <div 
                                  className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                                  style={{ width: `${item.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="w-20 text-sm text-gray-600 text-right">
                              {item.students} শিক্ষার্থী
                            </div>
                          </div>
                        ))}
                      </div>
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