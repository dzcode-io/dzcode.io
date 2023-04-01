import { createStackNavigator } from "@react-navigation/stack";
import { StackHeaderMode } from "@react-navigation/stack/lib/typescript/src/types";
import { FC } from "react";
import type { Route } from "src/_types/route";

const { Navigator, Screen } = createStackNavigator();

interface StackNavProps {
  /**
   * the routes of the stack navigation
   */
  routes: Route[];
  /**
   * the initial route name of the stack navigation
   */
  initialRouteName?: string;
  /**
   * the header mode of the stack navigation
   */
  headerMode?: StackHeaderMode;
}

/**
 * StackNav component used to create a stack navigation
 * @example
 * <StackNav
 *    routes={routes}
 *    initialRouteName="contribute"
 *    headerMode="none"
 * />
 * @see https://reactnavigation.org/docs/stack-navigator/
 */
export const StackNav: FC<StackNavProps> = ({ routes, initialRouteName, headerMode }) => {
  return (
    <Navigator initialRouteName={initialRouteName} headerMode={headerMode}>
      {routes.map(({ name, component, label }) => (
        <Screen key={name} name={name} component={component} options={{ title: label }} />
      ))}
    </Navigator>
  );
};
