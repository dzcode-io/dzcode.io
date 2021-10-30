export class BaseEntity {
  private _entity?: undefined;
}

type Flatten<T> = T extends any[] ? T[number] : T; // eslint-disable-line @typescript-eslint/no-explicit-any
type Required<T> = { [P in keyof T]-?: T[P] };
type KeysMatching<T, V> = {
  [K in keyof Required<T>]: Flatten<Required<T>[K]> extends V ? K : never;
}[keyof Required<T>];

export type Model<ENTITY, RELATIONS extends KeysMatching<ENTITY, BaseEntity> = never> = Pick<
  ENTITY,
  Exclude<keyof ENTITY, KeysMatching<ENTITY, BaseEntity>>
> &
  Pick<Required<ENTITY>, RELATIONS> &
  BaseEntity;
