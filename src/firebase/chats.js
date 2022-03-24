import { db } from "./firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";

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
    createdAt: new Date().toISOString(),
    lastMessage: null,
  });
};

export const deleteChat = async (chatId) => {
  await deleteDoc(doc(db, "chats", chatId));
};

export const createMessage = async (chatId, text, sender) => {
  const messagesRef = collection(db, "chats", chatId, "messages");
  const chatRef = doc(db, "chats", chatId);

  const newMessage = {
    text,
    sender,
    createdAt: new Date().toISOString(),
    attachments: [],
    read: false,
  };

  // add new message
  await addDoc(messagesRef, newMessage);

  //  update last message for chat
  await updateDoc(chatRef, {
    lastMessage: newMessage,
  });
};

export const updateLastMessage = async (chatId) => {
  const chatRef = doc(db, "chats", chatId);
  const chatSnapshot = await getDoc(chatRef);
  const { lastMessage } = chatSnapshot.data();

  //  update last message for chat

  if (lastMessage) {
    await updateDoc(chatRef, {
      lastMessage: {
        ...lastMessage,
        read: true,
      },
    });
  }
};
