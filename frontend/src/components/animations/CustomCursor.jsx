import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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
    
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);
  
  // Hide on mobile/touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  
  if (isTouchDevice) return null;
  
  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border border-white"
          animate={{
            width: isHovering ? 80 : 40,
            height: isHovering ? 80 : 40,
            scale: isClicking ? 0.8 : 1
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 400 }}
        >
          {cursorText && (
            <span className="text-white text-[10px] font-medium uppercase tracking-wider">
              {cursorText}
            </span>
          )}
        </motion.div>
      </motion.div>
      
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[10001] mix-blend-difference"
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
}
