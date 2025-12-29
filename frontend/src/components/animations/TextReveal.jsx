import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Character by character reveal
export function TextRevealChar({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const text = typeof children === 'string' ? children : '';
  const chars = text.split('');
  
  return (
    <span ref={ref} className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0, 
            filter: 'blur(0px)',
          } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.2, 0.8, 0.2, 1]
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// Word by word reveal
export function TextRevealWord({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');
  
  return (
    <span ref={ref} className={`${className} inline-flex flex-wrap`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="mr-[0.25em] overflow-hidden inline-block"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + i * 0.1 }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.1,
              ease: [0.2, 0.8, 0.2, 1]
            }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
}

// Line reveal with mask
export function TextRevealLine({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.2, 0.8, 0.2, 1]
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Fade up reveal
export function FadeUp({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
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

// Staggered children
export function StaggerContainer({ children, className = '', staggerDelay = 0.1 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }
  }
};
