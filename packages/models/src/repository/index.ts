import { BaseEntity } from "src/_base";

export type RepositoryEntity = BaseEntity & {
  owner: string;
  name: string;
  provider: "github" | "gitlab";
};
