import { getForecastFromLocation } from "@/apis/open-meteo";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Forecast() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const { latitude, longitude } = useLocalSearchParams();

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      const data = await getForecastFromLocation(
        Number(latitude),
        Number(longitude)
      );
      // TODO: Create an interface for the forecast data
      setResults(data);
      setLoading(false);
    };

    if (latitude && longitude) fetchForecast();
  }, [latitude, longitude]);

  return (
    <View>
      <Text>Forecast Screen</Text>
    </View>
  );
}
