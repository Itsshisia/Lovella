const express = require('express');
const {
  uploadImage,
  getGallery,
  updateCaption,
  deleteImage
} = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.use(protect);

router.post('/upload', upload.single('image'), uploadImage);
router.get('/', getGallery);
router.put('/:id/caption', updateCaption);
router.delete('/:id', deleteImage);

module.exports = router;