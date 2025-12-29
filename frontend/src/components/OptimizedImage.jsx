import { useState, useRef, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * OptimizedImage - Lazy loaded image with blur placeholder
 * Features:
 * - Intersection Observer for lazy loading
 * - Blur-up placeholder effect
 * - Skeleton loading state
 * - Proper width/height to prevent CLS
 * - srcSet for responsive images
 */
export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt = '',
  className = '',
  width,
  height,
  priority = false,
  placeholder = 'blur',
  sizes = '100vw',
  quality = 80,
  onLoad,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);

  // Generate srcSet for responsive images (Unsplash/external images)
  const generateSrcSet = (url) => {
    if (!url || !url.includes('unsplash.com')) return url;
    const baseUrl = url.split('?')[0];
    return `
      ${baseUrl}?w=400&q=${quality} 400w,
      ${baseUrl}?w=800&q=${quality} 800w,
      ${baseUrl}?w=1200&q=${quality} 1200w,
      ${baseUrl}?w=1600&q=${quality} 1600w
    `;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before visible
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div 
      ref={imgRef}
      className={cn('relative overflow-hidden bg-[hsl(0_0%_8%)]', className)}
      style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
    >
      {/* Skeleton placeholder */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 skeleton"
          aria-hidden="true"
        />
      )}
      
      {/* Actual image */}
      {isInView && (
        <motion.img
          src={src}
          srcSet={generateSrcSet(src)}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          initial={false}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          {...props}
        />
      )}
    </div>
  );
});

/**
 * BackgroundImage - Optimized background image with lazy loading
 */
export const BackgroundImage = memo(function BackgroundImage({
  src,
  alt = '',
  className = '',
  children,
  overlay = true,
  priority = false,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const containerRef = useRef(null);

  useEffect(() => {
    if (priority) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    if (!isInView || !src) return;
    
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [isInView, src]);

  return (
    <div ref={containerRef} className={cn('relative overflow-hidden', className)} {...props}>
      {/* Background skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[hsl(0_0%_5%)]" />
      )}
      
      {/* Background image */}
      {isInView && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${src})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          role="img"
          aria-label={alt}
        />
      )}
      
      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_2%)] via-[hsl(0_0%_2%/0.5)] to-transparent" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
});

export default OptimizedImage;
