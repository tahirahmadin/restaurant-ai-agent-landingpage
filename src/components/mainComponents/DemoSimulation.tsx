import React from "react";
import { Map } from "../Map";
import { AgentsPanel } from "../AgentsPanel";
import { WeatherControls } from "../WeatherControls";
import { WalletButton } from "../WalletButton";
import { InventoryButton } from "../inventory/InventoryButton";
import { SimulationControls } from "../SimulationControls";
import { GauravChat } from "../chat/GauravChat";
import { useStore } from "../../store/useStore";
import { Play } from "lucide-react";

export const DemoSimulation: React.FC = () => {
  const showGauravChat = useStore((state) => state.showGauravChat);
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  // Check if screen is mobile
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      const isMobileOrTablet = window.innerWidth < 1024;
      setIsMobile(isMobileOrTablet);
      if (!isMobileOrTablet) {
        setIsVideoPlaying(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-full bg-transparent p-4">
      {isMobile ? (
        // Mobile/Tablet View with Video
        <div className="h-[200px] rounded-xl overflow-hidden relative bg-gray-900">
          {isVideoPlaying ? (
            <video
              src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/Restaurant_Demo.mp4"
              className="w-full h-full object-contain"
              autoPlay
              controls
              playsInline
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-xl"
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        // Desktop View with Interactive Simulation
        <div className="flex gap-4 h-full">
          {/* Left Side - Map */}
          <div className="w-1/2 h-full bg-gray-800 rounded-lg overflow-hidden">
            <Map />
          </div>

          {/* Right Side - Agents */}
          <div className="w-1/2 h-full flex flex-col gap-4">
            {/* Controls */}
            <div className="flex items-center justify-end gap-4 bg-gray-800/50 p-3 rounded-lg">
              <InventoryButton />
              <WeatherControls />
              <SimulationControls isMobile={false} />
            </div>

            {/* Agents */}
            <AgentsPanel />
          </div>
        </div>
      )}
      {/* {showGauravChat && <GauravChat />} */}
    </div>
  );
};
