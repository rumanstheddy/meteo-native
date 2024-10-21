import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";

type GradientTextProps = {
  text: string;
  gradientStyles: { height: number; width: number };
};

export default function GradientText({
  text,
  gradientStyles,
}: GradientTextProps) {
  const [textWidth, setTextWidth] = useState(0);

  const { height: gradientHeight, width: gradientWidth } = gradientStyles;

  return (
    <MaskedView
      maskElement={<Text style={styles.text}>{text}</Text>}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        console.log(width);
        setTextWidth(width);
      }}
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

const styles = StyleSheet.create({
  text: {
    fontSize: 21,
    fontWeight: "bold",
    color: "black",
  },
});
