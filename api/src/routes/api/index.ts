import express, { Router } from "express";

import contributors from "./contributors";
import { getRoot } from "../../controllers/etc";
import github from "./github";

const router: Router = express.Router();

router.get("/", getRoot);
router.use("/github", github);
router.use("/contributors", contributors);

export default router;
