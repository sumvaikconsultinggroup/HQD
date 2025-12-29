import { motion } from 'framer-motion';
import { useMagnetic } from '@/hooks/useAnimations';

export function MagneticButton({ 
  children, 
  className = '', 
  strength = 0.3,
  onClick,
  ...props 
}) {
  const { ref, x, y } = useMagnetic(strength);
  
  return (
    <motion.button
      ref={ref}
      className={className}
      style={{ x, y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      {...props}
    >
      <motion.span
        className="block"
        style={{ x: x, y: y }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}

export function MagneticLink({ 
  children, 
  href, 
  className = '', 
  strength = 0.3,
  ...props 
}) {
  const { ref, x, y } = useMagnetic(strength);
  
  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x, y }}
      whileHover={{ scale: 1.02 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
