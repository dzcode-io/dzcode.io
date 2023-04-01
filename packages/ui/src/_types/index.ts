import { ReactNode } from "react";

export interface BaseUIProps {
  margin?: number | number[];
  padding?: number | number[];
}

export interface ChildrenProp {
  children?: ReactNode;
}
