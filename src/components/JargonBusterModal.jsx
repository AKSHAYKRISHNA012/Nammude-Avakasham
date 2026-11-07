import React from 'react';
import { X, Volume2, HelpCircle } from 'lucide-react';
import { FREQUENT_GOVERNMENT_TERMS } from '../data/schemesData.js';
import { speakText } from '../utils/speech.js';

export default function JargonBusterModal({ isOpen, onClose, language }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border-4 border-amber-400 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 bg-emerald-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-amber-300">
                {language === 'ml' ? 'സർക്കാർ പദാവലികൾ ലളിതമായി' : 'Government Jargon Demystifier'}
              </h3>
              <p className="text-xs text-emerald-200">
                {language === 'ml' ? 'കഠിനമായ സാങ്കേതിക പദങ്ങൾ എളുപ്പത്തിൽ മനസ്സിലാക്കാം' : 'Simple Malayalam translations of complex official terms'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal List */}
        <div className="p-6 overflow-y-auto space-y-4">
          {FREQUENT_GOVERNMENT_TERMS.map((term, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:border-emerald-400 transition-colors space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-gray-900 text-base">
                  {language === 'ml' ? term.term_ml : term.term_en}
                </h4>
                <button
                  onClick={() => speakText(language === 'ml' ? term.simple_explanation_ml : term.simple_explanation_en, language)}
                  className="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-1"
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="hidden sm:inline">{language === 'ml' ? 'കേൾക്കുക 🔊' : 'Listen 🔊'}</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {language === 'ml' ? term.simple_explanation_ml : term.simple_explanation_en}
              </p>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-100 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs"
          >
            {language === 'ml' ? 'ശരി, മനസ്സിലായി' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
}
