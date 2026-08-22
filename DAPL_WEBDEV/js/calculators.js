/* =============================================
   DHANVIN ASSETS – CALCULATORS JS
   ============================================= */

function fmtC(n) {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr';
  if (n >= 100000) return '₹' + (n / 100000).toFixed(2) + ' L';
  return '₹' + Math.round(n).toLocaleString('en-IN');
}
function syncR(rId, iId, fn) {
  const r = document.getElementById(rId), i = document.getElementById(iId);
  if (!r || !i) return;
  r.addEventListener('input', () => { i.value = r.value; fn(); });
  i.addEventListener('input', () => { r.value = i.value; fn(); });
}
function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }
function chartColors() {
  return { text: isDark() ? '#b0aac8' : '#555770', grid: isDark() ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)' };
}

document.addEventListener('DOMContentLoaded', () => {
  initEMI(); initRetirement(); initEducation(); initGoal();
});

/* ---- EMI ---- */
let emiChart = null;
function initEMI() {
  syncR('emi-loan','emi-loan-val', calcEMI);
  syncR('emi-rate','emi-rate-val', calcEMI);
  syncR('emi-tenure','emi-tenure-val', calcEMI);
  calcEMI();
}
function calcEMI() {
  const P = +document.getElementById('emi-loan-val')?.value || 1000000;
  const r = (+document.getElementById('emi-rate-val')?.value) / 100 / 12;
  const n = (+document.getElementById('emi-tenure-val')?.value) * 12;
  const emi = P * r * Math.pow(1+r,n) / (Math.pow(1+r,n)-1);
  const total = emi * n, interest = total - P;
  const s = id => document.getElementById(id);
  if (s('emi-monthly')) s('emi-monthly').textContent = fmtC(emi);
  if (s('emi-interest')) s('emi-interest').textContent = fmtC(interest);
  if (s('emi-total')) s('emi-total').textContent = fmtC(total);
  drawDonut('emi-chart', emiChart, v => emiChart = v, ['Principal','Interest'], [Math.round(P), Math.round(interest)], ['#4B2E83','#D4AF37']);
}

/* ---- Retirement ---- */
let retChart = null;
function initRetirement() {
  syncR('ret-current-age','ret-current-age-val', calcRetirement);
  syncR('ret-retire-age','ret-retire-age-val', calcRetirement);
  syncR('ret-expenses','ret-expenses-val', calcRetirement);
  syncR('ret-return','ret-return-val', calcRetirement);
  calcRetirement();
}
function calcRetirement() {
  const curAge = +document.getElementById('ret-current-age-val')?.value || 30;
  const retAge = +document.getElementById('ret-retire-age-val')?.value || 60;
  const expenses = +document.getElementById('ret-expenses-val')?.value || 50000;
  const ret = +document.getElementById('ret-return-val')?.value / 100;
  const yrs = Math.max(1, retAge - curAge);
  const inflation = 0.06, lifeExp = 85;
  const retYrs = Math.max(1, lifeExp - retAge);
  const futExp = expenses * Math.pow(1 + inflation, yrs) * 12;
  const rr = (ret - inflation) / (1 + inflation);
  const corpus = Math.abs(rr) < 0.0001 ? futExp * retYrs : futExp * (1 - Math.pow(1+rr,-retYrs)) / rr;
  const mr = ret / 12, months = yrs * 12;
  const sip = corpus * mr / (Math.pow(1+mr,months) - 1);
  const invested = sip * months;
  const s = id => document.getElementById(id);
  if (s('ret-corpus')) s('ret-corpus').textContent = fmtC(corpus);
  if (s('ret-sip')) s('ret-sip').textContent = fmtC(sip);
  if (s('ret-invested')) s('ret-invested').textContent = fmtC(invested);
  drawDonut('ret-chart', retChart, v => retChart = v, ['Total Invested','Wealth Gained'], [Math.round(invested), Math.max(0,Math.round(corpus-invested))], ['#2448D8','#4B2E83']);
}

/* ---- Education ---- */
let eduChart = null;
function initEducation() {
  syncR('edu-child-age','edu-child-age-val', calcEducation);
  syncR('edu-target-age','edu-target-age-val', calcEducation);
  syncR('edu-cost','edu-cost-val', calcEducation);
  syncR('edu-return','edu-return-val', calcEducation);
  calcEducation();
}
function calcEducation() {
  const cAge = +document.getElementById('edu-child-age-val')?.value || 5;
  const tAge = +document.getElementById('edu-target-age-val')?.value || 18;
  const cost = +document.getElementById('edu-cost-val')?.value || 2000000;
  const ret = +document.getElementById('edu-return-val')?.value / 100;
  const yrs = Math.max(1, tAge - cAge);
  const future = cost * Math.pow(1.10, yrs);
  const mr = ret / 12, months = yrs * 12;
  const sip = future * mr / ((Math.pow(1+mr,months)-1) * (1+mr));
  const invested = sip * months;
  const s = id => document.getElementById(id);
  if (s('edu-future-cost')) s('edu-future-cost').textContent = fmtC(future);
  if (s('edu-sip')) s('edu-sip').textContent = fmtC(sip);
  if (s('edu-total')) s('edu-total').textContent = fmtC(invested);
  drawDonut('edu-chart', eduChart, v => eduChart = v, ['You Invest','Returns'], [Math.round(invested), Math.max(0,Math.round(future-invested))], ['#4B2E83','#D4AF37']);
}

/* ---- Goal Planner ---- */
let goalChart = null;
function initGoal() {
  syncR('goal-amount','goal-amount-val', calcGoal);
  syncR('goal-years','goal-years-val', calcGoal);
  syncR('goal-return','goal-return-val', calcGoal);
  calcGoal();
}
function calcGoal() {
  const target = +document.getElementById('goal-amount-val')?.value || 2000000;
  const yrs = +document.getElementById('goal-years-val')?.value || 10;
  const ret = +document.getElementById('goal-return-val')?.value / 100;
  const mr = ret / 12, months = yrs * 12;
  const sip = target * mr / ((Math.pow(1+mr,months)-1) * (1+mr));
  const invested = sip * months;
  const s = id => document.getElementById(id);
  if (s('goal-sip')) s('goal-sip').textContent = fmtC(sip);
  if (s('goal-invested')) s('goal-invested').textContent = fmtC(invested);
  if (s('goal-gains')) s('goal-gains').textContent = fmtC(Math.max(0,target-invested));
  drawDonut('goal-chart', goalChart, v => goalChart = v, ['Total Invested','Wealth Gains'], [Math.round(invested), Math.max(0,Math.round(target-invested))], ['#2448D8','#4B2E83']);
}

/* ---- Shared Donut ---- */
function drawDonut(canvasId, existingChart, setter, labels, data, colors) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof Chart === 'undefined') return;
  if (existingChart) existingChart.destroy();
  const { text } = chartColors();
  setter(new Chart(canvas.getContext('2d'), {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0 }] },
    options: { responsive: true, cutout: '65%', plugins: { legend: { labels: { color: text } }, tooltip: { callbacks: { label: ctx => ctx.label + ': ' + fmtC(ctx.raw) } } } }
  }));
}
