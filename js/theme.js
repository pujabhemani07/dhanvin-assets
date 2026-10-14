/* DHANVIN ASSETS — unified light/dark theme engine (all pages).
   One source of truth: <html data-theme="light|dark">, saved as localStorage 'da-theme'.
   Replaces the old per-page toggles (body.night etc). */
(function () {
  'use strict';
  if (window.__daTheme) return; window.__daTheme = true;
  var KEY = 'da-theme', root = document.documentElement;
  var SEL = '#theme,#theme-toggle,.theme-toggle,button.theme';
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function put(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function buttons() { return [].slice.call(document.querySelectorAll(SEL)); }
  function apply(t, persist) {
    t = t === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', t);
    if (document.body) document.body.classList.toggle('dark', t === 'dark');
    buttons().forEach(function (b) {
      var i = b.querySelector('i'); if (i) i.className = t === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      b.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
      b.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      b.title = t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    });
    if (typeof window.refreshSipChart === 'function') { try { window.refreshSipChart(); } catch (e) {} }
    if (persist) put(t);
    try { document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: t } })); } catch (e) {}
  }
  function init() {
    apply(get() === 'dark' ? 'dark' : 'light', false);
    // capture phase + stopImmediatePropagation: neutralises any legacy inline/bubble toggle so it can never double-fire
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest(SEL); if (!b) return;
      e.preventDefault(); e.stopImmediatePropagation();
      apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    }, true);
    window.addEventListener('storage', function (e) { if (e.key === KEY) apply(e.newValue === 'dark' ? 'dark' : 'light', false); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
