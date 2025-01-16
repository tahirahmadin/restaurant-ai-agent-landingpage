import React from "react";
import { WeatherBar } from "./WeatherBar";
import { DeliveryBike } from "./DeliveryBike";
import { Home, Store, MessageSquare, Microwave } from "lucide-react";
import { RainEffect } from "../effects/RainEffect";
import { SunnyEffect } from "../effects/SunnyEffect";
import { StormyEffect } from "../effects/StormyEffect";
import { CookingAnimation } from "../effects/CookingAnimation";
import { CoinAnimation } from "../effects/CoinAnimation";
import { useStore } from "../../store/useStore";
import { SimulationControls } from "../SimulationControls";
import { calculateTimeLeft } from "../../utils/delivery";

interface HouseComponentProps {
  className?: string;
  imageSrc: string;
  houseName: string;
}

const HouseComponent: React.FC<HouseComponentProps> = ({
  className = "",
  imageSrc,
  houseName,
}) => {
  const { orders, weather, showCoinAnimation, completeCoinAnimation } =
    useStore();
  const houseOrder = orders.find((order) => order.destination === houseName);

  const getStatusText = () => {
    if (!houseOrder) return null;

    switch (houseOrder.status) {
      case "placed":
        return "Order Placed";
      case "preparing":
        return `Preparing (${houseOrder.cookingTimeLeft}m)`;
      case "out_for_delivery":
        const timeLeft = calculateTimeLeft(
          houseOrder.deliveryProgress || 0,
          DELIVERY_PATHS[houseName],
          weather
        );
        return `Delivering in ${timeLeft}s`;
      default:
        return null;
    }
  };

  const statusText = getStatusText();

  return (
    <div
      className={`relative w-20 h-20 flex flex-col items-center justify-center transform hover:scale-105 transition-transform ${className}`}
    >
      {statusText && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800/90 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap shadow-lg z-50">
          {statusText}
        </div>
      )}
      <img
        src={imageSrc}
        alt="House"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

const DELIVERY_PATHS = {
  "Charlie House": [
    { start: [50, 50], end: [50, 75] },
    { start: [50, 75], end: [50, 100] },
  ],
  "Bob House": [
    { start: [50, 50], end: [25, 50] },
    { start: [25, 50], end: [0, 50] },
  ],
  "Alice House": [
    { start: [50, 50], end: [50, 25] },
    { start: [50, 25], end: [50, 0] },
  ],
  "David House": [{ start: [50, 50], end: [100, 50] }],
};

export const GridMap: React.FC = () => {
  const { orders, weather, showCoinAnimation, completeCoinAnimation } =
    useStore();
  const activeDeliveries = orders.filter(
    (order) =>
      order.status === "out_for_delivery" ||
      (order.status === "delivered" && order.isReturning)
  );

  // Get the total sales component position
  const totalSalesRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      className={`relative h-full p-4 rounded-xl overflow-hidden ${
        weather === "sunny"
          ? "before:absolute before:inset-0 before:bg-gradient-to-b before:from-yellow-400/5 before:to-white/10 before:mix-blend-soft-light before:z-10"
          : ""
      }`}
      style={{
        backgroundImage:
          'url("https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobblai/map.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        ...(weather === "sunny"
          ? {
              filter: "brightness(1.1) contrast(1.05)",
            }
          : {}),
      }}
    >
      {/* Sunny weather overlay */}
      {weather === "sunny" && (
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 via-transparent to-white/5 mix-blend-overlay pointer-events-none z-10" />
      )}

      {/* Semi-transparent overlay */}
      <WeatherBar />
      {weather === "sunny" && <SunnyEffect />}
      {weather === "rainy" && <RainEffect />}
      {weather === "stormy" && <StormyEffect />}

      {/* Houses */}
      {/* Ashwin House */}
      <div className="absolute top-0 left-[50%] -translate-x-1/2 text-center z-20">
        <div className="group relative">
          <HouseComponent
            imageSrc="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobblai/home_ashwin.png"
            houseName="Alice House"
          />
          <p className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-medium text-[13px] text-gray-800 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-gray-200 opacity-90 group-hover:opacity-100 transition-all duration-200 hover:scale-105">
            Alice
          </p>
        </div>
      </div>

      {/* Salman House */}
      <div className="absolute left-0 top-[50%] -translate-y-1/2 text-center z-20">
        <div className="group relative">
          <HouseComponent
            imageSrc="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobblai/home_salman.png"
            houseName="Bob House"
          />
          <p className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-medium text-[13px] text-gray-800 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-gray-200 opacity-90 group-hover:opacity-100 transition-all duration-200 hover:scale-105">
            Bob
          </p>
        </div>
      </div>

      {/* Habib House */}
      <div className="absolute bottom-0 left-[50%] -translate-x-1/2 text-center z-20">
        <div className="group relative">
          <HouseComponent
            imageSrc="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobblai/home_habib.png"
            houseName="Charlie House"
          />
          <p className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-medium text-[13px] text-gray-800 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-gray-200 opacity-90 group-hover:opacity-100 transition-all duration-200 hover:scale-105">
            Charlie
          </p>
        </div>
      </div>

      {/* Gaurav House */}
      <div className="absolute right-0 top-[50%] -translate-y-1/2 text-center z-20">
        <button
          onClick={() => useStore.setState({ showGauravChat: true })}
          className="absolute -top-10 left-1/2 -translate-x-1/2 p-2 bg-purple-500 hover:bg-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 z-20"
        >
          <MessageSquare className="w-5 h-5 text-white" />
        </button>
        <div className="group relative">
          <HouseComponent
            imageSrc="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobblai/home_gaurav.png"
            houseName="David House"
          />
          <p className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-medium text-[13px] text-gray-800 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-gray-200 opacity-90 group-hover:opacity-100 transition-all duration-200 hover:scale-105">
            David
          </p>
        </div>
      </div>

      {/* Papa John's Restaurant */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <div className="group relative">
          <div className="w-32 h-32 flex items-center justify-center transform hover:scale-105 transition-transform">
            <div className="relative w-full h-full">
              {orders.some((order) => order.status === "preparing") && (
                <CookingAnimation />
              )}
              <img
                src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobblai/restaurant.png"
                alt="Agentic Crust"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>
          <p className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-medium text-[11px] text-gray-800 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-gray-200 opacity-90 group-hover:opacity-100 transition-all duration-200 hover:scale-105">
            Agentic Crust
          </p>
        </div>
      </div>

      {/* Roads */}
      {/* Horizontal Road */}
      <div className="absolute left-20 right-20 top-1/2 -translate-y-1/2 h-8 bg-[#1B1B1B] shadow-lg z-5">
        {/* Road texture */}
        <div
          className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1585732832634-77c8a8683f67?q=80&w=500&auto=format")',
            backgroundSize: "200px",
            backgroundRepeat: "repeat",
          }}
        />
        {/* Road edges */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-30" />
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="h-[3px] w-full"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(255, 255, 255, 0.8) 50%, transparent 50%)",
              backgroundSize: "24px 100%",
              boxShadow:
                weather === "sunny"
                  ? "0 0 5px rgba(255, 255, 255, 0.15)"
                  : "0 0 10px rgba(255, 255, 255, 0.3)",
            }}
          />
        </div>
      </div>

      {/* Vertical Road */}
      <div className="absolute top-20 bottom-20 left-1/2 -translate-x-1/2 w-8 bg-[#1B1B1B] shadow-lg z-5">
        {/* Road texture */}
        <div
          className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1585732832634-77c8a8683f67?q=80&w=500&auto=format")',
            backgroundSize: "200px",
            backgroundRepeat: "repeat",
          }}
        />
        {/* Road edges */}
        <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-gray-400 to-transparent opacity-30" />
        <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-gray-400 to-transparent opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-[3px] h-full"
            style={{
              backgroundImage:
                "linear-gradient(0deg, rgba(255, 255, 255, 0.8) 50%, transparent 50%)",
              backgroundSize: "100% 24px",
              boxShadow:
                weather === "sunny"
                  ? "0 0 5px rgba(255, 255, 255, 0.15)"
                  : "0 0 10px rgba(255, 255, 255, 0.3)",
            }}
          />
        </div>
      </div>

      {/* Intersection */}
      <div className="absolute left-1/2 top-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-[#1B1B1B] rounded-full shadow-xl z-6">
        {/* Intersection texture */}
        <div
          className="absolute inset-0 rounded-full opacity-10 mix-blend-overlay"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1585732832634-77c8a8683f67?q=80&w=500&auto=format")',
            backgroundSize: "200px",
            backgroundRepeat: "repeat",
          }}
        />
        <div
          className="absolute inset-3 rounded-full bg-gradient-to-br from-white/60 to-gray-200/60 shadow-inner"
          style={{
            opacity: weather === "sunny" ? 0.4 : 0.6,
          }}
        />
      </div>

      {/* Single Delivery Bike */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex -space-x-2 z-20">
        {activeDeliveries.length === 0 && (
          <DeliveryBike
            progress={0}
            paths={DELIVERY_PATHS["Habib House"]}
            orderId="default"
          />
        )}
      </div>

      {/* Active Deliveries */}
      {activeDeliveries.slice(0, 1).map((order) => (
        <DeliveryBike
          key={order.id}
          orderId={order.id}
          progress={order.deliveryProgress || 0}
          paths={
            DELIVERY_PATHS[order.destination] || DELIVERY_PATHS["Habib House"]
          }
          isReturning={order.isReturning}
        />
      ))}

      {/* Coin Animation */}
      {showCoinAnimation && (
        <CoinAnimation
          startPosition={showCoinAnimation.startPosition}
          endPosition={showCoinAnimation.endPosition}
          amount={showCoinAnimation.amount}
          onComplete={completeCoinAnimation}
        />
      )}
    </div>
  );
};
