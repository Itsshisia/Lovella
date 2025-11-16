import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Achievements = () => {
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: 'First Anniversary',
      description: 'Celebrated one year of beautiful love together with a romantic dinner and weekend getaway',
      date: '2023-06-15',
      type: 'achievement',
      completed: true,
      category: 'milestone'
    },
    {
      id: 2,
      title: 'Moved In Together',
      description: 'Created our first home filled with love, laughter, and beautiful memories',
      date: '2023-09-01',
      type: 'achievement',
      completed: true,
      category: 'life'
    },
    {
      id: 3,
      title: 'First International Trip',
      description: 'Explored Bali together and created unforgettable memories in paradise',
      date: '2023-12-10',
      type: 'achievement',
      completed: true,
      category: 'travel'
    },
    {
      id: 4,
      title: 'Buy Our Dream Home',
      description: 'Find and purchase our perfect home with a garden and space for our future family',
      date: '2025-12-31',
      type: 'goal',
      completed: false,
      category: 'future'
    },
    {
      id: 5,
      title: 'European Adventure',
      description: 'Backpack through Europe, visiting Paris, Rome, and the Greek islands',
      date: '2024-09-01',
      type: 'goal',
      completed: false,
      category: 'travel'
    },
    {
      id: 6,
      title: 'Learn to Dance Together',
      description: 'Take salsa classes and surprise everyone at the next wedding we attend',
      date: '2024-06-30',
      type: 'goal',
      completed: false,
      category: 'fun'
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'goal',
    date: new Date().toISOString().split('T')[0],
    category: 'future'
  })

  const categories = {
    milestone: { name: 'Milestone', color: 'from-romantic-pink to-romantic-rose', icon: '🎯' },
    life: { name: 'Life Event', color: 'from-blue-500 to-cyan-500', icon: '🏡' },
    travel: { name: 'Travel', color: 'from-green-500 to-emerald-500', icon: '✈️' },
    future: { name: 'Future Dream', color: 'from-purple-500 to-pink-500', icon: '⭐' },
    fun: { name: 'Fun Activity', color: 'from-romantic-gold to-amber-500', icon: '🎉' }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Mock save
    setTimeout(() => {
      if (editingId) {
        setAchievements(achievements.map(ach => 
          ach.id === editingId ? { ...formData, id: editingId } : ach
        ))
        toast.success('Achievement updated beautifully! 🎉')
      } else {
        const newAchievement = {
          ...formData,
          id: Math.max(...achievements.map(a => a.id)) + 1,
          completed: formData.type === 'achievement'
        }
        setAchievements([newAchievement, ...achievements])
        toast.success('New goal added to your love journey! 💫')
      }

      resetForm()
      setLoading(false)
    }, 1000)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'goal',
      date: new Date().toISOString().split('T')[0],
      category: 'future'
    })
    setShowForm(false)
    setEditingId(null)
  }

  const startEdit = (achievement) => {
    setFormData({
      title: achievement.title,
      description: achievement.description,
      type: achievement.type,
      date: achievement.date,
      category: achievement.category
    })
    setEditingId(achievement.id)
    setShowForm(true)
  }

  const toggleCompletion = async (achievement) => {
    const updated = achievements.map(ach => 
      ach.id === achievement.id ? { ...ach, completed: !ach.completed } : ach
    )
    setAchievements(updated)
    
    if (!achievement.completed) {
      toast.success(`Congratulations! "${achievement.title}" completed! 🎉`)
    } else {
      toast('Goal marked as in progress! 💪', { icon: '🎯' })
    }
  }

  const deleteAchievement = async (id) => {
    if (!window.confirm('Are you sure you want to remove this beautiful goal?')) {
      return
    }

    setAchievements(achievements.filter(ach => ach.id !== id))
    toast.success('Goal moved to the dream archive 💝')
  }

  const completedAchievements = achievements.filter(ach => ach.completed)
  const pendingGoals = achievements.filter(ach => !ach.completed && ach.type === 'goal')
  const currentAchievements = achievements.filter(ach => ach.type === 'achievement' && !ach.completed)

  const stats = {
    completed: completedAchievements.length,
    inProgress: pendingGoals.length + currentAchievements.length,
    total: achievements.length,
    completionRate: Math.round((completedAchievements.length / achievements.length) * 100)
  }

  return (
    <div className="min-h-screen bg-romantic-cream py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-dancing text-5xl md:text-6xl text-romantic-pink mb-4">
            Our Journey Together
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrate your beautiful milestones and dream about the amazing future you're building together
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card-romantic text-center">
            <div className="text-2xl text-romantic-pink mb-2">🎯</div>
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Goals</div>
          </div>
          <div className="card-romantic text-center">
            <div className="text-2xl text-green-500 mb-2">✅</div>
            <div className="text-2xl font-bold text-gray-800">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="card-romantic text-center">
            <div className="text-2xl text-blue-500 mb-2">🔄</div>
            <div className="text-2xl font-bold text-gray-800">{stats.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="card-romantic text-center">
            <div className="text-2xl text-romantic-gold mb-2">📊</div>
            <div className="text-2xl font-bold text-gray-800">{stats.completionRate}%</div>
            <div className="text-sm text-gray-600">Completion</div>
          </div>
        </div>

        {/* Add New Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary text-lg px-8 py-4"
          >
            + Add New Milestone or Goal
          </button>
        </div>

        {/* Achievement Form */}
        {showForm && (
          <div className="card-romantic mb-8">
            <h3 className="font-playfair text-2xl text-gray-800 mb-6 flex items-center">
              <span className="text-2xl mr-3">{editingId ? '✏️' : '✨'}</span>
              {editingId ? 'Edit Goal' : 'Add New Goal'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="input-romantic"
                    placeholder="e.g., First vacation together, Buy dream home..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="input-romantic"
                  >
                    <option value="goal">Future Goal 🌟</option>
                    <option value="achievement">Milestone Achieved 🎉</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="input-romantic h-24 resize-none"
                  placeholder="Tell us more about this special moment or dream... What makes it meaningful?"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="input-romantic"
                  >
                    <option value="milestone">Milestone 🎯</option>
                    <option value="life">Life Event 🏡</option>
                    <option value="travel">Travel ✈️</option>
                    <option value="future">Future Dream ⭐</option>
                    <option value="fun">Fun Activity 🎉</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="input-romantic"
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                      {editingId ? 'Updating...' : 'Creating...'}
                    </span>
                  ) : (
                    editingId ? 'Update Goal' : 'Create Goal'
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Achievements Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Completed Achievements */}
          <div>
            <h2 className="font-playfair text-3xl text-gray-800 mb-6 flex items-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <span className="text-white text-lg">✓</span>
              </div>
              Milestones Achieved ({completedAchievements.length})
            </h2>
            <div className="space-y-4">
              {completedAchievements.map((achievement) => (
                <div key={achievement.id} className="card-romantic border-l-4 border-green-500 relative">
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => toggleCompletion(achievement)}
                      className="text-green-500 hover:text-green-600 bg-green-50 p-1 rounded"
                      title="Mark incomplete"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => startEdit(achievement)}
                      className="text-blue-500 hover:text-blue-600 bg-blue-50 p-1 rounded"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteAchievement(achievement.id)}
                      className="text-red-500 hover:text-red-600 bg-red-50 p-1 rounded"
                    >
                      🗑️
                    </button>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${categories[achievement.category].color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-lg">{categories[achievement.category].icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600 mb-2 leading-relaxed">{achievement.description}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{new Date(achievement.date).toLocaleDateString()}</span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                          Completed 🎉
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {completedAchievements.length === 0 && (
                <div className="card-romantic text-center text-gray-500 py-12">
                  <div className="text-5xl mb-4">🎯</div>
                  <p className="text-lg mb-2">No completed achievements yet.</p>
                  <p>Start checking off your beautiful goals!</p>
                </div>
              )}
            </div>
          </div>

          {/* Current Goals & Future Dreams */}
          <div className="space-y-8">
            {/* Current Goals */}
            <div>
              <h2 className="font-playfair text-3xl text-gray-800 mb-6 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-romantic-pink to-romantic-rose rounded-full flex items-center justify-center mr-3 shadow-lg">
                  <span className="text-white text-lg">🎯</span>
                </div>
                Current Goals ({pendingGoals.length})
              </h2>
              <div className="space-y-4">
                {pendingGoals.map((achievement) => (
                  <div key={achievement.id} className="card-romantic border-l-4 border-romantic-pink relative">
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => toggleCompletion(achievement)}
                        className="text-gray-400 hover:text-green-500 bg-gray-50 p-1 rounded"
                        title="Mark complete"
                      >
                        ○
                      </button>
                      <button
                        onClick={() => startEdit(achievement)}
                        className="text-blue-500 hover:text-blue-600 bg-blue-50 p-1 rounded"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteAchievement(achievement.id)}
                        className="text-red-500 hover:text-red-600 bg-red-50 p-1 rounded"
                      >
                        🗑️
                      </button>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${categories[achievement.category].color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-lg">{categories[achievement.category].icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg mb-1">
                          {achievement.title}
                        </h3>
                        <p className="text-gray-600 mb-2 leading-relaxed">{achievement.description}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <span>Target: {new Date(achievement.date).toLocaleDateString()}</span>
                          <span className="bg-romantic-pink text-white px-2 py-1 rounded-full text-xs">
                            In Progress
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {pendingGoals.length === 0 && (
                  <div className="card-romantic text-center text-gray-500 py-12">
                    <div className="text-5xl mb-4">🌟</div>
                    <p className="text-lg mb-2">No current goals set.</p>
                    <p>Dream big and add your future plans!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Add Common Goals */}
            <div className="card-romantic">
              <h3 className="font-playfair text-xl text-gray-800 mb-4">Quick Add Common Goals</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { title: 'Romantic Getaway', category: 'travel' },
                  { title: 'Cook Together', category: 'fun' },
                  { title: 'Learn Something New', category: 'fun' },
                  { title: 'Home Project', category: 'life' }
                ].map((goal, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setFormData({
                        title: goal.title,
                        description: `Our beautiful ${goal.title.toLowerCase()} goal`,
                        type: 'goal',
                        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        category: goal.category
                      })
                      setShowForm(true)
                    }}
                    className="p-3 text-left rounded-lg border-2 border-dashed border-gray-200 hover:border-romantic-pink hover:bg-pink-50 transition-all text-sm"
                  >
                    <div className="font-medium text-gray-800">{goal.title}</div>
                    <div className="text-gray-500 text-xs">Add to goals</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Motivation Quote */}
        <div className="text-center mt-12 p-6 bg-gradient-to-r from-romantic-gold to-amber-500 rounded-2xl text-white">
          <p className="font-playfair text-xl italic mb-2">
            "The best dreams happen when you're awake and working towards them together."
          </p>
          <p className="text-amber-100">- Your Journey Together -</p>
        </div>
      </div>
    </div>
  )
}

export default Achievements