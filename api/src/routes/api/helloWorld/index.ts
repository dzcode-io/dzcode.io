import express, { Router } from "express";

import { health } from "../../../controllers/helloWorld";

const router: Router = express.Router();

router.get("/health", health);

export default router;
