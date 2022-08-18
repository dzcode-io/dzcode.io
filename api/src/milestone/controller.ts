import { Controller, Get } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";

import { GithubService } from "../github/service";
import { GetMilestonesResponseDto } from "./types";

@Service()
@Controller("/Milestones")
export class MilestoneController {
  constructor(private readonly githubService: GithubService) {}

  @Get("/dzcode")
  @OpenAPI({
    summary: "Return a list of milestones for all dzcode.io repo",
  })
  @ResponseSchema(GetMilestonesResponseDto)
  public async getMilestones(): Promise<GetMilestonesResponseDto> {
    const githubMilestones = await this.githubService.listRepositoryMilestones({
      owner: "dzcode-io",
      repo: "dzcode.io",
    });
    return {
      // @TODO-ZM: sort milestones based on: status:closed by closedAt,and status:open: dueAt, createdAt
      milestones: githubMilestones.map((githubMilestone) => ({
        id: `${githubMilestone.number}`,
        title: githubMilestone.title,
        description: githubMilestone.description,
        url: githubMilestone.html_url,
        status: githubMilestone.state,
        closedIssuesCount: githubMilestone.closed_issues,
        openIssuesCount: githubMilestone.open_issues,
        createdAt: githubMilestone.created_at,
        closedAt: githubMilestone.closed_at || undefined,
        dueAt: githubMilestone.due_on || undefined,
      })),
    };
  }
}
