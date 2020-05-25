import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";
import { CallableContext } from "firebase-functions/lib/providers/https";
const db = firebase.firestore();

const onAddBot = (data: any, context: CallableContext) => {
  const botName = data.botName || "";

  if (!(typeof botName === "string") || botName.length === 0) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with " +
        'two arguments "email" & "botName" containing the message text to add.'
    );
  }

  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  }

  // [END messageHttpsErrors]

  // [START authIntegration]
  // Authentication / user information is automatically added to the request.
  const uid = context.auth.uid;

  // [END authIntegration]

  // const channelRef = db.collection('channels').doc(channelId);
  const userRef = db.collection("users").doc(uid);

  const channelUnion = userRef.update({
    bots: firebase.firestore.FieldValue.arrayUnion(botName),
  });

  return Promise.all([channelUnion])
    .then((res) => {
      console.log("subscribing to: ", res);
      return {
        botName: botName,
        error: false,
        message: "bot added",
      };
    })
    .catch((err) => {
      console.log(err);
    });
};

export default onAddBot;
