import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeatherData = async (cityName: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${cityName}&units=metric&APPID=${API_KEY}`
    );
    return {
      temperature: response.data.main.temp,
      feelsLike: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      windSpeed: response.data.wind.speed,
    };
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      throw new Error("City not found");
    }
    throw new Error("Failed to fetch weather data");
  }
};
