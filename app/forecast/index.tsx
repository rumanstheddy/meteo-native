import { getForecastFromLocation } from "@/apis/OpenMeteoService";
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

  function displayForecastDetails() {
    const data = forecastData?.current;
    const units = forecastData?.current_units;

    const currentTime = new Date(String(data?.time));

    return (
      <>
        <View style={styles.forecastDataRow}>
          <Text>
            {currentTime.toLocaleString("en-US", { timeZone: "GMT" })} (GMT)
          </Text>
        </View>
        <View style={styles.forecastDataRow}>
          <View style={styles.forecastDataCell}>
            <Text>Temperature</Text>
            <Text style={styles.forecastDetailText}>
              {data?.temperature_2m}
              {units?.temperature_2m}
            </Text>
          </View>
          <View style={styles.forecastDataCell}>
            <Text>Apparent Temperature</Text>
            <Text style={styles.forecastDetailText}>
              {data?.apparent_temperature}
              {units?.apparent_temperature}
            </Text>
          </View>
        </View>
        <View style={styles.forecastDataRow}>
          <View style={styles.forecastDataCell}>
            <Text>Humidity</Text>
            <Text style={styles.forecastDetailText}>
              {data?.relative_humidity_2m}
              {units?.relative_humidity_2m}
            </Text>
          </View>
          <View style={styles.forecastDataCell}>
            <Text>Precipitation</Text>
            <Text style={styles.forecastDetailText}>
              {data?.precipitation + " " + units?.precipitation}
            </Text>
          </View>
        </View>
        <View style={styles.forecastDataRow}>
          <View style={styles.forecastDataCell}>
            <Text>Wind Speed</Text>
            <Text style={styles.forecastDetailText}>
              {data?.wind_speed_10m + " " + units?.wind_speed_10m}
            </Text>
          </View>
        </View>
      </>
    );
  }

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
          forecastData && displayForecastDetails()
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
  forecastDataRow: {
    flexDirection: "row",
    gap: 16,
  },
  forecastDataCell: {
    flexDirection: "column",
    gap: 4,
    alignItems: "center",
  },
  forecastDetailText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
