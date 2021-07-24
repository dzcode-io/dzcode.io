// import react native
import React, { FC } from "react";
import { View } from "react-native";

// import react native paper
import { Text, useTheme } from "react-native-paper";

// import styles
import { globalStyles } from "../../../styles";

// import FAQ functions
import {} from "../functions";

// define FAQUI props interface
interface FAQUIProps {}

// export FAQ UI
const FAQUI: FC<FAQUIProps> = ({}): JSX.Element => {
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
          FAQ UI created!
        </Text>
      </View>
    </View>
  );
};
export default FAQUI;
