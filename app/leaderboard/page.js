'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LeaderboardTable from '@/components/LeaderboardTable'

export default function Leaderboard() {
  const [selectedTeacher, setSelectedTeacher] = useState('ড. সুমনা খান')
  
  const teachers = [
    { id: 1, name: 'ড. সুমনা খান', subject: 'কম্পিউটার বিজ্ঞান' },
    { id: 2, name: 'প্রফেসর রেজাউল করিম', subject: 'গণিত' },
    { id: 3, name: 'ড. ফারহানা আহমেদ', subject: 'পদার্থবিজ্ঞান' }
  ]
  
  const leaderboards = {
    'ড. সুমনা খান': [
      { rank: 1, name: 'আনিকা ইসলাম', score: 98, progress: 95 },
      { rank: 2, name: 'রহিম আহমেদ', score: 95, progress: 92 },
      { rank: 3, name: 'সাদিয়া খান', score: 92, progress: 88 },
      { rank: 4, name: 'করিমুল ইসলাম', score: 88, progress: 85 },
      { rank: 5, name: 'তানজিলা আহমেদ', score: 85, progress: 80 }
    ],
    'প্রফেসর রেজাউল করিম': [
      { rank: 1, name: 'রহিম আহমেদ', score: 96, progress: 94 },
      { rank: 2, name: 'আনিকা ইসলাম', score: 94, progress: 90 },
      { rank: 3, name: 'সাদিয়া খান', score: 90, progress: 87 },
      { rank: 4, name: 'তানজিলা আহমেদ', score: 87, progress: 85 },
      { rank: 5, name: 'করিমুল ইসলাম', score: 85, progress: 82 }
    ],
    'ড. ফারহানা আহমেদ': [
      { rank: 1, name: 'সাদিয়া খান', score: 97, progress: 95 },
      { rank: 2, name: 'আনিকা ইসলাম', score: 95, progress: 92 },
      { rank: 3, name: 'তানজিলা আহমেদ', score: 92, progress: 90 },
      { rank: 4, name: 'রহিম আহমেদ', score: 90, progress: 88 },
      { rank: 5, name: 'করিমুল ইসলাম', score: 88, progress: 85 }
    ]
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">লিডারবোর্ড</h1>
        
        {/* Teacher Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">শিক্ষক নির্বাচন করুন</h2>
          <div className="flex flex-wrap gap-4">
            {teachers.map(teacher => (
              <button
                key={teacher.id}
                onClick={() => setSelectedTeacher(teacher.name)}
                className={`px-4 py-2 rounded-lg transition duration-300 ${
                  selectedTeacher === teacher.name 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {teacher.name} - {teacher.subject}
              </button>
            ))}
          </div>
        </div>
        
        {/* Leaderboard Table */}
        <LeaderboardTable 
          teacher={selectedTeacher} 
          data={leaderboards[selectedTeacher]} 
        />
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-trophy text-blue-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">সর্বোচ্চ স্কোর</h3>
            <p className="text-3xl font-bold text-blue-600">98</p>
            <p className="text-gray-600 mt-2">আনিকা ইসলাম</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-chart-line text-green-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">গড় স্কোর</h3>
            <p className="text-3xl font-bold text-green-600">91.6</p>
            <p className="text-gray-600 mt-2">সকল শিক্ষার্থী</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-users text-purple-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">সক্রিয় শিক্ষার্থী</h3>
            <p className="text-3xl font-bold text-purple-600">24</p>
            <p className="text-gray-600 mt-2">এই ক্লাসে</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}