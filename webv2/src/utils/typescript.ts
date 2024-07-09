type PopSubString<S extends string, D extends string> = string extends S
  ? string
  : S extends ''
    ? []
    : S extends `${string}${D}${infer U}`
      ? PopSubString<U, D>
      : S;

export type PyramidSplitString<
  S extends string,
  D extends string,
  // @ts-expect-error: @TODO: look into why this happens
> = S extends `${infer L}-${PopSubString<S, D>}` ? [L, ...PyramidSplitString<L, D>] : [];

export type PartialWithOneRequiredKey<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];
