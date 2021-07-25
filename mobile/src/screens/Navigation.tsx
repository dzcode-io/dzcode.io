import { AppBar, DrawerContent } from "../components/Shared";
import React, { FC } from "react";
import ArticlesUI from "./Articles/ui/ArticlesUI";
import ContributeUI from "./Contribute/ui/ContributeUI";
import { DrawerActions } from "@react-navigation/native";
import FAQUI from "./FAQ/ui/FAQUI";
import HomeUI from "./Home/ui/HomeUI";
import LearnUI from "./Learn/ui/LearnUI";
import ProjectsUI from "./Projects/ui/ProjectsUI";
import { createDrawerNavigator } from "@react-navigation/drawer";

// create drawer navigation
const Drawer = createDrawerNavigator();

const Navigation: FC = (): JSX.Element => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="back"
      screenOptions={{
        headerShown: true,
        /* eslint-disable react/prop-types, react/display-name */
        header: (props) => (
          <AppBar
            title={props.scene.route.name}
            openDrawer={() =>
              props.scene.descriptor.navigation.dispatch(DrawerActions.openDrawer())
            }
          />
        ),
        /* eslint-enable react/prop-types, react/display-name */
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
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
