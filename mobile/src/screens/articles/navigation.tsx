import React, { FC } from "react";
import { ArticleDetailsScreen } from "./article-details";
import { ArticlesListScreen } from "./articles-list";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

export const Navigation: FC = () => {
  return (
    <Navigator initialRouteName={"articles-list"} headerMode={"none"}>
      <Screen name="articles-list" component={ArticlesListScreen} />
      <Screen name="article-details" component={ArticleDetailsScreen} />
    </Navigator>
  );
};
