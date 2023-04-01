import { NavigationProp, ParamListBase } from "@react-navigation/core";
import { Linking } from "react-native";

/**
 * @function openLink
 * @description Open a link in the default browser or navigate to the app's screen if the link is a deep link
 * @param url The url to open
 * @param navigation The navigation object
 */
export const openLink = (url: string, navigation?: NavigationProp<ParamListBase, string>) => {
  if (url.startsWith("http")) {
    try {
      Linking.openURL(url);
    } catch (error) {
      alert("Cannot open url on browser");
    }
  } else {
    navigation?.navigate(url.split("/")[1].toLocaleLowerCase());
  }
};
