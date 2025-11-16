import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  // Mock user for now
  const user = null

  const features = [
    {
      icon: '📸',
      title: 'Memory Gallery',
      description: 'Upload and caption your favorite photos together in a beautiful, organized gallery.'
    },
    {
      icon: '📖', 
      title: 'Your Love Story',
      description: 'Document how you met, your first date, and all the special moments that made your story unique.'
    },
    {
      icon: '🏆',
      title: 'Achievements & Goals',
      description: 'Celebrate relationship milestones and plan future dreams together in one place.'
    },
    {
      icon: '💬',
      title: 'Private Chat',
      description: 'Share intimate thoughts, love notes, and sweet messages in your private couple space.'
    },
    {
      icon: '🎵',
      title: 'Romantic Music',
      description: 'Set the mood with beautiful background music while browsing your love story.'
    },
    {
      icon: '📅',
      title: 'Anniversary Tracker',
      description: 'Never forget important dates with beautiful countdowns and reminders.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen bg-cover bg-center bg-fixed flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
        }}
      >
        <div className="text-center text-white max-w-4xl mx-auto px-4 fade-in">
          <h1 className="font-dancing text-6xl md:text-8xl mb-6 heart-beat">
            Lovella
          </h1>
          <p className="font-playfair text-2xl md:text-3xl mb-8 italic">
            Where your love story begins and beautiful memories live forever
          </p>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Create your private sanctuary to cherish moments, share dreams, and build your forever together
          </p>
          
          {user ? (
            <div className="space-y-6">
              <p className="text-2xl md:text-3xl font-semibold bg-white/20 backdrop-blur-sm py-4 px-8 rounded-2xl inline-block">
                Welcome back! 💞
              </p>
              <div>
                <Link
                  to="/dashboard"
                  className="btn-primary text-lg px-8 py-4 inline-block text-xl"
                >
                  Continue Your Love Journey
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-x-4 space-y-4 sm:space-y-0">
              <Link
                to="/register"
                className="btn-primary text-lg px-8 py-4 inline-block"
              >
                Start Your Story 💕
              </Link>
              <Link
                to="/login"
                className="btn-secondary text-lg px-8 py-4 inline-block"
              >
                Sign In to Your Space
              </Link>
            </div>
          )}
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="font-playfair text-4xl md:text-5xl text-gray-800 mb-4">
              Cherish Every Moment Together
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Lovella provides everything you need to preserve your most precious memories 
              and dreams in one beautiful, private space designed just for the two of you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-romantic group hover:transform hover:scale-105 text-center">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-romantic-pink to-romantic-rose">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="font-dancing text-5xl md:text-6xl text-white mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of couples who are preserving their love stories, 
            celebrating milestones, and building their future together on Lovella.
          </p>
          {!user && (
            <Link
              to="/register"
              className="bg-white text-romantic-pink text-lg font-semibold px-8 py-4 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 inline-block shadow-2xl"
            >
              Create Your Love Space - It's Free! 💫
            </Link>
          )}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-romantic-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl text-gray-800 mb-12">
            Loved by Couples Worldwide
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-romantic text-left">
              <div className="text-yellow-400 text-2xl mb-2">★★★★★</div>
              <p className="text-gray-600 italic mb-4">
                "Lovella helped us preserve our engagement story and all the little moments leading up to it. 
                It's like having a digital scrapbook of our love!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-romantic-pink rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-sm">S&D</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Sarah & Daniel</p>
                  <p className="text-sm text-gray-500">Together 3 years</p>
                </div>
              </div>
            </div>
            <div className="card-romantic text-left">
              <div className="text-yellow-400 text-2xl mb-2">★★★★★</div>
              <p className="text-gray-600 italic mb-4">
                "The anniversary countdown and memory gallery are our favorite features. 
                It's brought us even closer together!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-romantic-gold rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-sm">M&A</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Mike & Anna</p>
                  <p className="text-sm text-gray-500">Married 1 year</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home