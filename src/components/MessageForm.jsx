import React, { useState } from "react";

// context
import { useAuth } from "../contexts/UserContext";

// firebase
import { createMessage } from "../firebase/chats";

// mui
import { Stack, TextField, Button } from "@mui/material";

const MessageForm = ({ chatId }) => {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    await createMessage(chatId, message, currentUser.username);
    setMessage("");
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ border: "1px solid black" }}
    >
      <TextField
        placeholder="Type message here"
        fullWidth
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        multiline
        maxRows={4}
      />

      <Button sx={{ textTransform: "capitalize" }} onClick={handleSendMessage}>
        Send
      </Button>
    </Stack>
  );
};

export default MessageForm;
