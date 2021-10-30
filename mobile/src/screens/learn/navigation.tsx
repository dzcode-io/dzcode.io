import React, { FC } from "react";
import { DocumentDetailsScreen } from "./document-details";
import { DocumentsListScreen } from "./documents-list";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

export const Navigation: FC = () => {
  return (
    <Navigator initialRouteName={"documents-list"} headerMode={"none"}>
      <Screen name="documents-list" component={DocumentsListScreen} />
      <Screen name="document-details" component={DocumentDetailsScreen} />
    </Navigator>
  );
};
