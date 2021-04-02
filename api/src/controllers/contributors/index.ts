import * as Github from "../../services/github";
import { GithubUser, Project } from "@dzcode.io/common/dist/types";
import { RequestHandler, Response } from "express";
import axios from "axios";
import { fullstackConfig } from "../../config/index";

/// we must transfer this type to the data project
export interface Contributors {
  login: string;
  avatar_url: string;
  projects: string[];
}

export const listProjectsContributors: RequestHandler = async (req, res) => {
  const response = await axios.get<Project[]>(
    `http://${req.hostname}:${fullstackConfig.data.port}/projects/list.c.json`,
  );

  const owner_repo_list = await response.data.map((element) => {
    const info = element.githubURI?.split("/");
    return { owner: info?.[0], repo: info?.[1] };
  }, []);

  const contributors = await Promise.all(
    owner_repo_list.map(async (element) => {
      const contributors_list = await Github.listContributors({
        owner: element.owner || "",
        repo: element.repo || "",
        path: "",
      });
      return { contributors: contributors_list, repo: element.repo };
    }),
  );

  // test if a list of dict containe an  element from a dict
  const listcontains = (list: Contributors[], dict: Contributors) => {
    let result = false;
    list.forEach((element: Contributors) => {
      if (element.login === dict.login) {
        result = true;
        return;
      }
    });

    return result;
  };

  const listelment = (
    list: Contributors[],
    dict: Contributors,
  ): Contributors => {
    for (let index = 0; index < list.length; index++) {
      if (list[index].login === dict.login) {
        return list[index];
      }
    }
    return { login: "", avatar_url: "", projects: [] };
  };

  //get the contributors for each projects
  const projects_contributors_list: Contributors[] = [];

  contributors.forEach((object: any) => {
    object.contributors.forEach((element: Contributors) => {
      if (!listcontains(projects_contributors_list, element)) {
        element.projects = element.projects || [];

        element.projects.push(object.repo);
        projects_contributors_list.push(element);
      } else {
        const existing_contributor = listelment(
          projects_contributors_list,
          element,
        );

        if (existing_contributor.login.length > 0) {
          existing_contributor.projects.push(object.repo);
        }
      }
    });
  });

  return res.status(200).json(projects_contributors_list);
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
      .reduce<GithubUser[]>((pV: any, cV) => {
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
