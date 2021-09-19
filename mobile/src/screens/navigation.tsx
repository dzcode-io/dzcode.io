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

interface Route {
  name: string;
  title: string;
  label: string;
  component: React.ComponentType;
}

const routes: Route[] = [
  { name: "home", title: "Welcome to DzCode i/o", label: "Home", component: HomeScreen },
  {
    name: "contribute",
    title: "Contribution Gallery",
    label: "Contribute",
    component: ContributeScreen,
  },
  {
    name: "learn",
    title: "Read & Learn",
    label: "Learn",
    component: LearnScreen,
  },
  {
    name: "projects",
    title: "Projects Gallery",
    label: "DZ Open-Source Projects",
    component: ProjectsScreen,
  },
  {
    name: "articles",
    title: "Articles",
    label: "Read Articles",
    component: ArticlesStack,
  },
  {
    name: "faq",
    title: "Frequently Asked Questions",
    label: "Have a Question?",
    component: FAQScreen,
  },
];

export const Navigation: FC = () => {
  return (
    <Navigator
      initialRouteName="home"
      drawerType="back"
      screenOptions={{
        headerShown: true,
        // eslint-disable-next-line react/display-name
        header: (props) => (
          <AppBar
            title={routes.find(({ name }) => name === props.scene.route.name)?.title || ""}
            openDrawer={() =>
              props.scene.descriptor.navigation.dispatch(DrawerActions.openDrawer())
            }
          />
        ),
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      {routes.map(({ name, component, label }) => (
        <Screen key={name} name={name} component={component} options={{ title: label }} />
      ))}
    </Navigator>
  );
};
