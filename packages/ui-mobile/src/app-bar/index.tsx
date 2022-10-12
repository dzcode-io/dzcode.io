import React, { FC } from "react";
import { Appbar, useTheme } from "react-native-paper";

interface AppBarProps {
  title: string;
  openDrawer: VoidFunction;
}

/**
 * AppBar component used to display the app bar in the app
 * @prop {string} title - the title of the app bar
 * @prop {VoidFunction} openDrawer - a function that opens the drawer
 * @example
 * <DrawerNav
 *    routes={routes}
 *    initialRouteName="contribute"
 *    header={(props) => (
 *      <AppBar
 *        title={routes.find(({ name }) => name === props.scene.route.name)?.title || ""}
 *        openDrawer={() => props.scene.descriptor.navigation.dispatch(DrawerActions.openDrawer())}
 *      />
 *    )}
 * />
 */
export const AppBar: FC<AppBarProps> = ({ title, openDrawer }) => {
  const theme = useTheme();

  return (
    <Appbar.Header theme={{ colors: { primary: theme?.colors.surface } }}>
      {/* Appbar content */}
      <Appbar.Action
        icon="menu"
        onPress={() => openDrawer()}
        hasTVPreferredFocus
        tvParallaxProperties
      />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};
