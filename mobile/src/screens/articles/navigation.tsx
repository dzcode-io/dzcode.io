import React, { FC } from "react";
import ArticleDetailsScreen from "./article-details";
import ArticlesListScreen from "./articles-list";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

const Navigation: FC = () => {
  return (
    <Navigator initialRouteName={"ArticlesList"} headerMode={"none"}>
      <Screen name="ArticlesList" component={ArticlesListScreen} />
      <Screen name="ArticleDetails" component={ArticleDetailsScreen} />
    </Navigator>
  );
};
export default Navigation;
