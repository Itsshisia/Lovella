import React, { useState } from 'react'
import toast from 'react-hot-toast'

const About = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  // Get user data from localStorage
  const getUserData = () => {
    try {
      const userData = localStorage.getItem('lovella_user')
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      return null
    }
  }

  const user = getUserData()

  const [story, setStory] = useState({
    howWeMet: '',
    firstDate: '',
    specialMemories: '',
    futurePlans: ''
  })

  const [formData, setFormData] = useState(story)

  const calculateAnniversary = () => {
    if (!user?.anniversaryDate) return null
    const anniversary = new Date(user.anniversaryDate)
    const today = new Date()
    const nextAnniversary = new Date(today.getFullYear(), anniversary.getMonth(), anniversary.getDate())
    
    if (today > nextAnniversary) {
      nextAnniversary.setFullYear(nextAnniversary.getFullYear() + 1)
    }
    
    const diffTime = nextAnniversary - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return diffDays
  }

  const calculateTimeTogether = () => {
    if (!user?.anniversaryDate) return null
    const anniversary = new Date(user.anniversaryDate)
    const today = new Date()
    const diffTime = today - anniversary
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const years = Math.floor(diffDays / 365)
    const months = Math.floor((diffDays % 365) / 30)
    const days = diffDays % 30
    
    return { years, months, days, totalDays: diffDays }
  }

  const anniversaryDays = calculateAnniversary()
  const timeTogether = calculateTimeTogether()

  const handleSave = async () => {
    setSaving(true)
    
    // Mock save
    setTimeout(() => {
      setStory(formData)
      setIsEditing(false)
      setSaving(false)
      toast.success('Your love story has been beautifully updated! 💕')
    }, 1500)
  }

  const handleCancel = () => {
    setFormData(story)
    setIsEditing(false)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const loveStats = user?.anniversaryDate ? [
    { icon: '📅', label: 'Together for', value: `${timeTogether.years}y ${timeTogether.months}m ${timeTogether.days}d` },
    { icon: '❤️', label: 'Total Days', value: `${timeTogether.totalDays} days` },
    { icon: '🎯', label: 'Next Anniversary', value: `${anniversaryDays} days` },
    { icon: '⭐', label: 'Memories Made', value: 'Countless' }
  ] : []

  const hasContent = Object.values(story).some(section => section.trim() !== '')

  if (!user) {
    return (
      <div className="min-h-screen bg-romantic-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">💕</div>
          <h1 className="font-dancing text-4xl text-romantic-pink mb-4">Welcome to Lovella</h1>
          <p className="text-gray-600 mb-6">Please register or login to continue</p>
          <Link to="/register" className="btn-primary">
            Start Your Love Story
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-romantic-cream py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-dancing text-5xl md:text-6xl text-romantic-pink mb-4">
            Our Love Story
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            The beautiful journey of <span className="text-romantic-pink font-semibold">{user.name}</span> & <span className="text-romantic-pink font-semibold">{user.partnerName}</span>
          </p>

          {/* Love Stats */}
          {loveStats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {loveStats.map((stat, index) => (
                <div key={index} className="card-romantic text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                  <div className="text-lg font-bold text-romantic-pink">{stat.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Anniversary Countdown */}
          {anniversaryDays && (
            <div className="bg-gradient-to-r from-romantic-pink to-romantic-rose rounded-2xl p-6 text-white max-w-md mx-auto">
              <div className="text-3xl mb-2">💑</div>
              <h3 className="font-playfair text-xl mb-2">Anniversary Countdown</h3>
              <p className="text-4xl font-bold mb-2 heart-beat">{anniversaryDays}</p>
              <p className="text-pink-100">days until your next celebration of love!</p>
            </div>
          )}
        </div>

        {/* Edit/Save Buttons */}
        <div className="flex justify-end mb-6 space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary disabled:opacity-50"
              >
                {saving ? (
                  <span className="flex items-center">
                    <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Saving...
                  </span>
                ) : (
                  'Save Our Story'
                )}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary"
            >
              {hasContent ? '✏️ Edit Our Story' : '✨ Start Writing Our Story'}
            </button>
          )}
        </div>

        {/* Story Sections */}
        {!hasContent && !isEditing ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📖</div>
            <h3 className="font-playfair text-2xl text-gray-600 mb-2">
              Your love story is waiting to be told
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Document your beautiful journey together - from how you met to your dreams for the future.
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary"
            >
              Start Writing Your Story
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* How We Met */}
            <div className="card-romantic">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-romantic-pink to-romantic-rose rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white text-lg">💘</span>
                </div>
                <div>
                  <h2 className="font-playfair text-2xl text-gray-800">
                    How We Met
                  </h2>
                  <p className="text-gray-500 text-sm">The beginning of everything beautiful</p>
                </div>
              </div>
              {isEditing ? (
                <textarea
                  value={formData.howWeMet}
                  onChange={(e) => handleChange('howWeMet', e.target.value)}
                  className="w-full h-48 px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-romantic-pink resize-none leading-relaxed"
                  placeholder="Tell the beautiful story of how you first met..."
                />
              ) : story.howWeMet ? (
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                  {story.howWeMet}
                </p>
              ) : (
                <p className="text-gray-400 italic text-lg">
                  Your story of how you met is waiting to be written...
                </p>
              )}
            </div>

            {/* First Date */}
            <div className="card-romantic">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-romantic-gold to-amber-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white text-lg">🌹</span>
                </div>
                <div>
                  <h2 className="font-playfair text-2xl text-gray-800">
                    First Date
                  </h2>
                  <p className="text-gray-500 text-sm">When magic truly began</p>
                </div>
              </div>
              {isEditing ? (
                <textarea
                  value={formData.firstDate}
                  onChange={(e) => handleChange('firstDate', e.target.value)}
                  className="w-full h-48 px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-romantic-pink resize-none leading-relaxed"
                  placeholder="Describe your magical first date..."
                />
              ) : story.firstDate ? (
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                  {story.firstDate}
                </p>
              ) : (
                <p className="text-gray-400 italic text-lg">
                  Share the magic of your first date...
                </p>
              )}
            </div>

            {/* Special Memories */}
            <div className="card-romantic">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white text-lg">🌟</span>
                </div>
                <div>
                  <h2 className="font-playfair text-2xl text-gray-800">
                    Special Memories
                  </h2>
                  <p className="text-gray-500 text-sm">Moments that made your hearts sing</p>
                </div>
              </div>
              {isEditing ? (
                <textarea
                  value={formData.specialMemories}
                  onChange={(e) => handleChange('specialMemories', e.target.value)}
                  className="w-full h-48 px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-romantic-pink resize-none leading-relaxed"
                  placeholder="Share your most cherished memories together..."
                />
              ) : story.specialMemories ? (
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                  {story.specialMemories}
                </p>
              ) : (
                <p className="text-gray-400 italic text-lg">
                  Your special memories are waiting to be cherished...
                </p>
              )}
            </div>

            {/* Future Plans */}
            <div className="card-romantic">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white text-lg">🚀</span>
                </div>
                <div>
                  <h2 className="font-playfair text-2xl text-gray-800">
                    Future Dreams
                  </h2>
                  <p className="text-gray-500 text-sm">Your beautiful tomorrows</p>
                </div>
              </div>
              {isEditing ? (
                <textarea
                  value={formData.futurePlans}
                  onChange={(e) => handleChange('futurePlans', e.target.value)}
                  className="w-full h-48 px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-romantic-pink resize-none leading-relaxed"
                  placeholder="What beautiful dreams do you have for your future together?..."
                />
              ) : story.futurePlans ? (
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                  {story.futurePlans}
                </p>
              ) : (
                <p className="text-gray-400 italic text-lg">
                  Dream together about your beautiful future...
                </p>
              )}
            </div>
          </div>
        )}

        {/* Love Quote */}
        <div className="text-center mt-12 p-6 bg-gradient-to-r from-romantic-pink to-romantic-rose rounded-2xl text-white">
          <p className="font-playfair text-xl italic mb-2">
            "The best love stories don't have endings - they have new beginnings every day."
          </p>
          <p className="text-pink-100">- Your Love Story -</p>
        </div>
      </div>
    </div>
  )
}

export default About