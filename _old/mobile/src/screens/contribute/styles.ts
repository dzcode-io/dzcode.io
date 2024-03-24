import {
  MEDIUM_LOGO_HEIGHT,
  MEDIUM_LOGO_WIDTH,
  MEDIUM_MARGIN_SIZE,
  MEDIUM_TEXT_SIZE,
} from "@dzcode.io/ui-mobile/dist/_utils/constants";
import { StyleSheet } from "react-native";

export const contributeStyles = StyleSheet.create({
  dzcodeLoading: {
    position: "absolute",
  },
  emptyStateLogo: {
    width: MEDIUM_LOGO_WIDTH,
    height: MEDIUM_LOGO_HEIGHT,
  },
  emptyStateText: {
    marginTop: MEDIUM_MARGIN_SIZE,
    marginBottom: MEDIUM_MARGIN_SIZE,
    textAlign: "center",
    fontSize: MEDIUM_TEXT_SIZE,
  },
  listView: {
    marginVertical: MEDIUM_MARGIN_SIZE,
  },
});
