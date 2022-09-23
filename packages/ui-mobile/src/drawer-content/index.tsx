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

export const DrawerContent: FC<
  DrawerContentComponentProps<DrawerContentOptions> & { version: string }
> = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView>
        {/* dzcode.io logo */}
        <View>
          <Image source={require("../../assets/png/logo.png")} style={drawerStyles.logoView} />
          <Text style={drawerStyles.version}>{props.version}</Text>
        </View>
        {/* Drawer items */}
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};
