import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, List, ListItem, Avatar, CircularProgress } from '@mui/material';
import { Send, SmartToy } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

const Chatbot = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am SURAKSHAK AI. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Call the backend /chat endpoint
  const getBotResponse = async (userMessage) => {
    try {
      const response = await api.post('/chat', { message: userMessage });
      return response.data.reply;
    } catch (error) {
      console.error('Chat error:', error);
      return 'Sorry, I am not available right now. Please try again later.';
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    // Add user message to chat
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);
    
    // Get bot reply from backend
    const botReply = await getBotResponse(userMsg);
    setLoading(false);
    setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        bgcolor: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        height: '400px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant="h6" gutterBottom>
        <SmartToy sx={{ verticalAlign: 'middle', mr: 1 }} />
        {t('chatbot.title')}
      </Typography>

      {/* Messages List */}
      <Box sx={{ flex: 1, overflowY: 'auto', mb: 2, p: 1 }}>
        <List>
          {messages.map((msg, idx) => (
            <ListItem
              key={idx}
              sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, maxWidth: '80%' }}>
                {msg.sender === 'bot' && (
                  <Avatar sx={{ bgcolor: '#7b2ffc', width: 30, height: 30 }}>
                    <SmartToy sx={{ fontSize: 18 }} />
                  </Avatar>
                )}
                <Paper
                  sx={{
                    p: 1.5,
                    bgcolor: msg.sender === 'user' ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.05)',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Paper>
              </Box>
            </ListItem>
          ))}
          {loading && (
            <ListItem sx={{ justifyContent: 'flex-start' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} />
                <Typography variant="caption" sx={{ color: '#8892b0' }}>Thinking...</Typography>
              </Box>
            </ListItem>
          )}
        </List>
      </Box>

      {/* Input Area */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={t('chatbot.placeholder')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          size="small"
          sx={{ bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }}
        />
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={loading || !input.trim()}
          startIcon={loading ? <CircularProgress size={20} /> : <Send />}
        >
          {loading ? '' : t('chatbot.send')}
        </Button>
      </Box>
    </Paper>
  );
};

export default Chatbot;