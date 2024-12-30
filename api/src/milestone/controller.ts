import { Controller, Get } from "routing-controllers";
import { GithubService } from "src/github/service";
import { Service } from "typedi";

import { GetMilestonesResponse } from "./types";

@Service()
@Controller("/milestones")
export class MilestoneController {
  constructor(private readonly githubService: GithubService) {}

  @Get("/dzcode")
  public async getMilestones(): Promise<GetMilestonesResponse> {
    const githubMilestones = await this.githubService.listRepositoryMilestones({
      owner: "dzcode-io",
      repository: "dzcode.io",
    });
    return {
      milestones: githubMilestones
        .sort((a, b) => {
          if (b.state !== a.state) {
            return b.state === "closed" ? 1 : -1;
          }
          if (a.state === "closed") {
            return (
              new Date(a.due_on || a.closed_at || "").getTime() -
              new Date(b.due_on || b.closed_at || "").getTime()
            );
          }
          if (a.state === "open") {
            return (
              new Date(a.due_on || a.created_at || "").getTime() -
              new Date(b.due_on || b.closed_at || "").getTime()
            );
          }
          return 0;
        })
        .map((githubMilestone, githubMilestoneIndex) => ({
          id: `${githubMilestone.number}`,
          title: githubMilestone.title,
          description: githubMilestone.description,
          url: githubMilestone.html_url,
          status:
            (!githubMilestones[githubMilestoneIndex - 1] ||
              githubMilestones[githubMilestoneIndex - 1].state === "closed") &&
            githubMilestone.state === "open"
              ? "in-progress"
              : githubMilestone.state,
          closedIssuesCount: githubMilestone.closed_issues,
          openIssuesCount: githubMilestone.open_issues,
          createdAt: githubMilestone.created_at,
          closedAt:
            (githubMilestone.state === "closed" && githubMilestone.due_on) ||
            githubMilestone.closed_at ||
            undefined,
          dueAt: githubMilestone.due_on || undefined,
        })),
    };
  }
}
