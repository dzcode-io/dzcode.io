const serviceAccount = require("./secrets/serviceAccountKey.json");
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const databaseURL = functions.config().firebase_admin.databaseURL;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL,
});

export const db = admin.firestore();

export default admin;
