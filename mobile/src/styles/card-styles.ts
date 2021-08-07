import { MEDIUM_MARGIN_SIZE, SMALL_MARGIN_SIZE } from "../utils/constants";
import { StyleSheet } from "react-native";

// export card styles
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
});
