import React, { useEffect, useRef } from "react";

// context
import { useAuth } from "../contexts/UserContext";

// mui
import { Box, Typography } from "@mui/material";

const Message = ({ message }) => {
  const {
    currentUser: { username },
  } = useAuth();
  const { sender } = message;

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <Box
      onClick={() => message.sender === username && console.log(message.id)}
      ref={scrollRef}
      sx={{
        display: "inline",
        alignSelf: sender === username ? "flex-end" : "flex-start",
        borderRadius: "20px",
        border: sender === username ? "0px" : "1px solid #bdc3c7",
        background: sender === username ? "#ecf0f1" : "#fff",
        p: 1,
        maxWidth: "280px",
      }}
    >
      {message.text}
    </Box>
  );
};

export default Message;
