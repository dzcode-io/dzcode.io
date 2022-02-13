import { useNavigation } from "@react-navigation/native";
import React, { FC, useEffect } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Button, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { DZCodeLoading } from "../../../components/loading";
import { Dispatch, StateInterface } from "../../../redux";
import { fetchDocuments } from "../../../redux/actions/learn-screen";
import { LearnScreenState } from "../../../redux/reducers/learn-screen";
import { globalStyles } from "../../../styles/global";
import { documentsListStyles } from "./styles";

export const DocumentsListScreen: FC = () => {
  const { documents, refreshing } = useSelector<StateInterface, LearnScreenState>(
    (state) => state.learnScreen,
  );

  const navigation = useNavigation();

  const dispatch = useDispatch<Dispatch<LearnScreenState>>();

  useEffect(() => {
    dispatch(fetchDocuments());
  }, []);

  return (
    <SafeAreaView style={globalStyles.mainView}>
      {documents ? (
        <FlatList
          data={documents}
          onRefresh={() => dispatch(fetchDocuments())}
          refreshing={refreshing}
          ItemSeparatorComponent={() => <Divider />}
          keyExtractor={(item, index) => `item-${index}`}
          renderItem={({ item }) => (
            <Button
              style={documentsListStyles.button}
              onPress={() => navigation.navigate("document-details", { document: item })}
            >
              {item.slug.includes("/") ? `   ${item.title}` : item.title}
            </Button>
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
