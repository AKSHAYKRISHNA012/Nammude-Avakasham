import React, { useState } from 'react';
import { 
  FileText, 
  Send, 
  Printer, 
  Copy, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  Clock, 
  Building, 
  User, 
  Phone, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { speakText } from '../utils/speech.js';

export default function CitizenGrievanceAssistant({ language }) {
  const [category, setCategory] = useState('pension_delay');
  const [recipient, setRecipient] = useState('panchayat'); // 'panchayat', 'dsjo', or 'cmo'
  
  // Citizen form inputs
  const [citizenName, setCitizenName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [localBody, setLocalBody] = useState('');
  const [wardNo, setWardNo] = useState('');
  const [district, setDistrict] = useState('തിരുവനന്തപുരം (Thiruvananthapuram)');
  const [refNumber, setRefNumber] = useState('');
  const [appliedDate, setAppliedDate] = useState('');
  const [extraDetails, setExtraDetails] = useState('');

  const [copied, setCopied] = useState(false);
  const [showSample, setShowSample] = useState(false);

  // Grievance categories with statutory references
  const CATEGORIES = [
    {
      id: 'pension_delay',
      title_ml: 'ക്ഷേമ പെൻഷൻ അനുവദിക്കുന്നതിലെ കാലതാമസം',
      title_en: 'Delay in Social Welfare Pension Processing',
      act_ml: 'കേരള സേവനാവകാശ നിയമം 2012 (Kerala Right to Service Act 2012 - പരമാവധി 45 ദിവസം)',
      act_en: 'Kerala Right to Service Act 2012 (Statutory 45-day SLA)',
      defaultDesc_ml: 'അക്ഷയ കേന്ദ്രം വഴി അപേക്ഷ നൽകി നിയമാനുസൃതമായ 45 ദിവസ കാലാവധി കഴിഞ്ഞിട്ടും ഇതുവരെ പെൻഷൻ അനുവദിക്കുകയോ കാരണം വ്യക്തമാക്കുകയോ ചെയ്തിട്ടില്ല.',
      defaultDesc_en: 'Application was submitted via Akshaya, but the statutory 45-day deadline has lapsed without disposal or communication.'
    },
    {
      id: 'mustering_issue',
      title_ml: 'വാർഷിക മസ്റ്ററിംഗ് പരാജയം / കിടപ്പുരോഗി ബയോമെട്രിക് സഹായം',
      title_en: 'Biometric Mustering Failure / Doorstep Request for Bedridden Citizen',
      act_ml: 'സാമൂഹ്യ സുരക്ഷാ പെൻഷൻ ചട്ടങ്ങൾ (കിടപ്പുരോഗികൾക്ക് വീട്ടിലെത്തി മസ്റ്ററിംഗ് ചെയ്യാനുള്ള അവകാശം)',
      act_en: 'Social Security Rules (Mandatory doorstep mustering for bedridden beneficiaries)',
      defaultDesc_ml: 'പ്രായധിക്യത്താലോ ശാരീരിക അവശതയാലോ അക്ഷയ കേന്ദ്രത്തിൽ നേരിട്ടെത്താൻ സാധിക്കാത്തതിനാൽ വീട്ടിലെത്തി ബയോമെട്രിക് മസ്റ്ററിംഗ് നടത്താൻ അപേക്ഷിക്കുന്നു.',
      defaultDesc_en: 'Due to severe age-related frailty or bedridden state, unable to visit Akshaya physically. Requesting doorstep biometric mustering.'
    },
    {
      id: 'bpl_ration_card',
      title_ml: 'മുൻഗണനാ റേഷൻ കാർഡ് (BPL/PHH) തരംമാറ്റ അപേക്ഷയിലെ കാലതാമസം',
      title_en: 'Delay in Priority (BPL/PHH) Ration Card Reclassification',
      act_ml: 'ദേശീയ ഭക്ഷ്യസുരക്ഷാ നിയമം 2013 & പൊതുവിതരണ ചട്ടങ്ങൾ',
      act_en: 'National Food Security Act 2013 & PDS Citizen Charter',
      defaultDesc_ml: 'നിർധന കുടുംബവും ഗുരുതര രോഗബാധിതരുമായിട്ടും മുൻഗണനാ വിഭാഗത്തിലേക്ക് (മഞ്ഞ/പിങ്ക് കാർഡ്) മാറ്റാനുള്ള അപേക്ഷയിൽ നടപടി വൈകുന്നു.',
      defaultDesc_en: 'Application for reclassification into priority category (Pink/Yellow card) for medical/economic hardship has been delayed.'
    },
    {
      id: 'disability_cert',
      title_ml: 'മെഡിക്കൽ ബോർഡ് പരിശോധന / UDID കാർഡ് സർട്ടിഫിക്കറ്റ് കാലതാമസം',
      title_en: 'Disability Medical Board Assessment / UDID Card Delay',
      act_ml: 'ഭിന്നശേഷി അവകാശ നിയമം 2016 (RPwD Act 2016 - അദ്ധ്യായം 10, വകുപ്പ് 58)',
      act_en: 'Rights of Persons with Disabilities Act 2016 (Section 58)',
      defaultDesc_ml: 'ഭിന്നശേഷി പെൻഷനും സഹായങ്ങൾക്കുമായി മെഡിക്കൽ ബോർഡിന് മുന്നിൽ ഹാജരാകാനുള്ള അറിയിപ്പ് അല്ലെങ്കിൽ സർട്ടിഫിക്കറ്റ് വിതരണം അകാരണമായി വൈകുന്നു.',
      defaultDesc_en: 'Assessment schedule or issuance of disability certificate for welfare benefits has been delayed beyond reasonable duration.'
    },
    {
      id: 'maintenance_senior',
      title_ml: 'മാതാപിതാക്കളുടെ സംരക്ഷണ ട്രിബ്യൂണൽ സഹായ ഹർജി',
      title_en: 'Maintenance & Protection Petition for Senior Citizen',
      act_ml: 'മാതാപിതാക്കളുടെയും മുതിർന്ന പൗരന്മാരുടെയും സംരക്ഷണ നിയമം 2007 (Section 4 & 5)',
      act_en: 'Maintenance and Welfare of Parents and Senior Citizens Act 2007',
      defaultDesc_ml: 'ജീവനാംശവും പാർപ്പിട സംരക്ഷണവും നൽകാൻ ഉത്തരവാദപ്പെട്ടവർ തയ്യാറാകാത്തതിനാൽ മെയിന്റനൻസ് ട്രിബ്യൂണലിന്റെ അടിയന്തര ഇടപെടൽ അപേക്ഷിക്കുന്നു.',
      defaultDesc_en: 'Filing for urgent intervention of Maintenance Tribunal for basic shelter, medical maintenance, and dignity under 2007 Act.'
    }
  ];

  const selectedCatObj = CATEGORIES.find(c => c.id === category) || CATEGORIES[0];

  const loadSampleData = () => {
    setShowSample(true);
    setCitizenName('ഭവാനിയമ്മ (Bhavani Amma)');
    setGuardianName('പരേതനായ മാധവൻ നായർ (Late Madhavan Nair)');
    setAge('71');
    setPhone('98471 00000');
    setAddress('മേലെപ്പുര വീട്, കണ്ണാടി പി.ഒ, പാലക്കാട്');
    setLocalBody('കണ്ണാടി ഗ്രാമപഞ്ചായത്ത് (Kannadi Grama Panchayat)');
    setWardNo('07');
    setDistrict('പാലക്കാട് (Palakkad)');
    setRefNumber('KSSM-2026-68192');
    setAppliedDate('15 സെപ്റ്റംബർ 2026');
    setExtraDetails('അപേക്ഷ സമർപ്പിച്ച് 60 ദിവസത്തിലേറെയായിട്ടും പഞ്ചായത്ത് സെക്രട്ടറി അന്വേഷണം പൂർത്തിയാക്കുകയോ വിവരങ്ങൾ അറിയിക്കുകയോ ചെയ്തിട്ടില്ല.');
  };

  const clearForm = () => {
    setShowSample(false);
    setCitizenName('');
    setGuardianName('');
    setAge('');
    setPhone('');
    setAddress('');
    setLocalBody('');
    setWardNo('');
    setRefNumber('');
    setAppliedDate('');
    setExtraDetails('');
  };

  // Recipient Title generator
  const getRecipientInfo = () => {
    if (recipient === 'panchayat') {
      return {
        to_ml: `സെക്രട്ടറി അവർകൾക്ക്,\n${localBody || '[പഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റിയുടെ പേര്]'},\n${district}`,
        to_en: `To:\nThe Secretary,\n${localBody || '[Panchayat / Municipality Name]'},\n${district}`,
        title_ml: 'ഗ്രാമപഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റി സെക്രട്ടറി',
        title_en: 'Panchayat / Municipality Secretary'
      };
    } else if (recipient === 'dsjo') {
      return {
        to_ml: `ജില്ലാ സാമൂഹ്യനീതി ഓഫീസർ (DSJO) അവർകൾക്ക്,\nജില്ലാ സാമൂഹ്യനീതി ഓഫീസ്,\n${district}`,
        to_en: `To:\nThe District Social Justice Officer (DSJO),\nDistrict Social Justice Office,\n${district}`,
        title_ml: 'ജില്ലാ സാമൂഹ്യനീതി ഓഫീസർ (DSJO)',
        title_en: 'District Social Justice Officer (DSJO)'
      };
    } else {
      return {
        to_ml: `മുഖ്യമന്ത്രിയുടെ പരാതി പരിഹാര സെൽ (CMO Portal),\nഗവ. സെക്രട്ടേറിയറ്റ്, തിരുവനന്തപുരം - 695001`,
        to_en: `To:\nChief Minister's Public Grievance Redressal Cell (CMO),\nGovernment Secretariat, Thiruvananthapuram - 695001`,
        title_ml: 'മുഖ്യമന്ത്രിയുടെ പരാതി പരിഹാര സെൽ (CMO Portal)',
        title_en: 'Chief Minister\'s Grievance Cell (CMO Portal)'
      };
    }
  };

  const recipientInfo = getRecipientInfo();

  // Generated Petition Texts
  const generatedPetition_ml = `പരാതി / അപേക്ഷ
(കേരള സേവനാവകാശ നിയമം 2012 / ബന്ധപ്പെട്ട നിയമാനുസൃത വ്യവസ്ഥകൾ പ്രകാരം)

സ്വീകർത്താവ്:
${recipientInfo.to_ml}

അപേക്ഷകന്റെ വിവരങ്ങൾ:
പേര്: ${citizenName || '[അപേക്ഷകന്റെ പേര്]'}
രക്ഷാകർത്താവ്/ഭർത്താവ്: ${guardianName || '[പേര്]'}
പ്രായം: ${age || '[പ്രായം]'} വയസ്സ്
മേൽവിലാസം: ${address || '[പൂർണ്ണ വിലാസം]'}
തദ്ദേശ സ്ഥാപനം: ${localBody || '[പഞ്ചായത്ത്/നഗരസഭ]'}, വാർഡ്: ${wardNo || '[വാർഡ് നമ്പർ]'}
ജില്ല: ${district}
ഫോൺ നമ്പർ: ${phone || '[ഫോൺ നമ്പർ]'}

വിഷയം: ${selectedCatObj.title_ml} – അടിയന്തര നടപടി സ്വീകരിക്കുന്നത് സംബന്ധിച്ച്.
സൂചന: അപേക്ഷാ/റഫറൻസ് നമ്പർ: ${refNumber || 'നേരിട്ട് സമർപ്പിച്ചത്'} (തീയതി: ${appliedDate || 'സമീപകാലത്ത്'})
നിയമ വ്യവസ്ഥ: ${selectedCatObj.act_ml}

ബഹുമാനപ്പെട്ട ഉദ്യോഗസ്ഥൻ മുമ്പാകെ സമർപ്പിക്കുന്നത്,

1. മുകളിൽ പേര് വ്യക്തമാക്കിയ ഞാൻ ഒരു മുതിർന്ന പൗരൻ/പൗരയാണ്.
2. ${selectedCatObj.defaultDesc_ml}
3. ${extraDetails ? extraDetails : 'സൂചനയിൽ പരാമർശിച്ച എന്റെ അപേക്ഷയിന്മേൽ സേവനാവകാശ നിയമപ്രകാരം നിശ്ചയിച്ച സമയപരിധിക്കുള്ളിൽ തീർപ്പ് കൽപ്പിച്ചിട്ടില്ല.'}
4. അർഹമായ സർക്കാർ ക്ഷേമ സഹായം ലഭിക്കാത്തതിനാൽ കടുത്ത സാമ്പത്തിക-ആരോഗ്യ വിഷമതകളിലൂടെയാണ് ഞാൻ കടന്നുപോകുന്നത്.

അതിനാൽ, നിയമാനുസൃതമായ വ്യവസ്ഥകൾ പാലിച്ച് എന്റെ അപേക്ഷയിന്മേൽ അടിയന്തരമായി അനുകൂല ഉത്തരവ് പുറപ്പെടുവിക്കണമെന്നും അല്ലെങ്കിൽ കാലതാമസത്തിനുള്ള കാരണം രേഖാമൂലം അറിയിക്കണമെന്നും വിനീതമായി അപേക്ഷിക്കുന്നു.

വിശ്വാസപൂർവ്വം,

ഒപ്പ്/വിരലടയാളം: _______________________
തീയതി: ${new Date().toLocaleDateString('en-GB')}
സ്ഥലം: ${district.split(' ')[0]}`;

  const generatedPetition_en = `FORMAL GRIEVANCE PETITION
(Under Kerala Right to Service Act 2012 / Statutory Welfare Regulations)

To:
${recipientInfo.to_en}

Applicant Details:
Name: ${citizenName || '[Applicant Name]'}
Parent/Spouse Name: ${guardianName || '[Parent/Spouse Name]'}
Age: ${age || '[Age]'} Years
Address: ${address || '[Full Residential Address]'}
Local Body: ${localBody || '[Panchayat/Municipality]'}, Ward No: ${wardNo || '[Ward Number]'}
District: ${district}
Contact Phone: ${phone || '[Phone Number]'}

Subject: Formal representation regarding ${selectedCatObj.title_en}
Reference: Application Reference Number: ${refNumber || 'Submitted'} (Date: ${appliedDate || 'Recent'})
Statutory Provision: ${selectedCatObj.act_en}

Respected Authority,

1. I am submitting this formal representation as an eligible citizen/senior resident of Kerala.
2. ${selectedCatObj.defaultDesc_en}
3. ${extraDetails ? extraDetails : 'The statutory time limit prescribed under the Kerala Right to Service Act 2012 has elapsed without formal disposal or written reason for delay.'}
4. Due to non-receipt of the entitled statutory welfare benefit, I am undergoing significant financial and medical distress.

I respectfully request your good office to urgently review the application file, expedite the pending enquiry/order, and intimate the decision in writing as guaranteed under the Right to Service Act.

Yours faithfully,

Signature / Thumb Impression: _______________________
Date: ${new Date().toLocaleDateString('en-GB')}
Place: ${district.split(' ')[0]}`;

  const currentPetition = language === 'ml' ? generatedPetition_ml : generatedPetition_en;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPetition);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print the petition.');
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>${language === 'ml' ? 'പരാതി അപേക്ഷ' : 'Citizen Grievance Petition'}</title>
          <style>
            body { font-family: 'Courier New', Courier, monospace; font-size: 14px; line-height: 1.6; padding: 40px; color: #111; max-width: 800px; margin: 0 auto; }
            h2 { text-align: center; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 24px; }
            pre { white-space: pre-wrap; font-family: inherit; font-size: inherit; }
            .footer-note { margin-top: 40px; font-size: 11px; color: #666; border-top: 1px dashed #ccc; padding-top: 8px; }
          </style>
        </head>
        <body>
          <h2>${language === 'ml' ? 'പൗര പരാതി അപേക്ഷ' : 'CITIZEN GRIEVANCE PETITION'}</h2>
          <pre>${currentPetition}</pre>
          <div class="footer-note">
            Generated via Nammude Avakasham Citizen Rights Navigator (Based on Kerala Right to Service Act 2012).
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
          <Scale className="w-4 h-4 text-amber-800" />
          <span>{language === 'ml' ? 'സേവനാവകാശ നിയമം 2012 പ്രകാരമുള്ള പരാതി സഹായി' : 'Right to Service Act 2012 Drafting Assistant'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          {language === 'ml' ? 'പൗര പരാതി & ഹർജി ഡ്രാഫ്റ്റിംഗ് സഹായി' : 'Citizen Grievance & Legal Petition Drafter'}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          {language === 'ml' 
            ? 'പെൻഷൻ വൈകുകയോ, മസ്റ്ററിംഗ് തടസ്സപ്പെടുകയോ, അപേക്ഷ നിരസിക്കപ്പെടുകയോ ചെയ്താൽ പഞ്ചായത്ത് സെക്രട്ടറി, ജില്ലാ സാമൂഹ്യനീതി ഓഫീസർ, മുഖ്യമന്ത്രിയുടെ പരാതി പരിഹാര സെൽ എന്നിവർക്ക് നൽകാനുള്ള നിയമപരമായി സാധുതയുള്ള അപേക്ഷ തയ്യാറാക്കാം.' 
            : 'Draft formal, legally compliant grievance petitions under the Kerala Right to Service Act 2012 for delayed pensions, mustering failures, or rejected applications.'}
        </p>

        {/* Demo / Sample Fill Button */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={loadSampleData}
            className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors"
          >
            {language === 'ml' ? '⚡ മാതൃകാ വിവരങ്ങൾ പൂരിപ്പിച്ച് കാണുക (Load Sample Demo)' : '⚡ Load Illustrative Sample Form'}
          </button>
          {showSample && (
            <button
              onClick={clearForm}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
            >
              {language === 'ml' ? 'മായ്‌ക്കുക (Clear)' : 'Clear Form'}
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Form Builder on Left, Live Legal Petition on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Configuration & Form Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Grievance Category Selection */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>{language === 'ml' ? 'പരാതിയുടെ വിഷയം തിരഞ്ഞെടുക്കുക' : 'Select Grievance Category'}</span>
            </h2>

            <div className="space-y-2">
              {CATEGORIES.map((c) => (
                <label
                  key={c.id}
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                    category === c.id 
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-sm' 
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="grievance_cat"
                    value={c.id}
                    checked={category === c.id}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 accent-emerald-800"
                  />
                  <div className="space-y-0.5">
                    <p className="font-extrabold text-xs sm:text-sm text-stone-900">
                      {language === 'ml' ? c.title_ml : c.title_en}
                    </p>
                    <p className="text-[11px] text-emerald-800 font-bold">
                      ⚖️ {language === 'ml' ? c.act_ml : c.act_en}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Step 2: Addressed Authority */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>{language === 'ml' ? 'ആർക്കാണ് പരാതി നൽകേണ്ടത്?' : 'Who are you addressing?'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'panchayat', label_ml: 'ഗ്രാമപഞ്ചായത്ത് സെക്രട്ടറി', label_en: 'Panchayat Secretary' },
                { id: 'dsjo', label_ml: 'ജില്ലാ സാമൂഹ്യനീതി ഓഫീസർ', label_en: 'District Social Justice (DSJO)' },
                { id: 'cmo', label_ml: 'മുഖ്യമന്ത്രിയുടെ സെൽ (CMO)', label_en: 'CMO Grievance Cell' }
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRecipient(r.id)}
                  className={`p-3 rounded-2xl border-2 text-xs font-black transition-all text-center ${
                    recipient === r.id
                      ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                      : 'border-stone-200 hover:border-stone-300 text-stone-600'
                  }`}
                >
                  {language === 'ml' ? r.label_ml : r.label_en}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Citizen Details Form */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>{language === 'ml' ? 'അപേക്ഷകന്റെ വിവരങ്ങൾ' : 'Citizen Particulars'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'ml' ? 'അപേക്ഷകന്റെ പേര്' : 'Applicant Name'} *
                </label>
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  placeholder="e.g. Bhavani Amma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'ml' ? 'രക്ഷാകർത്താവ് / ഭർത്താവ്' : 'Parent / Spouse Name'}
                </label>
                <input
                  type="text"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  placeholder="e.g. Late Madhavan Nair"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'ml' ? 'പ്രായം' : 'Age'}
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 71"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'ml' ? 'ഫോൺ നമ്പർ' : 'Contact Phone'} *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 98471 23456"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'ml' ? 'മേൽവിലാസം' : 'Full Address'}
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House Name, Post Office, Pin Code"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'ml' ? 'പഞ്ചായത്ത് / നഗരസഭ' : 'Local Body (Panchayat)'}
                </label>
                <input
                  type="text"
                  value={localBody}
                  onChange={(e) => setLocalBody(e.target.value)}
                  placeholder="e.g. Kannadi Grama Panchayat"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'ml' ? 'വാർഡ് നമ്പർ' : 'Ward No.'}
                </label>
                <input
                  type="text"
                  value={wardNo}
                  onChange={(e) => setWardNo(e.target.value)}
                  placeholder="e.g. 07"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'ml' ? 'അപേക്ഷാ റഫറൻസ് നമ്പർ (ലഭ്യമെങ്കിൽ)' : 'Akshaya / Sevana Ref Number'}
                </label>
                <input
                  type="text"
                  value={refNumber}
                  onChange={(e) => setRefNumber(e.target.value)}
                  placeholder="e.g. KSSM-2026-68192"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'ml' ? 'അപേക്ഷ നൽകിയ ഏകദേശ തീയതി' : 'Date of Application'}
                </label>
                <input
                  type="text"
                  value={appliedDate}
                  onChange={(e) => setAppliedDate(e.target.value)}
                  placeholder="e.g. 15 September 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'ml' ? 'കൂടുതൽ വിവരങ്ങൾ / കാലതാമസത്തിന്റെ വിവരണം' : 'Additional Remarks / Reason'}
                </label>
                <textarea
                  rows="3"
                  value={extraDetails}
                  onChange={(e) => setExtraDetails(e.target.value)}
                  placeholder={language === 'ml' ? 'എന്ത് തടസ്സമാണ് ഉണ്ടായതെന്ന് ചുരുക്കത്തിൽ എഴുതാം...' : 'Briefly describe how many times you visited or what response was received...'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                ></textarea>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Live Legal Petition View & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="sticky top-28 bg-white rounded-3xl p-6 border-2 border-stone-300 shadow-md space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-800" />
                <h3 className="font-black text-sm text-stone-900 uppercase tracking-wider">
                  {language === 'ml' ? 'തയ്യാറായ ഔദ്യോഗിക ഹർജി' : 'Generated Formal Petition'}
                </h3>
              </div>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                {language === 'ml' ? 'നിയമസാധുതയുള്ളത്' : 'Statutory Format'}
              </span>
            </div>

            {/* Scrollable petition container */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 max-h-[440px] overflow-y-auto text-xs font-mono text-stone-800 leading-relaxed whitespace-pre-wrap select-all">
              {currentPetition}
            </div>

            {/* Action Buttons: Print, Copy, and Official Link */}
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handlePrint}
                  className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95"
                >
                  <Printer className="w-4 h-4 text-emerald-300" />
                  <span>{language === 'ml' ? 'പ്രിന്റ് എടുക്കുക' : 'Print Petition'}</span>
                </button>

                <button
                  onClick={handleCopy}
                  className={`w-full py-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 border-2 transition-all active:scale-95 ${
                    copied 
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900' 
                      : 'bg-white border-stone-300 hover:border-emerald-600 text-stone-800'
                  }`}
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-500" />}
                  <span>{copied ? (language === 'ml' ? 'കോപ്പി ചെയ്തു!' : 'Copied!') : (language === 'ml' ? 'കോപ്പി ചെയ്യുക' : 'Copy Text')}</span>
                </button>
              </div>

              {/* Direct Portal Submission Button */}
              {recipient === 'cmo' ? (
                <a
                  href="https://cmo.kerala.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <span>{language === 'ml' ? 'മുഖ്യമന്ത്രിയുടെ CMO പോർട്ടലിൽ സമർപ്പിക്കുക' : 'Submit on Official CMO Portal'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <a
                  href="https://welfarepension.lsgkerala.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{language === 'ml' ? 'സേവന പെൻഷൻ പോർട്ടൽ തുറക്കുക' : 'Open Sevana Pension Portal'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                </a>
              )}
            </div>

            {/* Informational Guidance Alert */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 space-y-1">
              <p className="font-extrabold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>{language === 'ml' ? 'നിയമാനുസൃത സമയപരിധി' : 'Statutory Guarantee'}</span>
              </p>
              <p className="leading-snug">
                {language === 'ml'
                  ? 'സേവനാവകാശ നിയമപ്രകാരം പെൻഷൻ അപേക്ഷകളിൽ 45 ദിവസത്തിനകം തീരുമാനമെടുക്കണം. ഈ അപേക്ഷ പഞ്ചായത്ത് ഓഫീസിലോ അക്ഷയ കേന്ദ്രം വഴിയോ സമർപ്പിച്ച് രസീത് വാങ്ങുക.'
                  : 'Section 5 of the Kerala Right to Service Act 2012 mandates disposal of pension applications within 45 days. Keep an acknowledged stamped receipt from the Panchayat/DSJO.'}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
