import { Appbar, useTheme } from "react-native-paper";
import React, { FC } from "react";

// define Appbar props interface
interface AppbarProps {
  title: string;
  openDrawer: VoidFunction;
}

// export Appbar component
const AppBar: FC<AppbarProps> = ({ title, openDrawer }) => {
  // use theme
  const theme = useTheme();

  return (
    // Appbar header
    <Appbar.Header theme={{ colors: { primary: theme?.colors.surface } }}>
      {/* Appbar content */}
      <Appbar.Action icon="menu" onPress={() => openDrawer()} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};
export default AppBar;
