import React, { useState, useEffect } from 'react';
import { Box, Button, Select, MenuItem, FormControl, InputLabel, Typography, Paper } from '@mui/material';
import { Mic, MicOff } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const VoiceInput = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [language, setLanguage] = useState('en-US');
  const { t } = useLanguage();

  const languages = [
    { code: 'en-US', label: 'English' },
    { code: 'hi-IN', label: 'हिन्दी' },
    { code: 'ta-IN', label: 'தமிழ்' },
    { code: 'te-IN', label: 'తెలుగు' },
    { code: 'kn-IN', label: 'ಕನ್ನಡ' },
    { code: 'ml-IN', label: 'മലയാളം' },
    { code: 'bn-IN', label: 'বাংলা' },
    { code: 'mr-IN', label: 'मराठी' },
    { code: 'gu-IN', label: 'ગુજરાતી' },
  ];

  let recognition = null;

  useEffect(() => {
    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition. Please use Chrome.');
      return;
    }
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPart;
        }
      }
      if (finalTranscript) {
        setTranscript(finalTranscript);
        if (onTranscript) onTranscript(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [language, onTranscript]);

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition not supported.');
      return;
    }
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      setTranscript('');
    }
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    if (isListening && recognition) {
      recognition.stop();
      setIsListening(false);
      setTimeout(() => {
        recognition.lang = newLang;
        recognition.start();
        setIsListening(true);
      }, 300);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
      <Typography variant="h6" gutterBottom>{t('voice.title')}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>{t('voice.language')}</InputLabel>
          <Select
            value={language}
            onChange={handleLanguageChange}
            label={t('voice.language')}
            sx={{ color: '#e0e6ed' }}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>{lang.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color={isListening ? 'error' : 'primary'}
          startIcon={isListening ? <MicOff /> : <Mic />}
          onClick={toggleListening}
          sx={{ px: 3, py: 1.5 }}
        >
          {isListening ? t('voice.stop') : t('voice.start')}
        </Button>
      </Box>
      {transcript && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(0,212,255,0.05)', borderRadius: 2 }}>
          <Typography variant="body1" sx={{ color: '#e0e6ed' }}>
            <strong>{t('voice.youSaid')}</strong> {transcript}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default VoiceInput;