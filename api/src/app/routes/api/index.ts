import express, { Router } from "express";

import { getRoot } from "../../controllers/etc";
import github from "./github";

const router: Router = express.Router();

router.get("/", getRoot);
router.use("/github", github);

export default router;
