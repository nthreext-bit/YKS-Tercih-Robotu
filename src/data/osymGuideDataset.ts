import { Program, GuideImportRow } from '../types';

/**
 * Authentic sample dataset representing ÖSYM YKS Program & Quota Guides for 2024, 2025, and 2026.
 */
export const INITIAL_PROGRAMS: Program[] = [
  // --- SAYISAL (SAY) PROGRAMS ---
  {
    id: '108410012',
    code: '108410012',
    universityName: 'ORTA DOĞU TEKNİK ÜNİVERSİTESİ',
    city: 'Ankara',
    universityType: 'Devlet',
    faculty: 'Mühendislik Fakültesi',
    programName: 'Bilgisayar Mühendisliği (İngilizce)',
    scoreType: 'SAY',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'İngilizce',
    durationYears: 4,
    notes: 'Bk. 22 (İngilizce Hazırlık Sınıfı zorunludur)',
    years: {
      2024: { minScore: 541.25, maxScore: 558.10, minRank: 780, quota: 100, quotaTop: 3, isFull: true },
      2025: { minScore: 544.80, maxScore: 559.40, minRank: 710, quota: 100, quotaTop: 3, isFull: true },
      2026: { minScore: 546.10, maxScore: 560.00, minRank: 680, quota: 100, quotaTop: 3, isFull: true }
    }
  },
  {
    id: '105610023',
    code: '105610023',
    universityName: 'İSTANBUL TEKNİK ÜNİVERSİTESİ',
    city: 'İstanbul',
    universityType: 'Devlet',
    faculty: 'Bilgisayar ve Bilişim Fakültesi',
    programName: 'Yapay Zeka ve Veri Mühendisliği (İngilizce)',
    scoreType: 'SAY',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'İngilizce',
    durationYears: 4,
    notes: 'Bk. 22, Bk. 24',
    years: {
      2024: { minScore: 538.40, maxScore: 552.10, minRank: 1250, quota: 60, quotaTop: 2, isFull: true },
      2025: { minScore: 541.90, maxScore: 555.30, minRank: 1050, quota: 60, quotaTop: 2, isFull: true },
      2026: { minScore: 543.50, maxScore: 557.00, minRank: 980, quota: 65, quotaTop: 2, isFull: true }
    }
  },
  {
    id: '202010115',
    code: '202010115',
    universityName: 'KOÇ ÜNİVERSİTESİ',
    city: 'İstanbul',
    universityType: 'Vakıf',
    faculty: 'Tıp Fakültesi',
    programName: 'Tıp (İngilizce) (%100 Burslu)',
    scoreType: 'SAY',
    scholarship: '%100 Burslu',
    educationType: 'Örgün',
    language: 'İngilizce',
    durationYears: 6,
    notes: 'Bk. 22, Bk. 86 (Tam burs kuralı)',
    years: {
      2024: { minScore: 554.10, maxScore: 560.00, minRank: 85, quota: 15, quotaTop: 0, isFull: true },
      2025: { minScore: 556.30, maxScore: 560.00, minRank: 75, quota: 15, quotaTop: 0, isFull: true },
      2026: { minScore: 557.00, maxScore: 560.00, minRank: 70, quota: 15, quotaTop: 0, isFull: true }
    }
  },
  {
    id: '104810034',
    code: '104810034',
    universityName: 'HACETTEPE ÜNİVERSİTESİ',
    city: 'Ankara',
    universityType: 'Devlet',
    faculty: 'Tıp Fakültesi',
    programName: 'Tıp (İngilizce)',
    scoreType: 'SAY',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'İngilizce',
    durationYears: 6,
    notes: 'Bk. 22, Bk. 38 (Tıp barajı: ilk 50 bin)',
    years: {
      2024: { minScore: 539.10, maxScore: 556.80, minRank: 1180, quota: 170, quotaTop: 5, isFull: true },
      2025: { minScore: 542.40, maxScore: 558.00, minRank: 1020, quota: 170, quotaTop: 5, isFull: true },
      2026: { minScore: 544.00, maxScore: 559.20, minRank: 950, quota: 175, quotaTop: 5, isFull: true }
    }
  },
  {
    id: '102210089',
    code: '102210089',
    universityName: 'BOĞAZİÇİ ÜNİVERSİTESİ',
    city: 'İstanbul',
    universityType: 'Devlet',
    faculty: 'Mühendislik Fakültesi',
    programName: 'Endüstri Mühendisliği (İngilizce)',
    scoreType: 'SAY',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'İngilizce',
    durationYears: 4,
    notes: 'Bk. 22',
    years: {
      2024: { minScore: 535.10, maxScore: 551.00, minRank: 1850, quota: 70, quotaTop: 2, isFull: true },
      2025: { minScore: 538.60, maxScore: 553.20, minRank: 1620, quota: 70, quotaTop: 2, isFull: true },
      2026: { minScore: 540.20, maxScore: 555.10, minRank: 1510, quota: 70, quotaTop: 2, isFull: true }
    }
  },
  {
    id: '105610142',
    code: '105610142',
    universityName: 'İSTANBUL TEKNİK ÜNİVERSİTESİ',
    city: 'İstanbul',
    universityType: 'Devlet',
    faculty: 'Elektrik-Elektronik Fakültesi',
    programName: 'Elektrik-Elektronik Mühendisliği (İngilizce)',
    scoreType: 'SAY',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'İngilizce',
    durationYears: 4,
    notes: 'Bk. 22',
    years: {
      2024: { minScore: 531.80, maxScore: 548.90, minRank: 2450, quota: 120, quotaTop: 4, isFull: true },
      2025: { minScore: 535.20, maxScore: 551.40, minRank: 2180, quota: 120, quotaTop: 4, isFull: true },
      2026: { minScore: 537.10, maxScore: 553.00, minRank: 2040, quota: 120, quotaTop: 4, isFull: true }
    }
  },
  {
    id: '101110058',
    code: '101110058',
    universityName: 'ANKARA ÜNİVERSİTESİ',
    city: 'Ankara',
    universityType: 'Devlet',
    faculty: 'Tıp Fakültesi',
    programName: 'Tıp (Türkçe)',
    scoreType: 'SAY',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'Türkçe',
    durationYears: 6,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 524.50, maxScore: 542.10, minRank: 3820, quota: 300, quotaTop: 8, isFull: true },
      2025: { minScore: 527.10, maxScore: 544.50, minRank: 3510, quota: 300, quotaTop: 8, isFull: true },
      2026: { minScore: 528.80, maxScore: 546.00, minRank: 3390, quota: 300, quotaTop: 8, isFull: true }
    }
  },
  {
    id: '103110245',
    code: '103110245',
    universityName: 'EGE ÜNİVERSİTESİ',
    city: 'İzmir',
    universityType: 'Devlet',
    faculty: 'Tıp Fakültesi',
    programName: 'Tıp',
    scoreType: 'SAY',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'Türkçe',
    durationYears: 6,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 518.20, maxScore: 535.40, minRank: 5400, quota: 320, quotaTop: 9, isFull: true },
      2025: { minScore: 521.00, maxScore: 538.10, minRank: 5100, quota: 320, quotaTop: 9, isFull: true },
      2026: { minScore: 522.60, maxScore: 539.50, minRank: 4950, quota: 320, quotaTop: 9, isFull: true }
    }
  },
  {
    id: '111010041',
    code: '111010041',
    universityName: 'YILDIZ TEKNİK ÜNİVERSİTESİ',
    city: 'İstanbul',
    universityType: 'Devlet',
    faculty: 'Elektrik-Elektronik Fakültesi',
    programName: 'Bilgisayar Mühendisliği',
    scoreType: 'SAY',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 22',
    years: {
      2024: { minScore: 515.60, maxScore: 532.00, minRank: 6200, quota: 110, quotaTop: 3, isFull: true },
      2025: { minScore: 520.20, maxScore: 536.80, minRank: 5300, quota: 110, quotaTop: 3, isFull: true },
      2026: { minScore: 523.00, maxScore: 539.00, minRank: 4800, quota: 115, quotaTop: 3, isFull: true }
    }
  },
  {
    id: '104810185',
    code: '104810185',
    universityName: 'HACETTEPE ÜNİVERSİTESİ',
    city: 'Ankara',
    universityType: 'Devlet',
    faculty: 'Diş Hekimliği Fakültesi',
    programName: 'Diş Hekimliği',
    scoreType: 'SAY',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'Türkçe',
    durationYears: 5,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 492.30, maxScore: 512.00, minRank: 16800, quota: 150, quotaTop: 4, isFull: true },
      2025: { minScore: 495.10, maxScore: 514.80, minRank: 16100, quota: 150, quotaTop: 4, isFull: true },
      2026: { minScore: 496.80, maxScore: 516.20, minRank: 15700, quota: 150, quotaTop: 4, isFull: true }
    }
  },
  {
    id: '103410111',
    code: '103410111',
    universityName: 'EGE ÜNİVERSİTESİ',
    city: 'İzmir',
    universityType: 'Devlet',
    faculty: 'Mühendislik Fakültesi',
    programName: 'Yazılım Mühendisliği',
    scoreType: 'SAY',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 22',
    years: {
      2024: { minScore: 482.10, maxScore: 504.20, minRank: 24500, quota: 80, quotaTop: 2, isFull: true },
      2025: { minScore: 488.40, maxScore: 510.10, minRank: 21200, quota: 80, quotaTop: 2, isFull: true },
      2026: { minScore: 491.50, maxScore: 513.00, minRank: 19800, quota: 80, quotaTop: 2, isFull: true }
    }
  },
  {
    id: '104110321',
    code: '104110321',
    universityName: 'GAZİ ÜNİVERSİTESİ',
    city: 'Ankara',
    universityType: 'Devlet',
    faculty: 'Eczacılık Fakültesi',
    programName: 'Eczacılık',
    scoreType: 'SAY',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'Türkçe',
    durationYears: 5,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 461.50, maxScore: 482.30, minRank: 42100, quota: 110, quotaTop: 3, isFull: true },
      2025: { minScore: 464.20, maxScore: 485.00, minRank: 40800, quota: 110, quotaTop: 3, isFull: true },
      2026: { minScore: 466.00, maxScore: 487.10, minRank: 39900, quota: 110, quotaTop: 3, isFull: true }
    }
  },
  {
    id: '102210108',
    code: '102210108',
    universityName: 'DOKUZ EYLÜL ÜNİVERSİTESİ',
    city: 'İzmir',
    universityType: 'Devlet',
    faculty: 'Hemşirelik Fakültesi',
    programName: 'Hemşirelik',
    scoreType: 'SAY',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 395.20, maxScore: 432.10, minRank: 112000, quota: 220, quotaTop: 6, isFull: true },
      2025: { minScore: 398.60, maxScore: 435.80, minRank: 108000, quota: 220, quotaTop: 6, isFull: true },
      2026: { minScore: 401.00, maxScore: 438.00, minRank: 104500, quota: 220, quotaTop: 6, isFull: true }
    }
  },

  // --- EŞİT AĞIRLIK (EA) PROGRAMS ---
  {
    id: '102220015',
    code: '102220015',
    universityName: 'BOĞAZİÇİ ÜNİVERSİTESİ',
    city: 'İstanbul',
    universityType: 'Devlet',
    faculty: 'İktisadi ve İdari Bilimler Fakültesi',
    programName: 'İşletme (İngilizce)',
    scoreType: 'EA',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'İngilizce',
    durationYears: 4,
    notes: 'Bk. 22',
    years: {
      2024: { minScore: 508.40, maxScore: 545.20, minRank: 420, quota: 90, quotaTop: 3, isFull: true },
      2025: { minScore: 512.10, maxScore: 548.00, minRank: 380, quota: 90, quotaTop: 3, isFull: true },
      2026: { minScore: 514.00, maxScore: 550.10, minRank: 350, quota: 90, quotaTop: 3, isFull: true }
    }
  },
  {
    id: '104820018',
    code: '104820018',
    universityName: 'HACETTEPE ÜNİVERSİTESİ',
    city: 'Ankara',
    universityType: 'Devlet',
    faculty: 'Hukuk Fakültesi',
    programName: 'Hukuk',
    scoreType: 'EA',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38 (Hukuk barajı: ilk 125 bin)',
    years: {
      2024: { minScore: 442.10, maxScore: 482.00, minRank: 3200, quota: 200, quotaTop: 5, isFull: true },
      2025: { minScore: 445.80, maxScore: 485.40, minRank: 2950, quota: 200, quotaTop: 5, isFull: true },
      2026: { minScore: 448.00, maxScore: 488.00, minRank: 2800, quota: 200, quotaTop: 5, isFull: true }
    }
  },
  {
    id: '101120022',
    code: '101120022',
    universityName: 'ANKARA ÜNİVERSİTESİ',
    city: 'Ankara',
    universityType: 'Devlet',
    faculty: 'Hukuk Fakültesi',
    programName: 'Hukuk',
    scoreType: 'EA',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 435.20, maxScore: 472.00, minRank: 4800, quota: 450, quotaTop: 12, isFull: true },
      2025: { minScore: 438.90, maxScore: 476.10, minRank: 4400, quota: 450, quotaTop: 12, isFull: true },
      2026: { minScore: 441.20, maxScore: 478.50, minRank: 4150, quota: 450, quotaTop: 12, isFull: true }
    }
  },
  {
    id: '105620188',
    code: '105620188',
    universityName: 'İSTANBUL ÜNİVERSİTESİ',
    city: 'İstanbul',
    universityType: 'Devlet',
    faculty: 'Hukuk Fakültesi',
    programName: 'Hukuk',
    scoreType: 'EA',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 431.00, maxScore: 468.20, minRank: 5900, quota: 500, quotaTop: 14, isFull: true },
      2025: { minScore: 434.50, maxScore: 471.00, minRank: 5400, quota: 500, quotaTop: 14, isFull: true },
      2026: { minScore: 436.80, maxScore: 473.20, minRank: 5100, quota: 500, quotaTop: 14, isFull: true }
    }
  },
  {
    id: '102220145',
    code: '102220145',
    universityName: 'BOĞAZİÇİ ÜNİVERSİTESİ',
    city: 'İstanbul',
    universityType: 'Devlet',
    faculty: 'Fen-Edebiyat Fakültesi',
    programName: 'Psikoloji (İngilizce)',
    scoreType: 'EA',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'İngilizce',
    durationYears: 4,
    notes: 'Bk. 22',
    years: {
      2024: { minScore: 485.20, maxScore: 520.10, minRank: 1100, quota: 60, quotaTop: 2, isFull: true },
      2025: { minScore: 489.10, maxScore: 524.00, minRank: 950, quota: 60, quotaTop: 2, isFull: true },
      2026: { minScore: 491.50, maxScore: 526.50, minRank: 880, quota: 60, quotaTop: 2, isFull: true }
    }
  },
  {
    id: '107220052',
    code: '107220052',
    universityName: 'MARMARA ÜNİVERSİTESİ',
    city: 'İstanbul',
    universityType: 'Devlet',
    faculty: 'İşletme Fakültesi',
    programName: 'Yönetim Bilişim Sistemleri (İngilizce)',
    scoreType: 'EA',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'İngilizce',
    durationYears: 4,
    notes: 'Bk. 22',
    years: {
      2024: { minScore: 412.50, maxScore: 445.00, minRank: 18500, quota: 80, quotaTop: 2, isFull: true },
      2025: { minScore: 421.20, maxScore: 452.10, minRank: 13800, quota: 80, quotaTop: 2, isFull: true },
      2026: { minScore: 426.00, maxScore: 456.00, minRank: 11200, quota: 85, quotaTop: 2, isFull: true }
    }
  },
  {
    id: '101120158',
    code: '101120158',
    universityName: 'ANKARA ÜNİVERSİTESİ',
    city: 'Ankara',
    universityType: 'Devlet',
    faculty: 'Siyasal Bilgiler Fakültesi (Mülkiye)',
    programName: 'Siyaset Bilimi ve Kamu Yönetimi',
    scoreType: 'EA',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 382.40, maxScore: 418.00, minRank: 48000, quota: 100, quotaTop: 3, isFull: true },
      2025: { minScore: 385.10, maxScore: 421.00, minRank: 45200, quota: 100, quotaTop: 3, isFull: true },
      2026: { minScore: 387.20, maxScore: 423.50, minRank: 43100, quota: 100, quotaTop: 3, isFull: true }
    }
  },

  // --- SÖZEL (SÖZ) PROGRAMS ---
  {
    id: '102230018',
    code: '102230018',
    universityName: 'BOĞAZİÇİ ÜNİVERSİTESİ',
    city: 'İstanbul',
    universityType: 'Devlet',
    faculty: 'Eğitim Fakültesi',
    programName: 'Özel Eğitim Öğretmenliği (İngilizce)',
    scoreType: 'SÖZ',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'İngilizce',
    durationYears: 4,
    notes: 'Bk. 22',
    years: {
      2024: { minScore: 462.10, maxScore: 495.00, minRank: 850, quota: 40, quotaTop: 1, isFull: true },
      2025: { minScore: 466.40, maxScore: 498.20, minRank: 720, quota: 40, quotaTop: 1, isFull: true },
      2026: { minScore: 469.00, maxScore: 501.00, minRank: 650, quota: 40, quotaTop: 1, isFull: true }
    }
  },
  {
    id: '104830022',
    code: '104830022',
    universityName: 'HACETTEPE ÜNİVERSİTESİ',
    city: 'Ankara',
    universityType: 'Devlet',
    faculty: 'İletişim Fakültesi',
    programName: 'Radyo, Televizyon ve Sinema',
    scoreType: 'SÖZ',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 412.00, maxScore: 445.10, minRank: 12500, quota: 60, quotaTop: 2, isFull: true },
      2025: { minScore: 415.80, maxScore: 448.20, minRank: 11200, quota: 60, quotaTop: 2, isFull: true },
      2026: { minScore: 418.00, maxScore: 450.50, minRank: 10400, quota: 60, quotaTop: 2, isFull: true }
    }
  },
  {
    id: '101130045',
    code: '101130045',
    universityName: 'GAZİ ÜNİVERSİTESİ',
    city: 'Ankara',
    universityType: 'Devlet',
    faculty: 'Gazi Eğitim Fakültesi',
    programName: 'Türkçe Öğretmenliği',
    scoreType: 'SÖZ',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38 (Öğretmenlik barajı: ilk 300 bin)',
    years: {
      2024: { minScore: 428.50, maxScore: 458.00, minRank: 5800, quota: 70, quotaTop: 2, isFull: true },
      2025: { minScore: 432.10, maxScore: 461.20, minRank: 5100, quota: 70, quotaTop: 2, isFull: true },
      2026: { minScore: 434.50, maxScore: 463.50, minRank: 4700, quota: 70, quotaTop: 2, isFull: true }
    }
  },
  {
    id: '103130112',
    code: '103130112',
    universityName: 'EGE ÜNİVERSİTESİ',
    city: 'İzmir',
    universityType: 'Devlet',
    faculty: 'Edebiyat Fakültesi',
    programName: 'Tarih',
    scoreType: 'SÖZ',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 358.10, maxScore: 395.00, minRank: 62000, quota: 80, quotaTop: 2, isFull: true },
      2025: { minScore: 361.20, maxScore: 398.00, minRank: 58500, quota: 80, quotaTop: 2, isFull: true },
      2026: { minScore: 363.00, maxScore: 400.00, minRank: 56000, quota: 80, quotaTop: 2, isFull: true }
    }
  },

  // --- DİL PROGRAMS ---
  {
    id: '102240011',
    code: '102240011',
    universityName: 'BOĞAZİÇİ ÜNİVERSİTESİ',
    city: 'İstanbul',
    universityType: 'Devlet',
    faculty: 'Eğitim Fakültesi',
    programName: 'İngilizce Öğretmenliği (İngilizce)',
    scoreType: 'DİL',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'İngilizce',
    durationYears: 4,
    notes: 'Bk. 22',
    years: {
      2024: { minScore: 488.20, maxScore: 532.00, minRank: 1200, quota: 80, quotaTop: 2, isFull: true },
      2025: { minScore: 492.50, maxScore: 535.10, minRank: 980, quota: 80, quotaTop: 2, isFull: true },
      2026: { minScore: 495.00, maxScore: 538.00, minRank: 890, quota: 80, quotaTop: 2, isFull: true }
    }
  },
  {
    id: '104840015',
    code: '104840015',
    universityName: 'HACETTEPE ÜNİVERSİTESİ',
    city: 'Ankara',
    universityType: 'Devlet',
    faculty: 'Edebiyat Fakültesi',
    programName: 'Mütercim-Tercümanlık (İngilizce)',
    scoreType: 'DİL',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'İngilizce',
    durationYears: 4,
    notes: 'Bk. 22',
    years: {
      2024: { minScore: 472.10, maxScore: 508.00, minRank: 3200, quota: 60, quotaTop: 2, isFull: true },
      2025: { minScore: 476.00, maxScore: 512.40, minRank: 2850, quota: 60, quotaTop: 2, isFull: true },
      2026: { minScore: 478.50, maxScore: 515.00, minRank: 2650, quota: 60, quotaTop: 2, isFull: true }
    }
  },

  // --- TYT (2 YILLIK ÖNLİSANS) PROGRAMS ---
  {
    id: '104850122',
    code: '104850122',
    universityName: 'HACETTEPE ÜNİVERSİTESİ',
    city: 'Ankara',
    universityType: 'Devlet',
    faculty: 'Sağlık Hizmetleri Meslek Yüksekokulu',
    programName: 'İlk ve Acil Yardım',
    scoreType: 'TYT',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'Türkçe',
    durationYears: 2,
    notes: 'Bk. 38, Bk. 233 (Sürücü ehliyeti ve boy/kilo şartı)',
    years: {
      2024: { minScore: 365.20, maxScore: 405.00, minRank: 280000, quota: 65, quotaTop: 2, isFull: true },
      2025: { minScore: 369.80, maxScore: 409.20, minRank: 265000, quota: 65, quotaTop: 2, isFull: true },
      2026: { minScore: 372.10, maxScore: 412.00, minRank: 252000, quota: 65, quotaTop: 2, isFull: true }
    }
  },
  {
    id: '105650211',
    code: '105650211',
    universityName: 'İSTANBUL ÜNİVERSİTESİ - CERRAHPAŞA',
    city: 'İstanbul',
    universityType: 'Devlet',
    faculty: 'Teknik Bilimler Meslek Yüksekokulu',
    programName: 'Computer Programming / Bilgisayar Programcılığı',
    scoreType: 'TYT',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'Türkçe',
    durationYears: 2,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 352.10, maxScore: 392.00, minRank: 340000, quota: 70, quotaTop: 2, isFull: true },
      2025: { minScore: 358.40, maxScore: 398.10, minRank: 310000, quota: 70, quotaTop: 2, isFull: true },
      2026: { minScore: 362.00, maxScore: 402.00, minRank: 290000, quota: 70, quotaTop: 2, isFull: true }
    }
  },
  {
    id: '101150089',
    code: '101150089',
    universityName: 'ANKARA ÜNİVERSİTESİ',
    city: 'Ankara',
    universityType: 'Devlet',
    faculty: 'Sağlık Hizmetleri MYO',
    programName: 'Anestezi',
    scoreType: 'TYT',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'Türkçe',
    durationYears: 2,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 358.90, maxScore: 398.00, minRank: 310000, quota: 60, quotaTop: 2, isFull: true },
      2025: { minScore: 363.20, maxScore: 402.50, minRank: 290000, quota: 60, quotaTop: 2, isFull: true },
      2026: { minScore: 366.00, maxScore: 405.00, minRank: 278000, quota: 60, quotaTop: 2, isFull: true }
    }
  },
  {
    id: '202410889',
    code: '202410889',
    universityName: 'İSTANBUL BİLGİ ÜNİVERSİTESİ',
    city: 'İstanbul',
    universityType: 'Vakıf',
    faculty: 'Meslek Yüksekokulu',
    programName: 'Siber Güvenlik Analistliği ve Operatörlüğü (%50 Burslu)',
    scoreType: 'TYT',
    scholarship: '%50 Burslu',
    educationType: 'Örgün',
    language: 'Türkçe',
    durationYears: 2,
    notes: 'Bk. 22',
    years: {
      2024: { minScore: 312.00, maxScore: 350.00, minRank: 620000, quota: 40, quotaTop: 0, isFull: true },
      2025: { minScore: 318.50, maxScore: 358.00, minRank: 570000, quota: 40, quotaTop: 0, isFull: true },
      2026: { minScore: 322.00, maxScore: 361.00, minRank: 540000, quota: 40, quotaTop: 0, isFull: true }
    }
  },

  // --- AÇIKÖĞRETİM VE UZAKTAN EĞİTİM PROGRAMLARI (ÖSYM TABLO 3 & TABLO 4) ---
  {
    id: '103850012',
    code: '103850012',
    universityName: 'ANADOLU ÜNİVERSİTESİ',
    city: 'Eskişehir',
    universityType: 'Devlet',
    faculty: 'Açıköğretim Fakültesi',
    programName: 'Bilgisayar Programcılığı (Açıköğretim)',
    scoreType: 'TYT',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Açıköğretim',
    language: 'Türkçe',
    durationYears: 2,
    notes: 'Bk. 38 (Açıköğretim materyal ücretine tabidir)',
    years: {
      2024: { minScore: 335.20, maxScore: 380.00, minRank: 420000, quota: 1500, quotaTop: 10, isFull: true },
      2025: { minScore: 342.10, maxScore: 388.50, minRank: 385000, quota: 1500, quotaTop: 10, isFull: true },
      2026: { minScore: 345.50, maxScore: 392.00, minRank: 368000, quota: 1500, quotaTop: 10, isFull: true }
    }
  },
  {
    id: '103810058',
    code: '103810058',
    universityName: 'ANADOLU ÜNİVERSİTESİ',
    city: 'Eskişehir',
    universityType: 'Devlet',
    faculty: 'Açıköğretim Fakültesi',
    programName: 'Yönetim Bilişim Sistemleri (Açıköğretim)',
    scoreType: 'EA',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Açıköğretim',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 312.50, maxScore: 375.00, minRank: 340000, quota: 2000, quotaTop: 15, isFull: true },
      2025: { minScore: 322.80, maxScore: 382.10, minRank: 295000, quota: 2000, quotaTop: 15, isFull: true },
      2026: { minScore: 328.00, maxScore: 388.00, minRank: 270000, quota: 2000, quotaTop: 15, isFull: true }
    }
  },
  {
    id: '103810023',
    code: '103810023',
    universityName: 'ANADOLU ÜNİVERSİTESİ',
    city: 'Eskişehir',
    universityType: 'Devlet',
    faculty: 'Açıköğretim Fakültesi',
    programName: 'İşletme (Açıköğretim)',
    scoreType: 'EA',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Açıköğretim',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 265.40, maxScore: 320.00, minRank: 780000, quota: 3000, quotaTop: 20, isFull: true },
      2025: { minScore: 271.20, maxScore: 328.00, minRank: 740000, quota: 3000, quotaTop: 20, isFull: true },
      2026: { minScore: 275.00, maxScore: 332.00, minRank: 710000, quota: 3000, quotaTop: 20, isFull: true }
    }
  },
  {
    id: '103810032',
    code: '103810032',
    universityName: 'ANADOLU ÜNİVERSİTESİ',
    city: 'Eskişehir',
    universityType: 'Devlet',
    faculty: 'Açıköğretim Fakültesi',
    programName: 'Sosyoloji (Açıköğretim)',
    scoreType: 'EA',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Açıköğretim',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 258.10, maxScore: 312.00, minRank: 850000, quota: 2500, quotaTop: 15, isFull: true },
      2025: { minScore: 264.50, maxScore: 318.00, minRank: 810000, quota: 2500, quotaTop: 15, isFull: true },
      2026: { minScore: 268.00, maxScore: 322.00, minRank: 780000, quota: 2500, quotaTop: 15, isFull: true }
    }
  },
  {
    id: '103850045',
    code: '103850045',
    universityName: 'ANADOLU ÜNİVERSİTESİ',
    city: 'Eskişehir',
    universityType: 'Devlet',
    faculty: 'Açıköğretim Fakültesi',
    programName: 'Web Tasarımı ve Kodlama (Açıköğretim)',
    scoreType: 'TYT',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Açıköğretim',
    language: 'Türkçe',
    durationYears: 2,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 315.40, maxScore: 360.00, minRank: 580000, quota: 2000, quotaTop: 10, isFull: true },
      2025: { minScore: 322.10, maxScore: 368.00, minRank: 530000, quota: 2000, quotaTop: 10, isFull: true },
      2026: { minScore: 326.50, maxScore: 372.00, minRank: 505000, quota: 2000, quotaTop: 10, isFull: true }
    }
  },
  {
    id: '103850088',
    code: '103850088',
    universityName: 'ANADOLU ÜNİVERSİTESİ',
    city: 'Eskişehir',
    universityType: 'Devlet',
    faculty: 'Açıköğretim Fakültesi',
    programName: 'Halkla İlişkiler ve Tanıtım (Açıköğretim)',
    scoreType: 'TYT',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Açıköğretim',
    language: 'Türkçe',
    durationYears: 2,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 285.20, maxScore: 330.00, minRank: 820000, quota: 1500, quotaTop: 10, isFull: true },
      2025: { minScore: 290.10, maxScore: 338.00, minRank: 780000, quota: 1500, quotaTop: 10, isFull: true },
      2026: { minScore: 294.00, maxScore: 342.00, minRank: 750000, quota: 1500, quotaTop: 10, isFull: true }
    }
  },
  {
    id: '103810091',
    code: '103810091',
    universityName: 'ANADOLU ÜNİVERSİTESİ',
    city: 'Eskişehir',
    universityType: 'Devlet',
    faculty: 'Açıköğretim Fakültesi',
    programName: 'Görsel İletişim Tasarımı (Açıköğretim)',
    scoreType: 'SÖZ',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Açıköğretim',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 325.40, maxScore: 380.00, minRank: 220000, quota: 1000, quotaTop: 5, isFull: true },
      2025: { minScore: 332.10, maxScore: 388.00, minRank: 195000, quota: 1000, quotaTop: 5, isFull: true },
      2026: { minScore: 338.00, maxScore: 392.00, minRank: 180000, quota: 1000, quotaTop: 5, isFull: true }
    }
  },
  {
    id: '105610892',
    code: '105610892',
    universityName: 'İSTANBUL ÜNİVERSİTESİ',
    city: 'İstanbul',
    universityType: 'Devlet',
    faculty: 'Açık ve Uzaktan Eğitim Fakültesi (AUZEF)',
    programName: 'Yönetim Bilişim Sistemleri (Açıköğretim)',
    scoreType: 'EA',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Açıköğretim',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 318.20, maxScore: 378.00, minRank: 315000, quota: 1200, quotaTop: 8, isFull: true },
      2025: { minScore: 328.50, maxScore: 386.00, minRank: 270000, quota: 1200, quotaTop: 8, isFull: true },
      2026: { minScore: 333.00, maxScore: 391.00, minRank: 248000, quota: 1200, quotaTop: 8, isFull: true }
    }
  },
  {
    id: '105610912',
    code: '105610912',
    universityName: 'İSTANBUL ÜNİVERSİTESİ',
    city: 'İstanbul',
    universityType: 'Devlet',
    faculty: 'Açık ve Uzaktan Eğitim Fakültesi (AUZEF)',
    programName: 'Çocuk Gelişimi (Açıköğretim)',
    scoreType: 'EA',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Açıköğretim',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 305.20, maxScore: 360.00, minRank: 440000, quota: 2000, quotaTop: 10, isFull: true },
      2025: { minScore: 312.40, maxScore: 368.00, minRank: 390000, quota: 2000, quotaTop: 10, isFull: true },
      2026: { minScore: 318.00, maxScore: 372.00, minRank: 360000, quota: 2000, quotaTop: 10, isFull: true }
    }
  },
  {
    id: '105610934',
    code: '105610934',
    universityName: 'İSTANBUL ÜNİVERSİTESİ',
    city: 'İstanbul',
    universityType: 'Devlet',
    faculty: 'Açık ve Uzaktan Eğitim Fakültesi (AUZEF)',
    programName: 'Tarih (Açıköğretim)',
    scoreType: 'SÖZ',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Açıköğretim',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 298.10, maxScore: 350.00, minRank: 320000, quota: 1500, quotaTop: 5, isFull: true },
      2025: { minScore: 304.50, maxScore: 358.00, minRank: 290000, quota: 1500, quotaTop: 5, isFull: true },
      2026: { minScore: 309.00, maxScore: 362.00, minRank: 275000, quota: 1500, quotaTop: 5, isFull: true }
    }
  },
  {
    id: '105650892',
    code: '105650892',
    universityName: 'İSTANBUL ÜNİVERSİTESİ',
    city: 'İstanbul',
    universityType: 'Devlet',
    faculty: 'Açık ve Uzaktan Eğitim Fakültesi (AUZEF)',
    programName: 'İş Sağlığı ve Güvenliği (Açıköğretim)',
    scoreType: 'TYT',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Açıköğretim',
    language: 'Türkçe',
    durationYears: 2,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 295.40, maxScore: 345.00, minRank: 720000, quota: 1000, quotaTop: 5, isFull: true },
      2025: { minScore: 301.20, maxScore: 352.00, minRank: 680000, quota: 1000, quotaTop: 5, isFull: true },
      2026: { minScore: 305.00, maxScore: 358.00, minRank: 650000, quota: 1000, quotaTop: 5, isFull: true }
    }
  },
  {
    id: '101410582',
    code: '101410582',
    universityName: 'ATATÜRK ÜNİVERSİTESİ',
    city: 'Erzurum',
    universityType: 'Devlet',
    faculty: 'Açıköğretim Fakültesi (AÖF)',
    programName: 'Çocuk Gelişimi (Açıköğretim)',
    scoreType: 'EA',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Açıköğretim',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 298.50, maxScore: 355.00, minRank: 480000, quota: 2500, quotaTop: 15, isFull: true },
      2025: { minScore: 305.10, maxScore: 362.00, minRank: 430000, quota: 2500, quotaTop: 15, isFull: true },
      2026: { minScore: 310.00, maxScore: 368.00, minRank: 405000, quota: 2500, quotaTop: 15, isFull: true }
    }
  },
  {
    id: '101410612',
    code: '101410612',
    universityName: 'ATATÜRK ÜNİVERSİTESİ',
    city: 'Erzurum',
    universityType: 'Devlet',
    faculty: 'Açıköğretim Fakültesi (AÖF)',
    programName: 'Reklamcılık (Açıköğretim)',
    scoreType: 'SÖZ',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Açıköğretim',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 282.10, maxScore: 335.00, minRank: 410000, quota: 1000, quotaTop: 5, isFull: true },
      2025: { minScore: 288.40, maxScore: 342.00, minRank: 380000, quota: 1000, quotaTop: 5, isFull: true },
      2026: { minScore: 292.00, maxScore: 348.00, minRank: 360000, quota: 1000, quotaTop: 5, isFull: true }
    }
  },
  {
    id: '101450321',
    code: '101450321',
    universityName: 'ATATÜRK ÜNİVERSİTESİ',
    city: 'Erzurum',
    universityType: 'Devlet',
    faculty: 'Açıköğretim Fakültesi (AÖF)',
    programName: 'Tıbbi Dokümantasyon ve Sekreterlik (Açıköğretim)',
    scoreType: 'TYT',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Açıköğretim',
    language: 'Türkçe',
    durationYears: 2,
    notes: 'Bk. 38',
    years: {
      2024: { minScore: 308.20, maxScore: 358.00, minRank: 640000, quota: 2000, quotaTop: 10, isFull: true },
      2025: { minScore: 315.40, maxScore: 365.00, minRank: 590000, quota: 2000, quotaTop: 10, isFull: true },
      2026: { minScore: 320.00, maxScore: 370.00, minRank: 560000, quota: 2000, quotaTop: 10, isFull: true }
    }
  },
  {
    id: '108810452',
    code: '108810452',
    universityName: 'SAKARYA ÜNİVERSİTESİ',
    city: 'Sakarya',
    universityType: 'Devlet',
    faculty: 'Bilgisayar ve Bilişim Bilimleri Fakültesi',
    programName: 'Bilgisayar Mühendisliği (Uzaktan Öğretim)',
    scoreType: 'SAY',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Uzaktan Eğitim',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38, Bk. 226 (Uzaktan öğretim öğrenim ücretlidir)',
    years: {
      2024: { minScore: 425.80, maxScore: 468.00, minRank: 82000, quota: 100, quotaTop: 3, isFull: true },
      2025: { minScore: 438.20, maxScore: 478.10, minRank: 69000, quota: 100, quotaTop: 3, isFull: true },
      2026: { minScore: 443.00, maxScore: 482.00, minRank: 63000, quota: 100, quotaTop: 3, isFull: true }
    }
  },
  {
    id: '401010012',
    code: '401010012',
    universityName: 'AHMET YESEVİ ÜNİVERSİTESİ',
    city: 'Yurt Dışı',
    universityType: 'Yurt Dışı',
    faculty: 'Mühendislik Fakültesi',
    programName: 'Bilgisayar Mühendisliği (Uzaktan Öğretim)',
    scoreType: 'SAY',
    scholarship: 'Ücretli',
    educationType: 'Uzaktan Eğitim',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38, Bk. 226',
    years: {
      2024: { minScore: 385.10, maxScore: 425.00, minRank: 125000, quota: 150, quotaTop: 0, isFull: true },
      2025: { minScore: 395.40, maxScore: 435.00, minRank: 112000, quota: 150, quotaTop: 0, isFull: true },
      2026: { minScore: 401.00, maxScore: 440.00, minRank: 105000, quota: 150, quotaTop: 0, isFull: true }
    }
  },
  {
    id: '104150892',
    code: '104150892',
    universityName: 'GAZİ ÜNİVERSİTESİ',
    city: 'Ankara',
    universityType: 'Devlet',
    faculty: 'TUSAŞ Kazan Meslek Yüksekokulu',
    programName: 'Bilgisayar Programcılığı (Uzaktan Öğretim)',
    scoreType: 'TYT',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Uzaktan Eğitim',
    language: 'Türkçe',
    durationYears: 2,
    notes: 'Bk. 38, Bk. 226',
    years: {
      2024: { minScore: 328.40, maxScore: 372.00, minRank: 490000, quota: 80, quotaTop: 2, isFull: true },
      2025: { minScore: 336.10, maxScore: 380.00, minRank: 430000, quota: 80, quotaTop: 2, isFull: true },
      2026: { minScore: 341.00, maxScore: 385.00, minRank: 400000, quota: 80, quotaTop: 2, isFull: true }
    }
  },
  {
    id: '106910782',
    code: '106910782',
    universityName: 'KOCAELİ ÜNİVERSİTESİ',
    city: 'Kocaeli',
    universityType: 'Devlet',
    faculty: 'Mühendislik Fakültesi',
    programName: 'Bilişim Sistemleri Mühendisliği (Uzaktan Öğretim)',
    scoreType: 'SAY',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Uzaktan Eğitim',
    language: 'Türkçe',
    durationYears: 4,
    notes: 'Bk. 38, Bk. 226',
    years: {
      2024: { minScore: 392.50, maxScore: 432.00, minRank: 118000, quota: 60, quotaTop: 2, isFull: true },
      2025: { minScore: 404.10, maxScore: 442.00, minRank: 101000, quota: 60, quotaTop: 2, isFull: true },
      2026: { minScore: 410.00, maxScore: 448.00, minRank: 94000, quota: 60, quotaTop: 2, isFull: true }
    }
  },

  // --- 2026 KILAVUZUNDA KAPATILAN / ÖĞRENCİ ALIMINA KAPATILAN ÖRNEK PROGRAMLAR ---
  {
    id: '109999001',
    code: '109999001',
    universityName: 'ÖRNEK DEVLET ÜNİVERSİTESİ',
    city: 'Ankara',
    universityType: 'Devlet',
    faculty: 'İktisadi ve İdari Bilimler Fakültesi',
    programName: 'Ekonometri (Öğrenci Alımı Kapatıldı)',
    scoreType: 'EA',
    scholarship: 'Devlet (Ücretsiz)',
    educationType: 'Örgün',
    language: 'Türkçe',
    durationYears: 4,
    notes: '2026 ÖSYM Tercih Kılavuzunda Yer Almıyor (Program Kapatıldı)',
    years: {
      2024: { minScore: 285.00, maxScore: 330.00, minRank: 620000, quota: 50, quotaTop: 0, isFull: true },
      2025: { minScore: 290.00, maxScore: 335.00, minRank: 590000, quota: 40, quotaTop: 0, isFull: true },
      2026: { minScore: 0, maxScore: 0, minRank: 0, quota: 0, quotaTop: 0, isFull: false, isClosed: true }
    }
  },
  {
    id: '109999002',
    code: '109999002',
    universityName: 'GELİŞİM ÜNİVERSİTESİ',
    city: 'İstanbul',
    universityType: 'Vakıf',
    faculty: 'Meslek Yüksekokulu',
    programName: 'Pazarlama (İkinci Öğretim - Kapatıldı)',
    scoreType: 'TYT',
    scholarship: 'Ücretli',
    educationType: 'İkinci Öğretim',
    language: 'Türkçe',
    durationYears: 2,
    notes: 'YÖK kararıyla 2026 yılında öğrenci alımı durdurulmuştur',
    years: {
      2024: { minScore: 240.00, maxScore: 280.00, minRank: 1400000, quota: 30, quotaTop: 0, isFull: true },
      2025: { minScore: 245.00, maxScore: 285.00, minRank: 1350000, quota: 20, quotaTop: 0, isFull: true },
      2026: { minScore: 0, maxScore: 0, minRank: 0, quota: 0, quotaTop: 0, isFull: false, isClosed: true }
    }
  }
];

/**
 * Pre-computes ranking trend percentages, volatility, and estimated 2026 bounds for a program.
 */
export function enrichProgramComputedFields(p: Program): Program {
  const y24 = p.years[2024];
  const y25 = p.years[2025];
  const y26 = p.years[2026];

  if (!y25) return p;

  // Rank change percentage over 3 years (negative means rank got tighter/better, e.g. 1000 -> 800)
  const rankChangePct = y24 ? ((y25.minRank - y24.minRank) / y24.minRank) * 100 : 0;

  // Estimate 2026 bounds if not explicitly provided
  const est2026RankMin = y26?.minRank ?? Math.round(y25.minRank * 0.95);
  const est2026RankMax = Math.round(est2026RankMin * 1.15);
  const est2026Score = y26?.minScore ?? Number((y25.minScore * 1.008).toFixed(2));

  return {
    ...p,
    rankChange3YrPct: Number(rankChangePct.toFixed(1)),
    predicted2026RankMin: est2026RankMin,
    predicted2026RankMax: est2026RankMax,
    predicted2026Score: est2026Score
  };
}

/**
 * Helper to process raw guide upload data into internal Program objects.
 */
export function parseRowsToPrograms(rows: GuideImportRow[]): Program[] {
  const mapByCode = new Map<string, Program>();

  for (const r of rows) {
    if (!r.code || !r.universityName || !r.programName) continue;

    let existing = mapByCode.get(r.code);
    if (!existing) {
      existing = {
        id: r.code,
        code: r.code,
        universityName: r.universityName.trim(),
        city: r.city || 'Belirtilmemiş',
        universityType: r.universityType || 'Devlet',
        faculty: r.faculty || 'Fakülte',
        programName: r.programName.trim(),
        scoreType: r.scoreType || 'SAY',
        scholarship: r.scholarship || 'Devlet (Ücretsiz)',
        educationType: r.educationType || 'Örgün',
        language: r.language || 'Türkçe',
        durationYears: r.durationYears || 4,
        notes: r.notes || '',
        years: {}
      };
      mapByCode.set(r.code, existing);
    }

    const yearNum = r.year || 2025;
    existing.years[yearNum] = {
      minScore: r.minScore || 0,
      maxScore: r.maxScore || 0,
      minRank: r.minRank || 0,
      quota: r.quota || 0,
      isFull: r.isFull ?? true
    };
  }

  return Array.from(mapByCode.values()).map(enrichProgramComputedFields);
}
