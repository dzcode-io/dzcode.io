import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArticlesListScreen from "./articles-list/ui/articles-list-screen";
import ArticleDetailsScreen from "./article-details/ui/article-details-screen";

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
