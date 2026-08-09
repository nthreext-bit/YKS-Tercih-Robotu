/**
 * YKS Tercih Robotu - Type Definitions
 */

export type ScoreType = 'SAY' | 'EA' | 'SÖZ' | 'DİL' | 'TYT';

export type UniversityType = 'Devlet' | 'Vakıf' | 'KKTC' | 'Yurt Dışı';

export type EducationType = 'Örgün' | 'İkinci Öğretim' | 'Açıköğretim' | 'Uzaktan Eğitim';

export type ScholarshipType = 
  | '%100 Burslu' 
  | '%75 Burslu' 
  | '%50 Burslu' 
  | '%25 Burslu' 
  | 'Ücretli' 
  | 'Devlet (Ücretsiz)' 
  | 'İkinci Öğretim';

export interface YearData {
  minScore: number;       // Taban Puan
  maxScore: number;       // Tavan Puan
  minRank: number;        // Taban Başarı Sırası
  quota: number;          // Genel Kontenjan
  quotaTop?: number;      // Birincilik Kontenjanı
  isFull: boolean;        // Doldu mu
  placedCount?: number;   // Yerleşen Sayısı
  isClosed?: boolean;     // 2026 Kılavuzunda öğrenci alımı kapandı/kaldırıldı mı
}

export interface Program {
  id: string;               // Unique ID, e.g. "108410012"
  code: string;             // ÖSYM Program Kodu, e.g. "108410012"
  universityName: string;   // e.g. "ORTA DOĞU TEKNİK ÜNİVERSİTESİ"
  city: string;             // e.g. "Ankara"
  universityType: UniversityType; // e.g. "Devlet"
  faculty: string;          // e.g. "Mühendislik Fakültesi"
  programName: string;      // e.g. "Bilgisayar Mühendisliği (İngilizce)"
  scoreType: ScoreType;     // e.g. "SAY"
  scholarship: ScholarshipType; // e.g. "Devlet (Ücretsiz)"
  educationType: EducationType; // e.g. "Örgün"
  language: string;         // e.g. "İngilizce", "Türkçe"
  durationYears: number;    // e.g. 4, 5, 6, 2
  notes?: string;           // Özel Koşul Maddeleri, e.g. "Bk. 22, Bk. 24"
  
  // Historical data per year (key is year number, e.g. 2024, 2025, 2026)
  years: Record<number, YearData>;

  // Computed/Derived metrics
  rankChange3YrPct?: number; // e.g. -5.2% or +12.4%
  predicted2026RankMin?: number;
  predicted2026RankMax?: number;
  predicted2026Score?: number;
}

export interface UserScores {
  tytScore: number | null;
  sayScore: number | null;
  eaScore: number | null;
  sozScore: number | null;
  dilScore: number | null;

  tytRank: number | null;
  sayRank: number | null;
  eaRank: number | null;
  sozRank: number | null;
  dilRank: number | null;

  obp: number; // 50 - 100
  isPreviousYearPlaced: boolean; // Kırık OBP
}

export interface CalculatorInput {
  obp: number; // 50 to 100
  isPreviousYearPlaced: boolean; // Kırık OBP

  // TYT Nets (Correct, Incorrect)
  tyt: {
    turkceD: number; turkceY: number;
    sosyalD: number; sosyalY: number;
    matD: number; matY: number;
    fenD: number; fenY: number;
  };

  // AYT Nets
  ayt: {
    matD: number; matY: number;
    fizikD: number; fizikY: number;
    kimyaD: number; kimyaY: number;
    biyoD: number; biyoY: number;

    edebiyatD: number; edebiyatY: number;
    tarih1D: number; tarih1Y: number;
    cog1D: number; cog1Y: number;

    tarih2D: number; tarih2Y: number;
    cog2D: number; cog2Y: number;
    felsefeD: number; felsefeY: number;
    dinD: number; dinY: number;

    ydtD: number; ydtY: number;
  };
}

export type PreferenceCategory = 'Güvenli' | 'Hedef' | 'Riskli';

export interface PreferenceItem {
  id: string;
  order: number; // 1 to 24
  program: Program;
  category: PreferenceCategory;
  userRankGapPct: number; // e.g., +25% (Safe) or -15% (Risk)
  notes?: string;
  customNote?: string;
}

export interface FilterState {
  searchQuery: string;
  universityQuery: string;
  programQuery: string;
  codeQuery: string;
  scoreType: ScoreType | 'HEPSİ';
  selectedCities: string[];
  degreeType: 'HEPSİ' | 'Lisans' | 'Ön Lisans';
  universityTypes: UniversityType[];
  scholarships: ScholarshipType[];
  educationTypes: EducationType[];
  minRankMin: number | '';
  minRankMax: number | '';
  minScoreMin: number | '';
  minScoreMax: number | '';
  userTargetRank: number | null;
  userTargetScore: number | null;
  selectedYears: number[]; // e.g. [2024, 2025, 2026]
  onlyFull: boolean;
  onlyActive2026: boolean; // Sadece 2026 ÖSYM Kılavuzunda Yer Alan & Öğrenci Alan Programlar
  sortBy: 'rankAsc' | 'rankDesc' | 'scoreDesc' | 'scoreAsc' | 'quotaDesc' | 'nameAsc' | 'nameDesc' | 'cityAsc' | 'cityDesc' | 'uniAsc' | 'uniDesc';
}

export interface GuideImportRow {
  year: number;
  code: string;
  universityName: string;
  city: string;
  universityType: UniversityType;
  faculty: string;
  programName: string;
  scoreType: ScoreType;
  scholarship: ScholarshipType;
  educationType: EducationType;
  language: string;
  durationYears: number;
  quota: number;
  minScore: number;
  maxScore: number;
  minRank: number;
  isFull: boolean;
  notes?: string;
  isValid?: boolean;
  errorMessage?: string;
}

export interface GuideSourceStatus {
  lastUpdated: string;
  syncMode: 'manual' | 'auto';
  sources: {
    year: number;
    title: string;
    url: string;
    parsedCount: number;
    status: 'ACTIVE' | 'WARNING' | 'ERROR';
  }[];
}

export interface GeminiAdvisorRequest {
  userScores: UserScores;
  preferenceList: {
    order: number;
    code: string;
    universityName: string;
    programName: string;
    scoreType: string;
    minRank2025: number;
    category: string;
  }[];
  targetCityPreference?: string;
  careerGoals?: string;
}

export interface GeminiAdvisorResponse {
  summary: string;
  riskAssessment: {
    safeCount: number;
    targetCount: number;
    reachCount: number;
    balanceEvaluation: string;
  };
  recommendations: string[];
  alternativeSuggestions: string[];
  criticalWarnings: string[];
}
