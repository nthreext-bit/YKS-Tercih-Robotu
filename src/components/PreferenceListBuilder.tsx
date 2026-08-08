import React, { useState } from 'react';
import { PreferenceItem, Program, UserScores } from '../types';
import { 
  ListOrdered, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Download, 
  FileText, 
  Copy, 
  Check, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles,
  Info,
  Building,
  MapPin,
  Share2
} from 'lucide-react';
import * as XLSX from 'xlsx';
import confetti from 'canvas-confetti';

interface PreferenceListBuilderProps {
  preferenceItems: PreferenceItem[];
  userScores: UserScores;
  onRemoveItem: (id: string) => void;
  onReorder: (newItems: PreferenceItem[]) => void;
  onClearList: () => void;
  onOpenAiAdvisor: () => void;
}

export const PreferenceListBuilder: React.FC<PreferenceListBuilderProps> = ({
  preferenceItems,
  userScores,
  onRemoveItem,
  onReorder,
  onClearList,
  onOpenAiAdvisor
}) => {
  const [copiedCodeText, setCopiedCodeText] = useState(false);

  // Safety category breakdown statistics
  const safeCount = preferenceItems.filter((i) => i.category === 'Güvenli').length;
  const targetCount = preferenceItems.filter((i) => i.category === 'Hedef').length;
  const reachCount = preferenceItems.filter((i) => i.category === 'Riskli').length;

  const total = preferenceItems.length;

  // Move item up
  const moveUp = (index: number) => {
    if (index === 0) return;
    const items = [...preferenceItems];
    const temp = items[index];
    items[index] = items[index - 1];
    items[index - 1] = temp;
    // re-assign orders
    onReorder(items.map((it, idx) => ({ ...it, order: idx + 1 })));
  };

  // Move item down
  const moveDown = (index: number) => {
    if (index === preferenceItems.length - 1) return;
    const items = [...preferenceItems];
    const temp = items[index];
    items[index] = items[index + 1];
    items[index + 1] = temp;
    onReorder(items.map((it, idx) => ({ ...it, order: idx + 1 })));
  };

  // Validate ÖSYM Rules
  const warnings: string[] = [];

  // Check Ölü Tercih (High rank placed after much lower rank)
  for (let i = 0; i < preferenceItems.length - 1; i++) {
    const currentRank = preferenceItems[i].program.years[2025]?.minRank || 0;
    const nextRank = preferenceItems[i + 1].program.years[2025]?.minRank || 0;

    if (currentRank > 0 && nextRank > 0 && currentRank > nextRank * 1.5) {
      warnings.push(
        `Ölü Tercih Uyarısı: ${i + 1}. sıradaki (${preferenceItems[i].program.programName}) taban sıralaması (${currentRank.toLocaleString('tr-TR')}), kendisinden sonraki ${i + 2}. sıradaki programdan (${nextRank.toLocaleString('tr-TR')}) çok daha düşük!`
      );
    }
  }

  // Check Major Minimum Ranking Thresholds (Barajlar)
  preferenceItems.forEach((item, idx) => {
    const pName = item.program.programName.toLowerCase('tr-TR');
    const rank = item.program.scoreType === 'SAY' ? userScores.sayRank :
                 item.program.scoreType === 'EA' ? userScores.eaRank : null;

    if (pName.includes('tıp') && rank && rank > 50000) {
      warnings.push(`${idx + 1}. Tercih (${item.program.programName}): Tıp fakültesi için YKS ilk 50.000 başarı sırası şartı bulunmaktadır.`);
    }
    if (pName.includes('hukuk') && rank && rank > 125000) {
      warnings.push(`${idx + 1}. Tercih (${item.program.programName}): Hukuk fakültesi için YKS ilk 125.000 başarı sırası şartı bulunmaktadır.`);
    }
    if (pName.includes('mühendislik') && rank && rank > 300000) {
      warnings.push(`${idx + 1}. Tercih (${item.program.programName}): Mühendislik programları için YKS ilk 300.000 başarı sırası şartı bulunmaktadır.`);
    }
  });

  // Export to Excel (.xlsx)
  const exportToExcel = () => {
    const data = preferenceItems.map((item) => ({
      'Tercih Sırası': item.order,
      'Program Kodu': item.program.code,
      'Üniversite Adı': item.program.universityName,
      'Fakülte': item.program.faculty,
      'Program Adı': item.program.programName,
      'Şehir': item.program.city,
      'Puan Türü': item.program.scoreType,
      'Burs Durumu': item.program.scholarship,
      '2025 Taban Sıralaması': item.program.years[2025]?.minRank || 'Dolmadı',
      '2025 Taban Puanı': item.program.years[2025]?.minScore || '-',
      'Kategori': item.category,
      'Özel Koşullar': item.program.notes || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'YKS Tercih Listesi');
    XLSX.writeFile(workbook, 'YKS_2026_Tercih_Listem.xlsx');

    confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
  };

  // Copy ÖSYS Format String for ÖSYM AİS
  const copyOsymFormat = () => {
    const textList = preferenceItems
      .map((item) => `${item.order}. [${item.program.code}] ${item.program.universityName} - ${item.program.programName}`)
      .join('\n');

    navigator.clipboard.writeText(textList);
    setCopiedCodeText(true);
    setTimeout(() => setCopiedCodeText(false), 3000);

    confetti({ particleCount: 50, spread: 50, origin: { y: 0.8 } });
  };

  // Print Form / Download PDF view
  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                ÖSYM Maksimum 24 Tercih Hak
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Doluluk: <strong className="text-slate-900">{total}/24</strong>
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">YKS Tercih Bildirim Listeniz</h2>
            <p className="text-xs text-slate-500 mt-1">
              Tercihlerinizi yukarı/aşağı butonları ile sıralayabilir, risk dağılımını analiz edebilir ve ÖSYM formatında dışa aktarabilirsiniz.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={onOpenAiAdvisor}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4" /> AI Danışman Analizi
            </button>

            <button
              onClick={copyOsymFormat}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-sm"
              title="ÖSYM sistemine yapıştırmak için kopyala"
            >
              {copiedCodeText ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCodeText ? 'Kopyalandı!' : 'ÖSYM Kopyala'}</span>
            </button>

            <button
              onClick={exportToExcel}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-sm"
            >
              <Download className="w-4 h-4" /> Excel İndir
            </button>

            <button
              onClick={handlePrintPdf}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-3 py-2.5 rounded-xl transition-colors"
              title="Yazdır / PDF Sakla"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Risk Distribution Progress Bar */}
        {total > 0 && (
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Listenizin Risk Dağılımı:</span>
              <div className="flex items-center gap-3">
                <span className="text-emerald-700 font-bold">Güvenli: {safeCount}</span>
                <span className="text-amber-700 font-bold">Hedef: {targetCount}</span>
                <span className="text-rose-700 font-bold">Riskli: {reachCount}</span>
              </div>
            </div>

            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${(safeCount / total) * 100}%` }}
                className="bg-emerald-500 h-full transition-all"
                title={`Güvenli: ${safeCount}`}
              />
              <div
                style={{ width: `${(targetCount / total) * 100}%` }}
                className="bg-amber-400 h-full transition-all"
                title={`Hedef: ${targetCount}`}
              />
              <div
                style={{ width: `${(reachCount / total) * 100}%` }}
                className="bg-rose-500 h-full transition-all"
                title={`Riskli: ${reachCount}`}
              />
            </div>
          </div>
        )}
      </div>

      {/* Warnings & Alerts Box */}
      {warnings.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mb-6 space-y-2">
          <h4 className="font-bold text-amber-900 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" /> ÖSYM Kılavuz & Ölü Tercih Uyarıları ({warnings.length})
          </h4>
          <ul className="space-y-1 pl-6 list-disc text-xs text-amber-800">
            {warnings.map((w, idx) => (
              <li key={idx}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Empty State */}
      {preferenceItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <ListOrdered className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">Tercih Listeniz Henüz Boş</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            "Program Arama" sekmesinden ilgilendiğiniz üniversite bölümlerini seçerek listenize ekleyebilirsiniz (Maksimum 24 tercih).
          </p>
        </div>
      ) : (
        /* Preference Items List Table / Cards */
        <div className="space-y-3">
          {preferenceItems.map((item, index) => {
            const y25 = item.program.years[2025];
            const isFirst = index === 0;
            const isLast = index === preferenceItems.length - 1;

            let badgeColor = 'bg-slate-100 text-slate-700';
            if (item.category === 'Güvenli') badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
            if (item.category === 'Hedef') badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
            if (item.category === 'Riskli') badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Order Index & Details */}
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center justify-center shrink-0">
                    {item.order}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span className="bg-blue-100 text-blue-800 font-bold text-[10px] px-2 py-0.5 rounded">
                        {item.program.code}
                      </span>
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                        {item.program.scoreType}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
                        {item.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm leading-snug">
                      {item.program.programName}
                    </h3>

                    <p className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        {item.program.universityName}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {item.program.city}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Score & Rank Info */}
                <div className="bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100 shrink-0 text-right">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase">2025 Sıralaması</p>
                  <p className="text-sm font-extrabold text-blue-700">
                    {y25?.minRank ? y25.minRank.toLocaleString('tr-TR') : 'Dolmadı'}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Taban: {y25?.minScore || '-'} Puan
                  </p>
                </div>

                {/* Re-order & Remove Controls */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={isFirst}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Yukarı Taşı"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => moveDown(index)}
                    disabled={isLast}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Aşağı Taşı"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors ml-1"
                    title="Listeden Çıkar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
