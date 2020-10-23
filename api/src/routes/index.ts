import { Router, Request, Response } from "express";

import api from "./api";

const router: Router = Router();

// API routes
router.use("/", api);

// Not found routes
router.use("*", (req: Request, res: Response) => {
  return res.sendStatus(404);
});

export default router;
