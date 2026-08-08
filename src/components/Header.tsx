import React from 'react';
import { 
  Search, 
  Calculator, 
  ListOrdered, 
  GitCompare, 
  Database, 
  Sparkles, 
  GraduationCap,
  Layers,
  Github
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  preferenceCount: number;
  compareCount: number;
  guideCount: number;
  onOpenGithubGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  preferenceCount,
  compareCount,
  guideCount,
  onOpenGithubGuide
}) => {
  const tabs = [
    { id: 'search', label: 'Program Arama', icon: Search, badge: guideCount > 0 ? `${guideCount}` : null },
    { id: 'calculator', label: 'Puan & Net Hesapla', icon: Calculator },
    { id: 'preferences', label: 'Tercih Listem', icon: ListOrdered, badge: preferenceCount > 0 ? `${preferenceCount}/24` : null, highlight: true },
    { id: 'compare', label: 'Karşılaştır', icon: GitCompare, badge: compareCount > 0 ? `${compareCount}` : null },
    { id: 'data', label: 'Kılavuz ETL', icon: Database },
    { id: 'ai', label: 'AI Tercih Koçu', icon: Sparkles, aiBadge: true },
  ];

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('search')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white font-sans">
                  YKS Tercih Robotu
                </h1>
                <span className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  <Layers className="w-3 h-3" /> 2024–2026 Kılavuz
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                ÖSYM Üniversite Kontenjan & Taban Sıralama Rehberi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* GitHub Pages Yayın Rehberi Button */}
            <button
              onClick={onOpenGithubGuide}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              title="GitHub Pages Yayın Rehberi"
            >
              <Github className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">GitHub Pages'de Yayınla</span>
            </button>

            {/* Quick Preference List Launcher Button */}
            <button
              onClick={() => setActiveTab('preferences')}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-all border border-indigo-400/30"
            >
              <ListOrdered className="w-4 h-4" />
              <span>Tercih Listem</span>
              <span className="bg-white/20 text-white px-1.5 py-0.5 rounded text-[11px]">
                {preferenceCount}/24
              </span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-1 pb-2 border-t border-slate-800/80">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all relative ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${tab.aiBadge ? 'text-amber-400' : ''}`} />
                <span>{tab.label}</span>

                {tab.badge && (
                  <span
                    className={`ml-1 text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-white text-blue-700'
                        : 'bg-slate-700 text-slate-200'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}

                {tab.aiBadge && (
                  <span className="ml-0.5 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                    GEMINI
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
