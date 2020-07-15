const serviceAccount = require("./secrets/serviceAccountKey.json");
import * as admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dzcode-io.firebaseio.com",
});

export const db = admin.firestore();

export default admin;
