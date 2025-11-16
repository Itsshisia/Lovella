const express = require('express');
const {
  getMessages,
  createMessage,
  deleteMessage
} = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', getMessages);
router.post('/', createMessage);
router.delete('/:id', deleteMessage);

module.exports = router;