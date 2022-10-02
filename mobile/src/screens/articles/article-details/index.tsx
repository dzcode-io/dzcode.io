import { Article } from "@dzcode.io/api/dist/app/types/legacy";
import { ErrorBoundary } from "@dzcode.io/ui-mobile/dist/error-boundary";
import { useNavigation } from "@dzcode.io/ui-mobile/dist/hooks";
import { DZCodeLoading } from "@dzcode.io/ui-mobile/dist/loading";
import { Text } from "@dzcode.io/ui-mobile/dist/text";
import { TryAgain } from "@dzcode.io/ui-mobile/dist/try-again";
import { RouteParam } from "@dzcode.io/ui-mobile/dist/types";
import { isLoaded } from "@dzcode.io/utils/dist/loadable";
import React, { FC, useEffect } from "react";
import { Image, SafeAreaView, ScrollView, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux";
import { fetchArticle } from "src/redux/actions/articles-screen";
import { useArticlesSliceSelector } from "src/redux/reducers/articles-screen/slice";
import { useGeneralSliceSelector } from "src/redux/reducers/general/slice";
import { globalStyles } from "src/styles/global";
import { openLink } from "src/utils/link";

import { articleDetailsStyles } from "./styles";

interface ArticleDetailsScreenProps {
  route: RouteParam<"article-details", RouteParams>;
}

interface RouteParams {
  article: Article;
}

export const ArticleDetailsScreen: FC<ArticleDetailsScreenProps> = ({
  route,
}: ArticleDetailsScreenProps) => {
  const { articles, status } = useArticlesSliceSelector();

  const loadedArticles = isLoaded(articles);
  const currentArticle = (
    loadedArticles?.filter((article) => (article as Article).content) as Article[]
  ).find((article) => article.slug === route.params.article.slug);

  const { theme } = useGeneralSliceSelector();

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
