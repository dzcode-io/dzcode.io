import express, { Router } from "express";

import {
  listRepositories,
  listPullRequestsByRepo,
} from "../../../controllers/github";

const router: Router = express.Router();

router.get("/repositories", listRepositories);
router.get("/pull-requests", listPullRequestsByRepo);

export default router;
