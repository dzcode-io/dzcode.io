import { ErrorBoundary } from "@dzcode.io/ui-mobile/dist/error-boundary";
import { StackNav } from "@dzcode.io/ui-mobile/dist/stack-nav";
import type { Route } from "@dzcode.io/ui-mobile/dist/types";
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
      <StackNav routes={routes} headerMode={"none"} initialRouteName={"documents-list"} />
    </ErrorBoundary>
  );
};
