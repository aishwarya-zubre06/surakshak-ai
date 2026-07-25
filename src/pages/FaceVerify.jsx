import React, { useState, useRef } from 'react';
import { Container, Box, Card, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { Security, CameraAlt, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FaceVerify = () => {
  const [capturing, setCapturing] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 300, height: 300 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCapturing(true);
        setError('');
      }
    } catch (err) {
      console.error('Camera error:', err);
      if (err.name === 'NotAllowedError') {
        setError('Camera access denied. Please allow camera permissions in your browser.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found. Please connect a camera.');
      } else {
        setError('Could not start camera: ' + err.message);
      }
    }
  };

  const captureAndVerify = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    setLoading(true);
    setTimeout(() => {
      setVerified(true);
      setCapturing(false);
      setLoading(false);
      // Stop camera
      const stream = videoRef.current.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      localStorage.setItem('faceVerified', 'true');
      setTimeout(() => navigate('/dashboard'), 1500);
    }, 1500);
  };

  const cancelCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCapturing(false);
    setError('');
  };

  return (
    <Box sx={{ pt: { xs: 10, md: 12 }, pb: 6, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#0a0e1a' }}>
      <Container maxWidth="sm">
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Security sx={{ fontSize: 60, color: '#00d4ff' }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mt: 2 }}><span className="gradient-text">Face Verification</span></Typography>
          <Typography variant="body2" sx={{ color: '#8892b0', mb: 2 }}>
            Please verify your identity with your face to secure your account.
          </Typography>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {verified && <Alert icon={<CheckCircle />} severity="success">Face verified! Redirecting to dashboard...</Alert>}
          {!verified && !capturing && (
            <Button variant="contained" startIcon={<CameraAlt />} onClick={startCamera} fullWidth sx={{ mt: 2, py: 1.5, background: 'linear-gradient(135deg, #00d4ff, #7b2ffc)' }}>
              Start Face Verification
            </Button>
          )}
          {capturing && (
            <Box sx={{ mt: 2 }}>
              <video ref={videoRef} style={{ width: '100%', maxHeight: '300px', borderRadius: 8 }} />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              <Button variant="contained" onClick={captureAndVerify} disabled={loading} fullWidth sx={{ mt: 2, py: 1.5, background: 'linear-gradient(135deg, #00d4ff, #7b2ffc)' }}>
                {loading ? <CircularProgress size={24} /> : 'Capture & Verify'}
              </Button>
              <Button variant="text" onClick={cancelCamera} disabled={loading} sx={{ mt: 1, color: '#ff6b6b' }}>
                Cancel
              </Button>
            </Box>
          )}
        </Card>
      </Container>
    </Box>
  );
};

export default FaceVerify;