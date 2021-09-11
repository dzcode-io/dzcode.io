import { AppBar, DrawerContent } from "../components/shared";
import React, { FC } from "react";
import ArticlesStack from "./articles/navigation";
import ContributeScreen from "./contribute/ui/contribute-screen";
import { DrawerActions } from "@react-navigation/native";
import FAQScreen from "./faq/ui/faq-screen";
import HomeScreen from "./home/ui/home-screen";
import LearnScreen from "./learn/ui/learn-screen";
import ProjectsScreen from "./projects/ui/projects-screen";
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
