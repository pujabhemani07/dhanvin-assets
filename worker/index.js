const BRAND_CSS = `
/* Dhanvin Assets visual system v3 — official-logo + video-inspired polish */
:root { --da-purple:#4b2e83; --da-blue:#2448d8; --da-gold:#d4af37; --da-ink:#171225; }
html { scroll-behavior:smooth; }
body { background:#fbfaff !important; color:var(--da-ink); }
header.fixed.top-8 { top:34px !important; width:min(1400px, calc(100% - 40px)) !important; border-radius:24px !important; padding:10px 26px !important; background:rgba(255,255,255,.97) !important; border:1px solid rgba(75,46,131,.12) !important; box-shadow:0 14px 40px rgba(75,46,131,.12) !important; backdrop-filter:blur(18px) !important; -webkit-backdrop-filter:blur(18px) !important; }
header.fixed.top-8 > div { min-height:64px; }
header.fixed.top-8 nav a { transition:color .2s ease, transform .2s ease; }
header.fixed.top-8 nav a:hover { transform:translateY(-1px); }
.da-brand-link { display:flex !important; align-items:center !important; justify-content:flex-start !important; min-width:220px !important; padding:3px 7px !important; border-radius:14px !important; background:#fff !important; }
.da-brand-logo { width:220px !important; height:auto !important; max-height:72px !important; object-fit:contain !important; object-position:left center !important; display:block !important; background:#fff !important; filter:drop-shadow(0 5px 14px rgba(75,46,131,.14)) !important; transition:transform .25s ease, filter .25s ease !important; }
.da-brand-link:hover .da-brand-logo { transform:scale(1.025); filter:drop-shadow(0 8px 20px rgba(75,46,131,.20)) !important; }
body > section:first-of-type { background:linear-gradient(135deg,#f7f3ff 0%,#eef2ff 52%,#ffffff 100%) !important; }
body > section:first-of-type h1 { letter-spacing:-.035em !important; }
body > section:first-of-type h1 span { background:linear-gradient(90deg,#4b2e83 0%,#2448d8 100%) !important; -webkit-background-clip:text !important; background-clip:text !important; -webkit-text-fill-color:transparent !important; }
body > section:first-of-type a[href*="booking"] { background:linear-gradient(135deg,#4b2e83,#2448d8) !important; box-shadow:0 14px 28px rgba(75,46,131,.20) !important; }
body > section:first-of-type a[href*="booking"]:hover { box-shadow:0 18px 34px rgba(75,46,131,.28) !important; transform:translateY(-2px); }
.glass { box-shadow:0 18px 55px rgba(75,46,131,.10) !important; }
section { scroll-margin-top:110px; }
@media (max-width:1024px) { .da-brand-logo { width:185px !important; max-height:62px !important; } .da-brand-link { min-width:185px !important; } header.fixed.top-8 { width:calc(100% - 24px) !important; padding:8px 18px !important; } }
@media (max-width:640px) { .da-brand-logo { width:150px !important; max-height:54px !important; } .da-brand-link { min-width:150px !important; padding:2px 4px !important; } header.fixed.top-8 { top:30px !important; width:calc(100% - 16px) !important; border-radius:20px !important; padding:7px 12px !important; } }
`;

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    return new HTMLRewriter()
      .on("head", {
        element(element) {
          element.append(`<style id="dhanvin-brand-v3">${BRAND_CSS}</style>`, { html: true });
        }
      })
      .on("header > div > a[href=\"index.html\"]", {
        element(element) {
          element.setAttribute("class", "da-brand-link");
          element.setAttribute("aria-label", "Dhanvin Assets Pvt Ltd home");
          element.setInnerContent(`<img class="da-brand-logo" src="/assets/dhanvin-logo.jpg" alt="Dhanvin Assets Pvt Ltd" width="220" height="72" decoding="async" fetchpriority="high">`, { html: true });
        }
      })
      .transform(response);
  }
};
