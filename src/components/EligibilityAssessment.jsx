import React, { useState } from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  FileCheck, 
  AlertCircle,
  Volume2,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SCHEMES } from '../data/schemesData.js';
import { speakText } from '../utils/speech.js';

export default function EligibilityAssessment({ language, setActiveScreen, setSelectedSchemeId }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    age: 65,
    residesInKerala: true,
    hasBplCard: true,
    annualIncome: 60000,
    isDiffAbled: false,
    disabilityPct: 40,
    isBedridden: false,
    isUrban: false
  });

  const [assessmentResults, setAssessmentResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateEligibility();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateEligibility = async () => {
    setIsCalculating(true);
    try {
      const response = await fetch('/api/eligibility/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers)
      });
      const data = await response.json();
      if (data.success) {
        setAssessmentResults(data.results);

        // Confetti celebration if eligible schemes exist
        const hasEligible = data.results.some(r => r.eligible);
        if (hasEligible) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }
    } catch (err) {
      console.error(err);
      // Fallback local calculation
      const matches = SCHEMES.map(s => ({
        scheme: s,
        eligible: (answers.age >= (s.min_age || 0)) && (answers.hasBplCard || answers.annualIncome <= s.max_income),
        reasons_ml: [],
        reasons_en: [],
        matchScore: 90
      }));
      setAssessmentResults(matches);
    } finally {
      setIsCalculating(false);
    }
  };

  const resetAssessment = () => {
    setAssessmentResults(null);
    setCurrentStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      
      {!assessmentResults ? (
        /* Wizard Step-by-Step Card */
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border-2 border-emerald-100">
          
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-2">
              <span className="uppercase tracking-wider">
                {language === 'ml' ? `ചോദ്യം ${currentStep} / ${totalSteps}` : `Question ${currentStep} of ${totalSteps}`}
              </span>
              <span className="text-emerald-700 font-extrabold">{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-emerald-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question 1: Age */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🎂</span>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    {language === 'ml' ? 'നിങ്ങളുടെ പ്രായം എത്രയാണ്?' : 'What is your current age?'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {language === 'ml' 
                      ? 'വാർദ്ധക്യ പെൻഷന് 60 വയസ്സും, വയോമിത്രം പദ്ധതിക്ക് 65 വയസ്സുമാണ് നിശ്ചയിച്ചിട്ടുള്ളത്.' 
                      : 'Old Age Pension begins at age 60, while Vayomithram healthcare begins at 65.'}
                  </p>
                </div>
              </div>

              {/* Age preset buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {[60, 65, 70, 75].map((presetAge) => (
                  <button
                    key={presetAge}
                    onClick={() => setAnswers(prev => ({ ...prev, age: presetAge }))}
                    className={`py-4 px-3 rounded-2xl border-2 font-extrabold text-lg text-center transition-all ${
                      answers.age === presetAge
                        ? 'bg-emerald-800 text-amber-300 border-emerald-900 shadow-md ring-2 ring-emerald-500'
                        : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    {presetAge} {language === 'ml' ? 'വയസ്സ്' : 'Years'}
                  </button>
                ))}
              </div>

              {/* Exact numeric input */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {language === 'ml' ? 'കൃത്യമായ പ്രായം എഴുതുക:' : 'Or enter exact age:'}
                </label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={answers.age}
                  onChange={(e) => setAnswers(prev => ({ ...prev, age: parseInt(e.target.value, 10) || 0 }))}
                  className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-4 py-3.5 text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>
          )}

          {/* Question 2: Kerala Residency */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🏠</span>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    {language === 'ml' ? 'കഴിഞ്ഞ 2 വർഷമായി കേരളത്തിൽ സ്ഥിരതാമസമാണോ?' : 'Are you a permanent resident of Kerala for 2+ years?'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {language === 'ml' 
                      ? 'കേരള സർക്കാരിന്റെ ക്ഷേമ പെൻഷനുകൾക്ക് കേരളത്തിൽ സ്ഥിരതാമസം നിർബന്ധമാണ്.' 
                      : 'Kerala welfare pensions require proof of ongoing residency in Kerala.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <button
                  onClick={() => setAnswers(prev => ({ ...prev, residesInKerala: true }))}
                  className={`p-6 rounded-2xl border-2 font-extrabold text-lg text-center transition-all ${
                    answers.residesInKerala === true
                      ? 'bg-emerald-800 text-amber-300 border-emerald-900 shadow-md ring-2 ring-emerald-500'
                      : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  {language === 'ml' ? 'അതെ, കേരളത്തിലാണ് താമസം ✓' : 'Yes, Residing in Kerala ✓'}
                </button>
                <button
                  onClick={() => setAnswers(prev => ({ ...prev, residesInKerala: false }))}
                  className={`p-6 rounded-2xl border-2 font-extrabold text-lg text-center transition-all ${
                    answers.residesInKerala === false
                      ? 'bg-rose-800 text-white border-rose-900 shadow-md ring-2 ring-rose-500'
                      : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  {language === 'ml' ? 'അല്ല (മറ്റ് സംസ്ഥാനം/വിദേശം)' : 'No (Other State/Abroad)'}
                </button>
              </div>
            </div>
          )}

          {/* Question 3: Ration Card & Income */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🌾</span>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    {language === 'ml' ? 'നിങ്ങളുടെ റേഷൻ കാർഡ് മുൻഗണനാ വിഭാഗമാണോ?' : 'What type of Ration Card do you hold?'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {language === 'ml' 
                      ? 'മഞ്ഞ (AAY) അല്ലെങ്കിൽ പിങ്ക് (PHH) കാർഡുകൾക്ക് പെൻഷനുകളിലും KASP സൗജന്യ ചികിത്സയിലും ഉയർന്ന മുൻഗണനയുണ്ട്.' 
                      : 'Yellow (AAY) or Pink (PHH) cards qualify for instant priority and cashless health coverage.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  onClick={() => setAnswers(prev => ({ ...prev, hasBplCard: true, annualIncome: 50000 }))}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${
                    answers.hasBplCard === true
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500'
                      : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="font-extrabold text-base mb-1">
                    {language === 'ml' ? 'മഞ്ഞ അല്ലെങ്കിൽ പിങ്ക് കാർഡ് (BPL / മുൻഗണന)' : 'Yellow or Pink Card (Priority / BPL)'}
                  </div>
                  <p className="text-xs opacity-90">
                    {language === 'ml' ? 'അന്ത്യോദയ (AAY) അല്ലെങ്കിൽ മുൻഗണനാ കുടുംബങ്ങൾ' : 'Antyodaya or Priority Household'}
                  </p>
                </button>

                <button
                  onClick={() => setAnswers(prev => ({ ...prev, hasBplCard: false, annualIncome: 150000 }))}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${
                    answers.hasBplCard === false
                      ? 'bg-amber-800 text-white border-amber-900 shadow-md ring-2 ring-amber-500'
                      : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="font-extrabold text-base mb-1">
                    {language === 'ml' ? 'നീല അല്ലെങ്കിൽ വെള്ള കാർഡ് (Non-Priority)' : 'Blue or White Card (Non-Priority)'}
                  </div>
                  <p className="text-xs opacity-90">
                    {language === 'ml' ? 'വരുമാന സർട്ടിഫിക്കറ്റ് ആവശ്യമായി വന്നേക്കാം' : 'Income certificate from village office required'}
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Question 4: Disability & Medical Condition */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🩺</span>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    {language === 'ml' ? 'ശാരീരികമോ മാനസികമോ ആയ ഭിന്നശേഷി ഉണ്ടോ?' : 'Do you have any physical or mental disability?'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {language === 'ml' 
                      ? 'മെഡിക്കൽ ബോർഡിൽ നിന്നുള്ള 40% സർട്ടിഫിക്കറ്റ് ഉണ്ടെങ്കിൽ പ്രത്യേക വികലാംഗ പെൻഷനും UDID കാർഡും ലഭിക്കും.' 
                      : 'A 40%+ medical board certificate entitles you to PwD pension and UDID national concessions.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  onClick={() => setAnswers(prev => ({ ...prev, isDiffAbled: true, disabilityPct: 50 }))}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${
                    answers.isDiffAbled === true
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500'
                      : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="font-extrabold text-base mb-1">
                    {language === 'ml' ? 'അതെ, 40% അല്ലെങ്കിൽ കൂടുതൽ വൈകല്യമുണ്ട്' : 'Yes, 40% or more disability'}
                  </div>
                  <p className="text-xs opacity-90">
                    {language === 'ml' ? 'മെഡിക്കൽ ബോർഡ് സർട്ടിഫിക്കറ്റ് / UDID ഉണ്ട്' : 'Holds Medical Board certificate or UDID'}
                  </p>
                </button>

                <button
                  onClick={() => setAnswers(prev => ({ ...prev, isDiffAbled: false, disabilityPct: 0 }))}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${
                    answers.isDiffAbled === false
                      ? 'bg-gray-800 text-white border-gray-900 shadow-md ring-2 ring-gray-500'
                      : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="font-extrabold text-base mb-1">
                    {language === 'ml' ? 'ഇല്ല, ഭിന്നശേഷി ഇല്ല' : 'No disability'}
                  </div>
                  <p className="text-xs opacity-90">
                    {language === 'ml' ? 'ജനറൽ / വാർദ്ധക്യ പദ്ധതികൾക്ക് ബാധകമാണ്' : 'Proceed with age and general welfare schemes'}
                  </p>
                </button>
              </div>

              {/* Bedridden caregiver checkbox */}
              <div className="mt-4 p-4 rounded-2xl bg-teal-50 border border-teal-200 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="bedridden"
                  checked={answers.isBedridden}
                  onChange={(e) => setAnswers(prev => ({ ...prev, isBedridden: e.target.checked }))}
                  className="w-5 h-5 rounded text-emerald-700 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="bedridden" className="text-xs sm:text-sm font-bold text-teal-950 cursor-pointer">
                  {language === 'ml' 
                    ? 'പൂർണ്ണമായും കിടപ്പിലായ രോഗിയെ പരിചരിക്കുന്ന ആളാണോ? (ആശ്വാസകിരണം പദ്ധതിക്ക്)' 
                    : 'Are you caring for a completely bedridden patient? (For Aswasakiranam Scheme)'}
                </label>
              </div>
            </div>
          )}

          {/* Question 5: Municipality or Grama Panchayat Location */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">📍</span>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    {language === 'ml' ? 'നിങ്ങളുടെ തദ്ദേശ സ്വയംഭരണ സ്ഥാപനം ഏതാണ്?' : 'What type of Local Self-Government body do you reside in?'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {language === 'ml' 
                      ? 'വയോമിത്രം മൊബൈൽ ഹെൽത്ത് ക്ലിനിക്കുകൾ നിലവിൽ മുനിസിപ്പാലിറ്റികളിലും കോർപ്പറേഷനുകളിലുമാണ് പ്രവർത്തിക്കുന്നത്.' 
                      : 'Vayomithram geriatric mobile clinics operate in Municipalities and City Corporations.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  onClick={() => setAnswers(prev => ({ ...prev, isUrban: false }))}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${
                    answers.isUrban === false
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500'
                      : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="font-extrabold text-base mb-1">
                    {language === 'ml' ? 'ഗ്രാമപഞ്ചായത്ത് (Grama Panchayat)' : 'Grama Panchayat (Rural)'}
                  </div>
                  <p className="text-xs opacity-90">
                    {language === 'ml' ? 'ഗ്രാമീണ തദ്ദേശ സ്വയംഭരണ പ്രദേശം' : 'Rural local body'}
                  </p>
                </button>

                <button
                  onClick={() => setAnswers(prev => ({ ...prev, isUrban: true }))}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${
                    answers.isUrban === true
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500'
                      : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="font-extrabold text-base mb-1">
                    {language === 'ml' ? 'മുനിസിപ്പാലിറ്റി / കോർപ്പറേഷൻ' : 'Municipality / Corporation'}
                  </div>
                  <p className="text-xs opacity-90">
                    {language === 'ml' ? 'നഗരസഭാ പ്രദേശം (വയോമിത്രം ലഭ്യമാണ്)' : 'Urban local body (Eligible for Vayomithram)'}
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-100">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-5 py-3 rounded-2xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'ml' ? 'പിന്നോട്ട്' : 'Back'}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={isCalculating}
              className="px-8 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform active:scale-95 flex items-center gap-2"
            >
              <span>
                {currentStep === totalSteps
                  ? (language === 'ml' ? 'യോജ്യത കണക്കാക്കുക 🎯' : 'Calculate Eligibility 🎯')
                  : (language === 'ml' ? 'അടുത്ത ചോദ്യം' : 'Next Question')}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* Results View */
        <div className="space-y-6">
          
          <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-400">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-400 text-emerald-950">
                  {language === 'ml' ? 'യോജ്യത ഫലം' : 'Assessment Summary'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-amber-300 mt-2">
                  {language === 'ml' ? 'നിങ്ങൾക്ക് അർഹതയുള്ള ക്ഷേമ പദ്ധതികൾ' : 'Eligible Welfare Schemes For You'}
                </h2>
                <p className="text-emerald-100 text-sm mt-1">
                  {language === 'ml' 
                    ? `പ്രായം: ${answers.age} വയസ്സ് | റേഷൻ കാർഡ്: ${answers.hasBplCard ? 'മുൻഗണന (BPL)' : 'പൊതുവിഭാഗം'}`
                    : `Age: ${answers.age} | Ration Card: ${answers.hasBplCard ? 'Priority BPL' : 'Non-priority'}`}
                </p>
              </div>

              <button
                onClick={resetAssessment}
                className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-amber-300 border border-emerald-600 font-bold text-xs flex items-center gap-1.5 self-start sm:self-center"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{language === 'ml' ? 'വീണ്ടും പരിശോധിക്കുക' : 'Re-assess'}</span>
              </button>
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-4">
            {assessmentResults.map((item, idx) => {
              const { scheme, eligible, reasons_ml, reasons_en, matchScore } = item;
              return (
                <div
                  key={scheme.id}
                  className={`bg-white rounded-3xl p-6 border-2 transition-all shadow-sm ${
                    eligible ? 'border-emerald-500 bg-emerald-50/20' : 'border-gray-200 opacity-75'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {eligible ? (
                          <span className="inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-600 text-white">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {language === 'ml' ? '100% യോജ്യതയുണ്ട്' : 'Fully Eligible'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-gray-200 text-gray-700">
                            {language === 'ml' ? `${matchScore}% സാധ്യത` : `${matchScore}% Match`}
                          </span>
                        )}

                        {scheme.monthly_amount > 0 && (
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                            ₹{scheme.monthly_amount}/മാസം
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-extrabold text-gray-900">
                        {language === 'ml' ? scheme.name_ml : scheme.name_en}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-600">
                        {language === 'ml' ? scheme.benefit_ml : scheme.benefit_en}
                      </p>

                      {/* Ineligible explanation reasons */}
                      {!eligible && reasons_ml.length > 0 && (
                        <div className="mt-2 text-xs text-rose-700 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                          <span className="font-bold">{language === 'ml' ? 'നിബന്ധന: ' : 'Requirement: '}</span>
                          <span>{(language === 'ml' ? reasons_ml : reasons_en).join(' ')}</span>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 self-end md:self-center flex-shrink-0">
                      {eligible && (
                        <button
                          onClick={() => {
                            if (setSelectedSchemeId) setSelectedSchemeId(scheme.id);
                            setActiveScreen('companion');
                          }}
                          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow flex items-center gap-1.5 transition-transform active:scale-95"
                        >
                          <span>{language === 'ml' ? 'അപേക്ഷ തയ്യാറാക്കുക' : 'Prepare Application'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
