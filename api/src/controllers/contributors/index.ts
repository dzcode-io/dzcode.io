import * as Github from "../../services/github";
import { GithubUser, Project } from "@dzcode.io/common/dist/types";
import { RequestHandler, Response } from "express";
import axios from "axios";
import { fullstackConfig } from "../../config/index";

export const listProjectsContributors: RequestHandler = async (req, res) => {
  const response = await axios.get<Project[]>(
    fullstackConfig.data + "/projects/list.c.json",
  );
  const owner_repo_list = response.data.map((element) => {
    const info = element.githubURI?.split("/");
    return { owner: info?.[0], repo: info?.[1] };
  }, []);

  const contributors = owner_repo_list.map(async (element) => {
    return await Github.listContributors({
      owner: element?.owner || "",
      repo: element?.repo || "",
      path: "",
    });
  }, []);

  return res.status(200).json(contributors);
};

export const listContributors: RequestHandler = async (req, res) => {
  const slug = req.query.articleSlug || req.query.documentSlug;
  const modelType = req.query.articleSlug ? "articles" : "documentation";
  try {
    const responses = await Promise.all([
      Github.listContributors({
        owner: "dzcode-io",
        repo: "dzcode.io",
        path: `data/models/${modelType}/${slug}`,
      }),
      Github.listContributors({
        owner: "dzcode-io",
        repo: "dzcode.io",
        path: `data/${modelType}/${slug}`,
      }),
    ]);
    const uniqUsernames: Record<string, number> = {};
    const contributors = [...(responses[0] || []), ...(responses[1] || [])]
      .reduce<GithubUser[]>((pV, cV) => {
        if (uniqUsernames[cV.login]) {
          uniqUsernames[cV.login]++;
          return pV;
        } else {
          uniqUsernames[cV.login] = 1;
          return [...pV, cV];
        }
      }, [])
      .sort((a, b) => uniqUsernames[b.login] - uniqUsernames[a.login]);

    return res.status(200).json(contributors);
  } catch (e) {
    console.error(e);
    return res.sendStatus(400);
  }
};
