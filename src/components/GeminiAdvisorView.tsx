import React, { useState } from 'react';
import { PreferenceItem, UserScores, GeminiAdvisorResponse } from '../types';
import { Sparkles, Bot, AlertTriangle, ShieldCheck, CheckCircle2, ArrowRight, BookOpen, Lightbulb, RefreshCw } from 'lucide-react';

interface GeminiAdvisorViewProps {
  preferenceItems: PreferenceItem[];
  userScores: UserScores;
  onNavigateToSearch: () => void;
}

export const GeminiAdvisorView: React.FC<GeminiAdvisorViewProps> = ({
  preferenceItems,
  userScores,
  onNavigateToSearch
}) => {
  const [loading, setLoading] = useState(false);
  const [advisorResult, setAdvisorResult] = useState<GeminiAdvisorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [careerGoals, setCareerGoals] = useState('');
  const [targetCityPreference, setTargetCityPreference] = useState('');

  const handleGenerateAdvice = async () => {
    if (preferenceItems.length === 0) {
      alert('Lütfen önce "Tercih Listem" sekmesinden en az 1 tercih ekleyiniz.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        userScores,
        preferenceList: preferenceItems.map((p) => ({
          order: p.order,
          code: p.program.code,
          universityName: p.program.universityName,
          programName: p.program.programName,
          scoreType: p.program.scoreType,
          minRank2025: p.program.years[2025]?.minRank || 0,
          category: p.category
        })),
        careerGoals,
        targetCityPreference
      };

      const res = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'AI analizi oluşturulamadı.');
      }

      setAdvisorResult(data.data);
    } catch (err: any) {
      setError(err.message || 'Sunucu hatası meydana geldi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-md mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Gemini AI Tercih Danışmanı & Eğitim Koçu</h2>
            <p className="text-xs text-slate-300">
              Tercih listenizdeki risk oranını, sıralama uyumunu ve özel koşulları yapay zeka ile analiz edin.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Options Form Column */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 h-fit">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Bot className="w-4 h-4 text-blue-600" /> Analiz Parametreleri
          </h3>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
            <p className="font-semibold text-slate-800">
              Listenizdeki Tercih Sayısı: <strong className="text-blue-700">{preferenceItems.length} / 24</strong>
            </p>
            <p className="text-slate-500">
              Hesaplanan Sıralama: {userScores.sayRank ? `SAY: ${userScores.sayRank.toLocaleString('tr-TR')}` : 'Girilmedi'}
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Kariyer Hedefleriniz veya İlgi Alanlarınız (Opsiyonel)
            </label>
            <textarea
              value={careerGoals}
              onChange={(e) => setCareerGoals(e.target.value)}
              placeholder="Örn: Yazılım geliştirme, akademik kariyer, tıp uzmanlığı, kamuda çalışma..."
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none h-20"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Şehir / Bölge Tercihiniz (Opsiyonel)
            </label>
            <input
              type="text"
              value={targetCityPreference}
              onChange={(e) => setTargetCityPreference(e.target.value)}
              placeholder="Örn: Sadece İstanbul/Ankara, Ege bölgesi..."
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
            />
          </div>

          <button
            onClick={handleGenerateAdvice}
            disabled={loading || preferenceItems.length === 0}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                <span>Tercihleriniz Analiz Ediliyor...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI Tercih Raporu Oluştur</span>
              </>
            )}
          </button>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right Advice Report Column */}
        <div className="lg:col-span-2">
          {!advisorResult && !loading && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
              <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800 text-base">Yapay Zeka Tercih Raporunuz Bekleniyor</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Sol taraftaki butonla tercih listenizin güvenlik oranlarını, ölü tercih ihtimallerini ve kariyer tavsiyelerini 1-2 saniye içinde alabilirsiniz.
              </p>
            </div>
          )}

          {advisorResult && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              
              {/* Summary Box */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                <h3 className="font-bold text-blue-900 text-sm flex items-center gap-2 mb-1">
                  <Bot className="w-4 h-4 text-blue-600" /> Genel Tercih Listesi Strateji Değerlendirmesi
                </h3>
                <p className="text-xs text-blue-950 leading-relaxed font-medium">
                  {advisorResult.summary}
                </p>
              </div>

              {/* Risk Assessment */}
              {advisorResult.riskAssessment && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Risk ve Denge Analizi</h4>
                  <p className="text-xs font-semibold text-indigo-700">
                    {advisorResult.riskAssessment.balanceEvaluation}
                  </p>
                </div>
              )}

              {/* Strategic Recommendations */}
              {advisorResult.recommendations?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" /> Stratejik Tavsiyeler
                  </h4>
                  <ul className="space-y-1.5 pl-5 list-disc text-xs text-slate-700">
                    {advisorResult.recommendations.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Critical Warnings */}
              {advisorResult.criticalWarnings?.length > 0 && (
                <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl space-y-2">
                  <h4 className="font-bold text-rose-900 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" /> Kritik Uyarılar
                  </h4>
                  <ul className="space-y-1 pl-5 list-disc text-xs text-rose-800">
                    {advisorResult.criticalWarnings.map((warn, idx) => (
                      <li key={idx}>{warn}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Alternative Suggestions */}
              {advisorResult.alternativeSuggestions?.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-600" /> Alternatif Bölüm Önerileri
                  </h4>
                  <ul className="space-y-1.5 pl-5 list-disc text-xs text-slate-700">
                    {advisorResult.alternativeSuggestions.map((alt, idx) => (
                      <li key={idx}>{alt}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          )}
        </div>

      </div>

    </div>
  );
};
