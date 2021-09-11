import { AppBar, DrawerContent } from "../components/shared";
import React, { FC } from "react";
import ArticlesStack from "./articles/navigation";
import ContributeUI from "./contribute/ui/contribute-ui";
import { DrawerActions } from "@react-navigation/native";
import FAQUI from "./faq/ui/faq-ui";
import HomeUI from "./home/ui/home-ui";
import LearnUI from "./learn/ui/learn-ui";
import ProjectsUI from "./projects/ui/projects-ui";
import { createDrawerNavigator } from "@react-navigation/drawer";

// create drawer navigator
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
      <Screen name="Home" component={HomeUI} />
      <Screen name="Contribute" component={ContributeUI} />
      <Screen name="Learn" component={LearnUI} />
      <Screen name="Projects" component={ProjectsUI} />
      <Screen name="Articles" component={ArticlesStack} />
      <Screen name="FAQ" component={FAQUI} />
    </Navigator>
  );
};
export default Navigation;
