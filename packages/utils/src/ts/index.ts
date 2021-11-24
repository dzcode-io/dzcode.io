export type Flatten<T> = T extends any[] ? T[number] : T; // eslint-disable-line @typescript-eslint/no-explicit-any

export type KeysMatching<T, V> = {
  [K in keyof Required<T>]: Flatten<Required<T>[K]> extends V ? K : never;
}[keyof Required<T>];

export type OptionalPropertiesOf<T extends object> = Required<
  Pick<
    T,
    Exclude<
      {
        [K in keyof T]: T extends Record<K, T[K]> ? never : K;
      }[keyof T],
      undefined
    >
  >
>;

export type RequiredPropertiesOf<T extends object> = Omit<
  T,
  keyof OptionalPropertiesOf<T>
>;
