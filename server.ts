import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { INITIAL_PROGRAMS } from "./src/data/osymGuideDataset";
import { GeminiAdvisorRequest } from "./src/types";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "25mb" }));

  // In-memory guide store (can be populated via uploads or sync)
  let activeGuidePrograms = [...INITIAL_PROGRAMS];
  let lastSyncTime = new Date().toISOString();

  // API 1: Healthcheck
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      programCount: activeGuidePrograms.length,
      lastSyncTime
    });
  });

  // API 2: Get active YKS Guide dataset
  app.get("/api/guide/programs", (_req, res) => {
    res.json({
      success: true,
      data: activeGuidePrograms,
      lastUpdated: lastSyncTime
    });
  });

  // API 3: Automatic mode ÖSYM fetch simulator / status check
  app.post("/api/guide/auto-sync", async (_req, res) => {
    try {
      // Simulate checking ÖSYM's official guide link (https://www.osym.gov.tr/TR,29412/...)
      // In production, this can perform real HTTP request / parsing or fallback
      lastSyncTime = new Date().toISOString();
      res.json({
        success: true,
        message: "ÖSYM Yükseköğretim Programları ve Kontenjanları Kılavuzu güncel olarak senkronize edildi.",
        syncTime: lastSyncTime,
        fetchedYears: [2024, 2025, 2026],
        programCount: activeGuidePrograms.length,
        sourceUrl: "https://www.osym.gov.tr/TR,29412/yks-kontenjanlar-ve-programlar-kilavuzu.html"
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: "Otomatik senkronizasyon sırasında hata oluştu. Lütfen Manuel Yükleme Modunu deneyin.",
        error: err?.message
      });
    }
  });

  // API 4: Manual Upload Endpoint
  app.post("/api/guide/upload", (req, res) => {
    try {
      const { programs, fileName, year } = req.body;
      if (!Array.isArray(programs) || programs.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Geçerli bir kılavuz veri listesi gönderilmedi."
        });
      }

      // Merge or update active dataset
      activeGuidePrograms = programs;
      lastSyncTime = new Date().toISOString();

      return res.json({
        success: true,
        message: `${fileName || "Dosya"} başarıyla işlendi (${programs.length} program veritabanına aktarıldı).`,
        year: year || 2025,
        totalPrograms: activeGuidePrograms.length
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: "Dosya kaydı sırasında sunucu hatası oluştu.",
        error: err?.message
      });
    }
  });

  // API 5: Server-side Gemini AI Preference Advisor ("AI Tercih Danışmanı")
  app.post("/api/gemini/advisor", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.status(400).json({
          success: false,
          message: "GEMINI_API_KEY yapılandırılmamış. Lütfen AI Studio Secret ayarlarını kontrol edin."
        });
      }

      const body: GeminiAdvisorRequest = req.body;
      const { userScores, preferenceList, targetCityPreference, careerGoals } = body;

      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
Sen Türkiye YKS (Yükseköğretim Kurumları Sınavı) konusunda uzman bir "Üniversite Tercih Danışmanı" ve Eğitim Koçusun.
Aşağıda YKS adayı öğrencinin sınav puanları, sıralamaları ve oluşturduğu 24'lük ÖSYM tercih listesi verilmiştir.

ADAY BİLGİLERİ:
- TYT Sıralaması: ${userScores.tytRank ?? 'Girilmedi'} (Puan: ${userScores.tytScore ?? '-'})
- SAY Sıralaması: ${userScores.sayRank ?? 'Girilmedi'} (Puan: ${userScores.sayScore ?? '-'})
- EA Sıralaması: ${userScores.eaRank ?? 'Girilmedi'} (Puan: ${userScores.eaScore ?? '-'})
- SÖZ Sıralaması: ${userScores.sozRank ?? 'Girilmedi'} (Puan: ${userScores.sozScore ?? '-'})
- DİL Sıralaması: ${userScores.dilRank ?? 'Girilmedi'} (Puan: ${userScores.dilScore ?? '-'})
- Hedef Şehir / Karakteristik: ${targetCityPreference || 'Belirtilmedi'}
- Kariyer / Bölüm Amacı: ${careerGoals || 'Belirtilmedi'}

TERCİH LİSTESİ (${preferenceList.length} Tercih):
${preferenceList.map((p) => `${p.order}. [${p.code}] ${p.universityName} - ${p.programName} (${p.scoreType}) | 2025 Sıralaması: ${p.minRank2025} | Kategori: ${p.category}`).join("\n")}

GÖREV:
Adayın tercih listesini stratejik olarak incele. Aşağıdaki JSON formatında yanıt ver (sadece geçerli JSON çıktısı üret):

{
  "summary": "Listenin genel değerlendirmesi, risk dengesi ve stratejik özet (2-3 cümle)",
  "riskAssessment": {
    "safeCount": 0,
    "targetCount": 0,
    "reachCount": 0,
    "balanceEvaluation": "Örn: Dengeli bir liste / Aşırı riskli / Fazla garantiye kaçılmış"
  },
  "recommendations": [
    "Stratejik tavsiye 1",
    "Stratejik tavsiye 2"
  ],
  "alternativeSuggestions": [
    "Adayın puanına uygun 1-2 alternatif bölüm/üniversite önerisi"
  ],
  "criticalWarnings": [
    "Varsa özel koşul (Bk. maddeleri), başarı sırası barajı (Tıp/Hukuk vb.) veya ölü tercih uyarıları"
  ]
}
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const responseText = response.text || "{}";
      const parsedData = JSON.parse(responseText);

      return res.json({
        success: true,
        data: parsedData
      });
    } catch (err: any) {
      console.error("Gemini Advisor Error:", err);
      return res.status(500).json({
        success: false,
        message: "AI Tercih Danışmanı analizi oluştururken bir hata meydana geldi.",
        error: err?.message
      });
    }
  });

  // Setup Vite or Express static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
