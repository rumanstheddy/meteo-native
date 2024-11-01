import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text } from "react-native";

type GradientTextProps = {
  text: string;
  fontSize: number;
};

export default function GradientText({ text, fontSize }: GradientTextProps) {
  const gradientHeight = fontSize * 1.5;
  const gradientWidth = fontSize * 5.6;

  return (
    <MaskedView
      maskElement={<Text style={[styles.text, { fontSize }]}>{text}</Text>}
    >
      <LinearGradient
        colors={[
          "#FFB300",
          "#FFBC00",
          "#FFC500",
          "#FFCD00",
          "#FFD600",
          "#FFDF00",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ height: gradientHeight, width: gradientWidth }}
      >
        <Text style={{ opacity: 0 }}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
}

// 121 - 21, 40
// 172 - 30, 45
// 200 - 35, 50

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    color: "black",
  },
});
