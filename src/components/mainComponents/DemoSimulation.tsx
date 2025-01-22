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

const MobileLayout: React.FC = () => {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  const showGauravChat = useStore((state) => state.showGauravChat);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Controls */}
      <div className="flex items-center justify-between gap-2 px-2">
        <WeatherControls />
        <SimulationControls isMobile={true} />
      </div>

      {/* Map */}
      <div className="h-[300px] bg-gray-800 rounded-lg overflow-hidden">
        <Map />
      </div>

      {/* Agents */}
      <div className="flex-1 overflow-y-auto">
        <AgentsPanel />
      </div>

      {showGauravChat && <GauravChat />}
    </div>
  );
};

export const DemoSimulation: React.FC = () => {
  const showGauravChat = useStore((state) => state.showGauravChat);
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  // Check if screen is mobile or tablet
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1024);

  React.useEffect(() => {
    const handleResize = () => {
      const isMobileOrTablet = window.innerWidth < 1024;
      setIsMobile(isMobileOrTablet);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-full bg-transparent p-4">
      {isMobile ? (
        <MobileLayout />
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
      {showGauravChat && <GauravChat />}
    </div>
  );
};
