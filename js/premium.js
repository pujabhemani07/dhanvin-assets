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
  var COLORS = ['#D4AF37', '#4B2E83', '#2448D8', '#48D3C6'];

  function ready(fn) { d.readyState === 'loading' ? d.addEventListener('DOMContentLoaded', fn) : fn(); }
  function mk(tag, cls, parent) { var e = d.createElement(tag); e.className = cls; e.setAttribute('aria-hidden', 'true'); (parent || d.body).appendChild(e); return e; }

  /* ================= CUSTOM CURSOR ================= */
  function initCursor() {
    if (!fine || reduce) return;
    var dot = mk('div', 'pf-cursor-dot');
    var ring = mk('div', 'pf-cursor-ring');
    var label = d.createElement('span'); ring.appendChild(label);
    var cv = mk('canvas', 'pf-cursor-fx'); var ctx = cv.getContext('2d');
    var dpr = Math.min(w.devicePixelRatio || 1, 2);
    function size() { cv.width = w.innerWidth * dpr; cv.height = w.innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); w.addEventListener('resize', size, { passive: true });

    var mx = -100, my = -100, rx = -100, ry = -100, lx = -100, ly = -100;
    var live = false, running = false, parts = [];
    var MAX = 90;

    function spawn(x, y, burst) {
      if (parts.length > MAX) parts.shift();
      var r = Math.random();
      var type = r < 0.16 ? 'coin' : (r < 0.46 ? 'spark' : 'dot');
      var a = Math.random() * Math.PI * 2, sp = burst ? 1.5 + Math.random() * 3.2 : 0.2 + Math.random() * 0.8;
      parts.push({
        x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (burst ? 0.6 : 0.25),
        life: 1, decay: burst ? 0.02 + Math.random() * 0.012 : 0.026 + Math.random() * 0.016,
        s: burst ? 4 + Math.random() * 6 : 3 + Math.random() * 5, type: type,
        c: type === 'coin' ? '#D4AF37' : COLORS[(Math.random() * COLORS.length) | 0],
        rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.2
      });
    }
    function star(x, y, s, rot) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath();
      for (var i = 0; i < 8; i++) { var rad = i % 2 ? s * 0.28 : s; var ang = i * Math.PI / 4; ctx.lineTo(Math.cos(ang) * rad, Math.sin(ang) * rad); }
      ctx.closePath(); ctx.fill(); ctx.restore();
    }
    function draw() {
      ctx.clearRect(0, 0, w.innerWidth, w.innerHeight);
      for (var i = parts.length - 1; i >= 0; i--) {
        var p = parts[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.035; p.vx *= 0.985; p.life -= p.decay; p.rot += p.vr;
        if (p.life <= 0) { parts.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(p.life, 0); ctx.fillStyle = p.c;
        if (p.type === 'coin') {
          ctx.save(); ctx.translate(p.x, p.y); ctx.scale(Math.abs(Math.cos(p.rot)) * 0.8 + 0.2, 1);
          ctx.beginPath(); ctx.arc(0, 0, p.s + 3, 0, 6.283); ctx.fill();
          ctx.fillStyle = '#4B2E83'; ctx.font = '700 ' + (p.s + 4) + 'px Poppins, Arial, sans-serif';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('\u20B9', 0, 1); ctx.restore();
        } else if (p.type === 'spark') { star(p.x, p.y, p.s + 2, p.rot); }
        else { ctx.beginPath(); ctx.arc(p.x, p.y, p.s * 0.55, 0, 6.283); ctx.fill(); }
      }
      ctx.globalAlpha = 1;
    }
    function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
      draw();
      if (parts.length || Math.abs(mx - rx) > 0.3 || Math.abs(my - ry) > 0.3) requestAnimationFrame(loop);
      else { running = false; ctx.clearRect(0, 0, w.innerWidth, w.innerHeight); }
    }
    function kick() { if (!running) { running = true; requestAnimationFrame(loop); } }

    d.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      if (!live) { live = true; rx = mx; ry = my; lx = mx; ly = my; root.classList.add('pf-cursor-on', 'pf-cursor-active'); }
      var dx = mx - lx, dy = my - ly;
      if (dx * dx + dy * dy > 324) { spawn(mx, my, false); lx = mx; ly = my; }
      kick();
    }, { passive: true });

    d.addEventListener('mousedown', function (e) {
      root.classList.add('pf-state-down'); ring.style.scale = '.78';
      for (var i = 0; i < 16; i++) spawn(e.clientX, e.clientY, true);
      var rp = mk('div', 'pf-ripple'); rp.style.left = e.clientX + 'px'; rp.style.top = e.clientY + 'px';
      setTimeout(function () { rp.remove(); }, 760); kick();
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
      var custom = t.closest('[data-cursor]');
      if (custom) { setState('pf-state-card', custom.getAttribute('data-cursor')); return; }
      if (t.closest(LINK)) { setState('pf-state-link'); return; }
      var c = t.closest(CARD);
      if (c) { setState('pf-state-card', c.matches('.service-card') ? 'Explore' : 'View'); return; }
      setState(null);
    }, { passive: true });
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
    try { initCursor(); initTilt(); initMagnetic(); initParallax(); initReveal(); } catch (err) { if (w.console) console.warn('[premium]', err); }
  });
})();
