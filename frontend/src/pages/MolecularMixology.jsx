import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Star, Zap, Crown, Play, Pause, X,
  ChevronDown, Trophy, Lock, Unlock, Filter, Search, Eye,
  Beaker, FlaskConical, Atom, Flame, Snowflake, Wind
} from 'lucide-react';
import {
  MOLECULAR_TECHNIQUES,
  DIFFICULTY_LEVELS,
  TECHNIQUE_CATEGORIES,
  getTechniquesByDifficulty,
  getTechniquesByCategory,
  calculateTotalPoints
} from '@/lib/molecularTechniques';
import { 
  FadeUp, 
  TiltCard, 
  NoiseTexture,
  CountUp,
  MagneticButton
} from '@/components/animations';
import { SparkleEffect, BlurReveal, GradientBorder } from '@/components/animations/AdvancedEffects';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

// Difficulty icon mapping
const difficultyIcons = {
  beginner: Beaker,
  intermediate: FlaskConical,
  advanced: Atom,
  master: Crown
};

export default function MolecularMixology() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [viewedTechniques, setViewedTechniques] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Load viewed techniques from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('viewedTechniques');
    if (saved) setViewedTechniques(JSON.parse(saved));
  }, []);

  // Save viewed techniques
  const markAsViewed = (id) => {
    if (!viewedTechniques.includes(id)) {
      const updated = [...viewedTechniques, id];
      setViewedTechniques(updated);
      localStorage.setItem('viewedTechniques', JSON.stringify(updated));
    }
  };

  // Filter techniques
  const filteredTechniques = MOLECULAR_TECHNIQUES.filter(t => {
    const matchesDifficulty = selectedDifficulty === 'all' || t.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesCategory && matchesSearch;
  });

  // Calculate user progress
  const totalTechniques = MOLECULAR_TECHNIQUES.length;
  const viewedCount = viewedTechniques.length;
  const earnedPoints = viewedTechniques.reduce((sum, id) => {
    const tech = MOLECULAR_TECHNIQUES.find(t => t.id === id);
    return sum + (tech ? DIFFICULTY_LEVELS[tech.difficulty].points : 0);
  }, 0);
  const totalPoints = calculateTotalPoints();

  return (
    <div className="min-h-screen overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - Gamified Header
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
              filter: 'blur(60px)'
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(128,0,255,0.08) 0%, transparent 70%)',
              filter: 'blur(60px)'
            }}
            animate={{ 
              scale: [1, 1.15, 1],
              y: [0, -30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <SparkleEffect count={30} color="hsl(352, 33%, 59%)" />
          <NoiseTexture />
        </div>

        <motion.div 
          className="container-wide relative z-10"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <FadeUp>
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="p-3 rounded-2xl bg-gradient-to-br from-[hsl(352_33%_59%)] to-[hsl(280_60%_50%)]"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Atom className="h-8 w-8 text-white" />
                  </motion.div>
                  <span className="text-xs font-medium tracking-[0.25em] uppercase text-[hsl(352_33%_59%)]">
                    The Science of Drinks
                  </span>
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[hsl(40_33%_95%)] mb-6 leading-[1.1]">
                  Molecular
                  <br />
                  <span className="bg-gradient-to-r from-[hsl(352_33%_59%)] to-[hsl(280_60%_50%)] bg-clip-text text-transparent">
                    Mixology Lab
                  </span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="text-xl text-[hsl(40_20%_75%)] mb-8 max-w-xl">
                  Explore <span className="text-[hsl(352_33%_59%)] font-semibold">{totalTechniques}+</span> mind-bending 
                  techniques that transform drinks into unforgettable experiences. From smoke bubbles to liquid nitrogen magic.
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    onClick={() => document.getElementById('techniques').scrollIntoView({ behavior: 'smooth' })}
                    className="btn-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sparkles className="h-5 w-5" />
                    Explore Techniques
                  </motion.button>
                  <Link to="/contact" className="btn-outline">
                    Book for Your Event
                  </Link>
                </div>
              </FadeUp>
            </div>

            {/* Right: Gamification Stats */}
            <FadeUp delay={0.4}>
              <div className="relative">
                {/* Progress Card */}
                <GradientBorder>
                  <div className="p-8 bg-[hsl(0_0%_5%)]">
                    <div className="flex items-center gap-3 mb-6">
                      <Trophy className="h-6 w-6 text-[hsl(352_33%_59%)]" />
                      <span className="font-display text-xl text-[hsl(40_33%_95%)]">Your Progress</span>
                    </div>

                    {/* Circular Progress */}
                    <div className="flex items-center justify-center mb-8">
                      <div className="relative w-40 h-40">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="none"
                            stroke="hsl(0, 0%, 15%)"
                            strokeWidth="8"
                          />
                          <motion.circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: '0 440' }}
                            animate={{ 
                              strokeDasharray: `${(viewedCount / totalTechniques) * 440} 440` 
                            }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="hsl(352, 33%, 59%)" />
                              <stop offset="100%" stopColor="hsl(280, 60%, 50%)" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-display text-4xl text-[hsl(40_33%_95%)]">
                            {viewedCount}
                          </span>
                          <span className="text-sm text-[hsl(40_20%_65%)]">
                            of {totalTechniques}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Zap className="h-5 w-5 text-[hsl(352_33%_59%)]" />
                        <span className="font-display text-3xl text-[hsl(352_33%_59%)]">
                          <CountUp target={earnedPoints} duration={1500} />
                        </span>
                        <span className="text-[hsl(40_20%_65%)]">/ {totalPoints} pts</span>
                      </div>
                      <p className="text-sm text-[hsl(40_20%_65%)]">
                        Explore techniques to earn points!
                      </p>
                    </div>

                    {/* Difficulty Legend */}
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => {
                        const count = MOLECULAR_TECHNIQUES.filter(t => t.difficulty === key).length;
                        const viewedOfType = viewedTechniques.filter(id => {
                          const tech = MOLECULAR_TECHNIQUES.find(t => t.id === id);
                          return tech?.difficulty === key;
                        }).length;
                        return (
                          <div 
                            key={key}
                            className="flex items-center gap-2 p-2 rounded-lg bg-[hsl(0_0%_8%)]"
                          >
                            <span className="text-lg">{level.icon}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-[hsl(40_33%_95%)] truncate">{level.label}</p>
                              <p className="text-[10px] text-[hsl(40_20%_65%)]">{viewedOfType}/{count}</p>
                            </div>
                            <span className="text-xs font-medium" style={{ color: level.color }}>
                              +{level.points}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </GradientBorder>

                {/* Floating Badges */}
                <motion.div
                  className="absolute -top-4 -right-4 p-3 rounded-full bg-[hsl(352_33%_59%)] shadow-lg"
                  animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="h-5 w-5 text-[hsl(0_0%_2%)]" />
                </motion.div>
              </div>
            </FadeUp>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6 text-[hsl(352_33%_59%)]" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FILTERS SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="techniques" className="sticky top-16 lg:top-20 z-40 bg-[hsl(0_0%_2%)]/95 backdrop-blur-xl border-y border-white/5 py-4">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(40_20%_65%)]" />
              <Input
                placeholder="Search techniques..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[hsl(0_0%_8%)] border-white/10 text-[hsl(40_33%_95%)]"
                data-testid="molecular-search"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <span className="text-xs text-[hsl(40_20%_65%)] shrink-0">Level:</span>
              <button
                onClick={() => setSelectedDifficulty('all')}
                className={cn(
                  "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all",
                  selectedDifficulty === 'all'
                    ? "bg-[hsl(352_33%_59%)] text-[hsl(0_0%_2%)]"
                    : "border border-white/10 text-[hsl(40_20%_75%)] hover:border-white/20"
                )}
              >
                All
              </button>
              {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => {
                const Icon = difficultyIcons[key];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDifficulty(key)}
                    className={cn(
                      "shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                      selectedDifficulty === key
                        ? "text-[hsl(0_0%_2%)]"
                        : "border border-white/10 text-[hsl(40_20%_75%)] hover:border-white/20"
                    )}
                    style={{
                      backgroundColor: selectedDifficulty === key ? level.color : undefined
                    }}
                    data-testid={`filter-${key}`}
                  >
                    <span>{level.icon}</span>
                    {level.label}
                  </button>
                );
              })}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <span className="text-xs text-[hsl(40_20%_65%)] shrink-0">Type:</span>
              {TECHNIQUE_CATEGORIES.slice(0, 5).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-sm transition-all",
                    selectedCategory === cat.id
                      ? "bg-white/10 text-[hsl(40_33%_95%)]"
                      : "text-[hsl(40_20%_65%)] hover:text-[hsl(40_33%_95%)]"
                  )}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TECHNIQUES GRID
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing pt-12">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <p className="text-[hsl(40_20%_65%)]">
              Showing <span className="text-[hsl(40_33%_95%)] font-medium">{filteredTechniques.length}</span> techniques
            </p>
          </div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredTechniques.map((technique, i) => {
                const level = DIFFICULTY_LEVELS[technique.difficulty];
                const Icon = difficultyIcons[technique.difficulty];
                const isViewed = viewedTechniques.includes(technique.id);

                return (
                  <motion.div
                    key={technique.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.03 }}
                    onHoverStart={() => setHoveredCard(technique.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                  >
                    <TiltCard maxTilt={8}>
                      <motion.div
                        className={cn(
                          "group relative h-full rounded-2xl overflow-hidden cursor-pointer",
                          "bg-gradient-to-b from-[hsl(0_0%_10%)] to-[hsl(0_0%_5%)]",
                          "border border-white/5 hover:border-[hsl(352_33%_59%/0.3)]",
                          "transition-all duration-300"
                        )}
                        onClick={() => {
                          setSelectedTechnique(technique);
                          markAsViewed(technique.id);
                        }}
                        whileHover={{ y: -4 }}
                        data-testid={`technique-${technique.id}`}
                      >
                        {/* Image */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <motion.img
                            src={technique.image}
                            alt={technique.name}
                            className="w-full h-full object-cover"
                            animate={{ scale: hoveredCard === technique.id ? 1.1 : 1 }}
                            transition={{ duration: 0.5 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_5%)] via-transparent to-transparent" />
                          
                          {/* Difficulty Badge */}
                          <div 
                            className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{ backgroundColor: level.color }}
                          >
                            <span>{level.icon}</span>
                            {level.label}
                          </div>

                          {/* Points Badge */}
                          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs">
                            <Zap className="h-3 w-3 text-[hsl(352_33%_59%)]" />
                            <span className="text-[hsl(352_33%_59%)]">+{level.points}</span>
                          </div>

                          {/* Viewed Badge */}
                          {isViewed && (
                            <div className="absolute bottom-3 right-3 p-1.5 rounded-full bg-[hsl(142_76%_36%)]">
                              <Eye className="h-3 w-3 text-white" />
                            </div>
                          )}

                          {/* Wow Factor */}
                          <div className="absolute bottom-3 left-3 flex items-center gap-1">
                            {[...Array(5)].map((_, j) => (
                              <Star 
                                key={j} 
                                className={cn(
                                  "h-3 w-3",
                                  j < Math.round(technique.wowFactor / 2) 
                                    ? "fill-[hsl(352_33%_59%)] text-[hsl(352_33%_59%)]"
                                    : "text-white/20"
                                )}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h3 className="font-display text-lg text-[hsl(40_33%_95%)] mb-1 group-hover:text-[hsl(352_33%_59%)] transition-colors">
                            {technique.name}
                          </h3>
                          <p className="text-sm text-[hsl(40_20%_65%)] line-clamp-2">
                            {technique.tagline}
                          </p>

                          {/* Category Tag */}
                          <div className="flex items-center gap-2 mt-3">
                            <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-[hsl(40_20%_75%)]">
                              {TECHNIQUE_CATEGORIES.find(c => c.id === technique.category)?.icon} {technique.category}
                            </span>
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span className="flex items-center gap-2 text-[hsl(352_33%_59%)] font-medium">
                            <Eye className="h-5 w-5" />
                            View Details
                          </span>
                        </motion.div>
                      </motion.div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filteredTechniques.length === 0 && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Beaker className="h-16 w-16 text-[hsl(40_20%_65%/0.3)] mx-auto mb-4" />
              <h3 className="font-display text-2xl text-[hsl(40_33%_95%)] mb-2">No techniques found</h3>
              <p className="text-[hsl(40_20%_65%)]">Try adjusting your filters</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-b from-[hsl(0_0%_3%)] to-[hsl(0_0%_2%)] relative">
        <SparkleEffect count={10} />
        <div className="container-narrow text-center relative z-10">
          <FadeUp>
            <Atom className="h-12 w-12 text-[hsl(352_33%_59%)] mx-auto mb-6" />
            <h2 className="font-display text-3xl sm:text-4xl text-[hsl(40_33%_95%)] mb-4">
              Want molecular magic at your event?
            </h2>
            <p className="text-lg text-[hsl(40_20%_75%)] mb-8 max-w-xl mx-auto">
              Our Signature, Luxe, and Ultra packages include molecular mixology elements as standard.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/packages">
                <MagneticButton className="btn-primary" strength={0.15}>
                  View Packages
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </Link>
              <Link to="/contact" className="btn-outline">
                Get a Quote
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TECHNIQUE DETAIL MODAL
      ═══════════════════════════════════════════════════════════════════ */}
      <Dialog open={!!selectedTechnique} onOpenChange={() => setSelectedTechnique(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[hsl(0_0%_5%)] border-white/10">
          {selectedTechnique && (
            <TechniqueDetail 
              technique={selectedTechnique} 
              onClose={() => setSelectedTechnique(null)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Technique Detail Component
function TechniqueDetail({ technique, onClose }) {
  const level = DIFFICULTY_LEVELS[technique.difficulty];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative aspect-video rounded-xl overflow-hidden -mx-6 -mt-6">
        <img 
          src={technique.image} 
          alt={technique.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_5%)] via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
            style={{ backgroundColor: level.color }}
          >
            {level.icon} {level.label}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-sm">
            <Zap className="h-4 w-4 text-[hsl(352_33%_59%)]" />
            +{level.points} points
          </span>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="font-display text-3xl text-white mb-1">{technique.name}</h2>
          <p className="text-lg text-[hsl(352_33%_59%)]">{technique.tagline}</p>
        </div>
      </div>

      {/* Wow Factor */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-[hsl(40_20%_65%)]">Wow Factor:</span>
        <div className="flex items-center gap-1">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "w-6 h-2 rounded-full",
                i < technique.wowFactor 
                  ? "bg-gradient-to-r from-[hsl(352_33%_59%)] to-[hsl(280_60%_50%)]"
                  : "bg-white/10"
              )}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * 0.05 }}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-[hsl(352_33%_59%)]">{technique.wowFactor}/10</span>
      </div>

      {/* Description */}
      <div>
        <h3 className="font-display text-lg text-[hsl(40_33%_95%)] mb-2">About This Technique</h3>
        <p className="text-[hsl(40_20%_75%)] leading-relaxed whitespace-pre-line">
          {technique.longDescription}
        </p>
      </div>

      {/* Steps */}
      <div>
        <h3 className="font-display text-lg text-[hsl(40_33%_95%)] mb-4">How It's Done</h3>
        <div className="space-y-3">
          {technique.steps.map((step, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl bg-white/5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="w-6 h-6 rounded-full bg-[hsl(352_33%_59%)] flex items-center justify-center text-xs font-bold text-[hsl(0_0%_2%)]">
                {i + 1}
              </span>
              <span className="text-[hsl(40_33%_95%)] flex-1">{step}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pro Tips */}
      <div>
        <h3 className="font-display text-lg text-[hsl(40_33%_95%)] mb-3">Pro Tips</h3>
        <div className="grid gap-2">
          {technique.proTips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-[hsl(40_20%_75%)]">
              <Star className="h-4 w-4 text-[hsl(352_33%_59%)] shrink-0 mt-0.5" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fun Fact */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[hsl(352_33%_59%/0.1)] to-[hsl(280_60%_50%/0.1)] border border-[hsl(352_33%_59%/0.2)]">
        <p className="flex items-start gap-2">
          <span className="text-xl">💡</span>
          <span className="text-[hsl(40_33%_95%)]">
            <strong>Fun Fact:</strong> {technique.funFact}
          </span>
        </p>
      </div>

      {/* Equipment & Ingredients */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-display text-lg text-[hsl(40_33%_95%)] mb-3">Equipment Needed</h3>
          <ul className="space-y-2">
            {technique.equipmentNeeded.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-[hsl(40_20%_75%)]">
                <Beaker className="h-4 w-4 text-[hsl(352_33%_59%)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-lg text-[hsl(40_33%_95%)] mb-3">Key Ingredients</h3>
          <ul className="space-y-2">
            {technique.ingredients.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-[hsl(40_20%_75%)]">
                <FlaskConical className="h-4 w-4 text-[hsl(280_60%_50%)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Popular Drinks */}
      <div>
        <h3 className="font-display text-lg text-[hsl(40_33%_95%)] mb-3">Try It With</h3>
        <div className="flex flex-wrap gap-2">
          {technique.popularDrinks.map((drink, i) => (
            <span 
              key={i}
              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[hsl(40_33%_95%)] text-sm"
            >
              🍸 {drink}
            </span>
          ))}
        </div>
      </div>

      {/* Perfect For */}
      <div>
        <h3 className="font-display text-lg text-[hsl(40_33%_95%)] mb-3">Perfect For</h3>
        <div className="flex flex-wrap gap-2">
          {technique.perfectFor.map((event, i) => (
            <span 
              key={i}
              className="px-3 py-1.5 rounded-full bg-[hsl(352_33%_59%/0.15)] text-[hsl(352_33%_59%)] text-sm"
            >
              {event}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="pt-4 border-t border-white/10">
        <Link to="/contact" className="btn-primary w-full justify-center">
          Book This Experience
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
