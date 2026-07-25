import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import Reports from './pages/Reports';
import SOS from './pages/SOS';
import Login from './pages/Login';
import Register from './pages/Register';
import FaceVerify from './pages/FaceVerify';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Dark theme configuration
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00d4ff' },
    secondary: { main: '#7b2ffc' },
    background: { default: '#0a0e1a', paper: '#141a2b' },
    error: { main: '#ff6b6b' },
    warning: { main: '#ffd93d' },
    success: { main: '#6bcb77' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 16,
        },
      },
    },
  },
});

// Protected Route Component – checks localStorage for face verification
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const faceVerified = localStorage.getItem('faceVerified') === 'true';
  const location = window.location.pathname;

  // 1. Must be logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Must have face verified (unless already on /face-verify page)
  if (!faceVerified && location !== '/face-verify') {
    return <Navigate to="/face-verify" replace />;
  }

  return children;
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AuthProvider>
          <LanguageProvider>
            <Router>
              <Navbar />
              <Routes>
                {/* 🔓 Public routes (no authentication required) */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/face-verify" element={<FaceVerify />} />

                {/* 🔒 Protected routes (login + face verification required) */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/agents"
                  element={
                    <ProtectedRoute>
                      <Agents />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reports"
                  element={
                    <ProtectedRoute>
                      <Reports />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/sos"
                  element={
                    <ProtectedRoute>
                      <SOS />
                    </ProtectedRoute>
                  }
                />

                {/* 🔄 Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              <Footer />
            </Router>
          </LanguageProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;