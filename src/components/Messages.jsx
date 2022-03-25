import React, { useState, useEffect } from "react";
import { groupByDate } from "../utils/groupByDate";

// context
import { useUser } from "../contexts/UserContext";

// firebase
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { resetUreadMessageCount, updateLastMessage } from "../firebase/chats";

// mui
import { Stack, CircularProgress } from "@mui/material";

// components
import MessageGroup from "./MessageGroup";

const Messages = ({ chatId }) => {
  const {
    currentUser: { username },
  } = useUser();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recievedMessagesCount, setReceivedMessagesCount] = useState(0);

  useEffect(() => {
    if (recievedMessagesCount > 0) {
      resetUreadMessageCount(chatId, username);
    }
    updateLastMessage(chatId, username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recievedMessagesCount, chatId]);

  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    setLoading(true);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const receivedMessages = data.filter((message) => {
        return message.sender !== username;
      });

      setReceivedMessagesCount(receivedMessages.length);

      const newMessages = groupByDate(data.reverse());

      setMessages(newMessages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [chatId, username]);

  return (
    <>
      {loading ? (
        <Stack
          sx={{ flexGrow: 1 }}
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="primary" size={30} />
        </Stack>
      ) : (
        <Stack sx={{ flexGrow: 1, overflowY: "auto" }} spacing={1}>
          {messages.map((message) => {
            return <MessageGroup key={message.date} message={message} />;
          })}
        </Stack>
      )}
    </>
  );
};

export default Messages;
