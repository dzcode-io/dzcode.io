import {} from "../functions";
import React, { FC } from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";
import { globalStyles } from "../../../styles";

// export Learn UI
const LearnUI: FC = () => {
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
export default LearnUI;
