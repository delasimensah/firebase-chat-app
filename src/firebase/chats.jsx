import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const createChat = async (result, currentUser, chats) => {
  if (result.username === currentUser.username) {
    console.log("cannot start chat with self");
    return;
  }

  const chatRef = doc(db, "chats", `${currentUser.userId}_${result.userId}`);

  const chatSnapshot = await getDoc(chatRef);

  if (chatSnapshot.exists()) {
    console.log("chat already exists");
    return;
  }

  await setDoc(chatRef, {
    members: [
      { id: currentUser.userId, username: currentUser.username },
      { id: result.userId, username: result.username },
    ],
    createAt: new Date(),
    lastMessage: "",
  });
};
