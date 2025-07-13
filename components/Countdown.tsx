import React, { useState, useEffect, useCallback } from 'react';

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = useCallback((): TimeLeft | null => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());

  useEffect(() => {
    // If the target date has passed, no need to set an interval.
    if (!timeLeft) {
        return;
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup the interval on component unmount or if time runs out.
    return () => clearInterval(timer);
  }, [calculateTimeLeft, timeLeft]);

  if (!timeLeft) {
    return (
        <div className="text-center my-8 p-6 bg-green-500 rounded-xl shadow-lg">
            <div className="text-4xl font-bold text-white animate-pulse">¡LLEGÓ EL DÍA! ¡A FESTEJAR!</div>
        </div>
    );
  }

  const timeParts = [
    { label: 'Días', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="my-16 section-card">
        <h2 className="text-3xl font-bold text-[var(--color-pink)] mb-6">¡Falta poco!</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {timeParts.map((part) => (
            <div key={part.label} className="bg-[var(--color-dark)]/50 p-4 rounded-lg flex flex-col items-center justify-center transition-all duration-300 border border-transparent hover:border-[var(--color-pink)]">
                <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">{String(part.value).padStart(2, '0')}</span>
                <span className="text-sm font-bold text-[var(--color-pink)] uppercase">{part.label}</span>
            </div>
            ))}
      </div>
    </section>
  );
};

export default Countdown;