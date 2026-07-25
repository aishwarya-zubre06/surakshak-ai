import React from 'react';
import { Container, Grid, Box, Typography, Card, Chip, LinearProgress, Divider } from '@mui/material';
import {
  Security, Psychology, QrCodeScanner, AccountBalance, ContentPaste,
  Face, VoiceChat, LocationOn, Timeline, Report, Analytics,
  ModelTraining, DataUsage, Sos
} from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';

const Agents = () => {
  const { t } = useLanguage();

  const agents = [
    { id: 1, name: 'Threat Detection', icon: <Security />, status: 'Active', confidence: 94,
      desc: 'Orchestrates all agents, correlates signals.', model: 'Ensemble (XGBoost + Isolation Forest)', task: 'Anomaly & attack correlation' },
    { id: 2, name: 'NLP Intelligence', icon: <Psychology />, status: 'Active', confidence: 89,
      desc: 'Multilingual text analysis for scams & harassment.', model: 'BERT‑multilingual‑cased', task: 'Phishing, cyberbullying, NER' },
    { id: 3, name: 'QR Scam Detection', icon: <QrCodeScanner />, status: 'Active', confidence: 92,
      desc: 'Decodes QR and checks URL & UPI against threat DB.', model: 'ResNet‑50 + URL parser', task: 'Malicious QR identification' },
    { id: 4, name: 'Financial Fraud', icon: <AccountBalance />, status: 'Monitoring', confidence: 87,
      desc: 'Transaction graph analysis to find fraud rings.', model: 'Graph Neural Network (GNN)', task: 'Anomaly detection & fraud scoring' },
    { id: 5, name: 'Content Safety', icon: <ContentPaste />, status: 'Active', confidence: 91,
      desc: 'Scans text for PII and toxicity.', model: 'Perspective API + NER', task: 'PII redaction & content moderation' },
    { id: 6, name: 'Deepfake Detection', icon: <Face />, status: 'Active', confidence: 95,
      desc: 'Spot AI‑generated faces in images/videos.', model: 'XceptionNet + LSTM', task: 'Temporal & spatial deepfake detection' },
    { id: 7, name: 'Voice Assistant', icon: <VoiceChat />, status: 'Active', confidence: 88,
      desc: 'Multilingual voice interface for user guidance.', model: 'Whisper + LLaMA‑3 + Tortoise‑TTS', task: 'STT, LLM reasoning, TTS' },
    { id: 8, name: 'Location Intelligence', icon: <LocationOn />, status: 'Active', confidence: 93,
      desc: 'Geospatial threat analysis and hotspot mapping.', model: 'DBSCAN + reverse geocoding', task: 'Crime hotspot detection' },
    { id: 9, name: 'Predictive Intelligence', icon: <Timeline />, status: 'Active', confidence: 86,
      desc: 'Forecasts attacks using historical trends.', model: 'Prophet + LSTM', task: 'Time‑series threat prediction' },
    { id: 10, name: 'Emergency Response', icon: <Sos />, status: 'Standby', confidence: 96,
      desc: 'Orchestrates incident response actions.', model: 'Rule‑based + RL', task: 'SOS triggering & escalation' },
    { id: 11, name: 'Cybercrime Reporting', icon: <Report />, status: 'Active', confidence: 90,
      desc: 'Auto‑generates legal reports for authorities.', model: 'Template generation + OCR', task: 'Evidence packaging & submission' },
    { id: 12, name: 'Face Authentication', icon: <Analytics />, status: 'Active', confidence: 97,
      desc: 'Biometric verification with liveness detection.', model: 'ArcFace + MediaPipe', task: 'Face matching & anti‑spoofing' },
  ];

  return (
    <Box sx={{ pt: { xs: 8, md: 10 }, pb: 6, minHeight: '100vh' }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}><span className="gradient-text">{t('agents.title')}</span></Typography>
          <Typography variant="body2" sx={{ color: '#8892b0' }}>{t('agents.subtitle')}</Typography>
        </Box>

        <Grid container spacing={3}>
          {agents.map((a) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={a.id}>
              <Card sx={{ p: 3, height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)', borderColor: '#00d4ff' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(0,212,255,0.1)', color: '#00d4ff', fontSize: 28 }}>
                    {a.icon}
                  </Box>
                  <Chip label={a.status} size="small"
                    sx={{ bgcolor: a.status === 'Active' ? 'rgba(107,203,119,0.2)' : a.status === 'Monitoring' ? 'rgba(255,217,61,0.2)' : 'rgba(255,107,107,0.2)',
                      color: a.status === 'Active' ? '#6bcb77' : a.status === 'Monitoring' ? '#ffd93d' : '#ff6b6b' }} />
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>{a.name}</Typography>
                <Typography variant="body2" sx={{ color: '#8892b0', mb: 1, fontSize: '0.85rem' }}>{a.desc}</Typography>

                <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.05)' }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <ModelTraining sx={{ fontSize: 16, color: '#7b2ffc' }} />
                  <Typography variant="caption" sx={{ color: '#7b2ffc', fontWeight: 500 }}>{a.model}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <DataUsage sx={{ fontSize: 16, color: '#00d4ff' }} />
                  <Typography variant="caption" sx={{ color: '#00d4ff' }}>{a.task}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" sx={{ color: '#8892b0' }}>{t('agents.confidence')}</Typography>
                  <Typography variant="caption" sx={{ color: '#00d4ff', fontWeight: 600 }}>{a.confidence}%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={a.confidence}
                  sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.05)',
                    '& .MuiLinearProgress-bar': { background: `linear-gradient(90deg, #00d4ff, #7b2ffc)`, borderRadius: 3 } }} />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Agents;