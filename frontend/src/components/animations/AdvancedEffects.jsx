import { motion, useMotionValue, useSpring, animate } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// Sparkle particle effect
export function SparkleEffect({ count = 20, color = 'hsl(43, 74%, 49%)' }) {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const generateSparkle = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 2,
    });

    setSparkles(Array.from({ length: count }, generateSparkle));

    const interval = setInterval(() => {
      setSparkles(prev => {
        const newSparkles = [...prev];
        const indexToReplace = Math.floor(Math.random() * count);
        newSparkles[indexToReplace] = generateSparkle();
        return newSparkles;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: color,
            boxShadow: `0 0 ${sparkle.size * 2}px ${color}`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

// Floating particles
export function FloatingParticles({ count = 30 }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * -20,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[hsl(43_74%_49%/0.3)]"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ 
            y: '-10vh',
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

// Morphing blob shape
export function MorphingBlob({ 
  className = '', 
  color = 'hsl(43, 74%, 49%, 0.1)',
  size = 400 
}) {
  const paths = [
    'M60.5,-51.2C74.3,-35.5,78.8,-10.8,73.3,10.2C67.9,31.2,52.5,48.5,33.8,58.5C15.1,68.6,-6.8,71.3,-27.7,65.2C-48.6,59.1,-68.5,44.2,-75.4,24.6C-82.3,5,-76.2,-19.3,-63,-37.3C-49.9,-55.3,-29.6,-67,-7.2,-68.1C15.2,-69.2,46.7,-59.6,60.5,-51.2Z',
    'M54.7,-46.5C68.5,-32.9,75.6,-11.1,72.5,9.8C69.4,30.7,56.1,50.7,38.3,60.5C20.5,70.3,-1.8,69.9,-22.7,62.6C-43.7,55.4,-63.4,41.3,-71.5,21.7C-79.6,2.1,-76.1,-23,-63.2,-38.9C-50.4,-54.8,-28.2,-61.5,-6.3,-60.6C15.7,-59.7,40.8,-51.2,54.7,-46.5Z',
    'M48.1,-40.3C61.8,-26.8,72.2,-8.4,70.7,10.1C69.2,28.6,55.8,47.2,38.6,57.5C21.4,67.8,0.4,69.9,-19.5,64.1C-39.4,58.3,-58.2,44.7,-67.2,26.1C-76.2,7.6,-75.4,-15.9,-64.6,-31.5C-53.8,-47.1,-33,-54.8,-13.2,-55.4C6.6,-56.1,34.3,-49.6,48.1,-40.3Z',
  ];

  const [currentPath, setCurrentPath] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPath(prev => (prev + 1) % paths.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className={`absolute ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <motion.path
          d={paths[currentPath]}
          fill={color}
          animate={{ d: paths[currentPath] }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          transform="translate(100 100)"
        />
      </svg>
    </motion.div>
  );
}

// Glow effect on hover
export function GlowCard({ children, className = '', glowColor = 'hsl(43, 74%, 49%)' }) {
  const cardRef = useRef(null);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor.replace(')', ', 0.15)')}, transparent 50%)`
      }}
    >
      {children}
    </motion.div>
  );
}

// Ripple effect
export function RippleButton({ children, className = '', onClick }) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
    };
    
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
    
    onClick?.(e);
  };

  return (
    <button className={`relative overflow-hidden ${className}`} onClick={handleClick}>
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
      {children}
    </button>
  );
}

// Reveal on scroll with blur
export function BlurReveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.2, 0.8, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

// Animated border gradient
export function GradientBorder({ children, className = '' }) {
  return (
    <div className={`relative p-[1px] rounded-2xl overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'conic-gradient(from 0deg, hsl(43, 74%, 49%), hsl(43, 74%, 30%), hsl(43, 74%, 49%))',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative bg-[hsl(0_0%_5%)] rounded-2xl">
        {children}
      </div>
    </div>
  );
}

// Text shimmer effect
export function ShimmerText({ children, className = '' }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(43_74%_49%/0.3)] to-transparent"
        style={{ backgroundSize: '200% 100%' }}
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
    </span>
  );
}
