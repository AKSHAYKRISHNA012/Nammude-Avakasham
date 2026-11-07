import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  CheckCircle, 
  FileText, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  ArrowRight,
  Filter,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { SCHEMES } from '../data/schemesData.js';
import { speakText, stopSpeech } from '../utils/speech.js';

export default function SchemeDiscovery({ language, setActiveScreen, setSelectedSchemeId }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRationCard, setSelectedRationCard] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSchemeId, setExpandedSchemeId] = useState(SCHEMES[0]?.id || null);
  const [isSpeakingId, setIsSpeakingId] = useState(null);

  const categories = [
    { id: 'all', label_ml: 'എല്ലാ പദ്ധതികളും', label_en: 'All Schemes' },
    { id: 'senior', label_ml: 'മുതിർന്നവർ (60+)', label_en: 'Senior Citizens' },
    { id: 'pwd', label_ml: 'ഭിന്നശേഷിക്കാർ (PwD)', label_en: 'Persons with Disabilities' },
    { id: 'caregiver', label_ml: 'രോഗ പരിചാരകർ', label_en: 'Caregivers' },
    { id: 'health', label_ml: 'സൗജന്യ ചികിത്സ', label_en: 'Healthcare' }
  ];

  const rationCards = [
    { id: 'all', label_ml: 'എല്ലാ കാർഡുകളും', label_en: 'All Cards', color: 'bg-stone-100 text-stone-800 border-stone-300' },
    { id: 'yellow', label_ml: 'മഞ്ഞ കാർഡ് (AAY അതീവ മുൻഗണന)', label_en: 'Yellow (AAY Extreme Poor)', color: 'bg-yellow-300 text-yellow-950 border-yellow-500 font-black' },
    { id: 'pink', label_ml: 'പിങ്ക് കാർഡ് (PHH മുൻഗണന)', label_en: 'Pink (PHH Priority)', color: 'bg-pink-200 text-pink-950 border-pink-400 font-black' },
    { id: 'blue', label_ml: 'നീല കാർഡ് (സബ്‌സിഡി)', label_en: 'Blue (NPHH Subsidy)', color: 'bg-sky-200 text-sky-950 border-sky-400 font-black' },
    { id: 'white', label_ml: 'വെള്ള കാർഡ് (പൊതുവിഭാഗം)', label_en: 'White (General)', color: 'bg-white text-stone-900 border-stone-300 font-bold' }
  ];

  const filteredSchemes = SCHEMES.filter(scheme => {
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    
    // Filter by ration card logic
    let matchesRation = true;
    if (selectedRationCard === 'yellow' || selectedRationCard === 'pink') {
      // Priority cards: matches all welfare pensions and subsidized health schemes
      matchesRation = true;
    } else if (selectedRationCard === 'blue' || selectedRationCard === 'white') {
      // General/Non-priority: check if scheme has no strict low-income cutoff or requires only disability
      if (scheme.requires_disability) {
        matchesRation = true;
      } else if (scheme.max_income && scheme.max_income <= 100000 && selectedRationCard === 'white') {
        matchesRation = false;
      }
    }

    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      !q ||
      scheme.name_ml.toLowerCase().includes(q) ||
      scheme.name_en.toLowerCase().includes(q) ||
      scheme.target_group_ml.toLowerCase().includes(q) ||
      scheme.target_group_en.toLowerCase().includes(q);
    return matchesCategory && matchesRation && matchesSearch;
  });

  const handleAudioPlayback = (scheme) => {
    if (isSpeakingId === scheme.id) {
      stopSpeech();
      setIsSpeakingId(null);
      return;
    }

    stopSpeech();
    setIsSpeakingId(scheme.id);

    const textToSpeak = language === 'ml'
      ? `${scheme.name_ml}. പ്രതിമാസ ആനുകൂല്യം: ${scheme.benefit_ml}. അർഹത: ${scheme.eligibility_ml.slice(0, 2).join(' ')}. അപേക്ഷിക്കേണ്ട പോർട്ടൽ: ${scheme.department_ml}.`
      : `${scheme.name_en}. Benefit: ${scheme.benefit_en}. Eligibility: ${scheme.eligibility_en.slice(0, 2).join(' ')}.`;

    speakText(textToSpeak, language, () => {
      setIsSpeakingId(null);
    });
  };

  const handleApplyClick = (schemeId) => {
    if (setSelectedSchemeId) {
      setSelectedSchemeId(schemeId);
    }
    setActiveScreen('companion');
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Top Title & Search Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{language === 'ml' ? 'കേരള സർക്കാർ സ്ഥിരീകരിച്ച വിവരങ്ങൾ' : 'Verified Kerala Government Information'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {language === 'ml' ? 'ക്ഷേമ പദ്ധതി ഡയറക്ടറി' : 'Welfare Schemes Directory'}
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              {language === 'ml' 
                ? 'യഥാർത്ഥ സർക്കാർ ഉത്തരവുകളും മാനദണ്ഡങ്ങളും അടിസ്ഥാനമാക്കിയുള്ള വിവരങ്ങൾ.' 
                : 'Directly sourced from Kerala LSGD, Social Security Mission, and Swavlamban guidelines.'}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ml' ? 'പദ്ധതിയുടെ പേര് തിരയുക...' : 'Search scheme name or keyword...'}
              className="w-full bg-gray-50 border border-gray-300 rounded-2xl pl-11 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-gray-100">
          <span className="text-xs font-bold text-gray-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>{language === 'ml' ? 'വിഭാഗം:' : 'Category:'}</span>
          </span>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-amber-300 shadow-sm border border-emerald-900 ring-2 ring-emerald-500/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
              }`}
            >
              {language === 'ml' ? cat.label_ml : cat.label_en}
            </button>
          ))}
        </div>

        {/* Kerala Ration Card Quick Filter */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-dashed border-gray-200">
          <span className="text-xs font-bold text-stone-600 mr-1 flex items-center gap-1.5">
            <span>🎫</span>
            <span>{language === 'ml' ? 'റേഷൻ കാർഡ് പ്രകാരം:' : 'Ration Card Filter:'}</span>
          </span>
          {rationCards.map(rc => (
            <button
              key={rc.id}
              onClick={() => setSelectedRationCard(rc.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all border shadow-xs ${rc.color} ${
                selectedRationCard === rc.id
                  ? 'ring-2 ring-emerald-600 scale-105 shadow-md'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              {language === 'ml' ? rc.label_ml : rc.label_en}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes List */}
      <div className="space-y-6">
        {filteredSchemes.map((scheme) => {
          const isExpanded = expandedSchemeId === scheme.id;
          const isSpeaking = isSpeakingId === scheme.id;

          return (
            <div
              key={scheme.id}
              className={`bg-white rounded-3xl border-2 transition-all overflow-hidden ${
                isExpanded ? 'border-emerald-600 shadow-lg' : 'border-gray-200 hover:border-emerald-300 shadow-sm'
              }`}
            >
              {/* Card Header / Summary */}
              <div 
                onClick={() => setExpandedSchemeId(isExpanded ? null : scheme.id)}
                className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-white to-emerald-50/30"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {language === 'ml' ? scheme.department_ml : scheme.department_en}
                    </span>
                    {scheme.monthly_amount > 0 && (
                      <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-400 text-emerald-950 shadow-sm">
                        ₹{scheme.monthly_amount} / {language === 'ml' ? 'മാസം' : 'month'}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                    {language === 'ml' ? scheme.name_ml : scheme.name_en}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                    <span className="font-semibold text-emerald-800">{language === 'ml' ? 'ആർക്കൊക്കെ:' : 'Target:'}</span>
                    <span>{language === 'ml' ? scheme.target_group_ml : scheme.target_group_en}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  {/* Listen Audio Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAudioPlayback(scheme);
                    }}
                    className={`p-3 rounded-2xl flex items-center gap-2 text-xs font-bold transition-all ${
                      isSpeaking
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200 border border-emerald-300'
                    }`}
                    title="Listen to Scheme Details"
                  >
                    {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    <span className="hidden sm:inline">
                      {isSpeaking ? (language === 'ml' ? 'നിർത്തുക' : 'Stop') : (language === 'ml' ? 'വിവരണം കേൾക്കുക 🔊' : 'Listen 🔊')}
                    </span>
                  </button>

                  <button className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs">
                    {isExpanded ? (language === 'ml' ? 'ചുരുക്കുക ▲' : 'Less ▲') : (language === 'ml' ? 'വിശദാംശങ്ങൾ ▼' : 'Details ▼')}
                  </button>
                </div>
              </div>

              {/* Card Expanded Content */}
              {isExpanded && (
                <div className="p-6 border-t border-gray-100 bg-white space-y-6">
                  
                  {/* Benefits Box */}
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
                    <h4 className="font-extrabold text-amber-950 text-sm mb-1">
                      {language === 'ml' ? 'ലഭിക്കുന്ന ആനുകൂല്യം (Benefits):' : 'Key Benefits:'}
                    </h4>
                    <p className="text-gray-800 text-sm font-medium">
                      {language === 'ml' ? scheme.benefit_ml : scheme.benefit_en}
                    </p>
                  </div>

                  {/* Two columns: Eligibility vs Required Documents */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Eligibility List */}
                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                      <h4 className="font-extrabold text-gray-900 text-sm mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>{language === 'ml' ? 'മാനദണ്ഡങ്ങളും അർഹതയും:' : 'Eligibility Conditions:'}</span>
                      </h4>
                      <ul className="space-y-2">
                        {(language === 'ml' ? scheme.eligibility_ml : scheme.eligibility_en).map((item, idx) => (
                          <li key={idx} className="text-xs sm:text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-emerald-700 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Required Documents */}
                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                      <h4 className="font-extrabold text-gray-900 text-sm mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-amber-600" />
                        <span>{language === 'ml' ? 'ആവശ്യമായ രേഖകൾ:' : 'Required Documents Checklist:'}</span>
                      </h4>
                      <ul className="space-y-2">
                        {(language === 'ml' ? scheme.required_documents_ml : scheme.required_documents_en).map((doc, idx) => (
                          <li key={idx} className="text-xs sm:text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-amber-600 font-bold">✓</span>
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Step by Step Application Procedure */}
                  <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100">
                    <h4 className="font-extrabold text-emerald-950 text-sm mb-3">
                      {language === 'ml' ? 'അപേക്ഷ സമർപ്പിക്കേണ്ട രീതി (Procedure):' : 'Application Procedure:'}
                    </h4>
                    <div className="space-y-2">
                      {(language === 'ml' ? scheme.procedure_ml : scheme.procedure_en).map((step, idx) => (
                        <p key={idx} className="text-xs sm:text-sm text-emerald-900">
                          {step}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Mandatory Human Intervention Warning */}
                  {scheme.human_assistance_required && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-50 border border-orange-200 text-xs text-orange-900">
                      <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">
                          {language === 'ml' ? 'ശ്രദ്ധിക്കുക (നേരിട്ടുള്ള സാന്നിധ്യം നിർബന്ധം): ' : 'Mandatory Human Verification: '}
                        </span>
                        <span>{scheme.human_assistance_required}</span>
                      </div>
                    </div>
                  )}

                  {/* Footer Actions: Last verified + Official Portal Link + Apply Companion Button */}
                  <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-[11px] text-gray-500 space-y-0.5">
                      <p className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{language === 'ml' ? 'അവസാനം സ്ഥിരീകരിച്ചത്:' : 'Last verified:'} {scheme.last_verified}</span>
                      </p>
                      <p className="italic text-gray-400">
                        {scheme.source_reference}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <a
                        href={scheme.official_link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold transition-colors"
                      >
                        <span>{language === 'ml' ? 'ഔദ്യോഗിക വെബ്സൈറ്റ്' : 'Official Portal'}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                      </a>

                      <button
                        onClick={() => handleApplyClick(scheme.id)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold shadow transition-transform active:scale-95"
                      >
                        <span>{language === 'ml' ? 'അപേക്ഷ തയ്യാറാക്കുക' : 'Prepare Application'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
