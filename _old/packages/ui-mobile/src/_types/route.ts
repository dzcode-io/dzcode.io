/**
 * Type used to define navigation routes
 * @example
 * import type { Route } from "@dzcode.io/ui-mobile/dist/_types/route";
 * import { StackNav } from "@dzcode.io/ui-mobile/dist/navigation/stack-nav";
 * import { FC } from "react";
 * import { DocumentDetailsScreen } from "./document-details";
 * import { DocumentsListScreen } from "./documents-list";
 *
 * const routes: Route[] = [
 *  {
 *    name: "documents-list",
 *    component: DocumentsListScreen,
 *  },
 *  {
 *    name: "document-details",
 *    component: DocumentDetailsScreen,
 *   },
 * ];
 *
 * export const Navigation: FC = () => {
 *  return (
 *    <StackNav routes={routes} headerMode={"none"} initialRouteName={"documents-list"} />
 *  );
 * };
 */
export interface Route {
  /**
   * the name of the route
   */
  name: string;
  /**
   * the title of the route
   */
  title?: string;
  /**
   * the label of the route
   */
  label?: string;
  /**
   * the component of the route
   */
  component: React.ComponentType<any>;
}
