import React, { useState, useRef } from 'react';
import { Container, Box, Card, Typography, TextField, Button, Alert, Link, Divider, CircularProgress } from '@mui/material';
import { Security, Email, Lock, CameraAlt, CheckCircle } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [faceAuth, setFaceAuth] = useState(false);
  const [faceCaptured, setFaceCaptured] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // ----- Face Authentication (still simulated) -----
  const startFaceAuth = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setFaceAuth(true);
      }
    } catch (err) {
      alert('Camera access denied. Please allow camera access or use email login.');
    }
  };

  const captureFace = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Simulate login – in production, send the image to /auth/face-login
    setLoading(true);
    try {
      // For now, we simulate a successful face login.
      // Replace this with an API call that validates the face.
      // const formData = new FormData();
      // formData.append('face', canvas.toBlob(...));
      // const res = await api.post('/auth/face-login', formData);
      // const { token, user } = res.data;
      // localStorage.setItem('token', token);
      // login(user);
      // navigate('/dashboard');

      // Simulate success
      setTimeout(() => {
        setFaceCaptured(true);
        setFaceAuth(false);
        setLoading(false);
        const stream = videoRef.current.srcObject;
        if (stream) stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
        // Simulate a user object
        login({ id: 'face-user', name: 'Face User', email: 'face@user.com' });
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setError('Face authentication failed. Please try again or use email.');
      setLoading(false);
    }
  };

  const cancelFace = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setFaceAuth(false);
  };

  // ----- Email/Password Login -----
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      login(user);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.msg || 'Login failed. Please check your credentials.';
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ pt: { xs: 10, md: 12 }, pb: 6, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#0a0e1a' }}>
      <Container maxWidth="sm">
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Box sx={{ mb: 3 }}>
            <Security sx={{ fontSize: 60, color: '#00d4ff' }} />
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 2 }}>
              <span className="gradient-text">SURAKSHAK AI</span>
            </Typography>
            <Typography variant="body2" sx={{ color: '#8892b0' }}>{t('login.title')}</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {/* Face Auth Section */}
          {!faceAuth && !faceCaptured && (
            <Box sx={{ mb: 3 }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<CameraAlt />}
                onClick={startFaceAuth}
                disabled={loading}
                sx={{ py: 1.5, background: 'linear-gradient(135deg, #00d4ff, #7b2ffc)', '&:hover': { transform: 'scale(1.02)' } }}
              >
                {t('login.faceButton')}
              </Button>
            </Box>
          )}

          {faceAuth && (
            <Box sx={{ mb: 3 }}>
              <video ref={videoRef} style={{ width: '100%', maxHeight: '300px', borderRadius: 8 }} />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              <Button
                variant="contained"
                fullWidth
                onClick={captureFace}
                disabled={loading}
                sx={{ mt: 2, background: 'linear-gradient(135deg, #00d4ff, #7b2ffc)' }}
              >
                {loading ? <CircularProgress size={24} /> : t('login.captureButton')}
              </Button>
              <Button
                variant="text"
                fullWidth
                onClick={cancelFace}
                disabled={loading}
                sx={{ mt: 1, color: '#ff6b6b' }}
              >
                {t('login.cancel')}
              </Button>
            </Box>
          )}

          {faceCaptured && (
            <Box sx={{ mb: 3 }}>
              <Alert icon={<CheckCircle />} severity="success">
                {t('login.verified')}
              </Alert>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate('/dashboard')}
                sx={{ mt: 2, background: 'linear-gradient(135deg, #00d4ff, #7b2ffc)' }}
              >
                {t('login.goDashboard')}
              </Button>
            </Box>
          )}

          <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }}>
            <Typography variant="caption" sx={{ color: '#8892b0' }}>{t('login.or')}</Typography>
          </Divider>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin}>
            <TextField
              fullWidth
              label={t('login.email')}
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              sx={{ mb: 2 }}
              InputProps={{ startAdornment: <Email sx={{ mr: 1, color: '#8892b0' }} /> }}
            />
            <TextField
              fullWidth
              label={t('login.password')}
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              sx={{ mb: 3 }}
              InputProps={{ startAdornment: <Lock sx={{ mr: 1, color: '#8892b0' }} /> }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ background: 'linear-gradient(135deg, #00d4ff, #7b2ffc)', py: 1.5, '&:hover': { transform: 'scale(1.02)' } }}
            >
              {loading ? <CircularProgress size={24} /> : t('login.signIn')}
            </Button>
          </form>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ color: '#8892b0' }}>
              {t('login.noAccount')}
            </Typography>
            <Typography variant="body2" sx={{ color: '#8892b0', mt: 1 }}>
              <Link href="#" sx={{ color: '#8892b0' }}>{t('login.forgot')}</Link>
            </Typography>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;