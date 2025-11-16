const Message = require('../models/Message');

// Get all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user._id })
      .populate('user', 'name partnerName')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      data: messages.reverse() // Return in chronological order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create message
exports.createMessage = async (req, res) => {
  try {
    const { text, type } = req.body;

    const message = await Message.create({
      user: req.user._id,
      text,
      type: type || 'text'
    });

    await message.populate('user', 'name partnerName');

    res.status(201).json({
      success: true,
      message: 'Message sent with love 💕',
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete message
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    await Message.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Message deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};