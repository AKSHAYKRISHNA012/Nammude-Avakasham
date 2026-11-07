import React, { useState } from 'react';
import { 
  Shield, 
  HeartPulse, 
  Mic, 
  Search, 
  CheckCircle2, 
  FileText, 
  ClipboardCheck, 
  Clock, 
  PhoneCall, 
  ArrowRight, 
  Sparkles, 
  Volume2, 
  Pill, 
  Stethoscope, 
  Users, 
  FileHeart, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Eye, 
  Accessibility, 
  AlertTriangle, 
  Check, 
  Menu, 
  X,
  ExternalLink,
  ChevronRight,
  Award,
  Globe2
} from 'lucide-react';
import { speakText } from '../utils/speech.js';

export default function LandingPage({
  language = 'ml',
  setLanguage,
  onNavigateToMode,
  onOpenAuthModal,
  onOpenLegalModal,
  onOpenJargonModal,
  highContrast = false
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [isPlayingHeroVoice, setIsPlayingHeroVoice] = useState(false);

  const toggleLanguage = () => {
    if (setLanguage) {
      setLanguage(prev => (prev === 'ml' ? 'en' : 'ml'));
    }
  };

  const handleHeroVoicePlay = () => {
    setIsPlayingHeroVoice(true);
    const textToSpeak = language === 'ml'
      ? "നമസ്കാരം! നമ്മുടെ അവകാശവും വോയ്‌സ് വൈദ്യയും സ്വാഗതം ചെയ്യുന്നു. കേരളത്തിലെ മുതിർന്ന പൗരന്മാർക്കും ഭിന്നശേഷിക്കാർക്കും സർക്കാർ ആനുകൂല്യങ്ങളും ആരോഗ്യ സംരക്ഷണവും ലളിതമായി ലഭ്യമാക്കാനുള്ള നിങ്ങളുടെ ഡിജിറ്റൽ സഹായിയാണിത്."
      : "Welcome to Nammude Avakasham and VoiceVaidya. Your accessible digital companion connecting Kerala citizens to government welfare schemes and intelligent healthcare guidance.";
    speakText(textToSpeak, language);
    setTimeout(() => setIsPlayingHeroVoice(false), 8000);
  };

  // FAQ Items (The exact 7 required questions)
  const faqData = [
    {
      q_ml: "എന്താണ് നമ്മുടെ അവകാശം? (What is Nammude Avakasham?)",
      q_en: "What is Nammude Avakasham?",
      a_ml: "കേരളത്തിലെ മുതിർന്ന പൗരന്മാർക്കും ഭിന്നശേഷിക്കാർക്കും (PwD) അർഹമായ കേന്ദ്ര-സംസ്ഥാന സർക്കാർ പെൻഷനുകളും ക്ഷേമ പദ്ധതികളും തിരിച്ചറിയാനും അപേക്ഷ തയ്യാറാക്കാനും സഹായിക്കുന്ന കൃത്രിമ ബുദ്ധി (AI) അധിഷ്ഠിത പൗരസേവന പ്ലാറ്റ്‌ഫോമാണിത്.",
      a_en: "It is an AI-powered public service platform designed specifically for senior citizens and persons with disabilities in Kerala to discover welfare schemes, check eligibility, and prepare verified application drafts in simple Malayalam."
    },
    {
      q_ml: "വോയ്‌സ് വൈദ്യ എങ്ങനെ പ്രവർത്തിക്കുന്നു? (How does VoiceVaidya work?)",
      q_en: "How does VoiceVaidya work?",
      a_ml: "വോയ്‌സ് വൈദ്യ മുതിർന്ന പൗരന്മാർക്കായി രൂപകൽപ്പന ചെയ്ത ഒരു മലയാളം ശബ്ദ സഹായിയാണ്. സംസാരിച്ചുകൊണ്ട് രോഗലക്ഷണങ്ങൾ രേഖപ്പെടുത്താനും, കുറിപ്പടികൾ (Prescriptions) വായിച്ചു മനസ്സിലാക്കാനും, കൃത്യസമയത്ത് മരുന്ന് ഓർമ്മപ്പെടുത്തലുകൾ നൽകാനും സഹായിക്കുന്നു.",
      a_en: "VoiceVaidya is a Malayalam-speaking healthcare companion that helps seniors record symptoms naturally by voice, understand doctor prescriptions via OCR, and receive automated voice medication reminders."
    },
    {
      q_ml: "മലയാള ഭാഷ പൂർണ്ണമായും പിന്തുണയ്ക്കുന്നുണ്ടോ? (Is Malayalam supported?)",
      q_en: "Is Malayalam supported?",
      a_ml: "അതെ, നമ്മുടെ അവകാശം പൂർണ്ണമായും മലയാള ഭാഷാ മുൻഗണനയോടെയാണ് നിർമ്മിച്ചിരിക്കുന്നത്. എഴുത്തും ശബ്ദ രൂപത്തിലുള്ള സംഭാഷണങ്ങളും മലയാളത്തിലും മംഗ്ലീഷിലും വ്യക്തമായി മനസ്സിലാക്കാനും പ്രതികരിക്കാനും സാധിക്കും.",
      a_en: "Yes! The platform is built Malayalam-first with native speech recognition and synthesis, understanding natural spoken Malayalam and Manglish with high accuracy."
    },
    {
      q_ml: "സർക്കാർ പദ്ധതികൾ എങ്ങനെ കണ്ടെത്താം? (Can I discover government schemes?)",
      q_en: "Can I discover government schemes?",
      a_ml: "പ്രായം, വരുമാനം, തദ്ദേശ സ്ഥാപനം, റേഷൻ കാർഡ് തരം എന്നിവ നൽകിയാൽ നിങ്ങൾക്ക് അർഹമായ ഇന്ദിരാഗാന്ധി വാർദ്ധക്യ പെൻഷൻ, ആശ്വാസകിരണം, വയോമിത്രം തുടങ്ങിയ 75-ൽ അധികം പദ്ധതികൾ തൽക്ഷണം കണ്ടെത്താം.",
      a_en: "By answering simple questions regarding age, locality, disability percentage, and ration card type, the platform instantly maps eligibility across over 75 Central and Kerala Government schemes."
    },
    {
      q_ml: "എന്റെ സ്വകാര്യ വിവരങ്ങൾ സുരക്ഷിതമാണോ? (Is my personal information protected?)",
      q_en: "Is my personal information protected?",
      a_ml: "പൂർണ്ണമായും സുരക്ഷിതമാണ്. ഇന്ത്യയുടെ ഡിജിറ്റൽ പേഴ്‌സണൽ ഡാറ്റ പ്രൊട്ടക്ഷൻ (DPDP 2023) നിയമം അനുസരിച്ച് ഡാറ്റ മിനിമൈസേഷൻ രീതിയാണ് ഞങ്ങൾ പിന്തുടരുന്നത്. നിങ്ങളുടെ രേഖകളോ ആരോഗ്യ വിവരങ്ങളോ വാണിജ്യ ആവശ്യങ്ങൾക്ക് പങ്കിടില്ല.",
      a_en: "Yes. Architecture strictly complies with India's DPDP Act 2023 using zero-client secrets and strict data minimization. Health logs and documents remain completely private and never sold."
    },
    {
      q_ml: "വോയ്‌സ് വൈദ്യ ഡോക്ടർക്ക് പകരമാണോ? (Does VoiceVaidya replace a doctor?)",
      q_en: "Does VoiceVaidya replace a doctor?",
      a_ml: "അല്ല! വോയ്‌സ് വൈദ്യ ഒരു ഡിജിറ്റൽ സഹായി മാത്രമാണ്. രോഗനിർണ്ണയം നടത്താനോ പുതിയ മരുന്നുകൾ നിർദ്ദേശിക്കാനോ സാധിക്കില്ല. അടിയന്തര ഘട്ടങ്ങളിൽ 108 ആംബുലൻസും 1056 ദിശ ഹെൽപ്പ്‌ലൈനും ബന്ധപ്പെടാനുള്ള സൗകര്യം ഇതിലുണ്ട്.",
      a_en: "No. VoiceVaidya does not diagnose conditions or independently prescribe drugs. It aids symptom communication, prescription clarity, and medication adherence. Emergency red-flag symptoms immediately trigger 108 and 1056 helplines."
    },
    {
      q_ml: "മുതിർന്ന പൗരന്മാർക്ക് ഇത് ഒറ്റയ്ക്ക് ഉപയോഗിക്കാൻ സാധിക്കുമോ? (Can senior citizens use it?)",
      q_en: "Can senior citizens use the platform?",
      a_ml: "തീർച്ചയായും! ടൈപ്പ് ചെയ്യേണ്ട ആവശ്യമില്ലാതെ വലിയ മൈക്രോഫോൺ ബട്ടണിലൂടെ സംസാരിച്ച് ഉപയോഗിക്കാം. കൂടാതെ വലിയ അക്ഷരങ്ങളും (A+) ഉയർന്ന കോൺട്രാസ്റ്റ് മോഡും കാഴ്ചാ പരിമിതി ഉള്ളവർക്ക് സൗകര്യപ്രദമാണ്.",
      a_en: "Absolutely. Designed with senior-friendly ergonomics: no typing required, oversized voice buttons, crystal-clear audio narration, high-contrast visibility, and adjustable font scaling up to 3x."
    }
  ];

  // Core Services List
  const coreServices = [
    {
      id: 'schemes',
      icon: Search,
      title_ml: 'ക്ഷേമ പദ്ധതി കണ്ടെത്തൽ',
      title_en: 'Scheme Discovery',
      desc_ml: 'കേന്ദ്ര-സംസ്ഥാന സർക്കാരുകളുടെ 75+ സാമൂഹിക ക്ഷേമ പദ്ധതികളിൽ നിന്ന് അർഹമായവ കണ്ടെത്തുക.',
      desc_en: 'Explore over 75 verified Central and Kerala Government social security welfare schemes.',
      badge_ml: '75+ പദ്ധതികൾ',
      badge_en: '75+ Schemes',
      action: () => onNavigateToMode('rights', 'schemes')
    },
    {
      id: 'eligibility',
      icon: CheckCircle2,
      title_ml: 'അർഹതാ പരിശോധന',
      title_en: 'Eligibility Assessment',
      desc_ml: 'പ്രായം, ഭിന്നശേഷി, വരുമാനം എന്നിവ നൽകി 2 മിനിറ്റിനുള്ളിൽ അർഹതാ സ്കോർ അറിയുക.',
      desc_en: 'Instant 5-step interactive eligibility evaluation with transparent criteria matching.',
      badge_ml: '5 ഘട്ടങ്ങൾ',
      badge_en: '5-Step Wizard',
      action: () => onNavigateToMode('rights', 'eligibility')
    },
    {
      id: 'companion',
      icon: ClipboardCheck,
      title_ml: 'അപേക്ഷാ സഹായം',
      title_en: 'Application Guidance',
      desc_ml: 'അക്ഷയ കേന്ദ്രങ്ങളിൽ നേരിട്ട് നൽകാവുന്ന പൂർണ്ണമായ അപേക്ഷാ ഡ്രാഫ്റ്റ് സ്വയം തയ്യാറാക്കുക.',
      desc_en: 'Prepare formatted Akshaya-ready draft forms with mandatory biometric guidance.',
      badge_ml: 'അക്ഷയ ഫോർമാറ്റ്',
      badge_en: 'Akshaya Ready',
      action: () => onNavigateToMode('rights', 'companion')
    },
    {
      id: 'documents',
      icon: FileText,
      title_ml: 'രേഖാ പരിശോധന (AI OCR)',
      title_en: 'Document Intelligence',
      desc_ml: 'റേഷൻ കാർഡ്, ആധാർ, മെഡിക്കൽ സർട്ടിഫിക്കറ്റ് എന്നിവ പരിശോധിച്ച് വ്യക്തത ഉറപ്പാക്കുക.',
      desc_en: 'Intelligent OCR analysis for Ration Cards, Aadhaar, and 40%+ Disability Certificates.',
      badge_ml: 'AI സ്കാനിംഗ്',
      badge_en: 'OCR Intelligence',
      action: () => onNavigateToMode('rights', 'documents')
    },
    {
      id: 'tracking',
      icon: Clock,
      title_ml: 'അപേക്ഷാ ട്രാക്കിംഗ്',
      title_en: 'Application Tracking',
      desc_ml: 'പഞ്ചായത്ത് വെരിഫിക്കേഷൻ മുതൽ പെൻഷൻ വിതരണം വരെയുള്ള തത്സമയ സ്റ്റാറ്റസ് അറിയുക.',
      desc_en: 'Live stage-by-stage tracking with automated Annual Mustering deadline alerts.',
      badge_ml: 'ലൈവ് സ്റ്റാറ്റസ്',
      badge_en: 'Realtime Steps',
      action: () => onNavigateToMode('rights', 'tracking')
    },
    {
      id: 'voice',
      icon: Mic,
      title_ml: 'ശബ്ദ സംഭാഷണ സഹായി',
      title_en: 'Voice-Based Assistance',
      desc_ml: 'ടൈപ്പ് ചെയ്യാതെ സ്വാഭാവിക മലയാളത്തിൽ സംസാരിച്ച് സംശയങ്ങൾ പരിഹരിക്കുക.',
      desc_en: 'Natural two-way spoken Malayalam and English conversational AI interaction.',
      badge_ml: 'ശബ്ദ സൗകര്യം',
      badge_en: 'Voice AI',
      action: () => onNavigateToMode('rights', 'voice')
    },
    {
      id: 'assistance',
      icon: PhoneCall,
      title_ml: 'സഹായ സേവനങ്ങൾ (Helplines)',
      title_en: 'Citizen Rights & Helplines',
      desc_ml: 'മുതിർന്ന പൗര ഹെൽപ്പ്‌ലൈൻ (14567), സാമൂഹ്യനീതി, അക്ഷയ ഡയറക്ടറി എന്നിവ ബന്ധപ്പെടുക.',
      desc_en: 'Direct access to Senior Helpline 14567, Social Justice Dept, and local Akshaya desks.',
      badge_ml: '24x7 സേവനം',
      badge_en: 'Toll-Free',
      action: () => onNavigateToMode('rights', 'assistance')
    }
  ];

  return (
    <div className={`min-h-screen ${highContrast ? 'high-contrast' : 'bg-[#FAF8F5] text-stone-900'}`}>
      
      {/* ─────────────────────────────────────────────────────────────
          SECTION A: STICKY NAVIGATION BAR
      ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#064e3b]/95 backdrop-blur-xl border-b-2 border-amber-400/80 shadow-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo & Title */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3.5 cursor-pointer group select-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-emerald-950 flex items-center justify-center font-black text-2xl shadow-lg border-2 border-white/80 group-hover:scale-105 transition-transform">
                🌴
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                    {language === 'ml' ? 'നമ്മുടെ അവകാശം' : 'Nammude Avakasham'}
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-emerald-950 shadow-sm">
                    & VoiceVaidya
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200/90 font-medium hidden sm:block">
                  {language === 'ml' ? 'ഡിജിറ്റൽ ശാക്തീകരണം ഓരോ മലയാളിക്കും' : 'Digital Empowerment for Every Keralite'}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-emerald-100">
              <a href="#about" className="hover:text-amber-300 transition-colors">
                {language === 'ml' ? 'ഞങ്ങളെക്കുറിച്ച്' : 'About'}
              </a>
              <a href="#services" className="hover:text-amber-300 transition-colors">
                {language === 'ml' ? 'സേവനങ്ങൾ' : 'Services'}
              </a>
              <a href="#voicevaidya" className="hover:text-teal-300 text-teal-200 font-bold flex items-center gap-1.5 transition-colors">
                <HeartPulse className="w-4 h-4 text-teal-300" />
                <span>VoiceVaidya</span>
              </a>
              <a href="#how-it-works" className="hover:text-amber-300 transition-colors">
                {language === 'ml' ? 'പ്രവർത്തനം' : 'How It Works'}
              </a>
              <a href="#accessibility" className="hover:text-amber-300 transition-colors">
                {language === 'ml' ? 'ലളിത പ്രവേശനം' : 'Accessibility'}
              </a>
              <a href="#faq" className="hover:text-amber-300 transition-colors">
                {language === 'ml' ? 'ചോദ്യങ്ങൾ' : 'FAQ'}
              </a>
            </nav>

            {/* Top Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="px-3 py-1.5 rounded-xl bg-emerald-900/90 hover:bg-emerald-800 text-amber-300 border border-emerald-700 font-bold text-xs transition-all active:scale-95 flex items-center gap-1"
                title="Switch Language"
              >
                <Globe2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'ml' ? 'English' : 'മലയാളം'}</span>
              </button>

              {/* Sign In CTA */}
              <button
                onClick={onOpenAuthModal}
                className="px-3.5 py-1.5 rounded-xl bg-black/40 hover:bg-black/60 text-white border border-amber-400/40 font-bold text-xs transition-all active:scale-95 flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'ml' ? 'ലോഗിൻ' : 'Sign In'}</span>
              </button>

              {/* Primary Get Started Button */}
              <button
                onClick={() => onNavigateToMode('rights', 'dashboard')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-emerald-950 font-black text-xs sm:text-sm tracking-wide shadow-md border-2 border-white/60 transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span>{language === 'ml' ? 'ആരംഭിക്കാം' : 'Get Started'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1 rounded-lg bg-emerald-900 text-amber-300 text-xs font-bold border border-emerald-700"
              >
                {language === 'ml' ? 'EN' : 'മല'}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-emerald-900 text-white border border-emerald-700 active:scale-95"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-[#053d2e] border-t border-emerald-700/80 px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <nav className="flex flex-col gap-2 font-semibold text-sm text-emerald-100">
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-emerald-800"
              >
                {language === 'ml' ? 'ഞങ്ങളെക്കുറിച്ച് (About)' : 'About Us'}
              </a>
              <a 
                href="#services" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-emerald-800"
              >
                {language === 'ml' ? 'ക്ഷേമ സേവനങ്ങൾ (Services)' : 'Services'}
              </a>
              <a 
                href="#voicevaidya" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg bg-teal-900/60 text-teal-200 flex items-center gap-2"
              >
                <HeartPulse className="w-4 h-4 text-teal-300" />
                <span>VoiceVaidya Healthcare</span>
              </a>
              <a 
                href="#how-it-works" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-emerald-800"
              >
                {language === 'ml' ? 'പ്രവർത്തനം (How it Works)' : 'How It Works'}
              </a>
              <a 
                href="#accessibility" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-emerald-800"
              >
                {language === 'ml' ? 'ആക്സസിബിലിറ്റി (Accessibility)' : 'Accessibility'}
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-emerald-800"
              >
                {language === 'ml' ? 'ചോദ്യങ്ങൾ (FAQ)' : 'FAQ'}
              </a>
            </nav>

            <div className="pt-3 border-t border-emerald-800/80 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal();
                }}
                className="w-full py-2.5 rounded-xl bg-black/40 text-amber-300 font-bold text-xs border border-amber-400/30 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>{language === 'ml' ? 'പോർട്ടൽ ലോഗിൻ' : 'Portal Sign In'}</span>
              </button>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToMode('rights', 'dashboard');
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-black text-xs shadow-md flex items-center justify-center gap-2"
              >
                <span>{language === 'ml' ? 'സേവനങ്ങൾ ആരംഭിക്കാം' : 'Launch Platform'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>


      {/* ─────────────────────────────────────────────────────────────
          SECTION B: HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-[#064e3b] via-[#043d2e] to-[#FAF8F5]">
        
        {/* Subtle decorative Kasavu Gold wave rings */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] h-[70vh] rounded-[100%] bg-emerald-700/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-amber-400/10 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Trust Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/90 border border-amber-400/40 shadow-sm text-xs text-amber-300 font-bold">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{language === 'ml' ? 'കേരള ജനതയ്ക്കായി സമർപ്പിതം' : 'Dedicated to Kerala Citizens & Seniors'}</span>
                <span className="text-amber-400">🌴</span>
              </div>

              {/* Exact Master Prompt Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
                {language === 'ml' 
                  ? "നിങ്ങളുടെ അവകാശങ്ങൾ. നിങ്ങളുടെ ആരോഗ്യം. നിങ്ങളുടെ ഡിജിറ്റൽ സഹായി."
                  : "Your Rights. Your Healthcare. Your Digital Companion."}
              </h1>

              {/* Exact Master Prompt Supporting Text */}
              <p className="text-base sm:text-xl text-emerald-100/90 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {language === 'ml'
                  ? "കേരളത്തിലെ പൗരന്മാർക്ക് അത്യാവശ്യമായ സർക്കാർ ക്ഷേമ പദ്ധതികളും നൂതന ആരോഗ്യ സഹായങ്ങളും മലയാളത്തിലും ഇംഗ്ലീഷിലും ലഭ്യമാക്കുന്ന ഏകജാലക ഡിജിറ്റൽ വേദി."
                  : "One accessible platform connecting Kerala citizens to essential government services and intelligent healthcare assistance — in Malayalam and English."}
              </p>

              {/* Hero Voice Readout Button */}
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={handleHeroVoicePlay}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all shadow-md ${
                    isPlayingHeroVoice 
                      ? 'bg-amber-400 text-emerald-950 ring-4 ring-amber-300/40 animate-pulse'
                      : 'bg-emerald-950/80 text-amber-300 border border-amber-400/40 hover:bg-emerald-900'
                  }`}
                >
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span>
                    {isPlayingHeroVoice 
                      ? (language === 'ml' ? 'ശബ്ദം കേൾക്കുന്നു...' : 'Playing Malayalam Voice...') 
                      : (language === 'ml' ? 'ഈ സന്ദേശം കേൾക്കാം' : 'Listen in Malayalam Voice')}
                  </span>
                </button>
              </div>

              {/* Primary & Secondary Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigateToMode('rights', 'dashboard')}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-emerald-950 font-black text-base shadow-xl border-2 border-white/80 active:scale-95 transition-all flex items-center justify-center gap-3 group"
                >
                  <span>{language === 'ml' ? 'സേവനങ്ങൾ പരിശോധിക്കുക' : 'Explore Services'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigateToMode('vaidya', 'vaidya_home')}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#047857]/90 hover:bg-[#059669] text-white font-black text-base shadow-lg border-2 border-emerald-400/50 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <HeartPulse className="w-5 h-5 text-teal-300" />
                  <span>{language === 'ml' ? 'വോയ്‌സ് വൈദ്യയെ പരിചയപ്പെടാം' : 'Meet VoiceVaidya'}</span>
                </button>
              </div>

              {/* Fast Features Ticker */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-emerald-200/80 font-bold">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-amber-400 stroke-[3]" />
                  {language === 'ml' ? '75+ പരിശോധിച്ചുറപ്പിച്ച പദ്ധതികൾ' : '75+ Verified Welfare Schemes'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-amber-400 stroke-[3]" />
                  {language === 'ml' ? 'മലയാളം ശബ്ദ സംഭാഷണം' : 'Malayalam Spoken Voice'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-amber-400 stroke-[3]" />
                  {language === 'ml' ? '100% സ്വകാര്യതാ സുരക്ഷ' : 'DPDP 2023 Privacy'}
                </span>
              </div>

            </div>

            {/* Right Column: Premium Live Dashboard Interactive Preview */}
            <div className="lg:col-span-5 relative">
              
              {/* Floating Service Card 1 (Top Right) */}
              <div className="absolute -top-6 -right-4 sm:-right-6 z-20 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl border border-emerald-200/80 flex items-center gap-3 transform rotate-1 hover:rotate-0 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    {language === 'ml' ? 'സാമൂഹിക സുരക്ഷ' : 'Social Security'}
                  </p>
                  <p className="text-xs font-black text-emerald-900">
                    ₹1,600 / {language === 'ml' ? 'മാസം പെൻഷൻ' : 'Month Pension'}
                  </p>
                </div>
              </div>

              {/* Main Preview Glass Container */}
              <div className="bg-[#022c22]/95 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 border-2 border-amber-400/50 shadow-2xl space-y-4">
                
                {/* Simulated Header */}
                <div className="flex items-center justify-between pb-3 border-b border-emerald-800/80">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🌴</span>
                    <div>
                      <p className="text-xs font-black text-white">
                        {language === 'ml' ? 'പൗര ഡാഷ്‌ബോർഡ്' : 'Citizen Companion'}
                      </p>
                      <p className="text-[10px] text-emerald-300">
                        {language === 'ml' ? 'തത്സമയ പരിശോധന സജ്ജം' : 'Live & Verified'}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-900 text-amber-300 text-[10px] font-black border border-amber-400/30">
                    ml-IN 100%
                  </span>
                </div>

                {/* Simulated Voice Waveform Box */}
                <div className="bg-emerald-950/80 rounded-2xl p-4 border border-emerald-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Mic className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">
                        {language === 'ml' ? '"എനിക്ക് അർഹമായ പെൻഷനുകൾ ഏതൊക്കെ?"' : '"Which pensions am I eligible for?"'}
                      </p>
                      <p className="text-[10px] text-emerald-300">
                        {language === 'ml' ? 'മലയാളം ശബ്ദ വിശകലനം പൂർത്തിയായി' : 'Spoken Malayalam parsed in 420ms'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-end gap-1 h-6">
                    <div className="w-1 bg-amber-400 rounded-full wave-bar-1" />
                    <div className="w-1 bg-amber-400 rounded-full wave-bar-2" />
                    <div className="w-1 bg-amber-400 rounded-full wave-bar-3" />
                    <div className="w-1 bg-amber-400 rounded-full wave-bar-4" />
                    <div className="w-1 bg-amber-400 rounded-full wave-bar-5" />
                  </div>
                </div>

                {/* Simulated Scheme Recommendation Result */}
                <div className="space-y-2.5">
                  <p className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                    {language === 'ml' ? 'കണ്ടെത്തിയ മുഖ്യ ആനുകൂല്യങ്ങൾ' : 'Eligible Schemes Found'}
                  </p>

                  <div className="bg-white/10 hover:bg-white/15 transition-colors rounded-xl p-3 border border-white/10 flex items-center justify-between cursor-pointer"
                       onClick={() => onNavigateToMode('rights', 'schemes')}>
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">👵</span>
                      <div>
                        <p className="text-xs font-black text-white">
                          {language === 'ml' ? 'ഇന്ദിരാഗാന്ധി ദേശീയ വാർദ്ധക്യ പെൻഷൻ' : 'National Old Age Pension (IGNOAP)'}
                        </p>
                        <p className="text-[10px] text-emerald-300">
                          {language === 'ml' ? '60 വയസ്സ് + BPL / മുൻഗണനാ കാർഡ്' : '60+ yrs, Pink PHH/BPL Card'}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-amber-400" />
                  </div>

                  <div className="bg-white/10 hover:bg-white/15 transition-colors rounded-xl p-3 border border-white/10 flex items-center justify-between cursor-pointer"
                       onClick={() => onNavigateToMode('vaidya', 'vaidya_meds')}>
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">💊</span>
                      <div>
                        <p className="text-xs font-black text-white">
                          {language === 'ml' ? 'വോയ്‌സ് വൈദ്യ മരുന്ന് ഓർമ്മപ്പെടുത്തൽ' : 'VoiceVaidya Daily Medication'}
                        </p>
                        <p className="text-[10px] text-teal-300">
                          {language === 'ml' ? 'രാവിലെ 8:30 – ബിപി ഗുളിക കഴിച്ചു' : '8:30 AM – Telmisartan (Taken)'}
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-300 text-[10px] font-black">
                      {language === 'ml' ? 'കൃത്യം' : 'Active'}
                    </span>
                  </div>
                </div>

                {/* Direct Action Inside Preview */}
                <div className="pt-2">
                  <button
                    onClick={() => onNavigateToMode('rights', 'eligibility')}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-black text-xs flex items-center justify-center gap-2 shadow"
                  >
                    <span>{language === 'ml' ? 'അർഹതാ വിസാർഡ് തുറക്കുക' : 'Check Your Eligibility Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Floating Service Card 2 (Bottom Left) */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 z-20 bg-emerald-950 text-white p-3.5 rounded-2xl shadow-xl border-2 border-emerald-400/40 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-400/20 text-teal-300 flex items-center justify-center">
                  <HeartPulse className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <p className="text-[10px] text-emerald-300 font-bold uppercase">
                    {language === 'ml' ? 'ആരോഗ്യ സഹായി' : 'VoiceVaidya'}
                  </p>
                  <p className="text-xs font-black text-white">
                    {language === 'ml' ? 'കുറിപ്പടി സ്കാൻ ചെയ്യാം' : 'Prescription OCR Ready'}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION C: TRUST & IMPACT SECTION
      ───────────────────────────────────────────────────────────── */}
      <section id="about" className="py-16 bg-white border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {language === 'ml' ? 'വിശ്വാസ്യതയും ലക്ഷ്യവും' : 'Trust, Ethics & Architecture'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              {language === 'ml' 
                ? 'ജനപക്ഷ സേവനം, ആധുനിക സാങ്കേതികവിദ്യയുടെ കരുത്തിൽ' 
                : 'Citizen-Centric Digital Public Infrastructure'}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-medium">
              {language === 'ml'
                ? 'സർക്കാർ ഓഫീസുകൾ കയറിയിറങ്ങാതെയും ഇടനിലക്കാരുടെ ചൂഷണമില്ലാതെയും അവകാശങ്ങൾ സുതാര്യമായി വിരൽത്തുമ്പിൽ എത്തിക്കുന്നു.'
                : 'Eliminating paperwork hurdles, complex jargon, and bureaucratic barriers for every senior citizen and differently-abled individual.'}
            </p>
          </div>

          {/* 5 Pillars of Trust */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-2 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                🌴
              </div>
              <h3 className="font-black text-stone-900 text-sm">
                {language === 'ml' ? 'പൗര ശാക്തീകരണം' : 'Citizen Empowerment'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {language === 'ml' 
                  ? 'പെൻഷനുകളും ധനസഹായങ്ങളും അർഹരായവരിലേക്ക് തടസ്സമില്ലാതെ എത്തിക്കുന്നു.'
                  : 'Empowering marginalized seniors and PwD citizens to independently claim statutory rights.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-2 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Mic className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-black text-stone-900 text-sm">
                {language === 'ml' ? 'മലയാളം മുൻഗണന' : 'Malayalam-First UX'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {language === 'ml'
                  ? 'മാതൃഭാഷയിൽ സംസാരിച്ച് കാര്യങ്ങൾ ചോദിച്ചറിയാനും നിർദ്ദേശങ്ങൾ സ്വീകരിക്കാനും സാധിക്കും.'
                  : 'Spoken dialect recognition and phonetics tailored for seniors who struggle with typing.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-2 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="font-black text-stone-900 text-sm">
                {language === 'ml' ? 'സ്വകാര്യതാ സംരക്ഷണം' : 'Privacy Architecture'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {language === 'ml'
                  ? 'DPDP 2023 മാനദണ്ഡങ്ങൾ പാലിച്ച് ഡാറ്റ എൻക്രിപ്റ്റ് ചെയ്തു സുരക്ഷിതമായി സൂക്ഷിക്കുന്നു.'
                  : 'Zero client-side secrets enclave; sensitive health & Aadhaar data strictly protected.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-2 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <HeartPulse className="w-5 h-5 text-teal-700" />
              </div>
              <h3 className="font-black text-stone-900 text-sm">
                {language === 'ml' ? 'ആരോഗ്യ പരിപാലനം' : 'AI Health Guidance'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {language === 'ml'
                  ? 'ഡോക്ടറുടെ കുറിപ്പടികളും മരുന്ന് സമയക്രമങ്ങളും ലളിതമായ ഭാഷയിൽ വിശദീകരിക്കുന്നു.'
                  : 'VoiceVaidya engine assists prescription understanding and family caregiver updates.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-2 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                <Accessibility className="w-5 h-5 text-purple-700" />
              </div>
              <h3 className="font-black text-stone-900 text-sm">
                {language === 'ml' ? 'സമഗ്ര പ്രവേശനക്ഷമത' : 'Universal Access'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {language === 'ml'
                  ? 'ഹൈ കോൺട്രാസ്റ്റ്, വലിയ അക്ഷരങ്ങൾ, സ്ക്രീൻ റീഡർ പിന്തുണ ഉറപ്പാക്കിയിട്ടുണ്ട്.'
                  : 'WCAG 2.1 AA accessible with high contrast, 3x font scaling, and keyboard navigation.'}
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION D: CORE SERVICES SECTION
      ───────────────────────────────────────────────────────────── */}
      <section id="services" className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300">
                {language === 'ml' ? 'ഞങ്ങളുടെ സേവനങ്ങൾ' : 'Core Capabilities'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
                {language === 'ml' ? 'നിങ്ങളുടെ അവകാശങ്ങൾ കണ്ടെത്താം' : 'Essential Welfare & Citizen Services'}
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-medium max-w-xl">
                {language === 'ml'
                  ? 'സങ്കീർണ്ണമായ സർക്കാർ നടപടിക്രമങ്ങൾ ഒഴിവാക്കി എളുപ്പത്തിൽ പ്രയോജനപ്പെടുത്താവുന്ന പ്രധാന സൗകര്യങ്ങൾ.'
                  : 'Click any service below to launch the live interactive workflow directly.'}
              </p>
            </div>

            <button
              onClick={() => onNavigateToMode('rights', 'dashboard')}
              className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-emerald-950 text-white hover:bg-emerald-900 font-bold text-xs flex items-center gap-2 shadow"
            >
              <span>{language === 'ml' ? 'മുഴുവൻ ഡാഷ്‌ബോർഡ് കാണുക' : 'Open Full Dashboard'}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  onClick={service.action}
                  className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-soft hover:shadow-elevated hover:border-emerald-500/60 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 group-hover:bg-amber-400 group-hover:text-emerald-950 transition-colors flex items-center justify-center font-bold">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                        {language === 'ml' ? service.badge_ml : service.badge_en}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-stone-900 group-hover:text-emerald-900 transition-colors">
                        {language === 'ml' ? service.title_ml : service.title_en}
                      </h3>
                      <p className="text-xs text-stone-600 font-medium leading-relaxed mt-1.5">
                        {language === 'ml' ? service.desc_ml : service.desc_en}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-stone-100 mt-6 flex items-center justify-between text-xs font-black text-emerald-800 group-hover:text-amber-600 transition-colors">
                    <span>{language === 'ml' ? 'തുടങ്ങുക (Launch)' : 'Start Service'}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION E: VOICEVAIDYA HEALTHCARE SPOTLIGHT
      ───────────────────────────────────────────────────────────── */}
      <section id="voicevaidya" className="py-20 bg-gradient-to-b from-[#022c22] to-[#043d2e] text-white relative overflow-hidden">
        
        {/* Ambient Teal Backlight */}
        <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: VoiceVaidya Vision & Features */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-900/60 border border-teal-400/40 text-teal-300 text-xs font-black">
                <HeartPulse className="w-4 h-4 text-teal-300 animate-pulse" />
                <span>VOICEVAIDYA AI COMPANION</span>
              </div>

              {/* Exact Master Prompt Headline */}
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {language === 'ml'
                  ? "നിങ്ങളുടെ സ്വന്തം ഭാഷയിൽ സംസാരിക്കുന്ന ആരോഗ്യ സഹായി."
                  : "Healthcare Assistance That Speaks Your Language."}
              </h2>

              <p className="text-sm sm:text-base text-emerald-100/90 font-medium leading-relaxed">
                {language === 'ml'
                  ? "മുതിർന്ന പൗരന്മാർക്ക് മരുന്നുകൾ കൃത്യസമയത്ത് കഴിക്കാനും, കുറിപ്പടികൾ മനസ്സിലാക്കാനും, ഡോക്ടറെ കാണാൻ പോകുമ്പോൾ ചോദിക്കേണ്ട കാര്യങ്ങൾ ചിട്ടപ്പെടുത്താനും സഹായിക്കുന്ന മലയാളം ആരോഗ്യ കൂട്ടുകാരൻ."
                  : "Designed specifically for elderly citizens in Kerala to manage medications, simplify complex prescriptions, and communicate symptoms with comfort and dignity."}
              </p>

              {/* Feature Grid with Lucide Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-teal-300 font-bold text-xs">
                    <Mic className="w-4 h-4 text-amber-400" />
                    <span>{language === 'ml' ? 'മലയാളം ശബ്ദ സംഭാഷണം' : 'Malayalam Spoken Voice'}</span>
                  </div>
                  <p className="text-[11px] text-emerald-200/80">
                    {language === 'ml' ? 'ലക്ഷണങ്ങൾ മലയാളത്തിൽ പറഞ്ഞാൽ മതി' : 'Natural voice input with instant audio replay'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-teal-300 font-bold text-xs">
                    <FileText className="w-4 h-4 text-teal-300" />
                    <span>{language === 'ml' ? 'കുറിപ്പടി വിശകലനം (OCR)' : 'Prescription OCR'}</span>
                  </div>
                  <p className="text-[11px] text-emerald-200/80">
                    {language === 'ml' ? 'ഡോക്ടറുടെ കുറിപ്പടി ലളിതമായി മനസ്സിലാക്കാം' : 'Extract dosage & timing without guessing'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-teal-300 font-bold text-xs">
                    <Pill className="w-4 h-4 text-amber-400" />
                    <span>{language === 'ml' ? 'മരുന്ന് ഓർമ്മപ്പെടുത്തൽ' : 'Smart Voice Reminders'}</span>
                  </div>
                  <p className="text-[11px] text-emerald-200/80">
                    {language === 'ml' ? 'ശബ്ദ സന്ദേശങ്ങളിലൂടെ കൃത്യമായ അലർട്ടുകൾ' : 'Daily audio notifications with taken/skipped logs'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-teal-300 font-bold text-xs">
                    <Users className="w-4 h-4 text-teal-300" />
                    <span>{language === 'ml' ? 'കുടുംബ പങ്കാളിത്തം' : 'Caregiver Sync'}</span>
                  </div>
                  <p className="text-[11px] text-emerald-200/80">
                    {language === 'ml' ? 'മരുന്ന് കഴിച്ച വിവരം മക്കൾക്കും അറിയാം' : 'Notifies family only with user consent'}
                  </p>
                </div>

              </div>

              {/* Mandatory Medical Safety Disclaimer Box */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-400/40 text-amber-200 text-xs space-y-1">
                <div className="flex items-center gap-2 font-black text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>{language === 'ml' ? 'പ്രധാന മെഡിക്കൽ സുരക്ഷാ നിർദ്ദേശം' : 'Essential Medical Safety Notice'}</span>
                </div>
                <p className="text-[11px] text-amber-100/90 leading-relaxed font-medium">
                  {language === 'ml'
                    ? "വോയ്‌സ് വൈദ്യ ഒരു അംഗീകൃത ഡോക്ടർക്ക് പകരമല്ല. ഇത് പുതിയ രോഗനിർണ്ണയമോ മരുന്ന് നിർദ്ദേശങ്ങളോ നൽകില്ല. അടിയന്തര സാഹചര്യങ്ങളിൽ ഉടൻ തന്നെ 108 ആംബുലൻസോ 1056 ദിശ ഹെൽപ്പ്‌ലൈനോ വിളിക്കുക."
                    : "VoiceVaidya is an assistive companion, not a licensed physician. It never independently prescribes medications or provides diagnostic finality. In medical emergencies, immediately dial 108 (Ambulance) or 1056 (DISHA Kerala)."}
                </p>
              </div>

              {/* Launch VoiceVaidya CTA */}
              <div className="pt-2">
                <button
                  onClick={() => onNavigateToMode('vaidya', 'vaidya_home')}
                  className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-teal-950 font-black text-sm tracking-wide shadow-xl active:scale-95 transition-all flex items-center gap-3"
                >
                  <HeartPulse className="w-5 h-5 text-teal-900" />
                  <span>{language === 'ml' ? 'വോയ്‌സ് വൈദ്യ തുറക്കുക' : 'Launch VoiceVaidya Assistant'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right Column: Interactive VoiceVaidya Mockup Screen */}
            <div className="lg:col-span-6">
              <div className="bg-[#031d16] rounded-3xl p-6 border-2 border-teal-500/40 shadow-2xl space-y-4">
                
                {/* Vaidya Top Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-teal-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
                      🩺
                    </div>
                    <div>
                      <p className="text-sm font-black text-white">
                        {language === 'ml' ? 'വോയ്‌സ് വൈദ്യ ചാറ്റ്' : 'VoiceVaidya Active Session'}
                      </p>
                      <p className="text-[10px] text-teal-400 font-bold">
                        {language === 'ml' ? 'തത്സമയ ശബ്ദ സഹായം' : 'Malayalam Audio Online'}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-red-950/80 text-red-300 text-[10px] font-bold border border-red-500/40 flex items-center gap-1">
                    <span>108 / 1056</span>
                  </span>
                </div>

                {/* Simulated Conversation Feed */}
                <div className="space-y-3 py-2 text-xs">
                  {/* User Bubble */}
                  <div className="flex items-start justify-end gap-2">
                    <div className="bg-teal-900/80 text-teal-100 p-3 rounded-2xl rounded-tr-none max-w-xs border border-teal-700/60 font-medium">
                      <p>{language === 'ml' ? '"എനിക്ക് ഇന്നലെ രാത്രി മുതൽ തലവേദനയുണ്ട്, രക്തസമ്മർദ്ദത്തിന്റെ ഗുളിക കഴിക്കണോ?"' : '"I have had a headache since last night, should I take my BP medicine?"'}</p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-emerald-700 flex items-center justify-center text-xs font-bold">
                      👵
                    </div>
                  </div>

                  {/* AI Vaidya Response */}
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-teal-500/30 text-teal-300 flex items-center justify-center text-xs font-bold">
                      🩺
                    </div>
                    <div className="bg-white/10 text-white p-3.5 rounded-2xl rounded-tl-none max-w-sm border border-white/10 space-y-2">
                      <p className="leading-relaxed">
                        {language === 'ml'
                          ? "ഡോക്ടർ നിർദ്ദേശിച്ച രക്തസമ്മർദ്ദത്തിന്റെ മരുന്ന് (Telmisartan 40mg) രാവിലെ 8:30 ന് കൃത്യമായി കഴിക്കേണ്ടതാണ്. കടുത്ത കാഴ്ച മങ്ങലോ നെഞ്ചുവേദനയോ ഉണ്ടെങ്കിൽ ഉടനടി ആശുപത്രിയിൽ പോകേണ്ടതാണ്."
                          : "Your prescribed BP tablet (Telmisartan 40mg) is scheduled daily at 8:30 AM with water. If severe dizziness or chest tightness occurs, please notify someone immediately or dial 108."}
                      </p>
                      
                      <div className="flex items-center gap-2 pt-1">
                        <button 
                          onClick={() => speakText(
                            language === 'ml'
                              ? "ഡോക്ടർ നിർദ്ദേശിച്ച രക്തസമ്മർദ്ദത്തിന്റെ മരുന്ന് കൃത്യമായി കഴിക്കുക. അടിയന്തര സാഹചര്യത്തിൽ ഉടൻ ഡോക്ടറെ കാണുക."
                              : "Take your prescribed blood pressure medicine on time. In emergencies, consult a doctor immediately.",
                            language
                          )}
                          className="px-2.5 py-1 rounded-lg bg-teal-800/80 hover:bg-teal-700 text-teal-200 text-[10px] font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <Volume2 className="w-3 h-3 text-amber-300" />
                          <span>{language === 'ml' ? 'ശബ്ദത്തിൽ കേൾക്കുക' : 'Listen'}</span>
                        </button>
                        <span className="text-[10px] text-teal-400">✓ ഡോസ് പരിശോധിച്ചു</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Prescription Upload Banner */}
                <div className="p-3 rounded-2xl bg-teal-950/70 border border-teal-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileHeart className="w-5 h-5 text-amber-400" />
                    <div>
                      <p className="text-xs font-bold text-white">
                        {language === 'ml' ? 'പുതിയ കുറിപ്പടി ഉണ്ടോ?' : 'Have a new prescription?'}
                      </p>
                      <p className="text-[10px] text-teal-300">
                        {language === 'ml' ? 'ഫോട്ടോ എടുത്താൽ മരുന്നുകളുടെ സമയം ചേർക്കാം' : 'Upload photo to auto-schedule reminders'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onNavigateToMode('vaidya', 'vaidya_rx')}
                    className="px-3 py-1.5 rounded-xl bg-teal-500 text-teal-950 font-bold text-xs hover:bg-teal-400 transition-colors"
                  >
                    {language === 'ml' ? 'സ്കാൻ' : 'Scan Rx'}
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION F: HOW IT WORKS (4-STEP ILLUSTRATED WORKFLOW)
      ───────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {language === 'ml' ? 'എങ്ങനെ പ്രയോജനപ്പെടുത്താം?' : 'Simple 4-Step Process'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              {language === 'ml' ? 'നാല് ലളിതമായ ഘട്ടങ്ങളിലൂടെ സേവനങ്ങൾ' : 'How the Platform Works'}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-medium">
              {language === 'ml'
                ? 'സങ്കീർണ്ണമായ സാങ്കേതിക അറിവുകളില്ലാതെ മുതിർന്ന പൗരന്മാർക്കും അവരുടെ കുടുംബത്തിനും സുഗമമായി ഉപയോഗിക്കാം.'
                : 'Guided, step-by-step digital journey from discovery to certified completion.'}
            </p>
          </div>

          {/* 4 Steps Grid with Visual Connectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="relative p-6 rounded-3xl bg-[#FAF8F5] border-2 border-stone-200/80 hover:border-emerald-600 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-amber-400 flex items-center justify-center font-black text-lg shadow-md">
                1
              </div>
              <h3 className="font-black text-base text-stone-900">
                {language === 'ml' ? '1. സേവനം തിരഞ്ഞെടുക്കുക' : '1. Choose Your Service'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {language === 'ml'
                  ? 'പെൻഷൻ പദ്ധതികളോ അതോ വോയ്‌സ് വൈദ്യ ആരോഗ്യ സഹായിയോ ആവശ്യമെന്ന് നിശ്ചയിക്കുക.'
                  : 'Select between Welfare Rights discovery (IGNOAP, Disability) or VoiceVaidya Healthcare.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-3xl bg-[#FAF8F5] border-2 border-stone-200/80 hover:border-emerald-600 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-amber-400 flex items-center justify-center font-black text-lg shadow-md">
                2
              </div>
              <h3 className="font-black text-base text-stone-900">
                {language === 'ml' ? '2. വിവരങ്ങൾ പങ്കിടുക' : '2. Enter Your Information'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {language === 'ml'
                  ? 'ടൈപ്പ് ചെയ്യാതെ സംസാരിച്ചോ ലളിതമായ ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകിയോ വിവരങ്ങൾ രേഖപ്പെടുത്തുക.'
                  : 'Provide basic details (age, ration card, symptoms) naturally through voice or simple options.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-3xl bg-[#FAF8F5] border-2 border-stone-200/80 hover:border-emerald-600 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-amber-400 flex items-center justify-center font-black text-lg shadow-md">
                3
              </div>
              <h3 className="font-black text-base text-stone-900">
                {language === 'ml' ? '3. വ്യക്തിഗത മാർഗ്ഗനിർദ്ദേശം' : '3. Personalized Guidance'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {language === 'ml'
                  ? 'നിങ്ങൾക്ക് അർഹമായ പദ്ധതികളുടെ ലിസ്റ്റും ആവശ്യമായ രേഖകളുടെ ചെക്ക്‌ലിസ്റ്റും സ്വീകരിക്കുക.'
                  : 'AI maps exact eligible schemes, benefits amount, required certificates, and medical schedules.'}
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative p-6 rounded-3xl bg-[#FAF8F5] border-2 border-stone-200/80 hover:border-emerald-600 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-amber-400 flex items-center justify-center font-black text-lg shadow-md">
                4
              </div>
              <h3 className="font-black text-base text-stone-900">
                {language === 'ml' ? '4. നടപടികൾ പൂർത്തിയാക്കുക' : '4. Track Your Next Steps'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {language === 'ml'
                  ? 'അക്ഷയ കേന്ദ്രത്തിൽ നൽകാൻ അപേക്ഷാ ഡ്രാഫ്റ്റ് പ്രിന്റ് ചെയ്യുക; അപേക്ഷ തത്സമയം ട്രാക്ക് ചെയ്യുക.'
                  : 'Download printable Akshaya drafts, complete physical biometric verification, and track progress.'}
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION G: ACCESSIBILITY SECTION
      ───────────────────────────────────────────────────────────── */}
      <section id="accessibility" className="py-20 bg-[#FAF8F5] border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#064e3b] rounded-3xl p-8 sm:p-12 text-white border-2 border-amber-400/60 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-emerald-950 px-3 py-1 rounded-full border border-amber-400/40">
                  {language === 'ml' ? 'ആക്സസിബിലിറ്റി മാനദണ്ഡങ്ങൾ' : 'Accessibility by Design'}
                </span>
                
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {language === 'ml'
                    ? 'എല്ലാവർക്കും എളുപ്പത്തിൽ ഉപയോഗിക്കാൻ സാധിക്കുന്ന രൂപകൽപ്പന'
                    : 'Designed for Every Ability, Device & Age'}
                </h2>

                <p className="text-sm sm:text-base text-emerald-100/90 font-medium leading-relaxed">
                  {language === 'ml'
                    ? 'കാഴ്ച പരിമിതിയുള്ളവർക്കും, സ്മാർട്ട്ഫോൺ ഉപയോഗം പരിചിതമല്ലാത്ത മുതിർന്നവർക്കും ഒരേപോലെ സുഗമമായി ഉപയോഗിക്കാവുന്ന സാങ്കേതിക സൗകര്യങ്ങൾ.'
                    : 'Engineered according to WCAG 2.1 AA accessibility principles to ensure zero digital exclusion across Kerala.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-200 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{language === 'ml' ? 'മലയാളം ശബ്ദ നാവിഗേഷൻ (Speech)' : 'Malayalam Spoken Readout'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-200 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{language === 'ml' ? '3x ഫോണ്ട് വലുപ്പം ക്രമീകരിക്കൽ' : 'Adjustable Font Scale (1x, 2x, 3x)'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-200 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{language === 'ml' ? 'ഉയർന്ന കോൺട്രാസ്റ്റ് മോഡ് (Yellow/Black)' : 'High Contrast Mode (WCAG AAA)'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-200 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{language === 'ml' ? 'കീബോർഡ് നാവിഗേഷൻ പിന്തുണ' : 'Full Keyboard Nav & Screen Reader ARIA'}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-emerald-950/90 rounded-2xl p-6 border border-emerald-700/80 space-y-4">
                <p className="text-xs font-black text-amber-300 uppercase tracking-wider">
                  {language === 'ml' ? 'തത്സമയ സൗകര്യങ്ങൾ പരീക്ഷിക്കുക' : 'Try Accessibility Features Now'}
                </p>

                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => {
                      speakText(
                        language === 'ml'
                          ? "ശബ്ദ സഹായം പ്രവർത്തിക്കുന്നു. വലിയ അക്ഷരങ്ങളും തെളിമയാർന്ന നിറങ്ങളും നിങ്ങൾക്ക് തിരഞ്ഞെടുക്കാം."
                          : "Voice assistance active. You can scale font sizes and toggle high contrast modes at any time.",
                        language
                      );
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-amber-300 text-xs font-bold border border-emerald-600 flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      <span>{language === 'ml' ? 'ശബ്ദ പരിശോധന (Test Voice)' : 'Test Audio Playback'}</span>
                    </span>
                    <span className="text-[10px] text-emerald-300">ക്ലിക്ക് ചെയ്യുക</span>
                  </button>

                  <button
                    onClick={onOpenJargonModal}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-emerald-100 text-xs font-bold border border-emerald-600 flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-400" />
                      <span>{language === 'ml' ? 'സർക്കാർ പദാവലി ശബ്ദകോശം' : 'Government Jargon Glossary'}</span>
                    </span>
                    <span className="text-[10px] text-amber-400">തുറക്കുക</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION H: PRIVACY & SECURITY SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {language === 'ml' ? 'ഡാറ്റ സുരക്ഷിതത്വം' : 'Privacy & Security'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              {language === 'ml' ? 'നിങ്ങളുടെ സ്വകാര്യത, ഞങ്ങളുടെ ഉത്തരവാദിത്തം' : 'Zero-Trust Public Service Security'}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-medium">
              {language === 'ml'
                ? 'ഇന്ത്യയുടെ DPDP നിയമപ്രകാരം നടപ്പിലാക്കിയ സാങ്കേതിക സുരക്ഷാ സംവിധാനങ്ങൾ.'
                : 'Built with verified security controls: zero client-side keys, data minimization, and user consent.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                <Lock className="w-5 h-5 text-emerald-800" />
              </div>
              <h3 className="font-black text-stone-900 text-base">
                {language === 'ml' ? 'ഡാറ്റ മിനിമൈസേഷൻ (Data Minimization)' : 'Data Minimization'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {language === 'ml'
                  ? 'പെൻഷൻ അർഹത പരിശോധിക്കാൻ അത്യാവശ്യമായ വിവരങ്ങൾ മാത്രമേ ശേഖരിക്കൂ. അനാവശ്യ ചോദ്യങ്ങൾ ഒഴിവാക്കിയിരിക്കുന്നു.'
                  : 'Only the strictly necessary criteria parameters (age bracket, card category) are processed.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5 text-amber-800" />
              </div>
              <h3 className="font-black text-stone-900 text-base">
                {language === 'ml' ? 'സീറോ-സീക്രട്ട് എൻക്ലേവ് (Zero Secrets)' : 'Zero Client Secrets Enclave'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {language === 'ml'
                  ? 'ബ്രൗസറിൽ രഹസ്യ വിവരങ്ങളോ API കീകളോ സൂക്ഷിക്കില്ല. സർവർ തലത്തിൽ സുരക്ഷിതമായ എൻക്രിപ്ഷൻ ഉറപ്പാക്കുന്നു.'
                  : 'No database credentials or secret tokens are ever exposed to the client application.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-bold">
                <Users className="w-5 h-5 text-teal-800" />
              </div>
              <h3 className="font-black text-stone-900 text-base">
                {language === 'ml' ? 'പൂർണ്ണ സമ്മതം (Granular Consent)' : 'Explicit User Consent'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {language === 'ml'
                  ? 'കെയർഗിവർമാർക്കോ ഡോക്ടർക്കോ വിവരങ്ങൾ പങ്കിടുമ്പോൾ ഉപയോക്താവിന്റെ നേരിട്ടുള്ള അനുമതി നിർബന്ധമാണ്.'
                  : 'Family notification and medical summaries are only shared upon explicit user authorization.'}
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION I: TESTIMONIALS / AUTHENTIC IMPACT
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#FAF8F5] border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300">
              {language === 'ml' ? 'സമൂഹത്തിലെ അനുഭവം' : 'Community Use Cases'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              {language === 'ml' ? 'ജനങ്ങൾക്ക് പ്രയോജനപ്പെടുന്ന വിധം' : 'How Citizens Experience the Platform'}
            </h2>
            <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">
              {language === 'ml' ? '(വികസന മാതൃകാ അനുഭവങ്ങൾ – Sample Community Profiles)' : '(Representative User Profiles in Development)'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Story 1 */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-soft space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                    👵
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-stone-900">
                      {language === 'ml' ? 'ഭവാനിയമ്മ (68 വയസ്സ്)' : 'Bhavani Amma (68 yrs)'}
                    </h3>
                    <p className="text-[11px] text-stone-500 font-medium">
                      {language === 'ml' ? 'പാലക്കാട്, ചിറ്റൂർ' : 'Palakkad, Chittur'}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-medium italic">
                  {language === 'ml'
                    ? '"പഞ്ചായത്ത് ഓഫീസിൽ പോകാതെ തന്നെ ഫോണിലൂടെ സംസാരിച്ച് എനിക്ക് വാർദ്ധക്യ പെൻഷന് അർഹതയുണ്ടെന്ന് മനസ്സിലാക്കാൻ സാധിച്ചു. റേഷൻ കാർഡും ആധാർ നമ്പറും നൽകി അപേക്ഷ തയ്യാറാക്കി തന്നു."'
                    : '"Without travelling repeatedly to the panchayat office, I verified my old age pension eligibility directly in Malayalam using my voice."'}
                </p>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg w-fit">
                {language === 'ml' ? 'പെൻഷൻ അപേക്ഷകൻ' : 'Pension Applicant'}
              </span>
            </div>

            {/* Story 2 */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-soft space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg">
                    👨‍💼
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-stone-900">
                      {language === 'ml' ? 'രമേഷ് മേനോൻ (കെയർഗിവർ)' : 'Ramesh Menon (Caregiver)'}
                    </h3>
                    <p className="text-[11px] text-stone-500 font-medium">
                      {language === 'ml' ? 'തൃശ്ശൂർ' : 'Thrissur'}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-medium italic">
                  {language === 'ml'
                    ? '"പ്രായമായ അച്ഛന്റെ മരുന്നുകൾ ഓർമ്മിപ്പിക്കാൻ വോയ്‌സ് വൈദ്യ വളരെ സഹായകമാണ്. മരുന്ന് കഴിച്ചോ ഇല്ലയോ എന്ന് എനിക്ക് ഫോണിൽ അലർട്ട് ലഭിക്കുന്നു."'
                    : '"VoiceVaidya keeps my elderly father on track with his cardiac prescriptions and notifies me whenever a dose is due or logged."'}
                </p>
              </div>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg w-fit">
                {language === 'ml' ? 'കുടുംബ സഹായി' : 'Family Caregiver'}
              </span>
            </div>

            {/* Story 3 */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-soft space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-lg">
                    ♿
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-stone-900">
                      {language === 'ml' ? 'സുരേഷ് കുമാർ (42 വയസ്സ്)' : 'Suresh Kumar (42 yrs)'}
                    </h3>
                    <p className="text-[11px] text-stone-500 font-medium">
                      {language === 'ml' ? 'കോഴിക്കോട്' : 'Kozhikode'}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-medium italic">
                  {language === 'ml'
                    ? '"ഭിന്നശേഷി പെൻഷനും UDID കാർഡിനുമുള്ള അർഹതയും ആവശ്യമായ മെഡിക്കൽ സർട്ടിഫിക്കറ്റ് നിബന്ധനകളും വളരെ വ്യക്തമായി മനസ്സിലാക്കി തന്നു."'
                    : '"Understood the exact 40%+ medical board certificate criteria for Kerala Disability Pension and generated an Akshaya-ready draft."'}
                </p>
              </div>
              <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg w-fit">
                {language === 'ml' ? 'ഭിന്നശേഷി ക്ഷേമം' : 'Disability Rights'}
              </span>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION J: INTERACTIVE FAQ SECTION (ACCORDION)
      ───────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {language === 'ml' ? 'സംശയ നിവാരണം' : 'Frequently Asked Questions'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              {language === 'ml' ? 'സാധാരണ ചോദിക്കുന്ന ചോദ്യങ്ങൾ' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-sm text-stone-600 font-medium">
              {language === 'ml'
                ? 'നമ്മുടെ അവകാശവും വോയ്‌സ് വൈദ്യയും സംബന്ധിച്ച പ്രധാന സംശയങ്ങൾ.'
                : 'Clear answers on eligibility, VoiceVaidya, privacy, and digital procedures.'}
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-stone-200 bg-[#FAF8F5] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-black text-sm sm:text-base text-stone-900 hover:text-emerald-900 transition-colors"
                  >
                    <span>{language === 'ml' ? faq.q_ml : faq.q_en}</span>
                    <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 font-medium leading-relaxed border-t border-stone-200/60 bg-white">
                      {language === 'ml' ? faq.a_ml : faq.a_en}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION K: FINAL CTA
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-tr from-[#064e3b] via-[#022c22] to-[#043d2e] text-white text-center relative overflow-hidden">
        
        {/* Glow ambient circle */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0,transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-emerald-950 flex items-center justify-center font-black text-3xl mx-auto shadow-xl border-2 border-white/80">
            🌴
          </div>

          {/* Exact Master Prompt Headline */}
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {language === 'ml' ? "സാങ്കേതികവിദ്യ എല്ലാവർക്കും ഉപകാരപ്പെടണം." : "Technology Should Work for Everyone."}
          </h2>

          {/* Exact Master Prompt Supporting Text */}
          <p className="text-base sm:text-lg text-emerald-100/90 font-medium max-w-2xl mx-auto leading-relaxed">
            {language === 'ml'
              ? "അത്യാവശ്യ സേവനങ്ങളും ആരോഗ്യ സഹായങ്ങളും മനസ്സിലാക്കാനും നേടാനും കൂടുതൽ ലളിതവും ആക്‌സസിബിളുമായ ഒരു പുതിയ വഴി കണ്ടെത്തുക."
              : "Discover a simpler, more accessible way to navigate essential services and healthcare assistance."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigateToMode('rights', 'dashboard')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-emerald-950 font-black text-base shadow-xl border-2 border-white/80 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>{language === 'ml' ? 'തുടങ്ങാം (Get Started)' : 'Get Started'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigateToMode('vaidya', 'vaidya_home')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-base border-2 border-white/30 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <HeartPulse className="w-5 h-5 text-teal-300" />
              <span>{language === 'ml' ? 'വോയ്‌സ് വൈദ്യ കാണുക' : 'Explore VoiceVaidya'}</span>
            </button>
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION L: COMPREHENSIVE FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#021811] text-emerald-100/80 pt-16 pb-12 border-t-2 border-amber-400/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/80">
            
            {/* Col 1 & 2: Brand Description */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-emerald-950 flex items-center justify-center font-black text-xl shadow">
                  🌴
                </div>
                <div>
                  <h3 className="text-white font-black text-lg">
                    {language === 'ml' ? 'നമ്മുടെ അവകാശം & വോയ്‌സ് വൈദ്യ' : 'Nammude Avakasham & VoiceVaidya'}
                  </h3>
                  <p className="text-[11px] text-amber-400 font-bold">
                    Digital Empowerment for Every Keralite
                  </p>
                </div>
              </div>

              <p className="text-xs text-emerald-200/70 font-medium leading-relaxed max-w-sm">
                {language === 'ml'
                  ? 'കേരളത്തിലെ മുതിർന്ന പൗരന്മാർക്കും ഭിന്നശേഷിക്കാർക്കും സർക്കാർ ക്ഷേമ പദ്ധതികളും ആരോഗ്യ സഹായങ്ങളും മലയാളത്തിൽ ലളിതമായി ലഭ്യമാക്കുന്ന സമഗ്ര ഡിജിറ്റൽ വേദി.'
                  : 'An accessible, bilingual public service platform empowering senior citizens and differently-abled individuals in Kerala with AI rights navigation and voice healthcare guidance.'}
              </p>

              <div className="flex items-center gap-2 text-xs text-amber-300 font-bold">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Zero-Client Secrets Enclave • DPDP Act 2023 Compliant</span>
              </div>
            </div>

            {/* Col 3: Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                {language === 'ml' ? 'പ്രധാന ലിങ്കുകൾ' : 'Platform Modules'}
              </h4>
              <ul className="space-y-2 text-xs font-medium text-emerald-200/80">
                <li>
                  <button onClick={() => onNavigateToMode('rights', 'dashboard')} className="hover:text-amber-300 transition-colors">
                    {language === 'ml' ? 'പൗര ഡാഷ്‌ബോർഡ്' : 'Citizen Dashboard'}
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateToMode('rights', 'schemes')} className="hover:text-amber-300 transition-colors">
                    {language === 'ml' ? 'ക്ഷേമ പദ്ധതികൾ (75+)' : 'Welfare Schemes (75+)'}
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateToMode('rights', 'eligibility')} className="hover:text-amber-300 transition-colors">
                    {language === 'ml' ? 'അർഹതാ വിസാർഡ്' : 'Eligibility Wizard'}
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateToMode('rights', 'companion')} className="hover:text-amber-300 transition-colors">
                    {language === 'ml' ? 'അക്ഷയ അപേക്ഷാ ഡ്രാഫ്റ്റ്' : 'Akshaya Application Draft'}
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateToMode('rights', 'tracking')} className="hover:text-amber-300 transition-colors">
                    {language === 'ml' ? 'അപേക്ഷാ ട്രാക്കിംഗ്' : 'Status Tracking'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: VoiceVaidya Healthcare */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                {language === 'ml' ? 'വോയ്‌സ് വൈദ്യ' : 'VoiceVaidya Health'}
              </h4>
              <ul className="space-y-2 text-xs font-medium text-emerald-200/80">
                <li>
                  <button onClick={() => onNavigateToMode('vaidya', 'vaidya_voice')} className="hover:text-teal-300 transition-colors flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-teal-400" />
                    <span>{language === 'ml' ? 'മലയാളം ശബ്ദ സംഭാഷണം' : 'Voice Chat'}</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateToMode('vaidya', 'vaidya_meds')} className="hover:text-teal-300 transition-colors flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5 text-teal-400" />
                    <span>{language === 'ml' ? 'മരുന്ന് ഓർമ്മപ്പെടുത്തൽ' : 'Medication Schedule'}</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateToMode('vaidya', 'vaidya_rx')} className="hover:text-teal-300 transition-colors flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-teal-400" />
                    <span>{language === 'ml' ? 'കുറിപ്പടി സ്കാനിംഗ്' : 'Prescription OCR'}</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateToMode('vaidya', 'vaidya_doctor')} className="hover:text-teal-300 transition-colors flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
                    <span>{language === 'ml' ? 'ഡോക്ടർ സന്ദർശനം' : 'Doctor Visit Brief'}</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateToMode('vaidya', 'vaidya_caregiver')} className="hover:text-teal-300 transition-colors flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-teal-400" />
                    <span>{language === 'ml' ? 'കുടുംബ കെയർഗിവർ' : 'Caregiver Sync'}</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 5: Emergency & Helplines */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                {language === 'ml' ? 'അടിയന്തര ഹെൽപ്പ്‌ലൈനുകൾ' : 'Emergency & Helplines'}
              </h4>
              <div className="space-y-2 text-xs font-bold text-white">
                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800">
                  <p className="text-[10px] text-emerald-300 uppercase">മുതിർന്ന പൗരന്മാർ (Elder Helpline)</p>
                  <p className="text-amber-400 text-sm">📞 14567</p>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800">
                  <p className="text-[10px] text-emerald-300 uppercase">ദിശ ആരോഗ്യ ഹെൽപ്പ്‌ലൈൻ</p>
                  <p className="text-teal-300 text-sm">📞 1056 / 0471 2552056</p>
                </div>

                <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-800">
                  <p className="text-[10px] text-red-300 uppercase">ആംബുലൻസ് (Ambulance)</p>
                  <p className="text-white text-sm">🚨 108</p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Legal, Privacy & Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60 font-medium">
            <p>
              © 2026 Nammude Avakasham & VoiceVaidya. Kerala Public Welfare & AI Healthcare Companion.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-emerald-200/80 font-bold">
              <button onClick={onOpenLegalModal} className="hover:text-amber-300 transition-colors">
                {language === 'ml' ? 'സ്വകാര്യതാ നയം (Privacy Policy)' : 'Privacy Policy (DPDP 2023)'}
              </button>
              <span>•</span>
              <button onClick={onOpenLegalModal} className="hover:text-amber-300 transition-colors">
                {language === 'ml' ? 'സേവന വ്യവസ്ഥകൾ' : 'Terms of Service'}
              </button>
              <span>•</span>
              <button onClick={onOpenLegalModal} className="hover:text-amber-300 transition-colors">
                {language === 'ml' ? 'ആക്സസിബിലിറ്റി സ്റ്റേറ്റ്‌മെന്റ്' : 'Accessibility (WCAG 2.1 AA)'}
              </button>
              <span>•</span>
              <button onClick={onOpenLegalModal} className="hover:text-amber-300 transition-colors">
                {language === 'ml' ? 'കുക്കി മുൻഗണനകൾ' : 'Cookie Preferences'}
              </button>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
