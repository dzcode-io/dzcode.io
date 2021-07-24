// import react native
import React, { FC } from "react";
import { View } from "react-native";

// import react native paper
import { Text, useTheme } from "react-native-paper";

// import styles
import { globalStyles } from "../../../styles";

// import Learn functions
import {} from "../functions";

// define LearnUI props interface
interface LearnUIProps {}

// export Learn UI
const LearnUI: FC<LearnUIProps> = ({}): JSX.Element => {
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
          Learn UI created!
        </Text>
      </View>
    </View>
  );
};
export default LearnUI;
