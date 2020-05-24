import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";

const serviceAccount = require("../serviceAccountKeys/firebase-adminsdk.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://skate-board.firebaseio.com",
});

import onCreateUserDocument from "./services/createUserDocument";
import onGetMyBots from "./services/getMyBots";
import onAddBot from "./services/addBot";
import onRemoveBot from "./services/removeBot";
import onCreateNewBot from "./services/createNewBot";
import onGetAllBots from "./services/getAllBots";

export const createUserDocument = functions.auth
  .user()
  .onCreate(onCreateUserDocument);

export const getMyBots = functions.https.onCall(onGetMyBots);
export const addBot = functions.https.onCall(onAddBot);
export const removeBot = functions.https.onCall(onRemoveBot);
export const createNewBot = functions.https.onCall(onCreateNewBot);
export const getAllBots = functions.https.onCall(onGetAllBots);
