'use client'
import { useState, useRef, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SmartClassroom() {
  const [activeTab, setActiveTab] = useState('live')
  const [isLive, setIsLive] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [participants, setParticipants] = useState([])
  const [screenShare, setScreenShare] = useState(false)
  const [whiteboard, setWhiteboard] = useState(false)
  const videoRef = useRef(null)
  const messagesEndRef = useRef(null)

  // Sample data
  const classrooms = [
    {
      id: 1,
      name: 'পাইথন প্রোগ্রামিং - ব্যাচ ২০২৩',
      teacher: 'ড. সুমনা খান',
      schedule: 'শনি, মঙ্গল - সকাল ১০:০০',
      students: 25,
      active: true
    },
    {
      id: 2,
      name: 'ওয়েব ডেভেলপমেন্ট - এডভান্সড',
      teacher: 'প্রফেসর রেজাউল করিম',
      schedule: 'রবি, বুধ - বিকাল ৩:০০',
      students: 18,
      active: false
    }
  ]

  const sampleParticipants = [
    { id: 1, name: 'আনিকা ইসলাম', role: 'শিক্ষার্থী', active: true },
    { id: 2, name: 'রহিম আহমেদ', role: 'শিক্ষার্থী', active: true },
    { id: 3, name: 'সাদিয়া খান', role: 'শিক্ষার্থী', active: true },
    { id: 4, name: 'করিমুল ইসলাম', role: 'শিক্ষার্থী', active: false },
    { id: 5, name: 'ড. সুমনা খান', role: 'শিক্ষক', active: true }
  ]

  const sampleMessages = [
    { id: 1, user: 'ড. সুমনা খান', message: 'সবাইকে স্বাগতম! আজ আমরা পাইথনের OOP নিয়ে আলোচনা করব।', time: '১০:০০ AM', type: 'teacher' },
    { id: 2, user: 'আনিকা ইসলাম', message: 'গুড মর্নিং স্যার! আমি প্রস্তুত।', time: '১০:০১ AM', type: 'student' },
    { id: 3, user: 'রহিম আহমেদ', message: 'স্যার, inheritance এবং polymorphism এর মধ্যে difference টা কি?', time: '১০:০২ AM', type: 'student' }
  ]

  useEffect(() => {
    setParticipants(sampleParticipants)
    setMessages(sampleMessages)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleStartLive = () => {
    setIsLive(true)
    // Here you would integrate with WebRTC for actual video streaming
    if (videoRef.current) {
      // Simulate video stream
      videoRef.current.srcObject = new MediaStream()
    }
  }

  const handleStopLive = () => {
    setIsLive(false)
    setScreenShare(false)
    setWhiteboard(false)
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: 'আপনি',
        message: newMessage,
        time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
        type: 'own'
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const handleScreenShare = () => {
    setScreenShare(!screenShare)
    setWhiteboard(false)
  }

  const handleWhiteboard = () => {
    setWhiteboard(!whiteboard)
    setScreenShare(false)
  }

  const toggleParticipantAudio = (id) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, active: !p.active } : p
    ))
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">স্মার্ট ক্লাসরুম</h1>
            <p className="text-gray-600 mt-2">ইন্টারঅ্যাক্টিভ এবং রিয়েল-টাইম লার্নিং এক্সপেরিয়েন্স</p>
          </div>
          
          <div className="flex space-x-4">
            {!isLive ? (
              <button 
                onClick={handleStartLive}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 flex items-center space-x-2"
              >
                <i className="fas fa-play"></i>
                <span>লাইভ ক্লাস শুরু করুন</span>
              </button>
            ) : (
              <button 
                onClick={handleStopLive}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 flex items-center space-x-2"
              >
                <i className="fas fa-stop"></i>
                <span>লাইভ বন্ধ করুন</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar - Classroom List */}
          <div className="xl:col-span-1 space-y-6">
            {/* Classroom List */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">আপনার ক্লাসরুম</h3>
              <div className="space-y-4">
                {classrooms.map(classroom => (
                  <div 
                    key={classroom.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      classroom.active 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">{classroom.name}</h4>
                      {classroom.active && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          সক্রিয়
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{classroom.teacher}</p>
                    <p className="text-sm text-gray-500 mb-2">{classroom.schedule}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">{classroom.students} শিক্ষার্থী</span>
                      <button className="text-blue-500 hover:text-blue-600 font-medium">
                        জয়েন করুন
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">দ্রুত একশন</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 p-3 rounded-lg transition duration-300 flex flex-col items-center">
                  <i className="fas fa-video text-lg mb-1"></i>
                  <span className="text-sm">মিটিং</span>
                </button>
                <button className="bg-green-50 hover:bg-green-100 text-green-600 p-3 rounded-lg transition duration-300 flex flex-col items-center">
                  <i className="fas fa-file-upload text-lg mb-1"></i>
                  <span className="text-sm">আপলোড</span>
                </button>
                <button className="bg-purple-50 hover:bg-purple-100 text-purple-600 p-3 rounded-lg transition duration-300 flex flex-col items-center">
                  <i className="fas fa-tasks text-lg mb-1"></i>
                  <span className="text-sm">অ্যাসাইনমেন্ট</span>
                </button>
                <button className="bg-orange-50 hover:bg-orange-100 text-orange-600 p-3 rounded-lg transition duration-300 flex flex-col items-center">
                  <i className="fas fa-poll text-lg mb-1"></i>
                  <span className="text-sm">কুইজ</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  {[
                    { id: 'live', name: 'লাইভ ক্লাস', icon: 'fa-video' },
                    { id: 'recordings', name: 'রেকর্ডিং', icon: 'fa-play-circle' },
                    { id: 'materials', name: 'স্টাডি ম্যাটেরিয়াল', icon: 'fa-file' },
                    { id: 'assignments', name: 'অ্যাসাইনমেন্ট', icon: 'fa-tasks' }
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
                {activeTab === 'live' && (
                  <div className="space-y-6">
                    {/* Video/Audio Area */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      {isLive ? (
                        <div className="relative">
                          {/* Main Video */}
                          <div className="bg-black rounded-lg aspect-video flex items-center justify-center relative">
                            <video 
                              ref={videoRef}
                              autoPlay 
                              muted 
                              className="w-full h-full rounded-lg"
                            />
                            
                            {/* Screen Share Overlay */}
                            {screenShare && (
                              <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
                                <i className="fas fa-desktop mr-2"></i>
                                স্ক্রিন শেয়ার চলছে
                              </div>
                            )}
                            
                            {/* Whiteboard Overlay */}
                            {whiteboard && (
                              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-lg text-sm">
                                <i className="fas fa-palette mr-2"></i>
                                হোয়াইটবোর্ড চলছে
                              </div>
                            )}
                            
                            {/* Participant Grid */}
                            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-4 gap-2">
                              {participants.filter(p => p.active).map(participant => (
                                <div 
                                  key={participant.id}
                                  className="bg-gray-800 rounded-lg p-2 text-center"
                                >
                                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white mx-auto mb-1">
                                    {participant.name.charAt(0)}
                                  </div>
                                  <p className="text-white text-xs truncate">{participant.name}</p>
                                  <p className="text-gray-400 text-xs">{participant.role}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="flex justify-center space-x-4 mt-4">
                            <button 
                              onClick={() => toggleParticipantAudio(5)}
                              className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition duration-300"
                            >
                              <i className="fas fa-microphone-slash"></i>
                            </button>
                            <button 
                              onClick={handleScreenShare}
                              className={`p-3 rounded-full transition duration-300 ${
                                screenShare 
                                  ? 'bg-blue-500 text-white' 
                                  : 'bg-gray-700 text-white hover:bg-gray-600'
                              }`}
                            >
                              <i className="fas fa-desktop"></i>
                            </button>
                            <button 
                              onClick={handleWhiteboard}
                              className={`p-3 rounded-full transition duration-300 ${
                                whiteboard 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-gray-700 text-white hover:bg-gray-600'
                              }`}
                            >
                              <i className="fas fa-palette"></i>
                            </button>
                            <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition duration-300">
                              <i className="fas fa-ellipsis-h"></i>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <i className="fas fa-video-slash text-gray-400 text-6xl mb-4"></i>
                          <h3 className="text-xl font-semibold text-gray-400 mb-2">
                            লাইভ ক্লাস শুরু হয়নি
                          </h3>
                          <p className="text-gray-500">
                            লাইভ ক্লাস শুরু করতে উপরের "লাইভ ক্লাস শুরু করুন" বাটনে ক্লিক করুন
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Chat and Participants */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Chat Section */}
                      <div className="lg:col-span-2 bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-4">লাইভ চ্যাট</h4>
                        
                        <div className="bg-white rounded-lg border border-gray-200 h-64 overflow-y-auto p-4 mb-4">
                          {messages.map(message => (
                            <div 
                              key={message.id}
                              className={`mb-3 ${
                                message.type === 'own' ? 'text-right' : ''
                              }`}
                            >
                              <div className={`inline-block max-w-xs lg:max-w-md rounded-lg p-3 ${
                                message.type === 'teacher' 
                                  ? 'bg-blue-100 border border-blue-200' 
                                  : message.type === 'own'
                                  ? 'bg-green-100 border border-green-200'
                                  : 'bg-gray-100 border border-gray-200'
                              }`}>
                                <div className="flex justify-between items-start mb-1">
                                  <span className={`font-medium text-sm ${
                                    message.type === 'teacher' ? 'text-blue-700' : 'text-gray-700'
                                  }`}>
                                    {message.user}
                                  </span>
                                  <span className="text-xs text-gray-500 ml-2">{message.time}</span>
                                </div>
                                <p className="text-gray-800 text-sm">{message.message}</p>
                              </div>
                            </div>
                          ))}
                          <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSendMessage} className="flex space-x-2">
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="আপনার মেসেজ লিখুন..."
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!isLive}
                          />
                          <button 
                            type="submit"
                            disabled={!isLive}
                            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition duration-300"
                          >
                            <i className="fas fa-paper-plane"></i>
                          </button>
                        </form>
                      </div>

                      {/* Participants Section */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-4">
                          অংশগ্রহণকারী ({participants.length})
                        </h4>
                        
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {participants.map(participant => (
                            <div 
                              key={participant.id}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="relative">
                                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                    {participant.name.charAt(0)}
                                  </div>
                                  {participant.active && (
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800 text-sm">
                                    {participant.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {participant.role}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => toggleParticipantAudio(participant.id)}
                                  className={`p-1 rounded ${
                                    participant.active 
                                      ? 'text-green-500 hover:text-green-600' 
                                      : 'text-red-500 hover:text-red-600'
                                  }`}
                                >
                                  <i className={`fas ${participant.active ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
                                </button>
                                <button className="text-blue-500 hover:text-blue-600 p-1 rounded">
                                  <i className="fas fa-ellipsis-v"></i>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'recordings' && (
                  <div className="text-center py-12">
                    <i className="fas fa-play-circle text-gray-300 text-6xl mb-4"></i>
                    <h3 className="text-xl font-semibold text-gray-500 mb-2">কোনো রেকর্ডিং নেই</h3>
                    <p className="text-gray-400">লাইভ ক্লাস শেষ হলে রেকর্ডিং এখানে উপলব্ধ হবে</p>
                  </div>
                )}

                {activeTab === 'materials' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold text-gray-800">স্টাডি ম্যাটেরিয়াল</h3>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-2">
                        <i className="fas fa-upload"></i>
                        <span>ফাইল আপলোড</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: 'পাইথন OOP নোটস.pdf', type: 'pdf', size: '2.4 MB', date: '২০২৩-১১-১৫' },
                        { name: 'প্রজেক্ট গাইডলাইন.docx', type: 'doc', size: '1.8 MB', date: '২০২৩-১১-১০' },
                        { name: 'ক্লাস প্রেজেন্টেশন.pptx', type: 'ppt', size: '5.2 MB', date: '২০২৩-১১-০৮' }
                      ].map((file, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <i className="fas fa-file text-blue-500"></i>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                              <i className="fas fa-ellipsis-v"></i>
                            </button>
                          </div>
                          <h4 className="font-semibold text-gray-800 mb-1 truncate">{file.name}</h4>
                          <div className="text-sm text-gray-500 space-y-1">
                            <p>টাইপ: {file.type}</p>
                            <p>সাইজ: {file.size}</p>
                            <p>তারিখ: {file.date}</p>
                          </div>
                          <div className="flex justify-between mt-3">
                            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                              <i className="fas fa-download mr-1"></i>
                              ডাউনলোড
                            </button>
                            <button className="text-green-500 hover:text-green-600 text-sm font-medium">
                              <i className="fas fa-share mr-1"></i>
                              শেয়ার
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'assignments' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-800">অ্যাসাইনমেন্ট</h3>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-2">
                        <i className="fas fa-plus"></i>
                        <span>নতুন অ্যাসাইনমেন্ট</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {[
                        { 
                          title: 'পাইথন OOP প্রজেক্ট', 
                          dueDate: '২০২৩-১২-০১', 
                          submitted: 18, 
                          total: 25, 
                          status: 'active' 
                        },
                        { 
                          title: 'ডাটা স্ট্রাকচার অ্যাসাইনমেন্ট', 
                          dueDate: '২০২৩-১১-২৫', 
                          submitted: 22, 
                          total: 25, 
                          status: 'submitted' 
                        }
                      ].map((assignment, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold text-gray-800">{assignment.title}</h4>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              assignment.status === 'active' 
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {assignment.status === 'active' ? 'সক্রিয়' : 'জমা দেওয়া'}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-sm text-gray-600">শেষ তারিখ:</p>
                              <p className="font-medium">{assignment.dueDate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">জমা দেওয়া:</p>
                              <p className="font-medium">{assignment.submitted}/{assignment.total}</p>
                            </div>
                          </div>
                          
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex justify-between mt-3">
                            <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">
                              বিস্তারিত দেখুন
                            </button>
                            <button className="text-green-500 hover:text-green-600 font-medium text-sm">
                              জমা দিন
                            </button>
                          </div>
                        </div>
                      ))}
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