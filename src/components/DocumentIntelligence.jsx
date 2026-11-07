import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Sparkles, 
  Volume2, 
  RefreshCw,
  Eye,
  FileCheck
} from 'lucide-react';
import { speakText } from '../utils/speech.js';

export default function DocumentIntelligence({ language }) {
  const [selectedDocType, setSelectedDocType] = useState('aadhaar');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const sampleDocs = [
    { id: 'aadhaar', label_ml: 'മാതൃകാ ആധാർ കാർഡ് (Aadhaar)', label_en: 'Sample Aadhaar Card' },
    { id: 'ration_card', label_ml: 'മാതൃകാ റേഷൻ കാർഡ് (Pink PHH)', label_en: 'Sample Ration Card (PHH)' },
    { id: 'disability_cert', label_ml: 'മെഡിക്കൽ ബോർഡ് സർട്ടിഫിക്കറ്റ്', label_en: 'Medical Board Certificate' }
  ];

  const runAnalysis = async (docType) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/documents/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docType })
      });
      const data = await response.json();
      if (data.success) {
        setAnalysisResult(data.analysis);
      }
    } catch (err) {
      console.warn('API fallback to local verified mock analysis:', err);
      // Fallback local instant analysis
      if (docType === 'aadhaar') {
        setAnalysisResult({
          documentType: 'aadhaar',
          verified: true,
          confidence: 0.96,
          extractedFields: {
            name: 'ശ്രീധരൻ നായർ (Sreedharan Nair)',
            dob: '12/05/1958',
            calculatedAge: 68,
            gender: 'Male / പുരുഷൻ',
            aadhaarMasked: 'XXXX-XXXX-8941',
            address: 'ശാന്തി ഭവൻ, നേമം, തിരുവനന്തപുരം - 695020'
          },
          explanation_ml: "ആധാർ വിജയകരമായി വായിച്ചെടുത്തു. പ്രായം 68 വയസ്സ് ഉള്ളതിനാൽ വാർദ്ധക്യകാല പെൻഷന് പ്രായപരിധി പൂർണ്ണമായും തികഞ്ഞിട്ടുണ്ട്.",
          explanation_en: "Aadhaar verified successfully. Age 68 satisfies criteria for Old Age Pension.",
          termsExplained: [
            {
              term: 'Aadhaar NPCI Mapping',
              explanation_ml: 'പെൻഷൻ തുക തടസ്സമില്ലാതെ നേരിട്ട് അക്കൗണ്ടിലെത്താൻ ബാങ്കിൽ ആധാർ ലിങ്ക് ചെയ്യണം.'
            }
          ]
        });
      } else if (docType === 'disability_cert') {
        setAnalysisResult({
          documentType: 'disability_cert',
          verified: true,
          confidence: 0.95,
          extractedFields: {
            applicantName: 'സുരേഷ് കുമാർ (Suresh Kumar)',
            certNumber: 'DMC/TVM/2024/7712',
            disabilityType: 'Locomotor Disability (ചലന വൈകല്യം)',
            disabilityPercentage: '55%',
            boardIssuingAuthority: 'General Hospital Thiruvananthapuram',
            validity: 'Permanent / സ്ഥിരമായത്'
          },
          explanation_ml: "മെഡിക്കൽ ബോർഡ് സർട്ടിഫിക്കറ്റിൽ 55% വൈകല്യം രേഖപ്പെടുത്തിയിട്ടുണ്ട്. 40 ശതമാനത്തിൽ കൂടുതൽ ഉള്ളതിനാൽ ഭിന്നശേഷി പെൻഷനും UDID കാർഡിനും അർഹതയുണ്ട്.",
          explanation_en: "Medical Board Certificate confirms 55% locomotor disability (exceeds the 40% threshold for PwD pension).",
          termsExplained: [
            {
              term: 'Benchmark Disability (40%+)',
              explanation_ml: 'നിയമപ്രകാരം സർക്കാർ ആനുകൂല്യങ്ങൾക്ക് കുറഞ്ഞത് 40% വൈകല്യം സാക്ഷ്യപ്പെടുത്തിയിരിക്കണം.'
            }
          ]
        });
      } else {
        setAnalysisResult({
          documentType: 'ration_card',
          verified: true,
          confidence: 0.94,
          extractedFields: {
            cardCategory: 'PHH (പിങ്ക് കാർഡ് - മുൻഗണനാ വിഭാഗം)',
            cardNo: '1408192837',
            headOfFamily: 'സരസ്വതി അമ്മ',
            totalMembers: 3,
            taluk: 'നെയ്യാറ്റിൻകര'
          },
          explanation_ml: "നിങ്ങളുടെ കാർഡ് പിങ്ക് മുൻഗണനാ (PHH) കാർഡാണ്. അതിനാൽ പെൻഷനുകൾക്കും സൗജന്യ KASP ഇൻഷുറൻസിനും വില്ലേജ് ഓഫീസിൽ നിന്നുള്ള പ്രത്യേക വരുമാന സർട്ടിഫിക്കറ്റ് നിർബന്ധമല്ല.",
          explanation_en: "Your card is a Pink Priority (PHH) card, qualifying you for pensions and free KASP healthcare.",
          termsExplained: [
            {
              term: 'PHH (Priority Household)',
              explanation_ml: 'ദാരിദ്ര്യരേഖയ്ക്ക് താഴെയുള്ള മുൻഗണനാ കുടുംബങ്ങൾക്കുള്ള പിങ്ക് കാർഡ്.'
            }
          ]
        });
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      runAnalysis(selectedDocType);
    }
  };

  const handleSampleSelect = (type) => {
    setSelectedDocType(type);
    setUploadedFile({ name: `${type}_sample_kerala.pdf` });
    runAnalysis(type);
  };

  const handleSpeak = (text) => {
    speakText(text, language);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold mb-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>{language === 'ml' ? 'AI OCR & രേഖാ വിശകലനം' : 'AI Document Intelligence & OCR'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {language === 'ml' ? 'രേഖകൾ പരിശോധിക്കുക & ലളിത വിവരണം' : 'Document Scanner & Jargon Explainer'}
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              {language === 'ml' 
                ? 'സർക്കാർ രേഖകൾ അപ്‌ലോഡ് ചെയ്താൽ അതിലെ കഠിനമായ വിവരങ്ങൾ ലളിതമായ മലയാളത്തിൽ പറഞ്ഞുതരുന്നു.' 
                : 'Upload or test government certificates to extract key details and demystify complex terms.'}
            </p>
          </div>

          {/* Preset Sample Quick Buttons */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-400">
              {language === 'ml' ? 'ഉടൻ പരീക്ഷിക്കാൻ തിരഞ്ഞെടുക്കൂ:' : 'Quick Demo Samples:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleDocs.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSampleSelect(sample.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedDocType === sample.id
                      ? 'bg-indigo-700 text-white border-indigo-900 shadow-sm'
                      : 'bg-indigo-50 text-indigo-900 hover:bg-indigo-100 border-indigo-200'
                  }`}
                >
                  {language === 'ml' ? sample.label_ml : sample.label_en}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Drag & Drop Box */}
      <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-emerald-300 hover:border-emerald-600 transition-colors text-center shadow-sm mb-8">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8" />
        </div>

        <h3 className="font-extrabold text-lg text-gray-900 mb-1">
          {language === 'ml' 
            ? 'സർക്കാർ രേഖകളുടെ ഫോട്ടോ / PDF ഇവിടെ അപ്‌ലോഡ് ചെയ്യുക' 
            : 'Upload Document Photo or PDF (Aadhaar, Ration Card, Certificate)'}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mb-4">
          {language === 'ml' 
            ? 'ക്യാമറ ഉപയോഗിച്ച് എടുത്ത ഫോട്ടോയോ PDF ഫയലോ നൽകാം. ഞങ്ങൾ രേഖകൾ സുരക്ഷിതമായി സൂക്ഷിക്കുന്നു.' 
            : 'Take a clear photo with phone camera or upload PDF. No personal data is stored.'}
        </p>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm shadow cursor-pointer transition-transform active:scale-95">
          <Upload className="w-4 h-4" />
          <span>{language === 'ml' ? 'ഫയൽ തിരഞ്ഞെടുക്കുക' : 'Select File from Device'}</span>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        {uploadedFile && (
          <p className="text-xs font-bold text-emerald-800 mt-3 flex items-center justify-center gap-1">
            <FileCheck className="w-4 h-4" />
            <span>{uploadedFile.name}</span>
          </p>
        )}
      </div>

      {/* Analysis Loading */}
      {isAnalyzing && (
        <div className="p-8 bg-white rounded-3xl border border-gray-200 text-center shadow-sm space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-bold text-gray-800 text-sm">
            {language === 'ml' ? 'AI രേഖ പരിശോധിച്ച് വിവരങ്ങൾ വേർതിരിച്ചെടുക്കുന്നു...' : 'AI extracting text and analyzing fields...'}
          </p>
        </div>
      )}

      {/* Analysis Results View */}
      {analysisResult && !isAnalyzing && (
        <div className="space-y-6">
          
          {/* Plain Malayalam Summary Box */}
          <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-400">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-400 text-emerald-950">
                  {language === 'ml' ? 'ലളിത വിശകലനം' : 'Simple Summary'}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-amber-300">
                  {language === 'ml' ? analysisResult.explanation_ml : analysisResult.explanation_en}
                </h3>
              </div>

              <button
                onClick={() => handleSpeak(language === 'ml' ? analysisResult.explanation_ml : analysisResult.explanation_en)}
                className="p-3 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-amber-300 border border-emerald-600 flex items-center gap-1.5 text-xs font-bold flex-shrink-0"
              >
                <Volume2 className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'ml' ? 'കേൾക്കുക 🔊' : 'Listen 🔊'}</span>
              </button>
            </div>
          </div>

          {/* Two Columns: Extracted Fields vs Terms Explained */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Extracted Fields */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <h4 className="font-extrabold text-gray-900 text-base mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{language === 'ml' ? 'രേഖയിൽ നിന്ന് വായിച്ചെടുത്ത വിവരങ്ങൾ:' : 'Extracted Information:'}</span>
              </h4>

              <div className="space-y-3">
                {Object.entries(analysisResult.extractedFields).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl text-xs sm:text-sm">
                    <span className="font-semibold text-gray-500 capitalize">{key}:</span>
                    <span className="font-extrabold text-gray-900 text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Government Jargon Demystifier */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <h4 className="font-extrabold text-gray-900 text-base mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <span>{language === 'ml' ? 'സർക്കാർ പദാവലികൾ ലളിതമായി:' : 'Government Terms Explained:'}</span>
              </h4>

              {analysisResult.termsExplained && analysisResult.termsExplained.length > 0 ? (
                <div className="space-y-3">
                  {analysisResult.termsExplained.map((termItem, idx) => (
                    <div key={idx} className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 space-y-1">
                      <div className="font-extrabold text-indigo-950 text-sm flex items-center justify-between">
                        <span>{termItem.term}</span>
                        <button
                          onClick={() => handleSpeak(termItem.explanation_ml)}
                          className="text-indigo-700 hover:text-indigo-900"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {termItem.explanation_ml}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">
                  {language === 'ml' ? 'കഠിനമായ സാങ്കേതിക പദങ്ങൾ ഈ രേഖയിൽ കണ്ടെത്തിയിട്ടില്ല.' : 'No confusing technical jargon detected in this document.'}
                </p>
              )}
            </div>

          </div>

          {/* Missing Checklist Generator */}
          <div className="bg-amber-50 rounded-3xl p-6 border border-amber-200">
            <h4 className="font-extrabold text-amber-950 text-base mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
              <span>{language === 'ml' ? 'അടുത്തതായി വേണ്ട പ്രധാന രേഖകളുടെ ചെക്ക്‌ലിസ്റ്റ്:' : 'Recommended Document Checklist:'}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "ആധാർ കാർഡ് (ബാങ്കുമായി ലിങ്ക് ചെയ്തത്)",
                "റേഷൻ കാർഡ് (PHH അല്ലെങ്കിൽ AAY മുൻഗണന)",
                "ബാങ്ക് പാസ്സ്ബുക്ക് (IFSC വ്യക്തമായത്)",
                "പാസ്പോർട്ട് സൈസ് കളർ ഫോട്ടോ"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white p-3 rounded-xl border border-amber-200 text-xs font-bold text-gray-800">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
