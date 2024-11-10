import { CurrentWeather, WeatherUnits } from "@/interfaces/ForecastData";
import { StyleSheet, Text, View } from "react-native";
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

  return (
    <View style={styles.forecastDetails}>
      <View style={styles.forecastDataRow}>
        <Text>
          {currentTime.toLocaleString("en-US", { timeZone: "GMT" })} (GMT)
        </Text>
      </View>
      <View style={styles.forecastDataRow}>
        <ForecastResultItem
          title={"Temperature"}
          data={weatherData?.temperature_2m}
          units={weatherUnits?.temperature_2m}
        >
          <MaterialCommunityIcons name="thermometer" size={24} color="black" />
        </ForecastResultItem>
        <ForecastResultItem
          title={"Temperature (Feels like)"}
          data={weatherData?.apparent_temperature}
          units={weatherUnits?.apparent_temperature}
        >
          <MaterialCommunityIcons
            name="sun-thermometer-outline"
            size={24}
            color="black"
          />
        </ForecastResultItem>
      </View>
      <View style={styles.forecastDataRow}>
        <ForecastResultItem
          title={"Humidity"}
          data={weatherData?.relative_humidity_2m}
          units={weatherUnits?.relative_humidity_2m}
        >
          <MaterialCommunityIcons
            name="water-outline"
            size={24}
            color="black"
          />
        </ForecastResultItem>
        <ForecastResultItem
          title={"Precipitation"}
          data={weatherData?.precipitation}
          units={weatherUnits?.precipitation}
        >
          <MaterialCommunityIcons
            name="weather-rainy"
            size={24}
            color="black"
          />
        </ForecastResultItem>
      </View>
      <View style={styles.forecastDataRow}>
        <ForecastResultItem
          title={"Wind Speed"}
          data={weatherData?.wind_speed_10m}
          units={weatherUnits?.wind_speed_10m}
        >
          <MaterialCommunityIcons
            name="weather-windy"
            size={24}
            color="black"
          />
        </ForecastResultItem>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  forecastDataRow: {
    flexDirection: "row",
    gap: 16,
  },

  forecastDetails: {
    alignItems: "center",
    gap: 24,
  },
});
