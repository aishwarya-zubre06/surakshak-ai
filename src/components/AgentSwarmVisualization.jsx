import React from 'react';
import { Box, Card, Typography, Chip, Grid } from '@mui/material';
import { ArrowForward, Hub } from '@mui/icons-material';

const AgentSwarmVisualization = () => {
  const agents = [
    { id: 1, name: 'Threat Detection', color: '#00d4ff' },
    { id: 2, name: 'NLP Intelligence', color: '#7b2ffc' },
    { id: 3, name: 'QR Scam Detection', color: '#ffd93d' },
    { id: 4, name: 'Financial Fraud', color: '#ff6b6b' },
    { id: 5, name: 'Content Safety', color: '#6bcb77' },
    { id: 6, name: 'Deepfake Detection', color: '#00d4ff' },
    { id: 7, name: 'Voice Assistant', color: '#7b2ffc' },
    { id: 8, name: 'Location Intelligence', color: '#ffd93d' },
    { id: 9, name: 'Predictive Intelligence', color: '#ff6b6b' },
    { id: 10, name: 'Emergency Response', color: '#ff6b6b' },
    { id: 11, name: 'Reporting Agent', color: '#6bcb77' },
    { id: 12, name: 'Face Authentication', color: '#00d4ff' },
  ];

  const getColorWithOpacity = (color, opacity) => {
    // Convert hex to rgba
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mb: 4 }}>
        {agents.map((a) => (
          <Chip
            key={a.id}
            label={a.name}
            sx={{
              bgcolor: getColorWithOpacity(a.color, 0.2),
              color: a.color,
              border: '1px solid ' + getColorWithOpacity(a.color, 0.4),
              fontWeight: 600
            }}
          />
        ))}
      </Box>
      <Grid container spacing={2}>
        {agents.map((a) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={a.id}>
            <Card sx={{ 
              p: 1.5, 
              textAlign: 'center', 
              bgcolor: getColorWithOpacity(a.color, 0.1), 
              borderColor: getColorWithOpacity(a.color, 0.3) 
            }}>
              <Typography variant="caption" sx={{ fontWeight: 600, color: a.color }}>
                {a.name}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 2 }}>
        <Typography variant="body2" sx={{ color: '#8892b0', textAlign: 'center' }}>
          <Hub sx={{ verticalAlign: 'middle', mr: 1, fontSize: 18 }} />
          Agents exchange context via a message bus – <strong>parallel processing</strong> and <strong>collective reasoning</strong>.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mt: 2 }}>
          {[[1,2],[1,3],[1,4],[2,5],[2,6],[3,7],[4,8],[5,9],[6,10],[7,11],[8,12],[9,1],[10,2]].slice(0,6).map(([from,to], i) => (
            <Chip
              key={i}
              label={`Agent ${from} → Agent ${to}`}
              size="small"
              icon={<ArrowForward sx={{ fontSize: 14 }} />}
              sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: '#8892b0' }}
            />
          ))}
          <Chip 
            label="+ more real‑time connections" 
            size="small" 
            sx={{ bgcolor: 'rgba(0,212,255,0.1)', color: '#00d4ff' }} 
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AgentSwarmVisualization;
