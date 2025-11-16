import React, { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editCaption, setEditCaption] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await authAPI.get('/gallery');
      setImages(response.data.data);
    } catch (error) {
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please select an image');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('caption', caption);

    try {
      const response = await authAPI.post('/gallery/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setImages([response.data.data, ...images]);
      setSelectedFile(null);
      setCaption('');
      document.getElementById('file-input').value = '';
      toast.success('Image uploaded successfully! 💕');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const startEdit = (image) => {
    setEditingId(image._id);
    setEditCaption(image.caption);
  };

  const saveCaption = async (imageId) => {
    try {
      const response = await authAPI.put(`/gallery/${imageId}/caption`, {
        caption: editCaption
      });

      setImages(images.map(img => 
        img._id === imageId ? response.data.data : img
      ));
      setEditingId(null);
      toast.success('Caption updated! 💖');
    } catch (error) {
      toast.error('Failed to update caption');
    }
  };

  const deleteImage = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this memory?')) {
      return;
    }

    try {
      await authAPI.delete(`/gallery/${imageId}`);
      setImages(images.filter(img => img._id !== imageId));
      toast.success('Memory deleted');
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-romantic-pink"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-romantic-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-dancing text-5xl md:text-6xl text-romantic-pink mb-4">
            Our Memory Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Preserve your precious moments together. Every picture tells a story of your love journey.
          </p>
        </div>

        {/* Upload Section */}
        <div className="card-romantic mb-12">
          <h2 className="font-playfair text-2xl text-gray-800 mb-6">
            Add New Memory
          </h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-romantic-pink file:text-white hover:file:bg-romantic-rose"
                />
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, JPEG up to 5MB
                </p>
              </div>
              
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Add a beautiful caption..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="input-romantic"
                />
              </div>

              <button
                type="submit"
                disabled={uploading || !selectedFile}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {uploading ? (
                  <span className="flex items-center">
                    <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Uploading...
                  </span>
                ) : (
                  'Upload Memory'
                )}
              </button>
            </div>

            {selectedFile && (
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <span>✅</span>
                <span>Selected: {selectedFile.name}</span>
              </div>
            )}
          </form>
        </div>

        {/* Gallery Grid */}
        {images.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="font-playfair text-2xl text-gray-600 mb-2">
              No memories yet
            </h3>
            <p className="text-gray-500">
              Start uploading your beautiful moments together!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div key={image._id} className="card-romantic group hover:shadow-2xl transition-all duration-300">
                {/* Image */}
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={image.image.url}
                    alt={image.caption}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => deleteImage(image._id)}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* Caption */}
                <div className="space-y-3">
                  {editingId === image._id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editCaption}
                        onChange={(e) => setEditCaption(e.target.value)}
                        className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-romantic-pink resize-none"
                        rows="2"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => saveCaption(image._id)}
                          className="flex-1 bg-green-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex-1 bg-gray-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {image.caption}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{formatDate(image.createdAt)}</span>
                        <button
                          onClick={() => startEdit(image)}
                          className="text-romantic-pink hover:text-romantic-rose transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;