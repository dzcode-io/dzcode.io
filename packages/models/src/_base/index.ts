import "reflect-metadata";

import "@dzcode.io/utils/dist/ts";

export class BaseEntity {
  private _entity?: undefined;
}

export type Model<
  ENTITY,
  RELATIONS extends KeysMatching<ENTITY, BaseEntity> = never
> = Pick<ENTITY, Exclude<keyof ENTITY, KeysMatching<ENTITY, BaseEntity>>> &
  Pick<Required<ENTITY>, RELATIONS> &
  BaseEntity;
