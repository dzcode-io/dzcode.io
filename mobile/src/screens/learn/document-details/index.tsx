import React, { FC } from "react";
import { View } from "react-native";
import { Route } from "@react-navigation/routers";
import { Document } from "../../../_common/types";

interface DocumentDetailsScreenProps {
  route: Route<"DocumentDetails", RouteParams>;
}

interface RouteParams {
  document: Document;
}

export const DocumentDetailsScreen: FC<DocumentDetailsScreenProps> = ({
  route,
}: DocumentDetailsScreenProps) => {
  return <View></View>;
};
