import { LocationData } from "@/interfaces/LocationData";
import { StyleSheet, Text } from "react-native";

type ResultItemProps = {
  data: LocationData;
  handlePress: ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => void;
};

export default function ResultItem({ data, handlePress }: ResultItemProps) {
  const { latitude, longitude, name, admin1, country } = data;
  return (
    <Text
      style={styles.searchResult}
      onPress={() => handlePress({ latitude, longitude })}
    >
      {name}, {admin1}, {country}
    </Text>
  );
}

const styles = StyleSheet.create({
  searchResult: {
    padding: 10,
    textAlign: "center",
  },
});
