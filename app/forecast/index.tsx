import { getForecastFromLocation } from "@/apis/OpenMeteoService";
import ForecastResults from "@/components/ForecastResults";
import { ForecastData } from "@/interfaces/ForecastData";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Forecast() {
  const [loading, setLoading] = useState(false);
  const { latitude, longitude, name, admin1, country } = useLocalSearchParams();
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
      <View style={styles.locationDetails}>
        <Text style={styles.locationName}>{name}</Text>
        <Text>{admin1 + ", " + country}</Text>
      </View>
      <View style={styles.forecastDetails}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          forecastData && (
            <ForecastResults
              weatherData={forecastData?.current}
              weatherUnits={forecastData?.current_units}
            />
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  forecastContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  locationDetails: {
    alignItems: "center",
    marginBottom: 8,
  },
  locationName: {
    fontSize: 18,
  },
  forecastDetails: {
    alignItems: "center",
    gap: 16,
  },
});
