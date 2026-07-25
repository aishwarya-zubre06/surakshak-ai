import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Card, Grid, Button, Chip, CircularProgress, Alert } from '@mui/material';
import { Download, PictureAsPdf, TrendingUp, Assessment, Add } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

const Reports = () => {
  const { t } = useLanguage();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch reports from backend
  const fetchReports = async () => {
    try {
      setError(null);
      const res = await api.get('/reports');
      setReports(res.data);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError('Failed to load reports. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Generate a new report
  const handleGenerateReport = async () => {
    setGenerating(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await api.post('/reports/generate');
      setSuccess('Report generated successfully!');
      // Add the new report to the list
      setReports(prev => [res.data, ...prev]);
    } catch (err) {
      console.error('Error generating report:', err);
      setError('Failed to generate report. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading reports...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ pt: { xs: 8, md: 10 }, pb: 6, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          <span className="gradient-text">{t('reports.title')}</span>
          <Typography variant="caption" sx={{ display: 'block', color: '#8892b0', mt: 1 }}>
            {t('reports.subtitle')}
          </Typography>
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(null)}>
            {success}
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Reports List */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">{t('reports.generated')}</Typography>
                <Chip 
                  label={`${reports.length} reports`} 
                  size="small" 
                  sx={{ bgcolor: 'rgba(0,212,255,0.1)', color: '#00d4ff' }} 
                />
              </Box>
              
              {reports.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color="textSecondary">No reports yet. Generate your first report!</Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {reports.map((r) => (
                    <Box 
                      key={r._id || r.id} 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        p: 2, 
                        borderRadius: 2, 
                        bgcolor: 'rgba(255,255,255,0.02)', 
                        border: '1px solid rgba(255,255,255,0.05)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                      }}
                    >
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{r.title}</Typography>
                        <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                          <Typography variant="caption" sx={{ color: '#8892b0' }}>
                            {formatDate(r.generatedAt || r.createdAt)}
                          </Typography>
                          <Chip label="PDF" size="small" sx={{ height: 20, fontSize: '0.6rem' }} />
                          <Typography variant="caption" sx={{ color: '#8892b0' }}>
                            ~2.4 MB
                          </Typography>
                        </Box>
                      </Box>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        startIcon={<Download />}
                        sx={{ borderColor: 'rgba(255,255,255,0.2)' }}
                        onClick={() => {
                          // Simulate download – in production, you would fetch the actual file
                          alert(`Downloading: ${r.title}`);
                        }}
                      >
                        Download
                      </Button>
                    </Box>
                  ))}
                </Box>
              )}
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>{t('reports.actions')}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  startIcon={generating ? <CircularProgress size={20} /> : <PictureAsPdf />}
                  onClick={handleGenerateReport}
                  disabled={generating}
                  sx={{ 
                    background: 'linear-gradient(135deg, #00d4ff, #7b2ffc)',
                    '&:hover': { transform: 'scale(1.02)' }
                  }}
                >
                  {generating ? 'Generating...' : t('reports.generate')}
                </Button>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  startIcon={<TrendingUp />}
                  sx={{ borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  {t('reports.analytics')}
                </Button>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  startIcon={<Assessment />}
                  sx={{ borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  {t('reports.exportData')}
                </Button>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  startIcon={<Add />}
                  sx={{ borderColor: 'rgba(255,255,255,0.2)' }}
                  onClick={() => alert('Custom report builder coming soon!')}
                >
                  Create Custom Report
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Reports;