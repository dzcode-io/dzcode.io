// import react native
import React, { FC, useContext } from "react";
import { View } from "react-native";

// import react native paper
import {
  Appbar,
  TouchableRipple,
  Button,
  Text,
  Switch,
  useTheme,
} from "react-native-paper";

// import utils
import { PrefrencesContext } from "../../utils/constants";

// import styles
import Colors from "../../styles/Colors";

// define Appbar props interface
interface AppbarProps {
  title: string;
}

// export Appbar component
const AppBar: FC<AppbarProps> = ({ title }): JSX.Element => {
  // use theme
  const theme = useTheme();

  // use theme context
  const { toggleTheme, isThemeDark } = useContext(PrefrencesContext);

  return (
    // Appbar header
    <Appbar.Header theme={{ colors: { primary: theme?.colors.surface } }}>
      {/* Appbar content */}
      <Appbar.Content title={title} />
      {/* Dark theme switch */}
      <Text>Dark</Text>
      <Switch
        onValueChange={() => toggleTheme()}
        color={Colors.accent}
        value={isThemeDark}
      />
    </Appbar.Header>
  );
};
export default AppBar;
