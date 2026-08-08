import { CalculatorInput, UserScores } from '../types';

/**
 * Calculates net count (Correct - Incorrect / 4)
 */
export function calcNet(correct: number, incorrect: number): number {
  const net = correct - (incorrect / 4);
  return Math.max(0, Number(net.toFixed(2)));
}

/**
 * Estimates YKS scores and ranks based on standard ÖSYM bell-curve formulas.
 */
export function calculateYksScores(input: CalculatorInput): UserScores {
  const { obp, isPreviousYearPlaced, tyt, ayt } = input;

  // 1. Calculate Nets
  const turkceNet = calcNet(tyt.turkceD, tyt.turkceY);
  const sosyalNet = calcNet(tyt.sosyalD, tyt.sosyalY);
  const matNet = calcNet(tyt.matD, tyt.matY);
  const fenNet = calcNet(tyt.fenD, tyt.fenY);

  const totalTytNet = turkceNet + sosyalNet + matNet + fenNet;

  // AYT Nets
  const aytMatNet = calcNet(ayt.matD, ayt.matY);
  const aytFizikNet = calcNet(ayt.fizikD, ayt.fizikY);
  const aytKimyaNet = calcNet(ayt.kimyaD, ayt.kimyaY);
  const aytBiyoNet = calcNet(ayt.biyoD, ayt.biyoY);

  const aytEdebiyatNet = calcNet(ayt.edebiyatD, ayt.edebiyatY);
  const aytTarih1Net = calcNet(ayt.tarih1D, ayt.tarih1Y);
  const aytCog1Net = calcNet(ayt.cog1D, ayt.cog1Y);

  const aytTarih2Net = calcNet(ayt.tarih2D, ayt.tarih2Y);
  const aytCog2Net = calcNet(ayt.cog2D, ayt.cog2Y);
  const aytFelsefeNet = calcNet(ayt.felsefeD, ayt.felsefeY);
  const aytDinNet = calcNet(ayt.dinD, ayt.dinY);

  const ydtNet = calcNet(ayt.ydtD, ayt.ydtY);

  // 2. OBP Contribution (Diploma grade 50-100 mapped to 250-500 OBP points, factor 0.12 or 0.06)
  const obpFactor = isPreviousYearPlaced ? 0.06 : 0.12;
  const obpPoints = obp * 5 * obpFactor; // Max 60 pts normal, 30 pts if kırık

  // 3. Raw Scores (100 Base Points)
  // TYT Raw (Max 400 from nets + 100 base = 500 max raw)
  const tytRaw = 100 + (turkceNet * 1.32) + (sosyalNet * 1.36) + (matNet * 1.32) + (fenNet * 1.36);
  const tytYerlestirme = Math.min(500, Number((tytRaw + obpPoints).toFixed(2)));

  // SAY Raw: 40% TYT + 60% AYT SAY
  const sayAytNets = (aytMatNet * 3.0) + (aytFizikNet * 2.85) + (aytKimyaNet * 3.07) + (aytBiyoNet * 3.07);
  const sayRaw = 100 + (tytRaw - 100) * 0.4 + (sayAytNets * 0.72);
  const sayYerlestirme = Math.min(500, Number((sayRaw + obpPoints).toFixed(2)));

  // EA Raw: 40% TYT + 60% AYT EA
  const eaAytNets = (aytMatNet * 3.0) + (aytEdebiyatNet * 3.0) + (aytTarih1Net * 2.8) + (aytCog1Net * 3.33);
  const eaRaw = 100 + (tytRaw - 100) * 0.4 + (eaAytNets * 0.72);
  const eaYerlestirme = Math.min(500, Number((eaRaw + obpPoints).toFixed(2)));

  // SÖZ Raw: 40% TYT + 60% AYT SÖZ
  const sozAytNets = (aytEdebiyatNet * 3.0) + (aytTarih1Net * 2.8) + (aytCog1Net * 3.33) + 
                     (aytTarih2Net * 2.91) + (aytCog2Net * 2.91) + (aytFelsefeNet * 3.0) + (aytDinNet * 3.33);
  const sozRaw = 100 + (tytRaw - 100) * 0.4 + (sozAytNets * 0.72);
  const sozYerlestirme = Math.min(500, Number((sozRaw + obpPoints).toFixed(2)));

  // DİL Raw: 40% TYT + 60% YDT
  const dilAytNets = ydtNet * 3.75;
  const dilRaw = 100 + (tytRaw - 100) * 0.4 + (dilAytNets * 0.72);
  const dilYerlestirme = Math.min(500, Number((dilRaw + obpPoints).toFixed(2)));

  // 4. Ranking Estimates
  const tytRank = estimateRank(tytYerlestirme, 'TYT');
  const sayRank = estimateRank(sayYerlestirme, 'SAY');
  const eaRank = estimateRank(eaYerlestirme, 'EA');
  const sozRank = estimateRank(sozYerlestirme, 'SÖZ');
  const dilRank = estimateRank(dilYerlestirme, 'DİL');

  return {
    tytScore: tytYerlestirme,
    sayScore: sayYerlestirme,
    eaScore: eaYerlestirme,
    sozScore: sozYerlestirme,
    dilScore: dilYerlestirme,

    tytRank,
    sayRank,
    eaRank,
    sozRank,
    dilRank,

    obp,
    isPreviousYearPlaced
  };
}

/**
 * Maps score to realistic percentile / ranking in YKS distribution.
 */
function estimateRank(score: number, type: 'TYT' | 'SAY' | 'EA' | 'SÖZ' | 'DİL'): number {
  if (score < 150) return 2500000;

  if (type === 'SAY') {
    if (score >= 545) return Math.round(500 - (score - 545) * 50);
    if (score >= 500) return Math.round(10000 - (score - 500) * 200);
    if (score >= 450) return Math.round(40000 - (score - 450) * 600);
    if (score >= 400) return Math.round(95000 - (score - 400) * 1100);
    if (score >= 350) return Math.round(180000 - (score - 350) * 1700);
    if (score >= 300) return Math.round(320000 - (score - 300) * 2800);
    return Math.round(750000 - (score - 200) * 4300);
  }

  if (type === 'EA') {
    if (score >= 510) return Math.round(300 - (score - 510) * 40);
    if (score >= 460) return Math.round(2500 - (score - 460) * 44);
    if (score >= 420) return Math.round(15000 - (score - 420) * 310);
    if (score >= 380) return Math.round(50000 - (score - 380) * 875);
    if (score >= 340) return Math.round(120000 - (score - 340) * 1750);
    if (score >= 300) return Math.round(250000 - (score - 300) * 3250);
    return Math.round(600000 - (score - 200) * 3500);
  }

  if (type === 'SÖZ') {
    if (score >= 470) return Math.round(500 - (score - 470) * 80);
    if (score >= 430) return Math.round(5000 - (score - 430) * 110);
    if (score >= 380) return Math.round(30000 - (score - 380) * 500);
    if (score >= 330) return Math.round(90000 - (score - 330) * 1200);
    return Math.round(400000 - (score - 200) * 3100);
  }

  if (type === 'DİL') {
    if (score >= 490) return Math.round(800 - (score - 490) * 100);
    if (score >= 450) return Math.round(4000 - (score - 450) * 80);
    if (score >= 400) return Math.round(12000 - (score - 400) * 160);
    if (score >= 350) return Math.round(25000 - (score - 350) * 260);
    return Math.round(75000 - (score - 200) * 330);
  }

  // TYT Default
  if (score >= 480) return Math.round(2000 - (score - 480) * 300);
  if (score >= 420) return Math.round(50000 - (score - 420) * 800);
  if (score >= 350) return Math.round(250000 - (score - 350) * 2800);
  if (score >= 300) return Math.round(550000 - (score - 300) * 6000);
  return Math.round(1800000 - (score - 200) * 12500);
}
