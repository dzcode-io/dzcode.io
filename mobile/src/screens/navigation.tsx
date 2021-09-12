import { AppBar } from "../components/app-bar";
import { DrawerContent } from "../components/drawer-content";
import React, { FC } from "react";
import ArticlesStack from "./articles/navigation";
import ContributeScreen from "./contribute";
import { DrawerActions } from "@react-navigation/native";
import FAQScreen from "./faq";
import HomeScreen from "./home";
import LearnScreen from "./learn";
import ProjectsScreen from "./projects";
import { createDrawerNavigator } from "@react-navigation/drawer";

const { Navigator, Screen } = createDrawerNavigator();

const Navigation: FC = () => {
  return (
    <Navigator
      initialRouteName="Home"
      drawerType="back"
      screenOptions={{
        headerShown: true,
        /* eslint-disable react/display-name */
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
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Contribute" component={ContributeScreen} />
      <Screen name="Learn" component={LearnScreen} />
      <Screen name="Projects" component={ProjectsScreen} />
      <Screen name="Articles" component={ArticlesStack} />
      <Screen name="FAQ" component={FAQScreen} />
    </Navigator>
  );
};
export default Navigation;
