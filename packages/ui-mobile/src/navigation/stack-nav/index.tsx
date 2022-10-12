import { createStackNavigator } from "@react-navigation/stack";
import { StackHeaderMode } from "@react-navigation/stack/lib/typescript/src/types";
import React, { VFC } from "react";
import type { Route } from "src/_types/route";

const { Navigator, Screen } = createStackNavigator();

interface StackNavProps {
  routes: Route[];
  initialRouteName?: string;
  headerMode?: StackHeaderMode;
}

/**
 * StackNav component used to create a stack navigation
 * @prop {Route[]} routes - the routes of the stack navigation
 * @prop {string} initialRouteName - the initial route name of the stack navigation
 * @prop {StackHeaderMode} headerMode - the header mode of the stack navigation
 * @example
 * <StackNav
 *    routes={routes}
 *    initialRouteName="contribute"
 *    headerMode="none"
 * />
 */
export const StackNav: VFC<StackNavProps> = ({ routes, initialRouteName, headerMode }) => {
  return (
    <Navigator initialRouteName={initialRouteName} headerMode={headerMode}>
      {routes.map(({ name, component, label }) => (
        <Screen key={name} name={name} component={component} options={{ title: label }} />
      ))}
    </Navigator>
  );
};
