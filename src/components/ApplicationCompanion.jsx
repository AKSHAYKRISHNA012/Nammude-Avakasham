import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Printer, 
  Download, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight,
  User,
  CreditCard,
  Building2,
  FileText
} from 'lucide-react';
import { SCHEMES } from '../data/schemesData.js';

export default function ApplicationCompanion({ 
  language, 
  setActiveScreen, 
  selectedSchemeId = 'ignaoap' 
}) {
  const scheme = SCHEMES.find(s => s.id === selectedSchemeId) || SCHEMES[0];

  const [formData, setFormData] = useState({
    fullName: 'ശ്രീധരൻ നായർ (Sreedharan Nair)',
    age: 68,
    gender: 'Male / പുരുഷൻ',
    phone: '9847123456',
    aadhaarMasked: 'XXXX-XXXX-8941',
    rationCardNo: '1408192837',
    rationCardType: 'Pink (PHH)',
    district: 'Thiruvananthapuram',
    localBody: 'Nemom Grama Panchayat',
    wardNo: '04',
    address: 'ശാന്തി ഭവൻ, ശാന്തിനഗർ, നേമം പി.ഒ',
    bankName: 'കേരള ഗ്രാമീൺ ബാങ്ക് (Kerala Gramin Bank)',
    accountNoMasked: 'XXXXXX7842',
    ifscCode: 'KLGB0004123'
  });

  const [generatedDraft, setGeneratedDraft] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDraft = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/applications/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schemeId: scheme.id,
          applicantData: formData
        })
      });
      const data = await response.json();
      if (data.success) {
        setGeneratedDraft(data.draft);
      }
    } catch (err) {
      console.error(err);
      // Fallback draft
      setGeneratedDraft({
        refNumber: `NAVA-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toLocaleDateString(),
        schemeName_ml: scheme.name_ml,
        applicantData: formData,
        mandatoryHumanSteps_ml: [
          "1. ഈ അപേക്ഷയുടെ പ്രിന്റൗട്ട് എടുക്കുക.",
          "2. അടുത്തുള്ള അക്ഷയ കേന്ദ്രത്തിൽ പോയി ബയോമെട്രിക് (വിരലടയാളം) നൽകി സേവന പോർട്ടലിൽ സബ്മിറ്റ് ചെയ്യുക.",
          "3. അക്ഷയയിൽ നിന്നുള്ള രസീതും രേഖകളുടെ പകർപ്പും തദ്ദേശ സ്വയംഭരണ സ്ഥാപനത്തിൽ സമർപ്പിക്കുക."
        ],
        warning_ml: 'ശ്രദ്ധിക്കുക: ഈ അപേക്ഷ ഒരു കരട് മാത്രമാണ്. അക്ഷയ കേന്ദ്രം വഴിയുള്ള ബയോമെട്രിക് സ്ഥിരീകരണം ഇല്ലാതെ ഇത് സർക്കാരിലേക്ക് പൂർണ്ണമായി സമർപ്പിക്കപ്പെടില്ല.'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Title Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold mb-2">
          <ClipboardCheck className="w-4 h-4 text-rose-600" />
          <span>{language === 'ml' ? 'അപേക്ഷാ കരട് ഫോം സഹായി' : 'Application Draft Companion'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          {language === 'ml' ? 'അപേക്ഷാ വിവരങ്ങൾ തയ്യാറാക്കൽ' : 'Prepare Application Draft'}
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          {language === 'ml' 
            ? `തിരഞ്ഞെടുത്ത പദ്ധതി: ${scheme.name_ml}` 
            : `Selected Scheme: ${scheme.name_en}`}
        </p>
      </div>

      {!generatedDraft ? (
        /* Form Entry Card */
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-emerald-100 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'ml' ? 'അപേക്ഷകന്റെ പൂർണ്ണ പേര് (Full Name):' : 'Full Name of Applicant:'}
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'ml' ? 'ഫോൺ നമ്പർ (Mobile Number):' : 'Mobile Phone Number:'}
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-gray-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'ml' ? 'പ്രായം (Age):' : 'Age:'}
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'ml' ? 'ആധാർ നമ്പർ (Aadhaar):' : 'Aadhaar (Masked):'}
              </label>
              <input
                type="text"
                value={formData.aadhaarMasked}
                onChange={(e) => setFormData(prev => ({ ...prev, aadhaarMasked: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'ml' ? 'റേഷൻ കാർഡ് നമ്പർ:' : 'Ration Card No:'}
              </label>
              <input
                type="text"
                value={formData.rationCardNo}
                onChange={(e) => setFormData(prev => ({ ...prev, rationCardNo: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-gray-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'ml' ? 'പഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റി:' : 'Local Body (Panchayat / Municipality):'}
              </label>
              <input
                type="text"
                value={formData.localBody}
                onChange={(e) => setFormData(prev => ({ ...prev, localBody: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {language === 'ml' ? 'വാർഡ് നമ്പർ (Ward No):' : 'Ward Number:'}
              </label>
              <input
                type="text"
                value={formData.wardNo}
                onChange={(e) => setFormData(prev => ({ ...prev, wardNo: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-gray-900"
              />
            </div>
          </div>

          {/* Bank Account Details */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-4">
            <h4 className="font-extrabold text-amber-950 text-sm flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-700" />
              <span>{language === 'ml' ? 'പെൻഷൻ തുക ലഭിക്കേണ്ട ബാങ്ക് അക്കൗണ്ട് വിവരങ്ങൾ:' : 'Bank Account for Pension Credit:'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  {language === 'ml' ? 'ബാങ്കിന്റെ പേര്:' : 'Bank Name:'}
                </label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
                  className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  {language === 'ml' ? 'അക്കൗണ്ട് നമ്പർ:' : 'Account Number:'}
                </label>
                <input
                  type="text"
                  value={formData.accountNoMasked}
                  onChange={(e) => setFormData(prev => ({ ...prev, accountNoMasked: e.target.value }))}
                  className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  {language === 'ml' ? 'IFSC കോഡ്:' : 'IFSC Code:'}
                </label>
                <input
                  type="text"
                  value={formData.ifscCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, ifscCode: e.target.value }))}
                  className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* CRITICAL HUMAN INTERVENTION DISCLAIMER */}
          <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-rose-950 space-y-1">
              <p className="font-extrabold text-sm text-rose-900">
                {language === 'ml' 
                  ? 'പ്രധാന അറിയിപ്പ്: ഓൺലൈൻ കരട് തയ്യാറാക്കൽ മാത്രമാണിത്' 
                  : 'Important Legal Notice: Draft Preparation Only'}
              </p>
              <p className="leading-relaxed">
                {language === 'ml'
                  ? 'കേരള സർക്കാർ നിയമപ്രകാരം ക്ഷേമ പെൻഷനുകൾക്ക് അക്ഷയ കേന്ദ്രത്തിൽ നേരിട്ടെത്തി വിരലടയാളം (ബയോമെട്രിക്) നൽകേണ്ടതുണ്ട്. ഇവിടെ തയ്യാറാക്കുന്ന അപേക്ഷ സർക്കാരിലേക്ക് സമർപ്പിക്കപ്പെടാൻ ഈ പ്രിന്റൗട്ടുമായി അടുത്തുള്ള അക്ഷയ കേന്ദ്രത്തിൽ പോകേണ്ടതുണ്ട്.'
                  : 'Under Kerala law, welfare pension submissions legally require biometric fingerprint/iris authorization at an authorized Akshaya Centre. This draft must be verified at Akshaya before government sanction.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleGenerateDraft}
            disabled={isGenerating}
            className="w-full py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-base shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <span>{language === 'ml' ? 'അപേക്ഷാ കരട് ഫോം ഉണ്ടാക്കുക 📄' : 'Generate Akshaya Application Draft 📄'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>

        </div>
      ) : (
        /* Printable Draft Preview */
        <div className="space-y-6">
          
          {/* Printable Official Sheet */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-emerald-700 text-gray-900 print:border-none print:shadow-none print:p-0">
            
            {/* Header */}
            <div className="text-center pb-6 border-b-2 border-emerald-800 space-y-1">
              <span className="text-2xl">🌴</span>
              <h2 className="text-xl sm:text-2xl font-black text-emerald-950 uppercase">
                {language === 'ml' ? 'കേരള ക്ഷേമ പെൻഷൻ അപേക്ഷാ കരട് ഫോറം' : 'Kerala Welfare Pension Application Draft Form'}
              </h2>
              <p className="text-xs font-bold text-gray-600">
                {language === 'ml' ? 'തദ്ദേശ സ്വയംഭരണ വകുപ്പ് / സേവന പെൻഷൻ പോർട്ടൽ മാതൃക' : 'LSGD / Sevana Portal Standard Format'}
              </p>
              <div className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-lg text-xs font-black">
                {language === 'ml' ? 'റഫറൻസ് നമ്പർ:' : 'Draft Ref No:'} {generatedDraft.refNumber}
              </div>
            </div>

            {/* Scheme Name */}
            <div className="my-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="text-xs font-bold text-emerald-800">
                {language === 'ml' ? 'അപേക്ഷിക്കുന്ന പദ്ധതി:' : 'Applying For:'}
              </div>
              <div className="text-lg font-extrabold text-emerald-950">
                {generatedDraft.schemeName_ml}
              </div>
              <div className="text-xs text-emerald-700 mt-1">
                {language === 'ml' ? 'പ്രതീക്ഷിക്കുന്ന തുക: ₹1,600 / മാസം' : 'Entitlement: ₹1,600 / month'}
              </div>
            </div>

            {/* Summary Details Table */}
            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="font-semibold text-gray-500">പേര് / Name:</span>
                <p className="font-bold text-gray-900">{generatedDraft.applicantData.fullName}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="font-semibold text-gray-500">പ്രായം / Age:</span>
                <p className="font-bold text-gray-900">{generatedDraft.applicantData.age} Years</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="font-semibold text-gray-500">ആധാർ നമ്പർ / Aadhaar:</span>
                <p className="font-bold text-gray-900">{generatedDraft.applicantData.aadhaarMasked}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="font-semibold text-gray-500">റേഷൻ കാർഡ് / Ration Card:</span>
                <p className="font-bold text-gray-900">{generatedDraft.applicantData.rationCardNo}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="font-semibold text-gray-500">പഞ്ചായത്ത് / വാർഡ്:</span>
                <p className="font-bold text-gray-900">{generatedDraft.applicantData.localBody}, Ward {generatedDraft.applicantData.wardNo}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="font-semibold text-gray-500">ബാങ്ക് അക്കൗണ്ട്:</span>
                <p className="font-bold text-gray-900">{generatedDraft.applicantData.bankName} ({generatedDraft.applicantData.accountNoMasked})</p>
              </div>
            </div>

            {/* Action Next Steps Box */}
            <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-300">
              <h4 className="font-extrabold text-amber-950 text-xs sm:text-sm mb-2">
                {language === 'ml' ? 'അടുത്തതായി ചെയ്യേണ്ട നടപടികൾ:' : 'Mandatory Next Steps for Completion:'}
              </h4>
              <ul className="space-y-1 text-xs text-amber-900">
                {generatedDraft.mandatoryHumanSteps_ml.map((step, idx) => (
                  <li key={idx} className="font-medium">• {step}</li>
                ))}
              </ul>
            </div>

            {/* Signature row */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-end text-xs text-gray-600">
              <div>
                <p>{language === 'ml' ? 'തീയതി:' : 'Date:'} {new Date().toLocaleDateString()}</p>
                <p>{language === 'ml' ? 'സ്ഥലം:' : 'Place:'} {generatedDraft.applicantData.district}</p>
              </div>
              <div className="text-center">
                <div className="w-40 border-b border-gray-400 mb-1"></div>
                <p className="font-bold">{language === 'ml' ? 'അപേക്ഷകന്റെ ഒപ്പ് / വിരലടയാളം' : 'Applicant Signature / Thumb'}</p>
              </div>
            </div>

          </div>

          {/* Action Buttons: Print, Download, Track */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setGeneratedDraft(null)}
              className="text-xs font-bold text-gray-600 hover:text-gray-900 underline"
            >
              {language === 'ml' ? '← തിരുത്തലുകൾ വരുത്തുക' : '← Edit Draft Details'}
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm shadow flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>{language === 'ml' ? 'പ്രിന്റ് എടുക്കുക (Print Draft)' : 'Print Draft'}</span>
              </button>

              <button
                onClick={() => setActiveScreen('tracking')}
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-sm shadow flex items-center gap-2"
              >
                <span>{language === 'ml' ? 'സ്റ്റാറ്റസ് ട്രാക്ക് ചെയ്യുക' : 'Track Application'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
