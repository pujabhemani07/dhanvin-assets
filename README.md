# Dhanvin Assets Website

Static HTML, CSS and JavaScript website for Dhanvin Assets.

Production hosting: Cloudflare Workers with Cloudflare Workers Builds connected to GitHub `main`.

The production site is structured with root HTML pages, shared CSS/JS, dedicated service pages, assets and SEO files.

Deployment pipeline check: GitHub → Cloudflare Workers Builds → existing `dhanvinassets.com` / `www.dhanvinassets.com` Worker.
