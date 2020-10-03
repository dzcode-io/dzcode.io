import * as functions from "firebase-functions";
import postEmail from "./email";
import { sendEmail } from "./message";
import express, { Application } from "express";

import cors from "cors";

const app: Application = express();

let allowedOrigins = ["https://dzcode.io", "https://staging.dzcode.io/"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.post("/contact", postEmail);

export const api = functions.https.onRequest(app);
export const sendMessage = sendEmail;
