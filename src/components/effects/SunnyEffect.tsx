import React, { useEffect, useRef } from 'react';

export const SunnyEffect: React.FC = () => {
  const sunRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sun = sunRef.current;
    if (!sun) return;

    // Create lens flare effect
    const flare = document.createElement('div');
    flare.className = 'absolute w-full h-full rounded-full bg-yellow-500/20 animate-pulse';
    sun.appendChild(flare);

    return () => {
      sun.removeChild(flare);
    };
  }, []);

  return (
    <>
      {/* Sun */}
      <div className="absolute top-8 right-8 z-20 pointer-events-none">
        {/* Sun rays */}
        <div className="absolute -inset-4 animate-spin-slow">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-16 bg-gradient-to-t from-transparent to-white/20"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${i * 30}deg)`,
                transformOrigin: '0 0'
              }}
            />
          ))}
        </div>
        
        {/* Sun core */}
        <div
          ref={sunRef}
          className="relative w-12 h-12 bg-gradient-to-r from-yellow-300/90 to-orange-300/90 rounded-full"
          style={{
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
          }}
        />
      </div>
    </>
  );
};