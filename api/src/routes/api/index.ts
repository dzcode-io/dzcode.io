import express, { Router } from "express";

import contributors from "./contributors";
import github from "./github";

const router: Router = express.Router();

router.use("/github", github);
router.use("/contributors", contributors);

export default router;
