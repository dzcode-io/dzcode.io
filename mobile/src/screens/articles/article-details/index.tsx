import { Article } from "@dzcode.io/api/dist/app/types/legacy";
import { isLoaded } from "@dzcode.io/utils/dist/loadable";
import { useNavigation } from "@react-navigation/native";
import { Route } from "@react-navigation/routers";
import React, { FC, useEffect } from "react";
import { Image, SafeAreaView, ScrollView, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { ErrorBoundary } from "../../../components/error-boundary";
import { DZCodeLoading } from "../../../components/loading";
import { TryAgain } from "../../../components/try-again";
import { AppDispatch } from "../../../store";
import { selectArticles } from "../../../store/articles-screen/selectors/articles";
import { selectArticlesStatus } from "../../../store/articles-screen/selectors/status";
import { fetchArticle } from "../../../store/articles-screen/slice";
import { selectTheme } from "../../../store/general/selectors/theme";
import { globalStyles } from "../../../styles/global";
import { openLink } from "../../../utils/link";
import { articleDetailsStyles } from "./styles";

interface ArticleDetailsScreenProps {
  route: Route<"article-details", RouteParams>;
}

interface RouteParams {
  article: Article;
}

export const ArticleDetailsScreen: FC<ArticleDetailsScreenProps> = ({
  route,
}: ArticleDetailsScreenProps) => {
  const articles = useSelector(selectArticles);
  const status = useSelector(selectArticlesStatus);

  const loadedArticles = isLoaded(articles);
  const currentArticle = (
    loadedArticles?.filter((article) => (article as Article).content) as Article[]
  ).find((article) => article.slug === route.params.article.slug);

  const theme = useSelector(selectTheme);

  const dispatch = useDispatch<AppDispatch>();

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchArticle(route.params.article.slug));
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaView style={globalStyles.mainView}>
        {status === "loading" ? (
          <View style={globalStyles.centerView}>
            <DZCodeLoading />
          </View>
        ) : currentArticle ? (
          <ScrollView>
            <Image source={{ uri: currentArticle.image }} style={articleDetailsStyles.image} />
            <Text style={articleDetailsStyles.authorsText}>{route.params.article.title}</Text>
            <Text style={articleDetailsStyles.descriptionText}>{currentArticle.description}</Text>
            <Markdown
              style={{
                text: {
                  color: theme === "dark" ? "white" : "black",
                },
                /* eslint-disable camelcase */
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
                code_inline: {
                  color: theme === "dark" ? "white" : "black",
                  backgroundColor: theme === "dark" ? "black" : "white",
                },
                body: articleDetailsStyles.mdBody,
                /* eslint-enable camelcase */
              }}
              onLinkPress={(url) => {
                openLink(url, navigation);
                return true;
              }}
            >
              {currentArticle.content}
            </Markdown>
            <Text style={articleDetailsStyles.authorsText}>
              Authors: {currentArticle.authors?.join(", ")}
            </Text>
          </ScrollView>
        ) : (
          <TryAgain
            error="Ops, an error occurred while loading the selected article, please try again..."
            action="Try Again"
            onClick={() => dispatch(fetchArticle(route.params.article.slug))}
          />
        )}
      </SafeAreaView>
    </ErrorBoundary>
  );
};
