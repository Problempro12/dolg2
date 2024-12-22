import { WeatherResponse } from "@/models/WeatherModel";
import { from } from "rxjs";
import { ajax } from 'rxjs/ajax';

const API_KEY = '767ba141bdc53d4e3a4b2dfc558b7c93'; // Убедитесь, что ваш ключ API действителен

export const getWeatherByLocation = (lat: number, lon: number) => {
  const url = `/api/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;    return from(ajax.getJSON<WeatherResponse>(url));
  return from(ajax.getJSON<WeatherResponse>(url));
};
