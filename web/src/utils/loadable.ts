export type Loadable<T, E extends string = "ERROR"> = null | "ERROR" | E | T;
