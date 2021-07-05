// import react native
import React, { FC } from "react";
import { Text, View } from "react-native";

// import styles
import { globalStyles } from "../../../styles";

// import FAQ functions
import {} from "../functions";

// define FAQUI props interface
interface FAQUIProps {}

// export FAQ UI
const FAQUI: FC<FAQUIProps> = ({}): JSX.Element => {
  return (
    // main view
    <View style={globalStyles.mainView}>
      {/* center view */}
      <View style={globalStyles.centerView}>
        <Text style={globalStyles.titleText}>FAQ UI created!</Text>
      </View>
    </View>
  );
};
export default FAQUI;
