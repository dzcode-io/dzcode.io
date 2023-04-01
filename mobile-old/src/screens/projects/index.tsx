import { ProjectCard } from "@dzcode.io/ui-mobile/dist/card/project-card";
import { ErrorBoundary } from "@dzcode.io/ui-mobile/dist/error-boundary";
import { DZCodeLoading } from "@dzcode.io/ui-mobile/dist/loading";
import { TryAgain } from "@dzcode.io/ui-mobile/dist/try-again";
import React, { FC, useEffect } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux";
import { fetchProjects } from "src/redux/actions/projects-screen";
import { useGeneralSliceSelector } from "src/redux/reducers/general/slice";
import { useProjectsSliceSelector } from "src/redux/reducers/projects-screen/slice";
import { globalStyles } from "src/styles/global";
import { openLink } from "src/utils/link";

export const ProjectsScreen: FC = () => {
  const { projects, status } = useProjectsSliceSelector();

  const { theme } = useGeneralSliceSelector();

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
            renderItem={({ item }) => (
              <ProjectCard project={item} openLink={(url) => openLink(url)} />
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
