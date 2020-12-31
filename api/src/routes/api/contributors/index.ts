import express, { Router } from "express";

import { listContributors } from "../../../controllers/contributors";

const router: Router = express.Router();

router.get("/", listContributors);

export default router;
