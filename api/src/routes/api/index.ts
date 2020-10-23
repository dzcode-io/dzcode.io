import express, { Router } from "express";

import helloWorld from "./helloWorld";

const router: Router = express.Router();

router.use("/helloWorld", helloWorld);

export default router;
