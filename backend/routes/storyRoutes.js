const express = require('express');
const {
  getStory,
  updateStory
} = require('../controllers/storyController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', getStory);
router.put('/', updateStory);

module.exports = router;