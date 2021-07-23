// import react native
import React, { FC } from "react";
import { SafeAreaView, Image, View } from "react-native";

// import react native paper
import { useTheme } from "react-native-paper";

// import drawer navigation
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

// import styles
import { drawerStyles } from "../../styles";

// export DrawerContent component
const DrawerContent: FC<any> = (props): JSX.Element => {
  // use theme
  const theme = useTheme();

  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView>
        {/* dzcode.io logo */}
        <View style={{ backgroundColor: theme.colors.primary }}>
          <Image
            source={require("../../assets/images/png/logo.png")}
            style={drawerStyles.logoView}
          />
        </View>
        {/* Drawer items */}
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};
export default DrawerContent;
