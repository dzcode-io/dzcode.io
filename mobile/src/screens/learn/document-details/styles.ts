import { LARGE_MARGIN_SIZE, MEDIUM_TEXT_SIZE } from "../../../utils/constants";
import { StyleSheet } from "react-native";

export const documentDetailsStyles = StyleSheet.create({
  mdBody: {
    marginHorizontal: LARGE_MARGIN_SIZE,
  },
  authorsText: {
    fontWeight: "bold",
    fontSize: MEDIUM_TEXT_SIZE,
  },
});
