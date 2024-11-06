import { StyleSheet, Text, View } from "react-native";

export default function ForecastResultItem({
  title,
  data,
  units,
}: {
  title: string;
  data: number;
  units: string;
}) {
  return (
    <View style={styles.forecastDataCell}>
      <Text>{title}</Text>
      <Text style={styles.forecastDetailText}>{`${data} ${units}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
