import { Route } from "@react-navigation/routers";
import React, { FC, useEffect } from "react";
import { View, ScrollView, Linking } from "react-native";
import { Text } from "react-native-paper";
import { Article } from "../../../../.common/types";
import { globalStyles } from "../../../../styles";
import { DZCodeLoading } from "../../../../components/shared";
import { fetchArticle } from "../../../../redux/actions/articles-page";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, StateInterface } from "../../../../redux";
import { ArticlesPageState } from "../../../../redux/reducers/articles-page";
import { MarkdownView } from "react-native-markdown-view";

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
          <MarkdownView
            onLinkPress={(url) => {
              try {
                Linking.openURL(url);
              } catch {
                alert("Can't open browser");
              }
            }}
          >
            {articles?.find((article) => article.slug === route.params.article.slug)?.content}
          </MarkdownView>
        </ScrollView>
      )}
    </View>
  );
};

export default ArticleDetailsScreen;
