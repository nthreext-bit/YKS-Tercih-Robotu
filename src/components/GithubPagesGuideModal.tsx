import React, { useState } from 'react';
import { X, Github, Copy, Check, ExternalLink, Terminal, Code2, Globe, Rocket, HelpCircle, AlertCircle } from 'lucide-react';

interface GithubPagesGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GithubPagesGuideModal: React.FC<GithubPagesGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      step: '1',
      title: 'GitHub Reposu Oluşturun',
      desc: 'GitHub hesabınıza girin ve new repository butonuna tıklayarak projeniz için yeni bir repository oluşturun (Örn: yks-tercih-robotu).',
      code: 'git init\ngit add .\ngit commit -m "Initial commit"\ngit branch -M main\ngit remote add origin https://github.com/KULLANICI_ADI/yks-tercih-robotu.git\ngit push -u origin main'
    },
    {
      step: '2',
      title: 'vite.config.ts İçinde base: "./" Ayarı (Hazır Ve Yapılandırılmış)',
      desc: 'Projenizdeki vite.config.ts dosyasına base: "./" ayarı eklenmiştir. Bu bağıl yol sayesinde repository adınızı manuel yazmakla UĞRAŞMANIZA GEREK KALMAZ! Siteniz her türlü repo adında sorunsuz çalışır.',
      code: `// vite.config.ts (Projenizde zaten tanımlı)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // <- Göreceli yol: Repository adı ne olursa olsun otomatik çalışır!
});`
    },
    {
      step: '3',
      title: 'gh-pages Paketini Yükleyin ve package.json Scriptlerini Ekleyin',
      desc: 'Otomatik derleme ve yayınlama için gh-pages kütüphanesini devDependency olarak yükleyin.',
      code: `npm install gh-pages --save-dev

// package.json scripts bölümüne ekleyin:
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}`
    },
    {
      step: '4',
      title: 'GitHub Pages\'e Tek Komutla Yayına Alın!',
      desc: 'Terminalinizde aşağıdaki komutu çalıştırarak sitenizi derleyip gh-pages dalına gönderin.',
      code: 'npm run deploy'
    },
    {
      step: '5',
      title: 'GitHub Settings Üzerinden Yayın Durumunu Kontrol Edin',
      desc: 'Repository sayfanızda Settings -> Pages sekmesine gidin. Source seçeneğini "Deploy from a branch" -> "gh-pages" -> "/ (root)" olarak seçip kaydedin.',
      code: 'Siteniz hazır! Bağlantınız:\nhttps://KULLANICI_ADI.github.io/yks-tercih-robotu/?min=1000&max=50000'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Github className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                GitHub Pages Ücretsiz Yayınlama Rehberi
              </h2>
              <p className="text-xs text-slate-300">
                Uygulamanızı ve filtreli URL bağlantılarınızı GitHub Pages üzerinde ücretsiz canlıya alın.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-xs text-blue-900 flex items-start gap-3">
            <Globe className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-1">Dinamik URL Filtre Parametreleri Desteği (Örn: ?min=200&max=10000)</p>
              <p className="text-blue-800">
                Tıpkı paylaştığınız bağlantı gibi, bu uygulamada uyguladığınız tüm filtreler (Başarı Sıralaması min/max, Puan Türü, Şehir, Üniversite vb.) doğrudan URL adres çubuğuna aktarılır. GitHub Pages üzerinde de bu bağlantıları başkalarıyla doğrudan paylaşabilirsiniz!
              </p>
            </div>
          </div>

          {/* Steps List */}
          <div className="space-y-5">
            {steps.map((s, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {s.step}
                    </span>
                    {s.title}
                  </h3>

                  <button
                    onClick={() => copyToClipboard(s.code, idx)}
                    className="flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-blue-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Kopyalandı
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Kopyala
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-600">{s.desc}</p>

                <div className="bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-[11px] overflow-x-auto">
                  <pre className="whitespace-pre-wrap">{s.code}</pre>
                </div>
              </div>
            ))}
          </div>

          {/* Additional GitHub Actions alternative */}
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-950 space-y-2">
            <h4 className="font-bold flex items-center gap-2 text-emerald-900">
              <Rocket className="w-4 h-4 text-emerald-600" />
              GitHub Actions Otomatik Deployment Yeteneği Hazır!
            </h4>
            <p className="text-emerald-900">
              Projenizde <code className="bg-emerald-100 px-1.5 py-0.5 rounded text-[11px] font-bold">.github/workflows/deploy.yml</code> dosyası oluşturulmuştur.
            </p>
            <p className="text-emerald-800">
              GitHub repository'nizin <strong>Settings &rarr; Pages</strong> ayarlarından Build and deployment kaynağını <strong>"GitHub Actions"</strong> olarak seçtiğinizde, her <code className="font-bold">main</code> dalına yapılan <code className="font-bold">git push</code> işleminde siteniz otomatik derlenip yayına alınacaktır.
            </p>
          </div>

          {/* PowerShell npm error troubleshooting */}
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-xs text-rose-950 space-y-2">
            <h4 className="font-bold flex items-center gap-2 text-rose-900">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              "npm : The term 'npm' is not recognized" Hatası Çözümü
            </h4>
            <p className="text-rose-900 leading-relaxed">
              Bu hata bilgisayarınızda (Windows/PowerShell) <strong>Node.js</strong> ve <strong>Git</strong> yazılımlarının henüz yüklü olmadığını gösterir.
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-rose-900 font-medium">
              <li><a href="https://nodejs.org/" target="_blank" rel="noreferrer" className="underline font-bold text-blue-700">nodejs.org</a> adresinden Node.js (LTS sürümü) indirin ve kurun.</li>
              <li><a href="https://git-scm.com/" target="_blank" rel="noreferrer" className="underline font-bold text-blue-700">git-scm.com</a> adresinden Git indirin ve kurun.</li>
              <li>PowerShell veya terminal pencerenizi kapatıp yeniden açın.</li>
            </ol>
            <p className="text-rose-800 pt-1 font-semibold">
              💡 İpucu: Hiç komut satırı ile uğraşmak istemiyorsanız <strong>GitHub Desktop</strong> uygulamasını (<a href="https://desktop.github.com" target="_blank" rel="noreferrer" className="underline text-blue-700">desktop.github.com</a>) indirip sol üstteki "Add Local Repository" butonuyla projenizi seçerek tek tıkla GitHub'a yükleyebilirsiniz!
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all"
          >
            Anladım, Kapat
          </button>
        </div>

      </div>
    </div>
  );
};
