import React, { useState } from 'react';
import { 
  Mic, 
  Pill, 
  FileText, 
  Stethoscope, 
  Users, 
  FileHeart, 
  HeartPulse, 
  Volume2, 
  PhoneCall, 
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { speakText } from '../../utils/speech.js';

export default function VoiceVaidyaHome({ language, onNavigateSection }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const intro_ml = "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ വോയ്‌സ് വൈദ്യ. മുതിർന്ന പൗരന്മാർക്കായി മലയാളത്തിൽ സംസാരിക്കുന്ന AI ആരോഗ്യ സഹായി. മരുന്നുകളുടെ സമയങ്ങൾ അറിയാനും, കുറിപ്പടി വായിച്ചെടുക്കാനും, ഡോക്ടറെ കാണാൻ സഹായിക്കാനും ഞാൻ കൂടെയുണ്ട്.";
  const intro_en = "Welcome to VoiceVaidya, your Malayalam AI healthcare companion for senior citizens. I help manage your medication schedules, explain doctor prescriptions, and prepare symptom notes.";

  const handlePlayIntro = () => {
    setIsPlayingAudio(true);
    speakText(language === 'ml' ? intro_ml : intro_en, language, () => {
      setIsPlayingAudio(false);
    });
  };

  const sections = [
    {
      id: 'vaidya_voice',
      number: '1',
      title_ml: 'സംസാരിക്കാം (Talk to Vaidya)',
      title_en: 'Talk to Vaidya',
      desc_ml: 'മലയാളത്തിലോ മംഗ്ലീഷിലോ സംസാരിച്ച് മരുന്നുകളെക്കുറിച്ചും ലക്ഷണങ്ങളെക്കുറിച്ചും ചോദിക്കാം.',
      desc_en: 'Natural voice assistant for health queries, dosage timings, and symptom triage.',
      icon: Mic,
      badge_ml: 'വോയ്‌സ് സഹായി',
      badge_en: 'Voice AI',
      color: 'bg-teal-700'
    },
    {
      id: 'vaidya_meds',
      number: '2',
      title_ml: 'മരുന്നുകൾ (My Medicines)',
      title_en: 'My Medicines',
      desc_ml: 'രാവിലെ, ഉച്ചയ്ക്ക്, രാത്രി കഴിക്കേണ്ട ഗുളികകളുടെ മലയാളം ശബ്ദ ഓർമ്മപ്പെടുത്തലുകൾ.',
      desc_en: 'Daily medication schedule, voice reminders, and taken/skipped adherence tracking.',
      icon: Pill,
      badge_ml: 'സമയപ്പട്ടിക',
      badge_en: 'Reminders',
      color: 'bg-emerald-700'
    },
    {
      id: 'vaidya_rx',
      number: '3',
      title_ml: 'കുറിപ്പടി (Prescription OCR)',
      title_en: 'Prescription OCR',
      desc_ml: 'ഡോക്ടറുടെ കുറിപ്പടിയുടെ ഫോട്ടോ എടുത്താൽ മരുന്നുകളും സമയങ്ങളും വായിച്ചെടുക്കുന്നു.',
      desc_en: 'Extracts medicine names and dosage timings from prescription photos with verification flags.',
      icon: FileText,
      badge_ml: 'AI സ്കാനർ',
      badge_en: 'Smart OCR',
      color: 'bg-cyan-700'
    },
    {
      id: 'vaidya_doctor',
      number: '4',
      title_ml: 'ഡോക്ടർ സന്ദർശനം (Doctor Visit)',
      title_en: 'Doctor Visit Assistant',
      desc_ml: 'ശാരീരിക ബുദ്ധിമുട്ടുകൾ സംസാരിച്ച് രേഖപ്പെടുത്തി ഡോക്ടർക്കുള്ള ക്ലിനിക്കൽ സമ്മറി ഉണ്ടാക്കാം.',
      desc_en: 'Convert voice symptoms into structured physician summaries and key question checklists.',
      icon: Stethoscope,
      badge_ml: 'സന്ദർശന സഹായി',
      badge_en: 'Consultation Brief',
      color: 'bg-indigo-700'
    },
    {
      id: 'vaidya_caregiver',
      number: '5',
      title_ml: 'കുടുംബം (My Family)',
      title_en: 'Caregiver Connection',
      desc_ml: 'വിശ്വാസമുള്ള കുടുംബാംഗങ്ങൾക്ക് മരുന്ന് ഒഴിവാക്കിയാൽ മാത്രം അനുവാദത്തോടെ അറിയിപ്പ് നൽകുന്നു.',
      desc_en: 'Permission-based caregiver access for missed medication alerts and remote prescription upload.',
      icon: Users,
      badge_ml: 'കുടുംബ സുരക്ഷ',
      badge_en: 'Caregiver Sync',
      color: 'bg-amber-600'
    },
    {
      id: 'vaidya_history',
      number: '6',
      title_ml: 'ആരോഗ്യ ചരിത്രം (Health History)',
      title_en: 'Health History & Allergies',
      desc_ml: 'പ്രമേഹം, ബി.പി തുടങ്ങിയ രോഗങ്ങളും പെൻസിലിൻ തുടങ്ങിയ മരുന്ന് അലർജികളും ഒരിടത്ത്.',
      desc_en: 'Chronic disease tracking, red-flag drug allergy warnings, and consultation history.',
      icon: FileHeart,
      badge_ml: 'അലർജി വിവരങ്ങൾ',
      badge_en: 'Allergy Records',
      color: 'bg-rose-700'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Hero Card */}
      <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border-4 border-amber-400 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 border border-teal-400/40 text-xs sm:text-sm font-semibold">
              <HeartPulse className="w-4 h-4 text-amber-300" />
              <span>{language === 'ml' ? 'മുതിർന്നവർക്കുള്ള മലയാളം AI ആരോഗ്യ സഹായി' : 'Malayalam Senior Healthcare Companion'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              വോയ്‌സ് വൈദ്യ <br />
              <span className="text-amber-300">VoiceVaidya</span>
            </h1>

            <p className="text-teal-100 text-sm sm:text-base max-w-xl leading-relaxed">
              {language === 'ml' ? intro_ml : intro_en}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 justify-center md:justify-start">
              <button
                onClick={handlePlayIntro}
                className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 ${
                  isPlayingAudio
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-teal-700/80 hover:bg-teal-600 text-amber-200 border border-amber-400/50'
                }`}
              >
                <Volume2 className="w-5 h-5" />
                <span>{isPlayingAudio ? (language === 'ml' ? 'നിർത്തുക' : 'Stop') : (language === 'ml' ? 'വിവരണം കേൾക്കുക 🔊' : 'Listen Intro 🔊')}</span>
              </button>

              <button
                onClick={() => onNavigateSection('vaidya_voice')}
                className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-teal-950 font-black text-xs sm:text-sm shadow-md flex items-center gap-2 transition-transform active:scale-95"
              >
                <Mic className="w-5 h-5 text-teal-950" />
                <span>{language === 'ml' ? 'വൈദ്യയോട് സംസാരിക്കാം' : 'Speak to Vaidya'}</span>
              </button>
            </div>
          </div>

          {/* Quick Emergency Call Button */}
          <div className="bg-rose-600/90 text-white p-6 rounded-3xl border-2 border-yellow-300 text-center shadow-xl max-w-xs flex flex-col items-center">
            <span className="text-2xl mb-1">🚨</span>
            <h4 className="font-black text-base text-yellow-200">
              {language === 'ml' ? 'അടിയന്തിര സഹായം' : 'Emergency Shortcut'}
            </h4>
            <p className="text-[11px] text-white/90 mt-1 mb-3">
              {language === 'ml' ? 'നെഞ്ചുവേദനയോ അടിയന്തിര പ്രശ്നങ്ങളോ ഉണ്ടെങ്കിൽ ഉടൻ വിളിക്കുക' : 'Immediate medical emergency dialers'}
            </p>
            <div className="flex gap-2 w-full">
              <a
                href="tel:108"
                className="flex-1 py-2 bg-yellow-400 text-rose-950 rounded-xl font-black text-xs shadow text-center"
              >
                108 ആംബുലൻസ്
              </a>
              <a
                href="tel:1056"
                className="flex-1 py-2 bg-white text-teal-900 rounded-xl font-bold text-xs shadow text-center"
              >
                1056 ദിശ
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Main Sections Grid */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
          <span>{language === 'ml' ? 'വോയ്‌സ് വൈദ്യ പ്രധാന വിഭാഗങ്ങൾ' : 'VoiceVaidya Core Modules'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.id}
                onClick={() => onNavigateSection(sec.id)}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border-2 border-gray-100 hover:border-teal-600 transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${sec.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                      {language === 'ml' ? sec.badge_ml : sec.badge_en}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-teal-700 transition-colors">
                    {language === 'ml' ? sec.title_ml : sec.title_en}
                  </h3>

                  <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    {language === 'ml' ? sec.desc_ml : sec.desc_en}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-extrabold text-teal-700">
                  <span>{language === 'ml' ? 'തുടങ്ങുക' : 'Open'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
