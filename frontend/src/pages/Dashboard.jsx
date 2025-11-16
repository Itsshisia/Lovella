import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const navigate = useNavigate()
  
  // Mock user data
  const user = {
    name: 'Alex',
    partnerName: 'Taylor',
    anniversaryDate: '2022-06-15'
  }

  const stats = [
    { count: 12, label: 'Beautiful Memories', icon: '📸', color: 'from-blue-500 to-cyan-500', link: '/gallery' },
    { count: 8, label: 'Love Milestones', icon: '🏆', color: 'from-green-500 to-emerald-500', link: '/achievements' },
    { count: 24, label: 'Sweet Messages', icon: '💌', color: 'from-romantic-pink to-romantic-rose', link: '/chat' },
    { count: 5, label: 'Future Dreams', icon: '⭐', color: 'from-romantic-gold to-amber-500', link: '/achievements' }
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

  const recentMemories = [
    { id: 1, image: '🌅', caption: 'Sunset beach walk', date: '2 days ago' },
    { id: 2, image: '🎂', caption: 'Birthday celebration', date: '1 week ago' },
    { id: 3, image: '🎄', caption: 'Christmas together', date: '3 weeks ago' }
  ]

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

  const anniversaryDays = calculateAnniversary()

  const handleLogout = () => {
    toast.success('Come back to your love story soon! 💕')
    navigate('/')
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

        {/* Anniversary Countdown */}
        <div className="bg-gradient-to-r from-romantic-pink to-romantic-rose rounded-3xl p-8 text-white text-center mb-12 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-5xl mb-4">💑</div>
          <h2 className="font-playfair text-3xl md:text-4xl mb-2">Anniversary Countdown</h2>
          <p className="text-6xl md:text-7xl font-bold mb-2 heart-beat">{anniversaryDays}</p>
          <p className="text-xl md:text-2xl">days until your special day!</p>
          <p className="text-pink-100 mt-2">
            Celebrating every moment of your beautiful journey together
          </p>
        </div>

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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Memories */}
          <div className="card-romantic">
            <h2 className="font-playfair text-2xl text-gray-800 mb-6 flex items-center">
              <span className="text-2xl mr-3">📸</span>
              Recent Memories
            </h2>
            <div className="space-y-4">
              {recentMemories.map((memory) => (
                <div key={memory.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-pink-50 transition-colors group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-r from-romantic-pink to-romantic-rose rounded-lg flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform">
                    {memory.image}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{memory.caption}</p>
                    <p className="text-sm text-gray-500">{memory.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link to="/gallery" className="text-romantic-pink hover:text-romantic-rose font-semibold text-sm">
                View All Memories ↗
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card-romantic">
            <h2 className="font-playfair text-2xl text-gray-800 mb-6 flex items-center">
              <span className="text-2xl mr-3">⚡</span>
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full text-left p-4 rounded-lg border-2 border-dashed border-pink-200 hover:border-romantic-pink hover:bg-pink-50 transition-all group">
                <div className="flex items-center space-x-3">
                  <span className="text-xl group-hover:scale-110 transition-transform">➕</span>
                  <div>
                    <p className="font-semibold text-gray-800">Add New Memory</p>
                    <p className="text-sm text-gray-500">Upload a photo to your gallery</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left p-4 rounded-lg border-2 border-dashed border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all group">
                <div className="flex items-center space-x-3">
                  <span className="text-xl group-hover:scale-110 transition-transform">💌</span>
                  <div>
                    <p className="font-semibold text-gray-800">Send Love Note</p>
                    <p className="text-sm text-gray-500">Share a sweet message</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left p-4 rounded-lg border-2 border-dashed border-green-200 hover:border-green-500 hover:bg-green-50 transition-all group">
                <div className="flex items-center space-x-3">
                  <span className="text-xl group-hover:scale-110 transition-transform">🎯</span>
                  <div>
                    <p className="font-semibold text-gray-800">Add Milestone</p>
                    <p className="text-sm text-gray-500">Celebrate an achievement</p>
                  </div>
                </div>
              </button>
            </div>
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