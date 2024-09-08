export interface ContributionEntity {
  id: number;
  title: string;
  type: "ISSUE" | "PULL_REQUEST";
  url: string;
  updatedAt: string;
  activityCount: number;
  runId: string;
}
