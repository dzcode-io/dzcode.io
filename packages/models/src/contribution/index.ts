import { BaseEntity } from "src/_base";

export type ContributionEntity = BaseEntity & {
  title: string;
  type: "ISSUE" | "PULL_REQUEST";
  url: string;
  updatedAt: string;
  activityCount: number;
};
