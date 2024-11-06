import { LocationData } from "@/interfaces/LocationData";
import { StyleSheet, Text } from "react-native";

type ResultItemProps = {
  data: LocationData;
  handlePress: ({
    latitude,
    longitude,
    name,
    admin1,
    country,
  }: {
    latitude: number;
    longitude: number;
    name: string;
    admin1: string;
    country: string;
  }) => void;
};

export default function SearchResultItem({
  data,
  handlePress,
}: ResultItemProps) {
  const { latitude, longitude, name, admin1, country } = data;
  return (
    <Text
      style={styles.searchResult}
      onPress={() =>
        handlePress({
          latitude,
          longitude,
          name,
          admin1,
          country,
        })
      }
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
