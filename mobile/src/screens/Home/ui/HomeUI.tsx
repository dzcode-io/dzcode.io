import {} from "../functions";
import React, { FC } from "react";
import { Text, useTheme } from "react-native-paper";
import { View } from "react-native";
import { globalStyles } from "../../../styles";

// export Home UI
const HomeUI: FC = (): JSX.Element => {
  // use theme
  const theme = useTheme();

  return (
    // main view
    <View style={[globalStyles.mainView, { backgroundColor: theme.colors.primary }]}>
      {/* center view */}
      <View style={globalStyles.centerView}>
        <Text style={[globalStyles.titleText, { color: theme.colors.text }]}>Home UI created!</Text>
      </View>
    </View>
  );
};
export default HomeUI;
