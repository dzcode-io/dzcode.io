import * as functions from "firebase-functions";
import postEmail from "./email";
import express, { Application } from "express";

import cors = require("cors");

const app: Application = express();

const options = {
  origin: "https://www.dzcode.io/",
};

//use cors middleware
app.use(cors(options));

app.post("/contact", postEmail);

export const api = functions.https.onRequest(app);
