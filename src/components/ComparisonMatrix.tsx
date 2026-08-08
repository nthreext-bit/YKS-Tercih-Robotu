import React from 'react';
import { Program } from '../types';
import { GitCompare, Trash2, Building, MapPin, Check, X, Shield, ArrowRight } from 'lucide-react';

interface ComparisonMatrixProps {
  programs: Program[];
  onRemoveFromCompare: (id: string) => void;
  onClearCompare: () => void;
  onAddToPreferences: (program: Program) => void;
  preferenceIds: Set<string>;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  programs,
  onRemoveFromCompare,
  onClearCompare,
  onAddToPreferences,
  preferenceIds
}) => {
  if (programs.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-white rounded-2xl border border-slate-200 p-12 max-w-xl mx-auto shadow-sm">
          <GitCompare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">Karşılaştırmak İçin Program Seçiniz</h3>
          <p className="text-xs text-slate-500 mt-1">
            "Program Arama" sayfasındaki program kartlarının üzerindeki "Karşılaştır" butonuna tıklayarak en fazla 4 programı yan yana ekleyebilirsiniz.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-blue-600" /> Program Karşılaştırma Matrisi ({programs.length}/4)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Seçtiğiniz yükseköğretim programlarını sıralama, puan, kontenjan ve koşullar bazında yan yana inceleyin.
          </p>
        </div>

        <button
          onClick={onClearCompare}
          className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-xl transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Tümünü Temizle
        </button>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          
          {/* Program Header Cards */}
          <thead>
            <tr className="bg-slate-900 text-white divide-x divide-slate-800">
              <th className="p-4 w-48 font-bold text-slate-300 bg-slate-950">Özellik / Kriter</th>
              {programs.map((p) => {
                const isAdded = preferenceIds.has(p.id);
                return (
                  <th key={p.id} className="p-4 min-w-[240px] max-w-[280px] align-top">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {p.code}
                      </span>
                      <button
                        onClick={() => onRemoveFromCompare(p.id)}
                        className="text-slate-400 hover:text-rose-400 p-0.5"
                        title="Kaldır"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className="font-bold text-white text-xs leading-snug line-clamp-2 mb-1">
                      {p.programName}
                    </h4>

                    <p className="text-[11px] text-slate-300 font-medium">
                      {p.universityName}
                    </p>

                    <button
                      onClick={() => onAddToPreferences(p)}
                      disabled={isAdded}
                      className={`mt-3 w-full py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all ${
                        isAdded
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-blue-600 hover:bg-blue-500 text-white'
                      }`}
                    >
                      {isAdded ? 'Listede Eklendi' : '+ Tercihe Ekle'}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 text-slate-800">
            
            {/* Row 1: Şehir & Üniversite Türü */}
            <tr className="divide-x divide-slate-200 hover:bg-slate-50/80">
              <td className="p-3.5 font-bold text-slate-700 bg-slate-50">Şehir / Tür</td>
              {programs.map((p) => (
                <td key={p.id} className="p-3.5 font-semibold">
                  {p.city} ({p.universityType})
                </td>
              ))}
            </tr>

            {/* Row 2: Puan Türü & Dil */}
            <tr className="divide-x divide-slate-200 hover:bg-slate-50/80">
              <td className="p-3.5 font-bold text-slate-700 bg-slate-50">Puan Türü & Dil</td>
              {programs.map((p) => (
                <td key={p.id} className="p-3.5">
                  <span className="font-bold text-blue-700">{p.scoreType}</span> • {p.language} ({p.durationYears} Yıl)
                </td>
              ))}
            </tr>

            {/* Row 3: Burs & Öğretim Türü */}
            <tr className="divide-x divide-slate-200 hover:bg-slate-50/80">
              <td className="p-3.5 font-bold text-slate-700 bg-slate-50">Burs & Öğretim</td>
              {programs.map((p) => (
                <td key={p.id} className="p-3.5">
                  <span className="bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded text-[11px]">
                    {p.scholarship}
                  </span>
                </td>
              ))}
            </tr>

            {/* Row 4: 2025 Taban Sıralama */}
            <tr className="divide-x divide-slate-200 bg-blue-50/30 font-bold">
              <td className="p-3.5 text-blue-900 bg-blue-100/50">2025 Taban Sıralaması</td>
              {programs.map((p) => {
                const rank25 = p.years[2025]?.minRank;
                return (
                  <td key={p.id} className="p-3.5 text-sm text-blue-700 font-extrabold">
                    {rank25 ? rank25.toLocaleString('tr-TR') : 'Dolmadı'}
                  </td>
                );
              })}
            </tr>

            {/* Row 5: 2024 Taban Sıralama */}
            <tr className="divide-x divide-slate-200 hover:bg-slate-50/80">
              <td className="p-3.5 font-bold text-slate-700 bg-slate-50">2024 Taban Sıralaması</td>
              {programs.map((p) => {
                const rank24 = p.years[2024]?.minRank;
                return (
                  <td key={p.id} className="p-3.5 text-slate-700">
                    {rank24 ? rank24.toLocaleString('tr-TR') : '-'}
                  </td>
                );
              })}
            </tr>

            {/* Row 6: 2025 Taban Puan */}
            <tr className="divide-x divide-slate-200 hover:bg-slate-50/80">
              <td className="p-3.5 font-bold text-slate-700 bg-slate-50">2025 Taban Puanı</td>
              {programs.map((p) => (
                <td key={p.id} className="p-3.5 font-semibold text-slate-900">
                  {p.years[2025]?.minScore || '-'}
                </td>
              ))}
            </tr>

            {/* Row 7: 2025 Kontenjan */}
            <tr className="divide-x divide-slate-200 hover:bg-slate-50/80">
              <td className="p-3.5 font-bold text-slate-700 bg-slate-50">2025 Kontenjanı</td>
              {programs.map((p) => (
                <td key={p.id} className="p-3.5 font-medium">
                  {p.years[2025]?.quota || '-'} Kişi
                </td>
              ))}
            </tr>

            {/* Row 8: Özel Koşullar */}
            <tr className="divide-x divide-slate-200 hover:bg-slate-50/80">
              <td className="p-3.5 font-bold text-slate-700 bg-slate-50">Özel Koşullar (Bk.)</td>
              {programs.map((p) => (
                <td key={p.id} className="p-3.5 text-[11px] text-slate-600 leading-snug">
                  {p.notes || 'Özel koşul yok'}
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
};
