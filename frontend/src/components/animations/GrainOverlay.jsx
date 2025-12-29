import { memo } from 'react';

/**
 * GrainOverlay - Lightweight CSS-based grain effect
 * Uses CSS noise filter instead of heavy SVG for better performance
 */
export const GrainOverlay = memo(function GrainOverlay({ opacity = 0.03 }) {
  // Check for reduced motion preference
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        mixBlendMode: 'overlay',
        willChange: 'auto' // Don't use will-change for static elements
      }}
      aria-hidden="true"
    />
  );
});

/**
 * NoiseTexture - For local sections (not full-page)
 */
export const NoiseTexture = memo(function NoiseTexture({ className = '' }) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        mixBlendMode: 'overlay'
      }}
      aria-hidden="true"
    />
  );
});
