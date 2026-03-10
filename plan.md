# HQ.D Website — 3-Phase Update Plan (Speed + SEO First)

## Objectives
- Revert brand accent from Rose Gold back to **Golden** (`#D4AF37` / `hsl(43 74% 49%)`) consistently across UI, CSS variables, gradients, and loading spinner.
- Make the site **insanely fast** (Core Web Vitals focused): reduce JS/CSS cost, optimize videos/images, and remove avoidable render-blocking work.
- Make SEO the #1 growth lever: launch **location landing pages** (NCR, Agra, Jim Corbett, + more), internal linking in footer, clean meta + schema, and updated sitemap.

---

## Phase 1 — Golden Color Revert + Consistency (No POC)
### User stories
1. As a visitor, I see a consistent golden accent across buttons, links, highlights, and badges.
2. As a mobile visitor, the golden theme looks identical across pages and does not shift on load.
3. As the brand owner, I can change the accent in one place (CSS variables) without hunting through JSX.
4. As a visitor, the loading spinner matches the site’s golden theme.
5. As a developer, I can confirm via search that rose-gold HSL/hex no longer exists in the codebase.

### Implementation steps
- Replace palette in `src/index.css`:
  - `--color-accent`, `--primary`, `--accent`, `--ring` → gold HSL.
  - Update `--color-accent-light/dark`.
  - Update selection, gradients, helper classes (`text-gold`, `.gold-line`, `.btn-*`, `.gradient-text`, etc.).
- Replace hardcoded rose-gold usage in components/pages (Navbar/Footer/Home/etc.) with CSS vars (or gold HSL tokens).
- Update `public/index.html` critical CSS spinner border-top color to gold.
- Quick regression sweep: run global search for `#B76E79` and `352 33% 59%` and remove/replace.

### Next actions
- Implement the palette swap + build.
- Visual check: Home, Services, Molecular, Bar Setups, Contact, Footer.

### Success criteria
- No rose-gold tokens remain.
- Accent color appears golden everywhere (CTA, underline, icons, badges, gradients).
- No contrast regressions (buttons readable on dark background).

---

## Phase 2 — Page Speed: Core Web Vitals + Asset Optimization (No POC)
### User stories
1. As a visitor on 4G, the homepage becomes usable immediately (fast FCP/LCP).
2. As a visitor, scrolling is smooth without jank (reduced heavy animations).
3. As a visitor, images load progressively without layout shifts.
4. As a visitor, videos don’t block the main thread or delay first paint.
5. As a search engine, I can crawl quickly without timeouts or heavy JS.

### Implementation steps
**POC (core flow) — Performance Baseline + One Fix Validation**
- Measure current baseline (Lighthouse-style checklist):
  - Bundle size, route JS chunks, LCP element, largest images/videos.
- Apply 1 high-impact change first and validate:
  - Hero videos: change `preload="auto"` → `preload="metadata"` and ensure autoplay still works.
  - Confirm no broken video playback.

**V1 performance pass (after baseline POC works)**
- Video strategy:
  - Hero grid: keep autoplay muted, but `preload=metadata`; add `poster` frames where possible.
  - Reels: ensure `VideoReel` lazy-loads via IntersectionObserver (only play when in-view).
- Images:
  - Ensure all `<img>` have explicit `width/height` (CLS control) + `loading="lazy"` below fold.
  - Prefer `srcSet`/responsive sizes for large images.
- JS/React:
  - Audit `framer-motion` usage: reduce always-on animations; prefer `whileInView` with `viewport={{ once:true }}`.
  - Ensure heavy sections are lazy-rendered below fold.
- CSS/Fonts:
  - Keep font strategy (preconnect + preload) but verify no duplicate loads.
  - Remove unused CSS rules and duplicated styles where feasible.
- Networking:
  - Confirm HTTP caching headers for static assets (if supported by hosting).

### Next actions
- Add a simple `PERF.md` checklist + record before/after metrics.
- Implement hero video preload change + lazy video play.

### Success criteria
- Noticeably faster load and interaction.
- Reduced LCP time (hero) and fewer long tasks.
- CLS near-zero on key pages.

---

## Phase 3 — SEO Location Pages + Internal Linking (No POC)
### User stories
1. As a user searching “bar agency in Delhi NCR”, I land on a relevant HQ.D page with clear CTA.
2. As a user searching “wedding bartender in Agra”, I find a dedicated page with local relevance.
3. As Google, I see unique titles/descriptions + schema per location page.
4. As a visitor, I can navigate to nearby-location pages from the footer.
5. As the business owner, I can add more city pages by editing one config.

### Implementation steps
**POC (core SEO flow) — Ship 1 location page end-to-end**
- Create one location page (e.g., `/locations/delhi-ncr`) with:
  - Unique H1/H2 copy, services summary, FAQs, testimonials snippet, strong CTA.
  - Meta title/description + canonical.
  - LocalBusiness schema with `areaServed` and city.
- Add footer link to that page.
- Add page to `public/sitemap.xml`.

**V1 roll-out (after POC page is correct)**
- Implement location pages from a single data source (config list) to avoid manual duplication:
  - NCR (Delhi/Gurgaon/Noida/Faridabad)
  - Agra
  - Jim Corbett
  - Jaipur, Udaipur, Jodhpur
  - Goa, Mumbai, Bangalore
  - Lucknow, Chandigarh
- Add a “Locations” footer section with clean internal links.
- Update structured data:
  - Base Organization/LocalBusiness on main site.
  - Per-location LocalBusiness (or Service + areaServed) schema on each location page.
- Update `robots.txt` and ensure sitemap references are correct.

### Next actions
- Draft content template (reusable sections) + create Delhi NCR page first.
- Generate remaining pages from config and verify uniqueness.

### Success criteria
- All location pages indexable (no duplicates, unique titles/descriptions).
- Footer provides crawlable internal linking.
- Sitemap includes all new URLs.

---

## Testing & Validation (end of each phase)
- Phase 1: visual regression across all routes; search for old color tokens.
- Phase 2: run performance checks on Home + 2 heavy pages (Bar Setups, Molecular).
- Phase 3: validate meta tags, canonical, schema JSON-LD validity, sitemap correctness.
