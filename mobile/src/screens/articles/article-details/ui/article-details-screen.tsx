import { Route } from "@react-navigation/routers";
import React, { FC, useEffect } from "react";
import { View, ScrollView, Linking, Image } from "react-native";
import { Text } from "react-native-paper";
import { Article } from "../../../../.common/types";
import { globalStyles } from "../../../../styles";
import { DZCodeLoading } from "../../../../components/shared";
import { fetchArticle } from "../../../../redux/actions/articles-page";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, StateInterface } from "../../../../redux";
import { ArticlesPageState } from "../../../../redux/reducers/articles-page";
import Markdown from "react-native-markdown-display";
import { GeneralState } from "../../../../redux/reducers/general";

interface ArticleDetailsScreenProps {
  route: Route<"ArticleDetails", RouteParams>;
}

interface RouteParams {
  article: Article;
}

const ArticleDetailsScreen: FC<ArticleDetailsScreenProps> = ({
  route,
}: ArticleDetailsScreenProps) => {
  const { articles, refreshing } = useSelector<StateInterface, ArticlesPageState>(
    (state) => state.articlesPage,
  );
  const { theme } = useSelector<StateInterface, GeneralState>((state) => state.general);

  const dispatch = useDispatch<Dispatch<ArticlesPageState>>();

  useEffect(() => {
    dispatch(fetchArticle(route.params.article.slug));
  }, []);

  return (
    <View style={globalStyles.mainView}>
      {refreshing ? (
        <View style={globalStyles.centerView}>
          <DZCodeLoading />
        </View>
      ) : (
        <ScrollView>
          <Image
            source={{
              uri: articles?.find((article) => article.slug === route.params.article.slug)?.image,
            }}
            style={{ width: "100%", height: 200 }}
          />
          <Markdown
            style={{
              text: {
                color: theme === "dark" ? "white" : "black",
              },
              bullet_list: {
                color: theme === "dark" ? "white" : "black",
              },
              ordered_list: {
                color: theme === "dark" ? "white" : "black",
              },
              fence: {
                color: theme === "dark" ? "white" : "black",
                backgroundColor: theme === "dark" ? "black" : "white",
              },
              blockquote: {
                color: theme === "dark" ? "white" : "black",
                backgroundColor: theme === "dark" ? "black" : "white",
              },
              body: {
                marginHorizontal: 20,
              },
            }}
            onLinkPress={(url: string) => true}
          >
            {articles?.find((article) => article.slug === route.params.article.slug)?.content || ""}
          </Markdown>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            Authors:{" "}
            {articles
              ?.find((article) => article.slug === route.params.article.slug)
              ?.authors?.join(", ")}
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

export default ArticleDetailsScreen;
