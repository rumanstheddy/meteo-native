import { CurrentWeather, WeatherUnits } from "@/interfaces/ForecastData";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ForecastResultItem from "./ForecastResultItem";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome } from "@expo/vector-icons";

export default function ForecastResults({
  weatherData,
  weatherUnits,
}: {
  weatherData: CurrentWeather;
  weatherUnits: WeatherUnits;
}) {
  const currentTime = new Date(String(weatherData?.time));

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

  const timeIcon = weatherData?.is_day ? "sun-o" : "moon-o";
  const iconColor = weatherData?.is_day ? "#FFB300" : "#5500CC";

  return (
    <View style={styles.forecastDetails}>
      <View
        style={[
          styles.localTime,
          {
            marginBottom: 24,
          },
        ]}
      >
        <FontAwesome name={timeIcon} size={28} color={iconColor} />
        <Text>
          {currentTime.toLocaleString("en-US", { timeZone: "GMT" })} GMT
        </Text>
      </View>
      <FlatList
        keyExtractor={(_, index) => `row-${index}`}
        data={groupItems}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.forecastDataRow,
              index < groupItems.length - 1 && {
                marginBottom: 24,
              },
            ]}
          >
            {item.map(({ key, title, data, units, icon }) => (
              <ForecastResultItem
                key={key}
                title={title}
                data={data}
                units={units}
              >
                <MaterialCommunityIcons name={icon} size={28} color="black" />
              </ForecastResultItem>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  forecastDetails: {
    alignItems: "center",
    flex: 1,
  },

  forecastDataRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },

  localTime: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});
