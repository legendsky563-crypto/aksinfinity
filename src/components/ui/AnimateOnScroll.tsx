'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4 | 5 | 6;
  id?: string;
}

export default function AnimateOnScroll({ children, className = '', delay, id }: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const delayClass = delay ? `delay-${delay}` : '';

  return (
    <div ref={ref} id={id} className={`animate-on-scroll ${delayClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
