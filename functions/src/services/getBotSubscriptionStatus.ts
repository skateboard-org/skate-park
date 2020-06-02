import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";
import { CallableContext } from "firebase-functions/lib/providers/https";
const db = firebase.firestore();


const onGetBotSubscriptionStatus = async (data: any, context: CallableContext) => {

  const botName = data.botName || '';

    if (!(typeof botName === 'string') || botName.length === 0) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
        'two arguments "email" & "botName" containing the message text to add.');
    }

    // Checking that the user is authenticated.
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
        'while authenticated.');
    }

    // [END messageHttpsErrors]

    // [START authIntegration]
    // Authentication / user information is automatically added to the request.
    const userId = context.auth.uid;

    // [END authIntegration]

    const userRef = db.collection('users').doc(userId);

    try {
      const userData = await userRef.get().then(doc => {
          if (!doc.exists) {
              return 'invalid user'
          } else {
              return doc.data();
          }
      })

      if(userData === 'invalid user'){
        return {
          success: false,
          error: userData
        }
      }

      let hasUserSubscribed = null;

      if(userData === undefined){
        throw new Error();
      } else {
        hasUserSubscribed = userData['bots'].includes(botName)
      }

      if (hasUserSubscribed){
        return {
          message: 'subscribed',
          success: true
        }
      } else {
        return {
          message: 'not subscribed',
          success: true
        }
      }
    } catch (error) {
        console.log(error)
        return {
          message: 'error',
          success: false
        }
    }

};

export default onGetBotSubscriptionStatus;

