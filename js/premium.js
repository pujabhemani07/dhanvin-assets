/* DHANVIN ASSETS — PREMIUM INTERACTIONS
   Custom cursor (₹ coin + spark trail), card tilt/glare, magnetic buttons,
   hero parallax and scroll-reveal. Brand colours only.
   Everything is progressive: touch devices and reduced-motion users get
   the normal site with no custom cursor and no motion effects. */
(function () {
  'use strict';
  if (window.__pfPremium) return;
  window.__pfPremium = true;

  var d = document, w = window, root = d.documentElement;
  var mq = function (q) { return w.matchMedia && w.matchMedia(q).matches; };
  var reduce = mq('(prefers-reduced-motion: reduce)');
  var fine = mq('(hover: hover) and (pointer: fine)');
  var COLORS = ['#2448D8', '#48D3C6', '#4B2E83'];   // brand blue / teal / purple (no gold)

  function ready(fn) { d.readyState === 'loading' ? d.addEventListener('DOMContentLoaded', fn) : fn(); }
  function mk(tag, cls, parent) { var e = d.createElement(tag); e.className = cls; e.setAttribute('aria-hidden', 'true'); (parent || d.body).appendChild(e); return e; }

  /* ================= CUSTOM CURSOR =================
     Spinning gradient ring + comet tail + ₹ coins / rising arrows /
     sparkles. Brand blue, teal and purple only. */
  function initCursor() {
    if (!fine || reduce) return;
    var dot = mk('div', 'pf-cursor-dot');
    var ring = mk('div', 'pf-cursor-ring');
    var label = d.createElement('span'); ring.appendChild(label);
    // Lightweight cursor: no full-screen canvas or per-frame particle rendering.
    var cv = null, ctx = null;

    var mx = -100, my = -100, live = false;
    function moveCursor(x, y) {
      var pos = 'translate3d(' + x + 'px,' + y + 'px,0)';
      dot.style.transform = pos;
      ring.style.transform = pos;
    }
    d.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      if (!live) { live = true; root.classList.add('pf-cursor-on', 'pf-cursor-active'); }
      moveCursor(mx, my);
    }, { passive: true });

    function ripple(x, y, cls) { var rp = mk('div', 'pf-ripple' + (cls ? ' ' + cls : '')); rp.style.left = x + 'px'; rp.style.top = y + 'px'; setTimeout(function () { rp.remove(); }, 900); }
    d.addEventListener('mousedown', function (e) {
      root.classList.add('pf-state-down'); ring.style.scale = '.88';
      ripple(e.clientX, e.clientY);
    });
    d.addEventListener('mouseup', function () { root.classList.remove('pf-state-down'); ring.style.scale = ''; });
    root.addEventListener('mouseleave', function () { root.classList.add('pf-cursor-hide'); });
    root.addEventListener('mouseenter', function () { root.classList.remove('pf-cursor-hide'); });
    w.addEventListener('blur', function () { root.classList.add('pf-cursor-hide'); });
    w.addEventListener('focus', function () { root.classList.remove('pf-cursor-hide'); });

    var LINK = 'a[href],button,[role="button"],summary,label[for],.btn,.consult,.primary,.secondary,input[type="range"],input[type="submit"],input[type="button"],.nav-dropdown>a';
    var CARD = '.service-card,.premium-card,.referral-tier,.insight,.benefit-card';
    var FIELD = 'input:not([type=range]):not([type=button]):not([type=submit]):not([type=checkbox]):not([type=radio]),textarea,select,[contenteditable="true"]';
    var states = ['pf-state-link', 'pf-state-card', 'pf-state-text'];
    function setState(s, txt) {
      states.forEach(function (c) { root.classList.toggle(c, c === s); });
      label.textContent = txt || '';
    }
    d.addEventListener('mouseover', function (e) {
      var t = e.target; if (!t || !t.closest) return;
      if (t.closest(FIELD)) { root.classList.add('pf-cursor-hide'); setState(null); return; }
      root.classList.remove('pf-cursor-hide');
      // Keep homepage Why Us and Our Services cards on the normal cursor state (no View/Explore label).
      if (t.closest('#why-choose')) { setState('pf-state-why'); return; }
      if (t.closest('#services .service-card')) { setState('pf-state-card', 'View'); return; }
      var custom = t.closest('[data-cursor]');
      if (custom) { setState('pf-state-card', custom.getAttribute('data-cursor')); return; }
      if (t.closest(LINK)) { setState('pf-state-link'); return; }
      var c = t.closest(CARD);
      if (c) { setState('pf-state-card', c.matches('.service-card') ? 'Explore' : 'View'); return; }
      setState(null);
    }, { passive: true });
  }

  /* ================= SECTION SPOTLIGHT ================= */
  function initSpotlight() {
    if (!fine || reduce) return;
    [].slice.call(d.querySelectorAll('.hero,.cta-section,.cta,.pagehero,.page-hero,footer.footer')).forEach(function (sec) {
      if (getComputedStyle(sec).position === 'static') sec.style.position = 'relative';
      var sp = d.createElement('span'); sp.className = 'pf-spotlight'; sp.setAttribute('aria-hidden', 'true');
      sec.insertBefore(sp, sec.firstChild); sec.classList.add('pf-has-spot');
      var raf = 0, x = 0, y = 0;
      sec.addEventListener('mousemove', function (e) {
        var b = sec.getBoundingClientRect(); x = e.clientX - b.left; y = e.clientY - b.top;
        if (!raf) raf = requestAnimationFrame(function () { raf = 0; sec.style.setProperty('--sx', x + 'px'); sec.style.setProperty('--sy', y + 'px'); });
      }, { passive: true });
    });
  }

  /* ================= TILT + GLARE ================= */
  function initTilt() {
    if (!fine || reduce) return;
    var SEL = '.premium-card,.service-card,.card,.insight,.benefit-card,.step-card,.referral-tier,.referral-step,.referral-visual-card,.testimonial';
    var cards = [].slice.call(d.querySelectorAll(SEL));
    cards.forEach(function (el) {
      var glare = null, tOut = null;
      el.addEventListener('mouseenter', function () {
        clearTimeout(tOut);
        if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
        if (!glare) { glare = d.createElement('span'); glare.className = 'pf-glare'; glare.setAttribute('aria-hidden', 'true'); el.appendChild(glare); }
        el.classList.add('pf-tilting'); el.style.transition = 'transform .14s ease-out, box-shadow .35s ease';
      });
      el.addEventListener('mousemove', function (e) {
        var b = el.getBoundingClientRect(), px = (e.clientX - b.left) / b.width, py = (e.clientY - b.top) / b.height;
        var ry = (px - 0.5) * 9, rx = (0.5 - py) * 9;
        el.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-6px)';
        el.style.setProperty('--mx', (px * 100).toFixed(1) + '%'); el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      }, { passive: true });
      el.addEventListener('mouseleave', function () {
        el.classList.remove('pf-tilting'); el.style.transition = 'transform .5s cubic-bezier(.2,.8,.2,1), box-shadow .35s ease'; el.style.transform = '';
        tOut = setTimeout(function () { el.style.transition = ''; }, 520);
      });
    });
  }

  /* ================= MAGNETIC BUTTONS ================= */
  function initMagnetic() {
    if (!fine || reduce) return;
    [].slice.call(d.querySelectorAll('.btn,.consult,.primary,.secondary')).forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var b = el.getBoundingClientRect();
        var x = (e.clientX - (b.left + b.width / 2)) * 0.22, y = (e.clientY - (b.top + b.height / 2)) * 0.32;
        el.style.translate = x.toFixed(1) + 'px ' + y.toFixed(1) + 'px';
      }, { passive: true });
      el.addEventListener('mouseleave', function () { el.style.transition = 'translate .35s cubic-bezier(.2,.8,.2,1)'; el.style.translate = ''; setTimeout(function () { el.style.transition = ''; }, 380); });
    });
  }

  /* ================= HERO PARALLAX ================= */
  function initParallax() {
    if (!fine || reduce) return;
    var hero = d.querySelector('.hero'); if (!hero) return;
    var art = hero.querySelector('.hero-svg') || hero.querySelector('.art');
    if (!art) return;
    var raf = 0, tx = 0, ty = 0;
    hero.addEventListener('mousemove', function (e) {
      var b = hero.getBoundingClientRect();
      tx = ((e.clientX - b.left) / b.width - 0.5) * 22; ty = ((e.clientY - b.top) / b.height - 0.5) * 14;
      if (!raf) raf = requestAnimationFrame(function () { raf = 0; art.style.translate = tx.toFixed(1) + 'px ' + ty.toFixed(1) + 'px'; });
    }, { passive: true });
    hero.addEventListener('mouseleave', function () { art.style.transition = 'translate .6s ease'; art.style.translate = ''; setTimeout(function () { art.style.transition = ''; }, 620); });
  }

  /* ================= SCROLL REVEAL (non-AOS elements) ================= */
  function initReveal() {
    if (reduce || !('IntersectionObserver' in w)) return;
    var SEL = '.premium-card,.service-card,.card,.insight,.benefit-card,.step-card,.referral-tier,.referral-step,.referral-visual-card,.testimonial,.section-header,.faq-item,.result,.age';
    var els = [].slice.call(d.querySelectorAll(SEL)).filter(function (el) {
      return !el.closest('[data-aos]') && !el.closest('footer') && !el.closest('.hero') && !el.hasAttribute('data-aos');
    });
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target; io.unobserve(el); el.classList.add('pf-in');
        setTimeout(function () { el.classList.remove('pf-reveal', 'pf-in'); el.style.removeProperty('--pf-d'); }, 1100);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el, i) { el.style.setProperty('--pf-d', ((i % 4) * 90) + 'ms'); el.classList.add('pf-reveal'); io.observe(el); });
  }

  ready(function () {
    try { initCursor(); initSpotlight(); initTilt(); initMagnetic(); initParallax(); initReveal(); } catch (err) { if (w.console) console.warn('[premium]', err); }
  });
})();
