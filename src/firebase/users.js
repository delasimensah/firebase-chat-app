import { db } from "./firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  limit,
  updateDoc,
} from "firebase/firestore";

export const checkUsernameExists = async (username) => {
  const q = query(
    collection(db, "users"),
    where("username", "==", username),
    limit(1)
  );
  const userSnapshot = await getDocs(q);

  if (userSnapshot.docs.length === 0) return;

  const data = userSnapshot.docs[0].data();

  if (username === data.username) {
    throw new Error("Username already taken");
  }
};

export const createUserDocument = async (userAuth, username) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const { email } = userAuth;
  const createdAt = new Date().toISOString();
  const activeTime = new Date().toISOString();

  await setDoc(userDocRef, {
    username,
    email,
    createdAt,
    userId: userAuth.uid,
    isOnline: true,
    activeTime,
  });
};

export const updateOnlineStatus = async (userId) => {
  const userDocRef = doc(db, "users", userId);

  const userSnapshot = await getDoc(userDocRef);

  const { isOnline } = userSnapshot.data();
  const newActiveTime = new Date().toISOString();

  await updateDoc(userDocRef, {
    isOnline: !isOnline,
    activeTime: newActiveTime,
  });
};

export const getUserDocument = async (userId) => {
  const userDocRef = doc(db, "users", userId);

  const userSnapshot = await getDoc(userDocRef);

  const userInfo = userSnapshot.data();

  return userInfo;
};

export const getOnlineStatus = async (userId) => {
  const userRef = doc(db, "users", userId);

  const userSnapshot = await getDoc(userRef);

  const { isOnline, activeTime } = userSnapshot.data();

  return { isOnline, activeTime };
};
