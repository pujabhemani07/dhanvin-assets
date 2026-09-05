/* DHANVIN ASSETS – shared interactions */
(function(){
  'use strict';

  /* Prevent accidental double-initialisation if a page includes this file twice. */
  if(window.__dhanvinMainInitialized){return;}
  window.__dhanvinMainInitialized=true;

  function qs(s,c){return (c||document).querySelector(s)}
  function qsa(s,c){return Array.from((c||document).querySelectorAll(s))}

  function safeStorageGet(key,fallback){
    try{return localStorage.getItem(key)||fallback}catch(e){return fallback}
  }
  function safeStorageSet(key,value){
    try{localStorage.setItem(key,value)}catch(e){}
  }

  function initTheme(){
    const html=document.documentElement;
    const body=document.body;
    const btn=qs('#theme')||qs('#theme-toggle');
    const saved=safeStorageGet('da-theme',html.getAttribute('data-theme')||'light');
    const initial=saved==='dark'?'dark':'light';

    function apply(theme){
      const next=theme==='dark'?'dark':'light';
      html.setAttribute('data-theme',next);
      body.classList.toggle('dark',next==='dark');
      if(btn){
        const icon=btn.querySelector('i');
        if(icon) icon.className=next==='dark'?'fa-solid fa-sun':'fa-solid fa-moon';
        btn.setAttribute('aria-pressed',next==='dark'?'true':'false');
        btn.setAttribute('aria-label',next==='dark'?'Switch to light mode':'Switch to dark mode');
        btn.setAttribute('title',next==='dark'?'Switch to light mode':'Switch to dark mode');
      }
      if(typeof window.refreshSipChart==='function') window.refreshSipChart();
    }

    apply(initial);
    if(btn){
      btn.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        const next=html.getAttribute('data-theme')==='dark'?'light':'dark';
        apply(next);
        safeStorageSet('da-theme',next);
      });
    }
  }

  function initNavbar(){
    const nav=qs('#navbar')||qs('.nav');
    if(!nav)return;
    function scroll(){nav.classList.toggle('scrolled',window.scrollY>50)}
    scroll();
    window.addEventListener('scroll',scroll,{passive:true});
  }

  function initMobile(){
    const hamburger=qs('#hamb')||qs('#hamburger');
    const menu=qs('#drawer')||qs('#nav-menu');
    if(!hamburger||!menu)return;
    const close=qs('#drawer-close');
    function toggle(open){
      menu.classList.toggle('open',open);
      hamburger.classList.toggle('active',open);
      hamburger.setAttribute('aria-expanded',open?'true':'false');
      document.body.style.overflow=open?'hidden':'';
    }
    hamburger.setAttribute('aria-expanded','false');
    hamburger.addEventListener('click',function(e){e.stopPropagation();toggle(!menu.classList.contains('open'));});
    if(close)close.addEventListener('click',function(){toggle(false)});
    qsa('a',menu).forEach(a=>a.addEventListener('click',function(){toggle(false)}));
    document.addEventListener('keydown',function(e){if(e.key==='Escape')toggle(false)});
  }

  function initScroll(){
    const bar=qs('#scroll-progress');
    if(!bar)return;
    function update(){
      const max=document.documentElement.scrollHeight-window.innerHeight;
      const progress=max>0?Math.min(100,Math.max(0,window.scrollY/max*100)):0;
      bar.style.width=progress+'%';
    }
    update();
    window.addEventListener('scroll',update,{passive:true});
    window.addEventListener('resize',update,{passive:true});
  }

  function initLoader(){
    const loader=qs('#loader');
    if(!loader)return;
    const hide=()=>loader.classList.add('hidden');
    if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){hide();return}
    window.setTimeout(hide,650);
  }

  function counters(){
    qsa('[data-count]').forEach(el=>{
      if(el.dataset.counterReady==='1')return;
      el.dataset.counterReady='1';
      const target=Math.max(0,parseInt(el.dataset.count||'0',10));
      const run=()=>{
        const start=performance.now();
        const duration=900;
        function frame(now){
          const p=Math.min(1,(now-start)/duration);
          const eased=1-Math.pow(1-p,3);
          el.textContent=Math.floor(target*eased).toLocaleString('en-IN');
          if(p<1)requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      };
      if(!('IntersectionObserver' in window)){run();return}
      const obs=new IntersectionObserver(entries=>{
        if(entries[0]&&entries[0].isIntersecting){run();obs.disconnect()}
      },{threshold:.35});
      obs.observe(el);
    });
  }

  let sipChart=null;
  window.sipChart=null;

  function fmt(n){
    if(!Number.isFinite(n))return '0';
    if(n>=1e7)return(n/1e7).toFixed(2)+' Cr';
    if(n>=1e5)return(n/1e5).toFixed(2)+' L';
    return Math.round(n).toLocaleString('en-IN');
  }

  function sip(){
    const amount=qs('#sip-amount');
    const years=qs('#sip-years');
    const rate=qs('#sip-rate');
    if(!amount||!years||!rate)return;

    const av=qs('#sip-amount-val');
    const yv=qs('#sip-years-val');
    const rv=qs('#sip-rate-val');

    function read(input,fallback){
      const n=parseFloat(input&&input.value);
      return Number.isFinite(n)?n:fallback;
    }
    function sync(input,field){if(input&&field)field.value=input.value}

    function calc(){
      const P=Math.max(0,read(av||amount,5000));
      const n=Math.max(1,read(yv||years,15));
      const r=Math.max(0,read(rv||rate,12));
      const months=Math.round(n*12);
      const monthlyRate=r/100/12;
      const fv=monthlyRate===0?P*months:P*(((Math.pow(1+monthlyRate,months)-1)/monthlyRate)*(1+monthlyRate));
      const inv=P*months;
      const ret=Math.max(0,fv-inv);

      const set=(id,v)=>{const e=qs('#'+id);if(e)e.textContent='₹'+fmt(v)};
      set('total-invested',inv);
      set('expected-returns',ret);
      set('total-value',fv);

      if(typeof Chart==='undefined')return;
      const canvas=qs('#sip-chart');
      if(!canvas)return;
      if(sipChart){try{sipChart.destroy()}catch(e){}sipChart=null;}

      const dark=document.documentElement.getAttribute('data-theme')==='dark';
      const tc=dark?'#b0aac8':'#555770';
      const gc=dark?'rgba(255,255,255,.07)':'rgba(0,0,0,.06)';
      const labels=[],invested=[],future=[];
      for(let y=1;y<=n;y++){
        const m=Math.round(y*12);
        labels.push('Yr '+y);
        invested.push(Math.round(P*m));
        const value=monthlyRate===0?P*m:P*(((Math.pow(1+monthlyRate,m)-1)/monthlyRate)*(1+monthlyRate));
        future.push(Math.round(value));
      }

      sipChart=new Chart(canvas.getContext('2d'),{
        type:'bar',
        data:{labels,datasets:[
          {label:'Total Invested',data:invested,backgroundColor:'rgba(36,72,216,.7)',borderRadius:4},
          {label:'Expected Value',data:future,backgroundColor:'rgba(75,46,131,.85)',borderRadius:4}
        ]},
        options:{
          responsive:true,
          maintainAspectRatio:false,
          interaction:{mode:'index',intersect:false},
          scales:{
            x:{grid:{color:gc},ticks:{color:tc}},
            y:{beginAtZero:true,grid:{color:gc},ticks:{color:tc,callback:v=>v>=1e7?(v/1e7).toFixed(1)+'Cr':v>=1e5?(v/1e5).toFixed(0)+'L':v}}
          },
          plugins:{
            legend:{labels:{color:tc}},
            tooltip:{callbacks:{label:c=>c.dataset.label+': ₹'+fmt(c.parsed.y)}}
          }
        }
      });
      window.sipChart=sipChart;
    }

    [[amount,av],[years,yv],[rate,rv]].forEach(([range,field])=>{
      if(range&&field)range.addEventListener('input',()=>{sync(range,field);calc()});
      if(field&&range)field.addEventListener('input',()=>{range.value=field.value;calc()});
    });
    window.refreshSipChart=calc;
    calc();
  }

  function faq(){
    qsa('.faq-item').forEach(item=>{
      const btn=qs('.faq-question',item);
      if(!btn||btn.dataset.faqReady==='1')return;
      btn.dataset.faqReady='1';
      btn.addEventListener('click',()=>{
        const open=item.classList.contains('open');
        qsa('.faq-item').forEach(x=>x.classList.remove('open'));
        if(!open)item.classList.add('open');
      });
    });
  }

  function testimonials(){
    const track=qs('#testimonial-track');
    if(!track)return;
    const cards=qsa('.testimonial-card',track);
    if(cards.length<2)return;
    const dots=qsa('.dot'),prev=qs('#prev-btn'),next=qs('#next-btn');
    let cur=0,timer;
    function go(i){
      cur=(i+cards.length)%cards.length;
      track.style.transform='translateX(-'+cur*100+'%)';
      dots.forEach((d,n)=>d.classList.toggle('active',n===cur));
    }
    function start(){clearInterval(timer);timer=setInterval(()=>go(cur+1),5000)}
    function stop(){clearInterval(timer)}
    if(prev)prev.addEventListener('click',()=>{stop();go(cur-1);start()});
    if(next)next.addEventListener('click',()=>{stop();go(cur+1);start()});
    dots.forEach(d=>d.addEventListener('click',()=>{stop();go(parseInt(d.dataset.index||'0',10));start()}));
    go(0);start();
  }

  function comparison(){
    const section=qs('.comparison-grid');
    if(!section)return;
    const run=()=>{
      qsa('.comp-bar').forEach(b=>setTimeout(()=>b.style.width=(parseFloat(b.dataset.width)||0)+'%',150));
      qsa('.comp-corpus-val').forEach(v=>{
        const target=parseFloat(v.dataset.value)||0;
        const start=performance.now();
        const duration=900;
        function frame(now){
          const p=Math.min(1,(now-start)/duration);
          v.textContent='₹'+(target*(1-Math.pow(1-p,3))).toFixed(2)+' Cr';
          if(p<1)requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      });
    };
    if(!('IntersectionObserver' in window)){run();return}
    const obs=new IntersectionObserver(entries=>{if(entries[0]&&entries[0].isIntersecting){run();obs.disconnect()}},{threshold:.3});
    obs.observe(section);
  }

  function blogFilter(){
    const btns=qsa('.cat-btn'),cards=qsa('.blog-card'),search=qs('#blog-search');
    const apply=(card,show)=>{card.hidden=!show};
    if(search)search.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();cards.forEach(c=>apply(c,!q||c.textContent.toLowerCase().includes(q)))});
    btns.forEach(btn=>btn.addEventListener('click',()=>{
      btns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const cat=btn.dataset.cat||'all';
      cards.forEach(c=>apply(c,cat==='all'||c.dataset.cat===cat));
    }));
  }

  function calcTabs(){
    const tabs=qsa('.calc-tab'),panels=qsa('.calc-panel');
    if(!tabs.length)return;
    function activate(tab){
      if(!tab)return;
      tabs.forEach(t=>t.classList.remove('active'));
      panels.forEach(p=>p.classList.remove('active'));
      tab.classList.add('active');
      const p=qs('#panel-'+tab.dataset.tab);
      if(p)p.classList.add('active');
    }
    tabs.forEach(t=>t.addEventListener('click',()=>activate(t)));
    const h=location.hash.replace('#','');
    const t=h?qs('.calc-tab[data-tab="'+h+'"]'):null;
    activate(t||tabs[0]);
  }

  document.addEventListener('DOMContentLoaded',function(){
    initTheme();
    initNavbar();
    initMobile();
    initScroll();
    initLoader();
    counters();
    sip();
    faq();
    testimonials();
    comparison();
    blogFilter();
    calcTabs();
    if(typeof AOS!=='undefined')AOS.init({duration:700,once:true,offset:80});
  });
})();
