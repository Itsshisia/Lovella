const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  howWeMet: {
    type: String,
    default: 'Tell your beautiful story of how you met...'
  },
  firstDate: {
    type: String,
    default: 'Share your first date experience...'
  },
  specialMemories: {
    type: String,
    default: 'Write about your special memories together...'
  },
  futurePlans: {
    type: String,
    default: 'What does the future hold for both of you?'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Story', storySchema);