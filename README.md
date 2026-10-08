# Dhanvin Assets Website

Static HTML, CSS and JavaScript website for Dhanvin Assets.

Production hosting: Cloudflare Workers with Cloudflare Workers Builds connected to GitHub `main`.

The production site is structured with root HTML pages, shared CSS/JS, dedicated service pages, assets and SEO files.

Deployment pipeline check: GitHub → Cloudflare Workers Builds → existing `dhanvinassets.com` / `www.dhanvinassets.com` Worker.

## Live market data (Worker secrets)

The Worker (`worker/index.js`) serves two data endpoints; browser code never sees any API key.

| Endpoint | Source | Key needed |
|---|---|---|
| `/api/ticker` | Yahoo Finance chart API (delayed, unofficial) | none |
| `/api/market?section=trending\|active\|highlow\|funds` | IndianAPI (`stock.indianapi.in`) | `INDIANAPI_KEY` |

Set the key as a **secret** (never commit it):

```
npx wrangler secret put INDIANAPI_KEY
```
or Cloudflare dashboard → Workers → dhanvin-assets → Settings → Variables and Secrets → Add (type: Secret).

Optional variables: `INDIANAPI_BASE` (default `https://stock.indianapi.in`; paid plans use `dev.`/`analyst.`/`pro.indianapi.in`), `INDIANAPI_HEADER` (default `X-Api-Key`).
Until `INDIANAPI_KEY` is set the Market Insights dashboard stays hidden (append `?preview=1` to the page URL to see its placeholder). Responses are cached 5–60 min (6 h outside market hours) to protect plan credits.
