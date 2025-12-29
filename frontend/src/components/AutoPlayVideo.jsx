import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function AutoPlayVideo({ 
  src, 
  poster, 
  className, 
  testid,
  aspectRatio = '9/16',
  ...props 
}) {
  const videoRef = useRef(null);

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
      { threshold: 0.35 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className={cn(
        'overflow-hidden rounded-lg bg-black/40',
        className
      )}
      style={{ aspectRatio }}
    >
      <video
        ref={videoRef}
        data-testid={testid}
        src={src}
        poster={poster}
        muted
        playsInline
        loop
        preload="metadata"
        className="w-full h-full object-cover"
        {...props}
      />
    </div>
  );
}
