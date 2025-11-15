'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  const [userType, setUserType] = useState(null)
  const [currentFeature, setCurrentFeature] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  const features = [
    {
      icon: '👥',
      title: 'স্মার্ট ক্লাসরুম',
      description: 'লাইভ ক্লাস,  ভার্চুয়াল মিটিং, রিয়েল-টাইম ইন্টারঅ্যাকশন এবং ইন্টারঅ্যাক্টিভ হোয়াইটবোর্ড',
      link: '/smart-classroom'
    },
    {
      icon: '📊',
      title: 'লাইভ অ্যানালিটিক্স',
      description: 'শিক্ষার্থীদের পারফরম্যান্স ট্র্যাক করুন এবং ডেটা-ড্রিভেন সিদ্ধান্ত নিন',
      link: '/leaderboard'
    },
    {
      icon: '🤝',
      title: 'সহযোগিতা টুলস',
      description: 'গ্রুপ প্রজেক্ট, টিম ওয়ার্ক এবং ইন্টারঅ্যাক্টিভ লার্নিং এক্সপেরিয়েন্স',
      link: '/community'
    },
    {
      icon: '🎯',
      title: 'পার্সোনালাইজড লার্নিং',
      description: 'প্রতিটি শিক্ষার্থীর জন্য কাস্টমাইজড লার্নিং পাথ এবং রিকমেন্ডেশন',
      link: '/profile'
    },
    {
      icon: '📝',
      title: 'স্মার্ট অ্যাসেসমেন্ট',
      description: 'অটোমেটেড পরীক্ষা, ইন্সট্যান্ট গ্রেডিং এবং ডিটেইলড অ্যানালিটিক্স',
      link: '/exams'
    },
    {
      icon: '🔔',
      title: 'রিয়েল-টাইম নোটিফিকেশন',
      description: 'ক্লাস আপডেট, অ্যাসাইনমেন্ট রিমাইন্ডার এবং গুরুত্বপূর্ণ ঘোষণা',
      link: '/profile'
    }
  ]

  const stats = [
    { number: '৫০০+', label: 'সক্রিয় শিক্ষক' },
    { number: '১০,০০০+', label: 'শিক্ষার্থী' },
    { number: '৯৫%', label: 'সাফল্যের হার' },
    { number: '২৪/৭', label: 'সাপোর্ট' }
  ]

  const testimonials = [
    {
      name: 'ড. সুমনা খান',
      role: 'কম্পিউটার সায়েন্স প্রফেসর',
      content: 'স্মার্ট ক্লাসরুম ফিচারটি আমার শিক্ষাদানের অভিজ্ঞতা সম্পূর্ণ বদলে দিয়েছে। লাইভ হোয়াইটবোর্ড এবং রিয়েল-টাইম ইন্টারঅ্যাকশন অসাধারণ!',
      avatar: '👩‍🏫',
      feature: 'স্মার্ট ক্লাসরুম'
    },
    {
      name: 'রহিম আহমেদ',
      role: 'সফটওয়্যার ইঞ্জিনিয়ারিং শিক্ষার্থী',
      content: 'একই প্ল্যাটফর্মে ক্লাস, অ্যাসাইনমেন্ট, পরীক্ষা এবং কমিউনিটি - সবকিছুই আছে। জীবন অনেক সহজ হয়ে গেছে!',
      avatar: '👨‍🎓',
      feature: 'অল-ইন-ওয়ান প্ল্যাটফর্ম'
    }
  ]

  const quickActions = [
    {
      icon: '🏫',
      title: 'স্মার্ট ক্লাসরুম',
      description: 'লাইভ ক্লাস জয়েন করুন',
      link: '/smart-classroom',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '📚',
      title: 'কোর্স ম্যাটেরিয়াল',
      description: 'স্টাডি রিসোর্স এক্সেস করুন',
      link: '/community',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '📝',
      title: 'পরীক্ষা',
      description: 'পরীক্ষায় অংশ নিন',
      link: '/exams',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '🏆',
      title: 'লিডারবোর্ড',
      description: 'আপনার র‍্যাংক দেখুন',
      link: '/leaderboard',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [features.length])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Enhanced Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          
          <div className="relative container mx-auto px-4 py-24">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                ডিজিটাল শিক্ষার
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  ভবিষ্যত
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                শিক্ষক এবং শিক্ষার্থীদের জন্য একটি সম্পূর্ণ ডিজিটাল ইকোসিস্টেম। 
                <span className="block">সহযোগিতা, যোগাযোগ এবং সাফল্যের জন্য একত্রিত হোন।</span>
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <button 
                  onClick={() => setUserType('teacher')}
                  className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <i className="fas fa-chalkboard-teacher"></i>
                  <span>শিক্ষক হিসাবে শুরু করুন</span>
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </button>
                <button 
                  onClick={() => setUserType('student')}
                  className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-blue-600 flex items-center justify-center space-x-2"
                >
                  <i className="fas fa-user-graduate"></i>
                  <span>শিক্ষার্থী হিসাবে যোগ দিন</span>
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </button>
              </div>
              
              {/* Stats Preview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-yellow-300">{stat.number}</div>
                    <div className="text-blue-100 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">দ্রুত একশন</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link 
                  key={index}
                  href={action.link}
                  className="group"
                >
                  <div className={`bg-gradient-to-br ${action.color} text-white rounded-2xl p-6 text-center transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 h-full flex flex-col justify-between`}>
                    <div className="text-4xl mb-4">{action.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                    <p className="text-blue-100 text-sm">{action.description}</p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <i className="fas fa-arrow-right text-white"></i>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Showcase */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                সম্পূর্ণ <span className="text-blue-600">ফিচার স্যুট</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                শিক্ষার সকল দিক কভার করে এমন একটি সম্পূর্ণ প্ল্যাটফর্ম
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Link 
                  key={index}
                  href={feature.link}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover-lift h-full transition-all duration-300 group-hover:border-blue-300">
                    <div className="text-3xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-4 flex items-center text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium">বিস্তারিত দেখুন</span>
                      <i className="fas fa-arrow-right ml-2 text-xs"></i>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Smart Classroom Highlight */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  স্মার্ট ক্লাসরুম
                  <span className="block text-yellow-300">এখন লাইভ!</span>
                </h2>
                <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                  রিয়েল-টাইম ভিডিও কনফারেন্সিং, ইন্টারঅ্যাক্টিভ হোয়াইটবোর্ড, 
                  স্ক্রিন শেয়ারিং এবং লাইভ চ্যাটের মাধ্যমে আপনার ক্লাসরুমকে 
                  ডিজিটালে রূপান্তর করুন।
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    '🎥 লাইভ ভিডিও স্ট্রিমিং',
                    '📝 ইন্টারঅ্যাক্টিভ হোয়াইটবোর্ড',
                    '🖥️ রিয়েল-টাইম স্ক্রিন শেয়ারিং',
                    '💬 লাইভ গ্রুপ চ্যাট',
                    '📚 অটোমেটিক রেকর্ডিং',
                    '👥 অংশগ্রহণকারী ম্যানেজমেন্ট'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <i className="fas fa-check text-green-300"></i>
                      <span className="text-lg">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link 
                  href="/smart-classroom"
                  className="inline-flex items-center space-x-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300"
                >
                  <i className="fas fa-rocket"></i>
                  <span>স্মার্ট ক্লাসরুম এক্সপ্লোর করুন</span>
                </Link>
              </div>
              
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                      <div className="text-center">
                        <i className="fas fa-video text-gray-400 text-4xl mb-2"></i>
                        <p className="text-gray-400 text-sm">লাইভ ক্লাস প্রিভিউ</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={item} className="bg-black rounded-lg aspect-video flex items-center justify-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                          {item}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-4">
                    <div className="bg-red-500 rounded-full p-3">
                      <i className="fas fa-microphone-slash text-white"></i>
                    </div>
                    <div className="bg-blue-500 rounded-full p-3">
                      <i className="fas fa-video text-white"></i>
                    </div>
                    <div className="bg-green-500 rounded-full p-3">
                      <i className="fas fa-desktop text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                কিভাবে কাজ করে?
              </h2>
              <p className="text-xl text-gray-600">
                মাত্র ৩টি সহজ ধাপে শুরু করুন আপনার ডিজিটাল শিক্ষার যাত্রা
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '০১',
                  title: 'অ্যাকাউন্ট তৈরি করুন',
                  description: 'শিক্ষক বা শিক্ষার্থী হিসাবে নিবন্ধন করুন এবং আপনার প্রোফাইল সেটআপ করুন',
                  icon: '👤',
                  image: '/images/signup.svg'
                },
                {
                  step: '০২',
                  title: 'কমিউনিটিতে যুক্ত হোন',
                  description: 'ক্লাস জয়েন করুন, আলোচনায় অংশ নিন এবং সহপাঠীদের সাথে সংযুক্ত হোন',
                  icon: '🤝',
                  image: '/images/community.svg'
                },
                {
                  step: '০৩',
                  title: 'শিখুন এবং বৃদ্ধি করুন',
                  description: 'লাইভ ক্লাসে অংশ নিন, পরীক্ষা দিন এবং আপনার দক্ষতা উন্নত করুন',
                  icon: '📈',
                  image: '/images/growth.svg'
                }
              ].map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {step.step}
                    </div>
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-3xl">
                      {step.icon}
                    </div>
                    {index < 2 && (
                      <div className="hidden md:block absolute top-12 -right-8 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                আমাদের ব্যবহারকারীদের কথা
              </h2>
              <p className="text-xl text-gray-600">
                দেখুন আমাদের সম্প্রদায় কী বলছে
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover-lift">
                  <div className="flex items-start mb-6">
                    <div className="text-4xl mr-4">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">{testimonial.name}</h4>
                      <p className="text-blue-600 text-sm">{testimonial.role}</p>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                        {testimonial.feature}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 italic leading-relaxed mb-4">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(5)}
                    </div>
                    <div className="text-sm text-gray-500">
                      সক্রিয় ব্যবহারকারী
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              আজই শুরু করুন আপনার ডিজিটাল শিক্ষার যাত্রা
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              হাজারো শিক্ষক এবং শিক্ষার্থীর সাথে যোগ দিন যারা ইতিমধ্যেই তাদের শিক্ষার অভিজ্ঞতা রূপান্তরিত করেছেন
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2">
                <i className="fas fa-rocket"></i>
                <span>বিনামূল্যে নিবন্ধন করুন</span>
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2">
                <i className="fas fa-play-circle"></i>
                <span>লাইভ ডেমো দেখুন</span>
              </button>
            </div>
            <div className="text-blue-100 text-sm">
              ⚡ কোন ক্রেডিট কার্ড প্রয়োজন নেই • ৩০ দিন ফ্রি ট্রায়াল • যেকোন সময় ক্যান্সেল করুন
            </div>
          </div>
        </section>

        {/* Login Modal */}
        {userType && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full mx-4 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white text-center">
                <h3 className="text-2xl font-bold">
                  {userType === 'teacher' ? '👨‍🏫 শিক্ষক হিসাবে প্রবেশ করুন' : '👨‍🎓 শিক্ষার্থী হিসাবে প্রবেশ করুন'}
                </h3>
              </div>
              
              <form className="p-6 space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">📧 ইমেইল</label>
                  <input 
                    type="email" 
                    className="input-field"
                    placeholder="আপনার ইমেইল দিন"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">🔑 পাসওয়ার্ড</label>
                  <input 
                    type="password" 
                    className="input-field"
                    placeholder="আপনার পাসওয়ার্ড দিন"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    আমাকে মনে রাখুন
                  </label>
                  <a href="#" className="text-blue-500 hover:text-blue-600">
                    পাসওয়ার্ড ভুলে গেছেন?
                  </a>
                </div>
                
                <div className="flex justify-between pt-4">
                  <button 
                    type="button"
                    onClick={() => setUserType(null)}
                    className="btn-secondary"
                  >
                    বাতিল
                  </button>
                  <button 
                    type="submit"
                    className="btn-primary"
                  >
                    প্রবেশ করুন
                  </button>
                </div>

                <div className="text-center text-sm text-gray-600 pt-4 border-t">
                  অ্যাকাউন্ট নেই?{' '}
                  <button 
                    type="button" 
                    className="text-blue-500 hover:text-blue-600 font-medium"
                    onClick={() => alert('রেজিস্ট্রেশন পেজে যান')}
                  >
                    নিবন্ধন করুন
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