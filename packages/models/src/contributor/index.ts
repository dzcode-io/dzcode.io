import { BaseEntity } from "src/_base";

export interface ContributorEntity extends BaseEntity {
  name: string;
  username: string;
  url: string;
  avatarUrl: string;
}
