import { getForecastFromLocation } from "@/apis/open-meteo";
import { ForecastData } from "@/interfaces/ForecastData";
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
        forecastData && (
          <Text>
            {forecastData.current.apparent_temperature}
            {forecastData.current_units.apparent_temperature}
          </Text>
        )
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
