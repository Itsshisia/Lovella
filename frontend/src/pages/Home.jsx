import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4 fade-in">
            <h1 className="font-dancing text-6xl md:text-8xl mb-6 heart-beat">
              Lovella
            </h1>
            <p className="font-playfair text-xl md:text-2xl mb-8 italic">
              Where your love story begins and beautiful memories live forever
            </p>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Create your private space to cherish moments, share dreams, and build your forever together
            </p>
            
            {user ? (
              <div className="space-y-4">
                <p className="text-2xl font-semibold">
                  Welcome back, {user.name} & {user.partnerName}!
                </p>
                <Link
                  to="/dashboard"
                  className="btn-primary text-lg px-8 py-3 inline-block"
                >
                  Continue Your Love Journey
                </Link>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/register"
                  className="btn-primary text-lg px-8 py-3 inline-block"
                >
                  Start Your Story
                </Link>
                <Link
                  to="/login"
                  className="btn-secondary text-lg px-8 py-3 inline-block"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl text-gray-800 mb-4">
              Cherish Every Moment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lovella helps you preserve your most precious memories and dreams in one beautiful, private space
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '📸',
                title: 'Memory Gallery',
                description: 'Upload and caption your favorite photos together'
              },
              {
                icon: '📖',
                title: 'Your Love Story',
                description: 'Document how you met and your special journey'
              },
              {
                icon: '🏆',
                title: 'Achievements',
                description: 'Celebrate milestones and plan future goals'
              },
              {
                icon: '💬',
                title: 'Private Chat',
                description: 'Share intimate thoughts and messages'
              }
            ].map((feature, index) => (
              <div key={index} className="card-romantic text-center group hover:transform hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-romantic-pink">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="font-dancing text-5xl md:text-6xl text-white mb-6">
            Ready to Begin?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Join thousands of couples preserving their love stories on Lovella
          </p>
          {!user && (
            <Link
              to="/register"
              className="bg-white text-romantic-pink text-lg font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-300 inline-block"
            >
              Create Your Love Space - It's Free!
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;