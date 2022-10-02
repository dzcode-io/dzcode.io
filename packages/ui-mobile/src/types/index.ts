export { Route as RouteParam } from "@react-navigation/routers";

export interface Route {
  name: string;
  title?: string;
  label?: string;
  component: React.ComponentType<any>;
}

export interface Project {
  slug: string;
  image?: string;
  title: string;
  description?: string;
  content?: string;
  authors?: string[];
  contributors?: string[];
  views?: number;
  githubURI?: string;
}

export interface Option {
  label: string;
  name: string;
  checked?: boolean;
}

export interface Filter {
  label: string;
  name: string;
  options: Option[];
}
