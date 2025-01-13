import React from "react";
import { useStore } from "../../store/useStore";

interface DeliveryBikeProps {
  progress: number;
  paths: Array<{ start: number[]; end: number[] }>;
  isReturning?: boolean;
  orderId?: string;
}

// Default paths as fallback
const DEFAULT_PATHS = [
  { start: [50, 50], end: [50, 75] },
  { start: [50, 75], end: [50, 100] },
];

export const DeliveryBike: React.FC<DeliveryBikeProps> = ({
  progress,
  paths = DEFAULT_PATHS,
  isReturning = false,
  orderId,
}) => {
  const { weather } = useStore();
  const [x, y] = calculatePosition(
    progress,
    paths || DEFAULT_PATHS,
    isReturning
  );
  const rotation = calculateRotation(paths || DEFAULT_PATHS, isReturning);

  return (
    <div
      className="absolute transition-all duration-100"
      {...(orderId && { "data-order-id": orderId })}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        transition: "transform 0.3s ease-out",
      }}
    >
      <div className="relative">
        <img
          src="https://gobbl-bucket.s3.ap-south-1.amazonaws.com/tapAssets/gobblai/bike.png"
          alt="Delivery Bike"
          className="w-12 h-12 object-contain"
        />
      </div>
    </div>
  );
};

function calculatePosition(
  progress: number,
  paths: Array<{ start: number[]; end: number[] }>,
  isReturning: boolean
): [number, number] {
  if (!paths || paths.length === 0) {
    return [50, 50]; // Return center position as fallback
  }

  const activePaths = isReturning
    ? paths
        .slice()
        .reverse()
        .map((path) => ({
          start: path.end,
          end: path.start,
        }))
    : paths;

  const totalSegments = activePaths.length;
  const progressPerSegment = 100 / totalSegments;
  const currentSegmentIndex = Math.min(
    Math.floor(progress / progressPerSegment),
    totalSegments - 1
  );

  const segmentProgress =
    ((progress % progressPerSegment) / progressPerSegment) * 100;
  const currentPath = activePaths[currentSegmentIndex];

  const [startX, startY] = currentPath.start;
  const [endX, endY] = currentPath.end;

  const x = startX + (endX - startX) * (segmentProgress / 100);
  const y = startY + (endY - startY) * (segmentProgress / 100);

  return [x, y];
}

function calculateRotation(
  paths: Array<{ start: number[]; end: number[] }>,
  isReturning: boolean
): number {
  if (!paths || paths.length === 0) {
    return 0; // Return default rotation as fallback
  }

  // Get the first path segment
  const path = isReturning ? paths[paths.length - 1] : paths[0];
  const [startX, startY] = isReturning ? path.end : path.start;
  const [endX, endY] = isReturning ? path.start : path.end;

  // Calculate angle based on direction
  if (startX === endX) {
    // Vertical movement
    return endY > startY ? 270 : 90; // Down: 270deg, Up: 90deg
  } else {
    // Horizontal movement
    return endX > startX ? 180 : 0; // Right: 180deg, Left: 0deg
  }
}

export const DELIVERY_PATHS = {
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
  "David House": [
    { start: [50, 50], end: [75, 50] },
    { start: [75, 50], end: [100, 50] },
  ],
};
