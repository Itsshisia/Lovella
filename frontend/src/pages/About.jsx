import React, { useState } from 'react'
import toast from 'react-hot-toast'

const About = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  // Mock user data
  const user = {
    name: 'Alex',
    partnerName: 'Taylor',
    anniversaryDate: '2022-06-15'
  }

  const [story, setStory] = useState({
    howWeMet: `We first crossed paths at a cozy coffee shop downtown. I was struggling with my laptop charger, and you came over with that beautiful smile offering help. Little did we know that simple act of kindness would be the beginning of our forever. The way your eyes lit up when you laughed... I knew right then there was something special about you.`,
    firstDate: `Our first date was magical! We went to that little Italian restaurant with the fairy lights in the garden. Remember how we talked for hours, completely losing track of time? You ordered the lasagna, I had the risotto, and we shared a tiramisu while watching the stars appear. That night, I realized I never wanted the conversation to end. It was the start of something truly beautiful.`,
    specialMemories: `• That surprise birthday party you threw for me last year 🎉
• Our weekend getaway to the mountains where we saw the most amazing sunrise ⛰️
• The time we cooked dinner together and ended up having a flour fight in the kitchen 👩‍🍳
• Our first dance in the living room to our favorite song 💃
• That rainy day we spent cuddled up watching movies with hot chocolate ☔
• The handwritten love notes we leave for each other 💌
• Every single morning waking up next to my favorite person 🌅`,
    futurePlans: `I dream of building a life filled with laughter and love with you. I can't wait for:
• Buying our first home together and making it truly ours 🏡
• Traveling the world and collecting memories from every corner 🌎
• Growing old together and still holding hands like teenagers 👵👴
• Starting a family and watching our love multiply 👨‍👩‍👧‍👦
• Every single ordinary day that becomes extraordinary because we're together 💫
Our future is bright, and I'm so grateful I get to build it with you.`
  })

  const [formData, setFormData] = useState(story)

  const calculateAnniversary = () => {
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

  const loveStats = [
    { icon: '📅', label: 'Together for', value: `${timeTogether.years}y ${timeTogether.months}m ${timeTogether.days}d` },
    { icon: '❤️', label: 'Total Days', value: `${timeTogether.totalDays} days` },
    { icon: '🎯', label: 'Next Anniversary', value: `${anniversaryDays} days` },
    { icon: '⭐', label: 'Memories Made', value: 'Countless' }
  ]

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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {loveStats.map((stat, index) => (
              <div key={index} className="card-romantic text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                <div className="text-lg font-bold text-romantic-pink">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Anniversary Countdown */}
          <div className="bg-gradient-to-r from-romantic-pink to-romantic-rose rounded-2xl p-6 text-white max-w-md mx-auto">
            <div className="text-3xl mb-2">💑</div>
            <h3 className="font-playfair text-xl mb-2">Anniversary Countdown</h3>
            <p className="text-4xl font-bold mb-2 heart-beat">{anniversaryDays}</p>
            <p className="text-pink-100">days until your next celebration of love!</p>
          </div>
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
              ✏️ Edit Our Story
            </button>
          )}
        </div>

        {/* Story Sections */}
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
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                {story.howWeMet}
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
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                {story.firstDate}
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
                <p className="text-gray-500 text-sm">Moments that made our hearts sing</p>
              </div>
            </div>
            {isEditing ? (
              <textarea
                value={formData.specialMemories}
                onChange={(e) => handleChange('specialMemories', e.target.value)}
                className="w-full h-48 px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-romantic-pink resize-none leading-relaxed"
                placeholder="Share your most cherished memories together..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                {story.specialMemories}
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
                <p className="text-gray-500 text-sm">Our beautiful tomorrows</p>
              </div>
            </div>
            {isEditing ? (
              <textarea
                value={formData.futurePlans}
                onChange={(e) => handleChange('futurePlans', e.target.value)}
                className="w-full h-48 px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-romantic-pink resize-none leading-relaxed"
                placeholder="What beautiful dreams do you have for your future together?..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                {story.futurePlans}
              </p>
            )}
          </div>
        </div>

        {/* Love Quote */}
        <div className="text-center mt-12 p-6 bg-gradient-to-r from-romantic-pink to-romantic-rose rounded-2xl text-white">
          <p className="font-playfair text-xl italic mb-2">
            "I have waited for this moment for a lifetime, and now that I've found you, I know my search is over."
          </p>
          <p className="text-pink-100">- Your Love Story -</p>
        </div>
      </div>
    </div>
  )
}

export default About