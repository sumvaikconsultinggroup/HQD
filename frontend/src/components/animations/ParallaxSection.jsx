import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function ParallaxSection({ 
  children, 
  className = '', 
  speed = 0.5,
  ...props 
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} {...props}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

export function ParallaxImage({ 
  src, 
  alt = '', 
  className = '', 
  speed = 0.3,
  ...props 
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${30 * speed}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} {...props}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ y, scale }}
      />
    </div>
  );
}
