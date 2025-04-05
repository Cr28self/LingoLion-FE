import { useEffect, useRef } from 'react';

type AnimatedGradientTextProps = {
  text: string;
  className?: string;
};

export function AnimatedGradientText({
  text,
  className = '',
}: AnimatedGradientTextProps) {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      element.style.setProperty('--x', `${x}%`);
      element.style.setProperty('--y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <h1
      ref={textRef}
      className={`animate-gradient-x bg-gradient-to-br from-primary via-primary/70 to-primary/50 bg-clip-text font-bold text-transparent ${className}`}
      style={{
        backgroundPosition: 'var(--x, 0%) var(--y, 0%)',
        backgroundSize: '200% 200%',
      }}
    >
      {text}
    </h1>
  );
}
