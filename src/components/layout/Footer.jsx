import React from 'react';
import { Box, Container, Typography, Link, Grid, IconButton } from '@mui/material';
import { GitHub, Twitter, LinkedIn, YouTube, Security } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 4, mt: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', bgcolor: 'rgba(10,14,26,0.8)' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Security sx={{ color: '#00d4ff' }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}><span className="gradient-text">SURAKSHAK AI</span></Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#8892b0' }}>Protecting millions from cyber threats with Agentic AI. Built with ❤️ for a safer digital world.</Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Product</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="#8892b0" underline="hover" sx={{ fontSize: '0.9rem' }}>Features</Link>
              <Link href="#" color="#8892b0" underline="hover" sx={{ fontSize: '0.9rem' }}>Pricing</Link>
              <Link href="#" color="#8892b0" underline="hover" sx={{ fontSize: '0.9rem' }}>Documentation</Link>
            </Box>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Company</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="#8892b0" underline="hover" sx={{ fontSize: '0.9rem' }}>About</Link>
              <Link href="#" color="#8892b0" underline="hover" sx={{ fontSize: '0.9rem' }}>Blog</Link>
              <Link href="#" color="#8892b0" underline="hover" sx={{ fontSize: '0.9rem' }}>Careers</Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Connect</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: '#8892b0', '&:hover': { color: '#00d4ff' } }}><GitHub /></IconButton>
              <IconButton sx={{ color: '#8892b0', '&:hover': { color: '#00d4ff' } }}><Twitter /></IconButton>
              <IconButton sx={{ color: '#8892b0', '&:hover': { color: '#00d4ff' } }}><LinkedIn /></IconButton>
              <IconButton sx={{ color: '#8892b0', '&:hover': { color: '#00d4ff' } }}><YouTube /></IconButton>
            </Box>
            <Typography variant="body2" sx={{ color: '#8892b0', mt: 2 }}>© 2026 SURAKSHAK AI. All rights reserved.</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
