import React, { useState } from 'react';
import { 
  Pill, 
  Check, 
  X, 
  Volume2, 
  Clock, 
  AlertCircle, 
  Calendar, 
  Sparkles, 
  BellRing,
  Heart,
  ChevronRight
} from 'lucide-react';
import { INITIAL_MEDICATIONS } from '../../data/vaidyaData.js';
import { speakText } from '../../utils/speech.js';

export default function VaidyaMedicationSchedule({ language, onNotifyCaregiver }) {
  const [medications, setMedications] = useState(INITIAL_MEDICATIONS);
  const [selectedFilter, setSelectedFilter] = useState('all'); // all, morning, afternoon, night
  const [activeSpeechId, setActiveSpeechId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setMedications(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, status: newStatus };
      }
      return m;
    }));

    if (newStatus === 'taken') {
      showToast(language === 'ml' ? 'മരുന്ന് കഴിച്ചതായി രേഖപ്പെടുത്തി ✓' : 'Marked as taken ✓');
    } else if (newStatus === 'skipped') {
      showToast(language === 'ml' ? 'മരുന്ന് ഒഴിവാക്കിയതായി രേഖപ്പെടുത്തി ⚠️' : 'Marked as skipped ⚠️');
      if (onNotifyCaregiver) {
        onNotifyCaregiver(id);
      }
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePlayVoiceReminder = (med) => {
    setActiveSpeechId(med.id);
    speakText(med.reminder_audio_ml, language, () => {
      setActiveSpeechId(null);
    });
  };

  const filteredMeds = medications.filter(m => {
    if (selectedFilter === 'all') return true;
    return m.time_of_day === selectedFilter;
  });

  const totalMeds = medications.length;
  const takenMeds = medications.filter(m => m.status === 'taken').length;
  const adherencePct = Math.round((takenMeds / totalMeds) * 100);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-teal-900 text-white px-5 py-3 rounded-2xl shadow-2xl border-2 border-amber-400 font-extrabold text-sm animate-bounce flex items-center gap-2">
          <span>🔔</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-teal-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold mb-2">
              <BellRing className="w-4 h-4 text-teal-700" />
              <span>{language === 'ml' ? 'സ്മാർട്ട് മരുന്ന് ഓർമ്മപ്പെടുത്തൽ' : 'Smart Medication Reminder'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {language === 'ml' ? 'ഇന്നത്തെ മരുന്നുകളുടെ സമയപ്പട്ടിക' : 'My Daily Medicine Schedule'}
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              {language === 'ml' 
                ? 'നിശ്ചിത സമയത്ത് മലയാളത്തിൽ ശബ്ദ ഓർമ്മപ്പെടുത്തലുകൾ നൽകുന്നു.' 
                : 'Automated voice alerts in simple Malayalam so you never miss a dose.'}
            </p>
          </div>

          {/* Adherence Score Card */}
          <div className="bg-gradient-to-br from-teal-800 to-emerald-900 text-white p-5 rounded-2xl shadow-md min-w-[200px]">
            <span className="text-xs font-bold text-amber-300 uppercase">
              {language === 'ml' ? 'ഇന്നത്തെ പുരോഗതി' : 'Today Adherence'}
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black">{adherencePct}%</span>
              <span className="text-xs text-teal-200">({takenMeds}/{totalMeds} {language === 'ml' ? 'കഴിച്ചു' : 'taken'})</span>
            </div>
            <div className="w-full bg-teal-950/60 rounded-full h-2 mt-2 overflow-hidden">
              <div 
                className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${adherencePct}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Time of Day Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-gray-100">
          {[
            { id: 'all', label_ml: 'എല്ലാ മരുന്നുകളും', label_en: 'All Medicines' },
            { id: 'morning', label_ml: 'രാവിലെ (Morning)', label_en: 'Morning' },
            { id: 'afternoon', label_ml: 'ഉച്ചയ്ക്ക് (Afternoon)', label_en: 'Afternoon' },
            { id: 'night', label_ml: 'രാത്രി (Night)', label_en: 'Night' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedFilter === tab.id
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {language === 'ml' ? tab.label_ml : tab.label_en}
            </button>
          ))}
        </div>
      </div>

      {/* Medication Cards List */}
      <div className="space-y-4">
        {filteredMeds.map((med) => {
          const isTaken = med.status === 'taken';
          const isSkipped = med.status === 'skipped';
          const isSpeaking = activeSpeechId === med.id;

          return (
            <div
              key={med.id}
              className={`bg-white rounded-3xl p-6 border-2 transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                isTaken 
                  ? 'border-emerald-300 bg-emerald-50/20' 
                  : isSkipped 
                  ? 'border-rose-200 bg-rose-50/20' 
                  : 'border-gray-200 hover:border-teal-400'
              }`}
            >
              {/* Left details */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-teal-100 text-teal-900 border border-teal-200 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-700" />
                    <span>{language === 'ml' ? med.time_label_ml : med.time_label_en}</span>
                  </span>

                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                    {language === 'ml' ? med.food_relation_ml : med.food_relation_en}
                  </span>

                  {isTaken && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
                      {language === 'ml' ? 'കഴിച്ചു ✓' : 'Taken ✓'}
                    </span>
                  )}
                  {isSkipped && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-600 text-white">
                      {language === 'ml' ? 'ഒഴിവാക്കി ✗' : 'Skipped ✗'}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                  <Pill className="w-5 h-5 text-teal-700 flex-shrink-0" />
                  <span>{med.name}</span>
                </h3>

                <p className="text-xs sm:text-sm text-gray-600">
                  <span className="font-semibold text-teal-800">{language === 'ml' ? 'ഉദ്ദേശ്യം: ' : 'Purpose: '}</span>
                  <span>{language === 'ml' ? med.purpose_ml : med.purpose_en}</span> | {med.dosage}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 self-end md:self-center flex-shrink-0">
                
                {/* Voice Reminder Trigger */}
                <button
                  onClick={() => handlePlayVoiceReminder(med)}
                  className={`p-3 rounded-2xl flex items-center gap-1.5 text-xs font-bold transition-all ${
                    isSpeaking 
                      ? 'bg-rose-600 text-white animate-pulse' 
                      : 'bg-teal-100 hover:bg-teal-200 text-teal-900 border border-teal-300'
                  }`}
                  title="Play Voice Reminder"
                >
                  <Volume2 className="w-5 h-5" />
                  <span className="hidden sm:inline">
                    {isSpeaking ? (language === 'ml' ? 'ശബ്ദം നിർത്തൂ' : 'Stop') : (language === 'ml' ? 'ഓർമ്മപ്പെടുത്തൽ 🔊' : 'Voice Alert 🔊')}
                  </span>
                </button>

                {/* Mark as Taken */}
                <button
                  onClick={() => handleStatusChange(med.id, 'taken')}
                  className={`px-4 py-3 rounded-2xl font-black text-xs flex items-center gap-1.5 shadow transition-transform active:scale-95 ${
                    isTaken 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{language === 'ml' ? 'കഴിച്ചു' : 'Taken'}</span>
                </button>

                {/* Mark as Skipped */}
                <button
                  onClick={() => handleStatusChange(med.id, 'skipped')}
                  className={`px-3 py-3 rounded-2xl font-bold text-xs flex items-center gap-1 text-gray-600 hover:text-rose-700 hover:bg-rose-50 border border-gray-200 ${
                    isSkipped ? 'bg-rose-100 text-rose-800 border-rose-300' : ''
                  }`}
                  title="Mark as Skipped"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">{language === 'ml' ? 'ഒഴിവാക്കി' : 'Skip'}</span>
                </button>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
