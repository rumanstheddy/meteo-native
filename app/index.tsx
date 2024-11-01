import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import GradientText from "@/components/GradientText";
import { getLocationsFromSearch } from "@/apis/OpenMeteoService";
import { useDebounce } from "@/hooks/useDebounce";
import { LocationData } from "@/interfaces/LocationData";
import SearchResults from "@/components/SearchResults";

export default function Index() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState<LocationData[]>([]);
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      getLocationsFromSearch(debouncedSearch)
        .then(({ results: locationDataResults }) => {
          setLocationData(locationDataResults as LocationData[]);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    };

    if (debouncedSearch) fetchLocations();
  }, [debouncedSearch]);

  return (
    <View style={styles.homeContainer}>
      <MaterialCommunityIcons
        style={{ color: "#FFB300" }}
        name="weather-sunset"
        size={50}
        color="black"
      />
      <GradientText text="Meteoscope" fontSize={50} />
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => setSearch(text)}
          value={search}
          placeholder="Enter a location 📍"
        />
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        locationData &&
        locationData.length > 0 && (
          <SearchResults
            setSearch={setSearch}
            setLocationData={setLocationData}
            locationData={locationData}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  searchInputContainer: {
    // padding: 5,
    width: "80%",
  },

  searchInput: {
    borderWidth: 1,
    borderColor: "#aaaaaa",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: "white",
    textAlign: "center",
  },
});
