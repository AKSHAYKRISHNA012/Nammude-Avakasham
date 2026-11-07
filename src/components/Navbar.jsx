import React from 'react';
import { Volume2, VolumeX, Eye, Sparkles, PhoneCall, HelpCircle, HeartPulse } from 'lucide-react';

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
  onOpenJargonModal
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

  return (
    <header className="sticky top-0 z-50 bg-emerald-900 text-white shadow-md border-b-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <div 
            onClick={currentMode === 'rights' ? handleSwitchToRights : handleSwitchToVaidya}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-emerald-950 flex items-center justify-center font-black text-2xl shadow-inner border border-amber-300">
              {currentMode === 'vaidya' ? '🩺' : '🌴'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-xl sm:text-2xl text-amber-300 tracking-tight">
                  {currentMode === 'vaidya' ? 'വോയ്‌സ് വൈദ്യ' : 'നമ്മുടെ അവകാശം'}
                </h1>
                <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                  currentMode === 'vaidya' 
                    ? 'bg-teal-400 text-teal-950' 
                    : 'bg-amber-400 text-emerald-950'
                }`}>
                  {currentMode === 'vaidya' ? 'VoiceVaidya' : 'AI Navigator'}
                </span>
              </div>
              <p className="text-xs text-emerald-200 hidden sm:block">
                {currentMode === 'vaidya'
                  ? (language === 'ml' ? 'മുതിർന്നവർക്കുള്ള മലയാളം AI ആരോഗ്യ സഹായി' : 'Malayalam Senior Healthcare Companion')
                  : (language === 'ml' ? 'മുതിർന്നവർക്കും ഭിന്നശേഷിക്കാർക്കുമുള്ള ക്ഷേമ സഹായ വേദി' : 'Welfare Rights & Assistance for Seniors & PwD')}
              </p>
            </div>
          </div>

          {/* Central Mode Switcher: Rights vs VoiceVaidya */}
          <div className="hidden lg:flex items-center bg-emerald-950/80 p-1.5 rounded-2xl border border-emerald-700">
            <button
              onClick={handleSwitchToRights}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                currentMode === 'rights'
                  ? 'bg-amber-400 text-emerald-950 shadow-md font-black'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <span>🌴</span>
              <span>{language === 'ml' ? 'ക്ഷേമ അവകാശങ്ങൾ' : 'Welfare Rights'}</span>
            </button>

            <button
              onClick={handleSwitchToVaidya}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                currentMode === 'vaidya'
                  ? 'bg-teal-400 text-teal-950 shadow-md font-black'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'ml' ? 'വോയ്‌സ് വൈദ്യ (ആരോഗ്യം)' : 'VoiceVaidya Health'}</span>
            </button>
          </div>

          {/* Navigation Controls & Accessibility Toolbar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Jargon Glossary */}
            <button
              onClick={onOpenJargonModal}
              title={language === 'ml' ? 'സർക്കാർ പദാവലികൾ ലളിതമായി' : 'Government Jargon Simplifier'}
              className="flex items-center gap-1 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-emerald-800 hover:bg-emerald-700 text-emerald-100 border border-emerald-600 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">
                {language === 'ml' ? 'പദാവലി' : 'Jargon'}
              </span>
            </button>

            {/* Font Size Adjuster */}
            <div className="flex items-center bg-emerald-950 rounded-lg p-1 border border-emerald-800 text-xs">
              <button
                onClick={decreaseFontSize}
                disabled={fontSize <= 1}
                className="px-2 py-1 hover:bg-emerald-800 rounded text-amber-300 font-bold disabled:opacity-40"
                title="Decrease Font Size"
              >
                A-
              </button>
              <span className="px-1 text-emerald-300 font-bold">A</span>
              <button
                onClick={increaseFontSize}
                disabled={fontSize >= 3}
                className="px-2 py-1 hover:bg-emerald-800 rounded text-amber-300 font-bold disabled:opacity-40"
                title="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* High Contrast Mode */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              title={highContrast ? 'Normal Contrast' : 'High Contrast Mode'}
              className={`p-2 rounded-lg border text-xs sm:text-sm flex items-center gap-1 font-semibold transition-all ${
                highContrast 
                  ? 'bg-yellow-400 text-black border-yellow-300 ring-2 ring-yellow-400' 
                  : 'bg-emerald-800 text-emerald-100 border-emerald-700 hover:bg-emerald-700'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span className="hidden xl:inline">{language === 'ml' ? 'കോൺട്രാസ്റ്റ്' : 'Contrast'}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-emerald-950 font-black text-sm tracking-wide shadow transition-transform active:scale-95 border-2 border-amber-300 flex items-center gap-1.5"
            >
              <span>{language === 'ml' ? 'English' : 'മലയാളം'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
