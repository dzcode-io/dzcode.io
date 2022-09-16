import React, { FC, useEffect } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";
import { ErrorBoundary } from "src/components/error-boundary";
import { DZCodeLoading } from "src/components/loading";
import { TryAgain } from "src/components/try-again";
import { AppDispatch } from "src/redux";
import { fetchProjects } from "src/redux/actions/projects-screen";
import { useProjectsSliceSelector } from "src/redux/reducers/projects-screen/slice";
import { globalStyles } from "src/styles/global";

import { CardItemMemoed } from "./card-item";

export const ProjectsScreen: FC = () => {
  const { projects, status } = useProjectsSliceSelector();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaView style={globalStyles.mainView}>
        {status === "error" ? (
          <TryAgain
            error="Ops, an error occurred while loading the projects, please try again..."
            action="Try Again"
            onClick={() => dispatch(fetchProjects())}
          />
        ) : projects ? (
          <FlatList
            data={projects}
            onRefresh={() => dispatch(fetchProjects())}
            refreshing={status === "loading"}
            keyExtractor={(_, index) => `item-${index}`}
            renderItem={({ item }) => <CardItemMemoed project={item} />}
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
