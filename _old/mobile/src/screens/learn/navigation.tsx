import type { Route } from "@dzcode.io/ui-mobile/dist/_types/route";
import { ErrorBoundary } from "@dzcode.io/ui-mobile/dist/error-boundary";
import { StackNav } from "@dzcode.io/ui-mobile/dist/navigation/stack-nav";
import React, { FC } from "react";

import { DocumentDetailsScreen } from "./document-details";
import { DocumentsListScreen } from "./documents-list";

const routes: Route[] = [
  {
    name: "documents-list",
    component: DocumentsListScreen,
  },
  {
    name: "document-details",
    component: DocumentDetailsScreen,
  },
];

export const Navigation: FC = () => {
  return (
    <ErrorBoundary>
      <StackNav routes={routes} initialRouteName={"documents-list"} />
    </ErrorBoundary>
  );
};
