// import react native
import React, { FC } from "react";

// import drawer navigation
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";

// import components
import { AppBar } from "../components/Shared";

// create drawer navigation
const Drawer = createDrawerNavigator();

// import screens
import HomeUI from "./Home/ui/HomeUI";
import ContributeUI from "./Contribute/ui/ContributeUI";
import LearnUI from "./Learn/ui/LearnUI";
import ProjectsUI from "./Projects/ui/ProjectsUI";
import ArticlesUI from "./Articles/ui/ArticlesUI";
import FAQUI from "./FAQ/ui/FAQUI";

const Navigation: FC = (): JSX.Element => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="back"
      screenOptions={{
        headerShown: true,
        header: (props) => (
          <AppBar
            title={props.scene.route.name}
            openDrawer={() =>
              props.scene.descriptor.navigation.dispatch(
                DrawerActions.openDrawer()
              )
            }
          />
        ),
      }}
    >
      <Drawer.Screen name="Home" component={HomeUI} />
      <Drawer.Screen name="Contribute" component={ContributeUI} />
      <Drawer.Screen name="Learn" component={LearnUI} />
      <Drawer.Screen name="Projects" component={ProjectsUI} />
      <Drawer.Screen name="Articles" component={ArticlesUI} />
      <Drawer.Screen name="FAQ" component={FAQUI} />
    </Drawer.Navigator>
  );
};
export default Navigation;
