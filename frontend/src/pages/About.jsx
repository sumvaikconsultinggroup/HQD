import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin, Award, Heart, Users, Sparkles, Wine, PartyPopper } from 'lucide-react';
import { BRAND } from '@/lib/constants';
import { useRef, useState } from 'react';

// Team mosaic images
const TEAM_IMAGES = [
  {
    src: 'https://customer-assets.emergentagent.com/job_ff2df9ce-7c56-472c-a16a-bca56f6db073/artifacts/xa7h2ewf_DSC00188.JPG',
    caption: 'Crafting perfection',
    size: 'large'
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_ff2df9ce-7c56-472c-a16a-bca56f6db073/artifacts/ip5eesj7_DSC00297.JPG',
    caption: 'Behind the bar',
    size: 'medium'
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_ff2df9ce-7c56-472c-a16a-bca56f6db073/artifacts/5ujmcues_DSC03226.JPG',
    caption: 'Event magic',
    size: 'medium'
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_ff2df9ce-7c56-472c-a16a-bca56f6db073/artifacts/hs163ftw_DSC03229.JPG',
    caption: 'Team spirit',
    size: 'large'
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_ff2df9ce-7c56-472c-a16a-bca56f6db073/artifacts/xvrr7lij_DSC03245.JPG',
    caption: 'Party vibes',
    size: 'medium'
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_ff2df9ce-7c56-472c-a16a-bca56f6db073/artifacts/kc6y7nwx_DSC03289.JPG',
    caption: 'Mixing it up',
    size: 'medium'
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_ff2df9ce-7c56-472c-a16a-bca56f6db073/artifacts/jfqzaqtz_DSC03296.JPG',
    caption: 'Good times',
    size: 'large'
  },
  {
    src: 'https://customer-assets.emergentagent.com/job_ff2df9ce-7c56-472c-a16a-bca56f6db073/artifacts/h6zibc7d_DSC09794.JPG',
    caption: 'The crew',
    size: 'medium'
  },
];

// Mosaic Image Card Component
const MosaicCard = ({ image, index, isHovered, onHover, onLeave }) => {
  const randomRotation = (index % 2 === 0 ? 1 : -1) * (Math.random() * 2 + 1);
  
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
        image.size === 'large' ? 'row-span-2' : ''
      }`}
      initial={{ opacity: 0, y: 50, rotate: randomRotation }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        ease: [0.2, 0.8, 0.2, 1]
      }}
      whileHover={{ 
        scale: 1.03, 
        zIndex: 20,
        rotate: 0,
        transition: { duration: 0.3 }
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      style={{
        filter: isHovered !== null && isHovered !== index ? 'brightness(0.6)' : 'brightness(1)',
        transition: 'filter 0.3s ease'
      }}
    >
      {/* Image */}
      <motion.img
        src={image.src}
        alt={image.caption}
        className="w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Caption */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
      >
        <p className="text-white font-medium text-sm flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[hsl(43_74%_49%)]" />
          {image.caption}
        </p>
      </motion.div>
      
      {/* Corner Accent */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[hsl(43_74%_49%)/0.2] backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Wine className="h-4 w-4 text-[hsl(43_74%_49%)]" />
      </div>
    </motion.div>
  );
};

export default function About() {
  const [hoveredImage, setHoveredImage] = useState(null);
  const teamSectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: teamSectionRef,
    offset: ['start end', 'end start']
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="label-gold mb-4">About Us</p>
              <h1 className="heading-xl text-[hsl(40_33%_95%)] mb-6">
                {BRAND.fullName}
              </h1>
              <p className="heading-md text-gold mb-8">{BRAND.tagline}</p>
              <div className="body-lg space-y-4">
                <p>
                  HQ.D was born from a simple observation: while every aspect of Indian 
                  celebrations has evolved, the bar experience often remains an afterthought.
                </p>
                <p>
                  We set out to change that — to bring artistry, attention to detail, and 
                  premium experience to every glass we serve.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <img src={BRAND.logo} alt="HQ.D" className="w-48 lg:w-64" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacing bg-pearl">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-[hsl(0_0%_10%)]">What we stand for</h2>
          </div>
          <div className="grid-4">
            {[
              { icon: Award, title: 'Excellence', desc: 'Premium quality in every pour' },
              { icon: Heart, title: 'Passion', desc: 'We love creating memorable moments' },
              { icon: Users, title: 'Service', desc: 'Professional and attentive always' },
              { icon: MapPin, title: 'Reach', desc: 'Pan-India with destination expertise' },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <value.icon className="h-10 w-10 text-gold mx-auto mb-4" />
                <h3 className="heading-sm text-[hsl(0_0%_10%)] mb-2">{value.title}</h3>
                <p className="body-sm text-[hsl(0_0%_40%)]">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TEAM MOSAIC SECTION - Fun & Interactive
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={teamSectionRef} className="section-spacing relative overflow-hidden">
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ y: bgY }}
        >
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-[hsl(43_74%_49%/0.03)] blur-[100px]" />
          <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[hsl(280_60%_50%/0.02)] blur-[80px]" />
        </motion.div>
        
        {/* Floating Decorations */}
        <motion.div
          className="absolute top-20 right-10 text-[hsl(43_74%_49%/0.15)]"
          animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <PartyPopper className="h-24 w-24" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-10 text-[hsl(43_74%_49%/0.1)]"
          animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Wine className="h-20 w-20" />
        </motion.div>
        
        <div className="container-wide relative z-10">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(43_74%_49%/0.1)] border border-[hsl(43_74%_49%/0.2)] mb-6"
            >
              <Sparkles className="h-4 w-4 text-[hsl(43_74%_49%)]" />
              <span className="text-sm font-medium text-[hsl(43_74%_49%)]">The People Behind The Magic</span>
            </motion.div>
            
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[hsl(40_33%_95%)] mb-6">
              Meet Our{' '}
              <span className="relative inline-block">
                <span className="text-[hsl(43_74%_49%)]">Fun-Loving</span>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <motion.path
                    d="M2 8 Q 50 2, 100 8 T 198 8"
                    stroke="hsl(43 74% 49%)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
              {' '}Team
            </h2>
            
            <p className="text-lg text-[hsl(40_20%_75%)] max-w-2xl mx-auto">
              Behind every perfect pour is a passionate team that brings energy, expertise, 
              and a whole lot of fun to every event we serve.
            </p>
          </motion.div>
          
          {/* Mosaic Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
            {TEAM_IMAGES.map((image, i) => (
              <MosaicCard 
                key={i} 
                image={image} 
                index={i}
                isHovered={hoveredImage}
                onHover={setHoveredImage}
                onLeave={() => setHoveredImage(null)}
              />
            ))}
          </div>
          
          {/* Fun Stats Strip */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {[
              { number: '50+', label: 'Trained Bartenders', emoji: '🍸' },
              { number: '500+', label: 'Events Served', emoji: '🎉' },
              { number: '15+', label: 'Cities Covered', emoji: '📍' },
              { number: '∞', label: 'Good Vibes', emoji: '✨' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center p-6 rounded-2xl bg-[hsl(0_0%_8%)] border border-white/5 hover:border-[hsl(43_74%_49%/0.3)] transition-colors"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <motion.span
                  className="text-3xl mb-2 block"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  {stat.emoji}
                </motion.span>
                <div className="text-3xl font-display text-[hsl(43_74%_49%)] mb-1">{stat.number}</div>
                <div className="text-sm text-[hsl(40_20%_65%)]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Call to Join */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-[hsl(40_20%_65%)] mb-4">
              Want to join our crazy talented team?
            </p>
            <motion.a
              href={`mailto:${BRAND.email}?subject=I want to join HQ.D!`}
              className="inline-flex items-center gap-2 text-[hsl(43_74%_49%)] font-medium hover:underline"
              whileHover={{ x: 5 }}
            >
              Drop us a line <ArrowRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Clear Focus */}
      <section className="section-spacing">
        <div className="container-narrow">
          <div className="card-minimal p-10 lg:p-16 text-center">
            <h2 className="heading-md text-[hsl(40_33%_95%)] mb-6">A clear focus</h2>
            <p className="body-lg text-[hsl(40_33%_95%)] mb-4">
              We specialize exclusively in <span className="text-gold">bar services</span> — 
              cocktails and mocktails.
            </p>
            <p className="body-md">
              We do not provide food, catering, or any other services. This focus allows us 
              to be the absolute best at what we do.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-elevated border-y border-white/5">
        <div className="container-narrow text-center">
          <h2 className="heading-lg text-[hsl(40_33%_95%)] mb-4">Let's create together</h2>
          <p className="body-lg mb-8">
            We'd love to be part of your celebration.
          </p>
          <Link to="/contact" className="btn-primary">
            Get in Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
