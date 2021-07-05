// import react native
import React, { FC } from "react";

// import navigation container
import { NavigationContainer } from "@react-navigation/native";

// import screens
import Navigation from "./src/screens/Navigation";

const App: FC = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};
export default App;
