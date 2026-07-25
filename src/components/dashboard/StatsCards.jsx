import React from 'react';
import { Grid, Card, Box, Typography, Chip } from '@mui/material';
import { Security, Warning, CheckCircle, Speed } from '@mui/icons-material';

const StatsCards = () => {
  const stats = [
    { icon: <Security sx={{ fontSize: 40, color: '#00d4ff' }} />, value: '1.2M+', label: 'Threats Detected', change: '+15%' },
    { icon: <CheckCircle sx={{ fontSize: 40, color: '#6bcb77' }} />, value: '98.7%', label: 'Block Rate', change: '+2.3%' },
    { icon: <Warning sx={{ fontSize: 40, color: '#ff6b6b' }} />, value: '12', label: 'Active Threats', change: '-8%' },
    { icon: <Speed sx={{ fontSize: 40, color: '#ffd93d' }} />, value: '47ms', label: 'Avg Response', change: '-12%' },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((s, i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <Card sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {s.icon}
              <Chip label={s.change} size="small" sx={{ bgcolor: s.change.includes('+') ? 'rgba(107,203,119,0.2)' : 'rgba(255,107,107,0.2)',
                color: s.change.includes('+') ? '#6bcb77' : '#ff6b6b' }} />
            </Box>
            <Typography variant="h3" sx={{ my: 2, fontWeight: 700 }}>{s.value}</Typography>
            <Typography variant="body2" sx={{ color: '#8892b0' }}>{s.label}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;
