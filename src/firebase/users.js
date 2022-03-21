import { db } from "./firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const checkUsernameExists = async (username) => {
  const userDocRef = doc(db, "users", username);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    throw new Error("Username already taken");
  }
};

export const createUserDocument = async (userAuth, username) => {
  const userDocRef = doc(db, "users", username);

  const { email } = userAuth;
  const createdAt = new Date();

  await setDoc(userDocRef, {
    username,
    email,
    createdAt,
    userId: userAuth.uid,
  });
};

export const getUserDocument = async (username) => {
  const userDocRef = doc(db, "users", username);

  const userSnapshot = await getDoc(userDocRef);

  const userInfo = userSnapshot.data();

  return userInfo;
};
