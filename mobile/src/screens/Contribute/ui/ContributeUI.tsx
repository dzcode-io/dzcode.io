// import react native
import React, { FC } from "react";
import { View } from "react-native";

// import react native paper
import { Text, useTheme } from "react-native-paper";

// import styles
import { globalStyles } from "../../../styles";

// import Contribute functions
import {} from "../functions";

// define ContributeUI props interface
interface ContributeUIProps {}

// export Contribute UI
const ContributeUI: FC<ContributeUIProps> = ({}): JSX.Element => {
  // use theme
  const theme = useTheme();

  return (
    // main view
    <View
      style={[globalStyles.mainView, { backgroundColor: theme.colors.primary }]}
    >
      {/* center view */}
      <View style={globalStyles.centerView}>
        <Text style={[globalStyles.titleText, { color: theme.colors.text }]}>
          Contribute UI created!
        </Text>
      </View>
    </View>
  );
};
export default ContributeUI;
