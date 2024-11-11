import { CurrentWeather, WeatherUnits } from "@/interfaces/ForecastData";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ForecastResultItem from "./ForecastResultItem";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function ForecastResults({
  weatherData,
  weatherUnits,
}: {
  weatherData: CurrentWeather;
  weatherUnits: WeatherUnits;
}) {
  const currentTime = new Date(String(weatherData?.time));

  // TODO: Use List View or Section List (read about them) for rendering lists

  const forecastItems = [
    {
      key: "temperature",
      title: "Temperature",
      data: weatherData?.temperature_2m,
      units: weatherUnits?.temperature_2m,
      icon: "thermometer" as const,
    },
    {
      key: "apparentTemperature",
      title: "Temperature (Feels like)",
      data: weatherData?.apparent_temperature,
      units: weatherUnits?.apparent_temperature,
      icon: "sun-thermometer-outline" as const,
    },
    {
      key: "humidity",
      title: "Humidity",
      data: weatherData?.relative_humidity_2m,
      units: weatherUnits?.relative_humidity_2m,
      icon: "water-outline" as const,
    },
    {
      key: "precipitation",
      title: "Precipitation",
      data: weatherData?.precipitation,
      units: weatherUnits?.precipitation,
      icon: "weather-rainy" as const,
    },
    {
      key: "windSpeed",
      title: "Wind Speed",
      data: weatherData?.wind_speed_10m,
      units: weatherUnits?.wind_speed_10m,
      icon: "weather-windy" as const,
    },
  ];

  const groupItems = [];
  for (let i = 0; i < forecastItems.length; i += 2) {
    groupItems.push(forecastItems.slice(i, i + 2));
  }

  console.log(groupItems);

  return (
    <View style={styles.forecastDetails}>
      <View style={styles.forecastDataRow}>
        <Text>
          {currentTime.toLocaleString("en-US", { timeZone: "GMT" })} (GMT)
        </Text>
      </View>
      <FlatList
        keyExtractor={(_, index) => `row-${index}`}
        data={groupItems}
        renderItem={({ item }) => (
          <View style={styles.forecastDataRow}>
            {item.map(({ key, title, data, units, icon }) => (
              <ForecastResultItem
                key={key}
                title={title}
                data={data}
                units={units}
              >
                <MaterialCommunityIcons name={icon} size={24} color="black" />
              </ForecastResultItem>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  forecastDataRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
  },

  forecastDetails: {
    alignItems: "center",
    flex: 1,
  },
});
