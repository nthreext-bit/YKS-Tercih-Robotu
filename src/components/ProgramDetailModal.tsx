import React from 'react';
import { Program, UserScores } from '../types';
import { X, MapPin, Building2, BookOpen, Clock, ShieldCheck, Award, TrendingUp, Info, Plus } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface ProgramDetailModalProps {
  program: Program | null;
  onClose: () => void;
  onAddToPreferences: (program: Program) => void;
  isInPreferences: boolean;
  userScores: UserScores;
}

export const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  program,
  onClose,
  onAddToPreferences,
  isInPreferences,
  userScores
}) => {
  if (!program) return null;

  const y24 = program.years[2024];
  const y25 = program.years[2025];
  const y26 = program.years[2026];

  const chartData = [
    { year: '2024', rank: y24?.minRank || 0, score: y24?.minScore || 0 },
    { year: '2025', rank: y25?.minRank || 0, score: y25?.minScore || 0 },
    { year: '2026 (Tahmin)', rank: y26?.minRank || program.predicted2026RankMin || 0, score: y26?.minScore || program.predicted2026Score || 0 }
  ];

  // User rank comparison
  const relevantRank = 
    program.scoreType === 'SAY' ? userScores.sayRank :
    program.scoreType === 'EA' ? userScores.eaRank :
    program.scoreType === 'SÖZ' ? userScores.sozRank :
    program.scoreType === 'DİL' ? userScores.dilRank :
    userScores.tytRank;

  let safetyCategory = 'Sıralama Girilmedi';
  let categoryColor = 'bg-slate-100 text-slate-700 border-slate-300';

  if (relevantRank && y25) {
    const diffPct = ((y25.minRank - relevantRank) / y25.minRank) * 100;
    if (diffPct >= 20) {
      safetyCategory = 'Güvenli (Garantiye Yakın)';
      categoryColor = 'bg-emerald-50 text-emerald-700 border-emerald-300';
    } else if (diffPct >= -20) {
      safetyCategory = 'Hedef (Dengeli)';
      categoryColor = 'bg-amber-50 text-amber-700 border-amber-300';
    } else {
      safetyCategory = 'Riskli (Sürpriz/Yüksek)';
      categoryColor = 'bg-rose-50 text-rose-700 border-rose-300';
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-blue-600 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                {program.code}
              </span>
              <span className="bg-slate-700 text-slate-200 text-[11px] font-semibold px-2 py-0.5 rounded">
                {program.scoreType}
              </span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-medium px-2 py-0.5 rounded">
                {program.scholarship}
              </span>
            </div>
            <h2 className="text-lg font-bold leading-snug">{program.programName}</h2>
            <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-semibold text-white">{program.universityName}</span>
              <span className="text-slate-400">• {program.faculty}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-6 text-sm text-slate-700">

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Şehir / Tür
              </p>
              <p className="font-semibold text-slate-900 mt-0.5">{program.city}</p>
              <p className="text-[11px] text-slate-500">{program.universityType}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> Süre & Dil
              </p>
              <p className="font-semibold text-slate-900 mt-0.5">{program.durationYears} Yıl</p>
              <p className="text-[11px] text-slate-500">{program.language}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" /> 2025 Kontenjan
              </p>
              <p className="font-semibold text-slate-900 mt-0.5">{y25?.quota || '-'} Kişi</p>
              <p className="text-[11px] font-medium text-emerald-600">
                {y25?.isFull ? 'Tam Doldu' : 'Kontenjan Dolmadı'}
              </p>
            </div>

            <div className={`p-3 rounded-xl border ${categoryColor}`}>
              <p className="text-xs font-medium opacity-80 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Tercih Uyum Durumu
              </p>
              <p className="font-bold mt-0.5 text-xs">{safetyCategory}</p>
              {relevantRank && y25 && (
                <p className="text-[10px] mt-0.5 opacity-90">
                  Sıralamanız: {relevantRank.toLocaleString('tr-TR')}
                </p>
              )}
            </div>
          </div>

          {/* 3-Year Trend Comparison Table */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" /> 3 Yıllık Taban Sıralama ve Puan Trendi
            </h3>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Yıl</th>
                    <th className="p-2.5">Taban Başarı Sırası</th>
                    <th className="p-2.5">Taban Puan</th>
                    <th className="p-2.5">Kontenjan</th>
                    <th className="p-2.5">Doluluk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">2024</td>
                    <td className="p-2.5 font-medium text-blue-700">
                      {y24?.minRank ? y24.minRank.toLocaleString('tr-TR') : '-'}
                    </td>
                    <td className="p-2.5 text-slate-700">{y24?.minScore || '-'}</td>
                    <td className="p-2.5 text-slate-700">{y24?.quota || '-'}</td>
                    <td className="p-2.5 text-emerald-600 font-medium">Doldu</td>
                  </tr>
                  <tr className="bg-blue-50/50 hover:bg-blue-50 font-semibold">
                    <td className="p-2.5 text-blue-900">2025 (Son Resmi)</td>
                    <td className="p-2.5 text-blue-700 font-bold">
                      {y25?.minRank ? y25.minRank.toLocaleString('tr-TR') : '-'}
                    </td>
                    <td className="p-2.5 text-slate-900">{y25?.minScore || '-'}</td>
                    <td className="p-2.5 text-slate-900">{y25?.quota || '-'}</td>
                    <td className="p-2.5 text-emerald-600 font-bold">Doldu</td>
                  </tr>
                  <tr className="hover:bg-slate-50 text-slate-600">
                    <td className="p-2.5 font-medium italic text-slate-500">2026 (Tahmin/Kılavuz)</td>
                    <td className="p-2.5 font-semibold text-slate-800">
                      ~{(y26?.minRank || program.predicted2026RankMin || 0).toLocaleString('tr-TR')}
                    </td>
                    <td className="p-2.5 text-slate-700">~{y26?.minScore || program.predicted2026Score}</td>
                    <td className="p-2.5 text-slate-700">{y26?.quota || y25?.quota || '-'}</td>
                    <td className="p-2.5 text-slate-500">Bekleniyor</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="text-xs font-semibold text-slate-700 mb-2">Taban Başarı Sıralaması Değişimi (Grafik):</p>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis reversed domain={['auto', 'auto']} tick={{ fontSize: 11 }} width={50} />
                  <Tooltip 
                    formatter={(value: any) => [`${Number(value).toLocaleString('tr-TR')}. sıra`, 'Başarı Sırası']} 
                  />
                  <Bar dataKey="rank" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Special Notes & Conditions (Bk. Maddeleri) */}
          {program.notes && (
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl">
              <p className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                <Info className="w-4 h-4 text-amber-600" /> ÖSYM Özel Koşul ve Açıklamalar
              </p>
              <p className="text-xs text-amber-800 leading-relaxed">{program.notes}</p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Kapat
          </button>

          <button
            onClick={() => {
              onAddToPreferences(program);
              onClose();
            }}
            disabled={isInPreferences}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              isInPreferences
                ? 'bg-emerald-100 text-emerald-800 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
            }`}
          >
            {isInPreferences ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Tercih Listenizde Eklendi
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Tercih Listeme Ekle
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
