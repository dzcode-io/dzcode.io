import { BaseEntity } from "src/_base";

export interface ProjectEntity extends BaseEntity {
  slug: string;
  name: string;
}
