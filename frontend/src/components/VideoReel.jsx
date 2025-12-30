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
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);

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
    if (!videoRef.current || prefersReducedMotion || hasError) return;

    const video = videoRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.3, 0.6, 1] }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [prefersReducedMotion, hasError, isLoaded]);

  const handleLoadedData = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const handleCanPlay = () => {
    const video = videoRef.current;
    if (video && !prefersReducedMotion) {
      video.play().catch(() => {});
    }
  };

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

      {/* Error state - show placeholder */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[hsl(0_0%_12%)] to-[hsl(0_0%_8%)]">
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[hsl(43_74%_49%/0.1)] flex items-center justify-center">
              <svg className="w-8 h-8 text-[hsl(43_74%_49%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs text-[hsl(40_20%_65%)]">Video Reel</span>
          </div>
        </div>
      )}

      {/* Video element - only render when in view */}
      {isInView && !hasError && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          loop
          autoPlay
          preload="auto"
          crossOrigin="anonymous"
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoadedData={handleLoadedData}
          onCanPlay={handleCanPlay}
          onError={handleError}
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
