import React, { FC, useEffect } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { ErrorBoundary } from "../../components/error-boundary";
import { DZCodeLoading } from "../../components/loading";
import { TryAgain } from "../../components/try-again";
import { Dispatch, StateInterface } from "../../redux";
import { fetchProjects } from "../../redux/actions/projects-screen";
import { ProjectsScreenState } from "../../redux/reducers/projects-screen";
import { globalStyles } from "../../styles/global";
import { CardItemMemoed } from "./card-item";

export const ProjectsScreen: FC = () => {
  const { projects, refreshing } = useSelector<StateInterface, ProjectsScreenState>(
    (state) => state.projectsScreen,
  );

  const dispatch = useDispatch<Dispatch<ProjectsScreenState>>();

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaView style={globalStyles.mainView}>
        {projects === "ERROR" ? (
          <TryAgain
            error="Ops, an error occurred while loading the projects, please try again..."
            action="Try Again"
            onClick={() => dispatch(fetchProjects())}
          />
        ) : projects ? (
          <FlatList
            data={projects}
            onRefresh={() => dispatch(fetchProjects())}
            refreshing={refreshing}
            keyExtractor={(item, index) => `item-${index}`}
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
