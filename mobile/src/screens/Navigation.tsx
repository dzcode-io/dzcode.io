// import react native
import React, { FC } from "react";

// import drawer navigation
import { createDrawerNavigator } from "@react-navigation/drawer";

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
    <Drawer.Navigator initialRouteName="Home" drawerType="back">
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
