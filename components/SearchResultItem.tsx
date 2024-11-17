import { LocationData } from "@/interfaces/LocationData";
import { Pressable, StyleSheet, Text } from "react-native";

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
    //TODO: Add a button like visual press feedback on press
    <Pressable
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
      <Text style={styles.searchResult}>
        {name}, {admin1}, {country}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  searchResult: {
    padding: 10,
    textAlign: "center",
    // color: "#F3C623",
  },
});
