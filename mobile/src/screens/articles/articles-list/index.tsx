import { useNavigation } from "@react-navigation/native";
import React, { FC, useEffect } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Button, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { DZCodeLoading } from "../../../components/loading";
import { Dispatch, StateInterface } from "../../../redux";
import { fetchArticles } from "../../../redux/actions/articles-screen";
import { ArticlesScreenState } from "../../../redux/reducers/articles-screen";
import { globalStyles } from "../../../styles/global";
import { articlesListStyles } from "./styles";

export const ArticlesListScreen: FC = () => {
  const { articles, refreshing } = useSelector<StateInterface, ArticlesScreenState>(
    (state) => state.articlesScreen,
  );

  const navigation = useNavigation();

  const dispatch = useDispatch<Dispatch<ArticlesScreenState>>();

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    // main view
    <SafeAreaView style={globalStyles.mainView}>
      {articles ? (
        <FlatList
          data={articles}
          onRefresh={() => dispatch(fetchArticles())}
          refreshing={refreshing}
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
  );
};
