import React, { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const About = () => {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    howWeMet: '',
    firstDate: '',
    specialMemories: '',
    futurePlans: ''
  });

  useEffect(() => {
    fetchStory();
  }, []);

  const fetchStory = async () => {
    try {
      const response = await authAPI.get('/story');
      setStory(response.data.data);
      setFormData({
        howWeMet: response.data.data.howWeMet,
        firstDate: response.data.data.firstDate,
        specialMemories: response.data.data.specialMemories,
        futurePlans: response.data.data.futurePlans
      });
    } catch (error) {
      toast.error('Failed to load your story');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await authAPI.put('/story', formData);
      setStory(response.data.data);
      setIsEditing(false);
      toast.success('Your love story has been updated! 💕');
    } catch (error) {
      toast.error('Failed to update story');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      howWeMet: story.howWeMet,
      firstDate: story.firstDate,
      specialMemories: story.specialMemories,
      futurePlans: story.futurePlans
    });
    setIsEditing(false);
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-dancing text-5xl md:text-6xl text-romantic-pink mb-4">
            Our Love Story
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            The beautiful journey of {user?.name} & {user?.partnerName}
          </p>

          {anniversaryDays && (
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto border border-pink-200">
              <div className="text-center">
                <div className="text-2xl mb-2">💕</div>
                <h3 className="font-playfair text-xl text-gray-800 mb-2">
                  Anniversary Countdown
                </h3>
                <p className="text-3xl font-bold text-romantic-pink mb-2">
                  {anniversaryDays} days
                </p>
                <p className="text-sm text-gray-600">
                  until your next anniversary!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Edit/Save Buttons */}
        <div className="flex justify-end mb-6">
          {isEditing ? (
            <div className="space-x-4">
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Story'}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary"
            >
              Edit Our Story
            </button>
          )}
        </div>

        {/* Story Sections */}
        <div className="space-y-8">
          {/* How We Met */}
          <div className="card-romantic">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-romantic-pink rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-lg">💘</span>
              </div>
              <h2 className="font-playfair text-2xl text-gray-800">
                How We Met
              </h2>
            </div>
            {isEditing ? (
              <textarea
                value={formData.howWeMet}
                onChange={(e) => setFormData({...formData, howWeMet: e.target.value})}
                className="w-full h-40 px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-romantic-pink resize-none"
                placeholder="Tell the beautiful story of how you first met..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {story.howWeMet}
              </p>
            )}
          </div>

          {/* First Date */}
          <div className="card-romantic">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-romantic-gold rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-lg">🌹</span>
              </div>
              <h2 className="font-playfair text-2xl text-gray-800">
                First Date
              </h2>
            </div>
            {isEditing ? (
              <textarea
                value={formData.firstDate}
                onChange={(e) => setFormData({...formData, firstDate: e.target.value})}
                className="w-full h-40 px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-romantic-pink resize-none"
                placeholder="Describe your magical first date..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {story.firstDate}
              </p>
            )}
          </div>

          {/* Special Memories */}
          <div className="card-romantic">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-romantic-rose rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-lg">🌟</span>
              </div>
              <h2 className="font-playfair text-2xl text-gray-800">
                Special Memories
              </h2>
            </div>
            {isEditing ? (
              <textarea
                value={formData.specialMemories}
                onChange={(e) => setFormData({...formData, specialMemories: e.target.value})}
                className="w-full h-40 px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-romantic-pink resize-none"
                placeholder="Share your most cherished memories together..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {story.specialMemories}
              </p>
            )}
          </div>

          {/* Future Plans */}
          <div className="card-romantic">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-lg">🚀</span>
              </div>
              <h2 className="font-playfair text-2xl text-gray-800">
                Future Dreams
              </h2>
            </div>
            {isEditing ? (
              <textarea
                value={formData.futurePlans}
                onChange={(e) => setFormData({...formData, futurePlans: e.target.value})}
                className="w-full h-40 px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-romantic-pink resize-none"
                placeholder="What beautiful dreams do you have for your future together?..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {story.futurePlans}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;