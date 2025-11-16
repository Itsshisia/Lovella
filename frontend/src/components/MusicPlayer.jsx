import React, { useState, useRef } from 'react'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const audioRef = useRef(null)

  const loveSongs = [
    {
      title: "Perfect",
      artist: "Ed Sheeran",
      emoji: "💕",
      duration: "4:23"
    },
    {
      title: "All of Me", 
      artist: "John Legend",
      emoji: "❤️",
      duration: "4:29"
    },
    {
      title: "A Thousand Years",
      artist: "Christina Perri",
      emoji: "⏳",
      duration: "4:45"
    },
    {
      title: "Thinking Out Loud",
      artist: "Ed Sheeran", 
      emoji: "💭",
      duration: "4:41"
    },
    {
      title: "You Are The Reason",
      artist: "Calum Scott",
      emoji: "🌟",
      duration: "3:24"
    }
  ]

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // In a real app, you would control actual audio here
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % loveSongs.length)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + loveSongs.length) % loveSongs.length)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-2xl shadow-2xl border border-pink-200 p-4 w-80 transform hover:scale-105 transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-playfair text-lg text-gray-800 flex items-center">
            <span className="mr-2 text-romantic-pink">🎵</span>
            Love Songs
          </h3>
          <div className="text-sm text-romantic-pink bg-pink-50 px-2 py-1 rounded-full">
            {currentTrack + 1}/{loveSongs.length}
          </div>
        </div>

        {/* Current Track */}
        <div className="text-center mb-4">
          <div className="text-3xl mb-2">{loveSongs[currentTrack].emoji}</div>
          <h4 className="font-semibold text-gray-800 text-lg">{loveSongs[currentTrack].title}</h4>
          <p className="text-sm text-gray-600">{loveSongs[currentTrack].artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>0:00</span>
            <span>{loveSongs[currentTrack].duration}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-romantic-pink to-romantic-rose rounded-full h-1 transition-all duration-1000"
              style={{ width: isPlaying ? '33%' : '0%' }}
            ></div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mb-2">
          <button
            onClick={prevTrack}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600"
          >
            ⏮
          </button>
          
          <button
            onClick={togglePlay}
            className="w-12 h-12 bg-gradient-to-r from-romantic-pink to-romantic-rose rounded-full flex items-center justify-center hover:from-romantic-rose hover:to-romantic-pink transition-all shadow-lg"
          >
            <span className="text-white text-lg">
              {isPlaying ? '⏸' : '▶'}
            </span>
          </button>
          
          <button
            onClick={nextTrack}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600"
          >
            ⏭
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>🔈</span>
          <div className="flex-1 bg-gray-200 rounded-full h-1">
            <div className="bg-romantic-pink rounded-full h-1 w-3/4"></div>
          </div>
          <span>🔊</span>
        </div>

        {/* Playlist Preview */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">Next up:</p>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-romantic-pink">
              {loveSongs[(currentTrack + 1) % loveSongs.length].emoji}
            </span>
            <span className="text-gray-700">
              {loveSongs[(currentTrack + 1) % loveSongs.length].title}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer