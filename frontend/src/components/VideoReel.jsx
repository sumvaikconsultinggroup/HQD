import { useEffect, useRef, useState, memo } from 'react';
import { cn } from '@/lib/utils';

/**
 * Optimized VideoReel Component
 * Features:
 * - Intersection Observer for lazy loading
 * - Pauses when off-screen to save resources
 * - Loading spinner
 * - Poster image support
 * - Reduced motion support
 */
export const VideoReel = memo(function VideoReel({ 
  src, 
  poster,
  className,
  aspectRatio = '9/16',
  testid,
  priority = false,
  ...props 
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [shouldPlay, setShouldPlay] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Lazy load video when in view
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Play/pause based on visibility
  useEffect(() => {
    if (!videoRef.current || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldPlay(entry.isIntersecting && entry.intersectionRatio > 0.3);
      },
      { threshold: [0, 0.3, 0.6, 1] }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // Control playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlay && !prefersReducedMotion) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [shouldPlay, prefersReducedMotion]);

  return (
    <div 
      ref={containerRef}
      className={cn('video-reel relative bg-[hsl(0_0%_8%)] overflow-hidden', className)}
      style={{ aspectRatio }}
      data-testid={testid}
    >
      {/* Loading spinner */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-[hsl(43_74%_49%)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Video element - only render when in view */}
      {isInView && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          loop
          preload="metadata"
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoadedData={() => setIsLoaded(true)}
          {...props}
        />
      )}

      {/* Fallback for reduced motion */}
      {prefersReducedMotion && poster && (
        <img 
          src={poster} 
          alt="" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      )}
    </div>
  );
});

export default VideoReel;
