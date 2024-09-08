import { BaseEntity } from "src/_base";

export interface ContributionEntity extends BaseEntity {
  title: string;
  type: "ISSUE" | "PULL_REQUEST";
  url: string;
  updatedAt: string;
  activityCount: number;
}
