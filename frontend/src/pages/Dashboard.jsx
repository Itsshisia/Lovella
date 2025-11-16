import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState({
    galleryCount: 0,
    achievementsCount: 0,
    goalsCount: 0,
    messagesCount: 0
  });
  const [recentMemories, setRecentMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all data in parallel
      const [galleryRes, achievementsRes, messagesRes] = await Promise.all([
        authAPI.get('/gallery'),
        authAPI.get('/achievements'),
        authAPI.get('/messages')
      ]);

      const gallery = galleryRes.data.data;
      const achievements = achievementsRes.data.data;
      const messages = messagesRes.data.data;

      setStats({
        galleryCount: gallery.length,
        achievementsCount: achievements.filter(a => a.type === 'achievement' && a.completed).length,
        goalsCount: achievements.filter(a => a.type === 'goal' && !a.completed).length,
        messagesCount: messages.length
      });

      // Get recent memories (last 3 gallery items)
      setRecentMemories(gallery.slice(0, 3));
    } catch (error) {
      console.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const calculateAnniversary = () => {
    if (!user?.anniversaryDate) return null;
    
    const anniversary = new Date(user.anniversaryDate);
    const today = new Date();
    const nextAnniversary = new Date(today.getFullYear(), anniversary.getMonth(), anniversary.getDate());
    
    if (today > nextAnniversary) {
      nextAnniversary.setFullYear(nextAnniversary.getFullYear() + 1);
    }
    
    const diffTime = nextAnniversary - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const anniversaryDays = calculateAnniversary();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-romantic-pink"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-romantic-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h1 className="font-dancing text-5xl md:text-6xl text-romantic-pink mb-4">
            Welcome Home
          </h1>
          <p className="text-2xl text-gray-600">
            Hello, <span className="text-romantic-pink">{user?.name}</span> & <span className="text-romantic-pink">{user?.partnerName}</span>! 💕
          </p>
        </div>

        {/* Anniversary Countdown */}
        {anniversaryDays && (
          <div className="bg-gradient-to-r from-romantic-pink to-romantic-rose rounded-2xl p-8 text-white text-center mb-12 shadow-xl">
            <div className="text-4xl mb-4">💑</div>
            <h2 className="font-playfair text-3xl mb-2">Anniversary Countdown</h2>
            <p className="text-5xl font-bold mb-2">{anniversaryDays}</p>
            <p className="text-xl">days until your special day!</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { count: stats.galleryCount, label: 'Memories', icon: '📸', color: 'bg-blue-500', link: '/gallery' },
            { count: stats.achievementsCount, label: 'Milestones', icon: '🏆', color: 'bg-green-500', link: '/achievements' },
            { count: stats.goalsCount, label: 'Dreams', icon: '⭐', color: 'bg-romantic-gold', link: '/achievements' },
            { count: stats.messagesCount, label: 'Love Notes', icon: '💌', color: 'bg-romantic-pink', link: '/chat' }
          ].map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="card-romantic text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl text-white">{stat.icon}</span>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">{stat.count}</p>
              <p className="text-gray-600">{stat.label}</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { title: 'Add Memory', description: 'Upload a new photo to your gallery', icon: '📸', link: '/gallery', button: 'Go to Gallery' },
            { title: 'Share Feelings', description: 'Send a love note or memory', icon: '💬', link: '/chat', button: 'Start Chat' },
            { title: 'Update Story', description: 'Edit your love story', icon: '📖', link: '/about', button: 'Edit Story' }
          ].map((action, index) => (
            <div key={index} className="card-romantic text-center">
              <div className="text-4xl mb-4">{action.icon}</div>
              <h3 className="font-playfair text-xl text-gray-800 mb-2">{action.title}</h3>
              <p className="text-gray-600 mb-4">{action.description}</p>
              <Link to={action.link} className="btn-primary inline-block">
                {action.button}
              </Link>
            </div>
          ))}
        </div>

        {/* Recent Memories */}
        {recentMemories.length > 0 && (
          <div className="card-romantic">
            <h2 className="font-playfair text-2xl text-gray-800 mb-6">Recent Memories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentMemories.map((memory) => (
                <div key={memory._id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-2">
                    <img
                      src={memory.image.url}
                      alt={memory.caption}
                      className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{memory.caption}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link to="/gallery" className="text-romantic-pink hover:text-romantic-rose font-semibold">
                View All Memories →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;