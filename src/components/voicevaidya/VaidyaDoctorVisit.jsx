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
  ArrowRight,
  Info
} from 'lucide-react';
import { speakText, createSpeechRecognizer } from '../../utils/speech.js';

export default function VaidyaDoctorVisit({ language }) {
  const [symptomInput, setSymptomInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState(null);
  const [isSample, setIsSample] = useState(false);

  const loadSampleTemplate = () => {
    setIsSample(true);
    setSymptomInput(
      language === 'ml'
        ? "കഴിഞ്ഞ മൂന്ന് ദിവസമായി വൈകുന്നേരം ചെറിയ തലകറക്കവും ക്ഷീണവും അനുഭവപ്പെടുന്നു. വലതു കാൽമുട്ടിൽ ഇരിക്കുമ്പോഴും എഴുന്നേൽക്കുമ്പോഴും വേദനയുണ്ട്."
        : "Feeling mild evening dizziness and fatigue for the past 3 days. Right knee aches when standing up."
    );
    setGeneratedBrief({
      patientName: "മാതൃകാ രോഗി (Sample Patient Brief)",
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
  };

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

  const generateDoctorBrief = () => {
    if (!symptomInput.trim()) return;
    setIsGenerating(true);
    setIsSample(false);

    setTimeout(() => {
      setGeneratedBrief({
        patientName: language === 'ml' ? 'പൗരൻ / രോഗി' : 'Citizen / Patient',
        ageGender: "Senior Citizen",
        chiefComplaints_en: [
          symptomInput
        ],
        chiefComplaints_ml: [
          symptomInput
        ],
        currentVitals: "Self-Reported Symptoms Recorded for Clinical Review",
        currentMeds: "Prescriptions managed via VoiceVaidya Schedule",
        questionsForDoctor_ml: [
          "1. ഈ ലക്ഷണങ്ങൾക്ക് എന്തെങ്കിലും പ്രത്യേക ലാബ് പരിശോധനകൾ ആവശ്യമുണ്ടോ?",
          "2. നിലവിലെ മരുന്നുകളുടെ അളവിൽ എന്തെങ്കിലും മാറ്റം വരുത്തേണ്ടതുണ്ടോ?",
          "3. ഭക്ഷണക്രമത്തിലോ ദിനചര്യയിലോ ശ്രദ്ധിക്കേണ്ട മുൻകരുതലുകൾ എന്തൊക്കെയാണ്?"
        ],
        questionsForDoctor_en: [
          "1. Are diagnostic tests indicated for these reported symptoms?",
          "2. Is any dosage adjustment needed for ongoing medications?",
          "3. What dietary or activity precautions should be observed?"
        ]
      });
      setIsGenerating(false);
    }, 600);
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
          <span>{language === 'ml' ? 'ഡോക്ടർ സന്ദർശന സഹായി' : 'Clinical Consultation Prep'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          {language === 'ml' ? 'ഡോക്ടറോട് ചോദിക്കാനുള്ള കുറിപ്പ് തയ്യാറാക്കാം' : 'Prepare Your Doctor Visit Summary'}
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          {language === 'ml' 
            ? 'നിങ്ങളുടെ അസ്വസ്ഥതകൾ മലയാളത്തിൽ സംസാരിക്കുക. ഡോക്ടർക്ക് കാണിക്കാവുന്ന വ്യക്തമായ മെഡിക്കൽ സംഗ്രഹം തയ്യാറാക്കി തരാം.' 
            : 'Speak your symptoms in Malayalam or English. We synthesize an organized clinical consultation brief with questions to ask your doctor.'}
        </p>

        {/* Action button to load sample template */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-3">
          <button
            onClick={loadSampleTemplate}
            className="text-xs font-bold px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 transition-colors"
          >
            {language === 'ml' ? '⚡ മാതൃകാ കൺസൾട്ടേഷൻ കുറിപ്പ് കാണുക (Load Sample Template)' : '⚡ Load Illustrative Consultation Template'}
          </button>
        </div>
      </div>

      {/* Voice / Text Input Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
            <span>{language === 'ml' ? 'നിങ്ങളുടെ ശാരീരിക ബുദ്ധിമുട്ടുകൾ പറയുക അല്ലെങ്കിൽ എഴുതുക' : 'Describe your symptoms or health queries'}</span>
          </label>
          <span className="text-xs text-gray-400 font-medium">
            {language === 'ml' ? 'സ്വകാര്യത ഉറപ്പുവരുത്തുന്നു' : 'Enclave Private'}
          </span>
        </div>

        <div className="relative">
          <textarea
            rows="4"
            value={symptomInput}
            onChange={(e) => setSymptomInput(e.target.value)}
            placeholder={language === 'ml' ? 'ഉദാഹരണത്തിന്: കഴിഞ്ഞ രണ്ടു ദിവസമായി വൈകുന്നേരം ചെറിയ തലവേദനയും ക്ഷീണവും തോന്നുന്നു...' : 'E.g., Mild fatigue and right knee pain for the past 2 days...'}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-base text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none leading-relaxed"
          ></textarea>

          {/* Floating Mic Button */}
          <button
            onClick={toggleRecording}
            className={`absolute bottom-3 right-3 p-3 rounded-2xl shadow-md transition-transform active:scale-95 flex items-center gap-2 text-xs font-bold ${
              isRecording 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-teal-700 hover:bg-teal-800 text-white'
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>{isRecording ? (language === 'ml' ? 'കേൾക്കുന്നു...' : 'Listening...') : (language === 'ml' ? 'സംസാരിക്കാം' : 'Speak')}</span>
          </button>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={generateDoctorBrief}
            disabled={isGenerating || !symptomInput.trim()}
            className="px-6 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white font-extrabold text-sm shadow flex items-center gap-2 transition-transform active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isGenerating ? (language === 'ml' ? 'തയ്യാറാക്കുന്നു...' : 'Synthesizing...') : (language === 'ml' ? 'ഡോക്ടർ ബ്രീഫ് തയ്യാറാക്കുക' : 'Generate Doctor Brief')}</span>
          </button>
        </div>
      </div>

      {/* Generated Clinical Brief Result */}
      {generatedBrief && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-elevated border-2 border-teal-200 space-y-6 print:border-none print:shadow-none">
          
          {isSample && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-bold flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-700" />
              <span>{language === 'ml' ? 'മാതൃകാ ക്ലിനിക്കൽ രേഖ / Sample Illustrative Consultation Brief' : 'Sample Consultation Template'}</span>
            </div>
          )}

          {/* Brief Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-200 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black text-teal-800 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full mb-1">
                <span>VoiceVaidya Clinical Summary</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                {generatedBrief.patientName}
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {generatedBrief.ageGender} • {new Date().toLocaleDateString('en-GB')}
              </p>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-extrabold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{language === 'ml' ? 'പ്രിന്റ്' : 'Print'}</span>
              </button>
            </div>
          </div>

          {/* Chief Complaints Section */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-teal-900 uppercase tracking-wider">
              1. Chief Complaints (പ്രധാന അസ്വസ്ഥതകൾ)
            </h4>
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-1.5 text-sm text-gray-800 font-medium">
              {generatedBrief.chiefComplaints_ml.map((c, i) => (
                <p key={i}>• {c}</p>
              ))}
            </div>
          </div>

          {/* Questions to Ask Doctor */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-teal-900 uppercase tracking-wider">
              2. Questions for Treating Doctor (ഡോക്ടറോട് ചോദിക്കേണ്ട ചോദ്യങ്ങൾ)
            </h4>
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2 text-xs sm:text-sm text-amber-950 font-semibold">
              {(language === 'ml' ? generatedBrief.questionsForDoctor_ml : generatedBrief.questionsForDoctor_en).map((q, i) => (
                <p key={i}>{q}</p>
              ))}
            </div>
          </div>

          {/* Clinical Disclaimer */}
          <div className="pt-4 border-t border-gray-100 text-[11px] text-gray-400 font-medium">
            {language === 'ml' 
              ? 'ശ്രദ്ധിക്കുക: ഇത് ഒരു AI സഹായി തയ്യാറാക്കിയ സംഗ്രഹമാണ്. ഇത് മെഡിക്കൽ നിർദ്ദേശമല്ല. നിങ്ങളുടെ ഡോക്ടറുടെ നിർദ്ദേശം മാത്രം അനുസരിക്കുക.' 
              : 'Disclaimer: This summary is generated to facilitate clinical communication and does not constitute medical advice or diagnosis.'}
          </div>

        </div>
      )}

    </div>
  );
}
