export interface CurrentWeather {
  apparent_temperature: number;
  cloud_cover: number;
  interval: number;
  is_day: number;
  precipitation: number;
  rain: number;
  relative_humidity_2m: number;
  showers: number;
  snowfall: number;
  temperature_2m: number;
  time: string;
  wind_speed_10m: number;
}

export interface WeatherUnits {
  apparent_temperature: string;
  cloud_cover: string;
  interval: string;
  is_day: string;
  precipitation: string;
  rain: string;
  relative_humidity_2m: string;
  showers: string;
  snowfall: string;
  temperature_2m: string;
  time: string;
  wind_speed_10m: string;
}

export interface ForecastData {
  current: CurrentWeather;
  current_units: WeatherUnits;
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}
