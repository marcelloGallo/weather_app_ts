/* eslint-disable react/prop-types */
import { Cloud, Droplets, Wind } from "lucide-react";

export interface weatherInterface {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  icon: string;
  description: string;
}

function WeatherCard({ weather }: { weather: weatherInterface }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Cloud className="h-6 w-6 text-blue-500" />
          <span className="text-lg font-medium">Temperature</span>
        </div>
        <span className="text-2xl font-bold">
          {Math.round(weather.temperature)}°C
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Cloud className="h-6 w-6 text-gray-500" />
          <span className="text-lg font-medium">Feels Like</span>
        </div>
        <span className="text-2xl font-bold">
          {Math.round(weather.feelsLike)}°C
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Droplets className="h-6 w-6 text-blue-500" />
          <span className="text-lg font-medium">Humidity</span>
        </div>
        <span className="text-2xl font-bold">{weather.humidity}%</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Wind className="h-6 w-6 text-gray-500" />
          <span className="text-lg font-medium">Wind Speed</span>
        </div>
        <span className="text-2xl font-bold">{weather.windSpeed} m/s</span>
      </div>

      <div className="text-center mt-4">
        <p className="text-lg capitalize text-gray-600">
          {weather.description}
        </p>
        <img
          src={`http://openweathermap.org/img/w/${weather.icon}.png`}
          alt="Weather icon"
          className="mx-auto"
        />
      </div>
    </div>
  );
}

export default WeatherCard;
