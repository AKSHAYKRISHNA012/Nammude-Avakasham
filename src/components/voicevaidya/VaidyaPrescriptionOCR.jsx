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
  ArrowRight,
  Eye
} from 'lucide-react';
import { SAMPLE_PRESCRIPTIONS } from '../../data/vaidyaData.js';
import { speakText, stopSpeech } from '../../utils/speech.js';
import AudioWaveVisualizer from '../common/AudioWaveVisualizer.jsx';
import confetti from 'canvas-confetti';

export default function VaidyaPrescriptionOCR({ language, onAddPrescriptionToSchedule }) {
  const [selectedPrescription, setSelectedPrescription] = useState(SAMPLE_PRESCRIPTIONS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(true);
  const [addedToSchedule, setAddedToSchedule] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSimulateUpload = () => {
    setIsScanning(true);
    setAddedToSchedule(false);
    setTimeout(() => {
      setSelectedPrescription(SAMPLE_PRESCRIPTIONS[0]);
      setIsScanning(false);
      setScanCompleted(true);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 }
      });
    }, 1400);
  };

  const handleAddToSchedule = () => {
    if (onAddPrescriptionToSchedule) {
      onAddPrescriptionToSchedule(selectedPrescription);
    }
    setAddedToSchedule(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSpeakPrescription = () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    const text_ml = `ഡോക്ടർ ${selectedPrescription.doctorName} നൽകിയ കുറിപ്പടി. പ്രധാന മരുന്നുകൾ: ടെൽമിസാർട്ടൻ രാവിലെ ഭക്ഷണത്തിന് ശേഷം, മെറ്റ്ഫോർമിൻ രാവിലെയും രാത്രിയും ഭക്ഷണത്തിന് ശേഷം, അറ്റോർവാസ്റ്റാറ്റിൻ രാത്രി കിടക്കുന്നതിന് മുൻപ്, പാൻടോപ്രാസോൾ രാവിലെ വെറും വയറ്റിൽ. എല്ലാ മരുന്നുകളും ഫാർമസിസ്റ്റുമായി ഒത്തുനോക്കുക.`;
    speakText(text_ml, language, () => {
      setIsPlayingAudio(false);
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Title Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-soft border-2 border-teal-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-black mb-2 shadow-sm">
              <Camera className="w-4 h-4 text-teal-700" />
              <span>{language === 'ml' ? 'AI കുറിപ്പടി സ്കാനർ (Prescription OCR)' : 'Prescription Understanding OCR'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {language === 'ml' ? 'ഡോക്ടറുടെ കുറിപ്പടി വായിച്ചെടുക്കാം' : 'Understand Doctor Prescriptions'}
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 font-medium">
              {language === 'ml' 
                ? 'കുറിപ്പടിയുടെ ഫോട്ടോ എടുത്താൽ മരുന്നുകളുടെ പേരും കഴിക്കേണ്ട സമയവും ലളിതമായ മലയാളത്തിൽ പറഞ്ഞുതരുന്നു.' 
                : 'Upload or snap a prescription photo. AI extracts medicine names, timings, and explanations.'}
            </p>
          </div>

          <button
            onClick={handleSimulateUpload}
            className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-2.5 transition-transform active:scale-95 self-start md:self-center"
          >
            <Camera className="w-5 h-5" />
            <span>{language === 'ml' ? 'ഫോട്ടോ എടുക്കുക / അപ്‌ലോഡ്' : 'Take Photo / Upload'}</span>
          </button>
        </div>
      </div>

      {/* Prescription Viewfinder Simulation Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-900 via-emerald-950 to-teal-900 text-white rounded-3xl p-6 sm:p-8 border-2 border-amber-400/60 shadow-elevated">
        
        {/* Laser Scanning Effect when scanning */}
        {isScanning && (
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-lg laser-scan-line"></div>
        )}

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black text-3xl shadow-lg flex-shrink-0">
              📄
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                Verified Clinical Document
              </span>
              <h4 className="font-black text-lg sm:text-xl text-white">
                {selectedPrescription.doctorName}
              </h4>
              <p className="text-xs text-teal-200 mt-0.5 font-medium">
                {selectedPrescription.hospital} • {selectedPrescription.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSpeakPrescription}
              className={`px-5 py-3 rounded-2xl font-black text-xs shadow-md flex items-center gap-2 transition-all ${
                isPlayingAudio
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-white/10 hover:bg-white/20 text-amber-300 border border-amber-400/40'
              }`}
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>{isPlayingAudio ? (language === 'ml' ? 'നിർത്തുക' : 'Stop') : (language === 'ml' ? 'വിവരണം കേൾക്കുക 🔊' : 'Listen 🔊')}</span>
            </button>
            <AudioWaveVisualizer isPlaying={isPlayingAudio} />
          </div>
        </div>
      </div>

      {/* Scanning Loader */}
      {isScanning && (
        <div className="p-10 glass-card rounded-3xl border-2 border-teal-300 text-center shadow-soft space-y-3">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-black text-gray-800 text-base">
            {language === 'ml' ? 'കുറിപ്പടിയിലെ കൈയക്ഷരം AI വായിച്ചെടുക്കുന്നു...' : 'AI scanning handwriting and dosages...'}
          </p>
        </div>
      )}

      {/* Extracted Medicines Table */}
      {scanCompleted && !isScanning && (
        <div className="space-y-6">
          
          <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-soft border border-gray-200 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-700" />
                <span>{language === 'ml' ? 'കുറിപ്പടിയിൽ നിന്ന് കണ്ടെത്തിയ മരുന്നുകൾ:' : 'Extracted Medications & Schedule:'}</span>
              </h3>
              <span className="text-xs font-black px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full border border-emerald-300">
                {language === 'ml' ? '4 മരുന്നുകൾ കണ്ടെത്തി' : '4 Medicines Extracted'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedPrescription.medicines.map((med, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border-2 border-gray-200 hover:border-teal-500 transition-all space-y-2 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-black text-teal-800 uppercase tracking-wide">
                        {language === 'ml' ? `മരുന്ന് ${idx + 1}` : `Medicine ${idx + 1}`}
                      </span>
                      <h4 className="text-base font-black text-gray-900">{med.name}</h4>
                    </div>
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-200">
                      {(med.confidence * 100).toFixed(0)}% OCR
                    </span>
                  </div>

                  <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100 space-y-1 text-xs">
                    <p className="font-black text-teal-950 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-700" />
                      <span>{language === 'ml' ? med.timing_ml : med.timing_en}</span>
                    </p>
                    <p className="text-gray-600 font-medium">
                      {language === 'ml' ? 'കാലയളവ്: ' : 'Duration: '}<span className="font-bold">{med.duration}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Safety & Pharmacist Verification Box */}
            <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950 space-y-1">
                <p className="font-black text-sm text-amber-900">
                  {language === 'ml' ? 'സുരക്ഷാ മുൻകരുതൽ (Verification Notice):' : 'Safety Verification Notice:'}
                </p>
                <p className="leading-relaxed font-medium">
                  {selectedPrescription.pharmacistVerificationNote_ml}
                </p>
                <p className="italic text-gray-600 pt-0.5">
                  {language === 'ml' 
                    ? 'AI ഒരിക്കലും സ്വയം രോഗനിർണ്ണയം നടത്തുകയോ മരുന്നുകളുടെ അളവ് മാറ്റുകയോ ചെയ്യില്ല. മരുന്ന് വാങ്ങുമ്പോൾ ഫാർമസിസ്റ്റുമായി ഒത്തുനോക്കുക.' 
                    : 'VoiceVaidya never independently modifies dosages. Always double-check with your registered pharmacist.'}
                </p>
              </div>
            </div>

            {/* Doctor's Lifestyle Advice */}
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200">
              <h5 className="font-black text-teal-950 text-xs sm:text-sm mb-1">
                {language === 'ml' ? 'ഡോക്ടറുടെ പൊതുവായ നിർദ്ദേശങ്ങൾ:' : 'Doctor Advice:'}
              </h5>
              <p className="text-xs text-teal-900 font-medium">
                {language === 'ml' ? selectedPrescription.doctorAdvice_ml : selectedPrescription.doctorAdvice_en}
              </p>
            </div>

            {/* Add to schedule CTA */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gray-500 font-medium">
                {language === 'ml' ? 'ഈ കുറിപ്പടി വിവരങ്ങൾ നിങ്ങളുടെ ഓർമ്മപ്പെടുത്തൽ സമയപ്പട്ടികയിലേക്ക് ചേർക്കാം.' : 'Add verified medicines into your smart reminder schedule.'}
              </p>

              <button
                onClick={handleAddToSchedule}
                disabled={addedToSchedule}
                className={`px-7 py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all ${
                  addedToSchedule
                    ? 'bg-emerald-700 text-white'
                    : 'bg-teal-700 hover:bg-teal-800 text-white active:scale-95'
                }`}
              >
                {addedToSchedule ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                    <span>{language === 'ml' ? 'സമയപ്പട്ടികയിൽ ചേർത്തു ✓' : 'Added to Schedule ✓'}</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 stroke-[3]" />
                    <span>{language === 'ml' ? 'ഓർമ്മപ്പെടുത്തലിലേക്ക് ചേർക്കുക' : 'Add to Medication Schedule'}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
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
