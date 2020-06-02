import * as firebase from "firebase-admin";
import * as functions from "firebase-functions";
import { CallableContext } from "firebase-functions/lib/providers/https";
const db = firebase.firestore();

const onGetBot = async (data: any, context: CallableContext) => {
  const botName = data.botName || '';

  if (!(typeof botName === 'string') || botName.length === 0) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
    'two arguments "email" & "botName" containing the message text to add.');
  }

  try {
    const botRef = db.collection("bots").doc(botName);

    const bot = await botRef.get().then((doc) => {
      if (!doc.exists) {
        return undefined;
      } else {
         return doc.data()
      }
    })
    if(bot !== undefined){
      return {
        success: true,
        data: bot,
      };
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      data: 'error'
    };
  }
};

export default onGetBot;
