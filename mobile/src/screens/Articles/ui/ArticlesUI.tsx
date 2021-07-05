// import react native
import React, { FC } from "react";
import { Text, View } from "react-native";

// import styles
import { globalStyles } from "../../../styles";

// import Articles functions
import {} from "../functions";

// define ArticlesUI props interface
interface ArticlesUIProps {}

// export Articles UI
const ArticlesUI: FC<ArticlesUIProps> = ({}): JSX.Element => {
  return (
    // main view
    <View style={globalStyles.mainView}>
      {/* center view */}
      <View style={globalStyles.centerView}>
        <Text style={globalStyles.titleText}>Articles UI created!</Text>
      </View>
    </View>
  );
};
export default ArticlesUI;
