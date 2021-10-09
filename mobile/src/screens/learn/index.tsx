import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, StateInterface } from "../../redux";
import { LearnScreenState } from "../../redux/reducers/learn-screen";
import { DZCodeLoading } from "../../components/loading";
import { fetchDocuments } from "../../redux/actions/learn-screen";
import { FlatList, SafeAreaView, View } from "react-native";
import { Text, Divider } from "react-native-paper";
import { globalStyles } from "../../styles/global";

export const LearnScreen: FC = () => {
  const { documents, refreshing } = useSelector<StateInterface, LearnScreenState>(
    (state) => state.learnScreen,
  );

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
          renderItem={({ item }) => <Text>{JSON.stringify(item)}</Text>}
        />
      ) : (
        <View style={globalStyles.centerView}>
          <DZCodeLoading />
        </View>
      )}
    </SafeAreaView>
  );
};
