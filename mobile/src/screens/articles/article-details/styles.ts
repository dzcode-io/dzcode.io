import { StyleSheet } from "react-native";
import { LARGE_LOGO_HEIGHT, LARGE_MARGIN_SIZE, MEDIUM_TEXT_SIZE } from "../../../utils/constants";

export const articleDetailsStyles = StyleSheet.create({
  image: {
    width: "100%",
    height: LARGE_LOGO_HEIGHT,
  },
  mdBody: {
    marginHorizontal: LARGE_MARGIN_SIZE,
  },
  authorsText: {
    fontWeight: "bold",
    fontSize: MEDIUM_TEXT_SIZE,
  },
});
