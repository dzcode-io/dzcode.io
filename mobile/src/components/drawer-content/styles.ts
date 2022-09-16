import { StyleSheet } from "react-native";
import {
  LARGE_LOGO_WIDTH,
  LARGE_MARGIN_SIZE,
  MEDIUM_MARGIN_SIZE,
  SMALL_LOGO_HEIGHT,
  SMALL_MARGIN_SIZE,
} from "utils/constants";

export const drawerStyles = StyleSheet.create({
  logoView: {
    width: LARGE_LOGO_WIDTH,
    height: SMALL_LOGO_HEIGHT,
    resizeMode: "stretch",
    margin: MEDIUM_MARGIN_SIZE,
    marginTop: LARGE_MARGIN_SIZE,
    marginBottom: 0,
  },
  version: {
    margin: MEDIUM_MARGIN_SIZE,
    marginBottom: LARGE_MARGIN_SIZE,
    textAlign: "center",
  },
  switchView: {
    marginHorizontal: SMALL_MARGIN_SIZE,
  },
});
