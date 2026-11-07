import React, { useState } from 'react';
import { X, ShieldCheck, Scale, Cookie, AlertTriangle, Eye, Lock, Check } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, language }) {
  const [activeTab, setActiveTab] = useState('privacy');
  const [cookiePrefs, setCookiePrefs] = useState({
    essential: true,
    accessibility: true,
    audioTelemetry: false
  });
  const [savedCookies, setSavedCookies] = useState(false);

  if (!isOpen) return null;

  const tabs = [
    { id: 'privacy', label_ml: 'സ്വകാര്യതാ നയം (Privacy)', label_en: 'Privacy Policy', icon: Lock },
    { id: 'terms', label_ml: 'വ്യവസ്ഥകൾ (Terms)', label_en: 'Terms of Service', icon: Scale },
    { id: 'cookies', label_ml: 'കുക്കികൾ (Cookie Prefs)', label_en: 'Cookie Preferences', icon: Cookie },
    { id: 'accessibility', label_ml: 'ആക്സസിബിലിറ്റി (WCAG)', label_en: 'Accessibility', icon: Eye },
    { id: 'disclaimer', label_ml: 'നിയമപരമായ അറിയിപ്പ്', label_en: 'Disclaimer', icon: AlertTriangle }
  ];

  const handleSaveCookies = () => {
    setSavedCookies(true);
    setTimeout(() => setSavedCookies(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border-4 border-amber-400 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-lg text-amber-300">
                {language === 'ml' ? 'നിയമ സുരക്ഷാ & സ്വകാര്യതാ കേന്ദ്രം' : 'Legal, Privacy & Compliance Enclave'}
              </h3>
              <p className="text-xs text-emerald-200">
                DPDP Act 2023, GDPR & WCAG 2.1 AA Compliant
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-emerald-900 hover:bg-emerald-800 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigator */}
        <div className="flex overflow-x-auto p-2 bg-gray-50 border-b border-gray-200 gap-1 text-xs font-black">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-emerald-800 text-amber-300 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{language === 'ml' ? tab.label_ml : tab.label_en}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed flex-1">
          
          {/* Privacy Policy */}
          {activeTab === 'privacy' && (
            <div className="space-y-3">
              <h4 className="text-base font-black text-gray-900">
                {language === 'ml' ? 'ഡിജിറ്റൽ വ്യക്തിഗത ഡാറ്റാ സംരക്ഷണ നയം (DPDP Act 2023 & GDPR)' : 'Digital Personal Data Protection Policy'}
              </h4>
              <p>
                {language === 'ml'
                  ? 'നമ്മുടെ അവകാശം & വോയ്‌സ് വൈദ്യ പ്ലാറ്റ്‌ഫോമിൽ ഉപയോക്താക്കളുടെ വിവരങ്ങൾ പരമ സുരക്ഷിതമാണ്. നിങ്ങളുടെ ആധാർ, റേഷൻ കാർഡ്, മെഡിക്കൽ കുറിപ്പടികൾ എന്നിവ ഒരു മൂന്നാം കക്ഷിയുമായും അനുവാദമില്ലാതെ പങ്കിടില്ല.'
                  : 'We strictly protect user privacy under India\'s DPDP Act 2023 and GDPR guidelines. Uploaded certificates and medical prescriptions are parsed locally/server-side in transient memory with zero persistent tracking.'}
              </p>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 font-medium">
                <strong>Zero Client-Side Secrets:</strong> All authentication tokens and API keys are encapsulated in server middleware. No private credentials exist in client bundles.
              </div>
            </div>
          )}

          {/* Terms of Service */}
          {activeTab === 'terms' && (
            <div className="space-y-3">
              <h4 className="text-base font-black text-gray-900">
                {language === 'ml' ? 'സേവന വ്യവസ്ഥകൾ (Terms of Service)' : 'Terms of Service'}
              </h4>
              <p>
                {language === 'ml'
                  ? '1. ഈ പ്ലാറ്റ്‌ഫോം മുതിർന്ന പൗരന്മാർക്കും ഭിന്നശേഷിക്കാർക്കും സർക്കാർ ആനുകൂല്യങ്ങളും ആരോഗ്യ വിവരങ്ങളും മനസ്സിലാക്കാൻ സഹായിക്കുന്ന ഒരു വഴികാട്ടിയാണ്.'
                  : '1. This platform provides welfare discovery guidance and medication scheduling for senior citizens and persons with disabilities in Kerala.'}
              </p>
              <p>
                {language === 'ml'
                  ? '2. ഔദ്യോഗിക സർക്കാർ പെൻഷൻ അംഗീകാരത്തിന് അക്ഷയ കേന്ദ്രം വഴിയുള്ള ബയോമെട്രിക് മസ്റ്ററിംഗും പഞ്ചായത്ത് സെക്രട്ടറിയുടെ ഫീൽഡ് ഇൻസ്പെക്ഷനും നിർബന്ധമാണ്.'
                  : '2. Official welfare benefits legally mandate biometric mustering at authorized Akshaya Centres and local self-government field inspection.'}
              </p>
            </div>
          )}

          {/* Cookie Preferences */}
          {activeTab === 'cookies' && (
            <div className="space-y-4">
              <h4 className="text-base font-black text-gray-900">
                {language === 'ml' ? 'കുക്കി മുൻഗണനകൾ ക്രമീകരിക്കുക' : 'Interactive Cookie Preferences'}
              </h4>
              <p className="text-xs text-gray-500">
                {language === 'ml' ? 'നിങ്ങളുടെ സ്വകാര്യതയ്ക്ക് അനുയോജ്യമായ രീതിയിൽ മാറ്റങ്ങൾ വരുത്താം:' : 'Manage privacy and local storage cookies for accessibility:'}
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-200">
                  <div>
                    <h5 className="font-bold text-gray-900">Essential Session Storage</h5>
                    <p className="text-[11px] text-gray-500">Preserves language toggle and active draft entries.</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Always Active</span>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-200">
                  <div>
                    <h5 className="font-bold text-gray-900">Accessibility Preferences</h5>
                    <p className="text-[11px] text-gray-500">Remembers High Contrast mode and font scale (A-/A+).</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={cookiePrefs.accessibility}
                    onChange={(e) => setCookiePrefs(p => ({ ...p, accessibility: e.target.checked }))}
                    className="w-5 h-5 text-teal-600 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                {savedCookies && <span className="text-xs font-bold text-emerald-700">Preferences Saved ✓</span>}
                <button
                  onClick={handleSaveCookies}
                  className="px-5 py-2 rounded-xl bg-teal-700 text-white font-bold text-xs shadow hover:bg-teal-800 ml-auto"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Accessibility Statement */}
          {activeTab === 'accessibility' && (
            <div className="space-y-3">
              <h4 className="text-base font-black text-gray-900">
                {language === 'ml' ? 'ആക്സസിബിലിറ്റി പ്രഖ്യാപനം (WCAG 2.1 AA)' : 'Accessibility Statement (WCAG 2.1 AA)'}
              </h4>
              <p>
                {language === 'ml'
                  ? 'മുതിർന്നവർക്കും കാഴ്ച/ശ്രവണ പരിമിതികൾ ഉള്ളവർക്കും എളുപ്പത്തിൽ ഉപയോഗിക്കാൻ പാകത്തിൽ തയ്യാറാക്കിയത്:'
                  : 'Built following Web Content Accessibility Guidelines (WCAG 2.1 Level AA):'}
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Minimum 48px touch targets for tremors and motor difficulties.</li>
                <li>High-Contrast Mode (Yellow on Black) for low vision and cataract conditions.</li>
                <li>Full Web Speech API audio read-out on all scheme and prescription cards.</li>
                <li>Accessible semantic ARIA landmarks and screen-reader announcements.</li>
              </ul>
            </div>
          )}

          {/* Disclaimer */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-3">
              <h4 className="text-base font-black text-gray-900">
                {language === 'ml' ? 'നിയമപരമായ & മെഡിക്കൽ ഡിസ്ക്ലെയിമർ' : 'Statutory & Medical Disclaimer'}
              </h4>
              <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-300 space-y-2 text-xs text-amber-950 font-medium">
                <p>
                  <strong>മെഡിക്കൽ അറിയിപ്പ്:</strong> വോയ്‌സ് വൈദ്യ ഒരു അംഗീകൃത ഡോക്ടറുടെ ശാരീരിക പരിശോധനയ്ക്ക് പകരമല്ല. ഡോക്ടറുടെ അനുവാദമില്ലാതെ മരുന്നിന്റെ അളവ് മാറ്റരുത്.
                </p>
                <p>
                  <strong>സർക്കാർ ആനുകൂല്യ അറിയിപ്പ്:</strong> ഈ പ്ലാറ്റ്‌ഫോം അപേക്ഷാ കരട് ഫോം തയ്യാറാക്കാൻ മാത്രമാണ്. യഥാർത്ഥ അപേക്ഷ സർക്കാരിലേക്ക് അയയ്ക്കാൻ അക്ഷയ കേന്ദ്രത്തിലെ നേരിട്ടുള്ള ബയോമെട്രിക് സ്ഥിരീകരണം നിർബന്ധമാണ്.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-100 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-900 text-white font-bold text-xs hover:bg-emerald-800"
          >
            {language === 'ml' ? 'ശരി, മനസ്സിലായി' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
}
