import { useNavigation } from "@react-navigation/native";
import React, { FC, useEffect } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Button, Divider } from "react-native-paper";
import { useDispatch } from "react-redux";
import { ErrorBoundary } from "src/components/error-boundary";
import { DZCodeLoading } from "src/components/loading";
import { TryAgain } from "src/components/try-again";
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
