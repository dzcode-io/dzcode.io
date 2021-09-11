import {} from "../functions";
import React, { FC, useEffect } from "react";
import { Text, Button, Divider } from "react-native-paper";
import { View, FlatList, Image } from "react-native";
import { globalStyles } from "../../../../styles";
import { Dispatch, StateInterface } from "../../../../redux";
import { useDispatch, useSelector } from "react-redux";
import { ArticlesPageState } from "../../../../redux/reducers/articles-page";
import { fetchArticles } from "../../../../redux/actions/articles-page";
import { DZCodeLoading } from "../../../../components/shared";
import { useNavigation } from "@react-navigation/native";

const ArticlesListScreen: FC = () => {
  const { articles, refreshing } = useSelector<StateInterface, ArticlesPageState>(
    (state) => state.articlesPage,
  );

  const navigation = useNavigation();

  const dispatch = useDispatch<Dispatch<ArticlesPageState>>();

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    // main view
    <View style={globalStyles.mainView}>
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
                style={{
                  height: 50,
                  marginVertical: 5,
                  justifyContent: "center",
                  alignSelf: "flex-start",
                }}
                onPress={() => {
                  navigation.navigate("ArticleDetails", {
                    article: item,
                  });
                }}
              >
                {item.title} - {JSON.stringify(item.githubAuthors)}
              </Button>
            </View>
          )}
        />
      ) : (
        <View style={globalStyles.centerView}>
          <DZCodeLoading />
        </View>
      )}
    </View>
  );
};
export default ArticlesListScreen;
