const Achievement = require('../models/Achievement');

// Get all achievements
exports.getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({ user: req.user._id }).sort({ date: -1 });

    res.json({
      success: true,
      count: achievements.length,
      data: achievements
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create achievement
exports.createAchievement = async (req, res) => {
  try {
    const { title, description, type, date } = req.body;

    const achievement = await Achievement.create({
      user: req.user._id,
      title,
      description,
      type,
      date: date || new Date()
    });

    res.status(201).json({
      success: true,
      message: `${type === 'achievement' ? 'Achievement' : 'Goal'} created successfully`,
      data: achievement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update achievement
exports.updateAchievement = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const achievement = await Achievement.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      });
    }

    if (title !== undefined) achievement.title = title;
    if (description !== undefined) achievement.description = description;
    if (completed !== undefined) achievement.completed = completed;

    await achievement.save();

    res.json({
      success: true,
      message: 'Updated successfully',
      data: achievement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete achievement
exports.deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      });
    }

    await Achievement.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};