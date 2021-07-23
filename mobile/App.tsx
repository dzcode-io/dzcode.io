// import react native
import React, { FC } from "react";

// import react native paper
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

// import navigation container
import { NavigationContainer } from "@react-navigation/native";

// import screens
import Navigation from "./src/screens/Navigation";

// import colors
import Colors from "./src/styles/Colors";

// define default theme
const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.accent,
    background: Colors.primary,
  },
};

const App: FC = (): JSX.Element => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </PaperProvider>
  );
};
export default App;
