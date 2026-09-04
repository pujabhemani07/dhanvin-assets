/* DHANVIN ASSETS – shared interactions */
(function(){
  'use strict';
  function qs(s,c){return (c||document).querySelector(s)}
  function qsa(s,c){return Array.from((c||document).querySelectorAll(s))}

  function initTheme(){
    const html=document.documentElement;
    const body=document.body;
    const btn=qs('#theme')||qs('#theme-toggle');
    const saved=localStorage.getItem('da-theme')||'light';
    function apply(theme){
      html.setAttribute('data-theme',theme);
      body.classList.toggle('dark',theme==='dark');
      if(btn){
        const icon=btn.querySelector('i');
        if(icon) icon.className=theme==='dark'?'fa-solid fa-sun':'fa-solid fa-moon';
        btn.setAttribute('aria-label',theme==='dark'?'Switch to light mode':'Switch to dark mode');
        btn.setAttribute('title',theme==='dark'?'Switch to light mode':'Switch to dark mode');
      }
      if(window.sipChart && typeof window.sipChart.update==='function') window.sipChart.update();
    }
    apply(saved);
    if(btn) btn.addEventListener('click',function(e){e.preventDefault();apply(html.getAttribute('data-theme')==='dark'?'light':'dark');localStorage.setItem('da-theme',html.getAttribute('data-theme'));});
  }

  function initNavbar(){
    const nav=qs('#navbar'); if(!nav)return;
    function scroll(){nav.classList.toggle('scrolled',window.scrollY>50)}
    scroll(); window.addEventListener('scroll',scroll,{passive:true});
  }

  function initMobile(){
    const hamburger=qs('#hamb')||qs('#hamburger');
    const menu=qs('#drawer')||qs('#nav-menu');
    if(!hamburger||!menu)return;
    const close=qs('#drawer-close');
    function toggle(open){
      menu.classList.toggle('open',open); hamburger.classList.toggle('active',open); document.body.style.overflow=open?'hidden':'';
    }
    hamburger.addEventListener('click',function(e){e.stopPropagation();toggle(!menu.classList.contains('open'));});
    if(close)close.addEventListener('click',function(){toggle(false)});
    qsa('a',menu).forEach(a=>a.addEventListener('click',function(){toggle(false)}));
  }

  function initScroll(){
    const bar=qs('#scroll-progress');if(!bar)return;
    function update(){const max=document.documentElement.scrollHeight-window.innerHeight;bar.style.width=(max>0?Math.min(100,window.scrollY/max*100):0)+'%'}
    update();window.addEventListener('scroll',update,{passive:true});
  }

  function initLoader(){const loader=qs('#loader');if(loader)setTimeout(()=>loader.classList.add('hidden'),600)}

  function counters(){qsa('[data-count]').forEach(el=>{const obs=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const target=parseInt(el.dataset.count||'0',10);let cur=0;const step=Math.max(1,target/60);const t=setInterval(()=>{cur+=step;if(cur>=target){cur=target;clearInterval(t)}el.textContent=Math.floor(cur).toLocaleString('en-IN')},16);obs.unobserve(el)}),{threshold:.5});obs.observe(el)})}

  let sipChart=null; window.sipChart=null;
  function fmt(n){if(n>=1e7)return(n/1e7).toFixed(2)+' Cr';if(n>=1e5)return(n/1e5).toFixed(2)+' L';return Math.round(n).toLocaleString('en-IN')}
  function sip(){
    const amount=qs('#sip-amount'),years=qs('#sip-years'),rate=qs('#sip-rate');if(!amount||!years||!rate)return;
    const av=qs('#sip-amount-val'),yv=qs('#sip-years-val'),rv=qs('#sip-rate-val');
    function calc(){
      const P=parseFloat(av.value)||5000,n=parseFloat(yv.value)||15,r=parseFloat(rv.value)||12,mr=r/100/12,mo=n*12;
      const fv=P*(((Math.pow(1+mr,mo)-1)/mr)*(1+mr)),inv=P*mo,ret=fv-inv;
      const set=(id,v)=>{const e=qs('#'+id);if(e)e.textContent='₹'+fmt(v)};set('total-invested',inv);set('expected-returns',ret);set('total-value',fv);
      if(typeof Chart==='undefined')return;const canvas=qs('#sip-chart');if(!canvas)return;
      if(sipChart)sipChart.destroy();const dark=document.documentElement.getAttribute('data-theme')==='dark';
      const tc=dark?'#b0aac8':'#555770',gc=dark?'rgba(255,255,255,.07)':'rgba(0,0,0,.06)',labels=[],di=[],df=[];
      for(let y=1;y<=n;y++){const months=y*12;labels.push('Yr '+y);di.push(Math.round(P*months));df.push(Math.round(P*(((Math.pow(1+mr,months)-1)/mr)*(1+mr))))}
      sipChart=new Chart(canvas.getContext('2d'),{type:'bar',data:{labels,datasets:[{label:'Total Invested',data:di,backgroundColor:'rgba(36,72,216,.7)',borderRadius:4},{label:'Expected Value',data:df,backgroundColor:'rgba(75,46,131,.85)',borderRadius:4}]},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index'},scales:{x:{grid:{color:gc},ticks:{color:tc}},y:{grid:{color:gc},ticks:{color:tc,callback:v=>v>=1e7?(v/1e7).toFixed(1)+'Cr':v>=1e5?(v/1e5).toFixed(0)+'L':v}}},plugins:{legend:{labels:{color:tc}},tooltip:{callbacks:{label:c=>c.dataset.label+': ₹'+fmt(c.parsed.y)}}}}});
    }
    [[amount,av],[years,yv],[rate,rv]].forEach(([r,i])=>{r.addEventListener('input',()=>{i.value=r.value;calc()});i.addEventListener('input',()=>{r.value=i.value;calc()})});calc();
  }

  function faq(){qsa('.faq-item').forEach(item=>{const btn=qs('.faq-question',item);if(!btn)return;btn.addEventListener('click',()=>{const open=item.classList.contains('open');qsa('.faq-item').forEach(x=>x.classList.remove('open'));if(!open)item.classList.add('open')})})}

  function testimonials(){const track=qs('#testimonial-track');if(!track)return;const cards=qsa('.testimonial-card',track),dots=qsa('.dot'),prev=qs('#prev-btn'),next=qs('#next-btn');let cur=0,timer;
    function go(i){cur=(i+cards.length)%cards.length;track.style.transform='translateX(-'+cur*100+'%)';dots.forEach((d,n)=>d.classList.toggle('active',n===cur))}
    function start(){timer=setInterval(()=>go(cur+1),5000)}function stop(){clearInterval(timer)}
    if(prev)prev.addEventListener('click',()=>{stop();go(cur-1);start()});if(next)next.addEventListener('click',()=>{stop();go(cur+1);start()});dots.forEach(d=>d.addEventListener('click',()=>{stop();go(parseInt(d.dataset.index,10));start()}));go(0);start();
  }

  function comparison(){const section=qs('.comparison-grid');if(!section)return;const obs=new IntersectionObserver(es=>{if(!es[0].isIntersecting)return;qsa('.comp-bar').forEach(b=>setTimeout(()=>b.style.width=(b.dataset.width||0)+'%',150));qsa('.comp-corpus-val').forEach(v=>{const target=parseFloat(v.dataset.value)||0;let cur=0;const t=setInterval(()=>{cur+=target/45;if(cur>=target){cur=target;clearInterval(t)}v.textContent='₹'+cur.toFixed(2)+' Cr'},25)});obs.disconnect()},{threshold:.3});obs.observe(section)}

  function blogFilter(){const btns=qsa('.cat-btn'),cards=qsa('.blog-card'),search=qs('#blog-search');if(search)search.addEventListener('input',()=>{const q=search.value.toLowerCase();cards.forEach(c=>c.style.display=c.textContent.toLowerCase().includes(q)?'block':'none')});btns.forEach(btn=>btn.addEventListener('click',()=>{btns.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const cat=btn.dataset.cat;cards.forEach(c=>c.style.display=cat==='all'||c.dataset.cat===cat?'block':'none')}))}

  function calcTabs(){const tabs=qsa('.calc-tab'),panels=qsa('.calc-panel');if(!tabs.length)return;function activate(tab){tabs.forEach(t=>t.classList.remove('active'));panels.forEach(p=>p.classList.remove('active'));tab.classList.add('active');const p=qs('#panel-'+tab.dataset.tab);if(p)p.classList.add('active')}tabs.forEach(t=>t.addEventListener('click',()=>activate(t)));const h=location.hash.replace('#','');const t=qs('.calc-tab[data-tab="'+h+'"]');activate(t||tabs[0])}

  document.addEventListener('DOMContentLoaded',function(){initTheme();initNavbar();initMobile();initScroll();initLoader();counters();sip();faq();testimonials();comparison();blogFilter();calcTabs();if(typeof AOS!=='undefined')AOS.init({duration:700,once:true,offset:80})});
})();
