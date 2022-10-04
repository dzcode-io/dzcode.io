import { StyleSheet } from "react-native";

export const bottomSheetStyles = StyleSheet.create({
  container: {
    borderColor: "#aaa3",
    borderWidth: 2,
    borderRadius: 16,

    shadowColor: "#000",
    // iOS
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    // Android
    elevation: 8,
  },
});
