import express, { Router } from "express";
import {
  getGithubUserByUsername,
  listBranchesByRepository,
  listCommitsByRepository,
  listForksByRepository,
  listIssuesByRepository,
  listPullRequestsByRepository,
  listRepositories,
  listStargazersByRepository,
  listStarsByRepository,
  listWatchersByRepository,
} from "../../../controllers/github";

const router: Router = express.Router();

router.get("/repositories", listRepositories);
router.get("/pull-requests", listPullRequestsByRepository);
router.get("/branches/:repo", listBranchesByRepository);
router.get("/commits/:repo", listCommitsByRepository);
router.get("/forks/:repo", listForksByRepository);
router.get("/issues/:repo", listIssuesByRepository);
router.get("/count-starts/:repo", listStarsByRepository);
router.get("/stargazers/:repo/:page", listStargazersByRepository);
router.get("/watchers/:repo", listWatchersByRepository);
router.get("/user/:username", getGithubUserByUsername);

export default router;
