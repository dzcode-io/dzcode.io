import { createStackNavigator } from "@react-navigation/stack";
import { StackHeaderMode } from "@react-navigation/stack/lib/typescript/src/types";
import React, { FC } from "react";
import { Route } from "src/types";

const { Navigator, Screen } = createStackNavigator();

interface StackNavProps {
  routes: Route[];
  initialRouteName?: string;
  headerMode?: StackHeaderMode;
}

export const StackNav: FC<StackNavProps> = ({ routes, initialRouteName, headerMode }) => {
  return (
    <Navigator initialRouteName={initialRouteName} headerMode={headerMode}>
      {routes.map(({ name, component, label }) => (
        <Screen key={name} name={name} component={component} options={{ title: label }} />
      ))}
    </Navigator>
  );
};
