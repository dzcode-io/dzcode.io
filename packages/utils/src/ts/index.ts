export type Flatten<T> = T extends any[] ? T[number] : T; // eslint-disable-line @typescript-eslint/no-explicit-any

export type KeysMatching<T, V> = {
  [K in keyof Required<T>]: Flatten<Required<T>[K]> extends V ? K : never;
}[keyof Required<T>];
