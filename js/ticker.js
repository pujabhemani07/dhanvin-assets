/* DHANVIN ASSETS — live market ticker (homepage)
   Data comes from our own Worker endpoint /api/ticker (cached 60s, delayed quotes).
   Never shows made-up numbers: if the feed is unavailable it says so. */
(function () {
  'use strict';
  var track = document.getElementById('tickerTrack');
  var status = document.getElementById('tickerStatus');
  if (!track) return;
  var REFRESH_MS = 60000, built = false, last = {}, timer = null;
  var inner = track.classList.contains('ticker-track');   // compact ticker used on inner pages

  function fmt(v, dec) { return Number(v).toLocaleString('en-IN', { minimumFractionDigits: dec, maximumFractionDigits: dec }); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function itemHTML(it) {
    if (inner) return '<div class="tick" data-k="' + it.k + '"><span class="t-arrow"></span> ' + esc(it.n) + ' <b class="t-price"></b> <span class="t-pct"></span></div>';
    return '<span class="ticker-item" data-k="' + it.k + '"><span class="t-arrow"></span> ' + esc(it.n) +
      ' <strong class="t-price"></strong> <b class="t-pct"></b></span><span class="ticker-sep">|</span>';
  }
  function build(items) {
    var one = items.map(itemHTML).join('');
    track.innerHTML = one + one + one + one;   // 2 identical halves, each repeated, so the -50% loop is seamless on wide screens
    built = true;
  }
  function paint(it) {
    var nodes = track.querySelectorAll('[data-k="' + it.k + '"]');
    var up = it.pct > 0.0049, down = it.pct < -0.0049;
    var priceTxt = (it.prefix || '') + fmt(it.price, it.dec) + (it.suffix || '');
    var pctTxt = (up ? '+' : '') + it.pct.toFixed(2) + '%';
    var changed = last[it.k] !== undefined && last[it.k] !== priceTxt;
    last[it.k] = priceTxt;
    [].forEach.call(nodes, function (n) {
      n.querySelector('.t-price').textContent = priceTxt;
      var b = n.querySelector('.t-pct'); b.textContent = pctTxt; b.className = 't-pct ' + (inner ? (up ? 'up' : down ? 'down' : '') : (up ? 'tick-up' : down ? 'tick-down' : 'tick-flat'));
      n.querySelector('.t-arrow').textContent = up ? '\u2197' : down ? '\u2198' : '\u2192';
      if (changed) { n.classList.remove('tick-flash'); void n.offsetWidth; n.classList.add('tick-flash'); }
    });
  }
  function setStatus(d) {
    if (inner) { var box = track.parentNode; if (box) box.title = 'Delayed data \u00B7 ' + (d.marketOpen ? 'market open' : 'market closed') + ' \u00B7 Source: ' + (d.source || 'market data provider') + '. For information only; not investment advice.'; return; }
    if (!status) return;
    var t = d.asOf ? new Date(d.asOf) : null;
    var when = t ? t.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false }) + ' IST' : '';
    status.hidden = false;
    status.className = 'ticker-status ' + (d.marketOpen ? 'is-open' : 'is-closed');
    status.textContent = d.marketOpen ? 'LIVE' : 'MARKET CLOSED';
    status.title = 'Delayed data' + (when ? ' \u00B7 as of ' + when : '') + ' \u00B7 Source: ' + (d.source || 'market data provider') + '. For information only; not investment advice.';
  }
  function fail() {
    if (!built) { track.innerHTML = inner ? '<div class="tick ticker-msg">Live market data temporarily unavailable</div>' : '<span class="ticker-item ticker-msg">Live market data temporarily unavailable</span>'; track.style.animation = 'none'; }
    if (status) status.hidden = true;
  }
  function load() {
    if (document.hidden) return;
    fetch('/api/ticker', { headers: { 'Accept': 'application/json' }, cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) {
        if (!d.items || !d.items.length) throw new Error('empty');
        if (!built) { track.style.animation = ''; build(d.items); }
        d.items.forEach(paint); setStatus(d);
      })
      .catch(fail);
  }
  load();
  timer = setInterval(load, REFRESH_MS);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) load(); });
})();
