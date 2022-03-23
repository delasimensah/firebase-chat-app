import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

export const createChat = async (result, currentUser) => {
  if (result.username === currentUser.username) {
    console.log("cannot start chat with self");
    return;
  }

  const chatRef = doc(db, "chats", `${currentUser.userId}_${result.objectID}`);

  const chatSnapshot = await getDoc(chatRef);

  if (chatSnapshot.exists()) {
    console.log("chat already exists");
    return;
  }

  await setDoc(chatRef, {
    members: [
      { id: currentUser.userId, username: currentUser.username },
      { id: result.objectID, username: result.username },
    ],
    createdAt: new Date(),
    lastMessage: "",
  });
};

export const deleteChat = async (chatId) => {
  await deleteDoc(doc(db, "chats", chatId));
};
