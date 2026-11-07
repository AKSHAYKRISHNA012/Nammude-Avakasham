import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, ShieldCheck } from 'lucide-react';

export default function NetworkResilienceBanner({ language }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      setTimeout(() => setShowReconnected(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showReconnected) return null;

  return (
    <div className={`px-4 py-2.5 text-xs font-black flex items-center justify-center gap-2 shadow-md transition-all ${
      !isOnline 
        ? 'bg-amber-500 text-emerald-950 border-b border-amber-600' 
        : 'bg-emerald-600 text-white'
    }`}>
      {!isOnline ? (
        <>
          <WifiOff className="w-4 h-4 animate-pulse text-emerald-950" />
          <span>
            {language === 'ml' 
              ? 'ഓഫ്‌ലൈൻ മോഡ് സജീവം: മരുന്ന് സമയപ്പട്ടികയും സംഭാഷണങ്ങളും ലോക്കൽ മെമ്മറിയിൽ സുരക്ഷിതമാണ്.' 
              : 'Offline Mode Active: Your medication schedules and drafts are safely stored locally.'}
          </span>
        </>
      ) : (
        <>
          <Wifi className="w-4 h-4 text-white" />
          <span>
            {language === 'ml' ? 'ഇന്റർനെറ്റ് പുനഃസ്ഥാപിച്ചു ✓' : 'Online connection restored ✓'}
          </span>
        </>
      )}
    </div>
  );
}
