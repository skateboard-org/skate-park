import { Bot, ResponseTypesEnum } from "./../entity/Bot";
import { isStringValid } from "./../utility/index";
import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";
import { CallableContext } from "firebase-functions/lib/providers/https";
const db = firebase.firestore();

const onCreateNewBot = (data: any, context: CallableContext) => {
  let bot = data.bot || null;

  console.log(bot);

  if (
    bot === null ||
    !isStringValid(bot.name) ||
    !isStringValid(bot.url) ||
    !isStringValid(bot.responseType) ||
    !Object.values(ResponseTypesEnum).includes(bot.responseType)
  ) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with " +
        'two arguments "email" & "botName" containing the message text to add.'
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

  // [START authIntegration]
  // Authentication / user information is automatically added to the request.
  // const uid = context.auth.uid;

  const newBot = new Bot(
    bot.name,
    bot.responseType,
    bot.url,
    bot.author,
    bot.title,
    bot.icon,
    bot.desc,
    bot.parameterEnabled,
    bot.typeAheadEnabled,
    bot.typeAheadOptions
  );

  console.log(newBot);

  // [END messageHttpsErrors]

  // [END authIntegration]

  // const channelRef = db.collection('channels').doc(channelId);
  const newBotDoc = db
    .collection("bots")
    .doc(newBot.name)
    .set(Object.assign({}, newBot));

  return Promise.all([newBotDoc])
    .then((res) => {
      console.log("subscribing to: ", res);
      return {
        botName: newBot.name,
        error: false,
        message: "bot added",
      };
    })
    .catch((err) => {
      console.log(err);
    });
};

export default onCreateNewBot;
