// import react native
import React, { FC } from "react";
import { Text, View } from "react-native";

// import styles
import { globalStyles } from "../../../styles";

// import Projects functions
import {} from "../functions";

// define ProjectsUI props interface
interface ProjectsUIProps {}

// export Projects UI
const ProjectsUI: FC<ProjectsUIProps> = ({}): JSX.Element => {
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
export default ProjectsUI;
