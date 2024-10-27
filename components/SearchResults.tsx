import { locationData } from "@/interfaces/locationData";
import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { ResultItem } from "./ResultItem";

export function SearchResults({
  results: searchResults,
  setResults,
  setSearch,
}: {
  results: locationData[];
  setResults: (results: locationData[]) => void;
  setSearch: (search: string) => void;
}) {
  const handlePress = (coordinates: {
    latitude: number;
    longitude: number;
  }) => {
    router.navigate({
      pathname: "forecast",
      params: coordinates,
    });
    setResults([]);
    setSearch("");
  };

  return (
    <View style={styles.searchResultsContainer}>
      {searchResults.map((item: locationData) => (
        <ResultItem
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
  },
  searchResult: {
    padding: 10,
  },
});
