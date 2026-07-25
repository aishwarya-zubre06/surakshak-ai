import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ pt: 10, minHeight: '100vh' }}>
      <Container>
        <Typography variant="h2" className="gradient-text">
          SURAKSHAK AI is running!
        </Typography>
        <Typography variant="body1" sx={{ color: '#8892b0', mt: 2 }}>
          If you see this, the app works. Now add back the real Home component.
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;