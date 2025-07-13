import React, { useState, useEffect, useRef } from 'react';

interface FloatingNamesProps {
  guests: string[];
}

interface NameState {
  id: string;
  text: string;
  top: string;
  left: string;
  transform: string;
  fontSize: string;
  opacity: number;
}

// Moved outside the component to avoid re-declaration on every render
const createNameState = (text: string): NameState => {
  const scale = Math.random() * 0.4 + 0.9; // Escala entre 0.9 y 1.3
  const rotation = Math.random() * 50 - 25; // Rotación entre -25 y 25 grados
  
  return {
    id: `${text}-${Math.random()}`,
    text,
    top: `${Math.random() * 95}%`, // Posición vertical aleatoria
    left: `${Math.random() * 95}%`, // Posición horizontal aleatoria
    transform: `rotate(${rotation}deg) scale(${scale})`,
    fontSize: `${Math.random() * 1.2 + 1.2}rem`, // Tamaño de fuente entre 1.2rem y 2.4rem
    opacity: Math.random() * 0.3 + 0.1, // Opacidad entre 0.2 y 0.5
  };
};

const FloatingNames: React.FC<FloatingNamesProps> = ({ guests }) => {
  const [names, setNames] = useState<NameState[]>([]);
  const [visible, setVisible] = useState(false);
  
  const animationTimeoutRef = useRef<number | null>(null);
  const animationIntervalRef = useRef<number | null>(null);

  // Function to set (or reset) the names' positions
  const updateNames = () => {
    setNames(guests.map(createNameState));
  };
  
  useEffect(() => {
    if (guests.length === 0) {
      setVisible(false);
      return;
    }

    const runAnimationCycle = () => {
      setVisible(false); // Start fade-out

      // After fade-out duration, update names and fade back in
      animationTimeoutRef.current = window.setTimeout(() => {
        updateNames();
        setVisible(true);
      }, 1000); // Duration of fade-out transition, must match CSS
    };
    
    // Initial setup: update names and fade them in
    updateNames();
    setVisible(true);

    // Set up the interval for subsequent cycles
    animationIntervalRef.current = window.setInterval(runAnimationCycle, 10000); // Cycle every 10 seconds

    // Reposition on resize for a responsive effect
    window.addEventListener('resize', updateNames);
    
    // Cleanup on unmount or when guests change
    return () => {
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
      window.removeEventListener('resize', updateNames);
    };
  }, [guests]);

  if (!guests.length) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {names.map(name => (
        <span
          key={name.id}
          className="absolute font-bold whitespace-nowrap"
          style={{
            top: name.top,
            left: name.left,
            transform: name.transform,
            fontSize: name.fontSize,
            color: 'var(--color-beige)',
            opacity: visible ? name.opacity : 0, // Control opacity for fade effect
            // Slower transitions for a more graceful effect
            transition: 'opacity 1s ease-in-out, top 1.5s ease-out, left 1.5s ease-out',
          }}
        >
          {name.text}
        </span>
      ))}
    </div>
  );
};

export default FloatingNames;
