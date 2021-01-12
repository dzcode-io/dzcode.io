import * as Github from "../../services/github";

import { Request, Response } from "express";

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

export const listPullRequestsByRepository = async (
  req: Request,
  res: Response,
) => {
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

// from merouane
export const listStarsByRepository = async (req: Request, res: Response) => {
  try {
    const countStarts = await Github.listStars({
      owner: "dzcode-io",
      repo: req.params.repo,
    });
    const { stargazers_count } = countStarts;
    return res.status(200).json({ stargazers_count });
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const listStargazersByRepository = async (
  req: Request,
  res: Response,
) => {
  try {
    const Stargazers = await Github.listStargazers({
      owner: "dzcode-io",
      repo: req.params.repo,
      page: Number(req.params.page),
    });
    return res.status(200).json(Stargazers);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};
