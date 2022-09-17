import { StyleSheet } from "react-native";
import { Colors } from "src/styles/colors";
import { MEDIUM_PADDING_SIZE, MEDIUM_TEXT_SIZE } from "src/utils/constants";

export const faqStyles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: MEDIUM_TEXT_SIZE,
    color: Colors.grey,
  },
  description: {
    padding: MEDIUM_PADDING_SIZE,
  },
});
