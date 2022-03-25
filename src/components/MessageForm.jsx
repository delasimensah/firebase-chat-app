import React from "react";

// context
import { useUser } from "../contexts/UserContext";
import { useMessage } from "../contexts/MessageContext";

// firebase
import { createMessage } from "../firebase/chats";

// mui
import { Stack, TextField, Button } from "@mui/material";

const MessageForm = ({ chatId }) => {
  const { currentUser } = useUser();
  const { messageText, setMessageText } = useMessage();

  const handleSendMessage = async () => {
    setMessageText("");
    await createMessage(chatId, messageText, currentUser.username);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      // sx={{ border: "1px solid black" }}
    >
      <TextField
        placeholder="Type message here"
        fullWidth
        onChange={(e) => setMessageText(e.target.value)}
        value={messageText}
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
