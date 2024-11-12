import { StyleSheet, Text, View } from "react-native";

export default function ForecastResultItem({
  title,
  data,
  units,
  children,
}: {
  title: string;
  data: number;
  units: string;
  children: JSX.Element;
}) {
  return (
    <View style={styles.forecastDataCell}>
      {children}
      <Text style={styles.weatherTitle}>{title}</Text>
      <Text style={styles.weatherValue}>{`${data} ${units}`}</Text>
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
    fontSize: 18,
    fontWeight: "bold",
  },
});
