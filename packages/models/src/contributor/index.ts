import { BaseEntity } from "src/_base";

export type ContributorEntity = BaseEntity & {
  name: string;
  username: string;
  url: string;
  avatarUrl: string;
};
