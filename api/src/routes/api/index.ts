import express, { Router } from "express";

import github from "./github";

const router: Router = express.Router();

router.use("/github", github);

export default router;
