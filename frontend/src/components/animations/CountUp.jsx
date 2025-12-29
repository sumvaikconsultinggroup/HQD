import { useCountUp } from '@/hooks/useAnimations';

export function CountUp({ 
  target, 
  suffix = '', 
  prefix = '',
  duration = 2000,
  className = '' 
}) {
  const { ref, count } = useCountUp(target, duration);
  
  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
