import { Article } from "@dzcode.io/api/dist/app/types/legacy";
import { useNavigation } from "@react-navigation/native";
import { Route } from "@react-navigation/routers";
import React, { FC, useEffect } from "react";
import { Image, SafeAreaView, ScrollView, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { DZCodeLoading } from "../../../components/loading";
import { Dispatch, StateInterface } from "../../../redux";
import { fetchArticle } from "../../../redux/actions/articles-screen";
import { ArticlesScreenState } from "../../../redux/reducers/articles-screen";
import { GeneralState } from "../../../redux/reducers/general";
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
  const { articles, refreshing } = useSelector<StateInterface, ArticlesScreenState>(
    (state) => state.articlesScreen,
  );
  const { theme } = useSelector<StateInterface, GeneralState>((state) => state.general);

  const dispatch = useDispatch<Dispatch<ArticlesScreenState>>();

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchArticle(route.params.article.slug));
  }, []);

  return (
    <SafeAreaView style={globalStyles.mainView}>
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
            style={articleDetailsStyles.image}
          />
          <Text style={articleDetailsStyles.authorsText}>{route.params.article.title}</Text>
          <Text style={articleDetailsStyles.descriptionText}>
            {articles?.find((article) => article.slug === route.params.article.slug)?.description}
          </Text>
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
            {articles?.find((article) => article.slug === route.params.article.slug)?.content || ""}
          </Markdown>
          <Text style={articleDetailsStyles.authorsText}>
            Authors:{" "}
            {articles
              ?.find((article) => article.slug === route.params.article.slug)
              ?.authors?.join(", ")}
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
