// app/notifications/page.jsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const NotificationsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'assignment',
      title: 'নতুন অ্যাসাইনমেন্ট',
      message: 'বীজগণিতের নতুন অ্যাসাইনমেন্ট যোগ করা হয়েছে',
      subject: 'গণিত',
      timestamp: '২০২৪-০১-১৮, ১০:৩০ AM',
      isRead: false,
      actionUrl: '/assignments/5',
      metadata: {
        dueDate: '২০২৪-০১-২৫',
        marks: 20,
        teacher: 'মো: রহিম উদ্দিন'
      }
    },
    {
      id: 2,
      type: 'result',
      title: 'অ্যাসাইনমেন্ট ফলাফল',
      message: 'আপনার বাংলা রচনা অ্যাসাইনমেন্টের ফলাফল প্রকাশিত হয়েছে',
      subject: 'বাংলা',
      timestamp: '২০২৪-০১-১৮, ০৯:১৫ AM',
      isRead: false,
      actionUrl: '/results/123',
      metadata: {
        obtainedMarks: 14,
        totalMarks: 15,
        grade: 'A+'
      }
    },
    {
      id: 3,
      type: 'feedback',
      title: 'শিক্ষকের ফিডব্যাক',
      message: 'মো: রহিম উদ্দিন আপনার গণিত অ্যাসাইনমেন্টে ফিডব্যাক দিয়েছেন',
      subject: 'গণিত',
      timestamp: '২০২৪-০১-১৭, ০৩:৪৫ PM',
      isRead: true,
      actionUrl: '/results/122',
      metadata: {
        teacher: 'মো: রহিম উদ্দিন',
        comment: 'ভালো প্রচেষ্টা! তবে কিছু গণনায় ভুল হয়েছে।'
      }
    },
    {
      id: 4,
      type: 'quiz',
      title: 'নতুন কুইজ',
      message: 'ইংরেজি Grammar এর নতুন কুইজ উপলব্ধ',
      subject: 'ইংরেজি',
      timestamp: '২০২৪-০১-১৭, ১১:২০ AM',
      isRead: true,
      actionUrl: '/quiz/8',
      metadata: {
        duration: '30 minutes',
        questions: 20,
        deadline: '২০২৪-০১-২০'
      }
    },
    {
      id: 5,
      type: 'announcement',
      title: 'ক্লাস নোটিশ',
      message: 'আগামীকাল গণিত ক্লাস ১০:০০ AM instead of ২:০০ PM হবে',
      subject: 'সাধারণ',
      timestamp: '২০২৪-০১-১৬, ০৪:৩০ PM',
      isRead: true,
      actionUrl: '/courses/math',
      metadata: {
        announcedBy: 'মো: রহিম উদ্দিন',
        priority: 'high'
      }
    },
    {
      id: 6,
      type: 'system',
      title: 'সিস্টেম আপডেট',
      message: 'আপনার প্রোফাইল আপডেট সফলভাবে সম্পন্ন হয়েছে',
      subject: 'সিস্টেম',
      timestamp: '২০২৪-০১-১৬, ১০:০০ AM',
      isRead: true,
      actionUrl: '/profile',
      metadata: {}
    },
    {
      id: 7,
      type: 'attendance',
      title: 'উপস্থিতি রিপোর্ট',
      message: 'গত সপ্তাহের আপনার উপস্থিতি রিপোর্ট প্রস্তুত হয়েছে',
      subject: 'উপস্থিতি',
      timestamp: '২০২৪-০১-১৫, ০৯:০০ AM',
      isRead: true,
      actionUrl: '/attendance',
      metadata: {
        percentage: 92,
        totalClasses: 25,
        present: 23
      }
    }
  ]);

  const filters = [
    { id: 'all', name: 'সব নোটিফিকেশন', count: notifications.length },
    { id: 'unread', name: 'অপঠিত', count: notifications.filter(n => !n.isRead).length },
    { id: 'assignment', name: 'অ্যাসাইনমেন্ট', count: notifications.filter(n => n.type === 'assignment').length },
    { id: 'result', name: 'ফলাফল', count: notifications.filter(n => n.type === 'result').length },
    { id: 'feedback', name: 'ফিডব্যাক', count: notifications.filter(n => n.type === 'feedback').length }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'assignment': return '📝';
      case 'result': return '📊';
      case 'feedback': return '💬';
      case 'quiz': return '🧠';
      case 'announcement': return '📢';
      case 'attendance': return '✅';
      case 'system': return '⚙️';
      default: return '🔔';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'assignment': return 'bg-blue-100 text-blue-600';
      case 'result': return 'bg-green-100 text-green-600';
      case 'feedback': return 'bg-purple-100 text-purple-600';
      case 'quiz': return 'bg-orange-100 text-orange-600';
      case 'announcement': return 'bg-red-100 text-red-600';
      case 'attendance': return 'bg-teal-100 text-teal-600';
      case 'system': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.isRead;
    return notification.type === activeFilter;
  });

  const NotificationCard = ({ notification }) => (
    <div className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
      notification.isRead ? 'border-gray-100' : 'border-blue-200 bg-blue-50'
    }`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start space-x-4 flex-1">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${getNotificationColor(notification.type)}`}>
              {getNotificationIcon(notification.type)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className={`font-semibold ${
                  notification.isRead ? 'text-gray-900' : 'text-blue-900'
                }`}>
                  {notification.title}
                </h3>
                {!notification.isRead && (
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    নতুন
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-3">{notification.message}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {notification.subject}
                </span>
                <span>{notification.timestamp}</span>
              </div>

              {/* Metadata */}
              {notification.metadata && Object.keys(notification.metadata).length > 0 && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    {notification.type === 'assignment' && (
                      <>
                        <div>
                          <span className="text-gray-600">জমা দেওয়ার তারিখ:</span>
                          <span className="font-medium ml-1">{notification.metadata.dueDate}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">নম্বর:</span>
                          <span className="font-medium ml-1">{notification.metadata.marks}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">শিক্ষক:</span>
                          <span className="font-medium ml-1">{notification.metadata.teacher}</span>
                        </div>
                      </>
                    )}
                    
                    {notification.type === 'result' && (
                      <>
                        <div>
                          <span className="text-gray-600">প্রাপ্ত নম্বর:</span>
                          <span className="font-medium text-green-600 ml-1">
                            {notification.metadata.obtainedMarks}/{notification.metadata.totalMarks}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">গ্রেড:</span>
                          <span className="font-medium text-green-600 ml-1">{notification.metadata.grade}</span>
                        </div>
                      </>
                    )}
                    
                    {notification.type === 'feedback' && (
                      <div className="col-span-2">
                        <span className="text-gray-600">মন্তব্য:</span>
                        <span className="font-medium ml-1">"{notification.metadata.comment}"</span>
                      </div>
                    )}
                    
                    {notification.type === 'quiz' && (
                      <>
                        <div>
                          <span className="text-gray-600">সময়:</span>
                          <span className="font-medium ml-1">{notification.metadata.duration}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">প্রশ্ন:</span>
                          <span className="font-medium ml-1">{notification.metadata.questions}টি</span>
                        </div>
                      </>
                    )}
                    
                    {notification.type === 'attendance' && (
                      <>
                        <div>
                          <span className="text-gray-600">উপস্থিতি:</span>
                          <span className="font-medium ml-1">{notification.metadata.percentage}%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">ক্লাস:</span>
                          <span className="font-medium ml-1">
                            {notification.metadata.present}/{notification.metadata.totalClasses}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            {!notification.isRead && (
              <button
                onClick={() => markAsRead(notification.id)}
                className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                title="পঠিত মার্ক করুন"
              >
                ✓
              </button>
            )}
            <button
              onClick={() => deleteNotification(notification.id)}
              className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              title="ডিলিট করুন"
            >
              🗑️
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex space-x-3">
            <Link 
              href={notification.actionUrl}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              দেখুন
            </Link>
            <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              পরে দেখব
            </button>
          </div>
          
          {notification.type === 'assignment' && (
            <span className="text-orange-600 text-sm font-medium">
              ⏰ {notification.metadata.dueDate} পর্যন্ত
            </span>
          )}
        </div>
      </div>
    </div>
  );

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
                <Link href="/courses" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  কোর্সসমূহ
                </Link>
                <Link href="/assignments" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  অ্যাসাইনমেন্ট
                </Link>
                <Link href="/notifications" className="bg-blue-100 text-blue-700 px-3 py-2 rounded-md font-medium">
                  নোটিফিকেশন
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">নোটিফিকেশন</h1>
            <p className="text-xl text-gray-600">আপনার সকল আপডেট এবং alerts একসাথে দেখুন</p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={markAllAsRead}
              disabled={notifications.filter(n => !n.isRead).length === 0}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              সব পড়া হয়েছে
            </button>
            <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors">
              সেটিংস
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">নোটিফিকেশন স্ট্যাটস</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">মোট:</span>
                  <span className="font-bold text-gray-900">{notifications.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">অপঠিত:</span>
                  <span className="font-bold text-blue-600">
                    {notifications.filter(n => !n.isRead).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">আজ:</span>
                  <span className="font-bold text-green-600">
                    {notifications.filter(n => n.timestamp.includes('২০২৪-০১-১৮')).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">ফিল্টার</h3>
              <div className="space-y-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      activeFilter === filter.id
                        ? 'bg-blue-100 text-blue-700 font-semibold border-2 border-blue-200'
                        : 'text-gray-600 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{filter.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        activeFilter === filter.id
                          ? 'bg-blue-200 text-blue-800'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {filter.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Types */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">নোটিফিকেশন টাইপ</h3>
              <div className="space-y-3">
                {[
                  { type: 'assignment', label: 'অ্যাসাইনমেন্ট', color: 'bg-blue-100 text-blue-600' },
                  { type: 'result', label: 'ফলাফল', color: 'bg-green-100 text-green-600' },
                  { type: 'feedback', label: 'ফিডব্যাক', color: 'bg-purple-100 text-purple-600' },
                  { type: 'quiz', label: 'কুইজ', color: 'bg-orange-100 text-orange-600' },
                  { type: 'announcement', label: 'ঘোষণা', color: 'bg-red-100 text-red-600' }
                ].map((item) => (
                  <div key={item.type} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                      {getNotificationIcon(item.type)}
                    </div>
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-3">
            {filteredNotifications.length > 0 ? (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="text-6xl mb-4">🔔</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">কোন নোটিফিকেশন নেই</h3>
                <p className="text-gray-600 mb-6">
                  {activeFilter === 'unread' 
                    ? 'আপনার সব নোটিফিকেশন পড়া হয়েছে' 
                    : 'আপনার ফিল্টারের সাথে মিলছে না'
                  }
                </p>
                {activeFilter !== 'all' && (
                  <button
                    onClick={() => setActiveFilter('all')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    সব নোটিফিকেশন দেখুন
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;