// app/courses/page.jsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const CoursesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock courses data
  const coursesData = {
    enrolled: [
      {
        id: 1,
        name: 'গণিত - নবম শ্রেণী',
        subject: 'গণিত',
        teacher: 'মো: রহিম উদ্দিন',
        teacherAvatar: '👨‍🏫',
        progress: 85,
        totalLessons: 24,
        completedLessons: 18,
        nextClass: 'আজ, ১০:০০ AM',
        color: 'blue',
        icon: '➗',
        description: 'বীজগণিত, জ্যামিতি এবং ত্রিকোণমিতির মৌলিক বিষয়সমূহ',
        assignments: 3,
        quizzes: 2,
        rating: 4.8,
        students: 45
      },
      {
        id: 2,
        name: 'ইংরেজি ভাষা ও সাহিত্য',
        subject: 'ইংরেজি',
        teacher: 'মিসেস জাহানারা বেগম',
        teacherAvatar: '👩‍🏫',
        progress: 72,
        totalLessons: 30,
        completedLessons: 20,
        nextClass: 'আগামীকাল, ২:০০ PM',
        color: 'green',
        icon: '🔤',
        description: 'ইংরেজি ব্যাকরণ, রাইটিং স্কিল এবং সাহিত্য',
        assignments: 2,
        quizzes: 1,
        rating: 4.6,
        students: 42
      },
      {
        id: 3,
        name: 'পদার্থবিজ্ঞান - নবম',
        subject: 'বিজ্ঞান',
        teacher: 'ড. আলমগীর হোসেন',
        teacherAvatar: '👨‍🔬',
        progress: 90,
        totalLessons: 20,
        completedLessons: 16,
        nextClass: 'কাল, ৯:০০ AM',
        color: 'purple',
        icon: '⚡',
        description: 'গতি, বল, শক্তি এবং তাপগতিবিদ্যা',
        assignments: 1,
        quizzes: 3,
        rating: 4.9,
        students: 38
      },
      {
        id: 4,
        name: 'বাংলা ব্যাকরণ ও রচনা',
        subject: 'বাংলা',
        teacher: 'মিসেস চৌধুরী',
        teacherAvatar: '👩‍🎓',
        progress: 68,
        totalLessons: 25,
        completedLessons: 15,
        nextClass: 'পরশু, ১১:০০ AM',
        color: 'orange',
        icon: '📖',
        description: 'ব্যাকরণের নিয়ম, রচনা ও সাহিত্য বিশ্লেষণ',
        assignments: 4,
        quizzes: 2,
        rating: 4.5,
        students: 40
      },
      {
        id: 5,
        name: 'রসায়ন বিজ্ঞান',
        subject: 'বিজ্ঞান',
        teacher: 'ড. নাসরিন আহমেদ',
        teacherAvatar: '👩‍🔬',
        progress: 45,
        totalLessons: 18,
        completedLessons: 8,
        nextClass: 'আজ, ৩:০০ PM',
        color: 'red',
        icon: '🧪',
        description: 'মৌল, যৌগ এবং রাসায়নিক বিক্রিয়া',
        assignments: 2,
        quizzes: 1,
        rating: 4.7,
        students: 35
      },
      {
        id: 6,
        name: 'সামাজিক বিজ্ঞান',
        subject: 'সামাজিক বিজ্ঞান',
        teacher: 'মো: কামাল হোসেন',
        teacherAvatar: '👨‍💼',
        progress: 30,
        totalLessons: 22,
        completedLessons: 6,
        nextClass: 'আগামীকাল, ১২:০০ PM',
        color: 'indigo',
        icon: '🌍',
        description: 'ইতিহাস, ভূগোল এবং নাগরিকত্ব',
        assignments: 1,
        quizzes: 0,
        rating: 4.4,
        students: 48
      }
    ],
    available: [
      {
        id: 7,
        name: 'জীববিজ্ঞান',
        subject: 'বিজ্ঞান',
        teacher: 'ড. ফারহানা ইসলাম',
        teacherAvatar: '👩‍🔬',
        color: 'teal',
        icon: '🔬',
        description: 'প্রাণীজগৎ, উদ্ভিদবিদ্যা এবং মানব দেহ',
        duration: '১২ সপ্তাহ',
        level: 'মাধ্যমিক',
        rating: 4.8,
        students: 52,
        price: 'ফ্রি'
      },
      {
        id: 8,
        name: 'তথ্য ও যোগাযোগ প্রযুক্তি',
        subject: 'আইসিটি',
        teacher: 'ইঞ্জিনিয়ার রাজিব আহমেদ',
        teacherAvatar: '👨‍💻',
        color: 'cyan',
        icon: '💻',
        description: 'কম্পিউটার ফান্ডামেন্টালস এবং প্রোগ্রামিং বেসিক',
        duration: '১০ সপ্তাহ',
        level: 'শুরু',
        rating: 4.9,
        students: 65,
        price: 'ফ্রি'
      }
    ]
  };

  const filters = [
    { id: 'all', name: 'সব কোর্স' },
    { id: 'math', name: 'গণিত' },
    { id: 'science', name: 'বিজ্ঞান' },
    { id: 'english', name: 'ইংরেজি' },
    { id: 'bengali', name: 'বাংলা' },
    { id: 'social', name: 'সামাজিক বিজ্ঞান' },
    { id: 'ict', name: 'আইসিটি' }
  ];

  const ProgressBar = ({ percentage, color }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full bg-${color}-500`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );

  const CourseCard = ({ course, type = 'enrolled' }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      {/* Course Header */}
      <div className={`p-6 border-b border-gray-100 bg-gradient-to-r from-${course.color}-50 to-${course.color}-100`}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-${course.color}-500 rounded-xl flex items-center justify-center text-white text-xl`}>
              {course.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{course.name}</h3>
              <p className="text-gray-600 text-sm">{course.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 text-yellow-500">
              <span>⭐</span>
              <span className="font-semibold">{course.rating}</span>
            </div>
            <p className="text-sm text-gray-500">{course.students} জন শিক্ষার্থী</p>
          </div>
        </div>

        {/* Teacher Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{course.teacherAvatar}</span>
            <div>
              <p className="text-sm font-medium text-gray-900">{course.teacher}</p>
              <p className="text-xs text-gray-600">শিক্ষক</p>
            </div>
          </div>
          {type === 'enrolled' && course.nextClass && (
            <div className="bg-white px-3 py-1 rounded-full border border-gray-200">
              <p className="text-sm font-medium text-gray-700">{course.nextClass}</p>
            </div>
          )}
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {type === 'enrolled' ? (
          <>
            {/* Progress Section */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">কোর্স প্রোগ্রেস</span>
                <span className="text-sm font-bold text-gray-900">{course.progress}%</span>
              </div>
              <ProgressBar percentage={course.progress} color={course.color} />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{course.completedLessons}/{course.totalLessons} লেসন সম্পূর্ণ</span>
                <span>{100 - course.progress}% বাকি</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">{course.assignments}</div>
                <div className="text-xs text-gray-600">অ্যাসাইনমেন্ট</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">{course.quizzes}</div>
                <div className="text-xs text-gray-600">কুইজ</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Link 
                href={`/courses/${course.id}`}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors"
              >
                ক্লাসে যান
              </Link>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                📚
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Available Course Info */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">মেয়াদ:</span>
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">লেভেল:</span>
                <span className="font-medium">{course.level}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ফি:</span>
                <span className="font-bold text-green-600">{course.price}</span>
              </div>
            </div>

            {/* Enroll Button */}
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors">
              এনরোল করুন
            </button>
          </>
        )}
      </div>
    </div>
  );

  const filteredCourses = {
    enrolled: coursesData.enrolled.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'all' || 
                           course.subject.toLowerCase().includes(activeFilter);
      return matchesSearch && matchesFilter;
    }),
    available: coursesData.available.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'all' || 
                           course.subject.toLowerCase().includes(activeFilter);
      return matchesSearch && matchesFilter;
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mr-3"></div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  শিহ্মক
                </h1>
              </Link>
              <nav className="ml-8 flex space-x-4">
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  ড্যাশবোর্ড
                </Link>
                <Link href="/courses" className="bg-blue-100 text-blue-700 px-3 py-2 rounded-md font-medium">
                  কোর্সসমূহ
                </Link>
                <Link href="/attendance" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  উপস্থিতি
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">আহমেদ হাসান</p>
                <p className="text-sm text-gray-600">নবম শ্রেণী</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                আ
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">আমার কোর্সসমূহ</h1>
          <p className="text-xl text-gray-600">আপনার এনরোলকৃত এবং উপলব্ধ কোর্সসমূহ</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="কোর্স খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enrolled Courses Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">এনরোলকৃত কোর্স</h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {filteredCourses.enrolled.length}টি কোর্স
            </span>
          </div>

          {filteredCourses.enrolled.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.enrolled.map((course) => (
                <CourseCard key={course.id} course={course} type="enrolled" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">কোন কোর্স পাওয়া যায়নি</h3>
              <p className="text-gray-600">আপনার সার্চ বা ফিল্টারের সাথে মিলছে না</p>
            </div>
          )}
        </section>

        {/* Available Courses Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">নতুন কোর্স</h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {filteredCourses.available.length}টি কোর্স
            </span>
          </div>

          {filteredCourses.available.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.available.map((course) => (
                <CourseCard key={course.id} course={course} type="available" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-6xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">কোন নতুন কোর্স নেই</h3>
              <p className="text-gray-600">শীঘ্রই নতুন কোর্স যোগ করা হবে</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CoursesPage;