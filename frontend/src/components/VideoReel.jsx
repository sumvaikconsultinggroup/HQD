import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function VideoReel({ 
  src, 
  className,
  aspectRatio = '9/16',
  testid,
  ...props 
}) {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className={cn('video-reel relative bg-[hsl(0_0%_8%)]', className)}
      style={{ aspectRatio }}
      data-testid={testid}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[hsl(43_74%_49%)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
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
    </div>
  );
}
