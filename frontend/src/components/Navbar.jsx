import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  
  // Mock user for now - will replace with real auth later
  const user = null

  const navItems = [
    { path: '/', label: 'Home' },
    ...(user ? [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/gallery', label: 'Gallery' },
      { path: '/about', label: 'Our Story' },
      { path: '/achievements', label: 'Achievements' },
      { path: '/chat', label: 'Chat' },
    ] : []),
  ]

  const handleLogout = () => {
    // Will implement real logout later
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-lg border-b-2 border-romantic-pink sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-romantic-pink rounded-full flex items-center justify-center heart-beat">
                <span className="text-white text-xl">💕</span>
              </div>
              <span className="font-dancing text-3xl font-bold text-romantic-pink">
                Lovella
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-romantic-pink bg-pink-50 border-b-2 border-romantic-pink'
                    : 'text-gray-600 hover:text-romantic-pink hover:bg-pink-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 bg-pink-50 px-3 py-1 rounded-full">
                  Welcome, {user.name} & {user.partnerName} 💞
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-romantic-pink text-white px-4 py-2 rounded-lg hover:bg-romantic-rose transition-colors duration-300 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-romantic-pink transition-colors duration-300 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Start Your Story
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-romantic-pink focus:outline-none p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-pink-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-lg text-base font-medium ${
                    location.pathname === item.path
                      ? 'text-romantic-pink bg-pink-50'
                      : 'text-gray-600 hover:text-romantic-pink hover:bg-pink-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-romantic-pink hover:bg-pink-50"
                >
                  Logout
                </button>
              ) : (
                <div className="border-t border-pink-100 pt-2 space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-romantic-pink hover:bg-pink-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-lg text-base font-medium text-romantic-pink bg-pink-50 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Start Your Story
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar