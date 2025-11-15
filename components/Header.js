'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
  { name: 'হোম', href: '/', icon: 'fa-home' },
  // { name: 'স্মার্ট ক্লাসরুম', href: '/smart-classroom', icon: 'fa-chalkboard-teacher' },
  { name: 'নোটস', href: '/notes', icon: 'fa-sticky-note' },
  { name: 'পোলস ও কুইজেস', href: '/polls-quizzes', icon: 'fa-poll' },
  // { name: 'ব্রেকআউট রুমস', href: '/breakout-rooms', icon: 'fa-users' },
  { name: 'উপস্থিতি', href: '/attendance', icon: 'fa-clipboard-check' },
  { name: 'গ্রেডস', href: '/grades', icon: 'fa-chart-line' },
  // { name: 'অ্যানালিটিক্স', href: '/analytics', icon: 'fa-robot' },
  { name: 'কমিউনিটি', href: '/community', icon: 'fa-comments' },
  { name: 'প্রোফাইল', href: '/profile', icon: 'fa-user' }
]

  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <i className="fas fa-graduation-cap text-white text-xl"></i>
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-800">শিক্ষা</span>
              <span className="text-2xl font-bold text-blue-600">প্ল্যাটফর্ম</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navigation.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-300 group"
              >
                <i className={`fas ${item.icon} text-gray-400 group-hover:text-blue-500`}></i>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
              লগইন
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
              নিবন্ধন
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className={`fas ${item.icon} w-5 text-center`}></i>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
            
            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-gray-200">
              <button className="w-full text-center py-3 text-gray-700 hover:text-blue-600 font-medium transition duration-300">
                লগইন
              </button>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                নিবন্ধন
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}