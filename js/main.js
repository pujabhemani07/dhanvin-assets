/* DHANVIN ASSETS – shared interactions + final responsive/theme hardening */
(function(){
'use strict';
if(window.__dhanvinMainInitialized)return;
window.__dhanvinMainInitialized=true;
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>Array.from(c.querySelectorAll(s));
const getStore=(k,d)=>{try{return localStorage.getItem(k)||d}catch(e){return d}};
const setStore=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};

function responsiveHardening(){
 if($('#dhanvin-final-responsive'))return;
 const s=document.createElement('style');s.id='dhanvin-final-responsive';
 s.textContent=`
 html,body{width:100%;max-width:100%;overflow-x:hidden}
 img,svg,video,canvas{max-width:100%;height:auto}
 .hero-container,.hero-content,.hero-stats{min-width:0}
 .hero-wave{z-index:1!important;pointer-events:none!important}
 .hero-container,.hero-content,.hero-stats{position:relative;z-index:3}
 /* Keep the floating homepage navbar visible while scrolling. */
 .nav{position:fixed!important;top:53px!important;z-index:5000!important}
 .nav.scrolled{top:12px!important}
 .theme{position:relative;z-index:5002!important;pointer-events:auto!important}
 @media(max-width:760px){
  .nav{top:42px!important;width:calc(100% - 18px);z-index:5000!important}
  .nav.scrolled{top:8px!important}
  .hero{overflow:hidden}
  .hero-stats{width:100%;max-width:100%}
  .cards-grid,.services-grid,.insights-grid,.footer-grid,.comparison-grid,.calc-wrapper,.hero-container{min-width:0}
  .cards-grid,.services-grid,.insights-grid{grid-template-columns:1fr!important}
  .calc-wrapper,.comparison-grid,.footer-grid{grid-template-columns:1fr!important}
 }
 @media(max-width:480px){
  .container{width:calc(100% - 24px);max-width:100%}
  .hero-stats{grid-template-columns:1fr!important;height:auto!important;min-height:0!important}
  .hero-stats .stat-divider{display:none!important}
  .hero-stats .stat-item{border-right:0!important;border-bottom:1px solid var(--border-color);padding:9px 0}
  .hero-stats .stat-item:nth-child(5){border-bottom:0!important}
  .hero-illustration{max-width:100%;overflow:visible}
  .btn,.btn-lg{max-width:100%;white-space:normal}
 }
 @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
 `;
 document.head.appendChild(s);
}

function theme(){
 const html=document.documentElement,body=document.body,btn=$('#theme')||$('#theme-toggle');
 const apply=t=>{
  const next=t==='dark'?'dark':'light';
  html.setAttribute('data-theme',next);body.classList.toggle('dark',next==='dark');
  if(btn){const i=$('i',btn);if(i)i.className=next==='dark'?'fa-solid fa-sun':'fa-solid fa-moon';btn.setAttribute('aria-pressed',next==='dark');btn.setAttribute('aria-label',next==='dark'?'Switch to light mode':'Switch to dark mode');btn.title=next==='dark'?'Switch to light mode':'Switch to dark mode'}
  if(typeof window.refreshSipChart==='function')window.refreshSipChart();
 };
 apply(getStore('da-theme',html.getAttribute('data-theme')||'light'));
 if(btn){
  /* Capture phase blocks any legacy inline/bubble handler, preventing double toggles. */
  btn.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();const n=html.getAttribute('data-theme')==='dark'?'light':'dark';apply(n);setStore('da-theme',n)},true);
 }
}

function navbar(){const n=$('#navbar')||$('.nav');if(!n)return;const update=()=>n.classList.toggle('scrolled',scrollY>50);update();addEventListener('scroll',update,{passive:true})}
function mobile(){
 const h=$('#hamb')||$('#hamburger'),m=$('#drawer')||$('#nav-menu');if(!h||!m)return;const close=$('#drawer-close');
 const set=open=>{m.classList.toggle('open',open);h.classList.toggle('active',open);h.setAttribute('aria-expanded',open);document.body.style.overflow=open?'hidden':''};
 h.setAttribute('aria-expanded','false');h.addEventListener('click',e=>{e.stopPropagation();set(!m.classList.contains('open'))});
 if(close)close.addEventListener('click',()=>set(false));$$('a',m).forEach(a=>a.addEventListener('click',()=>set(false)));document.addEventListener('keydown',e=>{if(e.key==='Escape')set(false)});
}
function scrollProgress(){const b=$('#scroll-progress');if(!b)return;const u=()=>{const max=document.documentElement.scrollHeight-innerHeight;b.style.width=(max>0?scrollY/max*100:0)+'%'};u();addEventListener('scroll',u,{passive:true});addEventListener('resize',u,{passive:true})}
function loader(){const l=$('#loader');if(!l)return;const hide=()=>l.classList.add('hidden');if(matchMedia?.('(prefers-reduced-motion: reduce)').matches)hide();else setTimeout(hide,650)}
function counters(){$$('[data-count]').forEach(el=>{if(el.dataset.ready)return;el.dataset.ready=1;const target=Math.max(0,parseInt(el.dataset.count||0));const run=()=>{const st=performance.now();const f=now=>{const p=Math.min(1,(now-st)/900),e=1-(1-p)**3;el.textContent=Math.floor(target*e).toLocaleString('en-IN');if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)};if(!('IntersectionObserver'in window)){run();return}const o=new IntersectionObserver(es=>{if(es[0]?.isIntersecting){run();o.disconnect()}},{threshold:.35});o.observe(el)})}
function fmt(n){if(!Number.isFinite(n))return'0';if(n>=1e7)return(n/1e7).toFixed(2)+' Cr';if(n>=1e5)return(n/1e5).toFixed(2)+' L';return Math.round(n).toLocaleString('en-IN')}
let sipChart=null;window.sipChart=null;
function sip(){const a=$('#sip-amount'),y=$('#sip-years'),r=$('#sip-rate');if(!a||!y||!r)return;const av=$('#sip-amount-val'),yv=$('#sip-years-val'),rv=$('#sip-rate-val');const read=(e,d)=>Number.isFinite(parseFloat(e?.value))?parseFloat(e.value):d;
 const calc=()=>{const P=Math.max(0,read(av||a,5000)),yrs=Math.max(1,read(yv||y,15)),rate=Math.max(0,read(rv||r,12)),m=Math.round(yrs*12),mr=rate/1200;const fv=mr===0?P*m:P*((Math.pow(1+mr,m)-1)/mr)*(1+mr),inv=P*m,ret=Math.max(0,fv-inv);[['total-invested',inv],['expected-returns',ret],['total-value',fv]].forEach(([id,v])=>{const e=$('#'+id);if(e)e.textContent='₹'+fmt(v)});if(typeof Chart==='undefined'||!$('#sip-chart'))return;if(sipChart)try{sipChart.destroy()}catch(e){}const dark=document.documentElement.dataset.theme==='dark',tc=dark?'#b0aac8':'#555770',gc=dark?'rgba(255,255,255,.07)':'rgba(0,0,0,.06)',labels=[],inv=[],val=[];for(let yr=1;yr<=yrs;yr++){const mm=yr*12;labels.push('Yr '+yr);inv.push(P*mm);val.push(mr===0?P*mm:P*((Math.pow(1+mr,mm)-1)/mr)*(1+mr))}sipChart=new Chart($('#sip-chart').getContext('2d'),{type:'bar',data:{labels,datasets:[{label:'Total Invested',data:inv,backgroundColor:'rgba(36,72,216,.7)',borderRadius:4},{label:'Expected Value',data:val,backgroundColor:'rgba(75,46,131,.85)',borderRadius:4}]},options:{responsive:true,maintainAspectRatio:false,scales:{x:{grid:{color:gc},ticks:{color:tc}},y:{beginAtZero:true,grid:{color:gc},ticks:{color:tc}}},plugins:{legend:{labels:{color:tc}}}}});window.sipChart=sipChart};
 [[a,av],[y,yv],[r,rv]].forEach(([range,field])=>{range?.addEventListener('input',()=>{if(field)field.value=range.value;calc()});field?.addEventListener('input',()=>{range.value=field.value;calc()})});window.refreshSipChart=calc;calc()}
function faq(){$$('.faq-item').forEach(item=>{const b=$('.faq-question',item);if(!b||b.dataset.ready)return;b.dataset.ready=1;b.addEventListener('click',()=>{const open=item.classList.contains('open');$$('.faq-item').forEach(x=>x.classList.remove('open'));if(!open)item.classList.add('open')})})}
function testimonials(){const t=$('#testimonial-track');if(!t)return;const cards=$$('.testimonial-card',t);if(cards.length<2)return;const dots=$$('.dot'),prev=$('#prev-btn'),next=$('#next-btn');let i=0,timer;const go=n=>{i=(n+cards.length)%cards.length;t.style.transform=`translateX(-${i*100}%)`;dots.forEach((d,j)=>d.classList.toggle('active',j===i))};const start=()=>{clearInterval(timer);timer=setInterval(()=>go(i+1),5000)};prev?.addEventListener('click',()=>{go(i-1);start()});next?.addEventListener('click',()=>{go(i+1);start()});dots.forEach(d=>d.addEventListener('click',()=>{go(parseInt(d.dataset.index||0));start()}));go(0);start()}
function comparison(){const s=$('.comparison-grid');if(!s)return;const run=()=>$$('.comp-bar').forEach(b=>setTimeout(()=>b.style.width=(parseFloat(b.dataset.width)||0)+'%',150));if(!('IntersectionObserver'in window)){run();return}const o=new IntersectionObserver(e=>{if(e[0]?.isIntersecting){run();o.disconnect()}},{threshold:.3});o.observe(s)}
function blog(){const bs=$$('.cat-btn'),cs=$$('.blog-card'),q=$('#blog-search');q?.addEventListener('input',()=>{const x=q.value.toLowerCase();cs.forEach(c=>c.hidden=x&&!c.textContent.toLowerCase().includes(x))});bs.forEach(b=>b.addEventListener('click',()=>{bs.forEach(x=>x.classList.remove('active'));b.classList.add('active');const cat=b.dataset.cat||'all';cs.forEach(c=>c.hidden=cat!=='all'&&c.dataset.cat!==cat)}))}
function calcTabs(){const ts=$$('.calc-tab'),ps=$$('.calc-panel');if(!ts.length)return;const activate=t=>{ts.forEach(x=>x.classList.remove('active'));ps.forEach(x=>x.classList.remove('active'));t?.classList.add('active');const p=t&&$('#panel-'+t.dataset.tab);p?.classList.add('active')};const hash=location.hash.slice(1);activate((hash&&$(`.calc-tab[data-tab="${hash}"]`))||ts[0]);ts.forEach(t=>t.addEventListener('click',()=>activate(t)))}

document.addEventListener('DOMContentLoaded',()=>{responsiveHardening();theme();navbar();mobile();scrollProgress();loader();counters();sip();faq();testimonials();comparison();blog();calcTabs();if(typeof AOS!=='undefined')AOS.init({duration:700,once:true,offset:80})});
})();
