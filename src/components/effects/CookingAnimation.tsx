import React from "react";
import { Pizza } from "lucide-react";

export const CookingAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Steam particles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 bottom-0 w-0.5 h-0.5 rounded-full bg-white/80 animate-steam"
            style={
              {
                left: `${30 + Math.random() * 40}%`,
                animationDelay: `${i * 0.3}s`,
                "--steam-distance": `${-5 - Math.random() * 5}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Rotating pizza */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-orange-500/20 rounded-full filter blur-md animate-pulse" />

          {/* Rotating pizza */}
          <div className="relative animate-spin-cooking">
            <Pizza className="w-6 h-6 text-orange-500" />
          </div>

          {/* Heat waves */}
          <div className="absolute inset-0 rounded-full border-2 border-orange-500/30 animate-ping" />
        </div>
      </div>
    </div>
  );
};
