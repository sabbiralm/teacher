'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7days')
  const [selectedMetric, setSelectedMetric] = useState('performance')

  const aiInsights = [
    {
      id: 1,
      type: 'warning',
      title: 'পারফরম্যান্স ড্রপ',
      description: '৫ জন শিক্ষার্থীর পারফরম্যান্স গত ২ সপ্তাহে ১৫% কমেছে',
      suggestion: 'অতিরিক্ত ক্লাস বা টিউটোরিয়ালের ব্যবস্থা করুন',
      confidence: 92
    },
    {
      id: 2,
      type: 'success',
      title: 'এনগেজমেন্ট বৃদ্ধি',
      description: 'কমিউনিটি ফোরামে অংশগ্রহণ ৪০% বৃদ্ধি পেয়েছে',
      suggestion: 'বর্তমান এনগেজমেন্ট কৌশল চালিয়ে যান',
      confidence: 88
    },
    {
      id: 3,
      type: 'info',
      title: 'লার্নিং প্যাটার্ন',
      description: 'শিক্ষার্থীরা সকাল ১০-১২টার মধ্যে সবচেয়ে বেশি একটিভ',
      suggestion: 'গুরুত্বপূর্ণ কন্টেন্ট এই সময়ে শেয়ার করুন',
      confidence: 95
    }
  ]

  const predictiveAnalytics = [
    {
      student: 'আনিকা ইসলাম',
      predictedGrade: 'A+',
      confidence: 96,
      risk: 'নিম্ন',
      recommendations: ['বর্তমান পথে অগ্রসর হন', 'লিডারবোর্ডে শীর্ষে থাকুন']
    },
    {
      student: 'রহিম আহমেদ',
      predictedGrade: 'B+',
      confidence: 82,
      risk: 'মাঝারি',
      recommendations: ['অতিরিক্ত অনুশীলন প্রয়োজন', 'কুইজে ভালো করতে হবে']
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">AI-পাওয়ারড অ্যানালিটিক্স</h1>
            <p className="text-gray-600 mt-2">কৃত্রিম বুদ্ধিমত্তা ব্যবহার করে শিক্ষার গভীর বিশ্লেষণ</p>
          </div>
          
          <div className="flex space-x-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="input-field"
            >
              <option value="7days">গত ৭ দিন</option>
              <option value="30days">গত ৩০ দিন</option>
              <option value="90days">গত ৯০ দিন</option>
              <option value="custom">কাস্টম</option>
            </select>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 flex items-center space-x-2">
              <i className="fas fa-robot"></i>
              <span>নতুন ইনসাইট</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* AI Insights */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">AI ইনসাইটস</h3>
              <div className="space-y-4">
                {aiInsights.map(insight => (
                  <div 
                    key={insight.id}
                    className={`border-l-4 p-4 rounded-r-lg ${
                      insight.type === 'warning' ? 'border-yellow-400 bg-yellow-50' :
                      insight.type === 'success' ? 'border-green-400 bg-green-50' :
                      'border-blue-400 bg-blue-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">{insight.title}</h4>
                      <span className="text-xs bg-white px-2 py-1 rounded-full">
                        {insight.confidence}% আত্মবিশ্বাস
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                    <p className="text-xs text-gray-500">{insight.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">মেট্রিক্স</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setSelectedMetric('performance')}
                  className={`w-full text-left p-3 rounded-lg transition duration-300 ${
                    selectedMetric === 'performance' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                  }`}
                >
                  📊 পারফরম্যান্স
                </button>
                <button 
                  onClick={() => setSelectedMetric('engagement')}
                  className={`w-full text-left p-3 rounded-lg transition duration-300 ${
                    selectedMetric === 'engagement' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                  }`}
                >
                  🔥 এনগেজমেন্ট
                </button>
                <button 
                  onClick={() => setSelectedMetric('retention')}
                  className={`w-full text-left p-3 rounded-lg transition duration-300 ${
                    selectedMetric === 'retention' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                  }`}
                >
                  📈 রিটেনশন
                </button>
                <button 
                  onClick={() => setSelectedMetric('predictive')}
                  className={`w-full text-left p-3 rounded-lg transition duration-300 ${
                    selectedMetric === 'predictive' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                  }`}
                >
                  🔮 প্রেডিক্টিভ
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">৮৫%</div>
                  <div className="text-sm text-gray-600">গড় পারফরম্যান্স</div>
                  <div className="text-xs text-green-500 mt-1">↑ ৫%</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">৭৮%</div>
                  <div className="text-sm text-gray-600">এনগেজমেন্ট রেট</div>
                  <div className="text-xs text-green-500 mt-1">↑ ১২%</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">৯২%</div>
                  <div className="text-sm text-gray-600">রিটেনশন রেট</div>
                  <div className="text-xs text-green-500 mt-1">↑ ৩%</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-1">৮৮%</div>
                  <div className="text-sm text-gray-600">সাফল্যের হার</div>
                  <div className="text-xs text-green-500 mt-1">↑ ৭%</div>
                </div>
              </div>

              {/* Predictive Analytics */}
              {selectedMetric === 'predictive' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800">প্রেডিক্টিভ অ্যানালিটিক্স</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {predictiveAnalytics.map((student, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-800">{student.student}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                student.risk === 'নিম্ন' ? 'bg-green-100 text-green-800' :
                                student.risk === 'মাঝারি' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {student.risk} ঝুঁকি
                              </span>
                              <span className="text-xs text-gray-500">
                                {student.confidence}% আত্মবিশ্বাস
                              </span>
                            </div>
                          </div>
                          <span className="text-lg font-bold text-green-600">{student.predictedGrade}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <h5 className="font-medium text-gray-700">সুপারিশসমূহ:</h5>
                          {student.recommendations.map((rec, recIndex) => (
                            <div key={recIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                              <i className="fas fa-check text-green-500"></i>
                              <span>{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Performance Trends */}
              {selectedMetric === 'performance' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800">পারফরম্যান্স ট্রেন্ডস</h3>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-700">গড় স্কোর ট্রেন্ড</h4>
                      <div className="flex space-x-2 text-sm">
                        <span className="text-green-500">↑ ৫.২%</span>
                        <span className="text-gray-500">গত ৩০ দিন</span>
                      </div>
                    </div>
                    
                    {/* Chart Placeholder */}
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                      <div className="text-4xl mb-4">📈</div>
                      <p className="text-gray-600">পারফরম্যান্স ট্রেন্ড চার্ট এখানে দেখানো হবে</p>
                      <p className="text-sm text-gray-500 mt-2">
                        AI মডেল দ্বারা বিশ্লেষিত রিয়েল-টাইম ডেটা
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Engagement Analytics */}
              {selectedMetric === 'engagement' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800">এনগেজমেন্ট অ্যানালিটিক্স</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-700 mb-4">সর্বোচ্চ এনগেজড কন্টেন্ট</h4>
                      <div className="space-y-3">
                        {[
                          { title: 'পাইথন OOP লাইভ ক্লাস', engagement: 95, type: 'ভিডিও' },
                          { title: 'ডাটা স্ট্রাকচার কুইজ', engagement: 88, type: 'কুইজ' },
                          { title: 'প্রজেক্ট ডিসকাশন', engagement: 82, type: 'ফোরাম' }
                        ].map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <div>
                              <div className="font-medium text-sm">{item.title}</div>
                              <div className="text-xs text-gray-500">{item.type}</div>
                            </div>
                            <span className="text-sm font-bold text-green-600">{item.engagement}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-700 mb-4">এনগেজমেন্ট প্যাটার্ন</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>সর্বোচ্চ একটিভ সময়:</span>
                          <span className="font-medium">সকাল ১০-১২টা</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>সর্বোচ্চ এনগেজড ডে:</span>
                          <span className="font-medium">মঙ্গলবার</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>গড় সেশন সময়:</span>
                          <span className="font-medium">৪৫ মিনিট</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>কন্টেন্ট কমপ্লিশন:</span>
                          <span className="font-medium">৭৮%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Recommendations */}
              <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">AI সুপারিশ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-3">📚 কন্টেন্ট অপ্টিমাইজেশন</h4>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li>• ভিডিও কন্টেন্ট ১৫-২০ মিনিটের মধ্যে সীমিত করুন</li>
                      <li>• ইন্টারঅ্যাক্টিভ কুইজ প্রতি ১০ মিনিটে যোগ করুন</li>
                      <li>• ভিজ্যুয়াল এডস ৪০% বৃদ্ধি করুন</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">👥 শিক্ষার্থী সাপোর্ট</h4>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li>• ৫ জন শিক্ষার্থীর জন্য অতিরিক্ত টিউটোরিয়াল</li>
                      <li>• পার্সোনালাইজড লার্নিং পাথ তৈরি করুন</li>
                      <li>• গ্রুপ স্টাডি সেশন আয়োজন করুন</li>
                    </ul>
                  </div>
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