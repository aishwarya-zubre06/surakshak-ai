import React, { useState } from 'react';
import { Container, Box, Card, Typography, TextField, Button, Alert, Link, CircularProgress } from '@mui/material';
import { Security, Email, Lock, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { name, email, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      // After registration, go to face verification step
      navigate('/face-verify');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ pt: { xs: 10, md: 12 }, pb: 6, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#0a0e1a' }}>
      <Container maxWidth="sm">
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Security sx={{ fontSize: 60, color: '#00d4ff' }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mt: 2 }}><span className="gradient-text">SURAKSHAK AI</span></Typography>
          <Typography variant="body2" sx={{ color: '#8892b0' }}>Create your account</Typography>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <form onSubmit={handleRegister}>
            <TextField fullWidth label="Full Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} sx={{ mb: 2 }} InputProps={{ startAdornment: <Person sx={{ mr: 1, color: '#8892b0' }} /> }} />
            <TextField fullWidth label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} sx={{ mb: 2 }} InputProps={{ startAdornment: <Email sx={{ mr: 1, color: '#8892b0' }} /> }} />
            <TextField fullWidth label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} sx={{ mb: 2 }} InputProps={{ startAdornment: <Lock sx={{ mr: 1, color: '#8892b0' }} /> }} />
            <TextField fullWidth label="Confirm Password" type="password" variant="outlined" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading} sx={{ mb: 3 }} InputProps={{ startAdornment: <Lock sx={{ mr: 1, color: '#8892b0' }} /> }} />
            <Button type="submit" variant="contained" fullWidth size="large" disabled={loading} sx={{ background: 'linear-gradient(135deg, #00d4ff, #7b2ffc)', py: 1.5 }}>
              {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>Already have an account? <Link href="/login" sx={{ color: '#00d4ff' }}>Sign In</Link></Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default Register;