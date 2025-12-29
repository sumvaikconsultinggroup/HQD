import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Wine, Users, PartyPopper, GlassWater,
  Check, Crown, Zap, Star
} from 'lucide-react';
import { 
  FadeUp, 
  TiltCard, 
  NoiseTexture,
  MagneticButton,
  CountUp
} from '@/components/animations';
import { SparkleEffect, MorphingBlob, BlurReveal, GradientBorder } from '@/components/animations/AdvancedEffects';

const services = [
  {
    id: 'wedding',
    icon: Wine,
    title: 'Wedding Bars',
    subtitle: 'Every moment deserves celebration',
    description: 'From the playful colors of mehendi to the grand reception, we create bespoke bar experiences for every wedding moment. Our signature couple cocktails tell your love story in every sip.',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80',
    features: [
      'Mehendi & Haldi themed bars',
      'Sangeet & Cocktail Night setups',
      'Reception champagne towers',
      'Personalized couple cocktails',
      'Custom bar branding',
      'Molecular mixology included'
    ],
    stats: { events: '350+', rating: '4.9' },
    popular: true
  },
  {
    id: 'corporate',
    icon: Users,
    title: 'Corporate Events',
    subtitle: 'Impress clients, celebrate milestones',
    description: 'Elevate your corporate events with sophisticated bar setups that reflect your brand\'s excellence. From product launches to annual galas, we deliver impeccable service.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    features: [
      'Product launch activations',
      'Annual gala celebrations',
      'Client entertainment',
      'Brand-integrated bar design',
      'High-volume service',
      'Professional uniformed staff'
    ],
    stats: { events: '100+', rating: '5.0' },
    popular: false
  },
  {
    id: 'private',
    icon: PartyPopper,
    title: 'Private Parties',
    subtitle: 'Your celebration, elevated',
    description: 'Transform your personal celebrations into unforgettable experiences. Whether it\'s a milestone birthday or an intimate gathering, we bring the luxury bar experience to you.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    features: [
      'Birthday extravaganzas',
      'Anniversary celebrations',
      'House warming parties',
      'Pool party setups',
      'Festival celebrations',
      'Theme-based experiences'
    ],
    stats: { events: '200+', rating: '4.8' },
    popular: false
  },
  {
    id: 'mocktail',
    icon: GlassWater,
    title: 'Mocktail Bars',
    subtitle: 'Zero alcohol, full experience',
    description: 'Premium non-alcoholic experiences with the same level of sophistication. Perfect for dry events, family functions, or mixed gatherings where everyone can enjoy.',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80',
    features: [
      'Extensive mocktail menus',
      'Molecular mocktail presentations',
      'Fresh juice stations',
      'Health-focused options',
      'Kid-friendly drinks',
      'Themed presentations'
    ],
    stats: { events: '150+', rating: '4.9' },
    popular: true
  },
];

const processSteps = [
  { 
    step: '01', 
    title: 'Consultation', 
    desc: 'Share your vision, event details, and preferences. We\'ll understand your needs.' 
  },
  { 
    step: '02', 
    title: 'Custom Proposal', 
    desc: 'Receive a tailored bar concept with menu, setup design, and transparent pricing.' 
  },
  { 
    step: '03', 
    title: 'Setup & Service', 
    desc: 'Our team handles everything — setup, service, and cleanup. You just enjoy.' 
  },
];

export default function Services() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <MorphingBlob 
            className="-top-40 -right-40 opacity-30" 
            color="hsl(43, 74%, 49%, 0.08)" 
            size={600} 
          />
          <MorphingBlob 
            className="bottom-0 -left-40 opacity-20" 
            color="hsl(43, 74%, 49%, 0.05)" 
            size={500} 
          />
          <SparkleEffect count={15} />
          <NoiseTexture />
        </div>

        <motion.div 
          className="container-wide relative z-10"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeUp>
                <span className="text-xs font-medium tracking-[0.25em] uppercase text-[hsl(43_74%_49%)] mb-4 block">
                  Our Services
                </span>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[hsl(40_33%_95%)] mb-6 leading-[1.1]">
                  Premium bar
                  <br />
                  <span className="text-[hsl(43_74%_49%)]">experiences</span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-xl text-[hsl(40_20%_75%)] mb-8 max-w-xl">
                  We specialize exclusively in bar services — cocktails and mocktails. 
                  No food, no catering, just <span className="text-[hsl(43_74%_49%)]">exceptional drinks</span> crafted for your celebration.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact">
                    <MagneticButton className="btn-primary" strength={0.15}>
                      Get a Quote
                      <ArrowRight className="h-4 w-4" />
                    </MagneticButton>
                  </Link>
                  <Link to="/bar-setups" className="btn-outline">
                    Explore Setups
                  </Link>
                </div>
              </FadeUp>
            </div>

            {/* Stats Grid */}
            <FadeUp delay={0.4}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 500, suffix: '+', label: 'Events Served' },
                  { value: 50, suffix: '+', label: 'Signature Drinks' },
                  { value: 15, suffix: '+', label: 'Cities Covered' },
                  { value: 4.9, suffix: '★', label: 'Client Rating', decimal: true },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="p-6 rounded-2xl bg-gradient-to-b from-[hsl(0_0%_8%)] to-[hsl(0_0%_5%)] border border-white/5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ y: -4, borderColor: 'hsl(43, 74%, 49%, 0.3)' }}
                  >
                    <div className="font-display text-4xl text-[hsl(43_74%_49%)] mb-1">
                      {stat.decimal ? stat.value : <CountUp target={stat.value} suffix={stat.suffix} />}
                      {stat.decimal && stat.suffix}
                    </div>
                    <div className="text-sm text-[hsl(40_20%_65%)]">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </FadeUp>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SERVICES GRID
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing">
        <div className="container-wide">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-[hsl(43_74%_49%)] mb-4 block">
                What We Offer
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-[hsl(40_33%_95%)]">
                Tailored to your <span className="text-[hsl(43_74%_49%)]">celebration</span>
              </h2>
            </div>
          </FadeUp>

          <div className="space-y-32">
            {services.map((service, i) => (
              <BlurReveal key={service.id} delay={i * 0.1}>
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[hsl(43_74%_49%/0.1)] flex items-center justify-center">
                        <service.icon className="h-6 w-6 text-[hsl(43_74%_49%)]" />
                      </div>
                      {service.popular && (
                        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[hsl(43_74%_49%)] text-[hsl(0_0%_2%)] text-xs font-medium">
                          <Star className="h-3 w-3 fill-current" />
                          Most Popular
                        </span>
                      )}
                    </div>
                    
                    <h2 className="font-display text-4xl text-[hsl(40_33%_95%)] mb-2">
                      {service.title}
                    </h2>
                    <p className="text-lg text-[hsl(43_74%_49%)] mb-4">
                      {service.subtitle}
                    </p>
                    <p className="text-lg text-[hsl(40_20%_75%)] mb-8">
                      {service.description}
                    </p>

                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature, j) => (
                        <motion.div
                          key={j}
                          className="flex items-center gap-3 p-3 rounded-xl bg-[hsl(0_0%_5%)] border border-white/5"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: j * 0.05 }}
                        >
                          <Check className="h-4 w-4 text-[hsl(43_74%_49%)] shrink-0" />
                          <span className="text-sm text-[hsl(40_33%_95%)]">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Stats & CTA */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="font-display text-2xl text-[hsl(43_74%_49%)]">{service.stats.events}</div>
                          <div className="text-xs text-[hsl(40_20%_65%)]">Events</div>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div className="text-center">
                          <div className="font-display text-2xl text-[hsl(43_74%_49%)]">{service.stats.rating}</div>
                          <div className="text-xs text-[hsl(40_20%_65%)]">Rating</div>
                        </div>
                      </div>
                      <Link 
                        to={`/contact?service=${service.id}`} 
                        className="btn-outline text-sm ml-auto"
                        data-testid={`service-cta-${service.id}`}
                      >
                        Get Quote
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                    <TiltCard maxTilt={6}>
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                        <motion.img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_2%/0.5)] to-transparent" />
                        
                        {/* Floating Badge */}
                        <motion.div
                          className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-[hsl(0_0%_5%/0.9)] backdrop-blur-sm border border-white/10"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[hsl(43_74%_49%)]" />
                            <span className="text-sm text-[hsl(40_33%_95%)]">Molecular included</span>
                          </div>
                        </motion.div>
                      </div>
                    </TiltCard>
                  </div>
                </div>
              </BlurReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROCESS SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing bg-[hsl(0_0%_3%)] relative">
        <NoiseTexture />
        <div className="container-wide relative z-10">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-[hsl(43_74%_49%)] mb-4 block">
                How It Works
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-[hsl(40_33%_95%)]">
                Simple, seamless process
              </h2>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <GradientBorder>
                  <div className="p-8 text-center h-full">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-[hsl(43_74%_49%/0.1)] flex items-center justify-center mx-auto mb-6"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <span className="font-display text-2xl text-[hsl(43_74%_49%)]">{step.step}</span>
                    </motion.div>
                    <h3 className="font-display text-xl text-[hsl(40_33%_95%)] mb-3">{step.title}</h3>
                    <p className="text-[hsl(40_20%_65%)]">{step.desc}</p>
                  </div>
                </GradientBorder>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          MOLECULAR STRIP
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(43_74%_49%/0.05)] to-transparent" />
        <SparkleEffect count={10} />
        
        <div className="container-wide relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <FadeUp>
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-[hsl(43_74%_49%)]" />
                  <span className="text-xs font-medium tracking-[0.25em] uppercase text-[hsl(43_74%_49%)]">
                    Included in all packages
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl text-[hsl(40_33%_95%)] mb-4">
                  Molecular Mixology Magic
                </h2>
                <p className="text-lg text-[hsl(40_20%_75%)] mb-6 max-w-xl">
                  Every package above Essential includes molecular elements — 
                  smoke bubbles, aromatic mists, and champagne foams that turn drinks into experiences.
                </p>
                <Link to="/molecular" className="inline-flex items-center gap-2 text-[hsl(43_74%_49%)] hover:underline">
                  Learn about molecular mixology
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </FadeUp>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {['Smoke Bubbles', 'Aromatic Mists', 'Foam Art'].map((tech, i) => (
                <motion.div
                  key={tech}
                  className="text-center p-6 rounded-2xl bg-[hsl(0_0%_5%)] border border-[hsl(43_74%_49%/0.2)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, borderColor: 'hsl(43, 74%, 49%, 0.5)' }}
                >
                  <Sparkles className="h-8 w-8 text-[hsl(43_74%_49%)] mx-auto mb-3" />
                  <p className="text-sm text-[hsl(40_33%_95%)]">{tech}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing bg-[hsl(0_0%_3%)] relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[hsl(43_74%_49%/0.05)] blur-[100px]" />
        </div>
        <NoiseTexture />
        
        <div className="container-narrow text-center relative z-10">
          <FadeUp>
            <Crown className="h-12 w-12 text-[hsl(43_74%_49%)] mx-auto mb-6" />
            <h2 className="font-display text-4xl sm:text-5xl text-[hsl(40_33%_95%)] mb-4">
              Ready to elevate your event?
            </h2>
            <p className="text-xl text-[hsl(40_20%_75%)] mb-10 max-w-xl mx-auto">
              Tell us about your celebration and we'll craft the perfect bar experience.
            </p>
            <Link to="/contact">
              <MagneticButton className="btn-primary px-10 py-5 text-lg" strength={0.15}>
                Get a Quote
                <ArrowRight className="h-5 w-5" />
              </MagneticButton>
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
