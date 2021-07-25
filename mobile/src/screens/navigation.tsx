import { AppBar, DrawerContent } from "../components/shared";
import React, { FC } from "react";
import ArticlesUI from "./articles/ui/articles-ui";
import ContributeUI from "./contribute/ui/contribute-ui";
import { DrawerActions } from "@react-navigation/native";
import FAQUI from "./faq/ui/faq-ui";
import HomeUI from "./home/ui/home-ui";
import LearnUI from "./learn/ui/learn-ui";
import ProjectsUI from "./projects/ui/projects-ui";
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
