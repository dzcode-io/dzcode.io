// import react native
import React, { FC, useContext } from "react";
import PropTypes from "prop-types";

// import react native paper
import { Appbar, Text, Switch, useTheme } from "react-native-paper";

// import utils
import { PrefrencesContext } from "../../utils/constants";

// import styles
import Colors from "../../styles/Colors";
import { drawerStyles } from "../../styles";

// define Appbar props interface
interface AppbarProps {
  title: string;
  openDrawer: VoidFunction;
}

// export Appbar component
const AppBar: FC<AppbarProps> = ({ title, openDrawer }): JSX.Element => {
  // use theme
  const theme = useTheme();

  // use theme context
  const { toggleTheme, isThemeDark } = useContext(PrefrencesContext);

  return (
    // Appbar header
    <Appbar.Header theme={{ colors: { primary: theme?.colors.surface } }}>
      {/* Appbar content */}
      <Appbar.Action icon="menu" onPress={() => openDrawer()} />
      <Appbar.Content title={title} />
      {/* Dark theme switch */}
      <Text>Dark</Text>
      <Switch
        onValueChange={() => toggleTheme()}
        color={Colors.accent}
        value={isThemeDark}
        style={drawerStyles.switchView}
      />
    </Appbar.Header>
  );
};
export default AppBar;

AppBar.propTypes = {
  title: PropTypes.string.isRequired,
  openDrawer: PropTypes.func.isRequired,
};
