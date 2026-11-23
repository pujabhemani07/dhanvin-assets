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
    var quoteDate = d.asOf ? new Date(d.asOf) : null;
    var when = quoteDate && !isNaN(quoteDate.getTime()) ? quoteDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }) + ' IST' : 'timestamp unavailable';
    var stale = d.dataStatus === 'STALE' || d.dataStatus === 'UNAVAILABLE' || d.providerStatus === 'ALL_PROVIDERS_UNAVAILABLE';
    var label = stale ? 'STALE DATA · NOT LIVE' : (d.marketOpen ? (d.dataFresh ? 'MARKET OPEN · DELAYED FEED' : 'MARKET OPEN · DATA DELAYED') : (d.marketLabel || 'MARKET CLOSED'));
    var explanation = (d.calendarVerified ? 'Exchange session status' : 'Exchange calendar needs verification') + ' · ' + (d.dataStatus || 'UNKNOWN DATA STATUS') + ' · Latest quote: ' + when + ' · Source: ' + (d.source || 'market data provider') + '. Indicative information only; verify prices with your broker or exchange before relying on them.';
    if (inner) { var box = track.parentNode; if (box) box.title = label + ' · ' + explanation; return; }
    if (!status) return;
    status.hidden = false;
    status.className = 'ticker-status ' + (stale || !d.dataFresh ? 'is-delayed' : (d.marketOpen ? 'is-open' : 'is-closed'));
    status.textContent = label;
    status.title = explanation;
  }
  function fail() {
    if (!built) {
      track.innerHTML = inner ? '<div class="tick ticker-msg">Market data temporarily unavailable</div>' : '<span class="ticker-item ticker-msg">Market data temporarily unavailable</span>';
      track.style.animation = 'none';
    }
    // If a previous successful quote is still on screen, never silently imply
    // it is current after a refresh failure.
    if (status) {
      status.hidden = false;
      status.className = 'ticker-status is-delayed';
      status.textContent = built ? 'FEED CONNECTION ISSUE · CHECK DATA TIME' : 'MARKET DATA UNAVAILABLE';
      status.title = 'The latest refresh failed. Any prices still visible are from the last successful response and may be stale. Please verify prices with the exchange or your broker before relying on them.';
    }
    if (inner) {
      var box = track.parentNode;
      if (box) box.title = 'Market data refresh failed. Prices shown may be from the last successful update and may be stale.';
    }
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
