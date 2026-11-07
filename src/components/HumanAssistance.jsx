import React from 'react';
import { 
  PhoneCall, 
  MapPin, 
  ShieldAlert, 
  Users, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  HeartHandshake
} from 'lucide-react';
import { HELPLINE_CONTACTS } from '../data/schemesData.js';

export default function HumanAssistance({ language }) {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
          <HeartHandshake className="w-4 h-4 text-emerald-700" />
          <span>{language === 'ml' ? 'സർക്കാർ അംഗീകൃത സഹായം' : 'Authorized Human Assistance'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          {language === 'ml' ? 'സഹായ കേന്ദ്രങ്ങളും ഹെൽപ്‌ലൈൻ നമ്പറുകളും' : 'Help & Authorized Human Assistance'}
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          {language === 'ml' 
            ? 'ഡിജിറ്റൽ സാങ്കേതികവിദ്യ ബുദ്ധിമുട്ടുള്ളവർക്ക് നേരിട്ട് വിളിച്ച് സംസാരിക്കാനുള്ള സൗജന്യ ടോൾ-ഫ്രീ നമ്പറുകൾ.' 
            : 'Toll-free helplines and physical guidance for citizens needing direct human support.'}
        </p>
      </div>

      {/* Helplines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {HELPLINE_CONTACTS.map((helpline, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-sm hover:border-emerald-500 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                  helpline.toll_free ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                }`}>
                  {helpline.toll_free ? (language === 'ml' ? 'ടോൾ-ഫ്രീ (സൗജന്യം)' : 'Toll-Free') : 'Helpline'}
                </span>
                <span className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{language === 'ml' ? helpline.timing_ml : helpline.timing_en}</span>
                </span>
              </div>

              <h3 className="font-extrabold text-lg text-gray-900 mb-2">
                {language === 'ml' ? helpline.name_ml : helpline.name_en}
              </h3>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-2xl font-black text-emerald-800 tracking-wider">
                {helpline.number}
              </span>
              <a
                href={`tel:${helpline.number.replace(/\s+/g, '')}`}
                className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-xs shadow flex items-center gap-1.5 transition-transform active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{language === 'ml' ? 'വിളിക്കുക' : 'Call Now'}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* When is Human Verification Mandatory? */}
      <div className="bg-amber-50 rounded-3xl p-6 sm:p-8 border-2 border-amber-300 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-amber-950">
              {language === 'ml' ? 'എപ്പോഴാണ് നേരിട്ടുള്ള സാന്നിധ്യം നിർബന്ധം?' : 'When is Direct Human Presence Mandatory?'}
            </h3>
            <p className="text-xs text-amber-900">
              {language === 'ml' 
                ? 'സുതാര്യത ഉറപ്പാക്കാനും ആൾമാറാട്ടം തടയാനും സർക്കാർ നിഷ്കർഷിച്ചിട്ടുള്ള ഘട്ടങ്ങൾ' 
                : 'Government statutory procedures that legally require your physical presence'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-white p-4 rounded-2xl border border-amber-200 text-xs text-gray-800 space-y-1">
            <span className="font-extrabold text-emerald-800 text-sm">1. ബയോമെട്രിക് മസ്റ്ററിംഗ്</span>
            <p className="text-gray-600 leading-relaxed">
              {language === 'ml'
                ? 'അക്ഷയ കേന്ദ്രത്തിൽ വിരലടയാളം (Fingerprint) അല്ലെങ്കിൽ ഐറിസ് സ്കാൻ നൽകൽ.'
                : 'Fingerprint or Iris scan at Akshaya Centre for Aadhaar verification.'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-amber-200 text-xs text-gray-800 space-y-1">
            <span className="font-extrabold text-emerald-800 text-sm">2. മെഡിക്കൽ ബോർഡ് പരിശോധന</span>
            <p className="text-gray-600 leading-relaxed">
              {language === 'ml'
                ? 'ഭിന്നശേഷി സർട്ടിഫിക്കറ്റിനും UDID കാർഡിനും ഡോക്ടർമാരുടെ നേരിട്ടുള്ള പരിശോധന.'
                : 'Physical evaluation by hospital Medical Board for disability percentage.'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-amber-200 text-xs text-gray-800 space-y-1">
            <span className="font-extrabold text-emerald-800 text-sm">3. വാർഡ് ഫീൽഡ് ഇൻസ്പെക്ഷൻ</span>
            <p className="text-gray-600 leading-relaxed">
              {language === 'ml'
                ? 'വാർഡ് മെമ്പറും പഞ്ചായത്ത് സെക്രട്ടറിയും ഭവന സന്ദർശനം നടത്തി ജീവിതാവസ്ഥ ഉറപ്പാക്കൽ.'
                : 'Doorstep living condition check by Grama Panchayat ward secretary.'}
            </p>
          </div>
        </div>
      </div>

      {/* Akshaya Centre Guide */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-lg text-gray-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-700" />
          <span>{language === 'ml' ? 'അക്ഷയ കേന്ദ്രത്തിൽ പോകുമ്പോൾ കരുതേണ്ടവ:' : 'Akshaya Centre Checklist:'}</span>
        </h3>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-700">
          <li className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>ആധാർ കാർഡ് ഒറിജിനൽ & ഫോൺ നമ്പർ</span>
          </li>
          <li className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>റേഷൻ കാർഡ് ഒറിജിനൽ പകർപ്പ്</span>
          </li>
          <li className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>ബാങ്ക് പാസ്സ്ബുക്ക് (IFSC കോഡ് വ്യക്തമായത്)</span>
          </li>
          <li className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>ഈ ആപ്പിൽ തയ്യാറാക്കിയ അപേക്ഷാ കരട് പ്രിന്റൗട്ട്</span>
          </li>
        </ul>
      </div>

    </div>
  );
}
