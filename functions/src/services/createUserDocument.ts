import * as firebase from "firebase-admin";
const db = firebase.firestore();

const onCreateUserDocument = (user: { uid: string }) => {
  const userRef = db.collection("users").doc(user.uid);
  const userDocument = userRef.set({
    bots: [],
  });
  return Promise.all([userDocument]).then((res) => {
    return console.log("Creating User Document: ", res);
  });
};

export default onCreateUserDocument;
