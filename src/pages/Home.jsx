import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Button, Container, Grid, Typography, Box, Card, CardContent, Chip, Divider
} from '@mui/material';
import {
  Security, Speed, Language, SmartToy, Warning, Shield,
  Analytics, VoiceChat, LocationOn, QrCodeScanner, Face, Payment,
  Hub, AutoAwesome, Bolt, Psychology
} from '@mui/icons-material';
import StatsCards from '../components/dashboard/StatsCards';
import AgentSwarmVisualization from '../components/AgentSwarmVisualization';

const Home = () => {
  const agentCapabilities = [
    { icon: <SmartToy />, title: '12 Specialized Agents', desc: 'Each agent masters one domain – from NLP to deepfake detection.' },
    { icon: <Hub />, title: 'Swarm Intelligence', desc: 'Agents share insights and make collective decisions in real time.' },
    { icon: <Bolt />, title: 'Autonomous Response', desc: 'Agents trigger countermeasures without human delay.' },
    { icon: <Psychology />, title: 'Self‑Improving', desc: 'Reinforcement learning makes agents smarter after every threat.' },
  ];

  const agentHighlights = [
    { name: 'NLP Intelligence', model: 'BERT‑multilingual', task: 'Phishing & harassment detection' },
    { name: 'Deepfake Detection', model: 'XceptionNet + LSTM', task: 'Fake face & video spotting' },
    { name: 'Financial Fraud', model: 'Graph Neural Network', task: 'Fraud ring & transaction anomaly' },
    { name: 'Voice Assistant', model: 'Whisper + LLaMA‑3', task: 'Multilingual voice guidance' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 8, md: 10 } }}>
      {/* Hero */}
      <Box sx={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f3a 50%, #0d1b2a 100%)',
        py: { xs: 6, md: 12 },
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <Chip label="🧠 Agentic AI Swarm" sx={{ mb: 2, bgcolor: 'rgba(0,212,255,0.15)', color: '#00d4ff', fontWeight: 600 }} />
                <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4.5rem' }, mb: 2 }}>
                  <span className="gradient-text">SURAKSHAK AI</span>
                </Typography>
                <Typography variant="h4" sx={{ mb: 3, color: '#8892b0', fontWeight: 400 }}>
                  Agentic AI-Powered Cyber Safety
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', color: '#a8b2d1' }}>
                  A swarm of 12 autonomous AI agents collaborates to detect, predict, and respond to cyber threats in real time – <strong>no human intervention required</strong>.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button component={Link} to="/dashboard" variant="contained" size="large"
                    sx={{ background: 'linear-gradient(135deg, #00d4ff, #7b2ffc)', px: 4, py: 1.5,
                      '&:hover': { transform: 'scale(1.05)', boxShadow: '0 0 30px rgba(0,212,255,0.3)' } }}>
                    Explore Agent Swarm
                  </Button>
                  <Button component={Link} to="/agents" variant="outlined" size="large"
                    sx={{ borderColor: '#7b2ffc', color: '#7b2ffc', px: 4, py: 1.5,
                      '&:hover': { borderColor: '#7b2ffc', background: 'rgba(123,47,252,0.1)' } }}>
                    Meet the Agents
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box sx={{
                    width: '100%', height: '400px',
                    background: 'radial-gradient(circle at center, rgba(0,212,255,0.1) 0%, transparent 70%)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                  }}>
                    <Box sx={{ position: 'relative', textAlign: 'center' }}>
                      <Hub sx={{ fontSize: 150, color: '#00d4ff', opacity: 0.3, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                      <AutoAwesome sx={{ fontSize: 100, color: '#7b2ffc', filter: 'drop-shadow(0 0 60px rgba(123,47,252,0.4))', position: 'relative', zIndex: 1 }} />
                      <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#8892b0' }}>
                        12 agents · 1 mission
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats */}
      <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 2 }}>
        <StatsCards />
      </Container>

      {/* Agentic AI Core Concepts */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}>
            Agentic AI <span className="gradient-text">Swarm Intelligence</span>
          </Typography>
          <Typography variant="body1" sx={{ color: '#8892b0', maxWidth: 700, mx: 'auto' }}>
            Each agent is a specialized AI model. Together, they form a self‑organizing swarm that shares context, negotiates responses, and learns from every interaction.
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {agentCapabilities.map((item, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i*0.1 }}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 3, transition: 'transform 0.3s',
                  '&:hover': { transform: 'translateY(-8px)', borderColor: 'rgba(0,212,255,0.3)' } }}>
                  <Box sx={{ fontSize: 48, color: '#7b2ffc', mb: 2, display: 'flex', justifyContent: 'center' }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#8892b0' }}>{item.desc}</Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Agent Models */}
      <Box sx={{ bgcolor: 'rgba(255,255,255,0.02)', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 2, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
            🤖 AI Models Powering the Agents
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: '#8892b0', mb: 4 }}>
            Transformer‑based NLP · CNNs for vision · Graph Neural Networks · Reinforcement Learning
          </Typography>
          <Grid container spacing={3}>
            {agentHighlights.map((a, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ color: '#00d4ff' }}>{a.name}</Typography>
                  <Chip label={a.model} size="small" sx={{ my: 1, bgcolor: 'rgba(0,212,255,0.1)', color: '#00d4ff' }} />
                  <Typography variant="body2" sx={{ color: '#8892b0' }}>{a.task}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Agent Swarm Visualization */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 4, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
          🔄 Agent Communication Flow
        </Typography>
        <AgentSwarmVisualization />
      </Container>
    </Box>
  );
};

export default Home;