import React, { useEffect, useRef } from "react";

export const SunnyEffect: React.FC = () => {
  const sunRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sun = sunRef.current;
    if (!sun) return;

    // Create lens flare effect
    const flare = document.createElement("div");
    flare.className =
      "absolute w-full h-full rounded-full bg-yellow-500/20 animate-pulse";
    sun.appendChild(flare);

    return () => {
      sun.removeChild(flare);
    };
  }, []);

  return (
    <>
      {/* Sun */}
      <div className="absolute top-4 md:top-8 right-4 md:right-8 z-20 pointer-events-none animate-float-1">
        {/* Sun rays */}
        <div className="absolute -inset-2 md:-inset-4 animate-spin-slow">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-8 md:h-16 bg-gradient-to-t from-transparent to-yellow-200/30"
              style={{
                left: "50%",
                top: "50%",
                transform: `rotate(${i * 30}deg)`,
                transformOrigin: "0 0",
              }}
            />
          ))}
        </div>

        {/* Sun core */}
        <div
          ref={sunRef}
          className="relative w-6 h-6 md:w-12 md:h-12 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-pulse"
          style={{
            boxShadow:
              "0 0 30px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.5)",
          }}
        >
          {/* Sun glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-200/30 to-orange-200/30 blur-sm animate-pulse" />
        </div>
      </div>

      {/* Light rays across the map */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-white/10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.1),transparent_70%)]" />
      </div>
    </>
  );
};
