import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Star, Play, Pause, ChevronDown, ChevronLeft, ChevronRight, Hash, Wine, Sparkles, Crown, Users, Calendar, Award } from 'lucide-react';
import { VideoReel } from '@/components/VideoReel';
import { VIDEOS, HERO_VIDEOS, BRAND } from '@/lib/constants';
import { getSetups, getTestimonials, getFAQs } from '@/lib/api';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  TextRevealChar, 
  TextRevealWord, 
  TextRevealLine,
  FadeUp, 
  StaggerContainer, 
  staggerItem,
  TiltCard,
  ParallaxImage,
  CountUp,
  NoiseTexture,
  MagneticButton
} from '@/components/animations';

// Cinematic animation variants
const heroVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 1.2, 
      ease: [0.2, 0.8, 0.2, 1],
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const slideUp = {
  hidden: { opacity: 0, y: 80, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }
  }
};

const slideIn = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }
  }
};

// Floating animation for decorative elements
const floatAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export default function Home() {
  const [setups, setSetups] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [activeVideo, setActiveVideo] = useState(0);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [setupsData, testimonialsData, faqsData] = await Promise.all([
          getSetups({ featured: true }),
          getTestimonials({ featured: true }),
          getFAQs()
        ]);
        setSetups(setupsData.slice(0, 3));
        setTestimonials(testimonialsData.slice(0, 3));
        setFaqs(faqsData.slice(0, 4));
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - Cinematic Split Screen
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs */}
          <motion.div 
            className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
              filter: 'blur(60px)'
            }}
            animate={{ 
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
              filter: 'blur(60px)'
            }}
            animate={{ 
              x: [0, -30, 0],
              y: [0, -40, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <NoiseTexture />
        </div>
        
        <motion.div 
          className="relative z-10 w-full"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <div className="container-wide pt-32 pb-20">
            <motion.div 
              className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
              initial="hidden"
              animate="visible"
              variants={heroVariants}
            >
              {/* Left: Content */}
              <div className="space-y-8">
                {/* Eyebrow */}
                <motion.div variants={slideIn} className="flex items-center gap-3">
                  <motion.div 
                    className="h-px w-12 bg-[hsl(43_74%_49%)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                  <span className="text-xs font-medium tracking-[0.25em] uppercase text-[hsl(43_74%_49%)]">
                    Luxury Bar Experiences
                  </span>
                </motion.div>
                
                {/* Main Headline with Character Animation */}
                <motion.div variants={slideUp}>
                  <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight">
                    <TextRevealWord className="text-[hsl(40_33%_95%)]" delay={0.5}>
                      Cinematic Bars.
                    </TextRevealWord>
                    <br />
                    <TextRevealWord className="text-[hsl(43_74%_49%)]" delay={0.8}>
                      Editorial Drinks.
                    </TextRevealWord>
                  </h1>
                </motion.div>
                
                {/* Subheadline */}
                <motion.p 
                  variants={slideUp}
                  className="text-lg sm:text-xl text-[hsl(40_20%_75%)] max-w-xl leading-relaxed"
                >
                  Premium cocktail & mocktail bar setups for weddings, corporate events, 
                  and private celebrations. <span className="text-[hsl(43_74%_49%)]">Molecular mixology</span> included.
                </motion.p>
                
                {/* CTAs */}
                <motion.div variants={slideUp} className="flex flex-wrap gap-4 pt-4">
                  <Link to="/contact" data-testid="hero-cta-quote">
                    <MagneticButton 
                      className="group relative px-8 py-4 bg-[hsl(43_74%_49%)] text-[hsl(0_0%_2%)] rounded-full font-medium overflow-hidden"
                      strength={0.2}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Get a Quote
                        <motion.span
                          className="inline-block"
                          whileHover={{ x: 5 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.span>
                      </span>
                      <motion.div 
                        className="absolute inset-0 bg-[hsl(43_74%_55%)]"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </MagneticButton>
                  </Link>
                  
                  <Link to="/bar-setups" data-testid="hero-cta-setups">
                    <MagneticButton 
                      className="group px-8 py-4 border border-[hsl(43_74%_49%/0.4)] text-[hsl(40_33%_95%)] rounded-full font-medium hover:border-[hsl(43_74%_49%)] transition-colors duration-300"
                      strength={0.2}
                    >
                      <span className="flex items-center gap-2">
                        Explore Setups
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </MagneticButton>
                  </Link>
                </motion.div>
                
                {/* Stats Strip */}
                <motion.div 
                  variants={slideUp}
                  className="flex items-center gap-8 pt-8 mt-8 border-t border-white/5"
                >
                  <div className="text-center">
                    <div className="text-3xl font-display text-[hsl(43_74%_49%)]">
                      <CountUp target={500} suffix="+" />
                    </div>
                    <div className="text-xs text-[hsl(40_20%_65%)] mt-1">Events Served</div>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div className="text-center">
                    <div className="text-3xl font-display text-[hsl(43_74%_49%)]">
                      <CountUp target={50} suffix="+" />
                    </div>
                    <div className="text-xs text-[hsl(40_20%_65%)] mt-1">Signature Drinks</div>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div className="text-center">
                    <div className="text-3xl font-display text-[hsl(43_74%_49%)]">
                      <CountUp target={15} suffix="+" />
                    </div>
                    <div className="text-xs text-[hsl(40_20%_65%)] mt-1">Cities</div>
                  </div>
                </motion.div>
              </div>
              
              {/* Right: Video Grid */}
              <motion.div 
                variants={scaleIn}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  {HERO_VIDEOS.slice(0, 4).map((video, i) => (
                    <motion.div
                      key={i}
                      className={`relative ${i === 0 ? 'col-span-1 row-span-2' : ''}`}
                      initial={{ opacity: 0, y: 40, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.8 + i * 0.15,
                        ease: [0.2, 0.8, 0.2, 1]
                      }}
                      whileHover={{ scale: 1.02, zIndex: 10 }}
                    >
                      <div className={`overflow-hidden rounded-2xl ${i === 0 ? 'aspect-[9/16]' : 'aspect-square'}`}>
                        {/* Ultra-fast inline video for hero */}
                        <video
                          src={video}
                          muted
                          playsInline
                          loop
                          autoPlay
                          preload="auto"
                          className="w-full h-full object-cover"
                          data-testid={`hero-video-${i}`}
                        />
                      </div>
                      {/* Hover overlay */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                      >
                        <span className="text-xs font-medium text-white/80">Reel {i + 1}</span>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Floating badge */}
                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-[hsl(0_0%_5%)] border border-[hsl(43_74%_49%/0.3)] rounded-2xl px-5 py-4 shadow-2xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(43_74%_49%)] to-[hsl(43_74%_35%)] border-2 border-[hsl(0_0%_5%)]" />
                      ))}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-[hsl(43_74%_49%)] text-[hsl(43_74%_49%)]" />
                        ))}
                      </div>
                      <p className="text-xs text-[hsl(40_20%_65%)] mt-0.5">200+ Happy Couples</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-xs text-[hsl(40_20%_65%)] tracking-widest uppercase">Scroll</span>
            <ChevronDown className="h-4 w-4 text-[hsl(43_74%_49%)]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SERVICES STRIP - Horizontal Scroll Marquee
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-6 border-y border-white/5 bg-[hsl(0_0%_3%)] overflow-hidden">
        <motion.div 
          className="flex gap-12"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-12 shrink-0">
              {['Weddings', 'Corporate Events', 'Private Parties', 'Sangeet', 'Reception', 'Pool Parties'].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-lg text-[hsl(40_20%_65%)] whitespace-nowrap font-light">{item}</span>
                  <Sparkles className="h-4 w-4 text-[hsl(43_74%_49%)]" />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT WE DO - Feature Cards with 3D Tilt
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing relative">
        <NoiseTexture />
        <div className="container-wide relative z-10">
          <FadeUp>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-[hsl(43_74%_49%)] mb-4 block">
                What We Do
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[hsl(40_33%_95%)] mb-6">
                Crafting experiences,
                <br />
                <span className="text-[hsl(43_74%_49%)]">not just drinks</span>
              </h2>
              <p className="text-lg text-[hsl(40_20%_75%)]">
                From molecular magic to classic elegance, we transform every event into an unforgettable celebration.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { 
                icon: Sparkles,
                title: 'Molecular Mixology', 
                desc: 'Smoke bubbles, aromatic mists, champagne foams — science meets art in every glass.',
                link: '/molecular',
                image: 'https://customer-assets.emergentagent.com/job_ff2df9ce-7c56-472c-a16a-bca56f6db073/artifacts/cax4yoeh_WhatsApp%20Image%202023-12-04%20at%2012.36.10%20PM%20%282%29.jpeg'
              },
              { 
                icon: Crown,
                title: 'Custom Bar Setups', 
                desc: 'From rustic wooden bars to mirror-finish luxury — designs that complement your vision.',
                link: '/bar-setups',
                image: 'https://customer-assets.emergentagent.com/job_ff2df9ce-7c56-472c-a16a-bca56f6db073/artifacts/o07u7rja_freepik__custom-bar-setups-indian-wedding__85290.png'
              },
              { 
                icon: Users,
                title: 'Full Service', 
                desc: 'Professional bartenders, complete setup, premium service, and seamless cleanup.',
                link: '/packages',
                image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?w=400&q=60'
              },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <TiltCard maxTilt={8} className="h-full">
                  <Link 
                    to={item.link} 
                    className="group block h-full bg-gradient-to-b from-[hsl(0_0%_8%)] to-[hsl(0_0%_5%)] rounded-3xl overflow-hidden border border-white/5 hover:border-[hsl(43_74%_49%/0.3)] transition-colors duration-500"
                    data-testid={`feature-card-${i}`}
                  >
                    {/* Image with parallax */}
                    <div className="relative h-48 overflow-hidden bg-[hsl(0_0%_8%)]">
                      <img 
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="192"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_5%)] via-transparent to-transparent" />
                      <motion.div 
                        className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-[hsl(43_74%_49%/0.1)] backdrop-blur-sm flex items-center justify-center border border-[hsl(43_74%_49%/0.2)]"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <item.icon className="h-5 w-5 text-[hsl(43_74%_49%)]" />
                      </motion.div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-display text-2xl text-[hsl(40_33%_95%)] mb-3 group-hover:text-[hsl(43_74%_49%)] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-[hsl(40_20%_65%)] mb-4 leading-relaxed">
                        {item.desc}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(43_74%_49%)]">
                        Learn more
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BAR SETUPS PREVIEW - Elegant Grid
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing bg-[hsl(0_0%_3%)] relative">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[hsl(43_74%_49%/0.03)] blur-[100px]" />
        </div>
        
        <div className="container-wide relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <FadeUp>
              <div>
                <span className="text-xs font-medium tracking-[0.25em] uppercase text-[hsl(43_74%_49%)] mb-4 block">
                  Our Setups
                </span>
                <h2 className="font-display text-4xl sm:text-5xl text-[hsl(40_33%_95%)]">
                  For every <span className="text-[hsl(43_74%_49%)]">occasion</span>
                </h2>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <Link 
                to="/bar-setups" 
                className="group inline-flex items-center gap-2 text-[hsl(40_33%_95%)] hover:text-[hsl(43_74%_49%)] transition-colors"
                data-testid="view-all-setups"
              >
                View all setups
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeUp>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 'mehendi-soiree',
                slug: 'mehendi-garden-bliss',
                title: 'Mehendi Soirée',
                image_url: 'https://customer-assets.emergentagent.com/job_ff2df9ce-7c56-472c-a16a-bca56f6db073/artifacts/bpx2turb_Mehandi%20Soree.jpeg',
                best_for: '150-250 guests',
                molecular_tag: 'Aromatic Mists'
              },
              {
                id: 'sangeet-spectacular',
                slug: 'sangeet-bollywood-nights',
                title: 'Sangeet Spectacular',
                image_url: 'https://customer-assets.emergentagent.com/job_ff2df9ce-7c56-472c-a16a-bca56f6db073/artifacts/avbbt4hh_Sangeet.jpeg',
                best_for: '200-400 guests',
                molecular_tag: 'Smoke Bubbles'
              },
              {
                id: 'reception-royale',
                slug: 'reception-royal-heritage',
                title: 'Reception Royale',
                image_url: 'https://customer-assets.emergentagent.com/job_ff2df9ce-7c56-472c-a16a-bca56f6db073/artifacts/ryfppupv_Reception%20Royale.jpeg',
                best_for: '300-500 guests',
                molecular_tag: 'Champagne Foam'
              }
            ].map((setup, i) => (
              <FadeUp key={setup.id} delay={i * 0.1}>
                <Link to={`/bar-setups/${setup.slug}`} className="block">
                  <motion.div
                    className="group relative rounded-3xl overflow-hidden bg-[hsl(0_0%_7%)] border border-white/5 cursor-pointer"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <motion.img 
                        src={setup.image_url} 
                        alt={setup.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-display text-2xl text-white mb-2">{setup.title}</h3>
                      <p className="text-sm text-white/70 mb-3">Best for {setup.best_for}</p>
                      {setup.molecular_tag && (
                        <span className="inline-block text-xs px-3 py-1.5 rounded-full bg-[hsl(43_74%_49%/0.15)] text-[hsl(43_74%_49%)] border border-[hsl(43_74%_49%/0.3)]">
                          {setup.molecular_tag}
                        </span>
                      )}
                    </div>
                  </motion.div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          INTERACTIVE TOOLS - Premium Cards
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing bg-[hsl(40_20%_96%)] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute inset-0 bg-gradient-to-l from-[hsl(43_74%_49%/0.05)] to-transparent" />
        </div>
        
        <div className="container-wide relative z-10">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-[hsl(43_74%_49%)] mb-4 block">
                Free Tools
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-[hsl(0_0%_10%)] mb-4">
                Plan your perfect celebration
              </h2>
              <p className="text-lg text-[hsl(0_0%_40%)]">
                Try our interactive tools to get inspired for your event
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            {[
              {
                icon: Hash,
                title: 'Wedding Hashtag Generator',
                desc: 'Create the perfect hashtag for your special day. Get 20-40 creative suggestions based on your names and vibe.',
                link: '/tools/hashtag-generator',
                gradient: 'from-[hsl(43_74%_49%/0.1)] to-[hsl(43_74%_49%/0.02)]'
              },
              {
                icon: Wine,
                title: 'Signature Drink Generator',
                desc: 'Discover your perfect signature cocktail or mocktail through our interactive quiz.',
                link: '/tools/drink-generator',
                gradient: 'from-[hsl(280_60%_50%/0.08)] to-[hsl(280_60%_50%/0.02)]'
              }
            ].map((tool, i) => (
              <FadeUp key={i} delay={i * 0.15} className="h-full">
                <Link 
                  to={tool.link}
                  className="group block h-full"
                  data-testid={`tool-card-${i}`}
                >
                  <TiltCard maxTilt={6} className="h-full">
                    <div className={`relative h-full p-8 lg:p-10 rounded-3xl bg-gradient-to-br ${tool.gradient} border border-[hsl(0_0%_85%)] hover:border-[hsl(43_74%_49%)] transition-all duration-300 hover:shadow-xl flex flex-col`}>
                      {/* Icon */}
                      <motion.div 
                        className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-6"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <tool.icon className="h-7 w-7 text-[hsl(43_74%_49%)]" />
                      </motion.div>
                      
                      <h3 className="font-display text-2xl text-[hsl(0_0%_10%)] mb-3">
                        {tool.title}
                      </h3>
                      <p className="text-[hsl(0_0%_40%)] mb-6 leading-relaxed flex-grow">
                        {tool.desc}
                      </p>
                      
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(43_74%_49%)] mt-auto">
                        Try it free
                        <motion.span
                          className="inline-block"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.span>
                      </span>
                      
                      {/* Decorative corner */}
                      <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-[hsl(43_74%_49%/0.05)] -z-10" />
                    </div>
                  </TiltCard>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS - Elegant Carousel
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing relative">
        <NoiseTexture />
        <div className="container-wide relative z-10">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-[hsl(43_74%_49%)] mb-4 block">
                Testimonials
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-[hsl(40_33%_95%)]">
                What our <span className="text-[hsl(43_74%_49%)]">clients</span> say
              </h2>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {testimonials.map((t, i) => (
              <FadeUp key={t.id} delay={i * 0.1} className="h-full">
                <motion.div
                  className="group h-full p-8 rounded-3xl bg-gradient-to-b from-[hsl(0_0%_8%)] to-[hsl(0_0%_5%)] border border-white/5 hover:border-[hsl(43_74%_49%/0.2)] transition-all duration-300 flex flex-col"
                  whileHover={{ y: -4 }}
                >
                  {/* Quote mark */}
                  <div className="text-6xl font-display text-[hsl(43_74%_49%/0.2)] leading-none mb-4">"</div>
                  
                  <p className="text-lg text-[hsl(40_33%_95%)] mb-6 leading-relaxed flex-grow">
                    {t.quote}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(43_74%_49%)] to-[hsl(43_74%_35%)]" />
                      <div>
                        <p className="font-medium text-[hsl(40_33%_95%)]">{t.name}</p>
                        <p className="text-sm text-[hsl(40_20%_65%)]">{t.event_type} • {t.location}</p>
                      </div>
                    </div>
                    
                    {/* Stars */}
                    <div className="flex items-center gap-1 mt-4 pt-4 border-t border-white/5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-[hsl(43_74%_49%)] text-[hsl(43_74%_49%)]" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.4}>
            <div className="text-center mt-10">
              <Link 
                to="/reviews" 
                className="inline-flex items-center gap-2 text-[hsl(40_33%_95%)] hover:text-[hsl(43_74%_49%)] transition-colors"
              >
                Read more reviews
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          VIDEO REELS SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing">
        <div className="container-wide">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-[hsl(43_74%_49%)] mb-4 block">
                Our Work
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-[hsl(40_33%_95%)]">
                See us in <span className="text-[hsl(43_74%_49%)]">action</span>
              </h2>
            </div>
          </FadeUp>

          {/* Scrollable container with arrows */}
          <div className="relative group">
            {/* Left Arrow */}
            <motion.button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[hsl(0_0%_5%)/0.9] backdrop-blur-sm border border-[hsl(43_74%_49%/0.3)] flex items-center justify-center text-[hsl(43_74%_49%)] hover:bg-[hsl(43_74%_49%)] hover:text-[hsl(0_0%_5%)] transition-all duration-300 -translate-x-2 md:-translate-x-6 opacity-0 group-hover:opacity-100 disabled:opacity-30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const container = document.getElementById('video-reel-scroll');
                if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
              }}
              data-testid="scroll-left-btn"
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            {/* Right Arrow */}
            <motion.button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[hsl(0_0%_5%)/0.9] backdrop-blur-sm border border-[hsl(43_74%_49%/0.3)] flex items-center justify-center text-[hsl(43_74%_49%)] hover:bg-[hsl(43_74%_49%)] hover:text-[hsl(0_0%_5%)] transition-all duration-300 translate-x-2 md:translate-x-6 opacity-0 group-hover:opacity-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const container = document.getElementById('video-reel-scroll');
                if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
              }}
              data-testid="scroll-right-btn"
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>

            {/* Gradient fade indicators */}
            <div className="absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-[hsl(0_0%_2%)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-[hsl(0_0%_2%)] to-transparent z-10 pointer-events-none" />

            {/* Scrollable content */}
            <div 
              id="video-reel-scroll"
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth px-4"
            >
              {VIDEOS.map((video, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <motion.div
                    className="flex-shrink-0 w-[180px] md:w-[220px] snap-start"
                    whileHover={{ scale: 1.03, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="aspect-[9/16] rounded-2xl overflow-hidden border border-white/5 hover:border-[hsl(43_74%_49%/0.3)] transition-colors">
                      <VideoReel src={video} className="w-full h-full object-cover" testid={`reel-${i}`} />
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>

            {/* Scroll indicator hint */}
            <div className="flex justify-center mt-4 gap-2">
              <motion.div
                className="flex items-center gap-2 text-sm text-[hsl(40_20%_65%)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Swipe to explore</span>
                <ChevronRight className="h-4 w-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing bg-[hsl(0_0%_3%)] relative">
        <div className="container-narrow relative z-10">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-[hsl(43_74%_49%)] mb-4 block">
                FAQs
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-[hsl(40_33%_95%)]">
                Common questions
              </h2>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id}
                  className="border border-white/10 rounded-2xl px-6 data-[state=open]:border-[hsl(43_74%_49%/0.3)] transition-colors overflow-hidden bg-[hsl(0_0%_5%)]"
                >
                  <AccordionTrigger 
                    className="text-left text-[hsl(40_33%_95%)] hover:text-[hsl(43_74%_49%)] py-5 text-lg font-display"
                    data-testid={`faq-trigger-${i}`}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[hsl(40_20%_75%)] pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="text-center mt-8">
              <Link 
                to="/faqs" 
                className="inline-flex items-center gap-2 text-[hsl(40_33%_95%)] hover:text-[hsl(43_74%_49%)] transition-colors"
              >
                View all FAQs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA - Full Width with Background
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0_0%_5%)] via-[hsl(0_0%_3%)] to-[hsl(0_0%_2%)]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-[hsl(43_74%_49%/0.05)] blur-[120px]" />
        </div>
        <NoiseTexture />
        
        <div className="container-narrow relative z-10 text-center">
          <FadeUp>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[hsl(40_33%_95%)] mb-6">
                Ready to elevate
                <br />
                <span className="text-[hsl(43_74%_49%)]">your celebration?</span>
              </h2>
              <p className="text-xl text-[hsl(40_20%_75%)] mb-10 max-w-2xl mx-auto">
                Let's create an unforgettable bar experience. Get a custom quote within 24 hours.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" data-testid="final-cta-quote">
                  <MagneticButton 
                    className="px-10 py-5 bg-[hsl(43_74%_49%)] text-[hsl(0_0%_2%)] rounded-full text-lg font-medium hover:bg-[hsl(43_74%_55%)] transition-colors"
                    strength={0.15}
                  >
                    <span className="flex items-center gap-3">
                      Get a Quote
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </MagneticButton>
                </Link>
                
                <a 
                  href={`https://wa.me/${BRAND.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="final-cta-whatsapp"
                >
                  <MagneticButton 
                    className="px-10 py-5 border border-[hsl(43_74%_49%/0.4)] text-[hsl(40_33%_95%)] rounded-full text-lg font-medium hover:border-[hsl(43_74%_49%)] transition-colors"
                    strength={0.15}
                  >
                    WhatsApp Us
                  </MagneticButton>
                </a>
              </div>
            </motion.div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
