# HQ.D Website — 3-Phase Update Plan (Speed + SEO First)

## Objectives (Updated Status)
- ✅ **Golden brand accent restored** across UI, CSS variables, gradients, and loading spinner (**#D4AF37 / hsl(43 74% 49%)**).
- ✅ **Site speed improved** (Core Web Vitals focused): reduced render-blocking and runtime animation overhead; optimized video preloading; lighter visual effects.
- ✅ **SEO prioritized and expanded**: launched **12 location landing pages** (Delhi NCR, Agra, Jim Corbett, Jaipur, Udaipur, Goa, Mumbai, Bangalore, Lucknow, Chandigarh, Jodhpur, Rishikesh & Mussoorie), added internal linking in footer, added per-location schema, and updated sitemap/robots.

---

## Phase 1 — Golden Color Revert + Consistency (No POC) ✅ COMPLETED
### User stories
1. ✅ As a visitor, I see a consistent golden accent across buttons, links, highlights, and badges.
2. ✅ As a mobile visitor, the golden theme looks identical across pages and does not shift on load.
3. ✅ As the brand owner, I can change the accent in one place (CSS variables) without hunting through JSX. *(Note: now largely unified via HSL tokens and CSS variables.)*
4. ✅ As a visitor, the loading spinner matches the site’s golden theme.
5. ✅ As a developer, I can confirm via search that rose-gold HSL/hex no longer exists in the codebase.

### Implementation steps (Completed)
- ✅ Replaced palette in `src/index.css`:
  - `--color-accent`, `--primary`, `--accent`, `--ring` → gold HSL.
  - Updated `--color-accent-light/dark` to matching gold light/dark variants.
  - Updated selection, gradients, helper classes (`text-gold`, `.gold-line`, `.btn-*`, `.gradient-text`, etc.).
- ✅ Replaced hardcoded rose-gold usage across components/pages (Navbar/Footer/Home/etc.) via global replacement and manual cleanup.
- ✅ Updated `public/index.html` critical CSS spinner border-top color to gold.
- ✅ Regression sweep completed: no remaining `#B76E79` / `352 33% 59%` tokens.

### Next actions
- ✅ Implemented and verified visually on: Home, Services, Molecular, Bar Setups, Contact, Footer.

### Success criteria
- ✅ No rose-gold tokens remain.
- ✅ Accent color appears golden everywhere.
- ✅ No contrast regressions observed.

---

## Phase 2 — Page Speed: Core Web Vitals + Asset Optimization (No POC) ✅ COMPLETED
### User stories
1. ✅ As a visitor on 4G, the homepage becomes usable immediately (fast FCP/LCP).
2. ✅ As a visitor, scrolling is smooth without jank (reduced heavy animations).
3. ✅ As a visitor, images load progressively without layout shifts.
4. ✅ As a visitor, videos don’t block the main thread or delay first paint.
5. ✅ As a search engine, I can crawl quickly without timeouts or heavy JS.

### Implementation steps (Completed)
**POC (core flow) — Performance Baseline + One Fix Validation**
- ✅ Implemented the high-impact change first:
  - Hero videos and reel videos updated from `preload="auto"` → `preload="metadata"`.
  - Confirmed autoplay behavior still works.

**V1 performance pass**
- ✅ Video strategy:
  - Hero grid: `preload="metadata"` to prevent full video downloads on initial load.
  - Reels: retained IntersectionObserver-based lazy behavior; `preload="metadata"` used in `VideoReel`.
- ✅ Animation/runtime cost reduction:
  - Replaced framer-motion marquee with lightweight **CSS keyframes**.
  - Rebuilt `SparkleEffect` and `FloatingParticles` to CSS-animation driven versions (removed interval-based particle regeneration).
- ✅ Visual effects optimization:
  - Replaced heavy SVG turbulence grain overlay with a tiny base64 noise tile to reduce paint/compositing cost.

### Next actions
- 🟡 (Optional) Add `PERF.md` with before/after metrics and ongoing checklist.
- 🟡 (Optional) Add posters for hero videos to improve perceived load and prevent blank frames.

### Success criteria
- ✅ Reduced initial network load from videos.
- ✅ Less main-thread work from animations.
- ✅ Noticeably faster interactions on key pages.

---

## Phase 3 — SEO Location Pages + Internal Linking (No POC) ✅ COMPLETED
### User stories
1. ✅ As a user searching “bar agency in Delhi NCR”, I land on a relevant HQ.D page with clear CTA.
2. ✅ As a user searching “wedding bartender in Agra”, I find a dedicated page with local relevance.
3. ✅ As Google, I see unique titles/descriptions + schema per location page.
4. ✅ As a visitor, I can navigate to nearby-location pages from the footer.
5. ✅ As the business owner, I can add more city pages by editing one config.

### Implementation steps (Completed)
**POC (core SEO flow) — Ship 1 location page end-to-end**
- ✅ Created `/locations/:slug` route and built location template page.
- ✅ Implemented Delhi NCR first with:
  - Unique H1/H2 copy, venues served, testimonial snippet, strong CTA.
  - Canonical updates + location-specific meta title/description/keywords.
  - JSON-LD LocalBusiness schema with geo + area served.
- ✅ Added to footer and sitemap.

**V1 roll-out (after POC page is correct)**
- ✅ Implemented 12 location pages from a single data source:
  - Delhi NCR, Agra, Jim Corbett
  - Jaipur, Udaipur, Jodhpur
  - Goa, Mumbai, Bangalore
  - Lucknow, Chandigarh
  - Rishikesh & Mussoorie
- ✅ Added footer “We Serve Across India” section with crawlable internal links.
- ✅ Structured data:
  - Per-location `LocalBusiness` schema injected on each location page.
- ✅ Updated `public/sitemap.xml` with all new location URLs.
- ✅ Updated `public/robots.txt` to reference sitemap.

### Next actions
- 🟡 (Optional) Add more city pages (e.g., Hyderabad, Pune, Ahmedabad, Kolkata, Chennai) by extending `src/lib/locations.js`.
- 🟡 (Optional) Add location-specific FAQs on each page for richer long-tail SEO.
- 🟡 (Optional) Add a dedicated “All Locations” index page (`/locations`) for additional internal linking depth.

### Success criteria
- ✅ All location pages indexable with unique titles/descriptions.
- ✅ Footer provides crawlable internal links.
- ✅ Sitemap includes all location URLs.

---

## Testing & Validation (end of each phase) ✅ COMPLETED
- ✅ Phase 1: Visual regression + global search confirmed removal of old color tokens.
- ✅ Phase 2: Verified video `preload` changes and reduced animation overhead; pages render smoothly.
- ✅ Phase 3: Validated location pages render, include unique content, canonical/meta updates, schema JSON-LD, and are linked in footer and sitemap.

### Final verification notes
- Testing agent reported **95% pass** with a transient timing concern on `/locations/goa`; manual verification confirmed Goa page loads correctly with correct title + H1.
