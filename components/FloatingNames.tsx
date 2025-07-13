import React, { useState, useEffect, useRef } from 'react';

interface FloatingNamesProps {
  guests: string[];
}

interface NameStyle {
  top: string;
  left: string;
  transform: string;
  fontSize: string;
  opacity: number;
}

const createNameStyle = (): NameStyle => {
  const scale = Math.random() * 0.4 + 0.9;
  const rotation = Math.random() * 50 - 25;
  return {
    top: `${Math.random() * 95}%`,
    left: `${Math.random() * 95}%`,
    transform: `rotate(${rotation}deg) scale(${scale})`,
    fontSize: `${Math.random() * 1.2 + 1.2}rem`,
    opacity: Math.random() * 0.3 + 0.1,
  };
};

const FloatingNames: React.FC<FloatingNamesProps> = ({ guests }) => {
  const [positions, setPositions] = useState<Map<string, NameStyle>>(new Map());
  const [visible, setVisible] = useState(false);

  const animationTimeoutRef = useRef<number | null>(null);
  const animationIntervalRef = useRef<number | null>(null);

  const updatePositions = () => {
    const newMap = new Map<string, NameStyle>();
    guests.forEach((name) => {
      newMap.set(name, createNameStyle());
    });
    setPositions(newMap);
  };

  useEffect(() => {
    if (guests.length === 0) {
      setVisible(false);
      return;
    }

    const runAnimationCycle = () => {
      setVisible(false); // fade-out
      animationTimeoutRef.current = window.setTimeout(() => {
        updatePositions();
        setVisible(true); // fade-in
      }, 1000);
    };

    // Inicial
    updatePositions();
    animationTimeoutRef.current = window.setTimeout(() => {
      setVisible(true);
    }, 100);

    animationIntervalRef.current = window.setInterval(runAnimationCycle, 10000);

    window.addEventListener('resize', updatePositions);

    return () => {
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
      window.removeEventListener('resize', updatePositions);
    };
  }, [guests]);

  if (!guests.length) return null;

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {guests.map((name) => {
        const style = positions.get(name);
        if (!style) return null;

        return (
          <span
            key={name}
            className="absolute font-bold whitespace-nowrap"
            style={{
              top: style.top,
              left: style.left,
              transform: style.transform,
              fontSize: style.fontSize,
              color: 'var(--color-beige)',
              opacity: visible ? style.opacity : 0,
              transition: 'opacity 1s ease-in-out',
            }}
          >
            {name}
          </span>
        );
      })}
    </div>
  );
};

export default FloatingNames;
