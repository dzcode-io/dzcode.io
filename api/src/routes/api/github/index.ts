import express, { Router } from "express";
import {
  listBranchesByRepository,
  listCommitsByRepository,
  listForksByRepository,
  listPullRequestsByRepository,
  listRepositories,
  listStargazersByRepository,
  listStarsByRepository,
} from "../../../controllers/github";

const router: Router = express.Router();

router.get("/repositories", listRepositories);
router.get("/pull-requests", listPullRequestsByRepository);
router.get("/branches/:repo", listBranchesByRepository);
router.get("/commits/:repo", listCommitsByRepository);
router.get("/forks/:repo", listForksByRepository);
router.get("/count-starts/:repo", listStarsByRepository);
router.get("/stargazers/:repo/:page", listStargazersByRepository);

export default router;
