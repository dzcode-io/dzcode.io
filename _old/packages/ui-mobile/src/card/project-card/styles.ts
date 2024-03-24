import { StyleSheet } from "react-native";
import { LARGE_MARGIN_SIZE, MEDIUM_MARGIN_SIZE, MEDIUM_TEXT_SIZE } from "src/_utils/constants";

export const cardStyles = StyleSheet.create({
  mainView: {
    marginHorizontal: MEDIUM_MARGIN_SIZE,
    marginVertical: MEDIUM_MARGIN_SIZE / 2,
    borderWidth: 1,
  },
  reposColumn: {
    flex: 1,
    alignItems: "flex-start",
  },
  divider1: {
    height: 1,
    marginTop: 10,
    marginLeft: -16,
    width: "50%",
  },
  divider2: {
    marginLeft: LARGE_MARGIN_SIZE,
    height: 40,
    width: 1,
    marginRight: MEDIUM_MARGIN_SIZE,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: MEDIUM_MARGIN_SIZE,
  },
  badgeView: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: -12,
    right: -12,
    fontSize: MEDIUM_TEXT_SIZE,
  },
  marginRight: {
    marginLeft: LARGE_MARGIN_SIZE,
  },
  flatListView: {
    marginLeft: MEDIUM_MARGIN_SIZE,
    marginBottom: MEDIUM_MARGIN_SIZE,
  },
  chipView: {
    marginRight: MEDIUM_MARGIN_SIZE,
  },
  avatarGroup: {
    marginLeft: MEDIUM_MARGIN_SIZE,
  },
});
