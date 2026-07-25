import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemText, ListItemIcon, Avatar, Chip, MenuItem, Select, FormControl } from '@mui/material';
import { Menu, Dashboard, Security, Assessment, Login, Close, Shield, Hub, Sos } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language, setLanguage, languages } = useLanguage();
  const { user, logout } = useAuth();

  const menuItems = [
    { text: t('nav.swarm'), icon: <Hub />, path: '/' },
    { text: t('nav.dashboard'), icon: <Dashboard />, path: '/dashboard' },
    { text: t('nav.agents'), icon: <Security />, path: '/agents' },
    { text: t('nav.reports'), icon: <Assessment />, path: '/reports' },
    { text: t('nav.sos'), icon: <Sos />, path: '/sos' },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ width: 280, bgcolor: '#0a0e1a', height: '100%', pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}><span className="gradient-text">SURAKSHAK</span></Typography>
        <IconButton onClick={handleDrawerToggle}><Close /></IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} component={Link} to={item.path} onClick={handleDrawerToggle}
            sx={{ borderRadius: 2, mx: 1, mb: 0.5,
              bgcolor: location.pathname === item.path ? 'rgba(0,212,255,0.1)' : 'transparent',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
            <ListItemIcon sx={{ color: location.pathname === item.path ? '#00d4ff' : '#8892b0' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ '& .MuiTypography-root': { color: location.pathname === item.path ? '#00d4ff' : '#e0e6ed', fontWeight: location.pathname === item.path ? 600 : 400 } }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: 'rgba(10,14,26,0.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.05)', boxShadow: 'none' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: 'none' } }}>
              <Menu />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Shield sx={{ color: '#00d4ff', fontSize: 30 }} />
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                <span className="gradient-text">SURAKSHAK</span>
                <Box component="span" sx={{ fontSize: '0.6rem', ml: 1, color: '#8892b0', fontWeight: 400 }}>AI</Box>
              </Typography>
              <Chip label="v2.0" size="small" sx={{ ml: 1, bgcolor: 'rgba(0,212,255,0.15)', color: '#00d4ff', fontSize: '0.6rem', height: 20 }} />
            </Box>
          </Box>

          {/* Language Switcher */}
          <FormControl sx={{ minWidth: 120, mx: 2 }} size="small">
            <Select
              value={language}
              onChange={handleLanguageChange}
              displayEmpty
              sx={{ color: '#e0e6ed', '& .MuiSelect-icon': { color: '#e0e6ed' } }}
            >
              {languages.map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>{lang.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {menuItems.map((item) => (
              <Button key={item.text} component={Link} to={item.path} color="inherit" startIcon={item.icon}
                sx={{ color: location.pathname === item.path ? '#00d4ff' : '#8892b0',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                  '&:hover': { color: '#e0e6ed', bgcolor: 'rgba(255,255,255,0.05)' } }}>
                {item.text}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user ? (
              <>
                <Avatar sx={{ bgcolor: '#00d4ff', width: 32, height: 32, cursor: 'pointer' }}>
                  <Security sx={{ fontSize: 18 }} />
                </Avatar>
                <Button variant="outlined" size="small" onClick={handleLogout}
                  sx={{ borderColor: 'rgba(255,255,255,0.2)', '&:hover': { borderColor: '#ff6b6b', color: '#ff6b6b' } }}>
                  Logout
                </Button>
              </>
            ) : (
              <Button component={Link} to="/login" variant="outlined" size="small"
                sx={{ borderColor: 'rgba(255,255,255,0.2)', '&:hover': { borderColor: '#00d4ff' } }}>
                <Login sx={{ fontSize: 18, mr: 1 }} />{t('nav.login')}
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280, bgcolor: '#0a0e1a', borderRight: '1px solid rgba(255,255,255,0.05)' } }}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;