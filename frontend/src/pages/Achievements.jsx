import React, { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'achievement',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await authAPI.get('/achievements');
      setAchievements(response.data.data);
    } catch (error) {
      toast.error('Failed to load achievements');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        const response = await authAPI.put(`/achievements/${editingId}`, formData);
        setAchievements(achievements.map(ach => 
          ach._id === editingId ? response.data.data : ach
        ));
        toast.success('Updated successfully! 🎉');
      } else {
        const response = await authAPI.post('/achievements', formData);
        setAchievements([response.data.data, ...achievements]);
        toast.success('Added successfully! 💫');
      }

      resetForm();
    } catch (error) {
      toast.error('Failed to save');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'achievement',
      date: new Date().toISOString().split('T')[0]
    });
    setShowForm(false);
    setEditingId(null);
  };

  const startEdit = (achievement) => {
    setFormData({
      title: achievement.title,
      description: achievement.description,
      type: achievement.type,
      date: new Date(achievement.date).toISOString().split('T')[0]
    });
    setEditingId(achievement._id);
    setShowForm(true);
  };

  const toggleCompletion = async (achievement) => {
    try {
      const response = await authAPI.put(`/achievements/${achievement._id}`, {
        completed: !achievement.completed
      });
      setAchievements(achievements.map(ach => 
        ach._id === achievement._id ? response.data.data : ach
      ));
      toast.success(achievement.completed ? 'Marked as incomplete' : 'Completed! 🎉');
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const deleteAchievement = async (id) => {
    if (!window.confirm('Are you sure you want to delete this?')) {
      return;
    }

    try {
      await authAPI.delete(`/achievements/${id}`);
      setAchievements(achievements.filter(ach => ach._id !== id));
      toast.success('Deleted successfully');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const completedAchievements = achievements.filter(ach => ach.completed);
  const pendingGoals = achievements.filter(ach => !ach.completed && ach.type === 'goal');
  const milestones = achievements.filter(ach => ach.type === 'achievement' && !ach.completed);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-romantic-pink"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-romantic-cream py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-dancing text-5xl md:text-6xl text-romantic-pink mb-4">
            Our Journey Together
          </h1>
          <p className="text-xl text-gray-600">
            Celebrate your milestones and dream about the future
          </p>
        </div>

        {/* Add New Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary text-lg px-8 py-3"
          >
            + Add New Milestone or Goal
          </button>
        </div>

        {/* Achievement Form */}
        {showForm && (
          <div className="card-romantic mb-8">
            <h3 className="font-playfair text-2xl text-gray-800 mb-4">
              {editingId ? 'Edit' : 'Add New'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="input-romantic"
                    placeholder="e.g., First vacation together"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="input-romantic"
                  >
                    <option value="achievement">Milestone Achieved</option>
                    <option value="goal">Future Goal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="input-romantic h-24 resize-none"
                  placeholder="Tell us more about this special moment or dream..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="input-romantic"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Achievements Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Milestones Achieved */}
          <div>
            <h2 className="font-playfair text-3xl text-gray-800 mb-6 flex items-center">
              <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">✓</span>
              </span>
              Milestones Achieved ({completedAchievements.length})
            </h2>
            <div className="space-y-4">
              {completedAchievements.map((achievement) => (
                <div key={achievement._id} className="card-romantic border-l-4 border-green-500">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {achievement.title}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleCompletion(achievement)}
                        className="text-green-500 hover:text-green-600"
                        title="Mark incomplete"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => startEdit(achievement)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteAchievement(achievement._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{achievement.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(achievement.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {completedAchievements.length === 0 && (
                <div className="card-romantic text-center text-gray-500 py-8">
                  <div className="text-4xl mb-2">🎯</div>
                  <p>No completed achievements yet.</p>
                  <p>Start checking off your goals!</p>
                </div>
              )}
            </div>
          </div>

          {/* Current Milestones & Goals */}
          <div className="space-y-8">
            {/* Current Milestones */}
            <div>
              <h2 className="font-playfair text-3xl text-gray-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-romantic-pink rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">❤️</span>
                </span>
                Current Milestones ({milestones.length})
              </h2>
              <div className="space-y-4">
                {milestones.map((achievement) => (
                  <div key={achievement._id} className="card-romantic border-l-4 border-romantic-pink">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {achievement.title}
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleCompletion(achievement)}
                          className="text-gray-400 hover:text-green-500"
                          title="Mark complete"
                        >
                          ○
                        </button>
                        <button
                          onClick={() => startEdit(achievement)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteAchievement(achievement._id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{achievement.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                {milestones.length === 0 && (
                  <div className="card-romantic text-center text-gray-500 py-8">
                    <div className="text-4xl mb-2">💕</div>
                    <p>No current milestones.</p>
                    <p>Add your relationship milestones!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Future Goals */}
            <div>
              <h2 className="font-playfair text-3xl text-gray-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-romantic-gold rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">⭐</span>
                </span>
                Future Goals ({pendingGoals.length})
              </h2>
              <div className="space-y-4">
                {pendingGoals.map((achievement) => (
                  <div key={achievement._id} className="card-romantic border-l-4 border-romantic-gold">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {achievement.title}
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleCompletion(achievement)}
                          className="text-gray-400 hover:text-green-500"
                          title="Mark complete"
                        >
                          ○
                        </button>
                        <button
                          onClick={() => startEdit(achievement)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteAchievement(achievement._id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{achievement.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                {pendingGoals.length === 0 && (
                  <div className="card-romantic text-center text-gray-500 py-8">
                    <div className="text-4xl mb-2">🌈</div>
                    <p>No future goals set.</p>
                    <p>Dream big and add your future plans!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;