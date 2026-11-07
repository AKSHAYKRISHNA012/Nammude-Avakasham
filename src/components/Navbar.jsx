import React from 'react';
import { Volume2, Eye, HelpCircle, HeartPulse, PhoneCall, Sparkles, LogIn } from 'lucide-react';
import { speakText } from '../utils/speech.js';

export default function Navbar({
  language,
  setLanguage,
  highContrast,
  setHighContrast,
  fontSize,
  setFontSize,
  activeScreen,
  setActiveScreen,
  currentMode,
  setCurrentMode,
  onOpenJargonModal,
  onOpenAuthModal
}) {
  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ml' ? 'en' : 'ml'));
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 1, 3));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 1, 1));
  };

  const handleSwitchToRights = () => {
    setCurrentMode('rights');
    setActiveScreen('welcome');
  };

  const handleSwitchToVaidya = () => {
    setCurrentMode('vaidya');
    setActiveScreen('vaidya_home');
  };

  const testAudioVoice = () => {
    speakText(
      language === 'ml' 
        ? "ശബ്ദ സംവിധാനം സജ്ജമാണ്. നിങ്ങൾക്ക് വ്യക്തമായി കേൾക്കാൻ സാധിക്കുന്നുണ്ടോ?" 
        : "Audio voice system is ready. Can you hear clearly?",
      language
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-emerald-950/95 backdrop-blur-xl text-white shadow-elevated border-b-2 border-amber-400/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding with Kerala Heritage Seal */}
          <div 
            onClick={currentMode === 'rights' ? handleSwitchToRights : handleSwitchToVaidya}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="w-13 h-13 p-2 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-emerald-950 flex items-center justify-center font-black text-2xl shadow-lg border-2 border-white/80 group-hover:scale-105 transition-transform">
              {currentMode === 'vaidya' ? '🩺' : '🌴'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-xl sm:text-2xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  {currentMode === 'vaidya' ? 'വോയ്‌സ് വൈദ്യ' : 'നമ്മുടെ അവകാശം'}
                </h1>
                <span className={`text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full shadow-sm tracking-wide ${
                  currentMode === 'vaidya' 
                    ? 'bg-teal-400 text-teal-950 ring-2 ring-teal-300/40' 
                    : 'bg-amber-400 text-emerald-950 ring-2 ring-amber-300/40'
                }`}>
                  {currentMode === 'vaidya' ? 'VoiceVaidya AI' : 'Rights Navigator'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-emerald-200/90 font-medium hidden sm:block">
                {currentMode === 'vaidya'
                  ? (language === 'ml' ? 'മുതിർന്ന പൗരന്മാർക്കുള്ള മലയാളം AI ആരോഗ്യ സഹായി' : 'Malayalam Senior Healthcare Companion')
                  : (language === 'ml' ? 'മുതിർന്നവർക്കും ഭിന്നശേഷിക്കാർക്കുമുള്ള കേരള ക്ഷേമ വേദി' : 'Welfare Assistance for Seniors & PwD')}
              </p>
            </div>
          </div>

          {/* Central Mode Switcher: Rights vs VoiceVaidya (Interactive Glass Pills) */}
          <div className="hidden lg:flex items-center bg-black/40 p-1.5 rounded-2xl border border-emerald-700/60 shadow-inner">
            <button
              onClick={handleSwitchToRights}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                currentMode === 'rights'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-md ring-2 ring-amber-300/60 scale-102'
                  : 'text-emerald-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-sm">🌴</span>
              <span>{language === 'ml' ? 'ക്ഷേമ അവകാശങ്ങൾ' : 'Welfare Rights'}</span>
            </button>

            <button
              onClick={handleSwitchToVaidya}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                currentMode === 'vaidya'
                  ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-teal-950 shadow-md ring-2 ring-teal-300/60 scale-102'
                  : 'text-emerald-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <HeartPulse className="w-4 h-4 text-emerald-900" />
              <span>{language === 'ml' ? 'വോയ്‌സ് വൈദ്യ (ആരോഗ്യം)' : 'VoiceVaidya Health'}</span>
            </button>
          </div>

          {/* Accessibility & Quick Toolset */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Audio Test Speaker */}
            <button
              onClick={testAudioVoice}
              title={language === 'ml' ? 'ശബ്ദ പരിശോധന (Test Audio Voice)' : 'Test Audio Playback'}
              className="p-2 sm:px-3 sm:py-2 text-xs font-bold rounded-xl bg-emerald-900 hover:bg-emerald-800 text-amber-300 border border-emerald-700/80 transition-transform active:scale-95 flex items-center gap-1.5 shadow-sm"
            >
              <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="hidden xl:inline">{language === 'ml' ? 'ശബ്ദ പരിശോധന' : 'Test Audio'}</span>
            </button>

            {/* Quick Jargon Glossary */}
            <button
              onClick={onOpenJargonModal}
              title={language === 'ml' ? 'സർക്കാർ പദാവലികൾ ലളിതമായി' : 'Government Jargon Simplifier'}
              className="p-2 sm:px-3 sm:py-2 text-xs font-bold rounded-xl bg-emerald-900/90 hover:bg-emerald-800 text-emerald-100 border border-emerald-700/80 transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">{language === 'ml' ? 'പദാവലി' : 'Glossary'}</span>
            </button>

            {/* Font Size Adjuster with Visual Feedback */}
            <div className="flex items-center bg-black/40 rounded-xl p-1 border border-emerald-700/60 text-xs">
              <button
                onClick={decreaseFontSize}
                disabled={fontSize <= 1}
                className="px-2 py-1 hover:bg-emerald-800 rounded-lg text-amber-300 font-black disabled:opacity-30 transition-colors"
                title="Decrease Font Size"
              >
                A-
              </button>
              <span className="px-1.5 text-emerald-300 font-extrabold text-[11px]">{fontSize}x</span>
              <button
                onClick={increaseFontSize}
                disabled={fontSize >= 3}
                className="px-2 py-1 hover:bg-emerald-800 rounded-lg text-amber-300 font-black disabled:opacity-30 transition-colors"
                title="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* High Contrast Mode Toggle */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              title={highContrast ? 'Normal Contrast' : 'High Contrast Mode'}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                highContrast 
                  ? 'bg-yellow-400 text-black border-yellow-300 ring-4 ring-yellow-400/50' 
                  : 'bg-emerald-900/90 text-emerald-100 border-emerald-700 hover:bg-emerald-800'
              }`}
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Sign In / Auth Button */}
            <button
              onClick={onOpenAuthModal}
              title={language === 'ml' ? 'പോർട്ടൽ ലോഗിൻ (Sign In)' : 'Citizen / Officer Sign In'}
              className="p-2 sm:px-3 sm:py-2 text-xs font-bold rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-500/50 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <LogIn className="w-4 h-4 text-purple-300" />
              <span className="hidden sm:inline">{language === 'ml' ? 'ലോഗിൻ' : 'Sign In'}</span>
            </button>

            {/* Language Switcher Button with Gradient Glow */}
            <button
              onClick={toggleLanguage}
              className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-black text-xs sm:text-sm tracking-wider shadow-md transition-all active:scale-95 border-2 border-white/60 flex items-center gap-1.5"
            >
              <span>{language === 'ml' ? 'English' : 'മലയാളം'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
