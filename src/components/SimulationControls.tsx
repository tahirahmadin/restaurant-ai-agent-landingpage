import React, { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { useStore } from "../store/useStore";

interface SimulationControlsProps {
  isMobile?: boolean;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  isMobile,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { simulateOrder } = useStore();
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isPlaying) {
      // Initial order
      simulateOrder();

      // Set up interval for continuous orders
      intervalRef.current = setInterval(() => {
        simulateOrder();
      }, 15000); // New order every 15 seconds
    } else {
      // Clear interval when stopped
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, simulateOrder]);

  const toggleSimulation = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleSimulation}
      className={`${
        isMobile ? "px-3 py-1.5" : "px-6 py-3"
      } rounded-full shadow-xl transition-all transform hover:scale-105 hover:-translate-y-0.5 flex items-center gap-2 ${
        isPlaying
          ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white ring-2 ring-red-400/50"
          : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white ring-2 ring-green-400/50"
      }`}
    >
      {isPlaying ? (
        <>
          <Pause className="w-5 h-5" strokeWidth={2.5} />
          <span className="text-sm font-medium">Close Restaurant</span>
        </>
      ) : (
        <>
          <Play className="w-5 h-5" strokeWidth={2.5} />
          <span className="text-sm font-medium">Open Restaurant</span>
        </>
      )}
    </button>
  );
};
