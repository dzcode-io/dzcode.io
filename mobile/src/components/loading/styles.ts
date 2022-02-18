import { StyleSheet } from "react-native";

import { SMALL_LOGO_HEIGHT, SMALL_LOGO_WIDTH } from "../../utils/constants";

export const dzcodeLoadingStyles = StyleSheet.create({
  imageView: {
    width: SMALL_LOGO_WIDTH,
    height: SMALL_LOGO_HEIGHT,
    resizeMode: "contain",
  },
});
