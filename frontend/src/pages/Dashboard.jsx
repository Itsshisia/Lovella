import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const navigate = useNavigate()
  
  // Get user data from localStorage (from registration)
  const getUserData = () => {
    try {
      const userData = localStorage.getItem('lovella_user')
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      return null
    }
  }

  const user = getUserData()

  const stats = [
    { count: 0, label: 'Beautiful Memories', icon: '📸', color: 'from-blue-500 to-cyan-500', link: '/gallery' },
    { count: 0, label: 'Love Milestones', icon: '🏆', color: 'from-green-500 to-emerald-500', link: '/achievements' },
    { count: 0, label: 'Sweet Messages', icon: '💌', color: 'from-romantic-pink to-romantic-rose', link: '/chat' },
    { count: 0, label: 'Future Dreams', icon: '⭐', color: 'from-romantic-gold to-amber-500', link: '/achievements' }
  ]

  const features = [
    { 
      icon: '📸', 
      title: 'Memory Gallery', 
      description: 'Upload and cherish your favorite photos together',
      link: '/gallery',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      icon: '📖', 
      title: 'Our Love Story', 
      description: 'Document your beautiful journey together',
      link: '/about',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: '🏆', 
      title: 'Achievements', 
      description: 'Celebrate milestones and future goals',
      link: '/achievements',
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      icon: '💬', 
      title: 'Private Chat', 
      description: 'Share intimate thoughts and love notes',
      link: '/chat',
      gradient: 'from-romantic-pink to-romantic-rose'
    }
  ]

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

  const anniversaryDays = calculateAnniversary()

  const handleLogout = () => {
    localStorage.removeItem('lovella_user')
    localStorage.removeItem('token')
    toast.success('Come back to your love story soon! 💕')
    navigate('/')
  }

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="font-dancing text-5xl md:text-6xl text-romantic-pink mb-4">
            Welcome Home
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600">
            Hello, <span className="text-romantic-pink font-semibold">{user.name}</span> & <span className="text-romantic-pink font-semibold">{user.partnerName}</span>! 💕
          </p>
        </div>

        {/* Anniversary Countdown - Only show if anniversary date exists */}
        {anniversaryDays && (
          <div className="bg-gradient-to-r from-romantic-pink to-romantic-rose rounded-3xl p-8 text-white text-center mb-12 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-4">💑</div>
            <h2 className="font-playfair text-3xl md:text-4xl mb-2">Anniversary Countdown</h2>
            <p className="text-6xl md:text-7xl font-bold mb-2 heart-beat">{anniversaryDays}</p>
            <p className="text-xl md:text-2xl">days until your special day!</p>
            <p className="text-pink-100 mt-2">
              Celebrating every moment of your beautiful journey together
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="card-romantic text-center group hover:transform hover:scale-105"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <span className="text-2xl text-white">{stat.icon}</span>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">{stat.count}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="card-romantic text-center group hover:transform hover:scale-105"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-xl text-white">{feature.icon}</span>
              </div>
              <h3 className="font-playfair text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </Link>
          ))}
        </div>

        {/* Getting Started Guide */}
        <div className="card-romantic mb-8">
          <h2 className="font-playfair text-2xl text-gray-800 mb-6 flex items-center">
            <span className="text-2xl mr-3">🚀</span>
            Getting Started
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/gallery" className="text-center p-4 border-2 border-dashed border-pink-200 rounded-xl hover:border-romantic-pink hover:bg-pink-50 transition-all cursor-pointer">
              <div className="text-2xl mb-2">📸</div>
              <h4 className="font-semibold text-gray-800 mb-1">Add Photos</h4>
              <p className="text-sm text-gray-600">Upload your first memory</p>
            </Link>
            <Link to="/about" className="text-center p-4 border-2 border-dashed border-blue-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
              <div className="text-2xl mb-2">📖</div>
              <h4 className="font-semibold text-gray-800 mb-1">Write Story</h4>
              <p className="text-sm text-gray-600">Document your journey</p>
            </Link>
            <Link to="/achievements" className="text-center p-4 border-2 border-dashed border-green-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-gray-800 mb-1">Set Goals</h4>
              <p className="text-sm text-gray-600">Plan your future together</p>
            </Link>
            <Link to="/chat" className="text-center p-4 border-2 border-dashed border-romantic-pink rounded-xl hover:border-romantic-rose hover:bg-pink-50 transition-all cursor-pointer">
              <div className="text-2xl mb-2">💌</div>
              <h4 className="font-semibold text-gray-800 mb-1">Send Message</h4>
              <p className="text-sm text-gray-600">Share your first love note</p>
            </Link>
          </div>
        </div>

        {/* Logout Button */}
        <div className="text-center mt-12">
          <button
            onClick={handleLogout}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard