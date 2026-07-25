import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Card, Chip, Button, LinearProgress, Alert, CircularProgress } from '@mui/material';
import { CheckCircle, Schedule, Security, Refresh, Download, Hub, Warning } from '@mui/icons-material';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  ArcElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import ThreatMap from '../components/dashboard/ThreatMap';
import LiveFeed from '../components/dashboard/LiveFeed';
import VoiceInput from '../components/VoiceInput';
import Chatbot from '../components/Chatbot';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import io from 'socket.io-client';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler);

const Dashboard = () => {
  const { t } = useLanguage();
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [socket, setSocket] = useState(null);
  const [newThreatsCount, setNewThreatsCount] = useState(0);

  // ----- Fetch threats from REST API -----
  const fetchThreats = async () => {
    try {
      setError(null);
      const res = await api.get('/threats');
      setThreats(res.data);
    } catch (err) {
      console.error('Error fetching threats:', err);
      setError('Failed to load threats. Please try again.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // ----- Socket.IO Connection -----
  useEffect(() => {
    // Connect to backend
    const socketInstance = io('http://localhost:5000', {
      transports: ['websocket', 'polling']
    });
    setSocket(socketInstance);

    // Listen for new threats
    socketInstance.on('newThreat', (threat) => {
      console.log('🟢 New threat received:', threat);
      // Add new threat to the beginning of the list
      setThreats(prev => {
        const newThreat = {
          ...threat,
          _id: threat.id || Date.now().toString(),
          timestamp: threat.timestamp || new Date()
        };
        return [newThreat, ...prev];
      });
      setNewThreatsCount(prev => prev + 1);
    });

    socketInstance.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    // Cleanup on unmount
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        console.log('🔴 Socket disconnected');
      }
    };
  }, []);

  // ----- Initial fetch -----
  useEffect(() => {
    fetchThreats();
    // Poll every 30 seconds as fallback
    const interval = setInterval(fetchThreats, 30000);
    return () => clearInterval(interval);
  }, []);

  // ----- Refresh handler -----
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchThreats();
    setNewThreatsCount(0);
  };

  // ----- Voice transcript handler -----
  const handleVoiceTranscript = (text) => {
    console.log('Voice transcript:', text);
    // Optional: send voice command to chatbot
  };

  // ----- Compute stats from real data -----
  const totalThreats = threats.length;
  const blockedThreats = threats.filter(t => t.status === 'Blocked').length;
  const highRiskThreats = threats.filter(t => t.risk === 'High').length;

  // Agent performance metrics (mock – could be extended from backend)
  const agentPerformance = [
    { name: 'Threat Detection', accuracy: 94, latency: '32ms' },
    { name: 'NLP Intelligence', accuracy: 89, latency: '45ms' },
    { name: 'QR Scam Detection', accuracy: 92, latency: '28ms' },
    { name: 'Deepfake Detection', accuracy: 95, latency: '120ms' },
    { name: 'Financial Fraud', accuracy: 87, latency: '67ms' },
  ];

  // ----- Chart data (mock – replace with real aggregation later) -----
  const lineData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
    datasets: [
      {
        label: 'Agent Interactions',
        data: [12, 8, 45, 78, 56, 89, 34],
        borderColor: '#00d4ff',
        backgroundColor: 'rgba(0,212,255,0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Autonomous Resolutions',
        data: [10, 6, 40, 70, 50, 82, 30],
        borderColor: '#6bcb77',
        backgroundColor: 'rgba(107,203,119,0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: ['Threat Detection', 'NLP', 'QR Scam', 'Financial', 'Deepfake'],
    datasets: [{
      data: [30, 25, 15, 18, 12],
      backgroundColor: ['#00d4ff', '#7b2ffc', '#ffd93d', '#ff6b6b', '#6bcb77'],
      borderColor: '#0a0e1a',
      borderWidth: 2,
    }],
  };

  // ----- Stats cards -----
  const stats = [
    { title: 'Total Threats', value: totalThreats, change: '+12%', icon: <Warning />, color: '#ff6b6b' },
    { title: 'Blocked', value: blockedThreats, change: '+15%', icon: <CheckCircle />, color: '#6bcb77' },
    { title: 'Active Agents', value: '12/12', change: 'Online', icon: <Security />, color: '#7b2ffc' },
    { title: 'Avg Response Time', value: '47ms', change: '-8%', icon: <Schedule />, color: '#ffd93d' },
  ];

  // ----- Loading state -----
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading dashboard...</Typography>
      </Box>
    );
  }

  // ----- Render -----
  return (
    <Box sx={{ pt: { xs: 8, md: 10 }, pb: 6, minHeight: '100vh', bgcolor: '#0a0e1a' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              <span className="gradient-text">{t('dashboard.title')}</span>
            </Typography>
            <Typography variant="body2" sx={{ color: '#8892b0' }}>
              {t('dashboard.subtitle')}
            </Typography>
            {newThreatsCount > 0 && (
              <Chip 
                label={`${newThreatsCount} new threats`} 
                size="small" 
                sx={{ mt: 1, bgcolor: 'rgba(255,107,107,0.2)', color: '#ff6b6b' }} 
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleRefresh}
              disabled={isRefreshing}
              sx={{ borderColor: 'rgba(255,255,255,0.2)' }}
            >
              {isRefreshing ? 'Refreshing...' : t('dashboard.sync')}
            </Button>
            <Button
              variant="contained"
              startIcon={<Download />}
              sx={{ background: 'linear-gradient(135deg, #00d4ff, #7b2ffc)' }}
            >
              {t('dashboard.export')}
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Voice & Chatbot */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <VoiceInput onTranscript={handleVoiceTranscript} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Chatbot />
          </Grid>
        </Grid>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((s, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#8892b0' }}>{s.title}</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>{s.value}</Typography>
                    <Chip 
                      label={s.change} 
                      size="small"
                      sx={{ mt: 1, bgcolor: s.change.includes('+') ? 'rgba(107,203,119,0.2)' : 'rgba(255,107,107,0.2)',
                        color: s.change.includes('+') ? '#6bcb77' : '#ff6b6b' }} 
                    />
                  </Box>
                  <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${s.color}20`, color: s.color }}>
                    {s.icon}
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Agent Performance */}
        <Card sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>{t('dashboard.performance')}</Typography>
          <Grid container spacing={2}>
            {agentPerformance.map((a, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{a.name}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="caption" sx={{ color: '#8892b0' }}>{t('dashboard.accuracy')}</Typography>
                    <Typography variant="caption" sx={{ color: '#00d4ff' }}>{a.accuracy}%</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={a.accuracy}
                    sx={{ height: 4, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.05)',
                      '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg, #00d4ff, #7b2ffc)' } }} 
                  />
                  <Typography variant="caption" sx={{ color: '#8892b0', display: 'block', mt: 1 }}>
                    {t('dashboard.latency')}: {a.latency}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>

        {/* Charts */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>{t('dashboard.communication')}</Typography>
              <Line 
                data={lineData} 
                options={{
                  responsive: true,
                  plugins: { legend: { labels: { color: '#8892b0' } } },
                  scales: {
                    x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8892b0' } },
                    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8892b0' }, beginAtZero: true },
                  }
                }} 
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 3 }}>{t('dashboard.workload')}</Typography>
              <Box sx={{ height: 240 }}>
                <Doughnut 
                  data={doughnutData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { color: '#8892b0' } } },
                  }} 
                />
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Map & Feed */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>{t('dashboard.mapTitle')}</Typography>
              <ThreatMap threats={threats} />
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>{t('dashboard.feedTitle')}</Typography>
              <LiveFeed threats={threats} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
