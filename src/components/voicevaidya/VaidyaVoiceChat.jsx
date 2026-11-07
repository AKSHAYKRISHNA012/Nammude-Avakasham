import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Send, 
  AlertTriangle, 
  PhoneCall, 
  RefreshCw, 
  Sparkles, 
  ShieldAlert, 
  HeartPulse,
  Pill,
  Clock
} from 'lucide-react';
import { speakText, stopSpeech, createSpeechRecognizer } from '../../utils/speech.js';

export default function VaidyaVoiceChat({ language }) {
  const [messages, setMessages] = useState([
    {
      id: 'vmsg-1',
      sender: 'vaidya',
      text_ml: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ വോയ്‌സ് വൈദ്യ (VoiceVaidya). ഡോക്ടർ തന്ന മരുന്നുകളെക്കുറിച്ചോ, കഴിക്കേണ്ട സമയത്തെക്കുറിച്ചോ, എന്തെങ്കിലും ശാരീരിക അസ്വസ്ഥതകളെക്കുറിച്ചോ എന്നോട് ചോദിക്കാം. മൈക്രോഫോൺ ബട്ടൺ അമർത്തി സംസാരിക്കൂ.",
      text_en: "Hello! I am your VoiceVaidya companion. Ask me about your medicine timings, doctor instructions, or share your symptoms naturally. Tap the microphone and speak.",
      suggestedQueries: [
        "ബിപി മരുന്ന് എപ്പോഴാണ് കഴിക്കേണ്ടത്?",
        "എനിക്ക് ചെറിയ തലകറക്കമുണ്ട്",
        "ഗുളിക ഭക്ഷണത്തിന് മുമ്പോ ശേഷമോ?",
        "മരുന്ന് കഴിക്കാൻ മറന്നുപോയാൽ എന്ത് ചെയ്യണം?"
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSpeechId, setActiveSpeechId] = useState(null);
  const [emergencyAlert, setEmergencyAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const recognizerRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, interimText]);

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
      () => setIsListening(false),
      (err) => {
        console.warn('Speech error:', err);
        setIsListening(false);
      }
    );

    if (recognizer) {
      try {
        recognizer.start();
        recognizerRef.current = recognizer;
        setIsListening(true);
      } catch (e) {
        console.error(e);
        setIsListening(false);
      }
    } else {
      alert(language === 'ml' 
        ? 'ബ്രൗസറിൽ വോയ്‌സ് ലഭ്യമല്ല. താഴെ ടൈപ്പ് ചെയ്യുക.' 
        : 'Voice recognition not supported. Please type.');
    }
  };

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

  const handleSendMessage = async (customText) => {
    const text = customText || inputQuery;
    if (!text.trim()) return;

    setInputQuery('');
    setInterimText('');
    setEmergencyAlert(null);

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text_ml: text,
      text_en: text
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const lower = text.toLowerCase();

    // Check for RED FLAG emergency medical symptoms
    const isEmergency = 
      lower.includes('നെഞ്ചുവേദന') || 
      lower.includes('chest pain') || 
      lower.includes('ശ്വാസംമുട്ടൽ') || 
      lower.includes('breathless') || 
      lower.includes('കൈകാലുകൾ കുഴയുന്നു') || 
      lower.includes('stroke') ||
      lower.includes('തളർന്നു');

    if (isEmergency) {
      setEmergencyAlert({
        title_ml: "അടിയന്തിര മെഡിക്കൽ മുന്നറിയിപ്പ് (Emergency Alert)",
        title_en: "Emergency Medical Alert",
        desc_ml: "നെഞ്ചുവേദനയോ കഠിനമായ ശ്വാസംമുട്ടലോ ഗുരുതരമായ ലക്ഷണങ്ങളാകാം! ഒട്ടും സമയം കളയാതെ തൊട്ടടുത്തുള്ള ആശുപത്രിയിലെത്തുകയോ 108 ആംബുലൻസിനെയോ 1056 ദിശ ഹെൽപ്‌ലൈനെയോ വിളിക്കുക.",
        desc_en: "Chest pain or severe breathlessness requires immediate clinical evaluation. Please call 108 Ambulance or Disha 1056 immediately."
      });
    }

    // AI Vaidya Medical Assistant Response
    setTimeout(() => {
      let reply_ml = "";
      let reply_en = "";
      let suggestions = [];

      if (isEmergency) {
        reply_ml = "ശ്രദ്ധിക്കുക! നിങ്ങൾ പറഞ്ഞ ലക്ഷണങ്ങൾ അടിയന്തിര വൈദ്യസഹായം ആവശ്യമുള്ളവയാണ്. സ്വന്തമായി മരുന്ന് കഴിക്കരുത്. ഉടൻ തന്നെ അടുത്തുള്ള ആശുപത്രിയിലേക്ക് പോകുക അല്ലെങ്കിൽ താഴെ കാണുന്ന 108 ആംബുലൻസ് നമ്പറിലേക്ക് വിളിക്കുക.";
        reply_en = "Warning! The symptoms you reported may require emergency care. Do not self-medicate. Please seek immediate hospital care or call 108.";
        suggestions = ["ആംബുലൻസ് 108 വിളിക്കുക", "ദിശ 1056 സഹായം"];
      } else if (lower.includes('ബിപി') || lower.includes('bp') || lower.includes('ടെൽമിസാർട്ടൻ') || lower.includes('telmisartan')) {
        reply_ml = "നിങ്ങളുടെ കുറിപ്പടി പ്രകാരം രക്തസമ്മർദ്ദത്തിനുള്ള ടെൽമിസാർട്ടൻ 40mg (Telmisartan) ഗുളിക ദിവസവും രാവിലെ 8:00 മണിക്ക് പ്രഭാതഭക്ഷണത്തിന് ശേഷമാണ് കഴിക്കേണ്ടത്. ബി.പി മരുന്ന് ദിവസവും ഒരേ സമയത്ത് കൃത്യമായി കഴിക്കാൻ ശ്രദ്ധിക്കുക.";
        reply_en = "According to your prescription, Telmisartan 40mg for BP should be taken daily in the morning at 8:00 AM after breakfast. Try to take it at the same time every day.";
        suggestions = ["ഷുഗർ മരുന്ന് എപ്പോഴാണ്?", "മരുന്ന് കഴിച്ചു എന്ന് രേഖപ്പെടുത്തുക"];
      } else if (lower.includes('ഷുഗർ') || lower.includes('sugar') || lower.includes('മെറ്റ്ഫോർമിൻ') || lower.includes('metformin')) {
        reply_ml = "പ്രമേഹത്തിനുള്ള മെറ്റ്ഫോർമിൻ 500mg (Metformin) ഗുളിക രാവിലെ പ്രഭാതഭക്ഷണത്തിന് ശേഷവും, രാത്രി അത്താഴത്തിന് ശേഷവുമാണ് കഴിക്കേണ്ടത്. ഭക്ഷണം കഴിക്കാതെ വെറുംവയറ്റിൽ ഇത് കഴിക്കരുത്.";
        reply_en = "Metformin 500mg for diabetes should be taken with or right after your morning and evening meals. Do not take it on an empty stomach.";
        suggestions = ["ഗ്യാസിന്റെ മരുന്ന് എപ്പോഴാണ്?", "കുറിപ്പടി പരിശോധിക്കുക"];
      } else if (lower.includes('മറന്നു') || lower.includes('missed') || lower.includes('skip')) {
        reply_ml = "മരുന്ന് കഴിക്കാൻ മറന്നുപോയാൽ ഓർമ്മ വരുമ്പോൾ തന്നെ കഴിക്കുക. എന്നാൽ അടുത്ത ഡോസിന്റെ സമയമായിട്ടുണ്ടെങ്കിൽ മറന്നുപോയത് ഒഴിവാക്കി പതിവ് ഡോസ് മാത്രം കഴിക്കുക. ഒരിക്കലും ഒന്നിച്ച് രണ്ട് ഗുളികകൾ കഴിക്കരുത്.";
        reply_en = "If you miss a dose, take it as soon as you remember. If it is already close to the next scheduled time, skip the missed dose and resume normal schedule. Never take a double dose.";
        suggestions = ["കുടുംബത്തിന് വിവരം നൽകുക", "ഡോക്ടറോട് ചോദിക്കുക"];
      } else if (lower.includes('തലകറക്കം') || lower.includes('dizziness') || lower.includes('അസ്വസ്ഥത')) {
        reply_ml = "ചെറിയ തലകറക്കം അനുഭവപ്പെടുന്നുണ്ടെങ്കിൽ സാവധാനം ഇരിക്കുകയോ കിടക്കുകയോ ചെയ്യുക. ധാരാളം വെള്ളം കുടിക്കുക. ഇത് ബി.പി വ്യതിയാനം മൂലമാകാൻ സാധ്യതയുണ്ട്. ഈ ലക്ഷണം ഞങ്ങൾ നിങ്ങളുടെ 'ഡോക്ടർ സന്ദർശന' ഡയറിയിൽ രേഖപ്പെടുത്തിയിട്ടുണ്ട്.";
        reply_en = "If experiencing mild dizziness, sit or lie down gently and drink water. This could be related to BP variations. I have noted this symptom in your Doctor Visit notes.";
        suggestions = ["ലക്ഷണങ്ങൾ ഡോക്ടർ കുറിപ്പിൽ ചേർക്കുക", "ബി.പി റീഡിംഗ് കാണുക"];
      } else {
        reply_ml = "നിങ്ങളുടെ ചോദ്യം മനസ്സിലായി. നിങ്ങളുടെ കുറിപ്പടിയിലെ വിവരങ്ങൾ പരിശോധിച്ചതിൽ നിന്നും ഡോക്ടർ തന്ന നിർദ്ദേശങ്ങൾ കൃത്യമായി പാലിക്കാൻ ശ്രദ്ധിക്കുക. ഡോക്ടറുടെ അനുവാദമില്ലാതെ മരുന്നിന്റെ അളവ് കൂട്ടുകയോ കുറയ്ക്കുകയോ ചെയ്യരുത്.";
        reply_en = "Understood. Please strictly adhere to the prescription issued by your doctor. Never adjust dosages or stop medications without consulting your physician.";
        suggestions = ["ഇന്നത്തെ മരുന്നുകളുടെ ലിസ്റ്റ്", "പുതിയ കുറിപ്പടി അപ്‌ലോഡ് ചെയ്യുക"];
      }

      const botMsg = {
        id: `v-${Date.now()}`,
        sender: 'vaidya',
        text_ml: reply_ml,
        text_en: reply_en,
        suggestedQueries: suggestions
      };

      setMessages(prev => [...prev, botMsg]);
      setIsLoading(false);

      // Play audio response
      handlePlayAudio(botMsg.id, language === 'ml' ? reply_ml : reply_en);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 flex flex-col h-[calc(100vh-8rem)]">
      
      {/* Header bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-xl shadow">
            🩺
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-gray-900 text-base sm:text-lg">
                {language === 'ml' ? 'വോയ്‌സ് വൈദ്യ (സംസാരിക്കാം)' : 'VoiceVaidya (Talk to Vaidya)'}
              </h2>
              <span className="text-[10px] bg-teal-100 text-teal-800 font-extrabold px-2 py-0.5 rounded-full">
                AI Companion
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {language === 'ml' 
                ? 'മുതിർന്നവർക്കായി ലളിതമായ മലയാളത്തിലും മംഗ്ലീഷിലും സംസാരിക്കുന്ന ആരോഗ്യ സഹായി' 
                : 'Malayalam & Manglish senior-friendly voice healthcare companion'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            stopSpeech();
            setIsSpeaking(false);
            setMessages([
              {
                id: 'vmsg-1',
                sender: 'vaidya',
                text_ml: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ വോയ്‌സ് വൈദ്യ. നിങ്ങളുടെ മരുന്നുകളെക്കുറിച്ചോ ആരോഗ്യത്തെക്കുറിച്ചോ എന്തും ചോദിക്കാം.",
                text_en: "Hello! I am your VoiceVaidya companion. Ask me anything about your medicines or health.",
                suggestedQueries: ["ബിപി മരുന്ന് എപ്പോഴാണ്?", "ഇന്നത്തെ മരുന്ന് ലിസ്റ്റ്"]
              }
            ]);
            setEmergencyAlert(null);
          }}
          className="p-2 text-gray-400 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-colors"
          title="Reset"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Emergency Alert Banner if triggered */}
      {emergencyAlert && (
        <div className="mb-4 p-4 rounded-2xl bg-rose-600 text-white shadow-lg animate-pulse flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-black text-sm text-yellow-200">
                {language === 'ml' ? emergencyAlert.title_ml : emergencyAlert.title_en}
              </h4>
              <p className="text-xs text-white mt-1 leading-relaxed">
                {language === 'ml' ? emergencyAlert.desc_ml : emergencyAlert.desc_en}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
            <a
              href="tel:108"
              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-rose-950 font-black text-xs rounded-xl shadow flex items-center gap-1.5"
            >
              <PhoneCall className="w-4 h-4" />
              <span>108 ആംബുലൻസ്</span>
            </a>
            <a
              href="tel:1056"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <PhoneCall className="w-4 h-4" />
              <span>1056 ദിശ</span>
            </a>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-teal-50/30 rounded-2xl border border-teal-100">
        {messages.map((msg) => {
          const isVaidya = msg.sender === 'vaidya';
          const text = language === 'ml' ? msg.text_ml : msg.text_en;
          const isThisSpeaking = isSpeaking && activeSpeechId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isVaidya ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-3xl p-4 sm:p-5 shadow-sm text-sm sm:text-base leading-relaxed ${
                  isVaidya
                    ? 'bg-white text-gray-900 border-2 border-teal-100 rounded-tl-sm'
                    : 'bg-teal-700 text-white font-medium rounded-tr-sm'
                }`}
              >
                <p className="whitespace-pre-line">{text}</p>

                {isVaidya && (
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => handlePlayAudio(msg.id, text)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isThisSpeaking
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200'
                      }`}
                    >
                      {isThisSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>
                        {isThisSpeaking 
                          ? (language === 'ml' ? 'നിർത്തുക' : 'Stop') 
                          : (language === 'ml' ? 'ശബ്ദത്തിൽ കേൾക്കുക 🔊' : 'Listen 🔊')}
                      </span>
                    </button>

                    <span className="text-[10px] text-gray-400 font-semibold">
                      VoiceVaidya AI
                    </span>
                  </div>
                )}
              </div>

              {/* Suggestions */}
              {isVaidya && msg.suggestedQueries && (
                <div className="flex flex-wrap gap-2 mt-2 ml-2">
                  {msg.suggestedQueries.map((query, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(query)}
                      className="px-3 py-1.5 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-xs font-bold transition-transform active:scale-95 shadow-sm"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {interimText && (
          <div className="flex flex-col items-end">
            <div className="max-w-[75%] rounded-3xl p-4 bg-teal-600 text-white text-sm italic opacity-80 animate-pulse">
              "{interimText}..."
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-white rounded-2xl w-fit border border-gray-200 text-gray-500 text-xs">
            <Sparkles className="w-4 h-4 text-teal-600 animate-spin" />
            <span>{language === 'ml' ? 'വൈദ്യ വിവരങ്ങൾ പരിശോധിക്കുന്നു...' : 'Consulting health guidance...'}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice and Text Input Area */}
      <div className="mt-4 bg-white rounded-2xl p-3 sm:p-4 border-2 border-teal-200 shadow-md">
        {isListening && (
          <div className="mb-3 px-4 py-2 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs text-rose-800 font-bold animate-pulse">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping"></span>
              <span>{language === 'ml' ? 'വൈദ്യ കേൾക്കുന്നു... മലയാളത്തിൽ സംസാരിക്കൂ' : 'Listening... Speak now in Malayalam'}</span>
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
          <button
            onClick={toggleListening}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all flex-shrink-0 shadow-lg ${
              isListening
                ? 'bg-rose-600 text-white animate-mic-pulse ring-4 ring-rose-300'
                : 'bg-teal-700 hover:bg-teal-600 text-amber-300'
            }`}
            title="Microphone"
          >
            {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </button>

          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={
              language === 'ml'
                ? 'മൈക്കിൽ സംസാരിക്കാം അല്ലെങ്കിൽ ചോദ്യം ഇവിടെ എഴുതാം...'
                : 'Speak or type medical query here...'
            }
            className="flex-1 bg-gray-50 border border-gray-300 rounded-2xl px-4 py-3.5 text-sm sm:text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputQuery.trim() || isLoading}
            className="w-12 h-12 rounded-2xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white flex items-center justify-center font-bold shadow transition-transform active:scale-95 flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Safety Disclaimer Footer */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-[11px] text-gray-500 px-1">
          <span className="flex items-center gap-1">
            <HeartPulse className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'ml' ? 'മുന്നറിയിപ്പ്: വോയ്‌സ് വൈദ്യ ഡോക്ടറുടെ പരിശോധനയ്ക്ക് പകരമല്ല. ഡോക്ടറുടെ നിർദ്ദേശം പാലിക്കുക.' : 'Note: VoiceVaidya does not replace physician consultation.'}</span>
          </span>
          <span className="font-bold text-teal-800">108 / 1056</span>
        </div>
      </div>

    </div>
  );
}
