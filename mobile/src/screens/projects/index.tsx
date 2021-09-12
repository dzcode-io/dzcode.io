import React, { FC } from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";
import { globalStyles } from "../../styles";

const ProjectsScreen: FC = () => {
  return (
    // main view
    <View style={globalStyles.mainView}>
      {/* center view */}
      <View style={globalStyles.centerView}>
        <Text style={globalStyles.titleText}>Projects UI created!</Text>
      </View>
    </View>
  );
};
export default ProjectsScreen;
