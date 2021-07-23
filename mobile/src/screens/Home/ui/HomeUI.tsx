// import react native
import React, { FC } from "react";
import { View } from "react-native";

// import react native paper
import { Text, Button, useTheme } from "react-native-paper";

// import styles
import { globalStyles } from "../../../styles";

// import Home functions
import {} from "../functions";

// define HomeUI props interface
interface HomeUIProps {}

// export Home UI
const HomeUI: FC<HomeUIProps> = ({}): JSX.Element => {
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
          Home UI created!
        </Text>
        <Button
          icon="close"
          onPress={() => alert("Hello, World!")}
          labelStyle={[globalStyles.titleText, { color: theme.colors.text }]}
        >
          Press me
        </Button>
      </View>
    </View>
  );
};
export default HomeUI;
