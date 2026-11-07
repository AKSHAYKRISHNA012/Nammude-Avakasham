import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import Dashboard from './components/Dashboard.jsx';
import VoiceAssistant from './components/VoiceAssistant.jsx';
import SchemeDiscovery from './components/SchemeDiscovery.jsx';
import EligibilityAssessment from './components/EligibilityAssessment.jsx';
import DocumentIntelligence from './components/DocumentIntelligence.jsx';
import ApplicationCompanion from './components/ApplicationCompanion.jsx';
import ApplicationTracking from './components/ApplicationTracking.jsx';
import HumanAssistance from './components/HumanAssistance.jsx';
import JargonBusterModal from './components/JargonBusterModal.jsx';
import LegalModal from './components/common/LegalModal.jsx';
import NetworkResilienceBanner from './components/common/NetworkResilienceBanner.jsx';

// VoiceVaidya Components
import VoiceVaidyaHome from './components/voicevaidya/VoiceVaidyaHome.jsx';
import VaidyaVoiceChat from './components/voicevaidya/VaidyaVoiceChat.jsx';
import VaidyaPrescriptionOCR from './components/voicevaidya/VaidyaPrescriptionOCR.jsx';
import VaidyaMedicationSchedule from './components/voicevaidya/VaidyaMedicationSchedule.jsx';
import VaidyaDoctorVisit from './components/voicevaidya/VaidyaDoctorVisit.jsx';
import VaidyaCaregiver from './components/voicevaidya/VaidyaCaregiver.jsx';
import VaidyaMedicalHistory from './components/voicevaidya/VaidyaMedicalHistory.jsx';

import { 
  Home, 
  Mic, 
  Search, 
  CheckCircle2, 
  FileText, 
  ClipboardCheck, 
  PhoneCall,
  Clock,
  Pill,
  Stethoscope,
  Users,
  FileHeart,
  HeartPulse,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState('ml'); // Default Malayalam-first
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(2); // 1 = normal, 2 = large, 3 = extra large
  const [currentMode, setCurrentMode] = useState('vaidya'); // 'rights' or 'vaidya'
  const [activeScreen, setActiveScreen] = useState('vaidya_home'); // initial screen
  const [selectedSchemeId, setSelectedSchemeId] = useState('ignaoap');
  const [isJargonModalOpen, setIsJargonModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

  // Font size multiplier class
  const fontSizeClasses = {
    1: 'text-sm',
    2: 'text-base',
    3: 'text-lg'
  };

  // Navigation Items for Rights Navigator
  const rightsNavItems = [
    { id: 'dashboard', label_ml: 'ഡാഷ്‌ബോർഡ്', label_en: 'Dashboard', icon: Home },
    { id: 'voice', label_ml: 'ശബ്ദ സഹായി', label_en: 'Voice AI', icon: Mic, highlight: true },
    { id: 'schemes', label_ml: 'പദ്ധതികൾ', label_en: 'Schemes', icon: Search },
    { id: 'eligibility', label_ml: 'യോജ്യത', label_en: 'Eligibility', icon: CheckCircle2 },
    { id: 'documents', label_ml: 'രേഖകൾ', label_en: 'Documents', icon: FileText },
    { id: 'companion', label_ml: 'അപേക്ഷ', label_en: 'Apply', icon: ClipboardCheck },
    { id: 'tracking', label_ml: 'ട്രാക്കിംഗ്', label_en: 'Track', icon: Clock },
    { id: 'assistance', label_ml: 'സഹായം', label_en: 'Helpline', icon: PhoneCall },
  ];

  // Navigation Items for VoiceVaidya Health Companion
  const vaidyaNavItems = [
    { id: 'vaidya_home', label_ml: 'വൈദ്യ ഹോം', label_en: 'Home', icon: HeartPulse },
    { id: 'vaidya_voice', label_ml: 'സംസാരിക്കാം', label_en: 'Talk', icon: Mic, highlight: true },
    { id: 'vaidya_meds', label_ml: 'മരുന്നുകൾ', label_en: 'Meds', icon: Pill },
    { id: 'vaidya_rx', label_ml: 'കുറിപ്പടി', label_en: 'Rx OCR', icon: FileText },
    { id: 'vaidya_doctor', label_ml: 'ഡോക്ടർ', label_en: 'Doctor', icon: Stethoscope },
    { id: 'vaidya_caregiver', label_ml: 'കുടുംബം', label_en: 'Family', icon: Users },
    { id: 'vaidya_history', label_ml: 'ചരിത്രം', label_en: 'History', icon: FileHeart },
  ];

  const currentNavItems = currentMode === 'vaidya' ? vaidyaNavItems : rightsNavItems;

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${highContrast ? 'high-contrast' : 'bg-[#FAF8F5] text-gray-900'} ${fontSizeClasses[fontSize]}`}>
      
      {/* Network Resilience & Offline Sync Banner */}
      <NetworkResilienceBanner language={language} />

      {/* Top Glassmorphic Navbar */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        fontSize={fontSize}
        setFontSize={setFontSize}
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        onOpenJargonModal={() => setIsJargonModalOpen(true)}
      />

      {/* Mode Switch Banner for Mobile Screens */}
      <div className="lg:hidden bg-emerald-950 px-4 py-2.5 border-b border-emerald-800 flex items-center justify-center gap-3 shadow-md">
        <button
          onClick={() => {
            setCurrentMode('rights');
            setActiveScreen('welcome');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
            currentMode === 'rights' ? 'bg-amber-400 text-emerald-950 shadow-md ring-2 ring-amber-300/60' : 'text-emerald-200 hover:text-white'
          }`}
        >
          <span>🌴</span>
          <span>{language === 'ml' ? 'ക്ഷേമ അവകാശങ്ങൾ' : 'Welfare Rights'}</span>
        </button>

        <button
          onClick={() => {
            setCurrentMode('vaidya');
            setActiveScreen('vaidya_home');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
            currentMode === 'vaidya' ? 'bg-teal-400 text-teal-950 shadow-md ring-2 ring-teal-300/60' : 'text-emerald-200 hover:text-white'
          }`}
        >
          <span>🩺</span>
          <span>{language === 'ml' ? 'വോയ്‌സ് വൈദ്യ' : 'VoiceVaidya'}</span>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 pb-32">
        
        {/* VoiceVaidya Screens */}
        {activeScreen === 'vaidya_home' && (
          <VoiceVaidyaHome
            language={language}
            onNavigateSection={(screenId) => setActiveScreen(screenId)}
          />
        )}

        {activeScreen === 'vaidya_voice' && (
          <VaidyaVoiceChat
            language={language}
          />
        )}

        {activeScreen === 'vaidya_rx' && (
          <VaidyaPrescriptionOCR
            language={language}
            onAddPrescriptionToSchedule={() => setActiveScreen('vaidya_meds')}
          />
        )}

        {activeScreen === 'vaidya_meds' && (
          <VaidyaMedicationSchedule
            language={language}
            onNotifyCaregiver={() => {}}
          />
        )}

        {activeScreen === 'vaidya_doctor' && (
          <VaidyaDoctorVisit
            language={language}
          />
        )}

        {activeScreen === 'vaidya_caregiver' && (
          <VaidyaCaregiver
            language={language}
          />
        )}

        {activeScreen === 'vaidya_history' && (
          <VaidyaMedicalHistory
            language={language}
          />
        )}

        {/* Rights Navigator Screens */}
        {activeScreen === 'welcome' && (
          <WelcomeScreen
            language={language}
            setActiveScreen={setActiveScreen}
          />
        )}

        {activeScreen === 'dashboard' && (
          <Dashboard
            language={language}
            setActiveScreen={setActiveScreen}
            onOpenJargonModal={() => setIsJargonModalOpen(true)}
          />
        )}

        {activeScreen === 'voice' && (
          <VoiceAssistant
            language={language}
            setActiveScreen={setActiveScreen}
          />
        )}

        {activeScreen === 'schemes' && (
          <SchemeDiscovery
            language={language}
            setActiveScreen={setActiveScreen}
            setSelectedSchemeId={setSelectedSchemeId}
          />
        )}

        {activeScreen === 'eligibility' && (
          <EligibilityAssessment
            language={language}
            setActiveScreen={setActiveScreen}
            setSelectedSchemeId={setSelectedSchemeId}
          />
        )}

        {activeScreen === 'documents' && (
          <DocumentIntelligence
            language={language}
          />
        )}

        {activeScreen === 'companion' && (
          <ApplicationCompanion
            language={language}
            setActiveScreen={setActiveScreen}
            selectedSchemeId={selectedSchemeId}
          />
        )}

        {activeScreen === 'tracking' && (
          <ApplicationTracking
            language={language}
          />
        )}

        {activeScreen === 'assistance' && (
          <HumanAssistance
            language={language}
          />
        )}

        {/* Global Compliance & Trust Footer */}
        <footer className="max-w-5xl mx-auto px-4 pt-12 pb-4 text-center text-xs text-gray-500 space-y-2 border-t border-gray-200/60 mt-12">
          <div className="flex flex-wrap items-center justify-center gap-4 font-bold text-gray-600">
            <button onClick={() => setIsLegalModalOpen(true)} className="hover:text-emerald-800 transition-colors">
              {language === 'ml' ? 'സ്വകാര്യതാ നയം (DPDP 2023)' : 'Privacy Policy (DPDP Act)'}
            </button>
            <span>•</span>
            <button onClick={() => setIsLegalModalOpen(true)} className="hover:text-emerald-800 transition-colors">
              {language === 'ml' ? 'സേവന വ്യവസ്ഥകൾ' : 'Terms of Service'}
            </button>
            <span>•</span>
            <button onClick={() => setIsLegalModalOpen(true)} className="hover:text-emerald-800 transition-colors">
              {language === 'ml' ? 'കുക്കി മുൻഗണനകൾ' : 'Cookie Preferences'}
            </button>
            <span>•</span>
            <button onClick={() => setIsLegalModalOpen(true)} className="hover:text-emerald-800 transition-colors">
              {language === 'ml' ? 'ആക്സസിബിലിറ്റി (WCAG 2.1 AA)' : 'Accessibility Statement'}
            </button>
          </div>
          <p className="text-[11px] text-gray-400">
            © 2026 Nammude Avakasham & VoiceVaidya. Powered by Antigravity Pro Swarm. Zero Client Secrets Enclave.
          </p>
        </footer>
      </main>

      {/* Modern Floating Island Bottom Dock */}
      <div className="fixed bottom-4 left-0 right-0 z-40 px-3 pointer-events-none">
        <nav className="pointer-events-auto floating-dock rounded-3xl max-w-xl sm:max-w-2xl mx-auto px-3 py-2 flex items-center justify-around border-2 border-white/80 shadow-elevated">
          {currentNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-2xl transition-all relative ${
                  isActive
                    ? 'text-teal-900 font-black scale-108'
                    : 'text-gray-500 hover:text-teal-800'
                } ${item.highlight ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-black px-4 shadow-md ring-2 ring-amber-300/60 scale-105' : ''}`}
                title={language === 'ml' ? item.label_ml : item.label_en}
              >
                <Icon className={`w-5 h-5 ${isActive && !item.highlight ? 'text-teal-700 stroke-[2.8]' : ''}`} />
                <span className="text-[10px] sm:text-[11px] mt-0.5 tracking-tight font-extrabold truncate max-w-[65px] text-center">
                  {language === 'ml' ? item.label_ml : item.label_en}
                </span>
                {isActive && !item.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700 mt-0.5 shadow-sm"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Government Jargon Glossary Modal */}
      <JargonBusterModal
        isOpen={isJargonModalOpen}
        onClose={() => setIsJargonModalOpen(false)}
        language={language}
      />

      {/* Legal & Compliance Modal */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        language={language}
      />

    </div>
  );
}
