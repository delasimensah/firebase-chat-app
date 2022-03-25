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
import { resetUreadMessageCount } from "../firebase/chats";

// mui
import { Stack, Typography } from "@mui/material";

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
  }, [recievedMessagesCount, chatId, username]);

  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc"),
      limit(100)
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

      const newMessages = groupByDate(data);

      setMessages(newMessages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [chatId, username]);

  return (
    <>
      {loading ? (
        <Stack sx={{ flexGrow: 1 }} spacing={1}>
          <Typography>Loading...</Typography>
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
