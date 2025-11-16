import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      authAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // For now, we'll set a mock user. Later we'll verify with backend.
      setUser({
        id: '1',
        name: 'You',
        email: 'user@example.com',
        partnerName: 'Your Partner',
        anniversaryDate: new Date().toISOString()
      });
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      // Mock login for now - we'll connect to backend later
      const mockUser = {
        id: '1',
        name: 'You',
        email: email,
        partnerName: 'Your Partner',
        anniversaryDate: new Date().toISOString()
      };
      
      const mockToken = 'mock_jwt_token_' + Date.now();
      
      localStorage.setItem('token', mockToken);
      setToken(mockToken);
      setUser(mockUser);
      
      return { success: true, data: { token: mockToken, user: mockUser } };
    } catch (error) {
      return { 
        success: false, 
        message: 'Login failed. Using mock data for now.' 
      };
    }
  };

  const register = async (userData) => {
    try {
      // Mock registration for now
      const mockUser = {
        id: '1',
        name: userData.name,
        email: userData.email,
        partnerName: userData.partnerName,
        anniversaryDate: userData.anniversaryDate
      };
      
      const mockToken = 'mock_jwt_token_' + Date.now();
      
      localStorage.setItem('token', mockToken);
      setToken(mockToken);
      setUser(mockUser);
      
      return { success: true, data: { token: mockToken, user: mockUser } };
    } catch (error) {
      return { 
        success: false, 
        message: 'Registration failed. Using mock data for now.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};