import React, { FC, useEffect } from "react";
import { SafeAreaView, View, FlatList, Image, ScrollView } from "react-native";
import { Divider, Text, Card } from "react-native-paper";
import { DZCodeLoading } from "../../components/loading";
import { Dispatch, StateInterface } from "../../redux";
import { ProjectsScreenState } from "../../redux/reducers/projects-screen";
import { fetchProjects } from "../../redux/actions/projects-screen";
import { useDispatch, useSelector } from "react-redux";
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
