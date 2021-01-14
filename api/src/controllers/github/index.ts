import * as Github from "../../services/github";

import { Request, Response } from "express";
import { report } from "process";

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

export const listBranchesByRepository = async (req: Request, res: Response) => {
  try {
    const Branches = await Github.listBranches({
      owner: "dzcode-io",
      repo: req.params.repo,
    });
    return res.status(200).json(Branches);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};
export const listCommitsByRepository = async (req: Request, res: Response) => {
  try {
    const Commits = await Github.listCommits({
      owner: "dzcode-io",
      repo: req.params.repo,
    });
    return res.status(200).json(Commits);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const listForksByRepository = async (req: Request, res: Response) => {
  try {
    const countForks = await Github.listForks({
      owner: "dzcode-io",
      repo: req.params.repo,
    });
    const { forks_count } = countForks;
    return res.status(200).json({ forks_count });
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};
