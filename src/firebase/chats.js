import { db } from "./firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const checkIfExisitingChatHasBothMembers = async (currentUser, hit) => {
  const memberOne = {
    id: currentUser.userId,
    username: currentUser.username,
  };

  const memberTwo = {
    id: hit.objectID,
    username: hit.username,
  };

  const q = query(
    collection(db, "chats"),
    where("members", "==", [memberOne, memberTwo])
  );

  const q2 = query(
    collection(db, "chats"),
    where("members", "==", [memberTwo, memberOne])
  );

  const querySnapshot = await getDocs(q);
  const querySnapshot2 = await getDocs(q2);

  const data = querySnapshot.docs.map((doc) => doc.id);
  const data2 = querySnapshot2.docs.map((doc) => doc.id);

  return [...data, ...data2];
};

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
      activeTime: new Date().toISOString(),
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

export const updateChatActiveTime = async (chatId) => {
  const chatRef = doc(db, "chats", chatId);

  const newActiveTime = new Date().toISOString();

  await updateDoc(chatRef, {
    activeTime: newActiveTime,
  });
};
