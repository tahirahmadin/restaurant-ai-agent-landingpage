import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { useStore } from '../store/useStore';

interface SimulationControlsProps {
  isMobile?: boolean;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({ isMobile }) => {
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
        isMobile ? 'px-3 py-1.5' : 'px-4 py-2'
      } rounded-full shadow-xl transition-all transform hover:scale-105 flex items-center gap-2 ${
        isPlaying 
          ? 'bg-red-500 hover:bg-red-600 text-white' 
          : 'bg-green-500 hover:bg-green-600 text-white'
      }`}
    >
      {isPlaying ? (
        <>
          <Pause className="w-4 h-4" strokeWidth={2.5} />
          <span className="text-xs font-medium">Stop</span>
        </>
      ) : (
        <>
          <Play className="w-4 h-4" strokeWidth={2.5} />
          <span className="text-xs font-medium">Play</span>
        </>
      )}
    </button>
  );
};