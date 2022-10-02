export { Route as RouteParam } from "@react-navigation/routers";

export interface Route {
  name: string;
  title?: string;
  label?: string;
  component: React.ComponentType<any>;
}
