import { LocationData } from "@/interfaces/LocationData";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import SearchResultItem from "./SearchResultItem";

export default function SearchResults({
  locationData,
  setLocationData,
  setSearch,
}: {
  locationData: LocationData[];
  setLocationData: (results: LocationData[]) => void;
  setSearch: (search: string) => void;
}) {
  const handlePress = (coordinates: {
    latitude: number;
    longitude: number;
    name: string;
    admin1: string;
    country: string;
  }) => {
    router.navigate({
      pathname: "/forecast",
      params: coordinates,
    });
    setLocationData([]);
    setSearch("");
  };

  return (
    <View style={styles.searchResultsContainer}>
      {locationData.map((item: LocationData) => (
        <SearchResultItem
          key={`${item.latitude} + ${item.longitude}`}
          data={item}
          handlePress={handlePress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  searchResultsContainer: {
    borderWidth: 1,
    borderColor: "#aaaaaa",
    borderRadius: 10,
    padding: 5,
    backgroundColor: "white",
    width: "100%",
  },
});
