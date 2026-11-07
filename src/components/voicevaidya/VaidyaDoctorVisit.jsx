import React, { useState } from 'react';
import { 
  Stethoscope, 
  Mic, 
  MicOff, 
  Printer, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';
import { speakText, createSpeechRecognizer } from '../../utils/speech.js';

export default function VaidyaDoctorVisit({ language }) {
  const [symptomInput, setSymptomInput] = useState(
    "കഴിഞ്ഞ മൂന്ന് ദിവസമായി വൈകുന്നേരം ചെറിയ തലകറക്കവും ക്ഷീണവും അനുഭവപ്പെടുന്നു. വലതു കാൽമുട്ടിൽ ഇരിക്കുമ്പോഴും എഴുന്നേൽക്കുമ്പോഴും വേദനയുണ്ട്."
  );
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState({
    patientName: "ശ്രീധരൻ നായർ (Sreedharan Nair)",
    ageGender: "68 / Male",
    chiefComplaints_en: [
      "Episodes of mild dizziness and fatigue in the evenings for the past 3 days.",
      "Right knee joint pain on weight-bearing and transitioning from sitting to standing."
    ],
    chiefComplaints_ml: [
      "കഴിഞ്ഞ 3 ദിവസമായി വൈകുന്നേരങ്ങളിൽ നേരിയ തലകറക്കവും ക്ഷീണവും.",
      "വലതു കാൽമുട്ടിൽ എഴുന്നേൽക്കുമ്പോൾ വേദന."
    ],
    currentVitals: "BP: 136/84 mmHg | Fasting Sugar: 128 mg/dL | Weight: 64 kg",
    currentMeds: "Telmisartan 40mg, Metformin 500mg, Atorvastatin 10mg",
    questionsForDoctor_ml: [
      "1. വൈകുന്നേരത്തെ തലകറക്കം ബി.പി മരുന്ന് കാരണമാണോ അതോ ഭക്ഷണം കുറഞ്ഞതുകൊണ്ടാണോ?",
      "2. കാൽമുട്ട് വേദന കുറയാൻ ഫിസിയോതെറാപ്പിയോ ലളിതമായ വ്യായാമമോ ചെയ്യാമോ?",
      "3. അടുത്ത മാസം ഏതൊക്കെ രക്തപരിശോധനകളാണ് ചെയ്യേണ്ടത്?"
    ],
    questionsForDoctor_en: [
      "1. Is the evening dizziness related to BP fluctuations or medication timing?",
      "2. Can physical therapy or knee exercises be recommended for joint pain?",
      "3. Which blood tests are required before the next follow-up?"
    ]
  });

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const recognizer = createSpeechRecognizer(
      language === 'ml' ? 'ml-IN' : 'en-IN',
      (transcript, isFinal) => {
        setSymptomInput(transcript);
        if (isFinal) {
          setIsRecording(false);
        }
      },
      () => setIsRecording(false),
      () => setIsRecording(false)
    );

    if (recognizer) {
      recognizer.start();
      setIsRecording(true);
    }
  };

  const handleGenerateSummary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 800);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-teal-100">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold mb-2">
          <Stethoscope className="w-4 h-4 text-teal-700" />
          <span>{language === 'ml' ? 'ഡോക്ടർ സന്ദർശന സഹായി' : 'Doctor Visit Assistant'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          {language === 'ml' ? 'ഡോക്ടറോട് പറയാനുള്ള കാര്യങ്ങൾ തയ്യാറാക്കാം' : 'Prepare for Your Doctor Consultation'}
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          {language === 'ml' 
            ? 'നിങ്ങളുടെ ശാരീരിക ബുദ്ധിമുട്ടുകൾ സംസാരിച്ചു രേഖപ്പെടുത്തിയാൽ ഡോക്ടർക്ക് കാണിക്കാൻ പാകത്തിൽ കൃത്യമായ സമ്മറി തയ്യാറാക്കാം.' 
            : 'Record your symptoms using your voice. Generates an organized medical brief for your doctor.'}
        </p>
      </div>

      {/* Voice Symptom Recording Area */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
            <span>🎙️</span>
            <span>{language === 'ml' ? 'നിങ്ങളുടെ അസ്വസ്ഥതകൾ പറയുക അല്ലെങ്കിൽ എഴുതുക:' : 'Record or Type Your Symptoms:'}</span>
          </label>

          <button
            onClick={toggleRecording}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-sm transition-all ${
              isRecording 
                ? 'bg-rose-600 text-white animate-pulse' 
                : 'bg-teal-100 hover:bg-teal-200 text-teal-900 border border-teal-300'
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-teal-700" />}
            <span>{isRecording ? (language === 'ml' ? 'റെക്കോർഡിംഗ് നിർത്തൂ' : 'Stop') : (language === 'ml' ? 'സംസാരിച്ചു രേഖപ്പെടുത്തുക' : 'Speak Symptoms')}</span>
          </button>
        </div>

        <textarea
          rows={3}
          value={symptomInput}
          onChange={(e) => setSymptomInput(e.target.value)}
          placeholder={language === 'ml' ? 'തലകറക്കം, വേദന, ക്ഷീണം തുടങ്ങിയവ ഇവിടെ പറയാം...' : 'e.g. Mild dizziness in evenings and knee pain for 3 days...'}
          className="w-full bg-gray-50 border border-gray-300 rounded-2xl p-4 text-sm sm:text-base font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
        />

        <div className="flex justify-end">
          <button
            onClick={handleGenerateSummary}
            disabled={isGenerating}
            className="px-6 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs sm:text-sm shadow flex items-center gap-2 transition-transform active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'ml' ? 'ഡോക്ടർ സമ്മറി തയ്യാറാക്കുക' : 'Generate Doctor Summary'}</span>
          </button>
        </div>
      </div>

      {/* Generated Doctor Visit Brief */}
      {generatedBrief && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-teal-700 text-gray-900 space-y-6 print:border-none print:shadow-none print:p-0">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-teal-800 gap-2">
            <div>
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                Clinical Visit Summary / ക്ലിനിക്കൽ സന്ദർശന വിവരണം
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                {generatedBrief.patientName}
              </h2>
              <p className="text-xs text-gray-600">
                {generatedBrief.ageGender} | {generatedBrief.currentVitals}
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-gray-500">
              <p>തീയതി: {new Date().toLocaleDateString()}</p>
              <p className="font-bold text-teal-800">Generated by VoiceVaidya AI</p>
            </div>
          </div>

          {/* Chief Complaints (Bilingual) */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-700" />
              <span>{language === 'ml' ? 'പ്രധാന അസ്വസ്ഥതകൾ (Chief Complaints):' : 'Chief Complaints:'}</span>
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-gray-800">
              {generatedBrief.chiefComplaints_ml.map((c, idx) => (
                <li key={idx} className="font-medium">• {c}</li>
              ))}
            </ul>
          </div>

          {/* Current Medications */}
          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200">
            <h4 className="font-extrabold text-xs sm:text-sm text-teal-950 mb-1">
              {language === 'ml' ? 'നിലവിൽ കഴിക്കുന്ന മരുന്നുകൾ (Active Medications):' : 'Current Medications:'}
            </h4>
            <p className="text-xs sm:text-sm font-semibold text-teal-900">
              {generatedBrief.currentMeds}
            </p>
          </div>

          {/* Questions to Ask Doctor */}
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-2">
            <h4 className="font-extrabold text-xs sm:text-sm text-amber-950 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>{language === 'ml' ? 'ഡോക്ടറോട് ചോദിക്കേണ്ട ചോദ്യങ്ങൾ:' : 'Questions for the Doctor:'}</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-950 font-medium">
              {(language === 'ml' ? generatedBrief.questionsForDoctor_ml : generatedBrief.questionsForDoctor_en).map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-gray-500 italic">
              {language === 'ml' 
                ? 'ഈ പ്രിന്റൗട്ട് ഡോക്ടറെ കാണിക്കുന്നത് സംഭാഷണം എളുപ്പമാക്കും.' 
                : 'Show this brief to your physician to save consultation time.'}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs shadow flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>{language === 'ml' ? 'പ്രിന്റ് എടുക്കുക' : 'Print Brief'}</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
