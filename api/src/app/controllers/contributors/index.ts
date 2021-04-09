import * as Github from "../../services/github";

import { GithubUser } from "@dzcode.io/common/dist/types";
import { RequestHandler } from "express";

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
