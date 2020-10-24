import { Request, Response } from "express";

import * as Github from "../../services/github";

export const listRepositories = async (req: Request, res: Response) => {
  try {
    const repositories = await Github.listOrganizationRepositories({
      org: "dzcode-io",
    });

    return res.status(200).json(repositories);
  } catch (e) {
    console.error(e);
    return res.sendStatus(400);
  }
};

export const listPullRequestsByRepo = async (req: Request, res: Response) => {
  try {
    const pullRequests = await Github.listPullRequests({
      owner: "dzcode-io",
      repo: "dzcode.io",
    });

    return res.status(200).json(pullRequests);
  } catch (e) {
    console.error(e);
    return res.sendStatus(400);
  }
};
