import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, SafeAreaView, View } from "react-native";
import React, { FC } from "react";
import { drawerStyles } from "../../styles";
import { useTheme } from "react-native-paper";

// export DrawerContent component
const DrawerContent: FC<DrawerContentComponentProps<DrawerContentOptions>> = (
  props,
): JSX.Element => {
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
