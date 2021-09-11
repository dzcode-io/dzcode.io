import { Route } from "@react-navigation/routers";
import React, { FC } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Article } from "../../../../.common/types";
import { globalStyles } from "../../../../styles";

interface ArticleDetailsScreenProps {
  route: Route<"ArticleDetails", RouteParams>;
}

interface RouteParams {
  article: Article;
}

const ArticleDetailsScreen: FC<ArticleDetailsScreenProps> = ({
  route,
}: ArticleDetailsScreenProps) => {
  console.log("props", route.params.article);

  return (
    <View style={globalStyles.mainView}>
      <Text>{JSON.stringify(route.params.article)}</Text>
    </View>
  );
};

export default ArticleDetailsScreen;
