import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Printer, 
  CheckCircle2, 
  Circle, 
  AlertTriangle, 
  FileText, 
  Building, 
  CreditCard, 
  CheckSquare, 
  Square,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { SCHEMES } from '../data/schemesData.js';
import { speakText } from '../utils/speech.js';

export default function DocumentChecklistGenerator({ language }) {
  const [selectedSchemeId, setSelectedSchemeId] = useState(SCHEMES[0]?.id || 'ignaoap');
  const [rationCardType, setRationCardType] = useState('bpl'); // 'bpl' (Yellow/Pink) or 'apl' (Blue/White)
  const [bankDbStatus, setBankDbStatus] = useState('yes'); // 'yes' or 'no'
  const [hasDisability, setHasDisability] = useState(false);
  const [checkedDocs, setCheckedDocs] = useState({});

  const selectedScheme = SCHEMES.find(s => s.id === selectedSchemeId) || SCHEMES[0];

  // Common statutory documents with verification rules
  const getDynamicChecklist = () => {
    const list = [
      {
        id: 'aadhaar',
        name_ml: 'ആധാർ കാർഡ് (ഒറിജിനലും പകർപ്പും)',
        name_en: 'Aadhaar Card (Original & Self-attested Photocopy)',
        authority_ml: 'UIDAI',
        authority_en: 'UIDAI',
        isMandatory: true,
        tip_ml: 'ആധാർ കാർഡിൽ രജിസ്റ്റർ ചെയ്ത മൊബൈൽ നമ്പർ പ്രവർത്തനക്ഷമമായിരിക്കണം (OTP പരിശോധനയ്ക്ക് ആവശ്യം).',
        tip_en: 'Registered mobile number must be active for OTP authentication during Akshaya submission.'
      },
      {
        id: 'ration_card',
        name_ml: `റേഷൻ കാർഡ് (${rationCardType === 'bpl' ? 'മഞ്ഞ / പിങ്ക് മുൻഗണനാ കാർഡ്' : 'വെള്ള / നീല കാർഡ്'})`,
        name_en: `Ration Card (${rationCardType === 'bpl' ? 'Yellow/Pink Priority' : 'White/Blue Non-priority'})`,
        authority_ml: 'ഭക്ഷ്യ-പൊതുവിതരണ വകുപ്പ്',
        authority_en: 'Civil Supplies Dept Kerala',
        isMandatory: true,
        tip_ml: rationCardType === 'bpl' 
          ? 'മഞ്ഞ (AAY) അല്ലെങ്കിൽ പിങ്ക് (PHH) കാർഡുള്ളവർക്ക് പ്രത്യേക വില്ലേജ് വരുമാന സർട്ടിഫിക്കറ്റ് കൂടാതെ തന്നെ മുൻഗണന ലഭിക്കും.'
          : 'വെള്ള/നീല കാർഡുകാർ കുടുംബ വാർഷിക വരുമാനം ₹1,00,000-ൽ താഴെയാണെന്ന് കാണിക്കുന്ന വില്ലേജ് ഓഫീസറുടെ വരുമാന സർട്ടിഫിക്കറ്റ് നിർബന്ധമായും സമർപ്പിക്കണം.',
        tip_en: rationCardType === 'bpl'
          ? 'Yellow (AAY) and Pink (PHH) cards automatically fulfill income criteria without separate village certificate.'
          : 'White/Blue non-priority cardholders must attach Village Officer Income Certificate (< ₹1,00,000).'
      },
      {
        id: 'bank_passbook',
        name_ml: 'ബാങ്ക് പാസ്സ്ബുക്ക് പകർപ്പ് (IFSC കോഡും അക്കൗണ്ട് നമ്പറും വ്യക്തമായത്)',
        name_en: 'Bank Passbook Front Page (Clear Account No & IFSC)',
        authority_ml: 'ഷെഡ്യൂൾഡ് / സഹകരണ ബാങ്ക്',
        authority_en: 'Scheduled Commercial / Co-operative Bank',
        isMandatory: true,
        tip_ml: bankDbStatus === 'yes'
          ? 'അക്കൗണ്ടിൽ ആധാർ DBT / NPCI മാപ്പിംഗ് ഉള്ളതിനാൽ പെൻഷൻ തുക തടസ്സമില്ലാതെ നേരിട്ടെത്തും.'
          : 'ശ്രദ്ധിക്കുക: അക്കൗണ്ടിൽ ആധാർ ലിങ്കിംഗും NPCI മാപ്പിംഗും ബാങ്കിൽ നേരിട്ടെത്തി പൂർത്തിയാക്കണം; അല്ലാത്തപക്ഷം DBT പരാജയപ്പെടാം.',
        tip_en: bankDbStatus === 'yes'
          ? 'NPCI Direct Benefit Transfer mapping verified for smooth electronic credits.'
          : 'Warning: Complete Aadhaar DBT/NPCI seeding at your bank branch to prevent payment failures.'
      },
      {
        id: 'age_proof',
        name_ml: 'പ്രായം തെളിയിക്കുന്ന രേഖ (സ്കൂൾ സർട്ടിഫിക്കറ്റ് / വോട്ടർ ഐഡി / ജനന സർട്ടിഫിക്കറ്റ്)',
        name_en: 'Age Proof (School Leaving Certificate / Voter ID / Birth Certificate)',
        authority_ml: 'തിരഞ്ഞെടുപ്പ് കമ്മീഷൻ / തദ്ദേശ സ്ഥാപനം',
        authority_en: 'Election Commission / Local Body',
        isMandatory: selectedScheme.min_age ? true : false,
        tip_ml: `അപേക്ഷകന് കുറഞ്ഞത് ${selectedScheme.min_age || 60} വയസ്സ് പൂർത്തിയായിരിക്കണം. ആധാർ കാർഡിലെ ജനനത്തീയതി മാത്രം ചിലപ്പോൾ തദ്ദേശ സ്ഥാപനം സ്വീകരിക്കാറില്ല.`,
        tip_en: `Applicant must be ${selectedScheme.min_age || 60}+ years old. Having a secondary age proof (Voter ID / School Certificate) prevents rejection.`
      }
    ];

    // Income certificate requirement for APL or general schemes
    if (rationCardType === 'apl') {
      list.push({
        id: 'income_cert',
        name_ml: 'വില്ലേജ് ഓഫീസറുടെ വരുമാന സർട്ടിഫിക്കറ്റ് (വാർഷിക വരുമാനം ₹1 ലക്ഷത്തിന് താഴെ)',
        name_en: 'Income Certificate from Village Officer (< ₹1 Lakh Annual)',
        authority_ml: 'റവന്യൂ വകുപ്പ് (ഇ-ഡിസ്ട്രിക്റ്റ് പോർട്ടൽ)',
        authority_en: 'Revenue Dept (e-District Kerala)',
        isMandatory: true,
        tip_ml: 'ഇ-ഡിസ്ട്രിക്റ്റ് വഴി ലഭിച്ച ഡിജിറ്റൽ ഒപ്പുള്ള സർട്ടിഫിക്കറ്റ് ആയിരിക്കണം. കാലാവധി 1 വർഷം.',
        tip_en: 'Must be digitally signed certificate from e-District portal with 1-year validity.'
      });
    }

    // Disability specific requirement
    if (selectedScheme.requires_disability || hasDisability) {
      list.push({
        id: 'disability_cert',
        name_ml: 'മെഡിക്കൽ ബോർഡ് ഭിന്നശേഷി സർട്ടിഫിക്കറ്റ് / UDID കാർഡ് (40% അല്ലെങ്കിൽ കൂടുതൽ)',
        name_en: 'Disability Medical Certificate / UDID Card (40%+ Benchmark Disability)',
        authority_ml: 'ജില്ലാ മെഡിക്കൽ ബോർഡ് / കേന്ദ്ര ശാക്തീകരണ വകുപ്പ്',
        authority_en: 'District Medical Board / Swavlamban Portal',
        isMandatory: true,
        tip_ml: 'കുറഞ്ഞത് 40% വൈകല്യം രേഖപ്പെടുത്തിയ സർട്ടിഫിക്കറ്റ് ആയിരിക്കണം. സ്ഥിര വൈകല്യമല്ലെങ്കിൽ കാലാവധി കഴിഞ്ഞിട്ടില്ലെന്ന് ഉറപ്പാക്കുക.',
        tip_en: 'Mandatory benchmark disability of 40% or above certified by an authorized medical board.'
      });
    }

    // Caregiver scheme (Aswasakiranam) requirement
    if (selectedScheme.id === 'aswasakiranam') {
      list.push({
        id: 'doctor_bedridden_cert',
        name_ml: 'കിടപ്പുരോഗിയാണെന്ന് തെളിയിക്കുന്ന സർക്കാർ ഡോക്ടറുടെ മെഡിക്കൽ സർട്ടിഫിക്കറ്റ്',
        name_en: 'Bedridden / Mentally Challenged Certificate by Govt Medical Officer',
        authority_ml: 'അസിസ്റ്റന്റ് സർജൻ അല്ലെങ്കിൽ ഉയർന്ന റാങ്കിലുള്ള സർക്കാർ ഡോക്ടർ',
        authority_en: 'Assistant Surgeon or Senior Govt Medical Officer',
        isMandatory: true,
        tip_ml: 'രോഗി പൂർണ്ണമായും പരസഹായം ആവശ്യമുള്ള ആളാണെന്നും അപേക്ഷകൻ പൂർണ്ണസമയ പരിചാരകനാണെന്നും സാക്ഷ്യപ്പെടുത്തണം.',
        tip_en: 'Must certify that patient requires full-time caregiving and applicant is the non-earning primary caregiver.'
      });
    }

    // Photo requirement
    list.push({
      id: 'photos',
      name_ml: 'പാസ്‌പോർട്ട് സൈസ് ഫോട്ടോ (2 എണ്ണം)',
      name_en: 'Passport Size Photographs (2 copies)',
      authority_ml: 'അപേക്ഷകൻ',
      authority_en: 'Applicant',
      isMandatory: false,
      tip_ml: 'അക്ഷയ കേന്ദ്രത്തിലെ ഓൺലൈൻ അപ്‌ലോഡിനും പഞ്ചായത്ത് അപേക്ഷാ ഫോമിനും ആവശ്യമാണ്.',
      tip_en: 'Needed for online biometric profile attachment and physical office file.'
    });

    return list;
  };

  const checklistItems = getDynamicChecklist();

  const toggleCheck = (id) => {
    setCheckedDocs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalItems = checklistItems.length;
  const completedItems = checklistItems.filter(item => checkedDocs[item.id]).length;
  const progressPercent = Math.round((completedItems / totalItems) * 100);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print the checklist.');
      return;
    }

    const itemsHtml = checklistItems.map((item, idx) => `
      <div style="margin-bottom: 16px; padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
        <div style="font-weight: bold; font-size: 15px;">
          [ ${checkedDocs[item.id] ? 'X' : '  '} ] ${idx + 1}. ${language === 'ml' ? item.name_ml : item.name_en}
          ${item.isMandatory ? '<span style="color: red; font-size: 12px; margin-left: 8px;">* നിർബന്ധം (Mandatory)</span>' : ''}
        </div>
        <div style="font-size: 12px; color: #555; margin-top: 4px;">
          ഇഷ്യൂ ചെയ്ത അതോറിറ്റി / Authority: ${language === 'ml' ? item.authority_ml : item.authority_en}
        </div>
        <div style="font-size: 12px; color: #064e3b; margin-top: 4px; background: #ecfdf5; padding: 6px; border-radius: 4px;">
          നിർദ്ദേശം / Note: ${language === 'ml' ? item.tip_ml : item.tip_en}
        </div>
      </div>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>${language === 'ml' ? 'അക്ഷയ കേന്ദ്ര സന്ദർശന ചെക്ക്‌ലിസ്റ്റ്' : 'Akshaya Document Checklist'}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; padding: 30px; color: #111; max-width: 800px; margin: 0 auto; line-height: 1.5; }
            h1 { font-size: 20px; border-bottom: 2px solid #064e3b; padding-bottom: 8px; color: #064e3b; }
            .meta { font-size: 13px; color: #444; margin-bottom: 20px; background: #f9f9f9; padding: 10px; border-radius: 6px; }
            .footer { margin-top: 30px; font-size: 11px; color: #777; border-top: 1px solid #eee; padding-top: 8px; }
          </style>
        </head>
        <body>
          <h1>${language === 'ml' ? 'നമ്മുടെ അവകാശം – അക്ഷയ കേന്ദ്ര സന്ദർശന ചെക്ക്‌ലിസ്റ്റ്' : 'Nammude Avakasham – Akshaya Document Checklist'}</h1>
          <div class="meta">
            <strong>പദ്ധതി / Scheme:</strong> ${language === 'ml' ? selectedScheme.name_ml : selectedScheme.name_en}<br/>
            <strong>റേഷൻ കാർഡ് തരം / Card Type:</strong> ${rationCardType === 'bpl' ? 'മുൻഗണനാ കാർഡ് (BPL/PHH)' : 'പൊതു വിഭാഗം (APL/White/Blue)'}<br/>
            <strong>ബാങ്ക് അക്കൗണ്ട് DBT മാപ്പിംഗ്:</strong> ${bankDbStatus === 'yes' ? 'തയ്യാറാണ് (Aadhaar Seeded)' : 'തീർപ്പാക്കാനുണ്ട്'}<br/>
            <strong>തീയതി / Generated Date:</strong> ${new Date().toLocaleDateString('en-GB')}
          </div>
          ${itemsHtml}
          <div class="footer">
            തയ്യാറാക്കിയത്: നമ്മുടെ അവകാശം പൗരസഹായ വേദി (Nammude Avakasham Citizen Rights Navigator). ഔദ്യോഗിക വിവരങ്ങൾ പ്രകാരം തയ്യാറാക്കിയത്.
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-emerald-100">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
          <ClipboardCheck className="w-4 h-4 text-emerald-700" />
          <span>{language === 'ml' ? 'അക്ഷയ കേന്ദ്ര സന്ദർശനത്തിനുള്ള രേഖകളുടെ ചെക്ക്‌ലിസ്റ്റ്' : 'Akshaya Document Preparation Checklist'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          {language === 'ml' ? 'അപേക്ഷാ രേഖകളുടെ പരിശോധനാ സഹായി' : 'Statutory Document Checklist Generator'}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          {language === 'ml' 
            ? 'നിങ്ങൾ അപേക്ഷിക്കാൻ ആഗ്രഹിക്കുന്ന ക്ഷേമ പദ്ധതിയും നിങ്ങളുടെ റേഷൻ കാർഡ് തരവും തിരഞ്ഞെടുക്കുക. അക്ഷയ കേന്ദ്രത്തിലേക്ക് കൊണ്ടുപോകേണ്ട കൃത്യമായ രേഖകളുടെ പട്ടികയും നിർദ്ദേശങ്ങളും ഇവിടെ ലഭിക്കും.' 
            : 'Select the intended welfare scheme and your ration card status to generate an exact itemized document checklist with verification guidelines for your Akshaya visit.'}
        </p>
      </div>

      {/* Scheme & Circumstance Configuration Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <h2 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs flex items-center justify-center font-bold">1</span>
          <span>{language === 'ml' ? 'പദ്ധതിയും പൗരന്റെ സാഹചര്യങ്ങളും തിരഞ്ഞെടുക്കുക' : 'Select Scheme & Circumstances'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Scheme Selector */}
          <div>
            <label className="block text-xs font-black text-stone-700 mb-1.5">
              {language === 'ml' ? 'ക്ഷേമ പദ്ധതി തിരഞ്ഞെടുക്കുക' : 'Select Scheme'}
            </label>
            <select
              value={selectedSchemeId}
              onChange={(e) => setSelectedSchemeId(e.target.value)}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-2xl text-stone-900 font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {SCHEMES.map(s => (
                <option key={s.id} value={s.id}>
                  {language === 'ml' ? s.name_ml : s.name_en}
                </option>
              ))}
            </select>
          </div>

          {/* Ration Card Type */}
          <div>
            <label className="block text-xs font-black text-stone-700 mb-1.5">
              {language === 'ml' ? 'റേഷൻ കാർഡ് തരം' : 'Ration Card Category'}
            </label>
            <select
              value={rationCardType}
              onChange={(e) => setRationCardType(e.target.value)}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-2xl text-stone-900 font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="bpl">{language === 'ml' ? 'മഞ്ഞ / പിങ്ക് കാർഡ് (മുൻഗണന - BPL/PHH)' : 'Yellow / Pink Card (Priority BPL/PHH)'}</option>
              <option value="apl">{language === 'ml' ? 'വെള്ള / നീല കാർഡ് (പൊതു വിഭാഗം - Non-priority)' : 'White / Blue Card (Non-Priority)'}</option>
            </select>
          </div>

          {/* Bank DBT Status */}
          <div>
            <label className="block text-xs font-black text-stone-700 mb-1.5">
              {language === 'ml' ? 'ബാങ്ക് ആധാർ DBT ലിങ്കിംഗ്' : 'Bank Account Aadhaar DBT'}
            </label>
            <select
              value={bankDbStatus}
              onChange={(e) => setBankDbStatus(e.target.value)}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-2xl text-stone-900 font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="yes">{language === 'ml' ? 'ലിങ്ക് ചെയ്തിട്ടുണ്ട് (Seeded with NPCI)' : 'Yes, Linked with NPCI Mapping'}</option>
              <option value="no">{language === 'ml' ? 'ലിങ്ക് ചെയ്തിട്ടില്ല / സംശയമുണ്ട്' : 'No / Not Sure'}</option>
            </select>
          </div>

        </div>

        {/* Selected Scheme Quick Summary */}
        <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <p className="font-extrabold text-emerald-950">
              {language === 'ml' ? selectedScheme.name_ml : selectedScheme.name_en}
            </p>
            <p className="text-emerald-800 text-[11px] mt-0.5">
              {language === 'ml' ? selectedScheme.benefit_ml : selectedScheme.benefit_en}
            </p>
          </div>
          <span className="shrink-0 px-3 py-1 rounded-full bg-emerald-800 text-white font-extrabold text-xs">
            {language === 'ml' ? `പ്രതിമാസം ₹${selectedScheme.monthly_amount || 1600}` : `₹${selectedScheme.monthly_amount || 1600}/month`}
          </span>
        </div>
      </div>

      {/* Progress & Checklist Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        
        {/* Progress Tracker */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <h2 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>{language === 'ml' ? 'രേഖകൾ പരിശോധിക്കുക (കയ്യിലുള്ളവ ടിക്ക് ചെയ്യുക)' : 'Interactive Document Verification'}</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'ml'
                ? `${totalItems}-ൽ ${completedItems} രേഖകൾ തയ്യാറായിക്കഴിഞ്ഞു (${progressPercent}% പൂർത്തിയായി)`
                : `${completedItems} of ${totalItems} documents ready (${progressPercent}% complete)`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm transition-transform active:scale-95"
            >
              <Printer className="w-4 h-4 text-emerald-300" />
              <span>{language === 'ml' ? 'പ്രിന്റ് എടുക്കുക (Print Dossier)' : 'Print Akshaya Dossier'}</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-emerald-600 to-amber-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-3.5">
          {checklistItems.map((item, index) => {
            const isChecked = !!checkedDocs[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 select-none ${
                  isChecked 
                    ? 'bg-emerald-50/50 border-emerald-500/80 shadow-xs' 
                    : 'bg-stone-50/50 hover:bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-700" />
                  ) : (
                    <Square className="w-5 h-5 text-stone-400" />
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className={`text-sm sm:text-base font-extrabold leading-snug ${
                      isChecked ? 'text-emerald-950 line-through opacity-85' : 'text-stone-900'
                    }`}>
                      {index + 1}. {language === 'ml' ? item.name_ml : item.name_en}
                    </h3>

                    {item.isMandatory ? (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-red-100 text-red-800">
                        {language === 'ml' ? 'നിർബന്ധം' : 'Mandatory'}
                      </span>
                    ) : (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-stone-200 text-stone-700">
                        {language === 'ml' ? 'അനുബന്ധം' : 'Supplementary'}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-500 font-medium">
                    {language === 'ml' ? 'ഇഷ്യൂ ചെയ്ത അതോറിറ്റി' : 'Issuing Authority'}: <span className="font-bold text-stone-700">{language === 'ml' ? item.authority_ml : item.authority_en}</span>
                  </p>

                  <div className="p-2.5 rounded-xl bg-white border border-stone-200/90 text-xs text-emerald-900 font-medium leading-relaxed">
                    💡 <span className="font-bold">{language === 'ml' ? 'പ്രധാന നിർദ്ദേശം' : 'Key Note'}:</span> {language === 'ml' ? item.tip_ml : item.tip_en}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Akshaya Rejection Prevention Advisory */}
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
          <p className="font-black text-sm flex items-center gap-1.5 text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>{language === 'ml' ? 'അക്ഷയ കേന്ദ്രത്തിൽ അപേക്ഷ നിരസിക്കപ്പെടാതിരിക്കാൻ ശ്രദ്ധിക്കേണ്ട കാര്യങ്ങൾ' : 'Pitfalls to Avoid Akshaya Rejection'}</span>
          </p>
          <ul className="list-disc list-inside space-y-1 text-amber-900/90 leading-relaxed font-medium">
            <li>{language === 'ml' ? 'ആധാർ കാർഡിലെ പേരും ബാങ്ക് പാസ്സ്ബുക്കിലെ പേരും തമ്മിൽ അക്ഷരത്തെറ്റുകൾ ഇല്ലെന്ന് ഉറപ്പുവരുത്തുക.' : 'Ensure spelling matches exactly between Aadhaar and Bank Passbook.'}</li>
            <li>{language === 'ml' ? 'ബാങ്ക് ലയനത്തിന് ശേഷം IFSC കോഡ് മാറിയിട്ടുണ്ടെങ്കിൽ പുതിയ പാസ്സ്ബുക്ക് പകർപ്പ് കരുതുക.' : 'If bank merged recently, carry updated passbook with current 11-digit IFSC code.'}</li>
            <li>{language === 'ml' ? 'ആധാർ ലിങ്ക് ചെയ്ത ഫോൺ നമ്പർ കയ്യിൽ കരുതുക (ഓൺലൈൻ സമർപ്പണത്തിന് OTP ആവശ്യമാണ്).' : 'Keep the Aadhaar-linked mobile phone with you for real-time OTP verification.'}</li>
            <li>{language === 'ml' ? 'ഓൺലൈൻ അപേക്ഷ സമർപ്പിച്ച ശേഷം അക്ഷയ നൽകുന്ന കമ്പ്യൂട്ടർ രസീത് പഞ്ചായത്ത് സെക്രട്ടറിക്ക് നേരിട്ട് സമർപ്പിക്കണം.' : 'Submit the computer-generated Akshaya receipt copy to Panchayat Secretary with physical documents.'}</li>
          </ul>
        </div>

      </div>

    </div>
  );
}
