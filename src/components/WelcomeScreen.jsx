import React, { useState } from 'react';
import { Mic, Search, FileCheck, ShieldCheck, Volume2, ArrowRight, UserCheck, HeartPulse, Sparkles } from 'lucide-react';
import { speakText, stopSpeech } from '../utils/speech.js';
import AudioWaveVisualizer from './common/AudioWaveVisualizer.jsx';

export default function WelcomeScreen({ language, setActiveScreen }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const introText_ml = "നമസ്കാരം. നമ്മുടെ അവകാശം എന്ന AI ക്ഷേമ സഹായ വേദിയിലേക്ക് സ്വാഗതം. മുതിർന്ന പൗരന്മാർക്കും ഭിന്നശേഷിക്കാർക്കുമുള്ള കേരള സർക്കാരിന്റെ ക്ഷേമ പെൻഷനുകളും ആനുകൂല്യങ്ങളും എളുപ്പത്തിൽ കണ്ടെത്താനും അപേക്ഷ തയ്യാറാക്കാനും ഞാൻ സഹായിക്കാം. സംസാരിച്ചോ സ്ക്രീനിൽ തൊട്ടോ മുന്നോട്ട് പോകാം.";
  const introText_en = "Welcome to Nammude Avakasham, your AI Rights Navigator. I help senior citizens and persons with disabilities in Kerala discover eligible government welfare schemes, understand procedures, and prepare applications easily.";

  const playWelcomeAudio = () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    speakText(
      language === 'ml' ? introText_ml : introText_en,
      language,
      () => setIsPlayingAudio(false)
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-10">
      
      {/* Hero Welcome Card with Kerala Heritage Kasavu Accents */}
      <div className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 rounded-3xl p-6 sm:p-12 text-white shadow-elevated border-4 border-amber-400 overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-400/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-5 text-center md:text-left flex-1">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs sm:text-sm font-black tracking-wide shadow-sm">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>{language === 'ml' ? 'കേരള സർക്കാർ ഔദ്യോഗിക വിവരങ്ങൾ' : 'Verified Kerala Govt Welfare Portal'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight">
              {language === 'ml' ? (
                <>
                  അവകാശങ്ങൾ അറിയാം, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">
                    ലളിതമായി നേടാം
                  </span>
                </>
              ) : (
                <>
                  Know Your Rights, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">
                    Claim with Ease
                  </span>
                </>
              )}
            </h1>

            <p className="text-emerald-100 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed font-normal">
              {language === 'ml' ? introText_ml : introText_en}
            </p>

            {/* Audio Wave & Speaker Controls */}
            <div className="pt-2 flex flex-wrap items-center gap-3 justify-center md:justify-start">
              <button
                onClick={playWelcomeAudio}
                className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-lg transition-all active:scale-95 ${
                  isPlayingAudio
                    ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-400/40'
                    : 'bg-emerald-800/90 hover:bg-emerald-700 text-amber-200 border border-amber-400/50 hover:border-amber-300'
                }`}
              >
                <Volume2 className="w-5 h-5 text-amber-300" />
                <span>
                  {isPlayingAudio
                    ? (language === 'ml' ? 'ശബ്ദം നിർത്തുക' : 'Stop Audio')
                    : (language === 'ml' ? 'ഈ വിവരണം കേൾക്കുക 🔊' : 'Listen to Introduction 🔊')}
                </span>
              </button>

              <AudioWaveVisualizer isPlaying={isPlayingAudio} label={language === 'ml' ? 'ശബ്ദം പ്ലേ ചെയ്യുന്നു' : 'Playing'} />
            </div>
          </div>

          {/* Interactive Large Microphone Button with Pulsing Gold Rings */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="relative">
              <span className="absolute -inset-4 rounded-full bg-amber-400/30 blur-xl animate-pulse"></span>
              <button
                onClick={() => setActiveScreen('voice')}
                className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 hover:from-amber-400 hover:to-yellow-200 text-emerald-950 flex flex-col items-center justify-center p-4 shadow-2xl transition-all transform hover:scale-105 active:scale-95 border-4 border-white group animate-mic-pulse"
                title={language === 'ml' ? 'സംസാരിച്ച് സഹായി ആരംഭിക്കുക' : 'Start Voice Assistant'}
              >
                <div className="w-16 h-16 rounded-full bg-emerald-950 text-amber-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-inner">
                  <Mic className="w-9 h-9" />
                </div>
                <span className="font-black text-sm sm:text-base text-center leading-tight">
                  {language === 'ml' ? 'സംസാരിച്ച് തുടങ്ങാം' : 'Speak to Begin'}
                </span>
                <span className="text-[10px] text-emerald-900 font-extrabold mt-0.5">
                  {language === 'ml' ? 'മലയാളത്തിൽ പറയാം' : 'Malayalam / English'}
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Target Beneficiary Quick Entry Cards */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2.5">
            <UserCheck className="w-7 h-7 text-emerald-800" />
            <span>{language === 'ml' ? 'നിങ്ങൾക്ക് ഏറ്റവും യോജിച്ച വിഭാഗം തിരഞ്ഞെടുക്കുക' : 'Select Your Category to Get Started'}</span>
          </h2>
          <span className="text-xs font-bold text-gray-500 hidden sm:inline">
            {language === 'ml' ? '3 പ്രധാന വിഭാഗങ്ങൾ' : '3 Key Categories'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Senior Citizens */}
          <div 
            onClick={() => setActiveScreen('schemes')}
            className="glass-card rounded-3xl p-7 shadow-soft hover:shadow-elevated border-2 border-emerald-100 hover:border-emerald-600 transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1.5"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-100 to-emerald-200 text-emerald-900 flex items-center justify-center text-3xl mb-5 shadow-sm group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                👵🧓
              </div>
              <h3 className="font-black text-xl text-gray-900 mb-2 group-hover:text-emerald-800 transition-colors">
                {language === 'ml' ? 'മുതിർന്ന പൗരന്മാർ (60+)' : 'Senior Citizens (Age 60+)'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
                {language === 'ml' 
                  ? 'ഇന്ദിരാഗാന്ധി വാർദ്ധക്യ പെൻഷൻ (₹1,600/മാസം), വയോമിത്രം സൗജന്യ ചികിത്സ, ജീവൻ രേഖ മസ്റ്ററിംഗ് സഹായം.' 
                  : 'Old Age Pension (₹1,600/mo), Vayomithram free healthcare clinics, and annual mustering support.'}
              </p>
            </div>
            <div className="flex items-center text-emerald-700 font-black text-sm gap-1.5 group-hover:translate-x-1.5 transition-transform">
              <span>{language === 'ml' ? 'പദ്ധതികൾ കാണുക' : 'Explore Schemes'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>

          {/* Card 2: Persons with Disabilities */}
          <div 
            onClick={() => setActiveScreen('schemes')}
            className="glass-card rounded-3xl p-7 shadow-soft hover:shadow-elevated border-2 border-amber-100 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1.5"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-100 to-amber-200 text-amber-900 flex items-center justify-center text-3xl mb-5 shadow-sm group-hover:bg-amber-500 group-hover:text-white transition-colors">
                ♿
              </div>
              <h3 className="font-black text-xl text-gray-900 mb-2 group-hover:text-amber-800 transition-colors">
                {language === 'ml' ? 'ഭിന്നശേഷിക്കാർ (PwD)' : 'Persons with Disabilities'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
                {language === 'ml' 
                  ? 'വികലാംഗ പെൻഷൻ, UDID സ്വാവലംബൻ കാർഡ്, സൗജന്യ KSRTC ബസ് പാസ്, ഉപകരണങ്ങൾ.' 
                  : 'Differently Abled Pension, UDID national card, free/concessional travel pass, assistive aids.'}
              </p>
            </div>
            <div className="flex items-center text-amber-700 font-black text-sm gap-1.5 group-hover:translate-x-1.5 transition-transform">
              <span>{language === 'ml' ? 'പദ്ധതികൾ കാണുക' : 'Explore Schemes'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>

          {/* Card 3: Caregivers */}
          <div 
            onClick={() => setActiveScreen('schemes')}
            className="glass-card rounded-3xl p-7 shadow-soft hover:shadow-elevated border-2 border-teal-100 hover:border-teal-600 transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1.5"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-100 to-teal-200 text-teal-900 flex items-center justify-center text-3xl mb-5 shadow-sm group-hover:bg-teal-700 group-hover:text-white transition-colors">
                🤝
              </div>
              <h3 className="font-black text-xl text-gray-900 mb-2 group-hover:text-teal-800 transition-colors">
                {language === 'ml' ? 'രോഗ പരിചാരകർ (Caregivers)' : 'Bedridden Caregivers'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
                {language === 'ml' 
                  ? 'കിടപ്പിലായ രോഗികളെയും കഠിന ഭിന്നശേഷിയുള്ളവരെയും നോക്കുന്ന കുടുംബാംഗങ്ങൾക്ക് ആശ്വാസകിരണം ധനസഹായം.' 
                  : 'Aswasakiranam financial grant for family members caring for fully bedridden relatives 24x7.'}
              </p>
            </div>
            <div className="flex items-center text-teal-700 font-black text-sm gap-1.5 group-hover:translate-x-1.5 transition-transform">
              <span>{language === 'ml' ? 'പദ്ധതികൾ കാണുക' : 'Explore Schemes'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>

        </div>
      </div>

      {/* Main Feature Quick Bar */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-elevated border-2 border-amber-400/40">
        <div className="flex items-center gap-5 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black text-2xl shadow flex-shrink-0">
            🎯
          </div>
          <div>
            <h4 className="font-black text-lg text-amber-200">
              {language === 'ml' ? 'യോജ്യത പരിശോധിക്കാം (Eligibility Wizard)' : 'Check Your Eligibility in 1 Minute'}
            </h4>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-0.5">
              {language === 'ml' 
                ? 'പ്രായവും വരുമാനവും നൽകി ഏതെല്ലാം പെൻഷനുകൾ ലഭിക്കുമെന്ന് ഉടൻ അറിയാം.' 
                : 'Answer 5 simple questions to see your exact matching government schemes.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveScreen('eligibility')}
          className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 flex-shrink-0"
        >
          <span>{language === 'ml' ? 'ഇപ്പോൾ പരിശോധിക്കുക' : 'Start Assessment'}</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>

    </div>
  );
}
