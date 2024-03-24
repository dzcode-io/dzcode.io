import { FC } from "react";
import { Appbar, useTheme } from "react-native-paper";

interface AppBarProps {
  /**
   * the title of the app bar
   */
  title: string;
  /**
   * the function that is called when the menu icon is pressed
   */
  openDrawer: VoidFunction;
}

/**
 * AppBar component used to display the app bar in the app
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
        tvParallaxProperties={{ enabled: true }}
      />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};
