/**
 * Web Speech API helper for Malayalam (ml-IN) & English (en-IN)
 */

export const speakText = (text, lang = 'ml-IN', onEnd = () => {}) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    onEnd();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Create utterance
  const cleanText = text
    .replace(/[#*`_]/g, '')
    .replace(/₹/g, 'രൂപ ')
    .replace(/\//g, ' ');

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = lang === 'ml' || lang === 'ml-IN' ? 'ml-IN' : 'en-IN';
  utterance.rate = 0.9; // Slightly slower for elderly comprehension
  utterance.pitch = 1.0;

  // Try to find a Malayalam or Indian English voice
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => 
    v.lang.startsWith('ml') || 
    v.lang.includes('IN') || 
    v.name.toLowerCase().includes('malayalam') ||
    v.name.toLowerCase().includes('india')
  );

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onend = () => {
    onEnd();
  };

  utterance.onerror = (e) => {
    console.warn('TTS error:', e);
    onEnd();
  };

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const createSpeechRecognizer = (lang = 'ml-IN', onResult, onEnd, onError) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = lang === 'ml' || lang === 'ml-IN' ? 'ml-IN' : 'en-IN';
  recognition.interimResults = true;
  recognition.continuous = false;

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    const isFinal = event.results[event.results.length - 1].isFinal;
    onResult(transcript, isFinal);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  recognition.onerror = (event) => {
    if (onError) onError(event);
  };

  return recognition;
};
