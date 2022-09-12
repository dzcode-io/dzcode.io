import React, { FC, useEffect } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";

import { ErrorBoundary } from "../../components/error-boundary";
import { DZCodeLoading } from "../../components/loading";
import { TryAgain } from "../../components/try-again";
import { AppDispatch } from "../../redux";
import { fetchProjects } from "../../redux/actions/projects-screen";
import { useProjectsSliceSelector } from "../../redux/reducers/projects-screen/slice";
import { globalStyles } from "../../styles/global";
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
