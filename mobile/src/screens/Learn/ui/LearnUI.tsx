// import react native
import React, { FC } from "react";
import { Text, View } from "react-native";

// import styles
import { globalStyles } from "../../../styles";

// import Learn functions
import {} from "../functions";

// define LearnUI props interface
interface LearnUIProps {}

// export Learn UI
const LearnUI: FC<LearnUIProps> = ({}): JSX.Element => {
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
