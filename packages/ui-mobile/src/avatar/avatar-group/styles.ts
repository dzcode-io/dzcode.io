import { StyleSheet } from "react-native";
import { MEDIUM_MARGIN_SIZE, MEDIUM_TEXT_SIZE } from "src/_utils/constants";

export const avatarGroupStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: -MEDIUM_MARGIN_SIZE * 1.5,
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 64,
  },
  avatarLabelText: {
    fontSize: MEDIUM_TEXT_SIZE,
    fontWeight: "bold",
  },
});
