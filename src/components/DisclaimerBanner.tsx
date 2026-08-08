import React, { useState } from 'react';
import { AlertTriangle, X, ExternalLink, Info } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <p className="leading-snug">
            <span className="font-semibold">Hukuki / Resmi Uyarı:</span> Bu uygulama resmi bir ÖSYM ürünü değildir. 
            Arayüzdeki sıralamalar ve tahminler bilgilendirme amaçlı türetilmiş verilerdir. 
            Kesin tercih bildirimi için lütfen <a href="https://ais.osym.gov.tr" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-amber-700 inline-flex items-center gap-0.5">ÖSYM AİS Sistemini <ExternalLink className="w-3 h-3" /></a> kontrol ediniz.
          </p>
        </div>
        <button 
          onClick={() => setDismissed(true)} 
          className="text-amber-700 dark:text-amber-400 hover:opacity-80 p-1 rounded-md transition-colors"
          title="Kapat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
