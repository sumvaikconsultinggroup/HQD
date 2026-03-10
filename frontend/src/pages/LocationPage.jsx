import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, MapPin, Star, Check, Phone, Calendar, 
  Award, Users, Sparkles, ChevronRight, Building2 
} from 'lucide-react';
import { getLocationBySlug, LOCATIONS } from '@/lib/locations';
import { BRAND, getWhatsAppLink } from '@/lib/constants';
import { FadeUp, NoiseTexture } from '@/components/animations';

export default function LocationPage() {
  const { slug } = useParams();
  const location = getLocationBySlug(slug);

  // Update document title and meta for SEO
  useEffect(() => {
    if (location) {
      document.title = location.metaTitle;
      
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', location.metaDescription);
      
      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) metaKeywords.setAttribute('content', location.keywords);
      
      // Update canonical
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', `https://headquartersofdrinks.com/locations/${location.slug}`);
      
      // Update OG tags
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', location.metaTitle);
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', location.metaDescription);
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', `https://headquartersofdrinks.com/locations/${location.slug}`);
    }
    
    return () => {
      // Reset title on unmount
      document.title = 'HQ.D | Luxury Cocktail & Mocktail Bar Setups for Weddings & Events';
    };
  }, [location]);

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-[hsl(40_33%_95%)] mb-4">Location Not Found</h1>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  // Get other locations for internal linking
  const otherLocations = LOCATIONS.filter(l => l.id !== location.id).slice(0, 6);

  return (
    <div className="min-h-screen" data-testid={`location-page-${location.slug}`}>
      {/* JSON-LD Schema for this location */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            'name': `HQ.D - Bar Services in ${location.city}`,
            'description': location.metaDescription,
            'url': `https://headquartersofdrinks.com/locations/${location.slug}`,
            'telephone': '+91-9540343437',
            'email': BRAND.email,
            'areaServed': {
              '@type': 'City',
              'name': location.city,
              'containedInPlace': { '@type': 'State', 'name': location.state }
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': location.geo.lat,
              'longitude': location.geo.lng
            },
            'priceRange': '₹₹₹',
            'aggregateRating': {
              '@type': 'AggregateRating',
              'ratingValue': '4.9',
              'reviewCount': '200'
            },
            'hasOfferCatalog': {
              '@type': 'OfferCatalog',
              'name': `Bar Services in ${location.city}`,
              'itemListElement': [
                {
                  '@type': 'Offer',
                  'itemOffered': {
                    '@type': 'Service',
                    'name': `Wedding Bar Setup in ${location.city}`,
                    'description': `Premium cocktail & mocktail bar setups for weddings in ${location.city}`
                  }
                },
                {
                  '@type': 'Offer',
                  'itemOffered': {
                    '@type': 'Service',
                    'name': `Molecular Mixology in ${location.city}`,
                    'description': `Advanced molecular cocktail experiences for events in ${location.city}`
                  }
                }
              ]
            }
          })
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={location.image} 
            alt={`Bar services in ${location.city}`}
            className="w-full h-full object-cover opacity-15"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0_0%_2%)] via-[hsl(0_0%_2%/0.9)] to-[hsl(0_0%_2%)]" />
          <NoiseTexture />
        </div>

        <div className="container-wide relative z-10">
          <FadeUp>
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-[hsl(40_20%_65%)] mb-6" aria-label="Breadcrumb">
                <Link to="/" className="hover:text-[hsl(43_74%_49%)] transition-colors">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-[hsl(43_74%_49%)]">Bar Services in {location.city}</span>
              </nav>

              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-5 w-5 text-[hsl(43_74%_49%)]" />
                <span className="text-xs font-medium tracking-[0.25em] uppercase text-[hsl(43_74%_49%)]">
                  {location.city}, {location.state}
                </span>
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[hsl(40_33%_95%)] mb-6">
                {location.heroTitle}
              </h1>
              
              <p className="text-xl text-[hsl(40_20%_75%)] max-w-2xl mb-8">
                {location.heroSubtitle}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary" data-testid="location-cta-quote">
                  Get a Quote for {location.city}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a 
                  href={getWhatsAppLink(`Hi! I'm looking for bar services in ${location.city} for my event.`)}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <Phone className="h-4 w-4" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          INTRO + STATS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <div>
                <h2 className="font-display text-3xl sm:text-4xl text-[hsl(40_33%_95%)] mb-6">
                  Bar Services in <span className="text-[hsl(43_74%_49%)]">{location.city}</span>
                </h2>
                <p className="text-lg text-[hsl(40_20%_75%)] leading-relaxed mb-8">
                  {location.intro}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-2xl bg-[hsl(0_0%_5%)] border border-white/5">
                    <div className="font-display text-3xl text-[hsl(43_74%_49%)]">500+</div>
                    <div className="text-xs text-[hsl(40_20%_65%)] mt-1">Events Served</div>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-[hsl(0_0%_5%)] border border-white/5">
                    <div className="font-display text-3xl text-[hsl(43_74%_49%)]">4.9</div>
                    <div className="text-xs text-[hsl(40_20%_65%)] mt-1">Client Rating</div>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-[hsl(0_0%_5%)] border border-white/5">
                    <div className="font-display text-3xl text-[hsl(43_74%_49%)]">15+</div>
                    <div className="text-xs text-[hsl(40_20%_65%)] mt-1">Cities</div>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Why Choose HQ.D */}
            <FadeUp delay={0.2}>
              <div className="p-8 rounded-3xl bg-[hsl(0_0%_5%)] border border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="h-6 w-6 text-[hsl(43_74%_49%)]" />
                  <h3 className="font-display text-2xl text-[hsl(40_33%_95%)]">
                    Why Choose HQ.D in {location.city}?
                  </h3>
                </div>
                <ul className="space-y-4">
                  {location.whyUs.map((reason, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Check className="h-5 w-5 text-[hsl(43_74%_49%)] shrink-0 mt-0.5" />
                      <span className="text-[hsl(40_20%_75%)]">{reason}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          POPULAR VENUES
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing bg-[hsl(0_0%_3%)] relative">
        <NoiseTexture />
        <div className="container-wide relative z-10">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-[hsl(43_74%_49%)] mb-4 block">
                Venues We Serve
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[hsl(40_33%_95%)]">
                Popular venues in <span className="text-[hsl(43_74%_49%)]">{location.city}</span>
              </h2>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {location.popularVenues.map((venue, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="flex items-center gap-3 p-5 rounded-2xl bg-[hsl(0_0%_5%)] border border-white/5 hover:border-[hsl(43_74%_49%/0.3)] transition-colors">
                  <Building2 className="h-5 w-5 text-[hsl(43_74%_49%)] shrink-0" />
                  <span className="text-[hsl(40_33%_95%)]">{venue}</span>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Event Types */}
          <FadeUp delay={0.3}>
            <div className="mt-12 text-center">
              <h3 className="font-display text-xl text-[hsl(40_33%_95%)] mb-4">
                Events We Serve in {location.city}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {location.popularEvents.map((event, i) => (
                  <span 
                    key={i}
                    className="px-4 py-2 rounded-full bg-[hsl(43_74%_49%/0.1)] text-[hsl(43_74%_49%)] text-sm border border-[hsl(43_74%_49%/0.2)]"
                  >
                    {event}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIAL
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing">
        <div className="container-narrow">
          <FadeUp>
            <div className="p-10 lg:p-14 rounded-3xl bg-gradient-to-b from-[hsl(0_0%_8%)] to-[hsl(0_0%_5%)] border border-white/5 text-center">
              <div className="text-6xl font-display text-[hsl(43_74%_49%/0.2)] leading-none mb-6">"</div>
              <p className="text-xl lg:text-2xl text-[hsl(40_33%_95%)] mb-8 leading-relaxed font-display">
                {location.testimonial.quote}
              </p>
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[hsl(43_74%_49%)] text-[hsl(43_74%_49%)]" />
                ))}
              </div>
              <p className="text-[hsl(40_33%_95%)] font-medium">{location.testimonial.name}</p>
              <p className="text-sm text-[hsl(40_20%_65%)]">{location.testimonial.event}</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SERVICES WE OFFER
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing bg-[hsl(40_20%_96%)]">
        <div className="container-wide">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-display text-3xl sm:text-4xl text-[hsl(0_0%_10%)] mb-4">
                Our Services in {location.city}
              </h2>
              <p className="text-lg text-[hsl(0_0%_40%)]">
                Complete bar solutions for every type of celebration
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Sparkles, title: 'Molecular Mixology', desc: `Smoke bubbles, aromatic mists & champagne foams at your ${location.city} event.` },
              { icon: Users, title: 'Professional Bartenders', desc: '50+ trained mixologists ready to deliver flawless service.' },
              { icon: Calendar, title: 'Custom Bar Setups', desc: `Designer bars crafted to match your ${location.city} venue aesthetic.` },
              { icon: Award, title: 'Premium Service', desc: 'Full setup, service, and cleanup — you just enjoy the celebration.' },
            ].map((service, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-white border border-[hsl(0_0%_90%)] hover:border-[hsl(43_74%_49%)] transition-colors h-full">
                  <service.icon className="h-8 w-8 text-[hsl(43_74%_49%)] mb-4" />
                  <h3 className="font-display text-lg text-[hsl(0_0%_10%)] mb-2">{service.title}</h3>
                  <p className="text-sm text-[hsl(0_0%_40%)]">{service.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          NEARBY AREAS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16">
        <div className="container-wide">
          <FadeUp>
            <h3 className="font-display text-xl text-[hsl(40_33%_95%)] mb-4 text-center">
              Areas We Serve Near {location.city}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {location.nearbyAreas.map((area, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 rounded-full border border-white/10 text-[hsl(40_20%_75%)] text-sm"
                >
                  <MapPin className="h-3 w-3 inline mr-1" />
                  {area}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          OTHER LOCATIONS - Internal Linking
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing bg-[hsl(0_0%_3%)] relative">
        <NoiseTexture />
        <div className="container-wide relative z-10">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-[hsl(43_74%_49%)] mb-4 block">
                We Also Serve
              </span>
              <h2 className="font-display text-3xl text-[hsl(40_33%_95%)]">
                Bar services across <span className="text-[hsl(43_74%_49%)]">India</span>
              </h2>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherLocations.map((loc, i) => (
              <FadeUp key={loc.id} delay={i * 0.05}>
                <Link 
                  to={`/locations/${loc.slug}`}
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-[hsl(0_0%_5%)] border border-white/5 hover:border-[hsl(43_74%_49%/0.3)] transition-all"
                >
                  <MapPin className="h-5 w-5 text-[hsl(43_74%_49%)] shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-[hsl(40_33%_95%)] font-medium group-hover:text-[hsl(43_74%_49%)] transition-colors">
                      {loc.city}
                    </h3>
                    <p className="text-xs text-[hsl(40_20%_65%)]">{loc.state}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[hsl(40_20%_65%)] group-hover:text-[hsl(43_74%_49%)] group-hover:translate-x-1 transition-all" />
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0_0%_5%)] via-[hsl(0_0%_3%)] to-[hsl(0_0%_2%)]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[hsl(43_74%_49%/0.05)] blur-[100px]" />
        </div>
        <NoiseTexture />
        
        <div className="container-narrow relative z-10 text-center">
          <FadeUp>
            <h2 className="font-display text-4xl sm:text-5xl text-[hsl(40_33%_95%)] mb-6">
              Ready to elevate your
              <br />
              <span className="text-[hsl(43_74%_49%)]">{location.city} celebration?</span>
            </h2>
            <p className="text-xl text-[hsl(40_20%_75%)] mb-10 max-w-xl mx-auto">
              Get a custom quote for your {location.city} event. We'll respond within 24 hours.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary px-10 py-5 text-lg" data-testid="location-final-cta">
                Get a Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a 
                href={getWhatsAppLink(`Hi! I'm interested in HQ.D bar services for my event in ${location.city}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-10 py-5 text-lg"
              >
                WhatsApp Us
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
