import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Users, Clock, Star, Sparkles, 
  Check, Wine, MapPin, Calendar, ChevronRight
} from 'lucide-react';
import { getSetupBySlug, BAR_SETUPS_LIBRARY, BAR_SETUP_CATEGORIES } from '@/lib/barSetups';
import { FadeUp, TiltCard, NoiseTexture, ParallaxImage } from '@/components/animations';

export default function BarSetupDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const setup = getSetupBySlug(slug);

  if (!setup) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-[hsl(40_33%_95%)] mb-4">Setup not found</h1>
          <Link to="/bar-setups" className="btn-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to all setups
          </Link>
        </div>
      </div>
    );
  }

  // Get related setups (same events)
  const relatedSetups = BAR_SETUPS_LIBRARY
    .filter(s => s.id !== setup.id && s.events.some(e => setup.events.includes(e)))
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-end">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0">
          <motion.img
            src={setup.image_url}
            alt={setup.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_2%)] via-[hsl(0_0%_2%/0.6)] to-transparent" />
          <NoiseTexture />
        </div>

        {/* Back Button */}
        <motion.div 
          className="absolute top-24 left-0 right-0 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="container-wide">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[hsl(40_33%_95%)] hover:text-[hsl(352_33%_59%)] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to setups
            </button>
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 w-full pb-16">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {setup.featured && (
                  <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[hsl(352_33%_59%)] text-[hsl(0_0%_2%)] text-xs font-medium">
                    <Star className="h-3 w-3 fill-current" />
                    Featured
                  </span>
                )}
                {setup.molecular_tag && (
                  <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[hsl(352_33%_59%/0.15)] backdrop-blur-sm text-[hsl(352_33%_59%)] text-xs font-medium border border-[hsl(352_33%_59%/0.3)]">
                    <Sparkles className="h-3 w-3" />
                    {setup.molecular_tag}
                  </span>
                )}
                <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs">
                  {setup.pricing_tier.charAt(0).toUpperCase() + setup.pricing_tier.slice(1)} Tier
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[hsl(40_33%_95%)] mb-4">
                {setup.title}
              </h1>
              <p className="text-xl text-[hsl(352_33%_59%)] mb-6">
                {setup.subtitle}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center gap-6 text-[hsl(40_20%_75%)]">
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[hsl(352_33%_59%)]" />
                  {setup.best_for}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[hsl(352_33%_59%)]" />
                  {setup.setup_time} setup
                </span>
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[hsl(352_33%_59%)]" />
                  {setup.staff_included} staff included
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTENT SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <FadeUp>
                <div>
                  <h2 className="font-display text-2xl text-[hsl(40_33%_95%)] mb-4">About this setup</h2>
                  <p className="text-lg text-[hsl(40_20%_75%)] leading-relaxed">
                    {setup.description}
                  </p>
                </div>
              </FadeUp>

              {/* Features */}
              <FadeUp delay={0.1}>
                <div>
                  <h2 className="font-display text-2xl text-[hsl(40_33%_95%)] mb-6">What's included</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {setup.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-xl bg-[hsl(0_0%_5%)] border border-white/5"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-[hsl(352_33%_59%/0.15)] flex items-center justify-center shrink-0">
                          <Check className="h-3.5 w-3.5 text-[hsl(352_33%_59%)]" />
                        </div>
                        <span className="text-[hsl(40_33%_95%)]">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Signature Drinks */}
              <FadeUp delay={0.2}>
                <div>
                  <h2 className="font-display text-2xl text-[hsl(40_33%_95%)] mb-6">Signature drinks</h2>
                  <div className="flex flex-wrap gap-3">
                    {setup.signature_drinks.map((drink, i) => (
                      <motion.span
                        key={i}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[hsl(0_0%_8%)] to-[hsl(0_0%_5%)] border border-white/10 text-[hsl(40_33%_95%)]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.05, borderColor: 'hsl(352, 33%, 59%, 0.5)' }}
                      >
                        <Wine className="h-4 w-4 text-[hsl(352_33%_59%)]" />
                        {drink}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Molecular Techniques */}
              <FadeUp delay={0.3}>
                <div>
                  <h2 className="font-display text-2xl text-[hsl(40_33%_95%)] mb-6">Molecular mixology</h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {setup.molecular_techniques.map((technique, i) => (
                      <motion.div
                        key={i}
                        className="p-6 rounded-2xl bg-gradient-to-b from-[hsl(352_33%_59%/0.1)] to-transparent border border-[hsl(352_33%_59%/0.2)] text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                      >
                        <Sparkles className="h-8 w-8 text-[hsl(352_33%_59%)] mx-auto mb-3" />
                        <span className="font-medium text-[hsl(40_33%_95%)]">{technique}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Perfect For Events */}
              <FadeUp delay={0.4}>
                <div>
                  <h2 className="font-display text-2xl text-[hsl(40_33%_95%)] mb-6">Perfect for</h2>
                  <div className="flex flex-wrap gap-2">
                    {setup.events.map(eventId => {
                      const event = BAR_SETUP_CATEGORIES.events.find(e => e.id === eventId);
                      return event ? (
                        <Link 
                          key={eventId}
                          to={`/bar-setups?event=${eventId}`}
                          className="px-4 py-2 rounded-full bg-[hsl(0_0%_7%)] border border-white/10 text-[hsl(40_33%_95%)] hover:border-[hsl(352_33%_59%/0.5)] hover:text-[hsl(352_33%_59%)] transition-colors"
                        >
                          {event.label}
                        </Link>
                      ) : null;
                    })}
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Sidebar - CTA Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <FadeUp>
                  <TiltCard maxTilt={4}>
                    <div className="p-8 rounded-3xl bg-gradient-to-b from-[hsl(0_0%_10%)] to-[hsl(0_0%_5%)] border border-[hsl(352_33%_59%/0.2)]">
                      <h3 className="font-display text-2xl text-[hsl(40_33%_95%)] mb-2">
                        Book this setup
                      </h3>
                      <p className="text-[hsl(40_20%_65%)] mb-6">
                        Get a custom quote for your event. We'll tailor every detail to your vision.
                      </p>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between py-3 border-b border-white/5">
                          <span className="text-[hsl(40_20%_65%)]">Guest capacity</span>
                          <span className="text-[hsl(40_33%_95%)] font-medium">{setup.best_for}</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-white/5">
                          <span className="text-[hsl(40_20%_65%)]">Setup time</span>
                          <span className="text-[hsl(40_33%_95%)] font-medium">{setup.setup_time}</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-white/5">
                          <span className="text-[hsl(40_20%_65%)]">Staff included</span>
                          <span className="text-[hsl(40_33%_95%)] font-medium">{setup.staff_included} bartenders</span>
                        </div>
                        <div className="flex items-center justify-between py-3">
                          <span className="text-[hsl(40_20%_65%)]">Pricing tier</span>
                          <span className="text-[hsl(352_33%_59%)] font-medium capitalize">{setup.pricing_tier}</span>
                        </div>
                      </div>

                      <Link 
                        to={`/contact?setup=${setup.slug}`}
                        className="btn-primary w-full justify-center mb-3"
                        data-testid="book-setup-btn"
                      >
                        Get a Quote
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link 
                        to={`/contact?setup=${setup.slug}&type=availability`}
                        className="btn-outline w-full justify-center"
                      >
                        <Calendar className="h-4 w-4" />
                        Check Availability
                      </Link>
                    </div>
                  </TiltCard>
                </FadeUp>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          RELATED SETUPS
      ═══════════════════════════════════════════════════════════════════ */}
      {relatedSetups.length > 0 && (
        <section className="section-spacing bg-[hsl(0_0%_3%)] relative">
          <NoiseTexture />
          <div className="container-wide relative z-10">
            <FadeUp>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <span className="text-xs font-medium tracking-[0.25em] uppercase text-[hsl(352_33%_59%)] mb-3 block">
                    Similar Setups
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl text-[hsl(40_33%_95%)]">
                    You might also like
                  </h2>
                </div>
                <Link 
                  to="/bar-setups" 
                  className="hidden sm:flex items-center gap-2 text-[hsl(40_33%_95%)] hover:text-[hsl(352_33%_59%)] transition-colors"
                >
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </FadeUp>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedSetups.map((relatedSetup, i) => (
                <FadeUp key={relatedSetup.id} delay={i * 0.1}>
                  <Link to={`/bar-setups/${relatedSetup.slug}`}>
                    <motion.div 
                      className="group rounded-2xl overflow-hidden bg-[hsl(0_0%_7%)] border border-white/5 hover:border-[hsl(352_33%_59%/0.3)] transition-all"
                      whileHover={{ y: -4 }}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={relatedSetup.image_url} 
                          alt={relatedSetup.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-display text-lg text-[hsl(40_33%_95%)] group-hover:text-[hsl(352_33%_59%)] transition-colors mb-1">
                          {relatedSetup.title}
                        </h3>
                        <p className="text-sm text-[hsl(40_20%_65%)]">{relatedSetup.subtitle}</p>
                      </div>
                    </motion.div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
