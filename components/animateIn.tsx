'use client';

import { useEffect, useRef, useState } from 'react';

type Animation = 'fade-up' | 'fade-left' | 'fade-right' | 'fade-in';

export default function AnimateIn({
  children,
  className,
  delay = 0,
  animation = 'fade-up',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: Animation;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenClass = {
    'fade-up': 'opacity-0 translate-y-8',
    'fade-left': 'opacity-0 -translate-x-8',
    'fade-right': 'opacity-0 translate-x-8',
    'fade-in': 'opacity-0',
  }[animation];

  return (
    <div
      ref={ref}
      className={`${className ?? ''} transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0 translate-x-0' : hiddenClass}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
