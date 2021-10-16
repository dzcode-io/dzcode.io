import { Dispatch, StateInterface } from "../../redux";
import { FlatList, SafeAreaView, View } from "react-native";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardItemMemoed } from "./card-item";
import { DZCodeLoading } from "../../components/loading";
import { ProjectsScreenState } from "../../redux/reducers/projects-screen";
import { fetchProjects } from "../../redux/actions/projects-screen";
import { globalStyles } from "../../styles/global";

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
