import { ArticleEntity } from "@dzcode.io/models/dist/article";
import { useNavigation } from "@dzcode.io/ui-mobile/dist/_hooks/use-navigation";
import type { RouteParam } from "@dzcode.io/ui-mobile/dist/_types/route-param";
import { ErrorBoundary } from "@dzcode.io/ui-mobile/dist/error-boundary";
import { DZCodeLoading } from "@dzcode.io/ui-mobile/dist/loading";
import { Markdown } from "@dzcode.io/ui-mobile/dist/markdown";
import { Text } from "@dzcode.io/ui-mobile/dist/text/text";
import { TryAgain } from "@dzcode.io/ui-mobile/dist/try-again";
import { isLoaded } from "@dzcode.io/utils/dist/loadable";
import React, { FC, useEffect } from "react";
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux";
import { fetchArticle } from "src/redux/actions/articles-screen";
import { useArticlesSliceSelector } from "src/redux/reducers/articles-screen/slice";
import { globalStyles } from "src/styles/global";
import { openLink } from "src/utils/link";

import { articleDetailsStyles } from "./styles";

interface ArticleDetailsScreenProps {
  route: RouteParam<"article-details", RouteParams>;
}

interface RouteParams {
  article: ArticleEntity;
}

export const ArticleDetailsScreen: FC<ArticleDetailsScreenProps> = ({
  route,
}: ArticleDetailsScreenProps) => {
  const { articles, status } = useArticlesSliceSelector();
  const loadedArticles = isLoaded(articles);
  const currentArticle = (
    loadedArticles?.filter((article) => (article as ArticleEntity).content) as ArticleEntity[]
  ).find((article) => article.slug === route.params.article.slug);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();

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
              content={currentArticle.content!}
              onLinkPress={(url) => openLink(url, navigation)}
            />
            {currentArticle.authors.length > 0 &&
              currentArticle.authors.find((a) => !a.id.includes("undefined")) && (
                <>
                  <Text style={articleDetailsStyles.authorsText}>This article is written by</Text>
                  <View style={articleDetailsStyles.authorAvatars}>
                    {currentArticle.authors?.map((author) => (
                      <TouchableOpacity key={author.id} onPress={() => openLink(author.link)}>
                        <Image
                          source={{ uri: author?.image }}
                          style={articleDetailsStyles.avatar}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
            {currentArticle.contributors.length > 0 && (
              <>
                <Text style={articleDetailsStyles.authorsText}>With the help of</Text>
                <View style={articleDetailsStyles.authorAvatars}>
                  {currentArticle.contributors?.map((contributor) => (
                    <TouchableOpacity
                      key={contributor.id}
                      onPress={() => openLink(contributor.link)}
                    >
                      <Image
                        source={{ uri: contributor?.image }}
                        style={articleDetailsStyles.avatar}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
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
