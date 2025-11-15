'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function BreakoutRooms() {
  const [rooms, setRooms] = useState([])
  const [newRoom, setNewRoom] = useState({
    name: '',
    topic: '',
    maxParticipants: 4,
    duration: 15
  })

  const students = [
    { id: 1, name: 'আনিকা ইসলাম', email: 'anika@example.com', joined: true },
    { id: 2, name: 'রহিম আহমেদ', email: 'rahim@example.com', joined: true },
    { id: 3, name: 'সাদিয়া খান', email: 'sadia@example.com', joined: true },
    { id: 4, name: 'করিমুল ইসলাম', email: 'karim@example.com', joined: false },
    { id: 5, name: 'তানজিলা আহমেদ', email: 'tanjila@example.com', joined: true },
    { id: 6, name: 'নাজমুল হক', email: 'nazmul@example.com', joined: true }
  ]

  const sampleRooms = [
    {
      id: 1,
      name: 'গ্রুপ A - OOP ডিসকাশন',
      topic: 'পাইথন OOP কনসেপ্ট',
      participants: [1, 2],
      maxParticipants: 4,
      duration: 15,
      status: 'active',
      createdAt: new Date()
    },
    {
      id: 2,
      name: 'গ্রুপ B - প্রজেক্ট প্ল্যানিং',
      topic: 'ফাইনাল প্রজেক্ট আইডিয়া',
      participants: [3, 5, 6],
      maxParticipants: 3,
      duration: 20,
      status: 'active',
      createdAt: new Date()
    }
  ]

  const createRoom = () => {
    if (newRoom.name && newRoom.topic) {
      const room = {
        id: rooms.length + 1,
        ...newRoom,
        participants: [],
        status: 'active',
        createdAt: new Date()
      }
      setRooms([...rooms, room])
      setNewRoom({
        name: '',
        topic: '',
        maxParticipants: 4,
        duration: 15
      })
    }
  }

  const autoAssign = () => {
    // Auto assign students to rooms
    alert('স্বয়ংক্রিয়ভাবে শিক্ষার্থীদের গ্রুপে ভাগ করা হয়েছে!')
  }

  const joinRoom = (roomId, studentId) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { ...room, participants: [...room.participants, studentId] }
        : room
    ))
  }

  const startBreakout = (roomId) => {
    // Start breakout room logic
    alert(`ব্রেকআউট রুম ${roomId} শুরু হয়েছে!`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">ব্রেকআউট রুমস</h1>
            <p className="text-gray-600 mt-2">ছোট গ্রুপে আলোচনা এবং সহযোগিতার জন্য ব্রেকআউট রুম তৈরি করুন</p>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={autoAssign}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 flex items-center space-x-2"
            >
              <i className="fas fa-robot"></i>
              <span>স্বয়ংক্রিয় ভাগ করুন</span>
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 flex items-center space-x-2">
              <i className="fas fa-plus"></i>
              <span>নতুন রুম তৈরি করুন</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar - Students List */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">শিক্ষার্থী তালিকা</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {students.map(student => (
                  <div 
                    key={student.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${student.joined ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.email}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      student.joined ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {student.joined ? 'সংযুক্ত' : 'অফলাইন'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">দ্রুত একশন</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 p-3 rounded-lg transition duration-300 flex flex-col items-center">
                  <i className="fas fa-random text-lg mb-1"></i>
                  <span className="text-xs">মিশিয়ে দিন</span>
                </button>
                <button className="bg-green-50 hover:bg-green-100 text-green-600 p-3 rounded-lg transition duration-300 flex flex-col items-center">
                  <i className="fas fa-clock text-lg mb-1"></i>
                  <span className="text-xs">সময় বাড়ান</span>
                </button>
                <button className="bg-purple-50 hover:bg-purple-100 text-purple-600 p-3 rounded-lg transition duration-300 flex flex-col items-center">
                  <i className="fas fa-broadcast-tower text-lg mb-1"></i>
                  <span className="text-xs">সবার সাথে যোগাযোগ</span>
                </button>
                <button className="bg-red-50 hover:bg-red-100 text-red-600 p-3 rounded-lg transition duration-300 flex flex-col items-center">
                  <i className="fas fa-stop text-lg mb-1"></i>
                  <span className="text-xs">সব বন্ধ করুন</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">ব্রেকআউট রুমস</h2>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-600">
                    <span className="font-semibold text-green-600">{students.filter(s => s.joined).length}</span> অনলাইন
                  </span>
                  <span className="text-gray-600">
                    <span className="font-semibold text-blue-600">{sampleRooms.length}</span> সক্রিয় রুম
                  </span>
                </div>
              </div>

              {/* Create Room Form */}
              <div className="border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">নতুন ব্রেকআউট রুম তৈরি করুন</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">রুমের নাম</label>
                    <input
                      type="text"
                      value={newRoom.name}
                      onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                      className="input-field"
                      placeholder="রুমের নাম লিখুন"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">টপিক</label>
                    <input
                      type="text"
                      value={newRoom.topic}
                      onChange={(e) => setNewRoom({...newRoom, topic: e.target.value})}
                      className="input-field"
                      placeholder="আলোচনার বিষয়"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">সর্বোচ্চ অংশগ্রহণকারী</label>
                    <select
                      value={newRoom.maxParticipants}
                      onChange={(e) => setNewRoom({...newRoom, maxParticipants: parseInt(e.target.value)})}
                      className="input-field"
                    >
                      {[2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} জন</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">সময় (মিনিট)</label>
                    <select
                      value={newRoom.duration}
                      onChange={(e) => setNewRoom({...newRoom, duration: parseInt(e.target.value)})}
                      className="input-field"
                    >
                      {[5, 10, 15, 20, 30].map(min => (
                        <option key={min} value={min}>{min} মিনিট</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button 
                  onClick={createRoom}
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition duration-300"
                >
                  রুম তৈরি করুন
                </button>
              </div>

              {/* Active Rooms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sampleRooms.map(room => {
                  const roomStudents = students.filter(s => room.participants.includes(s.id))
                  const availableSlots = room.maxParticipants - roomStudents.length
                  
                  return (
                    <div key={room.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800">{room.name}</h4>
                          <p className="text-gray-600 text-sm mt-1">{room.topic}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                          সক্রিয়
                        </span>
                      </div>

                      {/* Room Info */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="text-center bg-blue-50 p-3 rounded-lg">
                          <div className="text-xl font-bold text-blue-600">{roomStudents.length}/{room.maxParticipants}</div>
                          <div className="text-gray-600">শিক্ষার্থী</div>
                        </div>
                        <div className="text-center bg-green-50 p-3 rounded-lg">
                          <div className="text-xl font-bold text-green-600">{room.duration}</div>
                          <div className="text-gray-600">মিনিট</div>
                        </div>
                      </div>

                      {/* Participants */}
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-700 mb-2">অংশগ্রহণকারী:</h5>
                        <div className="space-y-2">
                          {roomStudents.map(student => (
                            <div key={student.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-700">{student.name}</span>
                              </div>
                              <button className="text-red-500 hover:text-red-700 text-sm">
                                <i className="fas fa-times"></i>
                              </button>
                            </div>
                          ))}
                          
                          {availableSlots > 0 && (
                            <div className="text-center p-2 border-2 border-dashed border-gray-300 rounded">
                              <span className="text-sm text-gray-500">
                                {availableSlots} টি খালি স্লট
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Room Actions */}
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => startBreakout(room.id)}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300 text-sm"
                        >
                          রুম শুরু করুন
                        </button>
                        <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-300">
                          <i className="fas fa-cog"></i>
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300">
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Room Controls */}
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">গ্রুপ কন্ট্রোল</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition duration-300 flex flex-col items-center">
                    <i className="fas fa-play mb-1"></i>
                    <span className="text-sm">সব রুম শুরু করুন</span>
                  </button>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg transition duration-300 flex flex-col items-center">
                    <i className="fas fa-pause mb-1"></i>
                    <span className="text-sm">সব রুম থামান</span>
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition duration-300 flex flex-col items-center">
                    <i className="fas fa-broadcast-tower mb-1"></i>
                    <span className="text-sm">সবার সাথে যোগাযোগ</span>
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition duration-300 flex flex-col items-center">
                    <i className="fas fa-stop mb-1"></i>
                    <span className="text-sm">সব রুম বন্ধ করুন</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}