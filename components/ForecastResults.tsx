import {
  CurrentWeather,
  ForecastData,
  WeatherUnits,
} from "@/interfaces/ForecastData";
import { StyleSheet, Text, View } from "react-native";
import ForecastResultItem from "./ForecastResultItem";

export default function ForecastResults({
  weatherData,
  weatherUnits,
}: {
  weatherData: CurrentWeather;
  weatherUnits: WeatherUnits;
}) {
  const currentTime = new Date(String(weatherData?.time));

  return (
    <>
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
        />
        <ForecastResultItem
          title={"Apparent Temperature"}
          data={weatherData?.apparent_temperature}
          units={weatherUnits?.apparent_temperature}
        />
      </View>
      <View style={styles.forecastDataRow}>
        <ForecastResultItem
          title={"Humidity"}
          data={weatherData?.relative_humidity_2m}
          units={weatherUnits?.relative_humidity_2m}
        />
        <ForecastResultItem
          title={"Precipitation"}
          data={weatherData?.precipitation}
          units={weatherUnits?.precipitation}
        />
      </View>
      <View style={styles.forecastDataRow}>
        <ForecastResultItem
          title={"Wind Speed"}
          data={weatherData?.wind_speed_10m}
          units={weatherUnits?.wind_speed_10m}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  forecastDataRow: {
    flexDirection: "row",
    gap: 16,
  },
});
