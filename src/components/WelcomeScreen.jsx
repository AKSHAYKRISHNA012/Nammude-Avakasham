import React, { useState } from 'react';
import { Mic, Search, FileCheck, ShieldCheck, Volume2, ArrowRight, HeartHandshake, UserCheck, Accessibility } from 'lucide-react';
import { speakText, stopSpeech } from '../utils/speech.js';

export default function WelcomeScreen({ language, setActiveScreen }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const introText_ml = "നമസ്കാരം. നമ്മുടെ അവകാശം എന്ന AI ക്ഷേമ സഹായിയിലേക്ക് സ്വാഗതം. മുതിർന്ന പൗരന്മാർക്കും ഭിന്നശേഷിക്കാർക്കുമുള്ള കേരള സർക്കാരിന്റെ ക്ഷേമ പെൻഷനുകളും ആനുകൂല്യങ്ങളും എളുപ്പത്തിൽ കണ്ടെത്താനും അപേക്ഷ തയ്യാറാക്കാനും ഞാൻ സഹായിക്കാം. സംസാരിച്ചോ സ്ക്രീനിൽ തൊട്ടോ മുന്നോട്ട് പോകാം.";
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
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Hero Welcome Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border-4 border-amber-400 relative overflow-hidden">
        {/* Subtle Decorative Kasavu Wave */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs sm:text-sm font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>{language === 'ml' ? 'കേരള സർക്കാർ ക്ഷേമ വിവരങ്ങൾ' : 'Verified Kerala Govt Welfare Assistance'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              {language === 'ml' ? (
                <>
                  അവകാശങ്ങൾ അറിയാം, <br />
                  <span className="text-amber-300">ലളിതമായി നേടാം</span>
                </>
              ) : (
                <>
                  Know Your Rights, <br />
                  <span className="text-amber-300">Claim with Confidence</span>
                </>
              )}
            </h1>

            <p className="text-emerald-100 text-base sm:text-lg max-w-xl leading-relaxed">
              {language === 'ml' ? introText_ml : introText_en}
            </p>

            {/* Audio Read-Out Button */}
            <div className="pt-2 flex flex-wrap items-center gap-3 justify-center md:justify-start">
              <button
                onClick={playWelcomeAudio}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-95 ${
                  isPlayingAudio
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-emerald-700/80 hover:bg-emerald-600 text-amber-200 border border-amber-400/50'
                }`}
              >
                <Volume2 className="w-5 h-5" />
                <span>
                  {isPlayingAudio
                    ? (language === 'ml' ? 'ശബ്ദം നിർത്തുക' : 'Stop Audio')
                    : (language === 'ml' ? 'ഈ വിവരണം കേൾക്കുക 🔊' : 'Listen to Introduction 🔊')}
                </span>
              </button>
            </div>
          </div>

          {/* Big Voice Assistant Trigger Pill */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setActiveScreen('voice')}
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-emerald-950 flex flex-col items-center justify-center p-4 shadow-2xl transition-all transform hover:scale-105 active:scale-95 border-4 border-white group animate-mic-pulse"
              title={language === 'ml' ? 'സംസാരിച്ച് സഹായി ആരംഭിക്കുക' : 'Start Voice Assistant'}
            >
              <Mic className="w-12 h-12 sm:w-16 sm:h-16 mb-2 text-emerald-900 group-hover:scale-110 transition-transform" />
              <span className="font-extrabold text-sm sm:text-base text-center leading-tight">
                {language === 'ml' ? 'സംസാരിച്ച് തുടങ്ങുക' : 'Speak to Begin'}
              </span>
              <span className="text-[10px] text-emerald-800 font-semibold mt-1">
                {language === 'ml' ? 'മലയാളത്തിൽ സംസാരിക്കാം' : 'Malayalam / English'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Target Beneficiary Quick Entry Cards */}
      <div className="mt-10">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-emerald-700" />
          <span>{language === 'ml' ? 'നിങ്ങൾക്ക് ഏറ്റവും യോജിച്ച വിഭാഗം തിരഞ്ഞെടുക്കുക' : 'Select Your Category to Get Started'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Senior Citizens */}
          <div 
            onClick={() => setActiveScreen('schemes')}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border-2 border-emerald-100 hover:border-emerald-600 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                👵🧓
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">
                {language === 'ml' ? 'മുതിർന്ന പൗരന്മാർ (60+)' : 'Senior Citizens (Age 60+)'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {language === 'ml' 
                  ? 'ഇന്ദിരാഗാന്ധി വാർദ്ധക്യ പെൻഷൻ (₹1,600/മാസം), വയോമിത്രം സൗജന്യ ചികിത്സ, ജീവൻ രേഖ മസ്റ്ററിംഗ് സഹായം.' 
                  : 'Old Age Pension (₹1,600/mo), Vayomithram free healthcare clinics, and annual mustering support.'}
              </p>
            </div>
            <div className="flex items-center text-emerald-700 font-bold text-sm gap-1 group-hover:translate-x-1 transition-transform">
              <span>{language === 'ml' ? 'പദ്ധതികൾ കാണുക' : 'Explore Schemes'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Persons with Disabilities */}
          <div 
            onClick={() => setActiveScreen('schemes')}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border-2 border-emerald-100 hover:border-emerald-600 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-3xl mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                ♿
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">
                {language === 'ml' ? 'ഭിന്നശേഷിക്കാർ (PwD)' : 'Persons with Disabilities'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {language === 'ml' 
                  ? 'വികലാംഗ പെൻഷൻ, UDID സ്വാവലംബൻ കാർഡ്, സൗജന്യ KSRTC ബസ് പാസ്, ഉപകരണങ്ങൾ.' 
                  : 'Differently Abled Pension, UDID national card, free/concessional travel pass, assistive aids.'}
              </p>
            </div>
            <div className="flex items-center text-amber-700 font-bold text-sm gap-1 group-hover:translate-x-1 transition-transform">
              <span>{language === 'ml' ? 'പദ്ധതികൾ കാണുക' : 'Explore Schemes'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Caregivers */}
          <div 
            onClick={() => setActiveScreen('schemes')}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border-2 border-emerald-100 hover:border-emerald-600 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center text-3xl mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                🤝
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">
                {language === 'ml' ? 'രോഗ പരിചാരകർ (Caregivers)' : 'Bedridden Caregivers'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {language === 'ml' 
                  ? 'കിടപ്പിലായ രോഗികളെയും കഠിന ഭിന്നശേഷിയുള്ളവരെയും നോക്കുന്ന കുടുംബാംഗങ്ങൾക്ക് ആശ്വാസകിരണം ധനസഹായം.' 
                  : 'Aswasakiranam financial grant for family members caring for fully bedridden relatives 24x7.'}
              </p>
            </div>
            <div className="flex items-center text-teal-700 font-bold text-sm gap-1 group-hover:translate-x-1 transition-transform">
              <span>{language === 'ml' ? 'പദ്ധതികൾ കാണുക' : 'Explore Schemes'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>
      </div>

      {/* Main Feature Quick Bar */}
      <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-base">
              {language === 'ml' ? 'യോജ്യത പരിശോധിക്കാം (Eligibility Wizard)' : 'Check Your Eligibility'}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600">
              {language === 'ml' 
                ? 'പ്രായവും വരുമാനവും നൽകി ഏതെല്ലാം പെൻഷൻ ലഭിക്കുമെന്ന് ഉടൻ അറിയാം.' 
                : 'Enter your age and details to see instant matching welfare benefits.'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveScreen('eligibility')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <span>{language === 'ml' ? 'ഇപ്പോൾ പരിശോധിക്കുക' : 'Start Assessment'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
