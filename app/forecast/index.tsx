import { getForecastFromLocation } from "@/apis/OpenMeteoService";
import {
  CurrentWeather,
  ForecastData,
  WeatherUnits,
} from "@/interfaces/ForecastData";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Forecast() {
  const [loading, setLoading] = useState(false);
  const { latitude, longitude } = useLocalSearchParams();
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      const data = await getForecastFromLocation(
        Number(latitude),
        Number(longitude)
      );
      setForecastData(data as ForecastData);
      setLoading(false);
    };

    if (!forecastData) fetchForecast();
  }, [forecastData]);

  return (
    <View style={styles.forecastContainer}>
      <Text>Forecast Screen</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        forecastData &&
        Object.keys(forecastData.current).map((key, index) => (
          <Text key={index}>
            {key} {forecastData.current[key as keyof CurrentWeather]}{" "}
            {forecastData.current_units[key as keyof WeatherUnits]}
          </Text>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  forecastContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
