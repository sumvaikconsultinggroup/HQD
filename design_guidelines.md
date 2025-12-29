{
  "brand": {
    "name": "HQ.D (Headquarters of Drinks)",
    "tagline": "We Take Drinks Seriously",
    "attributes": ["noir", "champagne", "cinematic", "editorial", "luxury", "minimal"],
    "voice": "Assured, refined, quietly dramatic."
  },
  "color_system": {
    "intent": "Noir Champagne Cinema + Pearl Editorial Minimal. Near-black canvas with champagne gold accents and warm ivory text; pearl panels used sparingly for contrast.",
    "tokens_css": ":root{\n  --hq-bg: 228 13% 4%; /* #0A0A0A near-black */\n  --hq-fg: 35 33% 97%; /* #FAF8F5 warm ivory */\n  --hq-pearl: 42 20% 95%; /* #F5F3EF pearl panel */\n  --hq-gold: 46 64% 52%; /* #D4AF37 champagne gold */\n  --hq-gold-200: 46 50% 88%;\n  --hq-gold-600: 46 64% 40%;\n  --hq-muted: 220 4% 26%; /* separators on dark */\n  --hq-muted-2: 220 3% 16%;\n  --hq-surface: 226 10% 8%; /* dark surface card */\n  --hq-surface-2: 42 14% 92%; /* light surface card */\n  --hq-ring: 46 64% 52%;\n  --success: 160 45% 40%;\n  --warning: 30 80% 52%;\n  --destructive: 0 74% 45%;\n  --link: 42 50% 75%; /* warm champagne link on dark */\n  --radius-sm: 8px;\n  --radius-md: 12px;\n  --radius-lg: 16px;\n  --shadow-soft: 0 8px 30px rgba(0,0,0,.35);\n  --shadow-gold: 0 1px 0 rgba(212,175,55,.35), 0 8px 30px rgba(0,0,0,.35);\n}\n.dark{\n  --background: var(--hq-bg);\n  --foreground: var(--hq-fg);\n  --card: var(--hq-surface);\n  --card-foreground: var(--hq-fg);\n  --popover: var(--hq-surface);\n  --popover-foreground: var(--hq-fg);\n  --primary: var(--hq-gold);\n  --primary-foreground: 228 13% 4%;\n  --secondary: 228 10% 10%;\n  --secondary-foreground: var(--hq-fg);\n  --muted: 228 10% 14%;\n  --muted-foreground: 42 15% 70%;\n  --accent: var(--hq-gold);\n  --accent-foreground: 228 13% 4%;\n  --border: 228 8% 18%;\n  --input: 228 8% 18%;\n  --ring: var(--hq-ring);\n}\n:root[data-theme=pearl]{\n  --background: var(--hq-pearl);\n  --foreground: 228 13% 4%;\n  --card: var(--hq-surface-2);\n  --card-foreground: 228 13% 4%;\n  --border: 42 10% 86%;\n  --ring: var(--hq-ring);\n}",
    "usage": {
      "background": "Use --hq-bg for most pages. Introduce pearl panels (--hq-pearl) for contrast sections (max 30% of total page height).",
      "accents": "Use --hq-gold for lines, icons, focus rings, and subtle borders. Avoid large gold fills.",
      "text": "Default text on dark uses warm ivory (--hq-fg). On pearl panels, switch to near-black (hsl(228 13% 4%)).",
      "borders": "Use hsl(var(--border)) for separators; opacity-40 on dark."
    },
    "gradients": {
      "rule": "Use very subtle, low-contrast 2-color gradients only for hero backdrops or section separators. Never on text-heavy blocks or small UI.",
      "examples_css": ".hero-noir{ background: radial-gradient(1200px 600px at 70% -10%, rgba(212,175,55,0.12), rgba(10,10,10,0) 60%), radial-gradient(800px 400px at 5% 110%, rgba(245,243,239,0.06), rgba(10,10,10,0) 55%); }",
      "noise_overlay_css": ".noir-noise:before{ content:''; position:absolute; inset:0; background-image:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.035\"/></svg>'); mix-blend-mode: overlay; pointer-events:none; }"
    },
    "contrast": "All critical text meets WCAG AA: on dark bg use ivory at >= 90% opacity; on pearl panels use near-black."
  },
  "typography": {
    "fonts": {
      "heading": "Cormorant Garamond",
      "body": "Space Grotesk"
    },
    "google_fonts": "<link href=\"https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap\" rel=\"stylesheet\">",
    "apply_css": "html{font-family: 'Space Grotesk', ui-sans-serif, system-ui; } .font-display{font-family:'Cormorant Garamond', ui-serif, Georgia; letter-spacing: -0.01em;} .tracking-tighter-hero{ letter-spacing:-0.02em; }",
    "scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-display font-semibold leading-[1.05] tracking-tighter-hero",
      "h2": "text-base sm:text-lg font-display font-medium leading-tight",
      "h3": "text-xl sm:text-2xl font-display",
      "body": "text-sm sm:text-base leading-relaxed",
      "small": "text-xs leading-snug text-[hsl(var(--muted-foreground))]"
    }
  },
  "spacing_system": {
    "scale": [4, 8, 12, 16, 24, 32, 40, 56, 72, 96],
    "containers": {
      "page_x": "px-4 sm:px-6 lg:px-10 xl:px-20",
      "section_y": "py-12 sm:py-16 lg:py-24"
    }
  },
  "shadows_radius": {
    "radius": {"sm":"var(--radius-sm)", "md":"var(--radius-md)", "lg":"var(--radius-lg)"},
    "shadows": {"soft":"var(--shadow-soft)", "gold":"var(--shadow-gold)"}
  },
  "components": {
    "buttons": {
      "style": "Luxury/Elegant: tall, slim, 8–12px radius, subtle elevation, gold accents only as outline or hairline glow.",
      "variants": {
        "primary": "inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[hsl(var(--hq-gold))] text-[hsl(228_13%_4%)] px-6 py-3 font-medium tracking-wide shadow-[var(--shadow-gold)] hover:bg-[hsl(46_64%_45%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--hq-gold))] disabled:opacity-50 disabled:pointer-events-none transition-colors",
        "secondary": "inline-flex items-center justify-center rounded-[var(--radius-md)] bg-transparent border border-[hsl(var(--hq-gold))] text-[hsl(var(--hq-fg))] px-6 py-3 font-medium hover:bg-[hsl(228_10%_10%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--hq-gold))] disabled:opacity-50 transition-colors",
        "ghost": "inline-flex items-center justify-center rounded-[var(--radius-md)] px-4 py-2 text-[hsl(var(--hq-fg))] hover:bg-[hsl(228_10%_10%)]/60 focus-visible:ring-2 focus-visible:ring-[hsl(var(--hq-gold))]"
      },
      "sizes": {"sm":"h-9 px-4 text-sm", "md":"h-11 px-6 text-sm", "lg":"h-12 px-7 text-base"},
      "testid": "Every button must include data-testid like data-testid=\"primary-cta-button\""
    },
    "navbar": {
      "layout": "Sticky at top, translucent dark surface with hairline gold bottom border. Left: logo. Center: navigation-menu. Right: WhatsApp icon button + Get a Quote.",
      "classes": "backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--hq-bg))]/70 border-b border-[hsl(var(--hq-gold))]/25",
      "items": ["Services", "Bar Setups", "Molecular Mixology", "Menus", "Gallery", "Packages", "About"],
      "cta": {"primary": "Get a Quote", "secondary_icon": "WhatsApp"},
      "micro": "On hover, underline grows from center with gold 200 to gold 600 tint. Active route shows a 2px gold bottom indicator."
    },
    "hero": {
      "layout": "Full-bleed dark hero with montage of vertical video reels cropped elegantly, autoplay muted loop, paused when offscreen. Copy is tight and minimal, with two CTAs.",
      "overlay_classes": "relative hero-noir noir-noise",
      "content_classes": "min-h-[84vh] grid place-items-center text-center text-[hsl(var(--hq-fg))]",
      "copy": {
        "headline": "Cinematic Bars. Editorial Drinks.",
        "sub": "Premium cocktail & mocktail bar setups for weddings, corporate, and private events. Molecular mixology included.",
        "primary_cta": "Get a Quote",
        "secondary_cta": "Check Availability"
      }
    },
    "cards": {
      "bar_setup_card": "rounded-[var(--radius-lg)] overflow-hidden bg-[hsl(var(--hq-surface))] border border-white/5 hover:border-[hsl(var(--hq-gold))]/25 transition-colors shadow-[var(--shadow-soft)]",
      "drink_card": "rounded-[var(--radius-md)] bg-[hsl(var(--hq-surface))] border border-white/5 p-4",
      "package_card": "rounded-[var(--radius-lg)] bg-[hsl(var(--hq-surface))] border border-[hsla(46,64%,52%,0.2)] p-6",
      "testimonial_card": "bg-[hsl(var(--hq-surface))] border border-white/5 rounded-[var(--radius-md)] p-6"
    },
    "filters": {
      "component": "Use ToggleGroup (chips) or Tabs from shadcn for Bar Setups filters.",
      "chip_class": "data-[state=on]:bg-[hsl(var(--hq-gold))] data-[state=on]:text-[hsl(228_13%_4%)] rounded-full border border-[hsl(var(--hq-gold))]/40 px-4 py-2 text-sm text-[hsl(var(--hq-fg))] hover:bg-white/5",
      "testid": "data-testid=\"bar-setup-filter-chip\" on each chip"
    },
    "forms": {
      "components": ["input", "select", "textarea", "calendar", "dialog"],
      "style": "Use light borders on dark (border-white/10). Focus ring gold. Labels in small ivory with tracking-wide.",
      "example": "<Input data-testid=\"contact-name-input\" className=\"bg-transparent border-white/10 focus-visible:ring-[hsl(var(--hq-gold))]\" />"
    },
    "faq": {"component": "accordion", "style": "border-y border-white/10", "motion": "expand/collapse 240ms ease-out"},
    "carousel": {"component": "carousel", "usage": "Use for testimonials and gallery strips with 0.6s slide transition, snap mandatory."},
    "sticky_cta_mobile": {
      "classes": "fixed bottom-0 inset-x-0 z-40 bg-[hsl(var(--hq-bg))]/85 backdrop-blur border-t border-[hsl(var(--hq-gold))]/25 px-4 py-3 flex items-center gap-3",
      "content": ["Check Availability", "WhatsApp"],
      "testid": "data-testid=\"sticky-cta-bar\""
    },
    "toast": {"lib": "sonner", "path": "./components/ui/sonner", "style": "Dark toast with gold accent left-border for success/info."},
    "icons": {"lib": "lucide-react", "tone": "Outline icons with 1.5px stroke, gold when interactive."},
    "data_testid_convention": "kebab-case, role-first (e.g., 'primary-cta-button', 'nav-services-link', 'bar-setup-filter-chip')."
  },
  "layouts": {
    "global": {
      "grid": "max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20",
      "section": "py-12 sm:py-16 lg:py-24"
    },
    "page_skeletons": {
      "Home": [
        "Hero: video montage + headline + CTAs",
        "Bar Setups preview: 3-6 cards with filters row",
        "Molecular Mixology strip: looping smoke video + copy",
        "Packages teaser: 3 cards + CTA to Get a Quote",
        "Gallery teaser: horizontal carousel",
        "Testimonials: carousel",
        "FAQs: accordion",
        "Final CTA banner"
      ],
      "Services": ["Intro hero (still image)", "Three service bands with imagery", "Process/How we work", "CTA"],
      "Bar Setups": ["Filters (ToggleGroup)", "Responsive grid of setup cards (2/3/4 columns)", "Sticky side CTA (Quote)", "Floating compare tray (optional)"] ,
      "Molecular Mixology": ["Feature rows: Smoke Bubbles, Foams, Aromatic Mists", "Short loop videos per technique", "Safety + logistics", "CTA"],
      "Menus": ["Signature Cocktails & Mocktails tabs", "Cards with ingredients and alcohol flag", "CTA"],
      "Packages & Pricing": ["Copy explaining custom quotes only", "Package tiers as inspiration", "Contact form", "FAQ snippet"],
      "Gallery": ["Filters by event type", "Masonry or 3-up grid", "Lightbox", "Carousel for mobile"],
      "Reviews/Testimonials": ["Long-form testimonials", "Starless editorial pull-quotes", "Logos of corporate clients"],
      "About": ["Editorial portrait (no neon)", "Story, team, values", "Coverage map"],
      "FAQs": ["Accordion grouped by Booking, Service, Logistics"],
      "Contact/Book Now": ["Form with date picker (shadcn calendar)", "WhatsApp quick action", "Policies"] ,
      "Wedding Hashtag Generator": ["Form (names, vibe, language)", "Results grouped (punny, elegant, minimal)", "Copy/Save buttons"],
      "Signature Drink Generator": ["Quiz steps", "3 drink concepts with name, flavor notes, garnish", "Share/Save"]
    }
  },
  "motion": {
    "principles": "Slow, cinematic. 280–600ms for most transitions; larger entrances 700–1000ms with slight delay cascades. Ease: cubic-bezier(0.2,0.8,0.2,1). Respect prefers-reduced-motion by disabling non-essential animations.",
    "framer_motion_variants_js": "export const fadeIn = { hidden:{opacity:0, y:16}, show:{opacity:1, y:0, transition:{duration:0.6, ease:[0.2,0.8,0.2,1]} } }; export const stagger = { show:{ transition:{ staggerChildren:0.12, delayChildren:0.1 } } }; export const rise = { hidden:{opacity:0, y:24, filter:'blur(4px)'}, show:{opacity:1, y:0, filter:'blur(0)', transition:{duration:0.8, ease:[0.2,0.8,0.2,1]} } };",
    "micro_interactions": [
      "Buttons: subtle color shift + 1px translateY on press (0.12s).",
      "Nav underline grows from center (0.3s) with gold tint.",
      "Cards: border gold tint on hover; image slow zoom (transform only)."
    ]
  },
  "media_handling": {
    "video_reels": {
      "requirements": "9:16 vertical reels, autoplay muted loop, pause when offscreen.",
      "container": "aspect-[9/16] rounded-[var(--radius-lg)] overflow-hidden bg-black/40",
      "observer_js": "import { useEffect, useRef } from 'react'; export default function AutoPlayVideo({src, poster, testid}){ const ref = useRef(null); useEffect(()=>{ const el = ref.current; if(!el) return; const io = new IntersectionObserver(([e])=>{ if(e.isIntersecting){ el.play().catch(()=>{});} else { el.pause(); } }, {threshold:0.35}); io.observe(el); return ()=> io.disconnect(); },[]); return (<video data-testid={testid} ref={ref} src={src} muted playsInline loop preload=\"metadata\" className=\"w-full h-full object-cover\" poster={poster} />); }"
    },
    "images": "Prefer moody, low-key lighting. Avoid neon. Use smoky close-ups and glass reflections."
  },
  "accessibility": {
    "motion": "Wrap Motion with reduce-motion guard; skip complex effects.",
    "focus": "Visible gold ring (ring-2 ring-[hsl(var(--hq-gold))]) and 2px offset on dark.",
    "reading": "Left-aligned body text. Generous line-height (leading-relaxed).",
    "aria": "Add aria-labels to controls like filters and CTAs.",
    "contrast": "All text/background combinations meet AA.",
    "testing": "All interactive and key info elements include data-testid with role-first kebab-case."
  },
  "libraries": {
    "install": [
      "npm i framer-motion",
      "npm i lucide-react"
    ],
    "usage_notes": "Use shadcn as primary components. Do not use native HTML dropdowns, date pickers, toasts."
  },
  "component_path": {
    "accordion": "./components/ui/accordion",
    "alert_dialog": "./components/ui/alert-dialog",
    "alert": "./components/ui/alert",
    "aspect_ratio": "./components/ui/aspect-ratio",
    "avatar": "./components/ui/avatar",
    "badge": "./components/ui/badge",
    "breadcrumb": "./components/ui/breadcrumb",
    "button": "./components/ui/button",
    "calendar": "./components/ui/calendar",
    "card": "./components/ui/card",
    "carousel": "./components/ui/carousel",
    "checkbox": "./components/ui/checkbox",
    "collapsible": "./components/ui/collapsible",
    "command": "./components/ui/command",
    "context_menu": "./components/ui/context-menu",
    "dialog": "./components/ui/dialog",
    "drawer": "./components/ui/drawer",
    "dropdown_menu": "./components/ui/dropdown-menu",
    "form": "./components/ui/form",
    "hover_card": "./components/ui/hover-card",
    "input_otp": "./components/ui/input-otp",
    "input": "./components/ui/input",
    "label": "./components/ui/label",
    "menubar": "./components/ui/menubar",
    "navigation_menu": "./components/ui/navigation-menu",
    "pagination": "./components/ui/pagination",
    "popover": "./components/ui/popover",
    "progress": "./components/ui/progress",
    "radio_group": "./components/ui/radio-group",
    "resizable": "./components/ui/resizable",
    "scroll_area": "./components/ui/scroll-area",
    "select": "./components/ui/select",
    "separator": "./components/ui/separator",
    "sheet": "./components/ui/sheet",
    "skeleton": "./components/ui/skeleton",
    "slider": "./components/ui/slider",
    "sonner": "./components/ui/sonner",
    "switch": "./components/ui/switch",
    "table": "./components/ui/table",
    "tabs": "./components/ui/tabs",
    "textarea": "./components/ui/textarea",
    "toast": "./components/ui/toast",
    "toaster": "./components/ui/toaster",
    "toggle_group": "./components/ui/toggle-group",
    "toggle": "./components/ui/toggle",
    "tooltip": "./components/ui/tooltip"
  },
  "image_urls": [
    {"url": "https://customer-assets.emergentagent.com/job_ac6c9480-7211-41d1-abd8-0c6fb67adb33/artifacts/iytlm6tl_HQD%20Tranparent%20Logo.png", "category": "logo", "description": "HQ.D circular black/white logo with cocktail glass", "alt": "HQ.D logo"},
    {"url": "https://images.unsplash.com/photo-1654722658278-c1841652dd2b?crop=entropy&cs=srgb&fm=jpg&q=85", "category": "hero", "description": "Smoky cocktail under glass cloche on black background", "alt": "Smoky cocktail cinematic"},
    {"url": "https://images.unsplash.com/photo-1668005633963-224bdd5fbad6?crop=entropy&cs=srgb&fm=jpg&q=85", "category": "section-break", "description": "Candle-in-glass moody light for noir ambiance", "alt": "Moody candle light"},
    {"url": "https://images.unsplash.com/photo-1695979993783-af8b55b488ff?crop=entropy&cs=srgb&fm=jpg&q=85", "category": "molecular", "description": "Smoke rising from a device—molecular effect", "alt": "Molecular smoke"},
    {"url": "https://images.pexels.com/photos/9694216/pexels-photo-9694216.jpeg", "category": "divider", "description": "Swirling cold smoke texture close-up", "alt": "Swirling smoke texture"}
  ],
  "page_specific_specs": {
    "home_hero_markup_js": "import { motion } from 'framer-motion'; import AutoPlayVideo from '../components/AutoPlayVideo'; import { Button } from './components/ui/button'; export default function Hero(){ return (<section className=\"relative hero-noir noir-noise\"> <div className=\"min-h-[84vh] grid lg:grid-cols-2 gap-8 items-center max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20\"> <div className=\"space-y-6\"> <h1 className=\"font-display text-4xl sm:text-5xl lg:text-6xl text-[hsl(var(--hq-fg))]\">Cinematic Bars. Editorial Drinks.</h1> <p className=\"text-sm sm:text-base text-[hsl(var(--hq-fg))]/80 max-w-xl\">Premium cocktail & mocktail bar setups for weddings, corporate, and private events. Molecular mixology included.</p> <div className=\"flex flex-wrap gap-3\"> <button data-testid=\"primary-cta-button\" className=\"inline-flex items-center rounded-[var(--radius-md)] bg-[hsl(var(--hq-gold))] text-[hsl(228_13%_4%)] px-6 h-11 font-medium hover:bg-[hsl(46_64%_45%)] focus-visible:ring-2 focus-visible:ring-[hsl(var(--hq-gold))]\">Get a Quote</button> <button data-testid=\"secondary-cta-button\" className=\"inline-flex items-center rounded-[var(--radius-md)] border border-[hsl(var(--hq-gold))] text-[hsl(var(--hq-fg))] px-6 h-11 font-medium hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-[hsl(var(--hq-gold))]\">Check Availability</button> </div> </div> <div className=\"grid grid-cols-2 gap-3 lg:gap-4\"> <AutoPlayVideo testid=\"hero-reel-1\" src=\"/media/reel1.mp4\" /> <AutoPlayVideo testid=\"hero-reel-2\" src=\"/media/reel2.mp4\" /> <AutoPlayVideo testid=\"hero-reel-3\" src=\"/media/reel3.mp4\" /> <AutoPlayVideo testid=\"hero-reel-4\" src=\"/media/reel4.mp4\" /> </div> </div></section> ); }",
    "navbar_markup_js": "import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from './components/ui/navigation-menu'; import { Button } from './components/ui/button'; import { MessageCircle } from 'lucide-react'; export function Navbar(){ const items=['Services','Bar Setups','Molecular Mixology','Menus','Gallery','Packages','About']; return (<header className=\"sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--hq-bg))]/70 border-b border-[hsl(var(--hq-gold))]/25\"> <div className=\"max-w-[120rem] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-20 h-16\"> <a href=\"/\" data-testid=\"nav-logo-link\" className=\"flex items-center gap-3\"><img src=\"/logo.png\" alt=\"HQ.D logo\" className=\"h-8 w-8\"/><span className=\"sr-only\">HQ.D</span></a> <NavigationMenu> <NavigationMenuList>{items.map(x=> (<NavigationMenuItem key={x}><a data-testid={\`nav-${x.toLowerCase().replace(/ /g,'-')}-link\`} href={\`/${x.toLowerCase().replace(/ /g,'-')}\`} className=\"px-3 py-2 text-sm text-[hsl(var(--hq-fg))] hover:text-[hsl(var(--hq-gold))] transition-colors\">{x}</a></NavigationMenuItem>))}</NavigationMenuList> </NavigationMenu> <div className=\"flex items-center gap-2\"> <a data-testid=\"whatsapp-icon-button\" href=\"https://wa.me/XXXXXXXXXX\" className=\"inline-flex items-center justify-center h-10 w-10 rounded-full border border-[hsl(var(--hq-gold))]/40 hover:bg-white/5\" aria-label=\"WhatsApp\"><MessageCircle className=\"h-5 w-5 text-[hsl(var(--hq-gold))]\"/></a> <a data-testid=\"nav-get-a-quote-button\" href=\"/contact\" className=\"inline-flex items-center rounded-[var(--radius-md)] bg-[hsl(var(--hq-gold))] text-[hsl(228_13%_4%)] px-4 h-10 font-medium hover:bg-[hsl(46_64%_45%)] focus-visible:ring-2 focus-visible:ring-[hsl(var(--hq-gold))]\">Get a Quote</a> </div> </div></header> ); }",
    "sticky_cta_mobile_js": "export default function StickyCTA(){ return (<div className=\"fixed md:hidden bottom-0 inset-x-0 z-40 bg-[hsl(var(--hq-bg))]/85 backdrop-blur border-t border-[hsl(var(--hq-gold))]/25 px-4 py-3 flex items-center gap-3\" data-testid=\"sticky-cta-bar\"> <a data-testid=\"sticky-check-availability-button\" href=\"/contact\" className=\"flex-1 inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[hsl(var(--hq-gold))] text-[hsl(228_13%_4%)] h-11 font-medium\">Check Availability</a> <a data-testid=\"sticky-whatsapp-button\" href=\"https://wa.me/XXXXXXXXXX\" className=\"inline-flex items-center justify-center h-11 w-11 rounded-full border border-[hsl(var(--hq-gold))]/40 hover:bg-white/5\" aria-label=\"WhatsApp\"></a> </div> ); }",
    "bar_setups_filters_js": "import { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group'; export function SetupFilters(){ const filters=['All','Classic','Rustic','Mirror','Minimal','LED','Outdoor']; return (<ToggleGroup type=\"single\" defaultValue=\"All\" className=\"flex flex-wrap gap-2\" aria-label=\"Bar setup filters\"> {filters.map(f => (<ToggleGroupItem key={f} data-testid=\"bar-setup-filter-chip\" value={f} className=\"data-[state=on]:bg-[hsl(var(--hq-gold))] data-[state=on]:text-[hsl(228_13%_4%)] rounded-full border border-[hsl(var(--hq-gold))]/40 px-4 py-2 text-sm text-[hsl(var(--hq-fg))] hover:bg-white/5\">{f}</ToggleGroupItem>))} </ToggleGroup> ); }",
    "faq_block_js": "import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/ui/accordion'; export function FAQs(){ return (<Accordion type=\"single\" collapsible className=\"border-y border-white/10\"> <AccordionItem value=\"q1\"><AccordionTrigger data-testid=\"faq-question\">Do you provide food or only bars?</AccordionTrigger><AccordionContent data-testid=\"faq-answer\">Bars only. We collaborate with planners/caterers.</AccordionContent></AccordionItem> <AccordionItem value=\"q2\"><AccordionTrigger data-testid=\"faq-question\">Do you offer mocktails?</AccordionTrigger><AccordionContent data-testid=\"faq-answer\">Yes. Full non-alcoholic menu also available.</AccordionContent></AccordionItem> </Accordion> ); }"
  },
  "interactive_tools": {
    "wedding_hashtag_generator": {
      "ui": "Form: Couple A, Couple B, vibe (select), language (select), length preference. Use shadcn Form + Input + Select.",
      "result": "20–40 hashtags grouped: Elegant, Playful, Minimal, Hinglish (if chosen).",
      "save_share": "Use Dialog to show copy buttons; share via navigator.share if available.",
      "js_scaffold": "export function generateHashtags({a,b,vibe,lang}){ const base=[a,b].map(x=> x.trim().replace(/[^a-zA-Z]/g,'')).filter(Boolean); const combos=[`${base[0]}${base[1]}`, `${base[1]}${base[0]}`, `${base[0]}And${base[1]}`]; const bag=['Forever','Hitched','SaysYes','TiedTheKnot','Toasts','IcingOnTheCake','BarToBar','SipAndSay']; const list=new Set(); combos.forEach(c=> bag.forEach(w=> list.add(`#${c}${w}`))); return Array.from(list).slice(0,40); }"
    },
    "signature_drink_generator": {
      "ui": "Quiz with steps: Base Spirit (or NA), Flavor Profile, Sweetness, Glassware, Garnish style. Use shadcn Tabs or Stepper (Tabs) and Card.",
      "result": "3 drink concepts: name, tasting notes, garnish, presentation (foam/smoke/mist).",
      "js_scaffold": "export function suggestDrinks(prefs){ const {base='NA', profile='citrus', sweet='medium'} = prefs; const names=['Velvet Fizz','Noir Coupe','Pearl Highball','Golden Mist']; const pick=()=> names[Math.floor(Math.random()*names.length)]; const concepts=[1,2,3].map(()=> ({ name: pick(), base, notes: `${profile} • ${sweet} sweetness • balanced`, technique: Math.random()>0.5? 'smoke-bubble':'aromatic-foam', garnish: 'candied citrus peel', glass: 'coupe' })); return concepts; }"
    }
  },
  "testing": {
    "convention": "All interactive and key informational elements must include data-testid attributes using kebab-case: role-first. Examples: 'nav-services-link', 'primary-cta-button', 'contact-form-submit-button', 'user-review-card'.",
    "examples": [
      "<button data-testid=\"get-quote-button\">Get a Quote</button>",
      "<input data-testid=\"contact-email-input\" />"
    ]
  },
  "sources_inspiration": [
    "https://curatedevents.com/blog/wedding-bar-design-stylish-ideas-for-drink-stations/",
    "https://thewed.com/magazine/unique-bar-sign-ideas-to-elevate-your-wedding-design",
    "https://mixandtwist.co.uk/corporate-services/molecular-mixology"
  ],
  "instructions_to_main_agent": {
    "phase_1": [
      "Inject Google Fonts link into index.html and apply typography classes.",
      "Copy color tokens to src/index.css replacing default tokens with brand tokens.",
      "Set body class to 'dark' for base noir theme; use data-theme=pearl on specific sections as needed.",
      "Implement Navbar using shadcn navigation-menu; add Get a Quote and WhatsApp per spec (with data-testid)."
    ],
    "phase_2": [
      "Build Hero with four vertical AutoPlayVideo components and text block; apply hero-noir + noir-noise classes.",
      "Add StickyCTA for mobile only.",
      "Create SetupFilters with ToggleGroup for Bar Setups page; wire filtering state only on frontend for now."
    ],
    "phase_3": [
      "Create cards for Setups, Packages, Testimonials using class recipes above.",
      "Integrate FAQs with shadcn accordion.",
      "Add toast provider (sonner) and examples for success/info actions."
    ],
    "phase_4": [
      "Implement Wedding Hashtag Generator and Signature Drink Generator using provided JS scaffolds and shadcn forms.",
      "Ensure all interactive elements include data-testid attributes.",
      "Audit contrast and motion with prefers-reduced-motion."]
  },
  "general_ui_ux_design_guidelines": [
    "- You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms",
    "- You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text",
    "- NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json",
    "",
    " **GRADIENT RESTRICTION RULE**",
    "NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc",
    "NEVER use dark gradients for logo, testimonial, footer etc",
    "NEVER let gradients cover more than 20% of the viewport.",
    "NEVER apply gradients to text-heavy content or reading areas.",
    "NEVER use gradients on small UI elements (<100px width).",
    "NEVER stack multiple gradient layers in the same viewport.",
    "",
    "**ENFORCEMENT RULE:**",
    "    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors",
    "",
    "**How and where to use:**",
    "   • Section backgrounds (not content backgrounds)",
    "   • Hero section header content. Eg: dark to light to dark color",
    "   • Decorative overlays and accent elements only",
    "   • Hero section with 2-3 mild color",
    "   • Gradients creation can be done for any angle say horizontal, vertical or diagonal",
    "",
    "- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**",
    "",
    "- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. ",
    "   ",
    "- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.",
    "",
    "- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.",
    "   ",
    "- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly",
    "    Eg: - if it implies playful/energetic, choose a colorful scheme",
    "           - if it implies monochrome/minimal, choose a black–white/neutral scheme",
    "",
    "**Component Reuse:**",
    "\t- Prioritize using pre-existing components from src/components/ui when applicable",
    "\t- Create new components that match the style and conventions of existing components when needed",
    "\t- Examine existing components to understand the project's component patterns before creating new ones",
    "",
    "**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component",
    "",
    "**Best Practices:**",
    "\t- Use Shadcn/UI as the primary component library for consistency and accessibility",
    "\t- Import path: ./components/[component-name]",
    "",
    "**Export Conventions:**",
    "\t- Components MUST use named exports (export const ComponentName = ...)",
    "\t- Pages MUST use default exports (export default function PageName() {...})",
    "",
    "**Toasts:**",
    "  - Use `sonner` for toasts\"",
    "  - Sonner component are located in `/app/src/components/ui/sonner.tsx`",
    "",
    "Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals."
  ]
}
