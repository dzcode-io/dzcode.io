import React, { FC } from "react";
import { SafeAreaView, View } from "react-native";
import { Text } from "react-native-paper";
import { globalStyles } from "../../styles/global";

export const FAQScreen: FC = () => {
  return (
    // main view
    <SafeAreaView style={globalStyles.mainView}>
      {/* center view */}
      <View style={globalStyles.centerView}>
        <Text style={globalStyles.titleText}>FAQ UI created!</Text>
      </View>
    </SafeAreaView>
  );
};
