import express, { Router } from "express";

import {
  listRepositories,
  listPullRequestsByRepository,
} from "../../../controllers/github";

const router: Router = express.Router();

router.get("/repositories", listRepositories);
router.get("/pull-requests", listPullRequestsByRepository);

export default router;
