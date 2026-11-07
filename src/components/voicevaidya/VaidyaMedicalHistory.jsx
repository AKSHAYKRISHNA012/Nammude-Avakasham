import React from 'react';
import { 
  FileHeart, 
  AlertOctagon, 
  History, 
  Printer, 
  Download, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck,
  HeartPulse
} from 'lucide-react';
import { MEDICAL_HISTORY } from '../../data/vaidyaData.js';

export default function VaidyaMedicalHistory({ language }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-teal-100">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold mb-2">
          <FileHeart className="w-4 h-4 text-teal-700" />
          <span>{language === 'ml' ? 'ആരോഗ്യ ചരിത്ര രേഖകൾ' : 'Personal Medical History'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          {language === 'ml' ? 'ആരോഗ്യ ചരിത്രവും അലർജി വിവരങ്ങളും' : 'Health History, Conditions & Allergies'}
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          {language === 'ml' 
            ? 'നിങ്ങളുടെ രോഗാവസ്ഥകളും, അലർജികളും, മുൻകാല ഡോക്ടർ പരിശോധനകളും ഒരിടത്ത്.' 
            : 'Comprehensive record of your chronic conditions, drug allergies, and past visits.'}
        </p>
      </div>

      {/* Allergies Warning Card (Prominent Red Flag) */}
      <div className="bg-rose-50 rounded-3xl p-6 sm:p-8 border-2 border-rose-300 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-bold">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-rose-950">
              {language === 'ml' ? 'മരുന്ന് അലർജികൾ (Drug Allergies - RED FLAG)' : 'Known Drug Allergies (Critical)'}
            </h3>
            <p className="text-xs text-rose-900">
              {language === 'ml' ? 'പുതിയ മരുന്നുകൾ കുറിക്കുമ്പോൾ ഡോക്ടർമാരെ അറിയിക്കേണ്ട അലർജികൾ:' : 'Must be informed to any doctor before new prescriptions are issued:'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {MEDICAL_HISTORY.allergies.map((alg, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border-2 border-rose-200 shadow-sm space-y-1">
              <span className="text-xs font-black px-2 py-0.5 rounded bg-rose-100 text-rose-900 uppercase">
                {language === 'ml' ? 'അലർജി' : 'Allergy'}
              </span>
              <h4 className="font-black text-base text-gray-900">{alg.allergen}</h4>
              <p className="text-xs text-rose-700 font-medium">
                {language === 'ml' ? alg.severity_ml : alg.severity_en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chronic Conditions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
          <HeartPulse className="w-5 h-5 text-teal-700" />
          <span>{language === 'ml' ? 'ദീർഘകാല രോഗാവസ്ഥകൾ (Chronic Conditions):' : 'Chronic Conditions:'}</span>
        </h3>

        <div className="space-y-3">
          {MEDICAL_HISTORY.chronicConditions.map((cond, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-gray-900">
                  {language === 'ml' ? cond.name_ml : cond.name_en}
                </h4>
                <p className="text-xs text-gray-500">
                  {language === 'ml' ? `രോഗനിർണ്ണയം: ${cond.since} മുതൽ` : `Diagnosed: Since ${cond.since}`}
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-teal-100 text-teal-800 rounded-full self-start sm:self-center">
                {cond.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Past Doctor Visits */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
          <History className="w-5 h-5 text-teal-700" />
          <span>{language === 'ml' ? 'മുൻകാല ഡോക്ടർ സന്ദർശനങ്ങൾ (Past Consultations):' : 'Previous Consultations:'}</span>
        </h3>

        <div className="space-y-3">
          {MEDICAL_HISTORY.pastVisits.map((visit, idx) => (
            <div key={idx} className="p-4 bg-teal-50/40 rounded-2xl border border-teal-100 space-y-1 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-gray-900">{visit.doctor}</span>
                <span className="text-xs text-gray-500 font-bold">{visit.date}</span>
              </div>
              <p className="text-xs text-teal-800 font-semibold">{visit.hospital}</p>
              <p className="text-xs text-gray-700 pt-1 border-t border-teal-100/60">{visit.notes_ml}</p>
            </div>
          ))}
        </div>

        {/* Export / Print */}
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={handlePrint}
            className="px-6 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs sm:text-sm shadow flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>{language === 'ml' ? 'ആരോഗ്യ രേഖ പ്രിന്റ് ചെയ്യുക' : 'Print Health Summary'}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
