import React, { useState } from 'react';
import { CalculatorInput, UserScores } from '../types';
import { calculateYksScores, calcNet } from '../utils/calculator';
import { Calculator, Award, Sparkles, AlertCircle, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

interface ScoreCalculatorProps {
  userScores: UserScores;
  onApplyScores: (scores: UserScores) => void;
}

const INITIAL_INPUT: CalculatorInput = {
  obp: 85,
  isPreviousYearPlaced: false,
  tyt: {
    turkceD: 32, turkceY: 5,
    sosyalD: 15, sosyalY: 3,
    matD: 28, matY: 4,
    fenD: 14, fenY: 3,
  },
  ayt: {
    matD: 25, matY: 4,
    fizikD: 8, fizikY: 2,
    kimyaD: 9, kimyaY: 2,
    biyoD: 9, biyoY: 2,

    edebiyatD: 18, edebiyatY: 3,
    tarih1D: 7, tarih1Y: 2,
    cog1D: 5, cog1Y: 1,

    tarih2D: 8, tarih2Y: 2,
    cog2D: 8, cog2Y: 2,
    felsefeD: 9, felsefeY: 2,
    dinD: 5, dinY: 1,

    ydtD: 65, ydtY: 8,
  }
};

export const ScoreCalculator: React.FC<ScoreCalculatorProps> = ({
  onApplyScores
}) => {
  const [input, setInput] = useState<CalculatorInput>(INITIAL_INPUT);
  const [activeSubTab, setActiveSubTab] = useState<'TYT' | 'AYT_SAY' | 'AYT_EA' | 'AYT_SOZ' | 'YDT'>('TYT');
  const [appliedNotification, setAppliedNotification] = useState(false);

  const calculatedScores = calculateYksScores(input);

  // Helper to handle net change
  const updateNet = (
    section: 'tyt' | 'ayt',
    field: string,
    val: number
  ) => {
    setInput((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: Math.max(0, val)
      }
    }));
  };

  const resetCalculator = () => {
    setInput(INITIAL_INPUT);
  };

  const handleApply = () => {
    onApplyScores(calculatedScores);
    setAppliedNotification(true);
    setTimeout(() => setAppliedNotification(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Title */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-md mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> ÖSYM Standart Formülü
            </span>
          </div>
          <h2 className="text-xl font-bold">YKS Net ve Puan Hesaplayıcı</h2>
          <p className="text-xs text-slate-300 mt-1">
            TYT/AYT doğru-yanlış sayılarınızı ve OBP bilgilerinizi girerek yerleştirme puanlarınızı ve tahmini YKS sıralamanızı hesaplayın.
          </p>
        </div>

        <button
          onClick={resetCalculator}
          className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-3.5 py-2 rounded-xl transition-colors shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Değerleri Sıfırla
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Inputs Column (2 Cols wide on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* OBP & Kırık OBP Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" /> Ortaöğretim Başarı Puanı (OBP) ve Kırık OBP
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Lise Diploma Notu (50 – 100): <span className="text-blue-700 font-bold">{input.obp}</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="0.5"
                  value={input.obp}
                  onChange={(e) => setInput({ ...input, obp: parseFloat(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <p className="text-[10px] text-slate-500 mt-0.5">
                  OBP Katkısı: <strong>{(input.obp * 5 * (input.isPreviousYearPlaced ? 0.06 : 0.12)).toFixed(2)} puan</strong>
                </p>
              </div>

              <div className="bg-amber-50/70 border border-amber-200/80 p-3 rounded-xl">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={input.isPreviousYearPlaced}
                    onChange={(e) => setInput({ ...input, isPreviousYearPlaced: e.target.checked })}
                    className="mt-0.5 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-amber-900 block">Kırık OBP Durumu</span>
                    <span className="text-[11px] text-amber-700 leading-snug block">
                      Geçen yıl bir yükseköğretim programına yerleştiyseniz OBP katkısı %50 oranında düşer.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Subtabs for Net Input Sections */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar bg-slate-50 p-1.5 gap-1">
              {[
                { id: 'TYT', label: 'TYT Testleri' },
                { id: 'AYT_SAY', label: 'AYT Sayısal (SAY)' },
                { id: 'AYT_EA', label: 'AYT Eşit Ağırlık (EA)' },
                { id: 'AYT_SOZ', label: 'AYT Sözel (SÖZ)' },
                { id: 'YDT', label: 'YDT (Dil)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeSubTab === tab.id
                      ? 'bg-white text-blue-700 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-5">
              
              {/* TYT Section */}
              {activeSubTab === 'TYT' && (
                <div className="space-y-4">
                  <NetRow
                    label="Türkçe (40 Soru)"
                    correct={input.tyt.turkceD}
                    incorrect={input.tyt.turkceY}
                    max={40}
                    onCorrectChange={(v) => updateNet('tyt', 'turkceD', v)}
                    onIncorrectChange={(v) => updateNet('tyt', 'turkceY', v)}
                  />
                  <NetRow
                    label="Sosyal Bilimler (20 Soru)"
                    correct={input.tyt.sosyalD}
                    incorrect={input.tyt.sosyalY}
                    max={20}
                    onCorrectChange={(v) => updateNet('tyt', 'sosyalD', v)}
                    onIncorrectChange={(v) => updateNet('tyt', 'sosyalY', v)}
                  />
                  <NetRow
                    label="Temel Matematik (40 Soru)"
                    correct={input.tyt.matD}
                    incorrect={input.tyt.matY}
                    max={40}
                    onCorrectChange={(v) => updateNet('tyt', 'matD', v)}
                    onIncorrectChange={(v) => updateNet('tyt', 'matY', v)}
                  />
                  <NetRow
                    label="Fen Bilimleri (20 Soru)"
                    correct={input.tyt.fenD}
                    incorrect={input.tyt.fenY}
                    max={20}
                    onCorrectChange={(v) => updateNet('tyt', 'fenD', v)}
                    onIncorrectChange={(v) => updateNet('tyt', 'fenY', v)}
                  />
                </div>
              )}

              {/* AYT Sayısal Section */}
              {activeSubTab === 'AYT_SAY' && (
                <div className="space-y-4">
                  <NetRow
                    label="AYT Matematik (40 Soru)"
                    correct={input.ayt.matD}
                    incorrect={input.ayt.matY}
                    max={40}
                    onCorrectChange={(v) => updateNet('ayt', 'matD', v)}
                    onIncorrectChange={(v) => updateNet('ayt', 'matY', v)}
                  />
                  <NetRow
                    label="Fizik (14 Soru)"
                    correct={input.ayt.fizikD}
                    incorrect={input.ayt.fizikY}
                    max={14}
                    onCorrectChange={(v) => updateNet('ayt', 'fizikD', v)}
                    onIncorrectChange={(v) => updateNet('ayt', 'fizikY', v)}
                  />
                  <NetRow
                    label="Kimya (13 Soru)"
                    correct={input.ayt.kimyaD}
                    incorrect={input.ayt.kimyaY}
                    max={13}
                    onCorrectChange={(v) => updateNet('ayt', 'kimyaD', v)}
                    onIncorrectChange={(v) => updateNet('ayt', 'kimyaY', v)}
                  />
                  <NetRow
                    label="Biyoloji (13 Soru)"
                    correct={input.ayt.biyoD}
                    incorrect={input.ayt.biyoY}
                    max={13}
                    onCorrectChange={(v) => updateNet('ayt', 'biyoD', v)}
                    onIncorrectChange={(v) => updateNet('ayt', 'biyoY', v)}
                  />
                </div>
              )}

              {/* AYT Eşit Ağırlık Section */}
              {activeSubTab === 'AYT_EA' && (
                <div className="space-y-4">
                  <NetRow
                    label="AYT Matematik (40 Soru)"
                    correct={input.ayt.matD}
                    incorrect={input.ayt.matY}
                    max={40}
                    onCorrectChange={(v) => updateNet('ayt', 'matD', v)}
                    onIncorrectChange={(v) => updateNet('ayt', 'matY', v)}
                  />
                  <NetRow
                    label="Türk Dili ve Edebiyatı (24 Soru)"
                    correct={input.ayt.edebiyatD}
                    incorrect={input.ayt.edebiyatY}
                    max={24}
                    onCorrectChange={(v) => updateNet('ayt', 'edebiyatD', v)}
                    onIncorrectChange={(v) => updateNet('ayt', 'edebiyatY', v)}
                  />
                  <NetRow
                    label="Tarih-1 (10 Soru)"
                    correct={input.ayt.tarih1D}
                    incorrect={input.ayt.tarih1Y}
                    max={10}
                    onCorrectChange={(v) => updateNet('ayt', 'tarih1D', v)}
                    onIncorrectChange={(v) => updateNet('ayt', 'tarih1Y', v)}
                  />
                  <NetRow
                    label="Coğrafya-1 (6 Soru)"
                    correct={input.ayt.cog1D}
                    incorrect={input.ayt.cog1Y}
                    max={6}
                    onCorrectChange={(v) => updateNet('ayt', 'cog1D', v)}
                    onIncorrectChange={(v) => updateNet('ayt', 'cog1Y', v)}
                  />
                </div>
              )}

              {/* AYT Sözel Section */}
              {activeSubTab === 'AYT_SOZ' && (
                <div className="space-y-4">
                  <NetRow
                    label="Türk Dili ve Edebiyatı (24 Soru)"
                    correct={input.ayt.edebiyatD}
                    incorrect={input.ayt.edebiyatY}
                    max={24}
                    onCorrectChange={(v) => updateNet('ayt', 'edebiyatD', v)}
                    onIncorrectChange={(v) => updateNet('ayt', 'edebiyatY', v)}
                  />
                  <NetRow
                    label="Tarih-1 (10 Soru)"
                    correct={input.ayt.tarih1D}
                    incorrect={input.ayt.tarih1Y}
                    max={10}
                    onCorrectChange={(v) => updateNet('ayt', 'tarih1D', v)}
                    onIncorrectChange={(v) => updateNet('ayt', 'tarih1Y', v)}
                  />
                  <NetRow
                    label="Tarih-2 (11 Soru)"
                    correct={input.ayt.tarih2D}
                    incorrect={input.ayt.tarih2Y}
                    max={11}
                    onCorrectChange={(v) => updateNet('ayt', 'tarih2D', v)}
                    onIncorrectChange={(v) => updateNet('ayt', 'tarih2Y', v)}
                  />
                  <NetRow
                    label="Coğrafya-2 (11 Soru)"
                    correct={input.ayt.cog2D}
                    incorrect={input.ayt.cog2Y}
                    max={11}
                    onCorrectChange={(v) => updateNet('ayt', 'cog2D', v)}
                    onIncorrectChange={(v) => updateNet('ayt', 'cog2Y', v)}
                  />
                  <NetRow
                    label="Felsefe Grubu (12 Soru)"
                    correct={input.ayt.felsefeD}
                    incorrect={input.ayt.felsefeY}
                    max={12}
                    onCorrectChange={(v) => updateNet('ayt', 'felsefeD', v)}
                    onIncorrectChange={(v) => updateNet('ayt', 'felsefeY', v)}
                  />
                  <NetRow
                    label="Din Kültürü (6 Soru)"
                    correct={input.ayt.dinD}
                    incorrect={input.ayt.dinY}
                    max={6}
                    onCorrectChange={(v) => updateNet('ayt', 'dinD', v)}
                    onIncorrectChange={(v) => updateNet('ayt', 'dinY', v)}
                  />
                </div>
              )}

              {/* YDT Section */}
              {activeSubTab === 'YDT' && (
                <div className="space-y-4">
                  <NetRow
                    label="Yabancı Dil Testi / YDT (80 Soru)"
                    correct={input.ayt.ydtD}
                    incorrect={input.ayt.ydtY}
                    max={80}
                    onCorrectChange={(v) => updateNet('ayt', 'ydtD', v)}
                    onIncorrectChange={(v) => updateNet('ayt', 'ydtY', v)}
                  />
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Right Output Results Column */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-5 space-y-4 sticky top-24">
            <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-blue-600" /> Hesaplanan YKS Sonuçları
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                Canlı Hesaplama
              </span>
            </h3>

            {/* Score Cards List */}
            <div className="space-y-2.5">
              
              <ScoreBadge
                title="SAYISAL (SAY)"
                score={calculatedScores.sayScore}
                rank={calculatedScores.sayRank}
                highlight
              />

              <ScoreBadge
                title="EŞİT AĞIRLIK (EA)"
                score={calculatedScores.eaScore}
                rank={calculatedScores.eaRank}
              />

              <ScoreBadge
                title="SÖZEL (SÖZ)"
                score={calculatedScores.sozScore}
                rank={calculatedScores.sozRank}
              />

              <ScoreBadge
                title="DİL (YDT)"
                score={calculatedScores.dilScore}
                rank={calculatedScores.dilRank}
              />

              <ScoreBadge
                title="TYT (2 Yıllık Önlisans)"
                score={calculatedScores.tytScore}
                rank={calculatedScores.tytRank}
              />

            </div>

            {/* Apply Button */}
            <div className="pt-2">
              <button
                onClick={handleApply}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                <span>Bu Sıralamaları Tercih Robotuna Aktar</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {appliedNotification && (
                <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Puanlar arama filtrelerinize ve tercih değerlendirmesine başarıyla aktarıldı!
                </div>
              )}
            </div>

            <p className="text-[10px] text-slate-400 leading-normal pt-1">
              * Tahmini sıralamalar ÖSYM son yılların yığılma ve standart sapma eğrileri baz alınarak hesaplanmıştır.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

interface NetRowProps {
  label: string;
  correct: number;
  incorrect: number;
  max: number;
  onCorrectChange: (val: number) => void;
  onIncorrectChange: (val: number) => void;
}

const NetRow: React.FC<NetRowProps> = ({
  label,
  correct,
  incorrect,
  max,
  onCorrectChange,
  onIncorrectChange
}) => {
  const net = calcNet(correct, incorrect);

  return (
    <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex-1">
        <p className="font-semibold text-slate-900 text-xs">{label}</p>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Hesaplanan Net: <strong className="text-blue-700">{net}</strong>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div>
          <span className="text-[10px] text-emerald-700 font-bold block mb-0.5">Doğru</span>
          <input
            type="number"
            min="0"
            max={max}
            value={correct}
            onChange={(e) => onCorrectChange(parseInt(e.target.value) || 0)}
            className="w-16 p-1.5 rounded-lg border border-slate-200 text-xs text-center font-bold outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <span className="text-[10px] text-rose-700 font-bold block mb-0.5">Yanlış</span>
          <input
            type="number"
            min="0"
            max={max}
            value={incorrect}
            onChange={(e) => onIncorrectChange(parseInt(e.target.value) || 0)}
            className="w-16 p-1.5 rounded-lg border border-slate-200 text-xs text-center font-bold outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

interface ScoreBadgeProps {
  title: string;
  score: number | null;
  rank: number | null;
  highlight?: boolean;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ title, score, rank, highlight }) => {
  return (
    <div className={`p-3 rounded-xl border flex items-center justify-between ${
      highlight
        ? 'bg-blue-50/80 border-blue-200 text-blue-950'
        : 'bg-slate-50 border-slate-200/80 text-slate-900'
    }`}>
      <div>
        <p className="text-[10px] font-extrabold text-slate-500 uppercase">{title}</p>
        <p className="text-sm font-black mt-0.5">
          {score ? score.toFixed(2) : '-'} <span className="text-[10px] font-normal text-slate-500">Puan</span>
        </p>
      </div>

      <div className="text-right">
        <p className="text-[10px] font-medium text-slate-400">Tahmini Sıra</p>
        <p className="text-sm font-extrabold text-blue-700">
          {rank ? `${rank.toLocaleString('tr-TR')}.` : '-'}
        </p>
      </div>
    </div>
  );
};
