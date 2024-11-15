import { StyleSheet, Text, View } from "react-native";

export default function ForecastResultItem({
  title,
  data,
  units,
  children,
  isDay,
}: {
  title: string;
  data: number;
  units: string;
  children: JSX.Element;
  isDay: boolean;
}) {
  const COLOR_YELLOW = "#FFB300";
  const COLOR_PURPLE = "#8900FF";

  return (
    <View style={styles.forecastDataCell}>
      {children}
      <Text style={styles.weatherTitle}>{title}</Text>
      <Text
        style={[
          styles.weatherValue,
          // { color: isDay ? COLOR_YELLOW : COLOR_PURPLE },
        ]}
      >{`${data} ${units}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  forecastDataCell: {
    flexDirection: "column",
    gap: 4,
    alignItems: "center",
  },
  weatherTitle: {
    fontSize: 12,
  },
  weatherValue: {
    fontSize: 20,
    fontWeight: "500",
  },
});
