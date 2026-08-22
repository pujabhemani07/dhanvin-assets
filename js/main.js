/* =============================================
   DHANVIN ASSETS – MAIN JS
   ============================================= */

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) setTimeout(() => loader.classList.add('hidden'), 600);
  initScrollProgress();
  initThemeToggle();
  initNavbar();
  initMobileMenu();
  initCounters();
  initSIPCalculator();
  initFAQ();
  initTestimonialSlider();
  initComparisonBars();
  initSmoothScroll();
  initBlogFilter();
  if (typeof AOS !== 'undefined') AOS.init({ duration: 700, once: true, offset: 80 });
});

/* ---- Scroll Progress ---- */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ---- Theme Toggle ---- */
function initThemeToggle() {
  const html = document.documentElement;
  const saved = localStorage.getItem('da-theme') || 'light';
  html.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('da-theme', next);
    updateThemeIcon(next);
  });
}
function updateThemeIcon(theme) {
  document.querySelectorAll('#theme-icon').forEach(el => {
    el.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  });
}

/* ---- Sticky Navbar ---- */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50), { passive: true });
}

/* ---- Mobile Menu ---- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('nav-menu');
  if (!hamburger || !menu) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
      hamburger.classList.remove('active');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
  menu.querySelectorAll('.dropdown').forEach(dd => {
    const toggle = dd.querySelector('.dropdown-toggle');
    if (toggle) toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) { e.preventDefault(); dd.classList.toggle('open'); }
    });
  });
}

/* ---- Counter Animations ---- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  const step = target / (1800 / 16);
  let current = 0;
  const t = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(t); }
    el.textContent = Math.floor(current).toLocaleString('en-IN');
  }, 16);
}

/* ---- SIP Calculator ---- */
let sipChart = null;
function initSIPCalculator() {
  if (!document.getElementById('sip-amount')) return;
  syncRange('sip-amount', 'sip-amount-val', calcSIP);
  syncRange('sip-years', 'sip-years-val', calcSIP);
  syncRange('sip-rate', 'sip-rate-val', calcSIP);
  calcSIP();
}
function syncRange(rangeId, inputId, fn) {
  const r = document.getElementById(rangeId), i = document.getElementById(inputId);
  if (!r || !i) return;
  r.addEventListener('input', () => { i.value = r.value; fn(); });
  i.addEventListener('input', () => { r.value = i.value; fn(); });
}
function calcSIP() {
  const P = parseFloat(document.getElementById('sip-amount-val').value) || 5000;
  const n = parseFloat(document.getElementById('sip-years-val').value) || 15;
  const r = parseFloat(document.getElementById('sip-rate-val').value) || 12;
  const mr = r / 100 / 12, mo = n * 12;
  const fv = P * (((Math.pow(1 + mr, mo) - 1) / mr) * (1 + mr));
  const invested = P * mo;
  const ret = fv - invested;
  setText('total-invested', '₹' + fmtINR(Math.round(invested)));
  setText('expected-returns', '₹' + fmtINR(Math.round(ret)));
  setText('total-value', '₹' + fmtINR(Math.round(fv)));
  drawSIPChart(Math.round(invested), Math.round(ret), n, P, r);
}
function setText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
function fmtINR(n) {
  if (n >= 10000000) return (n / 10000000).toFixed(2) + ' Cr';
  if (n >= 100000) return (n / 100000).toFixed(2) + ' L';
  return n.toLocaleString('en-IN');
}
function drawSIPChart(invested, returns, years, P, r) {
  const canvas = document.getElementById('sip-chart');
  if (!canvas || typeof Chart === 'undefined') return;
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const tc = dark ? '#b0aac8' : '#555770';
  const gc = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';
  const labels = [], dataInv = [], dataFV = [];
  for (let y = 1; y <= years; y++) {
    const mo = y * 12, mr = r / 100 / 12;
    labels.push('Yr ' + y);
    dataInv.push(Math.round(P * mo));
    dataFV.push(Math.round(P * (((Math.pow(1 + mr, mo) - 1) / mr) * (1 + mr))));
  }
  if (sipChart) sipChart.destroy();
  sipChart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: { labels, datasets: [
      { label: 'Total Invested', data: dataInv, backgroundColor: 'rgba(36,72,216,0.7)', borderRadius: 4 },
      { label: 'Expected Value', data: dataFV, backgroundColor: 'rgba(75,46,131,0.85)', borderRadius: 4 }
    ]},
    options: { responsive: true, interaction: { mode: 'index' },
      scales: {
        x: { grid: { color: gc }, ticks: { color: tc, maxTicksLimit: 10 } },
        y: { grid: { color: gc }, ticks: { color: tc, callback: v => v >= 1e7 ? (v/1e7).toFixed(1)+'Cr' : v >= 1e5 ? (v/1e5).toFixed(0)+'L' : v } }
      },
      plugins: { legend: { labels: { color: tc } }, tooltip: { callbacks: { label: ctx => ctx.dataset.label + ': ₹' + fmtINR(ctx.parsed.y) } } }
    }
  });
}

/* ---- FAQ ---- */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
}

/* ---- Testimonial Slider ---- */
function initTestimonialSlider() {
  const track = document.getElementById('testimonial-track');
  if (!track) return;
  const cards = track.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  let cur = 0, timer;
  function goTo(i) {
    cur = (i + cards.length) % cards.length;
    track.style.transform = `translateX(-${cur * 100}%)`;
    dots.forEach((d, idx) => d.classList.toggle('active', idx === cur));
  }
  function start() { timer = setInterval(() => goTo(cur + 1), 5000); }
  function stop() { clearInterval(timer); }
  const prev = document.getElementById('prev-btn'), next = document.getElementById('next-btn');
  if (prev) prev.addEventListener('click', () => { stop(); goTo(cur - 1); start(); });
  if (next) next.addEventListener('click', () => { stop(); goTo(cur + 1); start(); });
  dots.forEach(d => d.addEventListener('click', () => { stop(); goTo(+d.getAttribute('data-index')); start(); }));
  start();
}

/* ---- Comparison Bars ---- */
function initComparisonBars() {
  const bars = document.querySelectorAll('.comp-bar');
  const vals = document.querySelectorAll('.comp-corpus-val');
  if (!bars.length) return;
  const section = document.querySelector('.comparison-grid');
  if (!section) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      bars.forEach(b => setTimeout(() => { b.style.width = b.getAttribute('data-width') + '%'; }, 200));
      vals.forEach(v => {
        const target = parseFloat(v.getAttribute('data-value'));
        let cur = 0;
        const t = setInterval(() => {
          cur += target / 60;
          if (cur >= target) { cur = target; clearInterval(t); }
          v.textContent = '₹' + cur.toFixed(2) + ' Cr';
        }, 25);
      });
      obs.disconnect();
    });
  }, { threshold: 0.3 });
  obs.observe(section);
}

/* ---- Smooth Scroll ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

/* ---- Blog Filter ---- */
function initBlogFilter() {
  const btns = document.querySelectorAll('.cat-btn');
  const cards = document.querySelectorAll('.blog-card');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-cat');
      cards.forEach(card => {
        card.style.display = (cat === 'all' || card.getAttribute('data-cat') === cat) ? 'block' : 'none';
      });
    });
  });
  const search = document.getElementById('blog-search');
  if (search) search.addEventListener('input', () => {
    const q = search.value.toLowerCase();
    cards.forEach(card => { card.style.display = card.textContent.toLowerCase().includes(q) ? 'block' : 'none'; });
  });
}

/* ---- Calc Tabs (calculators page) ---- */
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.calc-tab');
  const panels = document.querySelectorAll('.calc-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('panel-' + tab.getAttribute('data-tab'));
      if (panel) panel.classList.add('active');
    });
  });
  const hash = window.location.hash.replace('#', '');
  if (hash) { const t = document.querySelector(`.calc-tab[data-tab="${hash}"]`); if (t) t.click(); }
  else { const first = document.querySelector('.calc-tab'); if (first) first.click(); }
});
