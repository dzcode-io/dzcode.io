import { SMALL_LOGO_HEIGHT, SMALL_LOGO_WIDTH } from "../../utils/constants";
import { StyleSheet } from "react-native";

export const dzcodeLoadingStyles = StyleSheet.create({
  imageView: {
    width: SMALL_LOGO_WIDTH,
    height: SMALL_LOGO_HEIGHT,
    resizeMode: "contain",
  },
});
