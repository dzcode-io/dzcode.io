import { MEDIUM_PADDING_SIZE, MEDIUM_TEXT_SIZE } from "../../utils/constants";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

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
