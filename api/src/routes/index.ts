import { Router, Request, Response } from "express";

import api from "./api";

const router: Router = Router();

// API routes
router.use("/", api);

// Health
router.get("/health", (req: Request, res: Response) => res.sendStatus(204));

// Not found routes
router.use("*", (req: Request, res: Response) => {
  return res.sendStatus(404);
});

export default router;
