import express, { Router } from "express";

import { listRepositories } from "../../../controllers/github";

const router: Router = express.Router();

router.get("/repositories", listRepositories);

export default router;
