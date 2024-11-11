const callAPI = async (url: string, cache: RequestCache = "default") => {
  try {
    const response = await fetch(url, { cache: cache });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log((err as Error).message);
  }
};

const getLocationsFromSearch = async (
  searchQuery: string,
  resultCount: number = 5
) => {
  const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=${resultCount}&language=en&format=json`;
  const data = await callAPI(apiUrl);
  return data;
};

const getForecastFromLocation = async (
  latitude: number,
  longitude: number,
  temp_unit?: string
) => {
  const apiUrl = [
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,cloud_cover,wind_speed_10m`,
    temp_unit && `&temperature_unit=fahrenheit`,
  ]
    .filter(Boolean)
    .join("");
  const data = await callAPI(apiUrl);
  return data;
};

export { getLocationsFromSearch, getForecastFromLocation };
