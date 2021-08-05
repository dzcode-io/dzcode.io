import {} from "../functions";
import { getContributes } from "../../../api/requests";
import React, { FC } from "react";
import { Text, Button } from "react-native-paper";
import { View } from "react-native";
import { globalStyles } from "../../../styles";

// export Contribute UI
const ContributeUI: FC = (): JSX.Element => {
  return (
    // main view
    <View style={globalStyles.mainView}>
      {/* center view */}
      <View style={globalStyles.centerView}>
        <Text style={globalStyles.titleText}>Contribute UI created!</Text>
        <Button
          onPress={async () => {
            await getContributes();
          }}
        >
          <Text>Get contributes</Text>
        </Button>
      </View>
    </View>
  );
};
export default ContributeUI;
