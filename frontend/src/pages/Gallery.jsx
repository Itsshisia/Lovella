import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Gallery = () => {
  const [images, setImages] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editCaption, setEditCaption] = useState('')

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB')
        return
      }
      setSelectedFile(file)
      toast.success('Photo selected! Ready to upload 📸')
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!selectedFile) {
      toast.error('Please select a beautiful photo first!')
      return
    }

    setUploading(true)

    // Create object URL for preview (in real app, you'd upload to server)
    setTimeout(() => {
      const newImage = {
        id: Date.now(),
        url: URL.createObjectURL(selectedFile),
        caption: caption || 'Our beautiful memory together 💕',
        date: new Date().toISOString().split('T')[0],
        likes: 0
      }

      setImages([newImage, ...images])
      setSelectedFile(null)
      setCaption('')
      document.getElementById('file-input').value = ''
      setUploading(false)
      toast.success('Memory uploaded successfully! Your love story grows 💫')
    }, 1000)
  }

  const startEdit = (image) => {
    setEditingId(image.id)
    setEditCaption(image.caption)
  }

  const saveCaption = (imageId) => {
    setImages(images.map(img => 
      img.id === imageId ? { ...img, caption: editCaption } : img
    ))
    setEditingId(null)
    toast.success('Caption updated with love! 💖')
  }

  const deleteImage = (imageId) => {
    if (!window.confirm('Are you sure you want to delete this precious memory?')) {
      return
    }

    setImages(images.filter(img => img.id !== imageId))
    toast.success('Memory moved to the heart archive 💝')
  }

  const likeImage = (imageId) => {
    setImages(images.map(img => 
      img.id === imageId ? { ...img, likes: img.likes + 1 } : img
    ))
    toast('💖 Love added to this memory!', { icon: '❤️' })
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
            Every picture tells a story of our love journey. Preserve your precious moments together forever.
          </p>
          <div className="mt-4 flex justify-center items-center space-x-2 text-romantic-pink">
            <span className="text-2xl">📸</span>
            <span className="text-lg">{images.length} beautiful memories</span>
          </div>
        </div>

        {/* Upload Section */}
        <div className="card-romantic mb-12">
          <h2 className="font-playfair text-2xl text-gray-800 mb-6 flex items-center">
            <span className="text-2xl mr-3">✨</span>
            Add New Memory
          </h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose a Photo
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-romantic-pink file:to-romantic-rose file:text-white hover:file:from-romantic-rose hover:file:to-romantic-pink transition-all"
                />
                <p className="text-xs text-gray-500 mt-2">
                  PNG, JPG, JPEG up to 5MB • Choose your most beautiful moments
                </p>
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Memory Caption
                </label>
                <input
                  type="text"
                  placeholder="Describe this beautiful moment..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="input-romantic"
                />
              </div>

              <button
                type="submit"
                disabled={uploading || !selectedFile}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap mt-6"
              >
                {uploading ? (
                  <span className="flex items-center">
                    <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Uploading Love...
                  </span>
                ) : (
                  'Upload Memory ✨'
                )}
              </button>
            </div>

            {selectedFile && (
              <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                <span className="text-lg">✅</span>
                <span>Selected: <strong>{selectedFile.name}</strong> - Ready to preserve this memory!</span>
              </div>
            )}
          </form>
        </div>

        {/* Gallery Grid */}
        {images.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="font-playfair text-2xl text-gray-600 mb-2">
              Your gallery is waiting for memories
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Upload your first photo together and start building your beautiful love story collection.
            </p>
            <button
              onClick={() => document.getElementById('file-input').click()}
              className="btn-primary"
            >
              Upload Your First Memory
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div key={image.id} className="card-romantic group hover:shadow-2xl transition-all duration-300">
                {/* Image */}
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  
                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                    <button
                      onClick={() => likeImage(image.id)}
                      className="bg-white/90 backdrop-blur-sm text-romantic-pink p-2 rounded-full hover:scale-110 transition-transform"
                      title="Add love"
                    >
                      ❤️
                    </button>
                    <button
                      onClick={() => startEdit(image)}
                      className="bg-white/90 backdrop-blur-sm text-blue-500 p-2 rounded-full hover:scale-110 transition-transform"
                      title="Edit caption"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteImage(image.id)}
                      className="bg-white/90 backdrop-blur-sm text-red-500 p-2 rounded-full hover:scale-110 transition-transform"
                      title="Delete memory"
                    >
                      🗑️
                    </button>
                  </div>

                  {/* Likes */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm text-romantic-pink font-semibold">
                    ❤️ {image.likes}
                  </div>
                </div>

                {/* Caption & Date */}
                <div className="space-y-3">
                  {editingId === image.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editCaption}
                        onChange={(e) => setEditCaption(e.target.value)}
                        className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-romantic-pink resize-none text-sm"
                        rows="2"
                        placeholder="Tell the story of this moment..."
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => saveCaption(image.id)}
                          className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-green-600 transition-colors font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex-1 bg-gray-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-gray-600 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {image.caption}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{formatDate(image.date)}</span>
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

        {/* Memory Stats - Only show when there are images */}
        {images.length > 0 && (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card-romantic text-center">
              <div className="text-2xl text-romantic-pink mb-2">📸</div>
              <div className="text-2xl font-bold text-gray-800">{images.length}</div>
              <div className="text-sm text-gray-600">Total Memories</div>
            </div>
            <div className="card-romantic text-center">
              <div className="text-2xl text-romantic-pink mb-2">❤️</div>
              <div className="text-2xl font-bold text-gray-800">{images.reduce((sum, img) => sum + img.likes, 0)}</div>
              <div className="text-sm text-gray-600">Total Love</div>
            </div>
            <div className="card-romantic text-center">
              <div className="text-2xl text-romantic-pink mb-2">⭐</div>
              <div className="text-2xl font-bold text-gray-800">{images.filter(img => img.likes > 10).length}</div>
              <div className="text-sm text-gray-600">Favorite Memories</div>
            </div>
            <div className="card-romantic text-center">
              <div className="text-2xl text-romantic-pink mb-2">🎯</div>
              <div className="text-2xl font-bold text-gray-800">{new Set(images.map(img => img.date.split('-')[0])).size}</div>
              <div className="text-sm text-gray-600">Years Together</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Gallery