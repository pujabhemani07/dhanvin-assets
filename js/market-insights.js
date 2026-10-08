/* DHANVIN ASSETS — Market Insights live dashboard.
   Reads our own Worker endpoint /api/market (the data-provider key never reaches the browser).
   All text is inserted with textContent (no HTML injection). */
(function () {
  'use strict';
  var root = document.getElementById('liveMarket'); if (!root) return;
  var preview = /[?&]preview=1/.test(location.search);
  var demo = /[?&]demo=1/.test(location.search);   // layout preview with clearly-labelled SAMPLE data (never used on the normal page)
  var REFRESH = 300000, state = {}, hiddenAll = false;

  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function fmt(v, d) { return v == null ? '\u2014' : Number(v).toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d }); }
  function rs(v) { return v == null ? '\u2014' : '\u20B9' + fmt(v, 2); }
  function sgn(v) { return v == null ? '\u2014' : (v > 0 ? '+' : '') + Number(v).toFixed(2) + '%'; }
  function cls(v) { return v > 0 ? 'ml-up' : v < 0 ? 'ml-down' : 'ml-flat'; }
  function vol(v) { if (v == null) return ''; return v >= 1e7 ? (v / 1e7).toFixed(2) + ' Cr' : v >= 1e5 ? (v / 1e5).toFixed(2) + ' L' : fmt(v, 0); }
  function aum(v) { return v == null ? '\u2014' : '\u20B9' + fmt(v, 0) + ' Cr'; }
  function chip(v) { return el('span', 'ml-chip ' + cls(v), sgn(v)); }
  function istTime(iso) { try { return new Date(iso).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }) + ' IST'; } catch (e) { return ''; } }
  function marketOpenNow() { var d = new Date(Date.now() + 19800000), m = d.getUTCHours() * 60 + d.getUTCMinutes(), day = d.getUTCDay(); return day >= 1 && day <= 5 && m >= 555 && m <= 930; }

  function stockRow(s, extra) {
    var r = el('div', 'ml-row'), id = el('div', 'ml-id');
    id.appendChild(el('b', '', s.symbol)); id.appendChild(el('small', '', (s.name || '') + (extra ? ' \u00B7 ' + extra : '')));
    r.appendChild(id); r.appendChild(el('div', 'ml-px', rs(s.price))); r.appendChild(chip(s.pct));
    return r;
  }
  function levelRow(s, label) {
    var r = el('div', 'ml-row'), id = el('div', 'ml-id');
    id.appendChild(el('b', '', s.symbol)); id.appendChild(el('small', '', s.name || ''));
    var lv = el('div', 'ml-lvl'); lv.appendChild(document.createTextNode(label)); lv.appendChild(el('b', '', rs(s.level)));
    r.appendChild(id); r.appendChild(el('div', 'ml-px', rs(s.price))); r.appendChild(lv);
    return r;
  }
  function fundRows(cat) {
    var f = document.createDocumentFragment(), h = el('div', 'ml-fhead');
    ['Scheme', 'NAV', '1Y', '3Y', 'AUM'].forEach(function (t) { h.appendChild(el('span', '', t)); }); f.appendChild(h);
    cat.funds.forEach(function (x) {
      var r = el('div', 'ml-frow'), id = el('div', 'ml-id');
      id.appendChild(el('b', '', x.name)); id.appendChild(el('small', '', cat.group + ' \u00B7 ' + cat.name));
      r.appendChild(id); r.appendChild(el('span', '', rs(x.nav)));
      r.appendChild(el('span', '', x.r1y == null ? '\u2014' : fmt(x.r1y, 1) + '%'));
      r.appendChild(el('span', '', x.r3y == null ? '\u2014' : fmt(x.r3y, 1) + '%'));
      r.appendChild(el('span', '', aum(x.asset))); f.appendChild(r);
    });
    return f;
  }

  var CARDS = {
    trending: { tabs: [['gainers', 'Top Gainers'], ['losers', 'Top Losers']], draw: function (d, t) { return (d[t] || []).map(function (s) { return stockRow(s); }); } },
    active: { tabs: null, draw: function (d) { return (d.stocks || []).map(function (s) { return stockRow(s, s.vol ? 'Vol ' + vol(s.vol) : ''); }); } },
    highlow: {
      tabs: [['high', '52-Week High'], ['low', '52-Week Low']],
      draw: function (d, t) { return (d[t] || []).map(function (s) { return levelRow(s, t === 'high' ? '52W high' : '52W low'); }); },
      empty: 'No data right now \u2014 this list fills up while the market is open.'
    },
    funds: { tabs: 'dynamic' }
  };

  function card(sec) { return root.querySelector('[data-sec="' + sec + '"]'); }
  function setStamp(c, d) {
    var st = c.querySelector('.ml-stamp'); if (!st) return;
    var stale = d.stale || !marketOpenNow();
    st.textContent = (d.stale ? 'Last available \u00B7 ' : (marketOpenNow() ? 'Updated ' : 'Last update ')) + istTime(d.updated);
    st.className = 'ml-stamp' + (d.stale ? ' stale' : '');
    st.title = 'Source: ' + (d.source || 'IndianAPI') + (stale && !d.stale ? ' \u00B7 market closed, showing latest available data' : '');
  }
  function render(sec) {
    var s = state[sec], c = card(sec); if (!s || !c) return;
    var body = c.querySelector('.ml-body'), tabs = c.querySelector('.ml-tabs'), cfg = CARDS[sec], d = s.res.data;
    var list = [];
    if (sec === 'funds') {
      var cats = d.categories || [];
      if (!cats.length) { body.replaceChildren(el('div', 'ml-empty', 'No fund data available right now.')); return; }
      if (s.tab == null || s.tab >= cats.length) s.tab = 0;
      tabs.replaceChildren();
      cats.forEach(function (cat, i) { var b = el('button', i === s.tab ? 'on' : '', cat.name); b.type = 'button'; b.addEventListener('click', function () { s.tab = i; render(sec); }); tabs.appendChild(b); });
      body.replaceChildren(fundRows(cats[s.tab]));
    } else {
      if (cfg.tabs) {
        if (!s.tab) s.tab = cfg.tabs[0][0];
        tabs.replaceChildren();
        cfg.tabs.forEach(function (t) { var b = el('button', t[0] === s.tab ? 'on' : '', t[1]); b.type = 'button'; b.addEventListener('click', function () { s.tab = t[0]; render(sec); }); tabs.appendChild(b); });
      }
      list = cfg.draw(d, s.tab);
      if (!list.length) body.replaceChildren(el('div', 'ml-empty', cfg.empty || 'No data available right now.'));
      else body.replaceChildren.apply(body, list);
    }
    setStamp(c, s.res);
  }
  function fail(sec, code) {
    var c = card(sec); if (!c) return;
    if (code === 'not_configured') {
      if (!preview) { c.hidden = true; if (!root.querySelector('.ml-card:not([hidden])')) { root.hidden = true; hiddenAll = true; } return; }
      c.querySelector('.ml-body').replaceChildren(el('div', 'ml-msg', 'Preview: the data feed is not connected yet (INDIANAPI_KEY is not set on the Worker).'));
      return;
    }
    if (!state[sec]) c.querySelector('.ml-body').replaceChildren(el('div', 'ml-msg', 'Live data is temporarily unavailable. Please check back shortly.'));
  }
  var DEMO = (function () {
    function st(i, p, c) { return { symbol: 'SAMPLE' + i, name: 'Sample Company ' + i, price: p, pct: c, chg: 0, vol: 9000000 - i * 700000 }; }
    function fd(n, a, r1, r3) { return { name: n, nav: 100 + a / 100, pct: 0.2, asset: a, r1y: r1, r3y: r3, r5y: null, rating: null }; }
    var cat = function (g, n) { return { group: g, name: n, funds: [fd('Sample ' + n + ' Fund A', 24000, 12.4, 38.1), fd('Sample ' + n + ' Fund B', 15500, 10.2, 31.6), fd('Sample ' + n + ' Fund C', 9800, 14.7, 42.3), fd('Sample ' + n + ' Fund D', 6100, 9.1, 28.4)] }; };
    var now = function () { return new Date().toISOString(); };
    return {
      trending: { updated: now(), source: 'SAMPLE', data: { gainers: [st(1, 1250.5, 3.2), st(2, 842.1, 2.6), st(3, 310.8, 2.1)], losers: [st(4, 990.4, -2.8), st(5, 455.2, -2.2), st(6, 128.9, -1.9)] } },
      active: { updated: now(), source: 'SAMPLE', data: { stocks: [st(1, 1250.5, 0.9), st(2, 842.1, -0.4), st(3, 310.8, 1.3), st(4, 990.4, 0.2), st(5, 455.2, -1.1)] } },
      highlow: { updated: now(), source: 'SAMPLE', data: { high: [{ symbol: 'SAMPLE1', name: 'Sample Company 1', price: 1250.5, level: 1262 }, { symbol: 'SAMPLE2', name: 'Sample Company 2', price: 842.1, level: 850 }], low: [{ symbol: 'SAMPLE3', name: 'Sample Company 3', price: 310.8, level: 305 }] } },
      funds: { updated: now(), source: 'SAMPLE', data: { categories: [cat('Equity', 'Large Cap'), cat('Equity', 'Mid Cap'), cat('Equity', 'Flexi Cap'), cat('Debt', 'Short Duration')] } }
    };
  })();
  if (demo) {
    var bn = el('div', 'ml-demo', 'LAYOUT PREVIEW \u2014 the figures below are SAMPLE DATA, not real market data. Remove ?demo=1 from the address for the live view.');
    var w0 = root.querySelector('.wrap'); if (w0) w0.insertBefore(bn, w0.firstChild);
  }
  function load(sec) {
    if (demo) { state[sec] = state[sec] || {}; state[sec].res = DEMO[sec]; render(sec); return Promise.resolve(); }
    return fetch('/api/market?section=' + sec, { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (x) {
        if (!x.ok || x.j.error || !x.j.data) { fail(sec, x.j && x.j.error); return; }
        state[sec] = state[sec] || {}; state[sec].res = x.j; render(sec);
      })
      .catch(function () { fail(sec, 'network'); });
  }
  function loadAll() { if (document.hidden || hiddenAll) return; Object.keys(CARDS).forEach(load); }
  loadAll();
  setInterval(loadAll, REFRESH);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) loadAll(); });
})();
