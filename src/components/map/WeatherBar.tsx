import React from 'react';
import { Cloud, CloudRain, CloudLightning, Sun } from 'lucide-react';
import { useStore } from '../../store/useStore';

const getWeatherIcon = (weather: string) => {
  switch (weather) {
    case 'sunny':
      return <Sun className="w-4 h-4 text-yellow-400" />;
    case 'rainy':
      return <CloudRain className="w-4 h-4 text-blue-400" />;
    case 'stormy':
      return <CloudLightning className="w-4 h-4 text-purple-400" />;
    default:
      return <Cloud className="w-4 h-4 text-gray-400" />;
  }
};

const getDelayText = (weather: string) => {
  switch (weather) {
    case 'sunny':
      return 'Normal speed';
    case 'rainy':
      return '+50% delay';
    case 'stormy':
      return '+100% delay';
    default:
      return 'Normal speed';
  }
};

export const WeatherBar: React.FC = () => {
  const { weather, setWeather } = useStore();

  return (
    <div className="absolute top-2 left-2 flex flex-col items-center bg-gray-800/80 backdrop-blur-sm rounded-lg p-2 border border-gray-700/50">
      <div className="flex items-center gap-1.5 mb-1">
        {getWeatherIcon(weather)}
        <span className="text-white text-[10px] font-medium">
          {weather.charAt(0).toUpperCase() + weather.slice(1)}
        </span>
      </div>
      <div className={`px-2 py-0.5 rounded-full text-[9px] ${
        weather === 'sunny' ? 'bg-yellow-500/20 text-yellow-300' :
        weather === 'rainy' ? 'bg-blue-500/20 text-blue-300' :
        'bg-purple-500/20 text-purple-300'
      }`}>
        <span>
          {getDelayText(weather)}
        </span>
      </div>
    </div>
  );
};