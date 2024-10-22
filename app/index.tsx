import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import GradientText from "@/components/GradientText";
import { getLocationsFromSearch } from "@/apis/OpenMeteoAPI";
import { useDebounce } from "@/hooks/useDebounce";

export default function Index() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const fetchResults = async () => {
      getLocationsFromSearch(debouncedSearch).then((data) => {
        console.log(data);
      });
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
