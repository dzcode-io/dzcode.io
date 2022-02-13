import React, { FC, useEffect } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { DZCodeLoading } from "../../components/loading";
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
    <SafeAreaView style={globalStyles.mainView}>
      {projects ? (
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
  );
};
