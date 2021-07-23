// import react native
import React, { FC } from "react";
import { Text, View } from "react-native";

// import react native paper
import { Button } from "react-native-paper";

// import styles
import { globalStyles } from "../../../styles";

// import Home functions
import {} from "../functions";

// define HomeUI props interface
interface HomeUIProps {}

// export Home UI
const HomeUI: FC<HomeUIProps> = ({}): JSX.Element => {
  return (
    // main view
    <View style={globalStyles.mainView}>
      {/* center view */}
      <View style={globalStyles.centerView}>
        <Text style={globalStyles.titleText}>Home UI created!</Text>
        <Button
          icon="close"
          onPress={() => alert("Hello, World!")}
          labelStyle={globalStyles.titleText}
        >
          Press me
        </Button>
      </View>
    </View>
  );
};
export default HomeUI;
