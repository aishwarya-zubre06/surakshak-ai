import React from 'react';
import { Box, Typography, Chip, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Warning, CheckCircle, Schedule, Report } from '@mui/icons-material';

const LiveFeed = ({ threats }) => {
  const getStatusIcon = (status) => {
    if (status === 'Blocked') return <CheckCircle sx={{ color: '#6bcb77' }} />;
    if (status === 'Analyzing') return <Schedule sx={{ color: '#ffd93d' }} />;
    if (status === 'Escalated') return <Warning sx={{ color: '#ff6b6b' }} />;
    if (status === 'Reported') return <Report sx={{ color: '#7b2ffc' }} />;
    return <Schedule sx={{ color: '#8892b0' }} />;
  };
  const getStatusColor = (status) => {
    if (status === 'Blocked') return '#6bcb77';
    if (status === 'Analyzing') return '#ffd93d';
    if (status === 'Escalated') return '#ff6b6b';
    if (status === 'Reported') return '#7b2ffc';
    return '#8892b0';
  };

  return (
    <List sx={{ maxHeight: 300, overflow: 'auto' }}>
      {threats.map((t) => (
        <ListItem key={t.id} sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
          <ListItemIcon>{getStatusIcon(t.status)}</ListItemIcon>
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{t.type}</Typography>
                <Chip
                  label={t.status}
                  size="small"
                  sx={{
                    bgcolor: `${getStatusColor(t.status)}20`,
                    color: getStatusColor(t.status),
                    height: 20,
                    fontSize: '0.65rem'
                  }}
                />
              </Box>
            }
            secondary={
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                <Typography variant="caption" sx={{ color: '#8892b0' }}>{t.source}</Typography>
                <Typography variant="caption" sx={{ color: '#8892b0' }}>{t.time}</Typography>
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default LiveFeed;