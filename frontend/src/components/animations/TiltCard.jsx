import { motion } from 'framer-motion';
import { useTilt } from '@/hooks/useAnimations';

export function TiltCard({ 
  children, 
  className = '', 
  maxTilt = 10,
  glare = true,
  ...props 
}) {
  const { ref, tilt } = useTilt(maxTilt);
  
  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      {...props}
    >
      {children}
      {glare && (
        <motion.div
          className="absolute inset-0 rounded-inherit pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + tilt.y * 2}% ${50 - tilt.x * 2}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            borderRadius: 'inherit'
          }}
        />
      )}
    </motion.div>
  );
}
