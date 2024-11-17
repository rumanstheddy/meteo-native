import {
  KeyboardAvoidingView,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
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

  const COLOR_BLUE = "#40A2F6";
  const COLOR_YELLOW = "#FFB300";
  const fontColor = "#676767";

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
    <KeyboardAvoidingView
      style={[styles.wrapper, { backgroundColor: COLOR_BLUE }]}
    >
      <View style={styles.homeContainer}>
        <MaterialCommunityIcons
          style={styles.brandIcon}
          name="weather-sunset"
          size={50}
          color={COLOR_YELLOW}
        />
        {/* <GradientText text="Meteoscope" fontSize={40} /> */}
        <Text style={{ color: COLOR_YELLOW, fontSize: 40, fontWeight: "bold" }}>
          Meteoscope
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: fontColor,
            paddingBottom: 8,
            lineHeight: 20,
          }}
        >
          Meteoscope brings pinpoint weather forecasts worldwide, powered by
          <Text
            style={{ color: COLOR_BLUE, textDecorationLine: "underline" }}
            onPress={() => Linking.openURL("https://open-meteo.com/")}
          >
            {" "}
            Open Meteo
          </Text>
        </Text>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            onChangeText={(text) => setSearch(text)}
            value={search}
            placeholder="Enter a location 📍"
          />
        </View>
        //TODO: Add spinner instead of loading text
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

  brandIcon: { marginBottom: -8 },

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
