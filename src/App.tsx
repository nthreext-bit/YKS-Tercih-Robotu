import React, { useState, useEffect, useMemo } from 'react';
import { Program, UserScores, PreferenceItem, PreferenceCategory } from './types';
import { INITIAL_PROGRAMS, enrichProgramComputedFields } from './data/osymGuideDataset';
import { Header } from './components/Header';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { ProgramSearch } from './components/ProgramSearch';
import { ScoreCalculator } from './components/ScoreCalculator';
import { PreferenceListBuilder } from './components/PreferenceListBuilder';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { GuideDataManager } from './components/GuideDataManager';
import { GeminiAdvisorView } from './components/GeminiAdvisorView';
import { ProgramDetailModal } from './components/ProgramDetailModal';
import { GithubPagesGuideModal } from './components/GithubPagesGuideModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('search');
  const [isGithubGuideOpen, setIsGithubGuideOpen] = useState<boolean>(false);
  
  // Programs Dataset
  const [programs, setPrograms] = useState<Program[]>(() => {
    return INITIAL_PROGRAMS.map(enrichProgramComputedFields);
  });

  // User Calculated Scores & Ranks
  const [userScores, setUserScores] = useState<UserScores>(() => {
    const saved = localStorage.getItem('yks_user_scores');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      tytScore: 365.20,
      sayScore: 518.50,
      eaScore: 432.10,
      sozScore: 395.00,
      dilScore: null,

      tytRank: 265000,
      sayRank: 5800,
      eaRank: 5200,
      sozRank: 22000,
      dilRank: null,

      obp: 88,
      isPreviousYearPlaced: false
    };
  });

  // Preference List State (max 24)
  const [preferenceItems, setPreferenceItems] = useState<PreferenceItem[]>(() => {
    const saved = localStorage.getItem('yks_preference_items');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    // Default 2 pre-added items for immediate demo feel
    return [
      {
        id: '108410012',
        order: 1,
        program: INITIAL_PROGRAMS[0],
        category: 'Güvenli',
        userRankGapPct: 15
      },
      {
        id: '105610023',
        order: 2,
        program: INITIAL_PROGRAMS[1],
        category: 'Güvenli',
        userRankGapPct: 10
      }
    ];
  });

  // Comparison Selected Program IDs
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set(['108410012', '105610023']));

  // Modal Detail Program
  const [modalProgram, setModalProgram] = useState<Program | null>(null);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('yks_user_scores', JSON.stringify(userScores));
  }, [userScores]);

  useEffect(() => {
    localStorage.setItem('yks_preference_items', JSON.stringify(preferenceItems));
  }, [preferenceItems]);

  // Try fetching latest program dataset from Express backend on mount
  useEffect(() => {
    fetch('/api/guide/programs')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setPrograms(data.data.map(enrichProgramComputedFields));
        }
      })
      .catch((err) => {
        console.log('Using local client dataset:', err);
      });
  }, []);

  // Preference IDs set for fast lookup
  const preferenceIds = useMemo(() => {
    return new Set(preferenceItems.map((i) => i.program.id));
  }, [preferenceItems]);

  // Helper to calculate safety category for a program based on user rank
  const calculateCategory = (p: Program): PreferenceCategory => {
    const rank25 = p.years[2025]?.minRank;
    const userRank = p.scoreType === 'SAY' ? userScores.sayRank :
                     p.scoreType === 'EA' ? userScores.eaRank :
                     p.scoreType === 'SÖZ' ? userScores.sozRank :
                     p.scoreType === 'DİL' ? userScores.dilRank : userScores.tytRank;

    if (!userRank || !rank25) return 'Hedef';

    const diffPct = ((rank25 - userRank) / rank25) * 100;
    if (diffPct >= 20) return 'Güvenli';
    if (diffPct >= -20) return 'Hedef';
    return 'Riskli';
  };

  // Add program to preference list
  const handleAddToPreferences = (program: Program) => {
    if (preferenceItems.length >= 24) {
      alert('ÖSYM kuralları gereği en fazla 24 tercih ekleyebilirsiniz!');
      return;
    }

    if (preferenceIds.has(program.id)) {
      alert('Bu program zaten tercih listenizde yer almaktadır.');
      return;
    }

    const newItem: PreferenceItem = {
      id: program.id,
      order: preferenceItems.length + 1,
      program,
      category: calculateCategory(program),
      userRankGapPct: 0
    };

    setPreferenceItems((prev) => [...prev, newItem]);
  };

  // Remove from preference list
  const handleRemovePreferenceItem = (id: string) => {
    setPreferenceItems((prev) => 
      prev.filter((i) => i.id !== id).map((item, idx) => ({ ...item, order: idx + 1 }))
    );
  };

  // Toggle side-by-side compare
  const handleToggleCompare = (program: Program) => {
    setCompareIds((prev) => {
      const next = new Set(prev);
      if (next.has(program.id)) {
        next.delete(program.id);
      } else {
        if (next.size >= 4) {
          alert('En fazla 4 programı aynı anda karşılaştırabilirsiniz.');
          return prev;
        }
        next.add(program.id);
      }
      return next;
    });
  };

  // Get compared program objects
  const comparedPrograms = useMemo(() => {
    return programs.filter((p) => compareIds.has(p.id));
  }, [programs, compareIds]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col antialiased">
      
      {/* Official Legal Notice */}
      <DisclaimerBanner />

      {/* Main Header with Tabs */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        preferenceCount={preferenceItems.length}
        compareCount={compareIds.size}
        guideCount={programs.length}
        onOpenGithubGuide={() => setIsGithubGuideOpen(true)}
      />

      {/* Tab Content Body */}
      <main className="flex-1">
        {activeTab === 'search' && (
          <ProgramSearch
            programs={programs}
            userScores={userScores}
            preferenceIds={preferenceIds}
            compareIds={compareIds}
            onAddToPreferences={handleAddToPreferences}
            onToggleCompare={handleToggleCompare}
            onOpenDetail={(p) => setModalProgram(p)}
          />
        )}

        {activeTab === 'calculator' && (
          <ScoreCalculator
            userScores={userScores}
            onApplyScores={(newScores) => setUserScores(newScores)}
          />
        )}

        {activeTab === 'preferences' && (
          <PreferenceListBuilder
            preferenceItems={preferenceItems}
            userScores={userScores}
            onRemoveItem={handleRemovePreferenceItem}
            onReorder={(newItems) => setPreferenceItems(newItems)}
            onClearList={() => setPreferenceItems([])}
            onOpenAiAdvisor={() => setActiveTab('ai')}
          />
        )}

        {activeTab === 'compare' && (
          <ComparisonMatrix
            programs={comparedPrograms}
            onRemoveFromCompare={(id) => setCompareIds((prev) => {
              const next = new Set(prev);
              next.delete(id);
              return next;
            })}
            onClearCompare={() => setCompareIds(new Set())}
            onAddToPreferences={handleAddToPreferences}
            preferenceIds={preferenceIds}
          />
        )}

        {activeTab === 'data' && (
          <GuideDataManager
            onGuideUpdated={(newPrograms) => setPrograms(newPrograms)}
            currentCount={programs.length}
          />
        )}

        {activeTab === 'ai' && (
          <GeminiAdvisorView
            preferenceItems={preferenceItems}
            userScores={userScores}
            onNavigateToSearch={() => setActiveTab('search')}
          />
        )}
      </main>

      {/* Detail Modal */}
      <ProgramDetailModal
        program={modalProgram}
        onClose={() => setModalProgram(null)}
        onAddToPreferences={handleAddToPreferences}
        isInPreferences={modalProgram ? preferenceIds.has(modalProgram.id) : false}
        userScores={userScores}
      />

      {/* GitHub Pages Guide Modal */}
      <GithubPagesGuideModal
        isOpen={isGithubGuideOpen}
        onClose={() => setIsGithubGuideOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-1">
          <p className="font-medium text-slate-300">
            YKS Tercih Robotu © 2026 — Türkiye Üniversite ve Bölüm Tercih Rehberi
          </p>
          <p className="text-[11px] text-slate-500">
            Veri kaynakları ÖSYM Yükseköğretim Programları ve Kontenjanları Kılavuzu resmi yayınlarından derlenmiştir.
          </p>
        </div>
      </footer>

    </div>
  );
}
