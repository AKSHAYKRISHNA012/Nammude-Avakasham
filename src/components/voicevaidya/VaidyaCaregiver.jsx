import React, { useState } from 'react';
import { 
  Users, 
  PhoneCall, 
  ShieldCheck, 
  Bell, 
  Upload, 
  FileText, 
  Check, 
  MessageCircle,
  Lock,
  HeartHandshake
} from 'lucide-react';
import { CAREGIVER_PROFILE } from '../../data/vaidyaData.js';

export default function VaidyaCaregiver({ language }) {
  const [caregiver, setCaregiver] = useState(CAREGIVER_PROFILE);
  const [permissions, setPermissions] = useState(CAREGIVER_PROFILE.permissions);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const togglePermission = (key) => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-teal-100">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold mb-2">
          <HeartHandshake className="w-4 h-4 text-teal-700" />
          <span>{language === 'ml' ? 'കുടുംബാംഗങ്ങളുമായി ബന്ധപ്പെടൽ' : 'Caregiver Connection'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          {language === 'ml' ? 'കുടുംബവും പരിചാരക സഹായവും' : 'Trusted Family & Caregiver Connection'}
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          {language === 'ml' 
            ? 'നിങ്ങൾ മരുന്ന് കഴിക്കാൻ മറന്നാൽ മാത്രം നിങ്ങളുടെ അനുവാദത്തോടെ കുടുംബാംഗങ്ങൾക്ക് സന്ദേശം അയക്കുന്നു.' 
            : 'Keeps your trusted family members updated with full consent and privacy controls.'}
        </p>
      </div>

      {/* Connected Caregiver Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-teal-700 text-white flex items-center justify-center font-black text-2xl shadow">
            👨‍👦
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
              {language === 'ml' ? 'അംഗീകൃത കുടുംബാംഗം' : 'Authorized Caregiver'}
            </span>
            <h3 className="text-xl font-extrabold text-gray-900">{caregiver.name}</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              {language === 'ml' ? caregiver.relationship_ml : caregiver.relationship_en} | {caregiver.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${caregiver.phone.replace(/\s+/g, '')}`}
            className="px-5 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-black text-xs shadow flex items-center gap-2 transition-transform active:scale-95"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{language === 'ml' ? 'വിളിക്കുക' : 'Call Caregiver'}</span>
          </a>
        </div>
      </div>

      {/* Permission & Privacy Controls */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-teal-700" />
              <span>{language === 'ml' ? 'സമ്മതവും സ്വകാര്യതാ നിയന്ത്രണങ്ങളും:' : 'Consent & Privacy Settings:'}</span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {language === 'ml' ? 'നിങ്ങൾക്ക് ആവശ്യമുള്ള വിവരങ്ങൾ മാത്രം പങ്കുവെക്കാം' : 'Control what information your caregiver can view or receive'}
            </p>
          </div>

          {saveSuccess && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {language === 'ml' ? 'മാറ്റങ്ങൾ രേഖപ്പെടുത്തി ✓' : 'Settings Updated ✓'}
            </span>
          )}
        </div>

        <div className="space-y-4">
          
          {/* Toggle 1: Missed Dose Alerts */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="space-y-0.5 pr-4">
              <h4 className="font-extrabold text-sm text-gray-900">
                {language === 'ml' ? 'മരുന്ന് ഒഴിവാക്കിയാൽ അറിയിപ്പ് നൽകുക' : 'Missed Medication Alerts (WhatsApp / SMS)'}
              </h4>
              <p className="text-xs text-gray-600">
                {language === 'ml' 
                  ? 'നിശ്ചിത സമയത്ത് മരുന്ന് കഴിച്ചില്ലെങ്കിൽ കുടുംബാംഗത്തിന് സന്ദേശം പോകുന്നു.' 
                  : 'Sends an alert to caregiver only when a scheduled dose is skipped or unrecorded.'}
              </p>
            </div>
            <button
              onClick={() => togglePermission('missedDoseAlerts')}
              className={`w-12 h-7 rounded-full transition-colors relative flex-shrink-0 ${
                permissions.missedDoseAlerts ? 'bg-teal-700' : 'bg-gray-300'
              }`}
            >
              <span className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${
                permissions.missedDoseAlerts ? 'right-1' : 'left-1'
              }`} />
            </button>
          </div>

          {/* Toggle 2: Caregiver Prescription Upload */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="space-y-0.5 pr-4">
              <h4 className="font-extrabold text-sm text-gray-900">
                {language === 'ml' ? 'കുടുംബാംഗത്തിന് കുറിപ്പടി അപ്‌ലോഡ് ചെയ്യാം' : 'Allow Caregiver to Upload Prescriptions'}
              </h4>
              <p className="text-xs text-gray-600">
                {language === 'ml' 
                  ? 'നിങ്ങൾക്ക് പകരം കുടുംബാംഗത്തിന് ഫോണിൽ നിന്ന് കുറിപ്പടി ചേർക്കാൻ അനുവാദം നൽകുന്നു.' 
                  : 'Empowers family member to upload prescriptions remotely on your behalf.'}
              </p>
            </div>
            <button
              onClick={() => togglePermission('prescriptionUpload')}
              className={`w-12 h-7 rounded-full transition-colors relative flex-shrink-0 ${
                permissions.prescriptionUpload ? 'bg-teal-700' : 'bg-gray-300'
              }`}
            >
              <span className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${
                permissions.prescriptionUpload ? 'right-1' : 'left-1'
              }`} />
            </button>
          </div>

          {/* Toggle 3: View Visit Summary */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="space-y-0.5 pr-4">
              <h4 className="font-extrabold text-sm text-gray-900">
                {language === 'ml' ? 'ഡോക്ടർ സന്ദർശന വിവരങ്ങൾ കാണാൻ അനുവാദം' : 'Share Doctor Visit Summaries'}
              </h4>
              <p className="text-xs text-gray-600">
                {language === 'ml' 
                  ? 'ഡോക്ടറെ കാണാൻ തയ്യാറാക്കിയ സമ്മറിയും ചോദ്യങ്ങളും കുടുംബാംഗത്തിന് കാണാം.' 
                  : 'Allows caregiver to view prepared symptom briefs and doctor questions.'}
              </p>
            </div>
            <button
              onClick={() => togglePermission('viewVisitSummary')}
              className={`w-12 h-7 rounded-full transition-colors relative flex-shrink-0 ${
                permissions.viewVisitSummary ? 'bg-teal-700' : 'bg-gray-300'
              }`}
            >
              <span className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${
                permissions.viewVisitSummary ? 'right-1' : 'left-1'
              }`} />
            </button>
          </div>

        </div>
      </div>

      {/* Recent Alerts Feed */}
      <div className="bg-teal-50/50 rounded-3xl p-6 border border-teal-200 space-y-3">
        <h4 className="font-extrabold text-sm text-teal-950 flex items-center gap-2">
          <Bell className="w-4 h-4 text-teal-700" />
          <span>{language === 'ml' ? 'അടുത്തിടെ അയച്ച അറിയിപ്പുകൾ:' : 'Recent Caregiver Updates:'}</span>
        </h4>
        {caregiver.recentAlerts.map(alert => (
          <div key={alert.id} className="p-3 bg-white rounded-xl border border-teal-100 text-xs text-gray-700 flex items-start justify-between gap-4">
            <span>{alert.message_ml}</span>
            <span className="text-[10px] text-gray-400 font-bold whitespace-nowrap">{alert.timestamp}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
