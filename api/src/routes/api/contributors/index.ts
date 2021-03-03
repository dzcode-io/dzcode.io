import express, { Router } from "express";

import {
  listContributors,
  listProjectsContributors,
} from "../../../controllers/contributors";

const router: Router = express.Router();

router.get("/", listContributors);
router.get("/repo-contributors", listProjectsContributors);
export default router;
