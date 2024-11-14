import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
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
    <KeyboardAvoidingView style={styles.wrapper}>
      <View style={styles.homeContainer}>
        <MaterialCommunityIcons
          style={styles.brandIcon}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3FA2F6",
  },

  homeContainer: {
    // flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 36,
    borderRadius: 12,
    maxHeight: "95%",
    width: "80%",
  },

  brandIcon: { color: "#FFB300", marginBottom: -8 },

  searchInputContainer: {
    // padding: 5,
    width: "100%",
    marginTop: 4,
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
