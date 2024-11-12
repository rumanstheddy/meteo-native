import { getForecastFromLocation } from "@/apis/OpenMeteoService";
import ForecastResults from "@/components/ForecastResults";
import { ForecastData } from "@/interfaces/ForecastData";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function Forecast() {
  const [loading, setLoading] = useState(false);
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  const { latitude, longitude, name, admin1, country } = useLocalSearchParams();
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      const data = await getForecastFromLocation(
        Number(latitude),
        Number(longitude),
        isFahrenheit ? "F" : undefined
      );
      setForecastData(data as ForecastData);
      setLoading(false);
    };

    fetchForecast();
  }, [isFahrenheit]);

  function toggleTemperature() {
    setIsFahrenheit((prev) => !prev);
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.forecastPageContainer}>
        <View style={styles.locationDetails}>
          <Text style={styles.locationName}>{name}</Text>
          <Text>{admin1 + ", " + country}</Text>
        </View>
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
        <View style={styles.switchContainer}>
          <Text>&deg;C</Text>
          <Switch onValueChange={toggleTemperature} value={isFahrenheit} />
          <Text>&deg;F</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0009",
  },
  forecastPageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    maxHeight: "70%",
    width: "80%",
    gap: 16,
  },
  locationDetails: {
    alignItems: "center",
    marginBottom: 8,
    gap: 12,
  },
  locationName: {
    fontSize: 18,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
