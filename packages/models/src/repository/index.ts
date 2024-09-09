import { BaseEntity } from "src/_base";

export interface RepositoryEntity extends BaseEntity {
  owner: string;
  name: string;
  provider: "github" | "gitlab";
}
