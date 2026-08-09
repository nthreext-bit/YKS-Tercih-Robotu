import React, { useState, useMemo, useEffect } from 'react';
import { Program, FilterState, ScoreType, UniversityType, ScholarshipType, EducationType, UserScores } from '../types';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  MapPin, 
  Building, 
  TrendingUp, 
  Plus, 
  Check, 
  Eye, 
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  ShieldAlert,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  BookOpen,
  Hash,
  Award,
  GraduationCap,
  Share2,
  Copy,
  Link,
  CheckCircle2,
  AlertCircle,
  Globe
} from 'lucide-react';

interface ProgramSearchProps {
  programs: Program[];
  userScores: UserScores;
  preferenceIds: Set<string>;
  compareIds: Set<string>;
  onAddToPreferences: (program: Program) => void;
  onToggleCompare: (program: Program) => void;
  onOpenDetail: (program: Program) => void;
}

const CITIES = [
  'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Eskişehir', 
  'Adana', 'Trabzon', 'Konya', 'Kayseri', 'Samsun', 'Gaziantep', 'Kocaeli', 'Erzurum', 'Muğla', 'Sakarya'
];

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  universityQuery: '',
  programQuery: '',
  codeQuery: '',
  scoreType: 'HEPSİ',
  selectedCities: [],
  degreeType: 'HEPSİ',
  universityTypes: [],
  scholarships: [],
  educationTypes: [],
  minRankMin: '',
  minRankMax: '',
  minScoreMin: '',
  minScoreMax: '',
  userTargetRank: null,
  userTargetScore: null,
  selectedYears: [2024, 2025, 2026],
  onlyFull: true,
  onlyActive2026: true,
  sortBy: 'rankAsc'
};

export const ProgramSearch: React.FC<ProgramSearchProps> = ({
  programs,
  userScores,
  preferenceIds,
  compareIds,
  onAddToPreferences,
  onToggleCompare,
  onOpenDetail
}) => {
  // Read initial filters from URL query parameters (e.g. ?min=200&max=50000&scoreType=SAY)
  const [filters, setFilters] = useState<FilterState>(() => {
    const params = new URLSearchParams(window.location.search);
    const minParam = params.get('min');
    const maxParam = params.get('max');
    const scoreTypeParam = params.get('scoreType') as ScoreType;
    const uniParam = params.get('uni');
    const progParam = params.get('prog');
    const codeParam = params.get('code');
    const cityParam = params.get('city');
    const degreeParam = params.get('degree');

    return {
      ...INITIAL_FILTERS,
      minRankMin: minParam ? (isNaN(Number(minParam)) ? '' : Number(minParam)) : '',
      minRankMax: maxParam && maxParam !== 'inf' ? (isNaN(Number(maxParam)) ? '' : Number(maxParam)) : '',
      scoreType: ['SAY', 'EA', 'SÖZ', 'DİL', 'TYT'].includes(scoreTypeParam) ? scoreTypeParam : 'HEPSİ',
      universityQuery: uniParam || '',
      programQuery: progParam || '',
      codeQuery: codeParam || '',
      selectedCities: cityParam ? cityParam.split(',') : [],
      degreeType: degreeParam === 'Lisans' || degreeParam === 'Ön Lisans' ? degreeParam : 'HEPSİ'
    };
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [onlyUserMatches, setOnlyUserMatches] = useState(false);
  const [copiedShareUrl, setCopiedShareUrl] = useState(false);

  // Default list state: empty until user triggers search or passes URL parameters
  const [hasSearched, setHasSearched] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.toString().length > 0;
  });

  // Synchronize state changes to URL parameters for GitHub Pages & link sharing
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.minRankMin !== '') params.set('min', String(filters.minRankMin));
    if (filters.minRankMax !== '') params.set('max', String(filters.minRankMax));
    if (filters.scoreType !== 'HEPSİ') params.set('scoreType', filters.scoreType);
    if (filters.universityQuery) params.set('uni', filters.universityQuery);
    if (filters.programQuery) params.set('prog', filters.programQuery);
    if (filters.codeQuery) params.set('code', filters.codeQuery);
    if (filters.selectedCities.length > 0) params.set('city', filters.selectedCities.join(','));
    if (filters.degreeType !== 'HEPSİ') params.set('degree', filters.degreeType);

    const queryString = params.toString();
    const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, [filters]);

  const handleCopyShareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShareUrl(true);
    setTimeout(() => setCopiedShareUrl(false), 2500);
  };

  // Active User Rank depending on selected scoreType
  const activeUserRank = useMemo(() => {
    if (filters.scoreType === 'SAY') return userScores.sayRank;
    if (filters.scoreType === 'EA') return userScores.eaRank;
    if (filters.scoreType === 'SÖZ') return userScores.sozRank;
    if (filters.scoreType === 'DİL') return userScores.dilRank;
    if (filters.scoreType === 'TYT') return userScores.tytRank;
    return userScores.sayRank || userScores.eaRank || userScores.tytRank;
  }, [filters.scoreType, userScores]);

  // Main Filtering logic matching all ÖSYM criteria & 2026 active guide rules
  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      // 0. 2026 ÖSYM Kılavuzunda Yer Alma / Aktif Öğrenci Alımı Kontrolü
      if (filters.onlyActive2026) {
        const y26 = p.years[2026];
        const isClosed = !y26 || y26.quota === 0 || y26.isClosed === true || p.notes?.includes('Kapatıldı') || p.notes?.includes('Öğrenci Alınmayacak');
        if (isClosed) {
          return false;
        }
      }

      // Check if it's an Open Education or Remote Education program
      const isAofOrRemote = p.educationType === 'Açıköğretim' || 
                            p.educationType === 'Uzaktan Eğitim' ||
                            p.faculty.includes('Açıköğretim') || 
                            p.faculty.includes('AUZEF') || 
                            p.faculty.includes('AÖF') ||
                            p.programName.includes('Açıköğretim') ||
                            p.programName.includes('Uzaktan');

      // 1. Genel Arama (Search Bar)
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase('tr-TR');
        const matchName = p.programName.toLowerCase('tr-TR').includes(q);
        const matchUni = p.universityName.toLowerCase('tr-TR').includes(q);
        const matchCode = p.code.includes(q);
        const matchCity = p.city.toLowerCase('tr-TR').includes(q);
        const matchFaculty = p.faculty.toLowerCase('tr-TR').includes(q);

        if (!matchName && !matchUni && !matchCode && !matchCity && !matchFaculty) {
          return false;
        }
      }

      // 2. Puan Türü (Score Type)
      if (filters.scoreType !== 'HEPSİ' && p.scoreType !== filters.scoreType) {
        return false;
      }

      // 3. Üniversite Filtresi
      if (filters.universityQuery.trim()) {
        const uq = filters.universityQuery.toLowerCase('tr-TR');
        if (!p.universityName.toLowerCase('tr-TR').includes(uq)) {
          return false;
        }
      }

      // 4. Program Filtresi
      if (filters.programQuery.trim()) {
        const pq = filters.programQuery.toLowerCase('tr-TR');
        if (!p.programName.toLowerCase('tr-TR').includes(pq)) {
          return false;
        }
      }

      // 5. Program Kodu Filtresi
      if (filters.codeQuery.trim()) {
        const cq = filters.codeQuery.trim();
        if (!p.code.includes(cq)) {
          return false;
        }
      }

      // 6. Şehir Filtresi (Açıköğretim ve Uzaktan Eğitim programları tüm Türkiye'den tercih edilebilir, şehir kısıtına takılmaz)
      if (filters.selectedCities.length > 0 && !filters.selectedCities.includes(p.city) && !isAofOrRemote) {
        return false;
      }

      // 7. Ön Lisans / Lisans Filtresi
      if (filters.degreeType === 'Lisans' && p.durationYears < 4) {
        return false;
      }
      if (filters.degreeType === 'Ön Lisans' && p.durationYears !== 2) {
        return false;
      }

      // 8. Üniversite Türü Filtresi
      if (filters.universityTypes.length > 0 && !filters.universityTypes.includes(p.universityType)) {
        return false;
      }

      // 9. Ücret / Burs Filtresi
      if (filters.scholarships.length > 0 && !filters.scholarships.includes(p.scholarship)) {
        return false;
      }

      // 10. Öğretim Türü Filtresi
      if (filters.educationTypes.length > 0) {
        const matchesEdu = filters.educationTypes.some((selectedEdu) => {
          if (selectedEdu === 'Açıköğretim') {
            return p.educationType === 'Açıköğretim' || p.faculty.includes('Açıköğretim') || p.faculty.includes('AUZEF') || p.faculty.includes('AÖF') || p.programName.includes('Açıköğretim');
          }
          if (selectedEdu === 'Uzaktan Eğitim') {
            return p.educationType === 'Uzaktan Eğitim' || p.educationType === 'Uzaktan Öğretim' || p.programName.includes('Uzaktan') || p.notes?.includes('Uzaktan');
          }
          if (selectedEdu === 'Örgün') {
            return p.educationType === 'Örgün' && !isAofOrRemote;
          }
          if (selectedEdu === 'İkinci Öğretim') {
            return p.educationType === 'İkinci Öğretim' || p.programName.includes('İkinci Öğretim') || p.programName.includes('(İÖ)');
          }
          return p.educationType === selectedEdu;
        });
        if (!matchesEdu) return false;
      }

      // 11. En Az & En Çok Başarı Sırası Filtresi
      const rank25 = p.years[2025]?.minRank || 0;
      if (filters.minRankMin !== '' && Number(filters.minRankMin) > 0) {
        if (rank25 < Number(filters.minRankMin)) return false;
      }
      if (filters.minRankMax !== '' && Number(filters.minRankMax) > 0) {
        if (rank25 > Number(filters.minRankMax)) return false;
      }

      // 12. Sadece Sıralamama Uygun Programlar
      if (onlyUserMatches && activeUserRank && rank25 > 0) {
        const minMargin = activeUserRank * 0.5;
        const maxMargin = activeUserRank * 2.0;
        if (rank25 < minMargin || rank25 > maxMargin) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      const rankA = a.years[2025]?.minRank || 9999999;
      const rankB = b.years[2025]?.minRank || 9999999;
      const scoreA = a.years[2025]?.minScore || 0;
      const scoreB = b.years[2025]?.minScore || 0;

      if (filters.sortBy === 'rankAsc') return rankA - rankB;
      if (filters.sortBy === 'rankDesc') return rankB - rankA;
      if (filters.sortBy === 'scoreDesc') return scoreB - scoreA;
      if (filters.sortBy === 'scoreAsc') return scoreA - scoreB;
      if (filters.sortBy === 'nameAsc') return a.programName.localeCompare(b.programName, 'tr-TR');
      if (filters.sortBy === 'nameDesc') return b.programName.localeCompare(a.programName, 'tr-TR');
      if (filters.sortBy === 'cityAsc') return a.city.localeCompare(b.city, 'tr-TR');
      if (filters.sortBy === 'cityDesc') return b.city.localeCompare(a.city, 'tr-TR');
      if (filters.sortBy === 'uniAsc') return a.universityName.localeCompare(b.universityName, 'tr-TR');
      if (filters.sortBy === 'uniDesc') return b.universityName.localeCompare(a.universityName, 'tr-TR');
      return 0;
    });
  }, [programs, filters, onlyUserMatches, activeUserRank]);

  const handleSortToggle = (field: 'rank' | 'score' | 'city' | 'name' | 'uni') => {
    setFilters((prev) => {
      let nextSort = prev.sortBy;
      if (field === 'rank') {
        nextSort = prev.sortBy === 'rankAsc' ? 'rankDesc' : 'rankAsc';
      } else if (field === 'score') {
        nextSort = prev.sortBy === 'scoreDesc' ? 'scoreAsc' : 'scoreDesc';
      } else if (field === 'city') {
        nextSort = prev.sortBy === 'cityAsc' ? 'cityDesc' : 'cityAsc';
      } else if (field === 'name') {
        nextSort = prev.sortBy === 'nameAsc' ? 'nameDesc' : 'nameAsc';
      } else if (field === 'uni') {
        nextSort = prev.sortBy === 'uniAsc' ? 'uniDesc' : 'uniAsc';
      }
      return { ...prev, sortBy: nextSort };
    });
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setOnlyUserMatches(false);
    setHasSearched(false);
  };

  const toggleCity = (city: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedCities: prev.selectedCities.includes(city)
        ? prev.selectedCities.filter((c) => c !== city)
        : [...prev.selectedCities, city]
    }));
  };

  const toggleUniType = (type: UniversityType) => {
    setFilters((prev) => ({
      ...prev,
      universityTypes: prev.universityTypes.includes(type)
        ? prev.universityTypes.filter((t) => t !== type)
        : [...prev.universityTypes, type]
    }));
  };

  const toggleScholarship = (sch: ScholarshipType) => {
    setFilters((prev) => ({
      ...prev,
      scholarships: prev.scholarships.includes(sch)
        ? prev.scholarships.filter((s) => s !== sch)
        : [...prev.scholarships, sch]
    }));
  };

  const toggleEduType = (edu: EducationType) => {
    setFilters((prev) => ({
      ...prev,
      educationTypes: prev.educationTypes.includes(edu)
        ? prev.educationTypes.filter((e) => e !== edu)
        : [...prev.educationTypes, edu]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Search & Filter Share Controls Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Main Search Bar */}
          <div className="relative flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => {
                  setFilters({ ...filters, searchQuery: e.target.value });
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setHasSearched(true);
                }}
                placeholder="Genel Arama (Üniversite, Bölüm Adı veya Program Kodu)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all"
              />
            </div>
            <button
              onClick={() => setHasSearched(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
            >
              <Search className="w-4 h-4" /> Ara
            </button>
          </div>

          {/* Quick Score Type Selector Pills */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {(['HEPSİ', 'SAY', 'EA', 'SÖZ', 'DİL', 'TYT'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilters({ ...filters, scoreType: type })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filters.scoreType === type
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Share Filtered Link Button */}
          <button
            onClick={handleCopyShareUrl}
            className="flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0"
            title="Filtreli Bağlantıyı Kopyala"
          >
            {copiedShareUrl ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" /> Bağlantı Kopyalandı
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" /> Filtre Bağlantısını Paylaş
              </>
            )}
          </button>

          {/* Mobile Filter Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-xl text-xs font-semibold"
            >
              <Filter className="w-4 h-4" /> Filtreler
            </button>
          </div>

        </div>

        {/* User Rank Match Toggle Banner */}
        {activeUserRank && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>
                Aktif Hesaplanmış / Girilmiş Sıralamanız: <strong className="text-blue-700">{activeUserRank.toLocaleString('tr-TR')}. sıra</strong> ({filters.scoreType})
              </span>
            </div>

            <button
              onClick={() => setOnlyUserMatches(!onlyUserMatches)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all ${
                onlyUserMatches
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${onlyUserMatches ? 'opacity-100' : 'opacity-0'}`} />
              Sadece Sıralamama Uygun Programlar
            </button>
          </div>
        )}
      </div>

      {/* Main Grid Layout (11 Headings Sidebar Filters + Results Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar Filters - Explicitly structured by the 11 requested headings */}
        <aside className={`lg:block ${showMobileFilters ? 'block' : 'hidden'} bg-white p-5 rounded-2xl border border-slate-200 space-y-5 h-fit sticky top-24 shadow-sm max-h-[85vh] overflow-y-auto`}>
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" /> Filtreleme Başlıkları
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Sıfırla
            </button>
          </div>

          {/* Primary Search Action Button under Sidebar Headings */}
          <button
            onClick={() => setHasSearched(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" /> Ara / Programları Listele
          </button>

          {/* 2026 ÖSYM Kılavuzu Aktiflik Kontrolü */}
          <div className="p-3 bg-emerald-50/90 rounded-xl border border-emerald-200 space-y-1.5">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.onlyActive2026}
                onChange={(e) => setFilters({ ...filters, onlyActive2026: e.target.checked })}
                className="mt-0.5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
              />
              <div>
                <span className="text-xs font-bold text-emerald-950 block flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  Sadece 2026 Kılavuzunda Aktif Programlar
                </span>
                <span className="text-[10px] text-emerald-800 block mt-0.5 leading-snug">
                  2026 ÖSYM Kılavuzunda yer almayan veya kapatılan bölümleri listemeden çıkarır.
                </span>
              </div>
            </label>
          </div>

          {/* 1. Puan Türü */}
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-blue-600" /> 1. Puan Türü
            </label>
            <select
              value={filters.scoreType}
              onChange={(e: any) => setFilters({ ...filters, scoreType: e.target.value })}
              className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-bold outline-none focus:border-blue-500"
            >
              <option value="HEPSİ">Tümü (SAY, EA, SÖZ, DİL, TYT)</option>
              <option value="SAY">SAY (Sayısal)</option>
              <option value="EA">EA (Eşit Ağırlık)</option>
              <option value="SÖZ">SÖZ (Sözel)</option>
              <option value="DİL">DİL (Yabancı Dil)</option>
              <option value="TYT">TYT (Ön Lisans)</option>
            </select>
          </div>

          {/* 2. Üniversite */}
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-blue-600" /> 2. Üniversite Adı
            </label>
            <input
              type="text"
              value={filters.universityQuery}
              onChange={(e) => setFilters({ ...filters, universityQuery: e.target.value })}
              placeholder="Örn: ODTÜ, Boğaziçi, İstanbul..."
              className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-800 outline-none focus:border-blue-500"
            />
          </div>

          {/* 3. Program */}
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" /> 3. Program / Bölüm
            </label>
            <input
              type="text"
              value={filters.programQuery}
              onChange={(e) => setFilters({ ...filters, programQuery: e.target.value })}
              placeholder="Örn: Bilgisayar, Tıp, Hukuk..."
              className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-800 outline-none focus:border-blue-500"
            />
          </div>

          {/* 4. Şehir */}
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" /> 4. Şehir
            </label>
            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 pt-1">
              {CITIES.map((c) => (
                <label key={c} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={filters.selectedCities.includes(c)}
                    onChange={() => toggleCity(c)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 5. Ön Lisans / Lisans */}
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" /> 5. Ön Lisans / Lisans
            </label>
            <div className="grid grid-cols-3 gap-1">
              {(['HEPSİ', 'Lisans', 'Ön Lisans'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setFilters({ ...filters, degreeType: d })}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                    filters.degreeType === d
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Üniversite Türü */}
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block">6. Üniversite Türü</label>
            <div className="space-y-1.5 pt-0.5">
              {(['Devlet', 'Vakıf', 'KKTC', 'Yurt Dışı'] as UniversityType[]).map((t) => (
                <label key={t} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={filters.universityTypes.includes(t)}
                    onChange={() => toggleUniType(t)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 7. Ücret/Burs */}
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block">7. Ücret / Burs Durumu</label>
            <div className="space-y-1.5 pt-0.5">
              {(['Devlet (Ücretsiz)', '%100 Burslu', '%50 Burslu', '%25 Burslu', 'Ücretli'] as ScholarshipType[]).map((s) => (
                <label key={s} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={filters.scholarships.includes(s)}
                    onChange={() => toggleScholarship(s)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 8. Öğretim Türü */}
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block">8. Öğretim Türü</label>
            <div className="space-y-1.5 pt-0.5">
              {(['Örgün', 'İkinci Öğretim', 'Açıköğretim', 'Uzaktan Eğitim'] as EducationType[]).map((e) => (
                <label key={e} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={filters.educationTypes.includes(e)}
                    onChange={() => toggleEduType(e)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{e}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 9. Program Kodu */}
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-blue-600" /> 9. Program Kodu
            </label>
            <input
              type="text"
              value={filters.codeQuery}
              onChange={(e) => setFilters({ ...filters, codeQuery: e.target.value })}
              placeholder="Örn: 108410012"
              className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white font-mono text-slate-800 outline-none focus:border-blue-500"
            />
          </div>

          {/* 10 & 11. En Az & En Çok Başarı Sırası */}
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2">
            <label className="text-xs font-bold text-slate-800 block">
              10 & 11. Başarı Sırası Aralığı
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-slate-500 block mb-0.5 font-semibold">10. En Az Sıra</span>
                <input
                  type="number"
                  value={filters.minRankMin}
                  onChange={(e) => setFilters({ ...filters, minRankMin: e.target.value ? Number(e.target.value) : '' })}
                  placeholder="Min (Örn: 1)"
                  className="w-full text-xs p-1.5 rounded-lg border border-slate-200 bg-white font-mono outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block mb-0.5 font-semibold">11. En Çok Sıra</span>
                <input
                  type="number"
                  value={filters.minRankMax}
                  onChange={(e) => setFilters({ ...filters, minRankMax: e.target.value ? Number(e.target.value) : '' })}
                  placeholder="Max (Örn: 50000)"
                  className="w-full text-xs p-1.5 rounded-lg border border-slate-200 bg-white font-mono outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Sort By Option */}
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" /> Sonuç Sıralaması
            </label>
            <select
              value={filters.sortBy}
              onChange={(e: any) => setFilters({ ...filters, sortBy: e.target.value })}
              className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-800 outline-none focus:border-blue-500 font-semibold"
            >
              <option value="rankAsc">2025 Sıralaması (1 → N En İyi)</option>
              <option value="rankDesc">2025 Sıralaması (N → 1)</option>
              <option value="scoreDesc">2025 Taban Puan (Yüksek → Düşük)</option>
              <option value="scoreAsc">2025 Taban Puan (Düşük → Yüksek)</option>
              <option value="cityAsc">Şehir (A → Z)</option>
              <option value="cityDesc">Şehir (Z → A)</option>
              <option value="nameAsc">Program Adı (A → Z)</option>
              <option value="nameDesc">Program Adı (Z → A)</option>
              <option value="uniAsc">Üniversite Adı (A → Z)</option>
              <option value="uniDesc">Üniversite Adı (Z → A)</option>
            </select>
          </div>

        </aside>

        {/* Results Column */}
        <main className="lg:col-span-3 space-y-4">
          
          {/* Status info Header */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
            <span>
              Toplam <strong className="text-slate-900">{filteredPrograms.length}</strong> program bulundu
            </span>
            <div className="flex items-center gap-2">
              {filters.scoreType !== 'HEPSİ' && (
                <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-bold">
                  {filters.scoreType}
                </span>
              )}
              {filters.degreeType !== 'HEPSİ' && (
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded font-bold">
                  {filters.degreeType}
                </span>
              )}
            </div>
          </div>

          {/* Quick Interactive Sorting Header Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-xs flex flex-wrap items-center justify-between gap-2.5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 shrink-0">
              <ArrowUpDown className="w-4 h-4 text-blue-600" />
              <span>Sıralama Ölçütü:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 flex-1 justify-start sm:justify-end">
              {/* Sıralama (Rank) */}
              <button
                onClick={() => handleSortToggle('rank')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  filters.sortBy === 'rankAsc' || filters.sortBy === 'rankDesc'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                title="2025 Başarı Sırasına Göre Sırala"
              >
                <span>Başarı Sırası</span>
                {filters.sortBy === 'rankAsc' && <ArrowUp className="w-3.5 h-3.5 text-white" />}
                {filters.sortBy === 'rankDesc' && <ArrowDown className="w-3.5 h-3.5 text-white" />}
              </button>

              {/* Taban Puan */}
              <button
                onClick={() => handleSortToggle('score')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  filters.sortBy === 'scoreDesc' || filters.sortBy === 'scoreAsc'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                title="Taban Puana Göre Sırala"
              >
                <span>Taban Puan</span>
                {filters.sortBy === 'scoreDesc' && <ArrowDown className="w-3.5 h-3.5 text-white" />}
                {filters.sortBy === 'scoreAsc' && <ArrowUp className="w-3.5 h-3.5 text-white" />}
              </button>

              {/* Şehir */}
              <button
                onClick={() => handleSortToggle('city')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  filters.sortBy === 'cityAsc' || filters.sortBy === 'cityDesc'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                title="Şehre Göre Sırala"
              >
                <span>Şehir</span>
                {filters.sortBy === 'cityAsc' && <ArrowUp className="w-3.5 h-3.5 text-white" />}
                {filters.sortBy === 'cityDesc' && <ArrowDown className="w-3.5 h-3.5 text-white" />}
              </button>

              {/* Program Adı */}
              <button
                onClick={() => handleSortToggle('name')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  filters.sortBy === 'nameAsc' || filters.sortBy === 'nameDesc'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                title="Program Adına Göre Sırala"
              >
                <span>Program Adı</span>
                {filters.sortBy === 'nameAsc' && <ArrowUp className="w-3.5 h-3.5 text-white" />}
                {filters.sortBy === 'nameDesc' && <ArrowDown className="w-3.5 h-3.5 text-white" />}
              </button>

              {/* Üniversite */}
              <button
                onClick={() => handleSortToggle('uni')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  filters.sortBy === 'uniAsc' || filters.sortBy === 'uniDesc'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                title="Üniversite Adına Göre Sırala"
              >
                <span>Üniversite</span>
                {filters.sortBy === 'uniAsc' && <ArrowUp className="w-3.5 h-3.5 text-white" />}
                {filters.sortBy === 'uniDesc' && <ArrowDown className="w-3.5 h-3.5 text-white" />}
              </button>
            </div>
          </div>

          {/* Default Empty List State before user triggers Search */}
          {!hasSearched ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-xs space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Arama Yapmak İçin Filtreleri Belirleyip 'Ara' Butonuna Basınız</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
                  Veritabanında toplam <strong className="text-slate-800">{programs.length} ÖSYM programı</strong> kayıtlıdır. Sol taraftaki 11 farklı ÖSYM kriterini seçip <strong className="text-blue-700">"Ara / Programları Listele"</strong> butonuna tıklayarak sonuçları listeleyebilirsiniz.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setHasSearched(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  <Search className="w-4 h-4" /> Ara / Programları Listele ({filteredPrograms.length} Program)
                </button>
              </div>
            </div>
          ) : filteredPrograms.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800 text-base">Aradığınız Kriterlerde Program Bulunamadı</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Lütfen arama kelimelerinizi veya sol taraftaki 11 adet filtrenizi esneterek tekrar deneyiniz.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
              >
                Tüm Filtreleri Sıfırla
              </button>
            </div>
          ) : (
            /* Program Cards Grid */
            <div className="space-y-3.5">
              {filteredPrograms.map((program) => {
                const y25 = program.years[2025];
                const y24 = program.years[2024];
                const isAdded = preferenceIds.has(program.id);
                const isCompared = compareIds.has(program.id);

                // Calculate safety badge
                let categoryText = null;
                let categoryClass = '';

                if (activeUserRank && y25?.minRank) {
                  const diffPct = ((y25.minRank - activeUserRank) / y25.minRank) * 100;
                  if (diffPct >= 20) {
                    categoryText = 'Güvenli';
                    categoryClass = 'bg-emerald-100 text-emerald-800 border-emerald-300';
                  } else if (diffPct >= -20) {
                    categoryText = 'Hedef';
                    categoryClass = 'bg-amber-100 text-amber-800 border-amber-300';
                  } else {
                    categoryText = 'Riskli';
                    categoryClass = 'bg-rose-100 text-rose-800 border-rose-300';
                  }
                }

                return (
                  <div
                    key={program.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-4 hover:border-blue-400 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    {/* Left Info Section */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                        <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                          {program.code}
                        </span>
                        <span className="bg-blue-100 text-blue-800 font-bold text-[10px] px-2 py-0.5 rounded">
                          {program.scoreType}
                        </span>
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                          {program.universityType}
                        </span>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-medium px-2 py-0.5 rounded">
                          {program.scholarship}
                        </span>
                        <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-semibold px-2 py-0.5 rounded">
                          {program.durationYears === 2 ? 'Ön Lisans (2 Yıl)' : `${program.durationYears} Yıl Lisans`}
                        </span>
                        {/* 2026 ÖSYM Kılavuz Status Badge */}
                        {program.years[2026]?.isClosed || program.years[2026]?.quota === 0 ? (
                          <span className="bg-rose-100 text-rose-800 border border-rose-300 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-rose-600" />
                            2026 Kılavuzunda Kapatıldı
                          </span>
                        ) : (
                          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 text-xs" />
                            2026 ÖSYM Kılavuzunda Aktif
                          </span>
                        )}
                        {categoryText && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${categoryClass}`}>
                            {categoryText}
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors leading-snug">
                        {program.programName}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                        <span className="font-semibold text-slate-800 flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-slate-400" />
                          {program.universityName}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {program.city}
                        </span>
                        <span>•</span>
                        <span>{program.faculty}</span>
                      </div>
                    </div>

                    {/* Middle Score & Rank Badge */}
                    <div className="flex items-center gap-4 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100 shrink-0">
                      <div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          2025 Başarı Sırası
                        </p>
                        <p className="text-base font-extrabold text-blue-700 font-mono">
                          {y25?.minRank ? y25.minRank.toLocaleString('tr-TR') : 'Dolmadı'}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Taban Puan: <strong className="text-slate-800">{y25?.minScore || '-'}</strong>
                        </p>
                      </div>

                      {/* 2024 vs 2025 Trend Sparkline indicator */}
                      {y24?.minRank && y25?.minRank && (
                        <div className="text-right border-l border-slate-200 pl-3">
                          <p className="text-[9px] text-slate-400 font-medium">24-25 Trend</p>
                          <span className={`text-[11px] font-bold flex items-center gap-0.5 ${
                            y25.minRank < y24.minRank ? 'text-emerald-600' : 'text-slate-600'
                          }`}>
                            <TrendingUp className="w-3 h-3" />
                            {y25.minRank < y24.minRank ? 'Yükseldi' : 'Stabil'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Compare Checkbox */}
                      <button
                        onClick={() => onToggleCompare(program)}
                        className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
                          isCompared
                            ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                        title="Karşılaştır"
                      >
                        {isCompared ? 'Karşılaştırılıyor' : 'Karşılaştır'}
                      </button>

                      {/* Detail Modal Trigger */}
                      <button
                        onClick={() => onOpenDetail(program)}
                        className="p-2 rounded-xl text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 transition-colors"
                        title="Detay İncele"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Add to Preferences Button */}
                      <button
                        onClick={() => onAddToPreferences(program)}
                        disabled={isAdded}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                          isAdded
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            Eklendi
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            Listeye Ekle
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
