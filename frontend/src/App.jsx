import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Achievements from './pages/Achievements'
import Chat from './pages/Chat'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-romantic-cream flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </main>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#ec4899',
              color: 'white',
              borderRadius: '10px',
              fontWeight: '500',
            },
          }}
        />
        <MusicPlayer />
      </div>
    </Router>
  )
}

export default App