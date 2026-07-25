import React, { useState } from 'react';
import { Container, Box, Typography, Button, Card, Grid, Chip, Alert } from '@mui/material';
import { Sos, LocationOn, Phone, Message, Share } from '@mui/icons-material';

const SOS = () => {
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const contacts = [
    { name: 'Police', number: '100', icon: '🚔' },
    { name: 'Cyber Cell', number: '1930', icon: '🛡️' },
    { name: 'Emergency Contact', number: '+91 9876543210', icon: '👤' },
  ];

  const handleSOS = () => {
    setIsActive(true);
    let count = 5;
    const interval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(interval);
        alert('🚨 EMERGENCY ALERT SENT!\nLocation shared with emergency contacts.');
        setIsActive(false);
        setCountdown(5);
      }
    }, 1000);
  };

  return (
    <Box sx={{ pt: { xs: 8, md: 10 }, pb: 6, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          🆘 Emergency SOS
          <Typography variant="caption" sx={{ display: 'block', color: '#8892b0', mt: 1 }}>
            Orchestrated by the Emergency Response Agent
          </Typography>
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center', position: 'sticky', top: 100 }}>
              <Typography variant="body1" sx={{ color: '#8892b0', mb: 4 }}>
                One-tap emergency alert system with live location sharing
              </Typography>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Button
                  variant="contained"
                  onClick={handleSOS}
                  disabled={isActive}
                  sx={{
                    width: 250,
                    height: 250,
                    borderRadius: '50%',
                    background: isActive ? '#ff6b6b80' : 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    boxShadow: isActive ? '0 0 60px rgba(255,107,107,0.3)' : '0 0 40px rgba(255,107,107,0.2)',
                    animation: isActive ? 'pulse 1s infinite' : 'none',
                    '&:hover': { transform: 'scale(1.05)', boxShadow: '0 0 80px rgba(255,107,107,0.4)' },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isActive ? (
                    <Box>
                      <Typography variant="h2" sx={{ fontWeight: 700 }}>{countdown}</Typography>
                      <Typography variant="body2">Cancelling...</Typography>
                    </Box>
                  ) : (
                    <Box>
                      <Sos sx={{ fontSize: 60, mb: 1 }} />
                      <Typography variant="body1">HOLD TO ACTIVATE</Typography>
                    </Box>
                  )}
                </Button>
              </Box>
              <Box sx={{ mt: 4 }}>
                <Chip icon={<LocationOn />} label="Live Location: Mumbai, India"
                  sx={{ bgcolor: 'rgba(0,212,255,0.1)', color: '#00d4ff' }} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Emergency Contacts</Typography>
            <Grid container spacing={2}>
              {contacts.map((c, i) => (
                <Grid item xs={12} key={i}>
                  <Card sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ fontSize: 32 }}>{c.icon}</Box>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{c.name}</Typography>
                        <Typography variant="body2" sx={{ color: '#8892b0' }}>{c.number}</Typography>
                      </Box>
                    </Box>
                    <Button variant="outlined" size="small" startIcon={<Phone />}
                      sx={{ borderColor: 'rgba(255,255,255,0.2)' }}>Call</Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 4 }}>
              <Alert severity="warning" sx={{ mb: 2 }}>
                <Typography variant="body2"><strong>Emergency Action:</strong> Your location will be shared with all contacts above.</Typography>
              </Alert>
              <Alert severity="info">
                <Typography variant="body2"><strong>Pro Tip:</strong> Hold the SOS button for 3 seconds to activate. Release to cancel.</Typography>
              </Alert>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Quick Actions</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button variant="outlined" fullWidth startIcon={<Message />}
                    sx={{ borderColor: 'rgba(255,255,255,0.2)' }}>Report Cybercrime</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" fullWidth startIcon={<Share />}
                    sx={{ borderColor: 'rgba(255,255,255,0.2)' }}>Share Location</Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SOS;