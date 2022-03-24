import React, { useEffect, useRef } from "react";

// context
import { useAuth } from "../contexts/UserContext";

// mui
import { Box } from "@mui/material";

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
      ref={scrollRef}
      sx={{
        display: "inline",
        alignSelf: sender === username ? "flex-end" : "flex-start",
        borderRadius: "20px",
        background: sender === username ? "#3498db" : "#ecf0f1",
        p: 1,
        maxWidth: "280px",
      }}
    >
      {message.text}
    </Box>
  );
};

export default Message;
