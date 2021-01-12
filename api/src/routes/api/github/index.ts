import express, { Router } from "express";
import {
  listPullRequestsByRepository,
  listRepositories,
  // from merouane
  listStargazersByRepository,
  listStarsByRepository,
} from "../../../controllers/github";

const router: Router = express.Router();

router.get("/repositories", listRepositories);
router.get("/pull-requests", listPullRequestsByRepository);
// from merouane
router.get("/count-starts/:repo", listStarsByRepository);
router.get("/stargazers/:repo/:page", listStargazersByRepository);

export default router;
