import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Volume2, VolumeX, Sparkles, RefreshCw, AlertCircle, ArrowRight } from 'lucide-react';
import { speakText, stopSpeech, createSpeechRecognizer } from '../utils/speech.js';

export default function VoiceAssistant({ language, setActiveScreen }) {
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'assistant',
      text_ml: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ അവകാശ സഹായിയാണ്. നിങ്ങൾ ടൈപ്പ് ചെയ്യേണ്ടതില്ല, മൈക്രോഫോൺ ബട്ടൺ അമർത്തി സംസാരിച്ചാൽ മതി. നിങ്ങളുടെ പ്രായം എത്രയാണെന്ന് പറയാമോ?",
      text_en: "Hello! I am your AI Rights Navigator. You do not need to type; just press the microphone button and speak. Could you tell me your age?",
      nextStep: 'ask_age',
      suggestedActions: ['എനിക്ക് 65 വയസ്സുണ്ട്', 'എനിക്ക് 45 വയസ്സുണ്ട്', 'ഭിന്നശേഷി പെൻഷൻ വിവരങ്ങൾ']
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSpeechId, setActiveSpeechId] = useState(null);
  const [currentStep, setCurrentStep] = useState('ask_age');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const recognizerRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, interimText]);

  // Handle Speech Recognition Toggle
  const toggleListening = () => {
    if (isListening) {
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    stopSpeech();
    setIsSpeaking(false);

    const langCode = language === 'ml' ? 'ml-IN' : 'en-IN';
    const recognizer = createSpeechRecognizer(
      langCode,
      (transcript, isFinal) => {
        setInterimText(transcript);
        if (isFinal && transcript.trim()) {
          handleSendMessage(transcript.trim());
          setInterimText('');
          setIsListening(false);
        }
      },
      () => {
        setIsListening(false);
      },
      (err) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
      }
    );

    if (recognizer) {
      try {
        recognizer.start();
        recognizerRef.current = recognizer;
        setIsListening(true);
      } catch (err) {
        console.error(err);
        setIsListening(false);
      }
    } else {
      alert(language === 'ml' 
        ? 'ഈ ബ്രൗസറിൽ തത്സമയ മൈക്രോഫോൺ പിന്തുണ ലഭ്യമല്ല. ദയവായി താഴെ ടൈപ്പ് ചെയ്യുക അല്ലെങ്കിൽ ഗൂഗിൾ ക്രോം ഉപയോഗിക്കുക.' 
        : 'Web Speech Recognition is not supported on this browser. Please type below or try Google Chrome.');
    }
  };

  // Play audio for a specific message
  const handlePlayAudio = (msgId, text) => {
    if (isSpeaking && activeSpeechId === msgId) {
      stopSpeech();
      setIsSpeaking(false);
      setActiveSpeechId(null);
      return;
    }

    stopSpeech();
    setIsSpeaking(true);
    setActiveSpeechId(msgId);

    speakText(text, language, () => {
      setIsSpeaking(false);
      setActiveSpeechId(null);
    });
  };

  // Send message to server/assistant
  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    setInputQuery('');
    setInterimText('');

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text_ml: query,
      text_en: query
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/voice/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          step: currentStep,
          language: language
        })
      });

      const data = await response.json();
      if (data.success) {
        const assistantMsg = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text_ml: data.response_ml,
          text_en: data.response_en,
          nextStep: data.nextStep,
          suggestedActions: data.suggestedActions || []
        };

        setMessages(prev => [...prev, assistantMsg]);
        setCurrentStep(data.nextStep);

        // Auto-play response audio if enabled
        handlePlayAudio(assistantMsg.id, language === 'ml' ? data.response_ml : data.response_en);
      }
    } catch (err) {
      console.error(err);
      // Fallback assistant response
      const fallbackMsg = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text_ml: "ക്ഷമിക്കണം, താൽക്കാലികമായി ഒരു തടസ്സം നേരിട്ടു. എന്നിരുന്നാലും വാർദ്ധക്യ പെൻഷന് 60 വയസ്സും BPL കാർഡും, ഭിന്നശേഷി പെൻഷന് 40% സർട്ടിഫിക്കറ്റുമാണ് വേണ്ടത്.",
        text_en: "Sorry, a temporary network hiccup occurred. Old Age Pension requires age 60+ and BPL card, while PwD pension requires a 40%+ medical certificate.",
        suggestedActions: ['പദ്ധതികൾ കാണുക', 'അപേക്ഷ തയ്യാറാക്കുക']
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    stopSpeech();
    setIsSpeaking(false);
    setCurrentStep('welcome');
    setMessages([
      {
        id: 'msg-1',
        sender: 'assistant',
        text_ml: "നമസ്കാരം! നിങ്ങളുടെ സംഭാഷണം പുതുക്കിയിട്ടുണ്ട്. നിങ്ങളുടെ പ്രായം എത്രയാണെന്ന് പറയാമോ?",
        text_en: "Hello! The conversation is reset. Could you tell me your age?",
        nextStep: 'ask_age',
        suggestedActions: ['എനിക്ക് 68 വയസ്സുണ്ട്', '40% ഭിന്നശേഷിയുണ്ട്', 'കിടപ്പിലായ രോഗിയെ പരിചരിക്കുന്നു']
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 flex flex-col h-[calc(100vh-8rem)]">
      
      {/* Header bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-emerald-950 flex items-center justify-center font-bold text-lg shadow">
            🎙️
          </div>
          <div>
            <h2 className="font-extrabold text-gray-900 text-base sm:text-lg flex items-center gap-2">
              <span>{language === 'ml' ? 'AI ശബ്ദ സഹായി (ഒരു ചോദ്യം വീതം)' : 'AI Voice Assistant (One Question at a Time)'}</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                {language === 'ml' ? 'മലയാളം' : 'English'}
              </span>
            </h2>
            <p className="text-xs text-gray-500">
              {language === 'ml' 
                ? 'നിങ്ങൾ സംസാരിക്കുന്നത് കേട്ട് ലളിതമായി പറഞ്ഞുതരുന്നു' 
                : 'Understands your spoken queries and provides simple, grounded answers.'}
            </p>
          </div>
        </div>

        <button
          onClick={resetChat}
          title={language === 'ml' ? 'ആദ്യത്തിൽ നിന്ന് തുടങ്ങുക' : 'Reset Conversation'}
          className="p-2 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors flex items-center gap-1 text-xs font-semibold"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">{language === 'ml' ? 'പുതുക്കുക' : 'Reset'}</span>
        </button>
      </div>

      {/* Chat Messages Scroll Container */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-slate-50 rounded-2xl border border-gray-200">
        {messages.map((msg) => {
          const isBot = msg.sender === 'assistant';
          const text = language === 'ml' ? msg.text_ml : msg.text_en;
          const isCurrentSpeaking = isSpeaking && activeSpeechId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 shadow-sm text-sm sm:text-base leading-relaxed ${
                  isBot
                    ? 'bg-white text-gray-900 border-2 border-emerald-100 rounded-tl-sm'
                    : 'bg-emerald-700 text-white font-medium rounded-tr-sm'
                }`}
              >
                <p className="whitespace-pre-line">{text}</p>

                {/* Speaker icon for assistant message */}
                {isBot && (
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => handlePlayAudio(msg.id, text)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isCurrentSpeaking
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                      }`}
                    >
                      {isCurrentSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>
                        {isCurrentSpeaking 
                          ? (language === 'ml' ? 'നിർത്തുക' : 'Stop') 
                          : (language === 'ml' ? 'ശബ്ദത്തിൽ കേൾക്കുക 🔊' : 'Listen 🔊')}
                      </span>
                    </button>

                    <span className="text-[11px] text-gray-400 font-semibold">
                      {language === 'ml' ? 'ലളിത വിശദീകരണം' : 'Verified AI'}
                    </span>
                  </div>
                )}
              </div>

              {/* Action / Suggested quick chips */}
              {isBot && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2 ml-2">
                  {msg.suggestedActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(action)}
                      className="px-3 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-bold transition-transform active:scale-95 shadow-sm"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Interim spoken transcript bubble */}
        {interimText && (
          <div className="flex flex-col items-end">
            <div className="max-w-[75%] rounded-3xl p-4 bg-emerald-600 text-white text-sm italic opacity-80 animate-pulse">
              "{interimText}..."
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-white rounded-2xl w-fit border border-gray-200 text-gray-500 text-xs">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
            <span>{language === 'ml' ? 'വിവരങ്ങൾ കണ്ടെത്തുന്നു...' : 'Fetching verified answers...'}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice and Text Input Area */}
      <div className="mt-4 bg-white rounded-2xl p-3 sm:p-4 border-2 border-emerald-200 shadow-md">
        
        {/* Pulsing Voice Listening Bar */}
        {isListening && (
          <div className="mb-3 px-4 py-2 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs text-rose-800 font-bold animate-pulse">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping"></span>
              <span>{language === 'ml' ? 'ശ്രദ്ധിക്കുന്നു... സംസാരിക്കൂ (Listening... Speak now)' : 'Listening... Speak now'}</span>
            </div>
            <button 
              onClick={toggleListening}
              className="px-2 py-1 bg-rose-600 text-white rounded-md text-[10px]"
            >
              Stop
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          
          {/* Big Microphone Button */}
          <button
            onClick={toggleListening}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all flex-shrink-0 shadow-lg ${
              isListening
                ? 'bg-rose-600 text-white animate-mic-pulse ring-4 ring-rose-300'
                : 'bg-emerald-700 hover:bg-emerald-600 text-amber-300'
            }`}
            title={language === 'ml' ? 'മൈക്രോഫോൺ ഓൺ ചെയ്യുക' : 'Toggle Microphone'}
          >
            {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </button>

          {/* Text Input with Send */}
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={
              language === 'ml'
                ? 'മൈക്കിൽ സംസാരിക്കാം അല്ലെങ്കിൽ ഇവിടെ എഴുതി ചോദിക്കാം...'
                : 'Speak with mic or type your question here...'
            }
            className="flex-1 bg-gray-50 border border-gray-300 rounded-2xl px-4 py-3.5 text-sm sm:text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputQuery.trim() || isLoading}
            className="w-12 h-12 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-emerald-950 flex items-center justify-center font-bold shadow transition-transform active:scale-95 flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Accessibility Voice Prompt Footer */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-[11px] text-gray-500 px-1">
          <span>{language === 'ml' ? '💡 നിർദ്ദേശം: പ്രായം, റേഷൻ കാർഡ് തരം, അസുഖം എന്നിവ വ്യക്തമായി പറയാം' : 'Tip: State your age, ration card type, or disability status.'}</span>
          <span className="font-semibold text-emerald-700 hidden sm:inline">Web Speech API</span>
        </div>
      </div>

    </div>
  );
}
