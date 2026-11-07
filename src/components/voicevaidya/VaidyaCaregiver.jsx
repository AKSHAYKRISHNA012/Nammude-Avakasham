import React, { useState, useEffect } from 'react';
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
  HeartHandshake,
  Plus,
  Trash2,
  Info
} from 'lucide-react';

export default function VaidyaCaregiver({ language }) {
  const [caregiver, setCaregiver] = useState(() => {
    try {
      const saved = localStorage.getItem('vaidya_caregiver');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAdding, setIsAdding] = useState(false);
  const [formName, setFormName] = useState('');
  const [formRelation, setFormRelation] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const loadSampleCaregiver = () => {
    const sample = {
      name: "രാഹുൽ നായർ (Rahul Nair)",
      relationship_ml: "മകൻ (Son)",
      relationship_en: "Son",
      phone: "+91 98471 23456",
      isSample: true,
      permissions: {
        missedDoseAlerts: true,
        prescriptionUpload: true,
        viewVisitSummary: true
      }
    };
    setCaregiver(sample);
    try {
      localStorage.setItem('vaidya_caregiver', JSON.stringify(sample));
    } catch (e) {}
  };

  const handleSaveCustom = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;

    const newCaregiver = {
      name: formName.trim(),
      relationship_ml: formRelation.trim() || 'കുടുംബാംഗം',
      relationship_en: formRelation.trim() || 'Family Member',
      phone: formPhone.trim(),
      isSample: false,
      permissions: {
        missedDoseAlerts: true,
        prescriptionUpload: true,
        viewVisitSummary: true
      }
    };

    setCaregiver(newCaregiver);
    try {
      localStorage.setItem('vaidya_caregiver', JSON.stringify(newCaregiver));
    } catch (err) {}

    setIsAdding(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleRemoveCaregiver = () => {
    setCaregiver(null);
    try {
      localStorage.removeItem('vaidya_caregiver');
    } catch (e) {}
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

      {/* When no caregiver configured */}
      {!caregiver && !isAdding && (
        <div className="bg-white rounded-3xl p-10 text-center border-2 border-dashed border-stone-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center mx-auto text-2xl">
            👨‍👦
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-lg text-stone-900">
              {language === 'ml' ? 'കെയർഗിവർ വിവരങ്ങൾ ചേർത്തിട്ടില്ല' : 'No Caregiver Linked Yet'}
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
              {language === 'ml'
                ? 'നിങ്ങളുടെ മരുന്ന് സമയങ്ങൾ ശ്രദ്ധിക്കാൻ മകന്റെയോ മകളുടെയോ മറ്റ് കുടുംബാംഗങ്ങളുടെയോ ഫോൺ നമ്പർ ചേർക്കാവുന്നതാണ്.'
                : 'Link a family member or trusted caregiver to receive automated missed dose reminders.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsAdding(true)}
              className="px-6 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'ml' ? 'പുതിയ കെയർഗിവറെ ചേർക്കുക' : 'Add Caregiver Contact'}</span>
            </button>

            <button
              onClick={loadSampleCaregiver}
              className="px-4 py-3 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-900 font-bold text-xs border border-teal-200 transition-colors"
            >
              {language === 'ml' ? '⚡ മാതൃകാ പ്രൊഫൈൽ നൽകുക (Load Demo)' : '⚡ Load Sample Profile'}
            </button>
          </div>
        </div>
      )}

      {/* Caregiver Add Form Modal / Inline Card */}
      {isAdding && (
        <form onSubmit={handleSaveCustom} className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-300 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base text-gray-900">
            {language === 'ml' ? 'വിശ്വസ്ത കെയർഗിവറുടെ വിവരങ്ങൾ നൽകുക' : 'Add Caregiver Contact Details'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">{language === 'ml' ? 'പേര്' : 'Name'} *</label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Rahul Nair"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">{language === 'ml' ? 'ബന്ധം' : 'Relationship'}</label>
              <input
                type="text"
                value={formRelation}
                onChange={(e) => setFormRelation(e.target.value)}
                placeholder="e.g. മകൻ (Son)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">{language === 'ml' ? 'ഫോൺ നമ്പർ' : 'Phone Number'} *</label>
              <input
                type="tel"
                required
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                placeholder="e.g. 98471 23456"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl text-stone-600 text-xs font-bold hover:bg-stone-100"
            >
              {language === 'ml' ? 'റദ്ദാക്കുക' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs shadow-sm"
            >
              {language === 'ml' ? 'സേവ് ചെയ്യുക' : 'Save Caregiver'}
            </button>
          </div>
        </form>
      )}

      {/* Connected Caregiver Profile Card */}
      {caregiver && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-200 shadow-sm space-y-6">
          {caregiver.isSample && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-bold flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-700" />
              <span>{language === 'ml' ? 'മാതൃകാ കെയർഗിവർ പ്രൊഫൈൽ / Sample Profile for Demonstration' : 'Illustrative Caregiver Profile'}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
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
                  {caregiver.relationship_ml} • {caregiver.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRemoveCaregiver}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{language === 'ml' ? 'നീക്കം ചെയ്യുക' : 'Remove'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
