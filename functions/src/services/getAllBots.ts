import * as firebase from "firebase-admin";
import { CallableContext } from "firebase-functions/lib/providers/https";
const db = firebase.firestore();

const onGetAllBots = async (data: any, context: CallableContext) => {
  const snapshot = await db.collection("bots").get();

  try {
    const allBots = snapshot.docs.map((doc) => doc.data());
    return {
      error: false,
      data: allBots,
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
    };
  }
};

export default onGetAllBots;
