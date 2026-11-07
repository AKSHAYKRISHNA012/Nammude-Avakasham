import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Volume2, 
  ShieldCheck, 
  Plus, 
  Clock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SAMPLE_PRESCRIPTIONS } from '../../data/vaidyaData.js';
import { speakText } from '../../utils/speech.js';

export default function VaidyaPrescriptionOCR({ language, onAddPrescriptionToSchedule }) {
  const [selectedPrescription, setSelectedPrescription] = useState(SAMPLE_PRESCRIPTIONS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(true);
  const [addedToSchedule, setAddedToSchedule] = useState(false);

  const handleSimulateUpload = () => {
    setIsScanning(true);
    setAddedToSchedule(false);
    setTimeout(() => {
      setSelectedPrescription(SAMPLE_PRESCRIPTIONS[0]);
      setIsScanning(false);
      setScanCompleted(true);
    }, 1200);
  };

  const handleAddToSchedule = () => {
    if (onAddPrescriptionToSchedule) {
      onAddPrescriptionToSchedule(selectedPrescription);
    }
    setAddedToSchedule(true);
  };

  const handleSpeakPrescription = () => {
    const text_ml = `ഡോക്ടർ ${selectedPrescription.doctorName} നൽകിയ കുറിപ്പടി. പ്രധാന മരുന്നുകൾ: ടെൽമിസാർട്ടൻ രാവിലെ ഭക്ഷണത്തിന് ശേഷം, മെറ്റ്ഫോർമിൻ രാവിലെയും രാത്രിയും ഭക്ഷണത്തിന് ശേഷം, അറ്റോർവാസ്റ്റാറ്റിൻ രാത്രി കിടക്കുന്നതിന് മുൻപ്, പാൻടോപ്രാസോൾ രാവിലെ വെറും വയറ്റിൽ. എല്ലാ മരുന്നുകളും ഫാർമസിസ്റ്റുമായി ഒത്തുനോക്കുക.`;
    speakText(text_ml, language);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-teal-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold mb-2">
              <Camera className="w-4 h-4 text-teal-700" />
              <span>{language === 'ml' ? 'AI കുറിപ്പടി സ്കാനർ (Prescription OCR)' : 'Prescription Understanding OCR'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {language === 'ml' ? 'ഡോക്ടറുടെ കുറിപ്പടി വായിച്ചെടുക്കാം' : 'Understand Doctor Prescriptions'}
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              {language === 'ml' 
                ? 'കുറിപ്പടിയുടെ ഫോട്ടോ എടുത്താൽ മരുന്നുകളുടെ പേരും കഴിക്കേണ്ട സമയവും ലളിതമായ മലയാളത്തിൽ പറഞ്ഞുതരുന്നു.' 
                : 'Upload or snap a prescription photo. AI extracts medicine names, timings, and explanations.'}
            </p>
          </div>

          <button
            onClick={handleSimulateUpload}
            className="px-6 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-sm shadow flex items-center gap-2 transition-transform active:scale-95 self-start md:self-center"
          >
            <Camera className="w-4 h-4" />
            <span>{language === 'ml' ? 'ഫോട്ടോ എടുക്കുക / അപ്‌ലോഡ്' : 'Take Photo / Upload'}</span>
          </button>
        </div>
      </div>

      {/* Upload & Demo Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-3xl p-6 border-2 border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-xl shadow">
            📄
          </div>
          <div>
            <h4 className="font-extrabold text-gray-900 text-base">
              {selectedPrescription.doctorName}
            </h4>
            <p className="text-xs text-gray-600">
              {selectedPrescription.hospital} | {selectedPrescription.date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeakPrescription}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-gray-50 border border-teal-300 text-teal-900 font-extrabold text-xs shadow-sm flex items-center gap-1.5"
          >
            <Volume2 className="w-4 h-4 text-teal-700" />
            <span>{language === 'ml' ? 'കുറിപ്പടി കേൾക്കുക 🔊' : 'Listen Prescription 🔊'}</span>
          </button>
        </div>
      </div>

      {/* Loading animation */}
      {isScanning && (
        <div className="p-8 bg-white rounded-3xl border border-teal-200 text-center shadow-sm space-y-3">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-bold text-gray-800 text-base">
            {language === 'ml' ? 'കുറിപ്പടിയിലെ കൈയക്ഷരം AI വായിച്ചെടുക്കുന്നു...' : 'AI scanning handwriting and dosages...'}
          </p>
        </div>
      )}

      {/* Extracted Medicines Table */}
      {scanCompleted && !isScanning && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                <span>{language === 'ml' ? 'കുറിപ്പടിയിൽ നിന്ന് കണ്ടെത്തിയ മരുന്നുകൾ:' : 'Extracted Medications & Schedule:'}</span>
              </h3>
              <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                {language === 'ml' ? '4 മരുന്നുകൾ കണ്ടെത്തി' : '4 Medicines Extracted'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedPrescription.medicines.map((med, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-gray-50 border-2 border-gray-200 hover:border-teal-500 transition-all space-y-2 relative"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-teal-700 uppercase">
                        {language === 'ml' ? `മരുന്ന് ${idx + 1}` : `Medicine ${idx + 1}`}
                      </span>
                      <h4 className="text-base font-extrabold text-gray-900">{med.name}</h4>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      {(med.confidence * 100).toFixed(0)}% OCR
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-1 text-xs">
                    <p className="font-bold text-emerald-950 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{language === 'ml' ? med.timing_ml : med.timing_en}</span>
                    </p>
                    <p className="text-gray-500">
                      {language === 'ml' ? 'കാലയളവ്: ' : 'Duration: '}{med.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Safety & Pharmacist Verification Box */}
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950 space-y-1">
                <p className="font-extrabold text-sm text-amber-900">
                  {language === 'ml' ? 'സുരക്ഷാ മുൻകരുതൽ (Verification Notice):' : 'Safety Verification Notice:'}
                </p>
                <p className="leading-relaxed">
                  {selectedPrescription.pharmacistVerificationNote_ml}
                </p>
                <p className="italic text-gray-600">
                  {language === 'ml' 
                    ? 'AI ഒരിക്കലും സ്വയം രോഗനിർണ്ണയം നടത്തുകയോ മരുന്നുകളുടെ അളവ് മാറ്റുകയോ ചെയ്യില്ല. മരുന്ന് വാങ്ങുമ്പോൾ ഫാർമസിസ്റ്റുമായി പരിശോധിച്ച് ഉറപ്പുവരുത്തുക.' 
                    : 'VoiceVaidya never independently modifies dosages. Always double-check with your registered pharmacist.'}
                </p>
              </div>
            </div>

            {/* Doctor's Lifestyle Advice */}
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
              <h5 className="font-extrabold text-teal-950 text-xs sm:text-sm mb-1">
                {language === 'ml' ? 'ഡോക്ടറുടെ പൊതുവായ നിർദ്ദേശങ്ങൾ:' : 'Doctor Advice:'}
              </h5>
              <p className="text-xs text-teal-900 font-medium">
                {language === 'ml' ? selectedPrescription.doctorAdvice_ml : selectedPrescription.doctorAdvice_en}
              </p>
            </div>

            {/* Add to schedule CTA */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gray-500">
                {language === 'ml' ? 'ഈ കുറിപ്പടി വിവരങ്ങൾ നിങ്ങളുടെ ഓർമ്മപ്പെടുത്തൽ സമയപ്പട്ടികയിലേക്ക് ചേർക്കാം.' : 'Add verified medicines into your smart reminder schedule.'}
              </p>

              <button
                onClick={handleAddToSchedule}
                disabled={addedToSchedule}
                className={`px-6 py-3 rounded-2xl font-extrabold text-xs sm:text-sm shadow flex items-center gap-2 transition-all ${
                  addedToSchedule
                    ? 'bg-emerald-600 text-white'
                    : 'bg-teal-700 hover:bg-teal-800 text-white active:scale-95'
                }`}
              >
                {addedToSchedule ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{language === 'ml' ? 'സമയപ്പട്ടികയിൽ ചേർത്തു ✓' : 'Added to Schedule ✓'}</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>{language === 'ml' ? 'ഓർമ്മപ്പെടുത്തലിലേക്ക് ചേർക്കുക' : 'Add to Medication Schedule'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
