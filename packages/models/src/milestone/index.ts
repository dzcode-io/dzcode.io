import { BaseEntity } from "src/_base";

export interface MilestoneEntity extends BaseEntity {
  id: string;
  title: string;
  description: string;
  url: string;
  openIssuesCount: number;
  closedIssuesCount: number;
  status: "open" | "closed" | "in-progress";
  createdAt: string;
  dueAt?: string;
  closedAt?: string;
}
