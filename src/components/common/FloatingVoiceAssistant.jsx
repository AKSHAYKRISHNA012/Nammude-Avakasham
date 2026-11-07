import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, X, Sparkles, Send, Bot, Compass, HeartPulse, Scale, Shield } from 'lucide-react';
import { speakText, stopSpeech, createSpeechRecognizer } from '../../utils/speech.js';
import AudioWaveVisualizer from './AudioWaveVisualizer.jsx';

export default function FloatingVoiceAssistant({ 
  language = 'ml', 
  onNavigate, 
  currentMode, 
  setCurrentMode 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responseMessage, setResponseMessage] = useState(
    language === 'ml' 
      ? 'നമസ്കാരം! മൈക്രോഫോൺ ബട്ടൺ അമർത്തി സംസാരിക്കൂ. പദ്ധതികൾ, പെൻഷൻ, അല്ലെങ്കിൽ മരുന്നുകൾ എന്നിവ ചോദിക്കാം.' 
      : 'Hello! Press the mic and speak. You can ask about pensions, schemes, or your medicines.'
  );

  const recognizerRef = useRef(null);

  useEffect(() => {
    return () => {
      stopSpeech();
      if (recognizerRef.current) {
        try {
          recognizerRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  const handleStartListening = () => {
    if (isListening) {
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    stopSpeech();
    setIsSpeaking(false);
    setTranscript('');

    const langCode = language === 'ml' ? 'ml-IN' : 'en-IN';
    const recognizer = createSpeechRecognizer(
      langCode,
      (text, isFinal) => {
        setTranscript(text);
        if (isFinal && text.trim()) {
          setIsListening(false);
          processVoiceQuery(text.trim());
        }
      },
      () => setIsListening(false),
      (err) => {
        console.warn('Speech error:', err);
        setIsListening(false);
      }
    );

    if (recognizer) {
      recognizerRef.current = recognizer;
      try {
        recognizer.start();
        setIsListening(true);
      } catch (err) {
        console.error('Recognizer start failed', err);
      }
    } else {
      alert(language === 'ml' ? 'നിങ്ങളുടെ ബ്രൗസറിൽ മൈക്രോഫോൺ സേവനം ലഭ്യമല്ല.' : 'Speech recognition not supported in this browser.');
    }
  };

  const processVoiceQuery = (query) => {
    const q = query.toLowerCase();
    let reply = '';
    let targetMode = null;
    let targetScreen = null;

    if (q.includes('മരുന്') || q.includes('medicine') || q.includes('tablets') || q.includes('ഗുളിക')) {
      reply = language === 'ml' 
        ? 'മരുന്നുകളുടെ സമയപ്പട്ടികയിലേക്ക് പോകുന്നു. ഇന്നത്തെ മരുന്നുകൾ കൃത്യമായി കഴിക്കുക.' 
        : 'Opening your medication schedule. Remember to take medicines on time.';
      targetMode = 'vaidya';
      targetScreen = 'vaidya_meds';
    } else if (q.includes('പെൻഷ') || q.includes('pension') || q.includes('യോജ്യത') || q.includes('eligibility')) {
      reply = language === 'ml' 
        ? 'പെൻഷൻ യോജ്യത പരിശോധനാ വിഭാഗത്തിലേക്ക് മാറ്റുന്നു. നിങ്ങളുടെ വയസ്സും വിവരങ്ങളും നൽകുക.' 
        : 'Opening eligibility assessment. Check your pension rights here.';
      targetMode = 'rights';
      targetScreen = 'eligibility';
    } else if (q.includes('പദ്ധത') || q.includes('scheme') || q.includes('list')) {
      reply = language === 'ml' 
        ? 'കേരള സർക്കാർ ക്ഷേമ പദ്ധതികളുടെ പട്ടിക തുറക്കുന്നു.' 
        : 'Opening the directory of all Kerala welfare schemes.';
      targetMode = 'rights';
      targetScreen = 'schemes';
    } else if (q.includes('ഡോക്ട') || q.includes('doctor') || q.includes('ലക്ഷ') || q.includes('symptom')) {
      reply = language === 'ml' 
        ? 'ഡോക്ടർ സന്ദർശന സഹായി തുറക്കുന്നു. ലക്ഷണങ്ങൾ രേഖപ്പെടുത്താം.' 
        : 'Opening Doctor Visit Assistant to record symptoms.';
      targetMode = 'vaidya';
      targetScreen = 'vaidya_doctor';
    } else if (q.includes('ഹെൽപ്പ്') || q.includes('helpline') || q.includes('സഹായ') || q.includes('14567')) {
      reply = language === 'ml' 
        ? 'മുതിർന്ന പൗരന്മാരുടെ ഹെൽപ്പ് ലൈൻ നമ്പർ 14567 ആണ്. ആരോഗ്യ സംശയങ്ങൾക്ക് ദിശ 1056 വിളിക്കാം.' 
        : 'Elderline toll-free is 14567, DISHA health advice is 1056, and emergency ambulance is 108.';
      targetMode = 'rights';
      targetScreen = 'assistance';
    } else if (q.includes('പരാതി') || q.includes('grievance')) {
      reply = language === 'ml' 
        ? 'പരാതി പരിഹാര സഹായി തുറക്കുന്നു.' 
        : 'Opening Citizen Grievance Assistant.';
      targetMode = 'rights';
      targetScreen = 'grievance';
    } else {
      reply = language === 'ml' 
        ? `നിങ്ങൾ പറഞ്ഞത്: "${query}". നിങ്ങൾക്ക് പെൻഷൻ, മരുന്നുകൾ, അല്ലെങ്കിൽ ഹെൽപ്പ്‌ലൈൻ സഹായം എന്നിവ ചോദിക്കാം.` 
        : `You said: "${query}". You can ask about pensions, medicines, or helpline assistance.`;
    }

    setResponseMessage(reply);
    setIsSpeaking(true);
    speakText(reply, language, () => {
      setIsSpeaking(false);
      if (targetMode && setCurrentMode) {
        setCurrentMode(targetMode);
      }
      if (targetScreen && onNavigate) {
        onNavigate(targetScreen);
        setIsOpen(false);
      }
    });
  };

  const handleQuickAction = (text) => {
    setTranscript(text);
    processVoiceQuery(text);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right above bottom dock) */}
      <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 flex flex-col items-end gap-1.5 pointer-events-auto">
        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(true);
              handleStartListening();
            }}
            className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-emerald-950 via-teal-900 to-emerald-900 text-amber-300 flex items-center justify-center shadow-2xl border-2 border-amber-400 hover:scale-110 active:scale-95 transition-all animate-mic-pulse"
            aria-label="Speak with AI Assistant"
            title={language === 'ml' ? 'വോയ്‌സ് സഹായി (സംസാരിക്കൂ 🔊)' : 'Voice Assistant (Tap to Speak)'}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-emerald-950 flex items-center justify-center font-bold shadow-md">
              <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-950 stroke-[2.8]" />
            </div>
            {/* Pulsing indicator ring */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border border-emerald-950 text-[9px] font-black text-emerald-950 items-center justify-center">AI</span>
            </span>
          </button>
        )}
      </div>

      {/* Floating Voice Assistant Modal Window */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg border-2 border-amber-400 shadow-2xl overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white p-5 flex items-center justify-between border-b border-amber-400/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black shadow-md">
                  <Bot className="w-6 h-6 text-emerald-950" />
                </div>
                <div>
                  <h3 className="font-black text-base text-amber-300">
                    {language === 'ml' ? 'തത്സമയ ശബ്ദ സഹായി' : 'Live Voice Navigator'}
                  </h3>
                  <p className="text-[11px] text-emerald-200">
                    {language === 'ml' ? 'മലയാളത്തിലും ഇംഗ്ലീഷിലും സംസാരിക്കാം' : 'Speaks Malayalam and English'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  stopSpeech();
                  setIsSpeaking(false);
                  setIsListening(false);
                  setIsOpen(false);
                }}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6 bg-stone-50">
              
              {/* Audio Wave Visualizer when Active */}
              {(isListening || isSpeaking) && (
                <div className="flex flex-col items-center justify-center py-2 bg-emerald-50 rounded-2xl border border-emerald-200 p-4">
                  <AudioWaveVisualizer 
                    isPlaying={true} 
                    color={isListening ? "bg-rose-600" : "bg-emerald-700"}
                    label={isListening 
                      ? (language === 'ml' ? 'കേൾക്കുന്നു... സംസാരിക്കൂ' : 'Listening... please speak') 
                      : (language === 'ml' ? 'മറുപടി പറയുന്നു...' : 'Responding...')}
                  />
                  {transcript && (
                    <p className="mt-3 text-sm font-bold text-stone-800 text-center italic bg-white px-4 py-2 rounded-xl border border-emerald-300 shadow-sm max-w-sm">
                      "{transcript}"
                    </p>
                  )}
                </div>
              )}

              {/* Bot Response Box */}
              <div className="p-4 rounded-2xl bg-white border-2 border-emerald-100 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{language === 'ml' ? 'സഹായിയുടെ മറുപടി:' : 'Navigator Response:'}</span>
                  </span>
                  {isSpeaking && (
                    <button 
                      onClick={() => {
                        stopSpeech();
                        setIsSpeaking(false);
                      }}
                      className="text-rose-600 hover:underline flex items-center gap-1 font-bold text-[11px]"
                    >
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>{language === 'ml' ? 'ശബ്ദം നിർത്തുക' : 'Stop Audio'}</span>
                    </button>
                  )}
                </div>
                <p className="text-stone-900 text-sm sm:text-base font-bold leading-relaxed">
                  {responseMessage}
                </p>
              </div>

              {/* Quick Spoken Shortcuts */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  {language === 'ml' ? 'പെട്ടെന്നുള്ള നിർദ്ദേശങ്ങൾ (Quick Prompts):' : 'Suggested Questions:'}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { text_ml: 'പെൻഷൻ യോജ്യത', text_en: 'Pension Eligibility', icon: Shield },
                    { text_ml: 'ഇന്നത്തെ മരുന്നുകൾ', text_en: 'Daily Medicines', icon: HeartPulse },
                    { text_ml: 'എല്ലാ പദ്ധതികളും', text_en: 'All Schemes', icon: Compass },
                    { text_ml: 'ഹെൽപ്പ്‌ലൈൻ നമ്പറുകൾ', text_en: 'Helpline Numbers', icon: Scale },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuickAction(language === 'ml' ? item.text_ml : item.text_en)}
                        className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-400 text-stone-800 font-bold transition-all text-left flex items-center gap-2 shadow-xs"
                      >
                        <Icon className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                        <span className="truncate">{language === 'ml' ? item.text_ml : item.text_en}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Big Mic Push-to-Talk Button */}
              <div className="flex flex-col items-center justify-center pt-2">
                <button
                  onClick={handleStartListening}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-95 border-4 ${
                    isListening
                      ? 'bg-rose-600 border-rose-200 text-white animate-mic-pulse scale-110'
                      : 'bg-emerald-800 border-amber-400 text-amber-300 hover:bg-emerald-700'
                  }`}
                  aria-label="Toggle Microphone"
                >
                  {isListening ? (
                    <MicOff className="w-9 h-9 stroke-[2.5]" />
                  ) : (
                    <Mic className="w-9 h-9 stroke-[2.5]" />
                  )}
                </button>
                <p className="mt-3 text-xs font-black text-stone-700 text-center">
                  {isListening 
                    ? (language === 'ml' ? 'കേൾക്കുന്നു... പൂർത്തിയാകുമ്പോൾ നിർത്തുക' : 'Listening... click to stop')
                    : (language === 'ml' ? 'മൈക്രോഫോൺ അമർത്തി സംസാരിക്കുക' : 'Tap microphone and speak')}
                </p>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}
