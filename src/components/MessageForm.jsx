import React from "react";

// context
import { useUser } from "../contexts/UserContext";
import { useMessage } from "../contexts/MessageContext";

// firebase
import {
  createChat,
  createMessage,
  updateChatActiveTime,
} from "../firebase/chats";

// mui
import { Stack, TextField, Button } from "@mui/material";

const MessageForm = ({ chatId, receipient }) => {
  const { currentUser } = useUser();
  const { messageText, setMessageText } = useMessage();

  const handleSendMessage = async () => {
    setMessageText("");
    await createChat(receipient, currentUser, chatId);
    await createMessage(
      chatId,
      messageText,
      currentUser.username,
      receipient.username
    );
    await updateChatActiveTime(chatId);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        border: "1px solid #bdc3c7",
        mb: "10px",
        borderRadius: "40px",
      }}
    >
      <TextField
        placeholder="Type message here"
        fullWidth
        onChange={(e) => setMessageText(e.target.value)}
        value={messageText}
        multiline
        maxRows={2}
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent",
            },
          },
        }}
      />

      <Button
        sx={{
          textTransform: "capitalize",
          "&:hover": {
            background: "transparent",
          },
        }}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Stack>
  );
};

export default MessageForm;
