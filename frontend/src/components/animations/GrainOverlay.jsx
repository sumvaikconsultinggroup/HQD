import { memo } from 'react';

/**
 * GrainOverlay - Ultra-lightweight CSS-based grain effect
 * Uses a tiny base64 noise image for minimal performance impact
 */
export const GrainOverlay = memo(function GrainOverlay({ opacity = 0.03 }) {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        opacity,
        backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABnRSTlMAESIzRFVm6AMgAAAARklEQVQ4y2MQhAKGUcAwMTBEBUYB0wLlUcA0wHRUYBRgqGAqYBgFTAcMRwVGAdMB01HBUcC0wHhUcBQwHTAdFRwFDAcAxQ0mC3ISg/MAAAAASUVORK5CYII=")',
        mixBlendMode: 'overlay'
      }}
      aria-hidden="true"
    />
  );
});

/**
 * NoiseTexture - For local sections (not full-page)
 * Uses CSS gradient noise instead of SVG filter for zero layout cost
 */
export const NoiseTexture = memo(function NoiseTexture({ className = '' }) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        opacity: 0.04,
        backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABnRSTlMAESIzRFVm6AMgAAAARklEQVQ4y2MQhAKGUcAwMTBEBUYB0wLlUcA0wHRUYBRgqGAqYBgFTAcMRwVGAdMB01HBUYBRwHTAdFRwFDAcAxQ0mC3ISg/MAAAAASUVORK5CYII=")',
        mixBlendMode: 'overlay'
      }}
      aria-hidden="true"
    />
  );
});
