import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Users, Clock, Star, Filter, X, ChevronDown,
  Flower2, Sun, Music, Wine, Crown, Heart, PartyPopper, Waves, Coffee, Building2,
  SlidersHorizontal, Grid3X3, LayoutList
} from 'lucide-react';
import { 
  BAR_SETUP_CATEGORIES, 
  BAR_SETUPS_LIBRARY, 
  filterSetups,
  getFeaturedSetups 
} from '@/lib/barSetups';
import { 
  FadeUp, 
  StaggerContainer, 
  staggerItem,
  TiltCard,
  NoiseTexture 
} from '@/components/animations';
import { cn } from '@/lib/utils';

// Icon mapping
const iconMap = {
  Sparkles, Flower2, Sun, Music, Wine, Crown, Heart, PartyPopper, Waves, Coffee, Building2
};

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.95,
    transition: { duration: 0.3 }
  }
};

const filterVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { 
    opacity: 1, 
    height: 'auto',
    transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }
  }
};

export default function BarSetups() {
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [hoveredCard, setHoveredCard] = useState(null);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Filter setups based on selections
  const filteredSetups = useMemo(() => {
    return filterSetups({ 
      event: selectedEvent, 
      style: selectedStyle 
    });
  }, [selectedEvent, selectedStyle]);

  // Get current event info
  const currentEvent = BAR_SETUP_CATEGORIES.events.find(e => e.id === selectedEvent);
  const EventIcon = currentEvent ? iconMap[currentEvent.icon] : Sparkles;

  const clearFilters = () => {
    setSelectedEvent('all');
    setSelectedStyle('all');
  };

  const hasActiveFilters = selectedEvent !== 'all' || selectedStyle !== 'all';

  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
              filter: 'blur(80px)'
            }}
            animate={{ 
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <NoiseTexture />
        </div>

        <motion.div 
          className="container-wide relative z-10"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <FadeUp>
            <div className="max-w-4xl">
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-[hsl(43_74%_49%)] mb-4 block">
                Bar Setups
              </span>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[hsl(40_33%_95%)] mb-6">
                Crafted for every
                <br />
                <span className="text-[hsl(43_74%_49%)]">wedding moment</span>
              </h1>
              <p className="text-xl text-[hsl(40_20%_75%)] max-w-2xl">
                From intimate after-parties to grand receptions, find the perfect bar setup 
                for your celebration. {BAR_SETUPS_LIBRARY.length}+ designs available.
              </p>
            </div>
          </FadeUp>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          EVENT FILTER TABS - Horizontal Scroll
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="sticky top-16 lg:top-20 z-40 bg-[hsl(0_0%_2%)]/90 backdrop-blur-xl border-y border-white/5 py-4">
        <div className="container-wide">
          <div className="flex items-center gap-4">
            {/* Event Tabs */}
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[hsl(40_20%_65%)] shrink-0 mr-2">Occasion</span>
                {BAR_SETUP_CATEGORIES.events.map((event) => {
                  const Icon = iconMap[event.icon] || Sparkles;
                  const isActive = selectedEvent === event.id;
                  return (
                    <motion.button
                      key={event.id}
                      onClick={() => setSelectedEvent(event.id)}
                      className={cn(
                        "shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                        isActive
                          ? "bg-[hsl(43_74%_49%)] text-[hsl(0_0%_2%)]"
                          : "border border-white/10 text-[hsl(40_20%_75%)] hover:border-[hsl(43_74%_49%/0.5)] hover:text-[hsl(40_33%_95%)]"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      data-testid={`filter-event-${event.id}`}
                    >
                      <Icon className="h-4 w-4" />
                      {event.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Style Filter & View Toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                  showFilters || selectedStyle !== 'all'
                    ? "bg-[hsl(43_74%_49%/0.1)] text-[hsl(43_74%_49%)] border border-[hsl(43_74%_49%/0.3)]"
                    : "border border-white/10 text-[hsl(40_20%_75%)] hover:border-white/20"
                )}
                whileTap={{ scale: 0.95 }}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Style
                {selectedStyle !== 'all' && (
                  <span className="w-2 h-2 rounded-full bg-[hsl(43_74%_49%)]" />
                )}
              </motion.button>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center border border-white/10 rounded-full p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    viewMode === 'grid' ? "bg-white/10 text-[hsl(40_33%_95%)]" : "text-[hsl(40_20%_65%)]"
                  )}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    viewMode === 'list' ? "bg-white/10 text-[hsl(40_33%_95%)]" : "text-[hsl(40_20%_65%)]"
                  )}
                >
                  <LayoutList className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Style Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={filterVariants}
                className="overflow-hidden"
              >
                <div className="pt-4 flex flex-wrap gap-2">
                  <span className="text-xs text-[hsl(40_20%_65%)] self-center mr-2">Style</span>
                  {BAR_SETUP_CATEGORIES.styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm transition-all",
                        selectedStyle === style.id
                          ? "bg-[hsl(43_74%_49%)] text-[hsl(0_0%_2%)]"
                          : "border border-white/10 text-[hsl(40_20%_75%)] hover:border-white/20"
                      )}
                      data-testid={`filter-style-${style.id}`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          RESULTS HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-8">
        <div className="container-wide">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <EventIcon className="h-5 w-5 text-[hsl(43_74%_49%)]" />
              <span className="text-lg text-[hsl(40_33%_95%)]">
                <span className="font-display">{filteredSetups.length}</span>
                <span className="text-[hsl(40_20%_65%)]"> setups for </span>
                <span className="font-medium">{currentEvent?.label || 'All Events'}</span>
              </span>
            </div>
            
            {hasActiveFilters && (
              <motion.button
                onClick={clearFilters}
                className="flex items-center gap-2 text-sm text-[hsl(43_74%_49%)] hover:underline"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <X className="h-4 w-4" />
                Clear filters
              </motion.button>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SETUPS GRID
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing pt-0">
        <div className="container-wide">
          <motion.div 
            className={cn(
              "grid gap-6",
              viewMode === 'grid' 
                ? "md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1 max-w-4xl"
            )}
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredSetups.map((setup, i) => (
                <motion.div
                  key={setup.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ delay: i * 0.05 }}
                  onHoverStart={() => setHoveredCard(setup.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  {viewMode === 'grid' ? (
                    <SetupCardGrid setup={setup} isHovered={hoveredCard === setup.id} />
                  ) : (
                    <SetupCardList setup={setup} isHovered={hoveredCard === setup.id} />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredSetups.length === 0 && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Filter className="h-16 w-16 text-[hsl(40_20%_65%/0.3)] mx-auto mb-4" />
              <h3 className="font-display text-2xl text-[hsl(40_33%_95%)] mb-2">No setups found</h3>
              <p className="text-[hsl(40_20%_65%)] mb-6">Try adjusting your filters to see more options.</p>
              <button onClick={clearFilters} className="btn-outline">
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[hsl(0_0%_3%)] relative">
        <NoiseTexture />
        <div className="container-narrow text-center relative z-10">
          <FadeUp>
            <h2 className="font-display text-3xl sm:text-4xl text-[hsl(40_33%_95%)] mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-lg text-[hsl(40_20%_75%)] mb-8 max-w-xl mx-auto">
              We create custom bar setups tailored to your unique vision. Tell us about your event.
            </p>
            <Link to="/contact" className="btn-primary">
              Request Custom Setup
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}

// Grid Card Component
function SetupCardGrid({ setup, isHovered }) {
  return (
    <Link to={`/bar-setups/${setup.slug}`} data-testid={`setup-card-${setup.slug}`}>
      <TiltCard maxTilt={6} className="h-full">
        <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-[hsl(0_0%_8%)] to-[hsl(0_0%_5%)] border border-white/5 hover:border-[hsl(43_74%_49%/0.3)] transition-all duration-500 h-full">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-[hsl(0_0%_8%)]">
            <img 
              src={setup.image_url} 
              alt={setup.title}
              loading="lazy"
              decoding="async"
              width="400"
              height="300"
              className={`w-full h-full object-cover transition-transform duration-600 ${isHovered ? 'scale-108' : 'scale-100'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_5%)] via-black/30 to-transparent" />
            
            {/* Molecular Tag */}
            {setup.molecular_tag && (
              <motion.span 
                className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[hsl(43_74%_49%/0.15)] backdrop-blur-sm text-xs font-medium text-[hsl(43_74%_49%)] border border-[hsl(43_74%_49%/0.3)]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="h-3 w-3 inline mr-1" />
                {setup.molecular_tag}
              </motion.span>
            )}

            {/* Featured Badge */}
            {setup.featured && (
              <div className="absolute top-4 left-4">
                <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[hsl(0_0%_5%/0.8)] backdrop-blur-sm text-xs text-[hsl(43_74%_49%)]">
                  <Star className="h-3 w-3 fill-current" />
                  Featured
                </span>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-display text-xl text-[hsl(40_33%_95%)] group-hover:text-[hsl(43_74%_49%)] transition-colors">
                {setup.title}
              </h3>
            </div>
            <p className="text-sm text-[hsl(40_20%_65%)] mb-4 line-clamp-2">
              {setup.subtitle}
            </p>
            
            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-[hsl(40_20%_65%)]">
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {setup.best_for}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {setup.setup_time}
              </span>
            </div>

            {/* Event Tags */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {setup.events.slice(0, 3).map(event => {
                const eventInfo = BAR_SETUP_CATEGORIES.events.find(e => e.id === event);
                return (
                  <span 
                    key={event}
                    className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-[hsl(40_20%_75%)]"
                  >
                    {eventInfo?.label}
                  </span>
                );
              })}
              {setup.events.length > 3 && (
                <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-[hsl(40_20%_75%)]">
                  +{setup.events.length - 3}
                </span>
              )}
            </div>

            {/* Hover Arrow */}
            <motion.div 
              className="absolute bottom-6 right-6"
              animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className="h-5 w-5 text-[hsl(43_74%_49%)]" />
            </motion.div>
          </div>
        </div>
      </TiltCard>
    </Link>
  );
}

// List Card Component
function SetupCardList({ setup, isHovered }) {
  return (
    <Link to={`/bar-setups/${setup.slug}`} data-testid={`setup-card-${setup.slug}`}>
      <motion.div 
        className="group flex gap-6 p-4 rounded-2xl bg-[hsl(0_0%_5%)] border border-white/5 hover:border-[hsl(43_74%_49%/0.3)] transition-all duration-300"
        animate={{ x: isHovered ? 4 : 0 }}
      >
        {/* Image */}
        <div className="relative w-40 h-32 rounded-xl overflow-hidden shrink-0 bg-[hsl(0_0%_8%)]">
          <img 
            src={setup.image_url} 
            alt={setup.title}
            loading="lazy"
            decoding="async"
            width="160"
            height="128"
            className="w-full h-full object-cover"
          />
          {setup.molecular_tag && (
            <span className="absolute bottom-2 left-2 px-2 py-1 rounded-full bg-[hsl(43_74%_49%/0.15)] backdrop-blur-sm text-[10px] font-medium text-[hsl(43_74%_49%)]">
              {setup.molecular_tag}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-display text-lg text-[hsl(40_33%_95%)] group-hover:text-[hsl(43_74%_49%)] transition-colors">
              {setup.title}
            </h3>
            {setup.featured && (
              <Star className="h-4 w-4 text-[hsl(43_74%_49%)] fill-current shrink-0" />
            )}
          </div>
          <p className="text-sm text-[hsl(40_20%_65%)] mb-3 line-clamp-2">
            {setup.description}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-[hsl(40_20%_65%)]">
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {setup.best_for}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {setup.setup_time}
            </span>
            <span className="flex items-center gap-1 text-[hsl(43_74%_49%)]">
              View details
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
