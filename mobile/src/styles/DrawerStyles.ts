// import stylesheet
import { StyleSheet } from "react-native";

// import constants
import {
  LARGE_LOGO_WIDTH,
  LARGE_MARGIN_SIZE,
  MEDIUM_MARGIN_SIZE,
  SMALL_LOGO_HEIGHT,
} from "../utils/constants";

// export drawer styles
export const drawerStyles = StyleSheet.create({
  logoView: {
    width: LARGE_LOGO_WIDTH,
    height: SMALL_LOGO_HEIGHT,
    resizeMode: "stretch",
    margin: MEDIUM_MARGIN_SIZE,
    marginVertical: LARGE_MARGIN_SIZE,
  },
});
