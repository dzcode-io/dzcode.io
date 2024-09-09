// TODO-ZM: digest this to database later (then extends BaseEntity)
export interface MilestoneEntity {
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
