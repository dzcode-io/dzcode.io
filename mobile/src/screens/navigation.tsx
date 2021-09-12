import React, { FC } from "react";
import { AppBar } from "../components/app-bar";
import { Navigation as ArticlesStack } from "./articles/navigation";
import { ContributeScreen } from "./contribute";
import { DrawerActions } from "@react-navigation/native";
import { DrawerContent } from "../components/drawer-content";
import { FAQScreen } from "./faq";
import { HomeScreen } from "./home";
import { LearnScreen } from "./learn";
import { ProjectsScreen } from "./projects";
import { createDrawerNavigator } from "@react-navigation/drawer";

const { Navigator, Screen } = createDrawerNavigator();

export const Navigation: FC = () => {
  return (
    <Navigator
      initialRouteName="home"
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
      <Screen name="home" component={HomeScreen} />
      <Screen name="contribute" component={ContributeScreen} />
      <Screen name="learn" component={LearnScreen} />
      <Screen name="projects" component={ProjectsScreen} />
      <Screen name="articles" component={ArticlesStack} />
      <Screen name="faq" component={FAQScreen} />
    </Navigator>
  );
};
