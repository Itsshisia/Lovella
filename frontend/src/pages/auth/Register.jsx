import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    partnerName: '',
    anniversaryDate: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Mock registration for now
    setTimeout(() => {
      toast.success('Your love story begins now! 💫 Welcome to Lovella!')
      navigate('/dashboard')
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-romantic-cream flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-romantic-pink to-romantic-rose rounded-full flex items-center justify-center heart-beat mb-4 shadow-lg">
            <span className="text-white text-2xl">💑</span>
          </div>
          <h2 className="font-dancing text-4xl font-bold text-gray-900 mb-2">
            Start Your Story
          </h2>
          <p className="text-gray-600 text-lg">
            Create your beautiful couple's space
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="input-romantic"
                placeholder="Enter your beautiful name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input-romantic"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input-romantic"
                placeholder="Create a secure password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="partnerName" className="block text-sm font-medium text-gray-700 mb-2">
                Partner's Name *
              </label>
              <input
                id="partnerName"
                name="partnerName"
                type="text"
                required
                className="input-romantic"
                placeholder="Enter your partner's beautiful name"
                value={formData.partnerName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="anniversaryDate" className="block text-sm font-medium text-gray-700 mb-2">
                Anniversary Date *
              </label>
              <input
                id="anniversaryDate"
                name="anniversaryDate"
                type="date"
                required
                className="input-romantic"
                value={formData.anniversaryDate}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                When did your beautiful journey begin?
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  Creating Your Love Space...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Create Your Love Space
                  <span className="ml-2 group-hover:scale-110 transition-transform">✨</span>
                </span>
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-romantic-pink hover:text-romantic-rose transition-colors duration-300"
              >
                Sign in to your love space
              </Link>
            </p>
          </div>
        </form>

        {/* Love Quote */}
        <div className="mt-8 p-4 bg-pink-50 rounded-lg border border-pink-200 text-center">
          <p className="text-sm text-pink-700 italic">
            "The best thing to hold onto in life is each other." - Audrey Hepburn
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register