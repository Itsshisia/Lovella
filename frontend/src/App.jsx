import React from 'react'

function App() {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%'
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '20px'
        }}>
          💕
        </div>
        <h1 style={{ 
          color: '#ec4899', 
          fontSize: '3rem',
          marginBottom: '10px',
          fontFamily: 'cursive'
        }}>
          Lovella
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#666',
          marginBottom: '30px'
        }}>
          Your Love Story App is Ready!
        </p>
        
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            background: '#f0f9ff',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '15px'
          }}>
            <strong>Frontend:</strong> <span style={{ color: 'green' }}>✅ Running on port 3000</span>
          </div>
          <div style={{
            background: '#f0f9ff',
            padding: '15px',
            borderRadius: '10px'
          }}>
            <strong>Backend:</strong> <span style={{ color: 'green' }}>✅ Running on port 5000</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            href="http://localhost:5000" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              padding: '12px 24px', 
              background: '#ec4899', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '8px',
              fontWeight: 'bold'
            }}
          >
            Test Backend API
          </a>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              padding: '12px 24px', 
              background: '#6b7280', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>

        <div style={{
          marginTop: '30px',
          padding: '15px',
          background: '#f8fafc',
          borderRadius: '10px',
          fontSize: '0.9rem',
          color: '#64748b'
        }}>
          <p><strong>Next Steps:</strong> Add authentication, gallery, and other features</p>
        </div>
      </div>
    </div>
  )
}

export default App