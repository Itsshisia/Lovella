import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-romantic-pink rounded-full flex items-center justify-center">
                <span className="text-white text-xl">💕</span>
              </div>
              <span className="font-dancing text-2xl font-bold text-white">
                Lovella
              </span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Where your love story begins and beautiful memories live forever. 
              Create your private space to cherish moments, share dreams, and build your forever together.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-romantic-pink rounded-full flex items-center justify-center cursor-pointer hover:bg-romantic-rose transition-colors">
                <span className="text-white">❤️</span>
              </div>
              <div className="w-10 h-10 bg-romantic-gold rounded-full flex items-center justify-center cursor-pointer hover:bg-amber-500 transition-colors">
                <span className="text-white">💑</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/achievements" className="text-gray-300 hover:text-white transition-colors">Achievements</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/register" className="text-gray-300 hover:text-white transition-colors">Register</Link></li>
              <li><Link to="/chat" className="text-gray-300 hover:text-white transition-colors">Private Chat</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 Lovella. Made with 💕 for couples in love.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-300 text-sm hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="text-gray-300 text-sm hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer