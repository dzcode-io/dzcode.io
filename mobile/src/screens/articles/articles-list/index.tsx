import { Button } from "@dzcode.io/ui-mobile/dist/button";
import { Divider } from "@dzcode.io/ui-mobile/dist/divider";
import { ErrorBoundary } from "@dzcode.io/ui-mobile/dist/error-boundary";
import { useNavigation } from "@dzcode.io/ui-mobile/dist/hooks";
import { DZCodeLoading } from "@dzcode.io/ui-mobile/dist/loading";
import { TryAgain } from "@dzcode.io/ui-mobile/dist/try-again";
import React, { FC, useEffect } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux";
import { fetchArticles } from "src/redux/actions/articles-screen";
import { useArticlesSliceSelector } from "src/redux/reducers/articles-screen/slice";
import { globalStyles } from "src/styles/global";

import { articlesListStyles } from "./styles";

export const ArticlesListScreen: FC = () => {
  const { articles, status } = useArticlesSliceSelector();

  const navigation = useNavigation();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaView style={globalStyles.mainView}>
        {status === "error" ? (
          <TryAgain
            error="Ops, an error occurred while loading the articles, please try again..."
            action="Try Again"
            onClick={() => dispatch(fetchArticles())}
          />
        ) : articles ? (
          <FlatList
            data={articles}
            onRefresh={() => dispatch(fetchArticles())}
            refreshing={status === "loading"}
            ItemSeparatorComponent={() => <Divider />}
            keyExtractor={(item, index) => `item-${index}`}
            renderItem={({ item }) => (
              <View>
                <Button
                  style={articlesListStyles.button}
                  onPress={() => {
                    navigation.navigate("article-details", {
                      article: item,
                    });
                  }}
                >
                  {item.title}
                </Button>
              </View>
            )}
          />
        ) : (
          <View style={globalStyles.centerView}>
            <DZCodeLoading />
          </View>
        )}
      </SafeAreaView>
    </ErrorBoundary>
  );
};
