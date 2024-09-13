import { BaseEntity } from "src/_base";

export type ProjectEntity = BaseEntity & {
  slug: string;
  name: string;
};
