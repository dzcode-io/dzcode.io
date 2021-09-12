import React, { FC } from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";
import { globalStyles } from "../../styles/global";

export const LearnScreen: FC = () => {
  return (
    // main view
    <View style={globalStyles.mainView}>
      {/* center view */}
      <View style={globalStyles.centerView}>
        <Text style={globalStyles.titleText}>Learn UI created!</Text>
      </View>
    </View>
  );
};
