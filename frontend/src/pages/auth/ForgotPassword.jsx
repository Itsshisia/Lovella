import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Mock email sending
    setTimeout(() => {
      toast.success('Password reset email sent! Check your inbox 💌')
      setEmailSent(true)
      setLoading(false)
    }, 1500)
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-romantic-cream flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <span className="text-white text-2xl">✓</span>
          </div>
          <h2 className="font-dancing text-4xl font-bold text-gray-900 mb-4">
            Check Your Email!
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            We've sent a password reset link to:<br />
            <strong className="text-romantic-pink">{email}</strong>
          </p>
          <p className="text-gray-500 mb-8">
            Click the link in the email to reset your password and get back to your love story.
          </p>
          <div className="space-y-4">
            <Link
              to="/login"
              className="w-full btn-primary inline-block py-3"
            >
              Back to Login
            </Link>
            <p className="text-sm text-gray-500">
              Didn't receive the email?{' '}
              <button
                onClick={() => setEmailSent(false)}
                className="text-romantic-pink hover:text-romantic-rose font-medium"
              >
                Try again
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-romantic-cream flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-romantic-pink to-romantic-rose rounded-full flex items-center justify-center mb-4 shadow-lg">
            <span className="text-white text-2xl">🔒</span>
          </div>
          <h2 className="font-dancing text-4xl font-bold text-gray-900 mb-2">
            Reset Password
          </h2>
          <p className="text-gray-600 text-lg">
            Enter your email to reset your password
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input-romantic"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  Sending Reset Link...
                </span>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="font-medium text-romantic-pink hover:text-romantic-rose transition-colors duration-300 text-sm"
            >
              ← Back to Login
            </Link>
          </div>
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 text-center">
            <strong>Note:</strong> This is a demo. In a real app, you would receive an actual email.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword