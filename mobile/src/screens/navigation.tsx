import { AppBar } from "@dzcode.io.mobile/ui/dist/app-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import React, { FC } from "react";
import { DrawerContent } from "src/components/drawer-content";

import { Navigation as ArticlesStack } from "./articles/navigation";
import { ContributeScreen } from "./contribute";
import { FAQScreen } from "./faq";
import { Navigation as DocumentsStack } from "./learn/navigation";
import { ProjectsScreen } from "./projects";

const { Navigator, Screen } = createDrawerNavigator();

interface Route {
  name: string;
  title: string;
  label: string;
  component: React.ComponentType;
}

const routes: Route[] = [
  {
    name: "contribute" as const,
    title: "Contribution Gallery",
    label: "Contribute",
    component: ContributeScreen,
  },
  {
    name: "learn",
    title: "Read & Learn",
    label: "Learn",
    component: DocumentsStack,
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
      initialRouteName="contribute"
      drawerType="back"
      screenOptions={{
        headerShown: true,
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
