import { StyleSheet } from "react-native";
import { MEDIUM_MARGIN_SIZE, SMALL_MARGIN_SIZE, SMALL_TEXT_SIZE } from "src/_utils/constants";

export const cardStyles = StyleSheet.create({
  mainView: {
    marginHorizontal: MEDIUM_MARGIN_SIZE,
    marginVertical: MEDIUM_MARGIN_SIZE / 2,
    borderWidth: 1,
  },
  flatListView: {
    marginTop: MEDIUM_MARGIN_SIZE,
  },
  chipView: {
    marginHorizontal: SMALL_MARGIN_SIZE / 2,
  },
  badgeView: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: -7,
    right: -7,
    fontSize: SMALL_TEXT_SIZE,
  },
  marginRight: {
    marginRight: MEDIUM_MARGIN_SIZE,
  },
  flexRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardActionsView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subtitleText: {
    marginTop: SMALL_MARGIN_SIZE,
  },
  divider1: {
    height: 1,
    marginTop: 10,
    marginLeft: -16,
    width: "50%",
  },
  divider2: {
    height: 15,
    width: 1,
    marginRight: MEDIUM_MARGIN_SIZE,
  },
});
