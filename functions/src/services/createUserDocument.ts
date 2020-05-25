import * as firebase from "firebase-admin";
const db = firebase.firestore();

const onCreateUserDocument = async (user: { uid: string }) => {
  const userRef = db.collection("users").doc(user.uid);
  const userDocument = await userRef.set({
    bots: [],
  });
  return {
    success: true,
  };
  console.log("Creating User Document: ", userDocument);
};

export default onCreateUserDocument;
