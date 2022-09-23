import React, { FC } from "react";
import { Appbar, useTheme } from "react-native-paper";

interface AppbarProps {
  title: string;
  openDrawer: VoidFunction;
}

export const AppBar: FC<AppbarProps> = ({ title, openDrawer }) => {
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
