
/* Final contrast fix for the site's actual video-reference service-page classes. */
.pagehero{background:#24104f!important;color:#fff!important;min-height:300px!important;padding:150px 0 78px!important;}
.pagehero::before,.pagehero::after{display:none!important;}
.pagehero .wrap{position:relative!important;z-index:5!important;}
.pagehero .kicker{color:#f5c842!important;font-weight:800!important;}
.pagehero h1{color:#fff!important;font-weight:800!important;text-shadow:none!important;}
.pagehero p{color:#fff!important;font-weight:500!important;opacity:1!important;}
.crumb{color:#fff!important;font-weight:600!important;opacity:1!important;}
html[data-theme="dark"] .pagehero{background:#120925!important;color:#fff!important;}
html[data-theme="dark"] .pagehero h1,html[data-theme="dark"] .pagehero p,html[data-theme="dark"] .crumb{color:#fff!important;}
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

/* ===== ABSOLUTE FINAL FOOTER RESET ===== */
footer.footer{display:block!important;width:100%!important;box-sizing:border-box!important;}
footer.footer *{box-sizing:border-box!important;}
footer.footer .container{width:min(1200px,calc(100% - 48px))!important;margin:0 auto!important;}
footer.footer .footer-grid{display:grid!important;grid-template-columns:1.15fr 1fr 1.35fr 1.55fr!important;column-gap:56px!important;row-gap:36px!important;align-items:start!important;}
footer.footer .footer-grid>div{display:block!important;min-width:0!important;width:auto!important;float:none!important;}
footer.footer .footer-col h4{display:block!important;margin:0 0 18px!important;font-size:16px!important;line-height:1.25!important;}
footer.footer .footer-grid ul,
footer.footer ul.footer-contact{display:block!important;list-style:none!important;margin:0!important;padding:0!important;width:100%!important;float:none!important;}
footer.footer .footer-grid ul li,
footer.footer ul.footer-contact li{display:block!important;position:static!important;float:none!important;clear:both!important;width:100%!important;height:auto!important;margin:0 0 10px!important;padding:0!important;line-height:1.55!important;white-space:normal!important;}
footer.footer .footer-grid ul li::before{display:none!important;}
footer.footer .footer-grid ul li a{display:block!important;width:100%!important;margin:0!important;padding:0!important;line-height:1.55!important;white-space:normal!important;word-break:normal!important;overflow-wrap:anywhere!important;}
footer.footer .footer-contact-col{padding-left:28px!important;border-left:1px solid rgba(255,255,255,.16)!important;}
footer.footer ul.footer-contact li{display:flex!important;align-items:flex-start!important;gap:10px!important;}
footer.footer ul.footer-contact li i{display:block!important;flex:0 0 18px!important;width:18px!important;margin-top:4px!important;}
footer.footer ul.footer-contact li a{flex:1 1 auto!important;width:auto!important;}
footer.footer .footer-brand-name{display:inline-block!important;font-size:20px!important;font-weight:800!important;margin-bottom:14px!important;color:#fff!important;text-decoration:none!important;}
footer.footer .footer-brand-name span{color:#d4af37!important;}
footer.footer .footer-tagline{display:block!important;max-width:270px!important;margin:0 0 22px!important;line-height:1.65!important;}
footer.footer .social-links{display:flex!important;flex-direction:row!important;align-items:center!important;gap:12px!important;width:auto!important;}
footer.footer .social-link{display:flex!important;align-items:center!important;justify-content:center!important;width:36px!important;height:36px!important;}
footer.footer .footer-bottom{display:block!important;width:100%!important;margin-top:44px!important;}
footer.footer .footer-disclaimer{display:block!important;width:100%!important;max-width:none!important;margin:0 0 10px!important;line-height:1.65!important;}
footer.footer .footer-legal{display:flex!important;align-items:center!important;gap:16px!important;flex-wrap:wrap!important;}
@media(max-width:900px){
 footer.footer .footer-grid{grid-template-columns:1fr 1fr!important;column-gap:36px!important;}
 footer.footer .footer-contact-col{padding-left:0!important;border-left:0!important;}
}
@media(max-width:600px){
 footer.footer .container{width:calc(100% - 32px)!important;}
 footer.footer .footer-grid{grid-template-columns:1fr!important;}
 footer.footer .footer-contact-col{padding-left:0!important;border-left:0!important;}
}
/* FINAL FOOTER LAYOUT FIX */
footer .footer-grid{display:grid!important;grid-template-columns:minmax(220px,1.25fr) minmax(160px,.9fr) minmax(190px,1.15fr) minmax(300px,1.5fr)!important;gap:3.5rem!important;align-items:start!important;width:100%!important}
footer .footer-grid>div{min-width:0!important}
footer .footer-logo{display:inline-flex!important;align-items:center!important;margin-bottom:1rem!important}
footer .footer-tagline{display:block!important;max-width:260px!important;line-height:1.65!important;margin:0 0 1.5rem!important}
footer .footer-grid ul{display:flex!important;flex-direction:column!important;gap:.65rem!important;list-style:none!important;margin:0!important;padding:0!important}
footer .footer-grid ul li{display:block!important;margin:0!important;padding:0!important;line-height:1.5!important}
footer .footer-grid ul li a{display:block!important;white-space:normal!important;line-height:1.5!important}
footer .footer-col h4{margin:0 0 1rem!important}
footer .footer-contact li{display:flex!important;align-items:flex-start!important;gap:.65rem!important;margin:0 0 .8rem!important}
footer .footer-contact li a{display:inline!important;white-space:normal!important;word-break:break-word!important}
footer .social-links{display:flex!important;flex-direction:row!important;gap:.75rem!important;margin-top:1rem!important}
footer .social-link{display:flex!important;width:36px!important;height:36px!important;align-items:center!important;justify-content:center!important}
footer .footer-bottom{display:block!important;width:100%!important}
footer .footer-disclaimer{display:block!important;max-width:1100px!important;line-height:1.65!important}
footer .footer-legal{display:flex!important;align-items:center!important;gap:1.5rem!important;flex-wrap:wrap!important}
@media(max-width:900px){
 footer .footer-grid{grid-template-columns:1fr 1fr!important;gap:2.5rem!important}
}
@media(max-width:600px){
 footer .footer-grid{grid-template-columns:1fr!important;gap:2rem!important}
 footer .footer-tagline{max-width:320px!important}
}

/* Dark-mode hardening for worker-injected reference styles. */
html[data-theme="dark"] body{background:#0f0a1e!important;color:#f0efff!important}
html[data-theme="dark"] header.fixed.top-8{background:rgba(15,10,30,.96)!important;border-color:#2e2550!important;box-shadow:0 12px 38px rgba(0,0,0,.35)!important}
html[data-theme="dark"] header.fixed.top-8 nav a{color:#b0aac8!important}
html[data-theme="dark"] header.fixed.top-8 nav a:first-child{color:#d8cdf5!important}
html[data-theme="dark"] .da-brand-link{background:#1e1535!important}
html[data-theme="dark"] .da-brand-logo{background:#1e1535!important}
html[data-theme="dark"] .hero,html[data-theme="dark"] body>section:first-of-type{background:linear-gradient(135deg,#1a1130 0%,#15132b 42%,#101b36 100%)!important}
html[data-theme="dark"] .hero-badge{background:rgba(75,46,131,.25)!important;border-color:rgba(107,71,184,.4)!important;color:#d8cdf5!important}
html[data-theme="dark"] .hero-title{color:#f0efff!important}
html[data-theme="dark"] .hero-title .gradient-text{background:linear-gradient(90deg,#c9b8ff,#7f9cff)!important;-webkit-background-clip:text!important;background-clip:text!important}
html[data-theme="dark"] .hero-desc{color:#b0aac8!important}
html[data-theme="dark"] .hero-stats{background:#1e1535!important;border-color:#2e2550!important}
html[data-theme="dark"] .float-card{background:#1e1535!important;border-color:#2e2550!important;color:#f0efff!important}
html[data-theme="dark"] .trusted-by{background:#1a1130!important}
html[data-theme="dark"] .partner-chip{background:#1e1535!important;border-color:#2e2550!important;color:#b0aac8!important}
html[data-theme="dark"] .premium-card,html[data-theme="dark"] .service-card,html[data-theme="dark"] .testimonial-card,html[data-theme="dark"] .blog-card,html[data-theme="dark"] .calculator-card,html[data-theme="dark"] .contact-card,html[data-theme="dark"] .insight-card,html[data-theme="dark"] .benefit-card,html[data-theme="dark"] .comparison-card,html[data-theme="dark"] .calc-wrapper{background:#1e1535!important;border-color:#2e2550!important;color:#f0efff!important;box-shadow:0 12px 38px rgba(0,0,0,.28)!important}
html[data-theme="dark"] .premium-card p,html[data-theme="dark"] .service-card p,html[data-theme="dark"] .testimonial-card p,html[data-theme="dark"] .blog-card p,html[data-theme="dark"] .contact-card p,html[data-theme="dark"] .insight-card p,html[data-theme="dark"] .benefit-card p,html[data-theme="dark"] .comparison-card p,html[data-theme="dark"] .section-subtitle,html[data-theme="dark"] .tl-content p{color:#b0aac8!important}
html[data-theme="dark"] .section-title,html[data-theme="dark"] h1,html[data-theme="dark"] h2,html[data-theme="dark"] h3,html[data-theme="dark"] h4,html[data-theme="dark"] h5,html[data-theme="dark"] h6{color:#f0efff}
html[data-theme="dark"] .section-badge{background:rgba(75,46,131,.3)!important;border-color:rgba(107,71,184,.4)!important;color:#d8cdf5!important}
html[data-theme="dark"] .page-hero{background:linear-gradient(135deg,#251442,#1b2450)!important}
html[data-theme="dark"] .service-illustration{background:linear-gradient(135deg,#1a1130,#101b36)!important}
html[data-theme="dark"] .related-chip{background:#1e1535!important;border-color:#2e2550!important;color:#b0aac8!important}
html[data-theme="dark"] .cta-section,html[data-theme="dark"] .newsletter-box{background:linear-gradient(135deg,#321b5d,#1f3eb5)!important}
html[data-theme="dark"] footer{background:linear-gradient(135deg,#0b0715,#17102c)!important}
html[data-theme="dark"] .theme-toggle{background:#1a1130!important;color:#f0efff!important;border-color:#2e2550!important}

/* FINAL SERVICE-PAGE READABILITY OVERRIDE — must come after every injected brand rule. */
.page-hero{background:#24104f!important;color:#fff!important;opacity:1!important;}
.page-hero::before{display:none!important;}
.page-hero .container{position:relative!important;z-index:3!important;}
.page-hero-title{color:#fff!important;font-weight:800!important;text-shadow:none!important;}
.page-hero-title i{color:#f5c842!important;}
.page-hero p{color:#fff!important;font-weight:500!important;text-shadow:none!important;}
.breadcrumb,.breadcrumb a{color:#fff!important;font-weight:600!important;}
.breadcrumb span{color:#f5c842!important;font-weight:700!important;}
.breadcrumb i{color:#d8cfff!important;}
html[data-theme="dark"] .page-hero{background:#120925!important;color:#fff!important;}
html[data-theme="dark"] .page-hero-title,html[data-theme="dark"] .page-hero p,html[data-theme="dark"] .breadcrumb,html[data-theme="dark"] .breadcrumb a{color:#fff!important;}


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


const FOOTER_FIX_JS = `
(function(){
 function fixFooter(){
  document.querySelectorAll('footer.footer').forEach(function(footer){
   footer.innerHTML = '<div class="container"><div class="footer-grid"><div class="footer-brand"><a href="/" class="footer-brand-name">Dhanvin <span>Assets</span></a><p class="footer-tagline">Your trusted partner in building lasting wealth and securing your family\'s financial future.</p><div class="social-links"><a href="#" class="social-link" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a><a href="#" class="social-link" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a><a href="https://wa.me/919920082826" class="social-link" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a></div></div><div class="footer-col"><h4>Quick Links</h4><ul><li><a href="/">Home</a></li><li><a href="/about.html">About</a></li><li><a href="/calculators.html">Calculators</a></li><li><a href="/resources.html">Resources</a></li><li><a href="/contact.html">Contact</a></li></ul></div><div class="footer-col"><h4>Our Services</h4><ul><li><a href="/services/mutual-funds.html">Mutual Funds</a></li><li><a href="/services/sip-planning.html">SIP Planning</a></li><li><a href="/services/insurance.html">Insurance</a></li><li><a href="/services/retirement-planning.html">Retirement Planning</a></li><li><a href="/services/tax-saving.html">Tax Saving</a></li><li><a href="/services/child-education-planning.html">Child Education</a></li><li><a href="/services/wealth-management.html">Wealth Management</a></li><li><a href="/services/portfolio-review.html">Portfolio Review</a></li></ul></div><div class="footer-col footer-contact-col"><h4>Contact Us</h4><ul class="footer-contact"><li><i class="fa-solid fa-envelope"></i><a href="mailto:dhanvinassetspvtltd@gmail.com">dhanvinassetspvtltd@gmail.com</a></li><li><i class="fa-solid fa-phone"></i><a href="tel:+919320114510">9320114510</a></li><li><i class="fa-solid fa-phone"></i><a href="tel:+919920082826">9920082826</a></li><li><i class="fa-solid fa-phone"></i><a href="tel:+919823626992">9823626992</a></li></ul></div></div><div class="footer-bottom"><p class="footer-disclaimer"><strong>Disclaimer:</strong> Mutual Fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.</p><div class="footer-legal"><span>© 2025 Dhanvin Assets. All rights reserved.</span><a href="/disclaimer.html">Disclaimer</a></div></div></div>';
  });
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fixFooter);else fixFooter();
})();`;
const HOME_UPDATE_JS = `
(function(){
 const phone='919920082826';
 function updateHome(){
  const path=location.pathname.replace(/\\/+$/,'')||'/';
  if(path!=='/'&&path!=='/index.html')return;
  const stats=document.querySelectorAll('.hero-stats .stat-item');
  if(stats[0]){const v=stats[0].querySelector('[data-count]'),s=stats[0].querySelector('.stat-suffix');if(v)v.dataset.count='1';if(s)s.textContent='Cr+';}
  if(stats[1]){const v=stats[1].querySelector('[data-count]'),s=stats[1].querySelector('.stat-suffix');if(v)v.dataset.count='60';if(s)s.textContent='k+';}
  const heroCta=document.querySelector('.hero-btns .btn-primary');
  if(heroCta)heroCta.innerHTML='<i class="fa-solid fa-calendar-check"></i> Start Planning Today';
  const faqCta=document.querySelector('.faqs .btn-outline');
  if(faqCta)faqCta.innerHTML='Request Your Financial Assessment <i class="fa-solid fa-arrow-right"></i>';
  document.querySelectorAll('footer .social-links a').forEach(a=>{const h=(a.getAttribute('href')||'').toLowerCase();if(h.includes('youtube')||h.includes('linkedin'))a.remove();});
  const contact=Array.from(document.querySelectorAll('footer .footer-col')).find(el=>/Contact Us/i.test((el.querySelector('h4')?el.querySelector('h4').textContent:'')));
  if(contact)contact.innerHTML='<h4>Contact Us</h4><a href="mailto:dhanvinassetspvtltd@gmail.com">dhanvinassetspvtltd@gmail.com</a><a href="tel:+919320114510">9320114510</a><a href="tel:+919920082826">9920082826</a><a href="tel:+919823626992">9823626992</a>';
  document.querySelectorAll('a[href*="wa.me"]').forEach(a=>{a.href='https://wa.me/'+phone;});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',updateHome);else updateHome();
})();`;

export default {async fetch(request,env){
 const url=new URL(request.url);
 const response=await env.ASSETS.fetch(request);
 const contentType=response.headers.get('content-type')||'';
 if((url.pathname==='/'||url.pathname==='/index.html')&&contentType.includes('text/html')){
  const transformed=new HTMLRewriter().on('body',{element(element){element.append(`<script id="dhanvin-home-update-js">${HOME_UPDATE_JS}</script><script id="dhanvin-footer-fix-js">${FOOTER_FIX_JS}</script><meta name="dhanvin-build" content="2026-09-21-contact-disclaimer-v2">`,{html:true})}}).transform(response);
  const headers=new Headers(transformed.headers);headers.set('Cache-Control','no-store, no-cache, must-revalidate, max-age=0');headers.set('Pragma','no-cache');headers.set('X-Dhanvin-Build','2026-09-21-contact-disclaimer-v2');return new Response(transformed.body,{status:transformed.status,statusText:transformed.statusText,headers});
 }
 if(!contentType.includes('text/html'))return response;
 return new HTMLRewriter()
  .on('head',{element(element){element.append(`<style id="dhanvin-reference-video">${BRAND_CSS}</style>`,{html:true});element.append(`<link rel="stylesheet" href="/css/video-reference.css">`,{html:true});element.append(`<link rel="icon" href="/assets/dhanvin-logo.svg" type="image/svg+xml">`,{html:true})}})
  .on('header > div > a[href="index.html"],header > div > a[href="../index.html"]',{element(element){element.remove()}})
  .on('footer.footer',{element(element){element.setInnerContent(`<div class="container"><div class="footer-grid"><div class="footer-brand"><a href="/" class="footer-brand-name">Dhanvin <span>Assets</span></a><p class="footer-tagline">Your trusted partner in building lasting wealth and securing your family's financial future.</p><div class="social-links"><a href="#" class="social-link" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a><a href="#" class="social-link" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a><a href="https://wa.me/919920082826" class="social-link" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a></div></div><div class="footer-col"><h4>Quick Links</h4><ul><li><a href="/">Home</a></li><li><a href="/about.html">About</a></li><li><a href="/calculators.html">Calculators</a></li><li><a href="/resources.html">Resources</a></li><li><a href="/contact.html">Contact</a></li></ul></div><div class="footer-col"><h4>Our Services</h4><ul><li><a href="/services/mutual-funds.html">Mutual Funds</a></li><li><a href="/services/sip-planning.html">SIP Planning</a></li><li><a href="/services/insurance.html">Insurance</a></li><li><a href="/services/retirement-planning.html">Retirement Planning</a></li><li><a href="/services/tax-saving.html">Tax Saving</a></li><li><a href="/services/child-education-planning.html">Child Education</a></li><li><a href="/services/wealth-management.html">Wealth Management</a></li><li><a href="/services/portfolio-review.html">Portfolio Review</a></li></ul></div><div class="footer-col footer-contact-col"><h4>Contact Us</h4><ul class="footer-contact"><li><i class="fa-solid fa-envelope"></i><a href="mailto:dhanvinassetspvtltd@gmail.com">dhanvinassetspvtltd@gmail.com</a></li><li><i class="fa-solid fa-phone"></i><a href="tel:+919320114510">9320114510</a></li><li><i class="fa-solid fa-phone"></i><a href="tel:+919920082826">9920082826</a></li><li><i class="fa-solid fa-phone"></i><a href="tel:+919823626992">9823626992</a></li></ul></div></div><div class="footer-bottom"><p class="footer-disclaimer"><strong>Disclaimer:</strong> Mutual Fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.</p><div class="footer-legal"><span>© 2025 Dhanvin Assets. All rights reserved.</span><a href="/privacy.html">Privacy Policy</a><a href="/terms.html">Terms of Use</a></div></div></div>`,{html:true})}})
  .on('body',{element(element){element.append(`<script id="dhanvin-reference-video-js">${BRAND_JS}</script>`,{html:true})}})
  .transform(response);
}};
