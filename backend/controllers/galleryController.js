const Gallery = require('../models/Gallery');
const cloudinary = require('../config/cloudinary');
const stream = require('stream');

// Upload image to gallery
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file'
      });
    }

    // Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'lovella',
        transformation: [
          { width: 1200, height: 800, crop: 'limit' },
          { quality: 'auto' },
          { format: 'jpg' }
        ]
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'Error uploading image to cloud',
            error: error.message
          });
        }

        // Save to database
        const gallery = await Gallery.create({
          user: req.user._id,
          image: {
            public_id: result.public_id,
            url: result.secure_url
          },
          caption: req.body.caption || 'Our beautiful memory ❤️'
        });

        await gallery.populate('user', 'name partnerName');

        res.status(201).json({
          success: true,
          message: 'Image uploaded successfully',
          data: gallery
        });
      }
    );

    // Create stream from buffer
    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);
    bufferStream.pipe(uploadStream);
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all gallery images for user
exports.getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({ user: req.user._id })
      .populate('user', 'name partnerName')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: gallery.length,
      data: gallery
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update image caption
exports.updateCaption = async (req, res) => {
  try {
    const gallery = await Gallery.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    gallery.caption = req.body.caption;
    await gallery.save();

    res.json({
      success: true,
      message: 'Caption updated successfully',
      data: gallery
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete image
exports.deleteImage = async (req, res) => {
  try {
    const gallery = await Gallery.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(gallery.image.public_id);

    // Delete from database
    await Gallery.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};