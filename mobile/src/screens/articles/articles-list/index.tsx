import { useNavigation } from "@react-navigation/native";
import React, { FC, useEffect } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Button, Divider } from "react-native-paper";
import { useDispatch } from "react-redux";

import { ErrorBoundary } from "../../../components/error-boundary";
import { DZCodeLoading } from "../../../components/loading";
import { TryAgain } from "../../../components/try-again";
import { AppDispatch } from "../../../redux";
import { fetchArticles } from "../../../redux/actions/articles-screen";
import { useArticlesSliceSelector } from "../../../redux/reducers/articles-screen/slice";
import { globalStyles } from "../../../styles/global";
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
