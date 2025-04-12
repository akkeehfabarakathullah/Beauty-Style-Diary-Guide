import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Calendar, CheckCircle2, ListTodo, Palette, Timer, Star, Plus, X, Search, Filter, SortAsc, PieChart } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface DiaryEntry {
  id: string;
  date: string;
  category: 'skincare' | 'fashion';
  title: string;
  notes: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'skincare' | 'fashion'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');
  const [showStats, setShowStats] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);

  const motivationalMessages = [
    "You're absolutely glowing today! ✨",
    "Your beauty radiates from within! 💫",
    "You're a masterpiece in progress! 🎨",
    "Keep shining, beautiful soul! ⭐",
    "You're stunning inside and out! 💝",
    "Your self-care journey is inspiring! 🌟",
    "Embrace your unique beauty! 🦋",
    "You're making magic happen! ✨",
    "Your confidence is your superpower! 💪",
    "You're a ray of sunshine! ☀️"
  ];

  const [currentMessage, setCurrentMessage] = useState('');

  const showMotivationalMessage = () => {
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setCurrentMessage(randomMessage);
    setShowMotivation(true);
    setTimeout(() => setShowMotivation(false), 3000);
  };

  const [newEntry, setNewEntry] = useState<Omit<DiaryEntry, 'id' | 'completed'>>({
    date: new Date().toISOString().split('T')[0],
    category: 'skincare',
    title: '',
    notes: '',
    priority: 'medium',
    tags: [],
  });

  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: DiaryEntry = {
      id: uuidv4(),
      ...newEntry,
      completed: false,
      tags: newEntry.tags,
    };
    setEntries([...entries, entry]);
    setShowForm(false);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      category: 'skincare',
      title: '',
      notes: '',
      priority: 'medium',
      tags: [],
    });
  };

  const toggleComplete = (id: string) => {
    setEntries(entries.map(entry =>
      entry.id === id ? { ...entry, completed: !entry.completed } : entry
    ));
  };

  const deleteEntry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setEntries(entries.filter(entry => entry.id !== entry));
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (!newEntry.tags.includes(newTag)) {
        setNewEntry({ ...newEntry, tags: [...newEntry.tags, newTag] });
      }
      e.currentTarget.value = '';
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewEntry({
      ...newEntry,
      tags: newEntry.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const filteredAndSortedEntries = entries
    .filter(entry => {
      const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          entry.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = filterCategory === 'all' || entry.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || 
                          (filterStatus === 'completed' && entry.completed) ||
                          (filterStatus === 'pending' && !entry.completed);
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
    });

  const stats = {
    total: entries.length,
    completed: entries.filter(e => e.completed).length,
    skincare: entries.filter(e => e.category === 'skincare').length,
    fashion: entries.filter(e => e.category === 'fashion').length,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <header className="bg-white shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-pink-500" />
            <h1 className="text-2xl font-semibold text-gray-900">Beauty & Style Diary Guide</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowStats(!showStats)}
              className="text-gray-600 hover:text-pink-500"
            >
              <PieChart className="h-6 w-6" />
            </button>
            <button
              onClick={showMotivationalMessage}
              className="text-pink-500 hover:text-pink-600 transition-colors"
            >
              <Heart className="h-6 w-6" />
            </button>
          </div>
        </div>
        {showMotivation && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-6 py-3 rounded-full shadow-lg animate-fade-in-out z-50">
            {currentMessage}
          </div>
        )}
      </header>

      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, -20px); }
          10% { opacity: 1; transform: translate(-50%, 0); }
          90% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, -20px); }
        }
        .animate-fade-in-out {
          animation: fadeInOut 3s ease-in-out;
        }
      `}</style>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {showStats && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-pink-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Total Entries</p>
                <p className="text-2xl font-bold text-pink-600">{stats.total}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Skincare Entries</p>
                <p className="text-2xl font-bold text-blue-600">{stats.skincare}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Fashion Entries</p>
                <p className="text-2xl font-bold text-purple-600">{stats.fashion}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Introduction Card */}
          <div className="bg-white rounded-xl shadow-md p-6 col-span-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Create Your Perfect Beauty & Style Tracker</h2>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Add New Entry
              </button>
            </div>

            {/* Search and Filter Controls */}
            <div className="grid gap-4 md:grid-cols-4 mt-6">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as 'all' | 'skincare' | 'fashion')}
                className="rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              >
                <option value="all">All Categories</option>
                <option value="skincare">Skincare</option>
                <option value="fashion">Fashion</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'completed' | 'pending')}
                className="rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'priority')}
                className="rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              >
                <option value="date">Sort by Date</option>
                <option value="priority">Sort by Priority</option>
              </select>
            </div>
          </div>

          {/* Entry Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">New Diary Entry</h3>
                  <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={newEntry.date}
                      onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newEntry.category}
                      onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value as 'skincare' | 'fashion' })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    >
                      <option value="skincare">Skincare</option>
                      <option value="fashion">Fashion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={newEntry.priority}
                      onChange={(e) => setNewEntry({ ...newEntry, priority: e.target.value as 'low' | 'medium' | 'high' })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={newEntry.title}
                      onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={newEntry.notes}
                      onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                    <input
                      type="text"
                      placeholder="Press Enter to add tags"
                      onKeyDown={handleTagInput}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newEntry.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-pink-100 text-pink-800"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-pink-600 hover:text-pink-800"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
                  >
                    Save Entry
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Entries List */}
          {filteredAndSortedEntries.length > 0 && (
            <div className="col-span-full">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Diary Entries</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredAndSortedEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className={`bg-white rounded-xl shadow-md p-6 ${
                      entry.completed ? 'border-2 border-green-500' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-sm text-gray-500">{entry.date}</span>
                        <h3 className="text-lg font-medium text-gray-900">{entry.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-pink-100 text-pink-800">
                            {entry.category}
                          </span>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${getPriorityColor(entry.priority)}`}>
                            {entry.priority}
                          </span>
                        </div>
                      </div>
                      <button onClick={() => deleteEntry(entry.id)} className="text-gray-400 hover:text-red-500">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-4">{entry.notes}</p>
                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {entry.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={() => toggleComplete(entry.id)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-md ${
                        entry.completed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {entry.completed ? 'Completed' : 'Mark Complete'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Feature Cards */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-6 w-6 text-pink-500" />
              <h3 className="text-lg font-medium text-gray-900">Daily Tracking</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Morning skincare routine</li>
              <li>• Evening skincare routine</li>
              <li>• Outfit planning</li>
              <li>• Product usage tracking</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="h-6 w-6 text-pink-500" />
              <h3 className="text-lg font-medium text-gray-900">Progress Monitoring</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Skin improvement tracking</li>
              <li>• Before/after comparisons</li>
              <li>• Goal achievement</li>
              <li>• Habit formation</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <ListTodo className="h-6 w-6 text-pink-500" />
              <h3 className="text-lg font-medium text-gray-900">Organization</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Categorize products</li>
              <li>• Seasonal wardrobes</li>
              <li>• Shopping lists</li>
              <li>• Expiration tracking</li>
            </ul>
          </div>

          {/* Tips Section */}
          <div className="bg-white rounded-xl shadow-md p-6 col-span-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="h-6 w-6 text-pink-500" />
              Pro Tips for Your Beauty & Style Diary
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Timer className="h-5 w-5 text-pink-400" />
                  Timing Is Everything
                </h3>
                <p className="text-gray-600">Set specific times for your routines and stick to them consistently.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Palette className="h-5 w-5 text-pink-400" />
                  Color Coding
                </h3>
                <p className="text-gray-600">Use colors to categorize different types of products and outfits.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-pink-400" />
                  Regular Reviews
                </h3>
                <p className="text-gray-600">Review your progress weekly and adjust your routine as needed.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>Start your beauty and style journey today!</p>
        </div>
      </footer>
    </div>
  );
}

export default App;