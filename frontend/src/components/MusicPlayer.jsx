import React, { useState, useRef } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);

  const loveSongs = [
    {
      title: "Perfect",
      artist: "Ed Sheeran",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      emoji: "💕"
    },
    {
      title: "All of Me",
      artist: "John Legend",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      emoji: "❤️"
    },
    {
      title: "A Thousand Years",
      artist: "Christina Perri",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      emoji: "⏳"
    }
  ];

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % loveSongs.length);
    if (isPlaying) {
      setTimeout(() => audioRef.current.play(), 100);
    }
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + loveSongs.length) % loveSongs.length);
    if (isPlaying) {
      setTimeout(() => audioRef.current.play(), 100);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl border border-pink-200 p-4 w-80">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-playfair text-lg text-gray-800 flex items-center">
            <span className="mr-2">🎵</span>
            Love Songs
          </h3>
          <div className="text-sm text-romantic-pink bg-pink-50 px-2 py-1 rounded-full">
            {currentTrack + 1}/{loveSongs.length}
          </div>
        </div>

        {/* Current Track */}
        <div className="text-center mb-4">
          <div className="text-2xl mb-2">{loveSongs[currentTrack].emoji}</div>
          <h4 className="font-semibold text-gray-800">{loveSongs[currentTrack].title}</h4>
          <p className="text-sm text-gray-600">{loveSongs[currentTrack].artist}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <button
            onClick={prevTrack}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            ⏮
          </button>
          
          <button
            onClick={togglePlay}
            className="w-12 h-12 bg-romantic-pink rounded-full flex items-center justify-center hover:bg-romantic-rose transition-colors"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          
          <button
            onClick={nextTrack}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            ⏭
          </button>
        </div>

        {/* Progress (simplified) */}
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>0:00</span>
          <div className="flex-1 bg-gray-200 rounded-full h-1">
            <div className="bg-romantic-pink rounded-full h-1 w-1/3"></div>
          </div>
          <span>3:45</span>
        </div>

        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={loveSongs[currentTrack].src}
          onEnded={nextTrack}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;