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
  ChevronRight,
  Sun,
  Sunrise,
  Moon
} from 'lucide-react';
import { INITIAL_MEDICATIONS } from '../../data/vaidyaData.js';
import { speakText, stopSpeech } from '../../utils/speech.js';
import AudioWaveVisualizer from '../common/AudioWaveVisualizer.jsx';
import confetti from 'canvas-confetti';

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

    const targetMed = medications.find(m => m.id === id);
    const medName = targetMed?.name || '';

    if (newStatus === 'taken') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
      showToast(language === 'ml' ? `${medName} കഴിച്ചതായി രേഖപ്പെടുത്തി ✓` : `${medName} marked as taken ✓`);
      speakText(
        language === 'ml' 
          ? `${medName} കഴിച്ചതായി രേഖപ്പെടുത്തി. നല്ല ആരോഗ്യം ആശംസിക്കുന്നു.` 
          : `${medName} marked as taken. Stay healthy.`,
        language
      );
    } else if (newStatus === 'skipped') {
      showToast(language === 'ml' ? `${medName} ഒഴിവാക്കിയതായി രേഖപ്പെടുത്തി ⚠️` : `${medName} marked as skipped ⚠️`);
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
    if (activeSpeechId === med.id) {
      stopSpeech();
      setActiveSpeechId(null);
      return;
    }

    stopSpeech();
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

  const getTimeIcon = (tod) => {
    if (tod === 'morning') return <Sunrise className="w-4 h-4 text-amber-500" />;
    if (tod === 'afternoon') return <Sun className="w-4 h-4 text-orange-500" />;
    return <Moon className="w-4 h-4 text-indigo-400" />;
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-teal-950 text-white px-6 py-3.5 rounded-2xl shadow-2xl border-2 border-amber-400 font-black text-sm animate-bounce flex items-center gap-2.5">
          <span className="text-xl">🔔</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner with Adherence Metric */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-soft border-2 border-teal-100">
        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
          <span>ℹ️ {language === 'ml' ? 'മാതൃകാ ക്ലിനിക്കൽ പ്രൊഫൈൽ / Sample Profile for Demonstration' : 'Illustrative Clinical Profile for Demonstration'}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-black mb-2 shadow-sm">
              <BellRing className="w-4 h-4 text-teal-700" />
              <span>{language === 'ml' ? 'സ്മാർട്ട് മരുന്ന് ഓർമ്മപ്പെടുത്തൽ' : 'Smart Medication Reminder'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {language === 'ml' ? 'ഇന്നത്തെ മരുന്നുകളുടെ സമയപ്പട്ടിക' : 'My Daily Medicine Schedule'}
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 font-medium">
              {language === 'ml' 
                ? 'നിശ്ചിത സമയത്ത് മലയാളത്തിൽ ശബ്ദ ഓർമ്മപ്പെടുത്തലുകൾ നൽകുന്നു.' 
                : 'Automated voice alerts in simple Malayalam so you never miss a dose.'}
            </p>
          </div>

          {/* Adherence Score Gauge Card */}
          <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-950 text-white p-6 rounded-3xl shadow-elevated border border-amber-400/40 min-w-[240px]">
            <div className="flex items-center justify-between text-xs font-bold text-amber-300 uppercase tracking-wider">
              <span>{language === 'ml' ? 'ഇന്നത്തെ പാലനം' : 'Today Adherence'}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-black text-white">{adherencePct}%</span>
              <span className="text-xs text-teal-200 font-bold">({takenMeds}/{totalMeds} {language === 'ml' ? 'കഴിച്ചു' : 'completed'})</span>
            </div>
            <div className="w-full bg-black/40 rounded-full h-2.5 mt-3 overflow-hidden p-0.5 border border-white/20">
              <div 
                className="bg-gradient-to-r from-amber-400 to-yellow-300 h-2 rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${adherencePct}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Time of Day Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-gray-100">
          {[
            { id: 'all', label_ml: 'എല്ലാ മരുന്നുകളും', label_en: 'All Medicines', icon: Pill },
            { id: 'morning', label_ml: 'രാവിലെ (Morning)', label_en: 'Morning', icon: Sunrise },
            { id: 'afternoon', label_ml: 'ഉച്ചയ്ക്ക് (Afternoon)', label_en: 'Afternoon', icon: Sun },
            { id: 'night', label_ml: 'രാത്രി (Night)', label_en: 'Night', icon: Moon }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-teal-700 text-white shadow-md ring-2 ring-teal-500/40 scale-102'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{language === 'ml' ? tab.label_ml : tab.label_en}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Medication Cards List with Micro-interactions */}
      <div className="space-y-4">
        {filteredMeds.map((med) => {
          const isTaken = med.status === 'taken';
          const isSkipped = med.status === 'skipped';
          const isSpeaking = activeSpeechId === med.id;

          return (
            <div
              key={med.id}
              className={`glass-card rounded-3xl p-6 border-2 transition-all shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6 transform hover:-translate-y-1 ${
                isTaken 
                  ? 'border-emerald-400 bg-emerald-50/40' 
                  : isSkipped 
                  ? 'border-rose-300 bg-rose-50/30' 
                  : 'border-teal-100 hover:border-teal-500'
              }`}
            >
              {/* Left details */}
              <div className="space-y-2.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-teal-100 text-teal-950 border border-teal-200 flex items-center gap-1.5 shadow-sm">
                    {getTimeIcon(med.time_of_day)}
                    <span>{language === 'ml' ? med.time_label_ml : med.time_label_en}</span>
                  </span>

                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300">
                    {language === 'ml' ? med.food_relation_ml : med.food_relation_en}
                  </span>

                  {isTaken && (
                    <span className="text-xs font-black px-3 py-0.5 rounded-full bg-emerald-600 text-white shadow-sm flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>{language === 'ml' ? 'കഴിച്ചു' : 'Taken'}</span>
                    </span>
                  )}
                  {isSkipped && (
                    <span className="text-xs font-black px-3 py-0.5 rounded-full bg-rose-600 text-white shadow-sm flex items-center gap-1">
                      <X className="w-3.5 h-3.5" />
                      <span>{language === 'ml' ? 'ഒഴിവാക്കി' : 'Skipped'}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                    <Pill className="w-5 h-5 text-teal-700" />
                  </div>
                  <span>{med.name}</span>
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  <span className="font-extrabold text-teal-900">{language === 'ml' ? 'ഉദ്ദേശ്യം: ' : 'Purpose: '}</span>
                  <span>{language === 'ml' ? med.purpose_ml : med.purpose_en}</span> | <span className="font-bold text-gray-800">{med.dosage}</span>
                </p>

                {isSpeaking && (
                  <AudioWaveVisualizer isPlaying={true} color="bg-teal-700" label={language === 'ml' ? 'ഓർമ്മപ്പെടുത്തുന്നു' : 'Announcing'} />
                )}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-start sm:justify-end flex-shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-teal-100/60">
                
                {/* Voice Reminder Trigger with Audio Equalizer */}
                <button
                  onClick={() => handlePlayVoiceReminder(med)}
                  className={`px-4 py-3 rounded-2xl flex items-center gap-2 text-xs font-black transition-all shadow-sm ${
                    isSpeaking 
                      ? 'bg-rose-600 text-white animate-pulse' 
                      : 'bg-teal-50 hover:bg-teal-100 text-teal-900 border-2 border-teal-200'
                  }`}
                  title="Play Voice Reminder"
                >
                  <Volume2 className="w-4 h-4 text-teal-700" />
                  <span className="inline">
                    {isSpeaking ? (language === 'ml' ? 'നിർത്തൂ' : 'Stop') : (language === 'ml' ? 'ഓർമ്മപ്പെടുത്തൽ 🔊' : 'Voice 🔊')}
                  </span>
                </button>

                {/* Mark as Taken */}
                <button
                  onClick={() => handleStatusChange(med.id, 'taken')}
                  className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 ${
                    isTaken 
                      ? 'bg-emerald-800 text-white ring-2 ring-emerald-500' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{language === 'ml' ? 'കഴിച്ചു' : 'Taken'}</span>
                </button>

                {/* Mark as Skipped */}
                <button
                  onClick={() => handleStatusChange(med.id, 'skipped')}
                  className={`px-4 py-3 rounded-2xl font-bold text-xs flex items-center gap-1.5 text-gray-600 hover:text-rose-700 hover:bg-rose-50 border border-gray-300 transition-colors ${
                    isSkipped ? 'bg-rose-100 text-rose-900 border-rose-300 font-black' : ''
                  }`}
                  title="Mark as Skipped"
                >
                  <X className="w-4 h-4" />
                  <span className="inline">{language === 'ml' ? 'ഒഴിവാക്കി' : 'Skip'}</span>
                </button>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
