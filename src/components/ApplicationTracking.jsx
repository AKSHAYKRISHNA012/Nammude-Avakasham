import React, { useState } from 'react';
import { 
  Clock, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  Building,
  BellRing,
  ExternalLink,
  Info
} from 'lucide-react';

export default function ApplicationTracking({ language }) {
  const [refInput, setRefInput] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [isSample, setIsSample] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  const loadSampleTimeline = () => {
    setIsSample(true);
    setSearchError('');
    setRefInput('KSSM-2026-89412');
    setTrackingData({
      refNumber: 'KSSM-2026-89412',
      schemeName_ml: 'ഇന്ദിരാഗാന്ധി ദേശീയ വാർദ്ധക്യകാല പെൻഷൻ',
      schemeName_en: 'Indira Gandhi National Old Age Pension',
      applicantName: 'മാതൃകാ അപേക്ഷകൻ (Sample Illustrative Applicant)',
      status: 'WARD_VERIFICATION',
      statusText_ml: 'വാർഡ് തല അന്വേഷണവും പരിശോധനയും പുരോഗമിക്കുന്നു',
      statusText_en: 'Ward Secretary Field Verification in Progress',
      timeline: [
        { date: '14 ഒക്ടോബർ 2026', step: 'അപേക്ഷ അക്ഷയ കേന്ദ്രത്തിൽ രജിസ്റ്റർ ചെയ്തു', done: true },
        { date: '22 ഒക്ടോബർ 2026', step: 'ഗ്രാമപഞ്ചായത്ത് ഫയൽ സ്വീകരിച്ചു', done: true },
        { date: '02 നവംബർ 2026', step: 'വാർഡ് തല അന്വേഷണം നടക്കുന്നു', current: true },
        { date: 'പ്രതീക്ഷിക്കുന്നത്', step: 'പഞ്ചായത്ത് കമ്മിറ്റി അംഗീകാരം', pending: true },
        { date: 'പ്രതീക്ഷിക്കുന്നത്', step: 'ആദ്യ മാസ പെൻഷൻ വിതരണം', pending: true }
      ],
      nextAction_ml: 'വാർഡ് സെക്രട്ടറി ഭവന സന്ദർശനം നടത്തുമ്പോൾ റേഷൻ കാർഡും ആധാർ ഒറിജിനലും കാണിക്കുക.',
      nextAction_en: 'Keep original Ration Card and Aadhaar handy for secretary home inspection.'
    });
  };

  const handleSearch = async () => {
    if (!refInput.trim()) {
      setSearchError(language === 'ml' ? 'ദയവായി അപേക്ഷാ റഫറൻസ് നമ്പർ നൽകുക.' : 'Please enter an application reference number.');
      return;
    }
    setSearchError('');
    setIsLoading(true);
    setIsSample(false);

    try {
      const response = await fetch(`/api/tracking/${refInput.trim()}`);
      const data = await response.json();
      if (data && data.success && data.tracking) {
        setTrackingData(data.tracking);
      } else {
        setTrackingData(null);
        setSearchError(
          language === 'ml'
            ? 'ഈ റഫറൻസ് നമ്പറിൽ റെക്കോർഡ് കണ്ടെത്താനായില്ല. ഔദ്യോഗിക സേവന പോർട്ടൽ വഴിയും പരിശോധിക്കാവുന്നതാണ്.'
            : 'No local record found for this reference number. Please verify on the official Sevana LSGD portal.'
        );
      }
    } catch (err) {
      setTrackingData(null);
      setSearchError(
        language === 'ml'
          ? 'പോർട്ടൽ കണക്ഷൻ ലഭ്യമല്ല. തത്സമയ സ്ഥിതിക്കായി ദയവായി ഔദ്യോഗിക സേവന വെബ്സൈറ്റ് സന്ദർശിക്കുക.'
          : 'Live status service is offline. Please query the official Sevana LSGD portal.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold mb-2">
          <Clock className="w-4 h-4 text-cyan-700" />
          <span>{language === 'ml' ? 'അപേക്ഷാ സ്ഥിതി പരിശോധന' : 'Status Tracking'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          {language === 'ml' ? 'അപേക്ഷ എവിടെവരെയായി എന്ന് അറിയാം' : 'Track Your Application Progress'}
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          {language === 'ml' 
            ? 'അക്ഷയ കേന്ദ്രത്തിൽ നിന്നോ പോർട്ടലിൽ നിന്നോ ലഭിച്ച റഫറൻസ് നമ്പർ നൽകി പരിശോധിക്കുക.' 
            : 'Enter the reference number from your Akshaya receipt or Sevana portal.'}
        </p>

        {/* Search Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={refInput}
            onChange={(e) => {
              setRefInput(e.target.value);
              if (searchError) setSearchError('');
            }}
            placeholder="e.g. KSSM-2026-89412"
            className="flex-1 bg-gray-50 border border-gray-300 rounded-2xl px-5 py-3.5 text-base font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="px-8 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm shadow flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>{isLoading ? '...' : (language === 'ml' ? 'സ്ഥിതി അറിയുക' : 'Track Now')}</span>
          </button>
        </div>

        {/* Action Controls & Sample Demo Button */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 text-xs">
          <button
            onClick={loadSampleTimeline}
            className="font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors"
          >
            {language === 'ml' ? '⚡ മാതൃകാ ടൈംലൈൻ കാണുക (View Sample Demo)' : '⚡ View Illustrative Sample Pipeline'}
          </button>

          <a
            href="https://welfarepension.lsgkerala.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-stone-600 hover:text-emerald-800 transition-colors"
          >
            <span>{language === 'ml' ? 'ഔദ്യോഗിക സേവന പോർട്ടൽ' : 'Official Sevana Portal'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {searchError && (
          <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>{searchError}</span>
          </div>
        )}
      </div>

      {/* Mustering Annual Reminder Notice */}
      <div className="mb-8 p-5 rounded-3xl bg-amber-50 border-2 border-amber-300 flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
          <BellRing className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-extrabold text-amber-950 text-sm">
            {language === 'ml' ? 'വാർഷിക മസ്റ്ററിംഗ് ഓർമ്മപ്പെടുത്തൽ (നവംബർ 30-നകം)' : 'Mandatory Annual Biometric Mustering Alert'}
          </h4>
          <p className="text-xs text-amber-900 mt-1 leading-relaxed">
            {language === 'ml' 
              ? 'പെൻഷൻ തടസ്സമില്ലാതെ തുടരാൻ എല്ലാ ഗുണഭോക്താക്കളും അടുത്തുള്ള അക്ഷയ കേന്ദ്രത്തിൽ വിരലടയാളം നൽകി ജീവൻ രേഖ സമർപ്പിക്കണം. കിടപ്പിലായ രോഗികൾക്ക് അക്ഷയ പ്രവർത്തകർ വീട്ടിലെത്തി മസ്റ്ററിംഗ് നൽകും.' 
              : 'Beneficiaries must complete annual biometric mustering at Akshaya. For bedridden citizens, Akshaya operators provide doorstep verification.'}
          </p>
        </div>
      </div>

      {/* Empty State when no search conducted */}
      {!trackingData && !searchError && (
        <div className="bg-white rounded-3xl p-10 text-center border-2 border-dashed border-stone-200 space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto text-2xl">
            📋
          </div>
          <h3 className="font-extrabold text-base text-stone-900">
            {language === 'ml' ? 'അപേക്ഷാ വിവരങ്ങൾ പരിശോധിക്കാം' : 'Enter Reference ID to Track'}
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
            {language === 'ml'
              ? 'നിങ്ങൾക്ക് അക്ഷയ കേന്ദ്രത്തിൽ നിന്ന് ലഭിച്ച അക്നോളജ്‌മെന്റ് സ്ലിപ്പിലെ റഫറൻസ് നമ്പർ മുകളിൽ നൽകുക. അല്ലെങ്കിൽ മാതൃകാ ടൈംലൈൻ കാണാൻ മുകളിലെ ബട്ടൺ ഉപയോഗിക്കുക.'
              : 'Provide the official application reference number above, or click "View Illustrative Sample Pipeline" to preview the stage progression.'}
          </p>
        </div>
      )}

      {/* Live Timeline Result Card */}
      {trackingData && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-emerald-100 space-y-6">
          
          {isSample && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-bold flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-700" />
              <span>{language === 'ml' ? 'മാതൃകാ വിവരങ്ങൾ / Sample Illustrative Record (Not an Official Government Record)' : 'Illustrative Record for Demonstration Only'}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
            <div>
              <span className="text-xs font-bold text-gray-500">
                {language === 'ml' ? 'അപേക്ഷാ നമ്പർ' : 'Application Reference'}: <span className="text-gray-900 font-black">{trackingData.refNumber}</span>
              </span>
              <h3 className="text-xl font-extrabold text-emerald-950 mt-1">
                {language === 'ml' ? trackingData.schemeName_ml : trackingData.schemeName_en}
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                {language === 'ml' ? 'അപേക്ഷകൻ' : 'Applicant'}: <span className="font-bold">{trackingData.applicantName}</span>
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-2xl flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse"></div>
              <div>
                <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  {language === 'ml' ? 'നിലവിലെ ഘട്ടം' : 'Current Stage'}
                </p>
                <p className="text-xs font-black text-emerald-950">
                  {language === 'ml' ? trackingData.statusText_ml : trackingData.statusText_en}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Visualizer */}
          <div className="space-y-6 py-2">
            {trackingData.timeline.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    step.done 
                      ? 'bg-emerald-600 text-white' 
                      : step.current 
                        ? 'bg-amber-400 text-emerald-950 ring-4 ring-amber-100' 
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>
                  {idx < trackingData.timeline.length - 1 && (
                    <div className={`w-0.5 h-10 ${step.done ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
                  )}
                </div>

                <div className="pt-1 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <p className={`text-sm font-extrabold ${step.current ? 'text-emerald-950 font-black' : step.done ? 'text-gray-900' : 'text-gray-400'}`}>
                      {step.step}
                    </p>
                    <span className="text-xs text-gray-500 font-medium">{step.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Action Box */}
          <div className="p-5 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-start gap-3">
            <Building className="w-5 h-5 text-cyan-700 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-extrabold text-cyan-950 text-xs uppercase tracking-wider">
                {language === 'ml' ? 'അടുത്തതായി ചെയ്യേണ്ടത്' : 'Next Action Required'}
              </h5>
              <p className="text-xs text-cyan-900 mt-1 leading-relaxed">
                {language === 'ml' ? trackingData.nextAction_ml : trackingData.nextAction_en}
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
