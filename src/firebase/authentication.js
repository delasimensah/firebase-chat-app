import { auth } from "./firebaseConfig";
import { createUserDocument, checkUsernameExists } from "./users";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const register = async ({ username, email, password }) => {
  await checkUsernameExists(username);
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await createUserDocument(user, username);
};

export const login = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  await signOut(auth);
};
