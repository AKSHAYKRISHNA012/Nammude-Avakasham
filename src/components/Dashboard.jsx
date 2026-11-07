import React from 'react';
import { 
  Mic, 
  Search, 
  CheckCircle2, 
  FileText, 
  ClipboardCheck, 
  Clock, 
  PhoneCall, 
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function Dashboard({ language, setActiveScreen, onOpenJargonModal }) {
  const cards = [
    {
      id: 'voice',
      title_ml: 'AI ശബ്ദ സഹായി',
      title_en: 'AI Voice Assistant',
      desc_ml: 'ടൈപ്പ് ചെയ്യാതെ നേരിട്ട് സംസാരിച്ച് അവകാശങ്ങളും പെൻഷനുകളും ചോദിച്ചറിയാം.',
      desc_en: 'Speak naturally in Malayalam or English to discover welfare rights and ask questions.',
      icon: Mic,
      color: 'bg-emerald-600',
      badge_ml: 'ശബ്ദ സഹായം',
      badge_en: 'Voice Enabled'
    },
    {
      id: 'schemes',
      title_ml: 'ക്ഷേമ പദ്ധതികൾ കണ്ടെത്തുക',
      title_en: 'Scheme Discovery',
      desc_ml: 'വാർദ്ധക്യ പെൻഷൻ, വികലാംഗ പെൻഷൻ, വയോമിത്രം, KASP സൗജന്യ ചികിത്സ വിവരങ്ങൾ.',
      desc_en: 'Explore verified Kerala and Central welfare schemes with real criteria and links.',
      icon: Search,
      color: 'bg-teal-700',
      badge_ml: 'സ്ഥിരീകരിച്ച വിവരങ്ങൾ',
      badge_en: 'Verified Sources'
    },
    {
      id: 'eligibility',
      title_ml: 'യോജ്യത പരിശോധന',
      title_en: 'Eligibility Assessment',
      desc_ml: 'നിങ്ങളുടെ പ്രായവും വരുമാനവും പരിശോധിച്ച് അർഹമായ പദ്ധതികൾ വേർതിരിച്ച് നൽകുന്നു.',
      desc_en: 'Step-by-step smart wizard to calculate exact matching percentage for your family.',
      icon: CheckCircle2,
      color: 'bg-amber-600',
      badge_ml: '1 മിനിറ്റിൽ അറിയാം',
      badge_en: 'Instant Score'
    },
    {
      id: 'documents',
      title_ml: 'രേഖാ പരിശോധനയും സഹായവും',
      title_en: 'Document Intelligence & OCR',
      desc_ml: 'ആധാർ, റേഷൻ കാർഡ്, സർട്ടിഫിക്കറ്റുകൾ പരിശോധിച്ച് തെറ്റുകളും കുറവുകളും കണ്ടെത്തുന്നു.',
      desc_en: 'Upload or test simulated government certificates; get plain Malayalam explanations.',
      icon: FileText,
      color: 'bg-indigo-700',
      badge_ml: 'AI വിശകലനം',
      badge_en: 'Smart Extraction'
    },
    {
      id: 'companion',
      title_ml: 'അപേക്ഷ തയ്യാറാക്കൽ സഹായി',
      title_en: 'Application Companion',
      desc_ml: 'അക്ഷയ കേന്ദ്രത്തിൽ സമർപ്പിക്കാൻ പാകത്തിൽ പൂർണ്ണമായ അപേക്ഷാ കരട് ഫോം തയ്യാറാക്കുന്നു.',
      desc_en: 'Step-by-step guidance to prepare an official-ready draft with required checklist.',
      icon: ClipboardCheck,
      color: 'bg-rose-700',
      badge_ml: 'കരട് ഫോം ഡൗൺലോഡ്',
      badge_en: 'Draft Generator'
    },
    {
      id: 'tracking',
      title_ml: 'അപേക്ഷാ ട്രാക്കിംഗ്',
      title_en: 'Application Tracking',
      desc_ml: 'റഫറൻസ് നമ്പർ നൽകി അപേക്ഷയുടെ പഞ്ചായത്ത്/അക്ഷയ പുരോഗതി പരിശോധിക്കാം.',
      desc_en: 'Record your application reference and view stage-by-stage status timeline.',
      icon: Clock,
      color: 'bg-cyan-700',
      badge_ml: 'തത്സമയ സ്ഥിതി',
      badge_en: 'Live Milestones'
    },
    {
      id: 'assistance',
      title_ml: 'ഹെൽപ്‌ലൈൻ & അക്ഷയ സഹായം',
      title_en: 'Helpline & Akshaya Assistance',
      desc_ml: 'എൽഡർ ലൈൻ 14567, ദിശ 1056 നമ്പറുകളും അക്ഷയ കേന്ദ്ര സന്ദർശന മാർഗ്ഗരേഖയും.',
      desc_en: 'Emergency & government helplines, Akshaya checklist, and physical verification rules.',
      icon: PhoneCall,
      color: 'bg-emerald-800',
      badge_ml: 'സൗജന്യ ഫോൺ',
      badge_en: 'Toll-Free'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Dashboard Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-200 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <span>{language === 'ml' ? 'ക്ഷേമ സഹായ ഡാഷ്‌ബോർഡ്' : 'Welfare Assistance Dashboard'}</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-300">
              Live Portal
            </span>
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {language === 'ml' 
              ? 'മുതിർന്ന പൗരന്മാർക്കും ഭിന്നശേഷിക്കാർക്കും ലളിതമായി ഉപയോഗിക്കാവുന്ന രീതിയിൽ തയ്യാറാക്കിയത്.' 
              : 'Designed with high accessibility and clear visual cues for elderly citizens and persons with disabilities.'}
          </p>
        </div>

        {/* Quick Action: Voice Assistant Direct */}
        <button
          onClick={() => setActiveScreen('voice')}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-sm shadow-md transition-transform active:scale-95"
        >
          <Mic className="w-5 h-5 text-emerald-950" />
          <span>{language === 'ml' ? 'സംസാരിച്ച് ചോദിക്കാം 🎙️' : 'Speak to AI 🎙️'}</span>
        </button>
      </div>

      {/* Grid of Accessible Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => setActiveScreen(card.id)}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border-2 border-gray-100 hover:border-emerald-600 transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${card.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                    {language === 'ml' ? card.badge_ml : card.badge_en}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                  {language === 'ml' ? card.title_ml : card.title_en}
                </h3>

                <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
                  {language === 'ml' ? card.desc_ml : card.desc_en}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>{language === 'ml' ? 'തുടങ്ങുക' : 'Open Feature'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Important Citizen Reminder Alert Box */}
      <div className="mt-10 bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-lg">
            ⚠️
          </div>
          <div>
            <h4 className="font-bold text-amber-950 text-sm sm:text-base">
              {language === 'ml' 
                ? 'വാർഷിക ജീവൻ രേഖ മസ്റ്ററിംഗ് ഓർമ്മപ്പെടുത്തൽ' 
                : 'Annual Biometric Mustering Reminder'}
            </h4>
            <p className="text-xs sm:text-sm text-amber-900 mt-1">
              {language === 'ml' 
                ? 'പെൻഷൻ തടസ്സമില്ലാതെ ലഭിക്കാൻ എല്ലാ ഗുണഭോക്താക്കളും എല്ലാ വർഷവും അക്ഷയ കേന്ദ്രത്തിൽ വിരലടയാളം (മസ്റ്ററിംഗ്) നൽകണം.' 
                : 'All pension beneficiaries must perform annual biometric mustering at nearest Akshaya Centre to ensure uninterrupted disbursement.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveScreen('tracking')}
          className="whitespace-nowrap px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow"
        >
          {language === 'ml' ? 'വിവരങ്ങൾ അറിയുക' : 'Check Mustering Info'}
        </button>
      </div>

    </div>
  );
}
