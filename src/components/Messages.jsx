import React, { useState, useEffect } from "react";
import { groupByDate } from "../utils/groupByDate";

// firebase
import { db } from "../firebase/firebaseConfig";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

// mui
import { Stack, Typography } from "@mui/material";

// components
import MessageGroup from "./MessageGroup";

const Messages = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    setLoading(true);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const newMessages = groupByDate(data);

      setMessages(newMessages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [chatId]);

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
