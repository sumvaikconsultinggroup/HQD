import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function VideoReel({ 
  src, 
  className,
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
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className={cn('video-reel', className)}
      style={{ aspectRatio }}
    >
      <video
        ref={videoRef}
        src={src}
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
