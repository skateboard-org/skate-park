import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";
import { CallableContext } from "firebase-functions/lib/providers/https";
const db = firebase.firestore();

const onGetMyBots = (data: any, context: CallableContext) => {
  let userId = data.userId || "";

  if (!(typeof userId === "string") || userId.length === 0) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with " +
        'two arguments "email" & "userId" containing the message text to add.'
    );
  }

  // Checking that the user is authenticated.
  // if (!context.auth) {
  //   // Throwing an HttpsError so that the client gets the error details.
  //   throw new functions.https.HttpsError(
  //     "failed-precondition",
  //     "The function must be called " + "while authenticated."
  //   );
  // }

  // [END messageHttpsErrors]

  // [START authIntegration]
  // Authentication / user information is automatically added to the request.
  // const uid = context.auth.uid;

  // [END authIntegration]

  const userRef = db.collection("users").doc(userId);

  const myBots = userRef.get().then((doc) => {
    return doc.data();
  });

  return Promise.all([myBots])
    .then((res) => {
      return {
        error: false,
        data: res[0],
      };
    })
    .catch((err) => {
      console.log(err);
    });
};

export default onGetMyBots;
