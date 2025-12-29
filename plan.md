# HQ.D Website — Plan (Concise, <200 lines)

## Current Status: ADVANCED ANIMATIONS IMPLEMENTED ✅

### Completed in This Session:
1. ✅ **Advanced Animation System** - Created comprehensive animation library:
   - Custom cursor with magnetic effect
   - Text reveal animations (character-by-character, word-by-word)
   - 3D tilt cards with glare effect
   - Parallax scrolling sections
   - Scroll progress indicator
   - Counter animations
   - Grain/noise texture overlays
   - Staggered entrance animations
   
2. ✅ **Cinematic Homepage Redesign**:
   - Split-screen hero with video grid
   - Animated marquee strip with event types
   - 3D tilt feature cards
   - Magnetic button effects
   - Floating decorative elements with parallax
   - Counter animations (500+ events, 50+ drinks, 15+ cities)
   
3. ✅ **Enhanced Navbar**:
   - Scroll-aware background transition
   - Animated underlines on hover/active
   - Animated mobile menu with stagger
   - Logo hover effects
   
4. ✅ **Premium Polish**:
   - Custom cursor (hidden on mobile)
   - Scroll progress bar (gold line at top)
   - Film grain texture overlay
   - Custom selection highlight
   - Smooth page transitions

## 1) Objectives
- Build a luxury, high-converting website for HQ.D (Headquarters of Drinks)
- Communicate premium cocktail/mocktail bar setups + molecular mixology in 5 seconds
- Drive inquiries: Get a Quote / Check Availability (primary) + WhatsApp (secondary)
- Deliver two interactive tools (template-based): Wedding Hashtag Generator, Signature Drink Generator
- Use React 19 + Tailwind + shadcn/ui + Framer Motion; FastAPI + MongoDB
- Include email notifications to Rupesh@Headquartersofdrinks.co.in for every lead
- Optimize reels (lazy, posters, pause offscreen); strong SEO + a11y

## 2) Level/POC Decision
- External integration present: transactional email → Complex Integration. POC REQUIRED
- Core = “Lead submission reliably saves to DB and sends email to Rupesh”. If broken, site fails its purpose

## 3) Phase 1 – Core POC (Email + Lead Capture)
### Scope
- Backend: FastAPI /api/leads/test-send (POST) saves payload to Mongo (leads) and sends email via provider (SendGrid/Resend – choose after Integration Playbook)
- Env: EMAIL_PROVIDER, SENDGRID_API_KEY or RESEND_API_KEY, EMAIL_TO=Rupesh@Headquartersofdrinks.co.in, EMAIL_FROM (verified)
- Python script test_core.py runs 3 tests in sequence: (1) DB-only save (email disabled), (2) Email send success, (3) Email failure path → graceful error + DB save + admin log
- Email template: gold-on-dark minimal, fields: name, phone, event type, date, city, guests, duration, bar type, message

### Steps
1) Call integration_playbook_expert_v2 → select provider (pref: Resend or SendGrid). Capture required keys + domains
2) Implement email_service with retries/backoff and clear error mapping
3) Implement /api/leads/test-send (and /api/health)
4) Write test_core.py (single script, all flows) → run and FIX UNTIL GREEN
5) Document .env needed; request API key from client; temporary DB-only mode allowed if key pending

### Phase 1 User Stories
- As an admin, when I submit a test lead, I receive an email at Rupesh@… with all fields
- As an admin, if email fails, the lead is still saved and I see a clear error response
- As an admin, I can run one script to confirm email+DB paths work
- As an admin, I can toggle email on/off via env without code change
- As an admin, I get a readable, branded email template (subject: “HQ.D | New Event Inquiry”)

## 4) Phase 2 – Main App Development (Complete Website)
### Information Architecture (Routes)
- / (Home), /services, /bar-setups, /molecular, /menus, /packages, /gallery, /reviews, /about, /faqs, /contact
- /tools/hashtag-generator, /tools/drink-generator

### Design System
- Colors: charcoal #0A0A0A, gold #D4AF37, ivory #FAF8F5, pearl #F5F3EF
- Type: Display Serif (headings), Modern Sans (body); generous line-height
- Tokens: spacing scale 4/8/12/16/24/32/48/64; radius 6/12; shadows subtle; gold hairline dividers
- Motion: slow fade/slide, parallax-lite; respect reduced-motion

### Content/Data Models (Mongo)
- leads, setups, menus, testimonials, gallery_items

### Backend Endpoints (/api prefix)
- GET /api/setups, /api/menus, /api/testimonials, /api/gallery
- POST /api/leads (saves + email); GET /api/health

### Home (Hero + Sections)
- Hero: cinematic reel montage (5 provided videos) autoplay muted loop playsinline; IntersectionObserver to pause offscreen; gradient overlay; headline + CTA
- Molecular moments tiles (mini loops)
- Bar Setups preview: 6–10 premium cards (title, specs, tags) + CTA View All
- Packages preview: 3–4 cards (no prices → “Request Custom Quote”)
- Gallery teaser (tabbed Weddings/Corporate/Private)
- Testimonials strip
- Process: Inquiry → Curation → Setup → Service → Cleanup
- FAQs accordion
- Final CTA: Fast Quote + WhatsApp

### Bar Setups (Hero Feature)
- Filters: Occasion (Mehendi/Haldi/Sangeet/Cocktail/Reception/After-Party/Corporate), Style (Minimal Luxe/Royal/Tropical/Bollywood/Monochrome), Format (Indoor/Outdoor/Compact/Large/Cocktail/Mocktail/Both)
- Cards: reel/thumb, “Best for 150–250 guests”, menu highlights (2–3 signature), molecular tag, CTA “Get this setup for my date” → opens Contact prefilled
- Detail Modal: full reel, description, suggested package/add-ons, CTA Quote + WhatsApp

### Services Pages
- Weddings (moments tiles + add-ons + couple signature cocktail), Corporate (brandable bar/high-volume), Private Parties, Mocktail Bars (optional)

### Molecular Mixology
- Techniques: smoke bubbles, foams, aromatic mists; safety note; reel tiles

### Menus
- Filters: cocktail/mocktail, flavor profile, spirit base, molecular
- Cards: name (include in-house e.g., Kufri, Forever New), tasting notes, garnish, molecular tag

### Packages & Pricing
- Good/Better/Best/Ultra style cards with inclusions; CTA “Check Availability / Request Quote”

### Gallery
- Grid with filters Weddings/Corporate/Private; premium placeholders; lightbox

### Reviews, About, FAQs
- Reviews: testimonial cards; About: brand story & values; FAQs: schema + accordion

### Contact / Book Now
- Form fields: event type, date, city/venue, guests, duration, cocktail/mocktail/both, theme, budget range, message
- On submit → POST /api/leads (save + email). Success screen; mobile sticky CTA bar (Quote + WhatsApp)
- WhatsApp: configurable number; deep link with prefilled message

### Interactive Tools (Template-based)
- Wedding Hashtag Generator: inputs (names, date, city, vibe, language), output 20–40 grouped (Cute/Elegant/Funny/Short); “Copy all” + refinement chips (shorter/funnier/classier)
- Signature Drink Generator: quiz (cocktail/mocktail, flavor profile, spirit, theme color/vibe, molecular moment) → 3 drink concepts (name, notes, ingredients, garnish, presentation); actions: Save as Image (html2canvas), Share (Web Share API or copy)

### SEO & Performance
- React Helmet for meta/OG; JSON-LD for LocalBusiness, Service, FAQ
- Video: lazy load, posters, capped simultaneous plays; responsive images; a11y AA; keyboard nav; reduced-motion

### Tooling & Build Plan
- Call design_agent for detailed UI kit; implement Tailwind theme and shadcn components
- Parallel bulk_file_writer: backend (server.py, models.py, email_service.py, seed_data.py) + frontend (routes, components, styles)
- Validate logs; hot reload; no env hardcoding; all APIs with /api prefix

### Phase 2 User Stories
- As a visitor, I land on the hero and instantly understand HQ.D and can tap “Get a Quote”
- As a mobile user, I always see a sticky bar with Quote + WhatsApp
- As a planner, I filter bar setups and open a detail to request that setup for my date
- As a couple, I generate wedding hashtags and copy all results
- As a guest, I take the drink quiz and save a concept card as an image to share
- As a user, I browse menus by flavor profile and spirit base
- As a user, I open Gallery and filter by event type with fast, smooth loading
- As a user, I submit the contact form and receive a clear success message
- As the business, I receive an email for every lead; duplicates are prevented by basic email+date guard
- As a user, I can reach WhatsApp with a prefilled message from any page

## 5) Next Actions (Client)
- Confirm email provider (Resend or SendGrid) and share API key + verified sender/domain
- Share WhatsApp business number for header + sticky bar
- Optional: provide initial list of in-house drinks and any copy preferences

## 6) Success Criteria
- Phase 1: test_core.py green (DB save, email success, failure-handled); /api/health OK
- Phase 2: All pages implemented with matching routes; forms work end-to-end; videos optimized; AA contrast; JSON-LD present; mobile sticky CTA; testing_agent_v3 E2E pass
- No hardcoded URLs; all backend routes prefixed with /api; zero red-screen errors; delightful, cinematic UI

## 7) Testing Plan
- After Phase 1: run testing_agent_v3 on /api/leads/test-send and error paths
- After Phase 2: testing_agent_v3 end-to-end flows (skip camera/drag-drop). Fix all issues, rerun until pass

