// import react native
import React, { FC } from "react";
import { Text, View } from "react-native";

// import styles
import { globalStyles } from "../../../styles";

// import Contribute functions
import {} from "../functions";

// define ContributeUI props interface
interface ContributeUIProps {}

// export Contribute UI
const ContributeUI: FC<ContributeUIProps> = ({}): JSX.Element => {
  return (
    // main view
    <View style={globalStyles.mainView}>
      {/* center view */}
      <View style={globalStyles.centerView}>
        <Text style={globalStyles.titleText}>Contribute UI created!</Text>
      </View>
    </View>
  );
};
export default ContributeUI;
