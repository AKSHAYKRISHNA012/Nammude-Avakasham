import React from 'react';

export default function AudioWaveVisualizer({ isPlaying = false, color = 'bg-amber-400', label = '' }) {
  if (!isPlaying) return null;

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20">
      <div className="flex items-center gap-1 h-5">
        <span className={`w-1 rounded-full ${color} wave-bar-1`}></span>
        <span className={`w-1 rounded-full ${color} wave-bar-2`}></span>
        <span className={`w-1 rounded-full ${color} wave-bar-3`}></span>
        <span className={`w-1 rounded-full ${color} wave-bar-4`}></span>
        <span className={`w-1 rounded-full ${color} wave-bar-5`}></span>
      </div>
      {label && <span className="text-[11px] font-black text-amber-300 uppercase tracking-wider">{label}</span>}
    </div>
  );
}
