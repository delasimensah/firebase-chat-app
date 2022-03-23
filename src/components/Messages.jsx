import React, { useState, useEffect } from "react";

// firebase
import { db } from "../firebase/firebaseConfig";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

// mui
import { Stack } from "@mui/material";

// components
import Message from "./Message";

const Messages = ({ chatId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(data);
      // localStorage.setItem("chatlist", JSON.stringify(data));
    });

    return () => unsubscribe();
  }, [chatId]);

  return (
    <Stack
      sx={{ flexGrow: 1, overflowY: "auto", py: 1, px: "10px" }}
      spacing={1}
    >
      {messages.map((message) => {
        return <Message key={message.id} message={message} />;
      })}
    </Stack>
  );
};

export default Messages;
