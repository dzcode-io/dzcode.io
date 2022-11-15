/* @eslint-disable @typescript-eslint/no-var-requires */
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { FC } from "react";
import { Image, SafeAreaView, View } from "react-native";
import { Text } from "react-native-paper";

import { drawerStyles } from "./styles";

interface DrawerContentProps extends DrawerContentComponentProps<DrawerContentOptions> {
  /**
   * the version of the app
   */
  version: string;
}

/**
 * DrawerContent component used to display the drawer content in the app
 * @example
 * <DrawerContent {...props} version={version} />
 * @see https://reactnavigation.org/docs/drawer-navigator/
 */
export const DrawerContent: FC<DrawerContentProps> = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView>
        {/* dzcode.io logo */}
        <View>
          <Image source={require("../../../assets/png/logo.png")} style={drawerStyles.logoView} />
          <Text style={drawerStyles.version}>{props.version}</Text>
        </View>
        {/* Drawer items */}
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};
