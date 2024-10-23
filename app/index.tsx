import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import GradientText from "@/components/GradientText";
import { getLocationsFromSearch } from "@/apis/OpenMeteoAPI";
import { useDebounce } from "@/hooks/useDebounce";

export default function Index() {
  type locationData = {
    admin1: string;
    admin1_id: number;
    admin2: string;
    admin2_id: number;
    admin3: string;
    admin3_id: number;
    country: string;
    country_code: string;
    country_id: number;
    elevation: number;
    feature_code: string;
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    population: number;
    postcodes: string[];
    timezone: string;
  };

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
        style={styles.input}
        onChangeText={(text) => setSearch(text)}
        value={search}
        placeholder="Enter a location 📍"
      />
      <View>
        {results &&
          results.map(
            ({ latitude, longitude, name, admin1, country }: locationData) => {
              return (
                <Text key={`${latitude} + ${longitude}`}>
                  {name}, {admin1}, {country}
                </Text>
              );
            }
          )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#aaaaaa",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
});
