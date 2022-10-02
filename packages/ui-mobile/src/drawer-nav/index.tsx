import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import { DrawerHeaderProps } from "@react-navigation/drawer/lib/typescript/src/types";
import React, { VFC } from "react";
import { Route } from "src/types";

const { Navigator, Screen } = createDrawerNavigator();

interface DrawerNavProps {
  routes: Route[];
  initialRouteName?: string;
  header?: (props: DrawerHeaderProps) => React.ReactNode;
  drawerContent?: (props: DrawerContentComponentProps<DrawerContentOptions>) => React.ReactNode;
}

export const DrawerNav: VFC<DrawerNavProps> = ({
  routes,
  initialRouteName,
  header,
  drawerContent,
}) => {
  return (
    <Navigator
      initialRouteName={initialRouteName}
      drawerType="back"
      screenOptions={{
        headerShown: true,
        header,
      }}
      drawerContent={drawerContent}
    >
      {routes.map(({ name, component, label }) => (
        <Screen key={name} name={name} component={component} options={{ title: label }} />
      ))}
    </Navigator>
  );
};
