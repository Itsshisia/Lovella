const Story = require('../models/Story');

// Get or create story
exports.getStory = async (req, res) => {
  try {
    let story = await Story.findOne({ user: req.user._id });

    if (!story) {
      // Create default story if doesn't exist
      story = await Story.create({
        user: req.user._id,
        howWeMet: 'Tell your beautiful story of how you met...',
        firstDate: 'Share your first date experience...',
        specialMemories: 'Write about your special memories together...',
        futurePlans: 'What does the future hold for both of you?'
      });
    }

    await story.populate('user', 'name partnerName anniversaryDate');

    res.json({
      success: true,
      data: story
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update story
exports.updateStory = async (req, res) => {
  try {
    const { howWeMet, firstDate, specialMemories, futurePlans } = req.body;

    let story = await Story.findOne({ user: req.user._id });

    if (!story) {
      story = await Story.create({
        user: req.user._id,
        howWeMet,
        firstDate,
        specialMemories,
        futurePlans
      });
    } else {
      story.howWeMet = howWeMet;
      story.firstDate = firstDate;
      story.specialMemories = specialMemories;
      story.futurePlans = futurePlans;
      await story.save();
    }

    await story.populate('user', 'name partnerName anniversaryDate');

    res.json({
      success: true,
      message: 'Story updated successfully',
      data: story
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};