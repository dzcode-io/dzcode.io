import { StyleSheet } from "react-native";
import { MEDIUM_MARGIN_SIZE, SMALL_MARGIN_SIZE } from "src/_utils/constants";
import { Colors } from "src/theme/style/color";

export const cardStyles = StyleSheet.create({
  mainView: {
    marginHorizontal: MEDIUM_MARGIN_SIZE,
    marginVertical: MEDIUM_MARGIN_SIZE / 2,
  },
  flatListView: {
    marginVertical: MEDIUM_MARGIN_SIZE,
  },
  chipView: {
    marginHorizontal: SMALL_MARGIN_SIZE / 2,
  },
  badgeView: {
    backgroundColor: "transparent",
    position: "absolute",
    top: -15,
    right: -11,
  },
  marginLeft: {
    marginLeft: MEDIUM_MARGIN_SIZE,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardActionsView: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  subtitleText: {
    color: Colors.grey,
  },
});
