import React, { FC } from "react";
import { SafeAreaView, View } from "react-native";
import { Text } from "react-native-paper";
import { globalStyles } from "../../styles/global";

export const HomeScreen: FC = () => {
  return (
    <SafeAreaView style={globalStyles.mainView}>
      {/* center view */}
      <View style={globalStyles.centerView}>
        <Text style={globalStyles.titleText}>Home UI created!</Text>
      </View>
    </SafeAreaView>
  );
};
