'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PersonalNotes() {
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({
    categoryCounts: {},
    totalNotes: 0,
    pinnedNotes: 0,
    avgWordCount: 0
  })

  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: [],
    isPinned: false
    // color field removed - will be auto-assigned based on category
  })

  const categories = [
    { id: 'general', name: 'সাধারণ', color: 'gray', bgClass: 'bg-gray-50', borderClass: 'border-gray-200', textClass: 'text-gray-800' },
    { id: 'lecture', name: 'লেকচার নোটস', color: 'blue', bgClass: 'bg-blue-50', borderClass: 'border-blue-200', textClass: 'text-blue-800' },
    { id: 'assignment', name: 'অ্যাসাইনমেন্ট', color: 'green', bgClass: 'bg-green-50', borderClass: 'border-green-200', textClass: 'text-green-800' },
    { id: 'project', name: 'প্রজেক্ট', color: 'purple', bgClass: 'bg-purple-50', borderClass: 'border-purple-200', textClass: 'text-purple-800' },
    { id: 'exam', name: 'পরীক্ষা', color: 'red', bgClass: 'bg-red-50', borderClass: 'border-red-200', textClass: 'text-red-800' },
    { id: 'personal', name: 'ব্যক্তিগত', color: 'yellow', bgClass: 'bg-yellow-50', borderClass: 'border-yellow-200', textClass: 'text-yellow-800' }
  ]

  // Get color classes based on category
  const getColorClass = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId)
    if (category) {
      return `${category.bgClass} ${category.borderClass}`
    }
    return 'bg-gray-50 border-gray-200'
  }

  // Get text color class based on category
  const getTextColorClass = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.textClass : 'text-gray-800'
  }

  // Get badge color class based on category
  const getBadgeColorClass = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId)
    if (category) {
      switch(category.color) {
        case 'blue': return 'bg-blue-200 text-blue-900'
        case 'green': return 'bg-green-200 text-green-900'
        case 'purple': return 'bg-purple-200 text-purple-900'
        case 'red': return 'bg-red-200 text-red-900'
        case 'yellow': return 'bg-yellow-200 text-yellow-900'
        case 'gray': return 'bg-gray-200 text-gray-900'
        default: return 'bg-gray-200 text-gray-900'
      }
    }
    return 'bg-gray-200 text-gray-900'
  }

  // Fetch notes and stats
  const fetchNotesAndStats = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (selectedCategory !== 'all') params.append('category', selectedCategory)
      params.append('sortBy', sortBy)

      const [notesResponse, statsResponse] = await Promise.all([
        fetch(`/api/notes?${params}`),
        fetch('/api/notes/stats')
      ])

      const notesResult = await notesResponse.json()
      const statsResult = await statsResponse.json()
      
      if (notesResult.success) {
        setNotes(notesResult.data)
      }
      
      if (statsResult.success) {
        setStats(statsResult.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchNotesAndStats()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedCategory, sortBy])

  // Client-side filtering for instant response
  useEffect(() => {
    let filtered = notes
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term) ||
        (note.tags && note.tags.some(tag => tag.toLowerCase().includes(term)))
      )
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(note => note.category === selectedCategory)
    }
    
    filtered = [...filtered].sort((a, b) => {
      if (a.isPinned !== b.isPinned) {
        return b.isPinned - a.isPinned
      }
      
      if (sortBy === 'date') {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      } else if (sortBy === 'wordCount') {
        return b.wordCount - a.wordCount
      }
      return 0
    })
    
    setFilteredNotes(filtered)
  }, [notes, searchTerm, selectedCategory, sortBy])

  // Create note with optimistic update
  const createNote = async () => {
    if (!newNote.title.trim()) return

    const tempId = Date.now()
    const newNoteData = {
      ...newNote,
      _id: tempId,
      createdAt: new Date(),
      updatedAt: new Date(),
      wordCount: newNote.content.split(/\s+/).filter(word => word.length > 0).length
    }

    // Optimistic update
    setNotes(prev => [newNoteData, ...prev])
    
    setStats(prev => ({
      ...prev,
      totalNotes: prev.totalNotes + 1,
      pinnedNotes: newNote.isPinned ? prev.pinnedNotes + 1 : prev.pinnedNotes,
      categoryCounts: {
        ...prev.categoryCounts,
        [newNote.category]: (prev.categoryCounts[newNote.category] || 0) + 1
      }
    }))

    setNewNote({
      title: '',
      content: '',
      category: 'general',
      tags: [],
      isPinned: false
    })

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setNotes(prev => prev.map(note => 
          note._id === tempId ? result.data : note
        ))
      } else {
        setNotes(prev => prev.filter(note => note._id !== tempId))
        setStats(prev => ({
          ...prev,
          totalNotes: prev.totalNotes - 1,
          pinnedNotes: newNote.isPinned ? prev.pinnedNotes - 1 : prev.pinnedNotes,
          categoryCounts: {
            ...prev.categoryCounts,
            [newNote.category]: (prev.categoryCounts[newNote.category] || 1) - 1
          }
        }))
        alert('নোট তৈরি করতে সমস্যা হয়েছে: ' + result.error)
      }
    } catch (error) {
      console.error('Error creating note:', error)
      setNotes(prev => prev.filter(note => note._id !== tempId))
      setStats(prev => ({
        ...prev,
        totalNotes: prev.totalNotes - 1,
        pinnedNotes: newNote.isPinned ? prev.pinnedNotes - 1 : prev.pinnedNotes,
        categoryCounts: {
          ...prev.categoryCounts,
          [newNote.category]: Math.max((prev.categoryCounts[newNote.category] || 1) - 1, 0)
        }
      }))
      alert('নোট তৈরি করতে সমস্যা হয়েছে')
    }
  }

  // View full note in modal
  const viewFullNote = (note) => {
    setSelectedNote(note)
    setShowModal(true)
    setIsEditing(false)
  }

  // Edit note
  const editNote = (note) => {
    setSelectedNote(note)
    setShowModal(true)
    setIsEditing(true)
  }

  // Update note
  const updateNote = async () => {
    if (!selectedNote || !selectedNote.title.trim()) return

    const originalNote = notes.find(note => note._id === selectedNote._id)
    
    setNotes(prev => prev.map(note => 
      note._id === selectedNote._id ? selectedNote : note
    ))

    try {
      const response = await fetch(`/api/notes/${selectedNote._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedNote),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setIsEditing(false)
        setShowModal(false)
        setSelectedNote(null)
        fetchStats()
      } else {
        setNotes(prev => prev.map(note => 
          note._id === selectedNote._id ? originalNote : note
        ))
        alert('নোট আপডেট করতে সমস্যা হয়েছে: ' + result.error)
      }
    } catch (error) {
      console.error('Error updating note:', error)
      setNotes(prev => prev.map(note => 
        note._id === selectedNote._id ? originalNote : note
      ))
      alert('নোট আপডেট করতে সমস্যা হয়েছে')
    }
  }

  // Delete note
  const deleteNote = async (id) => {
    if (!confirm('আপনি কি এই নোটটি ডিলিট করতে চান?')) return

    const noteToDelete = notes.find(note => note._id === id)
    if (!noteToDelete) return

    setNotes(prev => prev.filter(note => note._id !== id))
    setStats(prev => ({
      ...prev,
      totalNotes: prev.totalNotes - 1,
      pinnedNotes: noteToDelete.isPinned ? prev.pinnedNotes - 1 : prev.pinnedNotes,
      categoryCounts: {
        ...prev.categoryCounts,
        [noteToDelete.category]: Math.max((prev.categoryCounts[noteToDelete.category] || 1) - 1, 0)
      }
    }))

    if (selectedNote && selectedNote._id === id) {
      setSelectedNote(null)
      setShowModal(false)
    }

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      })
      
      const result = await response.json()
      
      if (!result.success) {
        setNotes(prev => [...prev, noteToDelete])
        alert('নোট ডিলিট করতে সমস্যা হয়েছে: ' + result.error)
      }
    } catch (error) {
      console.error('Error deleting note:', error)
      setNotes(prev => [...prev, noteToDelete])
      alert('নোট ডিলিট করতে সমস্যা হয়েছে')
    }
  }

  // Toggle pin
  const togglePin = async (id) => {
    const note = notes.find(note => note._id === id)
    if (!note) return

    setNotes(prev => prev.map(note =>
      note._id === id ? { ...note, isPinned: !note.isPinned } : note
    ))

    setStats(prev => ({
      ...prev,
      pinnedNotes: note.isPinned ? prev.pinnedNotes - 1 : prev.pinnedNotes + 1
    }))

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPinned: !note.isPinned }),
      })
      
      const result = await response.json()
      
      if (!result.success) {
        setNotes(prev => prev.map(note =>
          note._id === id ? { ...note, isPinned: note.isPinned } : note
        ))
        setStats(prev => ({
          ...prev,
          pinnedNotes: note.isPinned ? prev.pinnedNotes + 1 : prev.pinnedNotes - 1
        }))
      }
    } catch (error) {
      console.error('Error toggling pin:', error)
      setNotes(prev => prev.map(note =>
        note._id === id ? { ...note, isPinned: note.isPinned } : note
      ))
      setStats(prev => ({
        ...prev,
        pinnedNotes: note.isPinned ? prev.pinnedNotes + 1 : prev.pinnedNotes - 1
      }))
    }
  }

  // Fetch only stats
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/notes/stats')
      const result = await response.json()
      
      if (result.success) {
        setStats(result.data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const addTag = (tag) => {
    if (tag.trim() && !newNote.tags.includes(tag.trim())) {
      setNewNote({
        ...newNote,
        tags: [...newNote.tags, tag.trim()]
      })
    }
  }

  const removeTag = (tagToRemove) => {
    setNewNote({
      ...newNote,
      tags: newNote.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.name : 'সাধারণ'
  }

  const getCategoryCount = (categoryId) => {
    return stats.categoryCounts[categoryId] || 0
  }

  const inputFieldClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ব্যক্তিগত নোটস</h1>
            <p className="text-gray-700 mt-2">আপনার সমস্ত নোটস একসাথে সংরক্ষণ এবং ব্যবস্থাপনা করুন</p>
          </div>
          
          <button 
            onClick={() => {
              setSelectedNote(null)
              setIsEditing(false)
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 flex items-center space-x-2 shadow-md"
          >
            <i className="fas fa-plus"></i>
            <span>নতুন নোট</span>
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">খুঁজুন এবং ফিল্টার</h3>
              
              <div className="mb-4">
                <label className="block text-gray-800 mb-2 font-medium">খুঁজুন</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={inputFieldClass}
                    placeholder="নোটস খুঁজুন..."
                  />
                  <i className="fas fa-search absolute left-3 top-3 text-gray-500"></i>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-800 mb-2 font-medium">সাজান</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={inputFieldClass}
                >
                  <option value="date">সর্বশেষ সম্পাদিত</option>
                  <option value="title">শিরোনাম</option>
                  <option value="wordCount">শব্দ সংখ্যা</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-800 mb-2 font-medium">ক্যাটাগরি</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left p-3 rounded-lg transition duration-300 ${
                      selectedCategory === 'all' 
                        ? 'bg-blue-100 border border-blue-300 text-blue-800' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">সকল নোটস</span>
                      <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                        {stats.totalNotes}
                      </span>
                    </div>
                  </button>
                  
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition duration-300 ${
                        selectedCategory === category.id 
                          ? `${category.bgClass} border ${category.borderClass} ${category.textClass}` 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                        <span className={`${getBadgeColorClass(category.id)} text-xs px-2 py-1 rounded-full font-semibold`}>
                          {getCategoryCount(category.id)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">দ্রুত পরিসংখ্যান</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-100 rounded-lg border border-blue-200">
                  <div>
                    <p className="text-sm text-blue-800 font-medium">মোট নোটস</p>
                    <p className="text-2xl font-bold text-blue-900">{stats.totalNotes}</p>
                  </div>
                  <i className="fas fa-sticky-note text-blue-600 text-2xl"></i>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-green-100 rounded-lg border border-green-200">
                  <div>
                    <p className="text-sm text-green-800 font-medium">পিন করা</p>
                    <p className="text-2xl font-bold text-green-900">
                      {stats.pinnedNotes}
                    </p>
                  </div>
                  <i className="fas fa-thumbtack text-green-600 text-2xl"></i>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-purple-100 rounded-lg border border-purple-200">
                  <div>
                    <p className="text-sm text-purple-800 font-medium">গড় শব্দ</p>
                    <p className="text-2xl font-bold text-purple-900">
                      {stats.avgWordCount}
                    </p>
                  </div>
                  <i className="fas fa-font text-purple-600 text-2xl"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3">
            {/* Notes List */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedCategory === 'all' ? 'সকল নোটস' : getCategoryName(selectedCategory)}
                  <span className="text-gray-700 text-sm font-normal ml-2">
                    ({filteredNotes.length} টি নোট)
                  </span>
                </h2>
                
                {loading && (
                  <div className="flex items-center space-x-2 text-sm text-blue-700 font-medium">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span>আপডেট হচ্ছে...</span>
                  </div>
                )}
              </div>

              {filteredNotes.length === 0 ? (
                <div className="text-center py-12">
                  <i className="fas fa-sticky-note text-gray-400 text-6xl mb-4"></i>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">কোনো নোট পাওয়া যায়নি</h3>
                  <p className="text-gray-500">
                    {searchTerm || selectedCategory !== 'all' 
                      ? 'আপনার সার্চ বা ফিল্টারের সাথে মিলছে না' 
                      : 'এখনও কোনো নোট তৈরি করা হয়নি'
                    }
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNotes.map(note => (
                    <div
                      key={note._id}
                      className={`border-2 rounded-lg p-4 transition-all duration-300 hover:shadow-md ${getColorClass(note.category)}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          {note.isPinned && (
                            <i className="fas fa-thumbtack text-yellow-600 text-sm"></i>
                          )}
                          <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                            {note.title}
                          </h3>
                        </div>
                        <button
                          onClick={() => togglePin(note._id)}
                          className={`p-2 rounded-lg ${
                            note.isPinned 
                              ? 'text-yellow-600 hover:bg-yellow-100' 
                              : 'text-gray-500 hover:bg-gray-100'
                          }`}
                        >
                          pin <i className={`fas fa-thumbtack ${note.isPinned ? 'fas' : 'far'}`}></i>
                        </button>
                      </div>
                      
                      <p className="text-gray-700 text-sm mb-3 line-clamp-3 leading-relaxed">
                        {note.content}
                      </p>
                      
                      <div className="flex justify-between items-center text-xs text-gray-600 mb-3">
                        <div className="flex items-center space-x-2">
                          <span className={`${getBadgeColorClass(note.category)} px-2 py-1 rounded font-medium`}>
                            {getCategoryName(note.category)}
                          </span>
                          <span>{note.wordCount} শব্দ</span>
                        </div>
                        <span className="font-medium">{formatDate(note.updatedAt)}</span>
                      </div>
                      
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {note.tags.map(tag => (
                            <span
                              key={tag}
                              className="bg-blue-200 text-blue-900 text-xs px-2 py-1 rounded font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="flex justify-between space-x-2">
                        <button
                          onClick={() => viewFullNote(note)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition duration-300"
                        >
                          ভিউ
                        </button>
                        <button
                          onClick={() => editNote(note)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm font-medium transition duration-300"
                        >
                          এডিট
                        </button>
                        <button
                          onClick={() => deleteNote(note._id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-medium transition duration-300"
                        >
                          ডিলিট
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Create New Note */}
            {!selectedNote && (
              <div className="mt-8">
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">নতুন নোট তৈরি করুন</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-800 mb-2 font-medium">শিরোনাম</label>
                      <input
                        type="text"
                        value={newNote.title}
                        onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                        className={inputFieldClass}
                        placeholder="নোটের শিরোনাম"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-800 mb-2 font-medium">বিষয়বস্তু</label>
                      <textarea
                        value={newNote.content}
                        onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                        className={inputFieldClass}
                        rows="6"
                        placeholder="আপনার নোট লিখুন..."
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-800 mb-2 font-medium">ক্যাটাগরি</label>
                        <select
                          value={newNote.category}
                          onChange={(e) => setNewNote({...newNote, category: e.target.value})}
                          className={inputFieldClass}
                        >
                          {categories.map(category => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="flex items-center">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newNote.isPinned}
                            onChange={(e) => setNewNote({...newNote, isPinned: e.target.checked})}
                            className="rounded text-blue-600 focus:ring-blue-500 h-5 w-5"
                          />
                          <span className="text-gray-800 font-medium">পিন করুন</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-800 mb-2 font-medium">ট্যাগস</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {newNote.tags.map(tag => (
                          <span
                            key={tag}
                            className="bg-blue-200 text-blue-900 px-3 py-1 rounded text-sm flex items-center space-x-1 font-medium"
                          >
                            <span>#{tag}</span>
                            <button
                              onClick={() => removeTag(tag)}
                              className="text-blue-700 hover:text-blue-900 ml-1"
                            >
                              <i className="fas fa-times text-xs"></i>
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="নতুন ট্যাগ যোগ করুন..."
                          className={inputFieldClass}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addTag(e.target.value)
                              e.target.value = ''
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            const input = document.querySelector('input[placeholder="নতুন ট্যাগ যোগ করুন..."]')
                            if (input.value.trim()) {
                              addTag(input.value.trim())
                              input.value = ''
                            }
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition duration-300 font-medium whitespace-nowrap"
                        >
                          যোগ করুন
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={createNote}
                        disabled={!newNote.title.trim()}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 shadow-md"
                      >
                        নোট তৈরি করুন
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Note Modal */}
        {showModal && selectedNote && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="p-6 overflow-y-auto max-h-[85vh]">
                {isEditing ? (
                  /* Edit Mode */
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-900">নোট এডিট করুন</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setIsEditing(false)
                            setShowModal(false)
                          }}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-300 font-medium"
                        >
                          বাতিল
                        </button>
                        <button
                          onClick={updateNote}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300 font-medium"
                        >
                          সেভ করুন
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-800 mb-2 font-medium">শিরোনাম</label>
                      <input
                        type="text"
                        value={selectedNote.title}
                        onChange={(e) => setSelectedNote({...selectedNote, title: e.target.value})}
                        className={inputFieldClass}
                        placeholder="নোটের শিরোনাম"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-800 mb-2 font-medium">বিষয়বস্তু</label>
                      <textarea
                        value={selectedNote.content}
                        onChange={(e) => setSelectedNote({...selectedNote, content: e.target.value})}
                        className={inputFieldClass}
                        rows="12"
                        placeholder="আপনার নোট লিখুন..."
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-800 mb-2 font-medium">ক্যাটাগরি</label>
                        <select
                          value={selectedNote.category}
                          onChange={(e) => setSelectedNote({...selectedNote, category: e.target.value})}
                          className={inputFieldClass}
                        >
                          {categories.map(category => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="flex items-center">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedNote.isPinned}
                            onChange={(e) => setSelectedNote({...selectedNote, isPinned: e.target.checked})}
                            className="rounded text-blue-600 focus:ring-blue-500 h-5 w-5"
                          />
                          <span className="text-gray-800 font-medium">পিন করুন</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-800 mb-2 font-medium">ট্যাগস</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {selectedNote.tags && selectedNote.tags.map(tag => (
                          <span
                            key={tag}
                            className="bg-blue-200 text-blue-900 px-3 py-1 rounded text-sm flex items-center space-x-1 font-medium"
                          >
                            <span>#{tag}</span>
                            <button
                              onClick={() => setSelectedNote({
                                ...selectedNote,
                                tags: selectedNote.tags.filter(t => t !== tag)
                              })}
                              className="text-blue-700 hover:text-blue-900 ml-1"
                            >
                              <i className="fas fa-times text-xs"></i>
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="নতুন ট্যাগ যোগ করুন..."
                        className={inputFieldClass}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            setSelectedNote({
                              ...selectedNote,
                              tags: [...(selectedNote.tags || []), e.target.value]
                            })
                            e.target.value = ''
                          }
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  /* View Mode */
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          {selectedNote.isPinned && (
                            <i className="fas fa-thumbtack text-yellow-600"></i>
                          )}
                          <h3 className="text-xl font-semibold text-gray-900">
                            {selectedNote.title}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-700 font-medium">
                          <span className={`${getBadgeColorClass(selectedNote.category)} px-3 py-1 rounded`}>
                            {getCategoryName(selectedNote.category)}
                          </span>
                          <span>{selectedNote.wordCount} শব্দ</span>
                          <span>{formatDate(selectedNote.updatedAt)}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => togglePin(selectedNote._id)}
                          className={`p-3 rounded-lg ${
                            selectedNote.isPinned 
                              ? 'text-yellow-600 hover:bg-yellow-100' 
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <i className={`fas fa-thumbtack ${selectedNote.isPinned ? 'fas' : 'far'}`}>pin</i>
                        </button>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="p-3 text-blue-600 hover:bg-blue-100 rounded-lg"
                        >
                          <i className="fas fa-edit">Edit</i>
                        </button>
                        <button
                          onClick={() => {
                            setShowModal(false)
                            deleteNote(selectedNote._id)
                          }}
                          className="p-3 text-red-600 hover:bg-red-100 rounded-lg"
                        >
                          <i className="fas fa-trash">Delete</i>
                        </button>
                        <button
                          onClick={() => setShowModal(false)}
                          className="p-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                          <i className="fas fa-times">Close</i>
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-300 pt-4">
                      <div className="prose max-w-none">
                        {selectedNote.content.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    {selectedNote.tags && selectedNote.tags.length > 0 && (
                      <div className="border-t border-gray-300 pt-4">
                        <h4 className="font-semibold text-gray-800 mb-2">ট্যাগস:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedNote.tags.map(tag => (
                            <span
                              key={tag}
                              className="bg-blue-200 text-blue-900 px-3 py-1 rounded text-sm font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}