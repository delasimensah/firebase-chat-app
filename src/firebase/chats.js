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

export const createChat = async (result, currentUser, chatId) => {
  // if (result.username === currentUser.username) {
  //   console.log("cannot start chat with self");
  //   return;
  // }

  const chatRef = doc(db, "chats", chatId);

  const chatSnapshot = await getDoc(chatRef);

  if (!chatSnapshot.exists()) {
    await setDoc(chatRef, {
      members: [
        { id: currentUser.userId, username: currentUser.username },
        { id: result.objectID, username: result.username },
      ],
      createdAt: new Date().toISOString(),
      lastMessage: null,
      [`${currentUser.username}UnreadMessagesCount`]: 0,
      [`${result.username}UnreadMessagesCount`]: 0,
    });
  }
};

export const deleteChat = async (chatId) => {
  await deleteDoc(doc(db, "chats", chatId));
};

export const createMessage = async (chatId, text, sender, receipient) => {
  const messagesRef = collection(db, "chats", chatId, "messages");
  const chatRef = doc(db, "chats", chatId);
  const chatSnapshot = await getDoc(chatRef);
  const data = chatSnapshot.data();

  const newMessage = {
    text,
    sender,
    createdAt: new Date().toISOString(),
    date: new Date().toDateString(),
    time: new Date().toTimeString(),
    attachments: [],
    read: false,
  };

  // add new message
  await addDoc(messagesRef, newMessage);

  //  update last message for chat
  await updateDoc(chatRef, {
    lastMessage: newMessage,
    [`${receipient}UnreadMessagesCount`]:
      data[`${receipient}UnreadMessagesCount`] + 1,
  });
};

export const updateLastMessage = async (chatId, currentUser) => {
  const chatRef = doc(db, "chats", chatId);
  const chatSnapshot = await getDoc(chatRef);
  const data = chatSnapshot.data();

  const sender = data?.lastMessage.sender;

  if (data && sender !== currentUser) {
    const updatedLastMessage = {
      ...data.lastMessage,
      read: true,
    };

    await updateDoc(chatRef, {
      lastMessage: updatedLastMessage,
    });
  }
};

export const resetUreadMessageCount = async (chatId, currentUser) => {
  const chatRef = doc(db, "chats", chatId);

  await updateDoc(chatRef, {
    [`${currentUser}UnreadMessagesCount`]: 0,
  });
};
