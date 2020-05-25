import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";
import { CallableContext } from "firebase-functions/lib/providers/https";
const db = firebase.firestore();

const onGetMyBots = async (data: any, context: CallableContext) => {
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

  try {
    const userRef = db.collection("users").doc(userId);

    const myBotNames = await userRef.get().then((doc) => {
      return doc.data();
    });

    const snapshot = await db.collection("bots").get();
    let myBots: any[] = [];
    if (myBotNames !== undefined && myBotNames.bots.length > 0) {
      console.log(myBotNames.bots);
      myBots = snapshot.docs
        .filter((doc) => myBotNames.bots.includes(doc.id))
        .map((doc) => doc.data());
    }

    console.log(myBots);

    return {
      error: false,
      data: myBots,
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
    };
  }
};

export default onGetMyBots;
