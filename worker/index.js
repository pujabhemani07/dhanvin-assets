const BRAND_CSS = `
:root{--da-purple:#4b2e83;--da-blue:#2448d8;--da-gold:#d4af37;--da-ink:#201735}
body{background:#f8f7fc!important;color:var(--da-ink);overflow-x:hidden}
body>div.fixed.top-0.w-full.z-40{z-index:1001!important;background:#17102c!important;padding:7px 0!important;min-height:32px!important}
header.fixed.top-8{z-index:1000!important;top:42px!important;width:min(1400px,calc(100% - 44px))!important;border-radius:28px!important;background:rgba(255,255,255,.98)!important;border:1px solid rgba(75,46,131,.10)!important;box-shadow:0 12px 38px rgba(32,20,67,.12)!important;padding:7px 24px!important}
header.fixed.top-8>div{min-height:68px!important}
header.fixed.top-8 nav{gap:24px!important}
header.fixed.top-8 nav a{font-size:13px!important;color:#55515f!important}
header.fixed.top-8 nav a:first-child{color:#4b2e83!important;font-weight:700!important}
.da-brand-link{display:flex!important;align-items:center!important;justify-content:flex-start!important;width:235px!important;min-width:235px!important;height:64px!important;padding:0!important;overflow:hidden!important;background:#fff!important;border-radius:10px!important}
.da-brand-logo{width:235px!important;height:64px!important;max-width:none!important;max-height:none!important;object-fit:contain!important;object-position:center!important;display:block!important;background:#fff!important;filter:drop-shadow(0 4px 10px rgba(75,46,131,.10))!important}
.hero,body>section:first-of-type{background:linear-gradient(135deg,#f0e8ff 0%,#eeeaff 36%,#e8efff 72%,#fff 100%)!important}
.hero{min-height:760px!important;padding-top:145px!important;padding-bottom:80px!important}
.hero-container{max-width:1240px!important;gap:54px!important}
.hero-badge{background:rgba(255,255,255,.65)!important;border-color:rgba(75,46,131,.16)!important;color:#4b2e83!important;box-shadow:0 6px 18px rgba(75,46,131,.06)!important}
.hero-title{font-size:clamp(3rem,5.2vw,5.25rem)!important;line-height:1.02!important;letter-spacing:-.055em!important;color:#4b2e83!important}
.hero-title .gradient-text{background:linear-gradient(90deg,#4b2e83,#2448d8)!important;-webkit-background-clip:text!important;background-clip:text!important}
.hero-desc{font-size:1.08rem!important;max-width:650px!important;color:#4e5567!important;line-height:1.7!important}
.hero-illustration{min-height:470px!important}.hero-svg{max-width:560px!important;filter:drop-shadow(0 22px 44px rgba(75,46,131,.16))!important}
.float-card{border-radius:18px!important;box-shadow:0 16px 38px rgba(50,35,80,.14)!important}.hero-stats{background:rgba(255,255,255,.72)!important;border-color:rgba(255,255,255,.9)!important;backdrop-filter:blur(12px)!important}
.trusted-by{background:#fff!important;padding:28px 0!important}.trusted-label{letter-spacing:2.2px!important}
.partner-chip{background:#fff!important;border-color:#e8e4ef!important;box-shadow:0 3px 12px rgba(50,35,80,.04)!important}
.section-padding{padding:92px 0!important}.section-header{margin-bottom:46px!important}.section-title{font-size:clamp(2rem,3.3vw,3rem)!important;letter-spacing:-.035em!important}.section-subtitle{max-width:680px!important}
.premium-card,.service-card,.testimonial-card,.blog-card,.calculator-card,.contact-card,.insight-card{border-radius:22px!important;box-shadow:0 12px 38px rgba(58,38,93,.08)!important;border:1px solid rgba(75,46,131,.08)!important;background:#fff!important}
.premium-card:hover,.service-card:hover,.testimonial-card:hover,.blog-card:hover,.calculator-card:hover,.contact-card:hover,.insight-card:hover{transform:translateY(-5px)!important;box-shadow:0 20px 48px rgba(58,38,93,.13)!important}
.cta-section,.newsletter-box{background:linear-gradient(135deg,#4b2e83,#2448d8)!important}
.page-hero{background:linear-gradient(135deg,#4b2e83,#2448d8)!important}
.whatsapp-float{z-index:1200!important}
footer{background:linear-gradient(135deg,#160d2d,#26134b)!important}
input,select,textarea{border-radius:12px!important}
@media(max-width:1024px){header.fixed.top-8{width:calc(100% - 24px)!important}.hero{min-height:auto!important;padding-top:135px!important}.hero-container{grid-template-columns:1fr!important;gap:34px!important}.hero-illustration{min-height:390px}.hero-svg{margin:auto}.hero-title{font-size:clamp(2.7rem,8vw,4.4rem)!important}}
@media(max-width:640px){header.fixed.top-8{top:38px!important;width:calc(100% - 14px)!important;border-radius:20px!important;padding:5px 9px!important}header.fixed.top-8>div{min-height:52px!important}.da-brand-link{width:190px!important;min-width:190px!important;height:50px!important}.da-brand-logo{width:190px!important;height:50px!important}.hero{padding-top:118px!important;padding-bottom:55px!important}.hero-title{font-size:clamp(2.35rem,12vw,3.5rem)!important}.hero-desc{font-size:.98rem!important}.hero-btns .btn{width:100%;justify-content:center}.hero-illustration{min-height:300px}.section-padding{padding:64px 0!important}}
`;

const BRAND_JS = `
(function(){
 function init(){
  const drawer=document.getElementById('mobile-menu-drawer');
  const open=document.getElementById('mobile-menu-btn');
  const close=document.getElementById('mobile-menu-close');
  const html=document.documentElement;
  document.querySelectorAll('.theme-toggle').forEach(btn=>{if(btn.dataset.daBound)return;btn.dataset.daBound='1';btn.addEventListener('click',function(){const next=html.getAttribute('data-theme')==='dark'?'light':'dark';html.setAttribute('data-theme',next);try{localStorage.setItem('da-theme',next)}catch(e){}document.querySelectorAll('.sun-icon').forEach(i=>i.classList.toggle('hidden',next!=='dark'));document.querySelectorAll('.moon-icon').forEach(i=>i.classList.toggle('hidden',next==='dark'))})});
  if(open&&drawer&&!open.dataset.daBound){open.dataset.daBound='1';open.addEventListener('click',()=>{drawer.classList.remove('hidden');document.body.classList.add('menu-open')})}
  if(close&&drawer&&!close.dataset.daBound){close.dataset.daBound='1';close.addEventListener('click',()=>{drawer.classList.add('hidden');document.body.classList.remove('menu-open')})}
  const saved=(function(){try{return localStorage.getItem('da-theme')}catch(e){return null}})()||html.getAttribute('data-theme')||'light';html.setAttribute('data-theme',saved);document.querySelectorAll('.sun-icon').forEach(i=>i.classList.toggle('hidden',saved!=='dark'));document.querySelectorAll('.moon-icon').forEach(i=>i.classList.toggle('hidden',saved==='dark'));
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();`;

export default {async fetch(request,env){
 const url=new URL(request.url);
 const response=await env.ASSETS.fetch(request);
 const contentType=response.headers.get('content-type')||'';
 /* The homepage has its own reference-video CSS/JS system. Do not layer the
    legacy Worker skin on top of it; that caused duplicate theme handlers and
    competing hero/navbar geometry. Inner pages continue to use the Worker skin. */
 if((url.pathname==='/'||url.pathname==='/index.html')&&contentType.includes('text/html'))return response;
 if(!contentType.includes('text/html'))return response;
 return new HTMLRewriter()
  .on('head',{element(element){element.append(`<style id="dhanvin-reference-video">${BRAND_CSS}</style>`,{html:true});element.append(`<link rel="stylesheet" href="/css/video-reference.css">`,{html:true});element.append(`<link rel="icon" href="/assets/dhanvin-logo.svg" type="image/svg+xml">`,{html:true})}})
  .on('header > div > a[href="index.html"]',{element(element){element.setAttribute('class','da-brand-link');element.setAttribute('aria-label','Dhanvin Assets Pvt Ltd home');element.setInnerContent(`<img class="da-brand-logo" src="/assets/dhanvin-logo.svg" alt="Dhanvin Assets Pvt Ltd" width="235" height="64" decoding="async" fetchpriority="high">`,{html:true})}})
  .on('body',{element(element){element.append(`<script id="dhanvin-reference-video-js">${BRAND_JS}<\\/script>`,{html:true})}})
  .transform(response);
}};
