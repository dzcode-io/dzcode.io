import { useNavigation } from "@react-navigation/native";
import React, { FC, useEffect } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Button, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { ErrorBoundary } from "../../../components/error-boundary";
import { DZCodeLoading } from "../../../components/loading";
import { TryAgain } from "../../../components/try-again";
import { Dispatch, StateInterface } from "../../../redux";
import { AppDispatch } from "../../../store";
import { selectDocuments } from "../../../store/learn-screen/selectors/documents";
import { selectLearnStatus } from "../../../store/learn-screen/selectors/status";
import { fetchDocuments } from "../../../store/learn-screen/slice";
import { globalStyles } from "../../../styles/global";
import { documentsListStyles } from "./styles";

export const DocumentsListScreen: FC = () => {
  const documents = useSelector(selectDocuments);
  const status = useSelector(selectLearnStatus);

  const navigation = useNavigation();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchDocuments());
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaView style={globalStyles.mainView}>
        {status === "error" ? (
          <TryAgain
            error="Ops, an error occurred while loading the documentation, please try again..."
            action="Try Again"
            onClick={() => dispatch(fetchDocuments())}
          />
        ) : documents ? (
          <FlatList
            data={documents}
            onRefresh={() => dispatch(fetchDocuments())}
            refreshing={status === "loading"}
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
    </ErrorBoundary>
  );
};
