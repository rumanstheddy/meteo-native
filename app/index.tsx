import { StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import GradientText from "@/components/GradientText";
import { getLocationsFromSearch } from "@/apis/open-meteo";
import { useDebounce } from "@/hooks/useDebounce";
import { locationData } from "@/interfaces/locationData";
import { SearchResults } from "@/components/SearchResults";

export default function Index() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<locationData[]>([]);
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      getLocationsFromSearch(debouncedSearch).then(
        ({ results: locationDataResults }) => {
          setResults(locationDataResults as locationData[]);
        }
      );
    };

    if (debouncedSearch) fetchResults();
  }, [debouncedSearch]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons
        style={{ color: "#FFB300" }}
        name="weather-sunset"
        size={24}
        color="black"
      />
      <GradientText
        text="MeteoScope"
        gradientStyles={{ height: 40, width: 121 }}
      />
      <TextInput
        style={styles.searchInput}
        onChangeText={(text) => setSearch(text)}
        value={search}
        placeholder="Enter a location 📍"
      />
      {results && results.length > 0 && (
        <SearchResults
          setSearch={setSearch}
          setResults={setResults}
          results={results}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    borderColor: "#aaaaaa",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
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
