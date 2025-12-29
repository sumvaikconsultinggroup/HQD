import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, memo } from 'react';

export const CustomCursor = memo(function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Check for touch device and reduced motion
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setShouldRender(!isTouchDevice && !prefersReducedMotion);
  }, []);

  useEffect(() => {
    if (!shouldRender) return;
    
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('a, button, [data-cursor="pointer"]')) {
        setIsHovering(true);
        const text = target.closest('[data-cursor-text]')?.dataset.cursorText;
        if (text) setCursorText(text);
      }
    };
    
    const handleMouseOut = (e) => {
      const target = e.target;
      if (target.closest('a, button, [data-cursor="pointer"]')) {
        setIsHovering(false);
        setCursorText('');
      }
    };
    
    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [shouldRender, cursorX, cursorY, isVisible]);
  
  // Don't render on touch devices or if reduced motion is preferred
  if (!shouldRender || !isVisible) return null;
  
  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference will-change-transform"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border border-white will-change-transform"
          animate={{
            width: isHovering ? 32 : 16,
            height: isHovering ? 32 : 16,
            scale: isClicking ? 0.8 : 1
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 400 }}
        >
          {cursorText && (
            <span className="text-white text-[8px] font-medium uppercase tracking-wider">
              {cursorText}
            </span>
          )}
        </motion.div>
      </motion.div>
      
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[10001] mix-blend-difference will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isClicking ? 2 : 1,
          opacity: isHovering ? 0 : 1
        }}
      />
    </>
  );
});
