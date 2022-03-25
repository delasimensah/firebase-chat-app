import { auth } from "./firebaseConfig";
import {
  createUserDocument,
  checkUsernameExists,
  updateOnlineStatus,
} from "./users";
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
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  await updateOnlineStatus(user.uid);
};

export const logout = async () => {
  await updateOnlineStatus(auth.currentUser.uid);
  await signOut(auth);
};
