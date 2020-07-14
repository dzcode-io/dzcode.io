import * as functions from "firebase-functions";
import postEmail from "./email";
import express, { Application } from "express";

const app: Application = express();

app.post("/contact", postEmail);

export const api = functions.https.onRequest(app);
