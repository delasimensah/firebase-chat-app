import React from "react";
import { useLocation, useParams } from "react-router-dom";

// mui
import { Stack } from "@mui/material";

// components
import ChatHeader from "../components/ChatHeader";
import Messages from "../components/Messages";
import MessageForm from "../components/MessageForm";

const Chat = () => {
  const { state } = useLocation();
  const { chat } = useParams();

  return (
    <Stack justifyContent="center" alignItems="center">
      <Stack
        sx={{
          width: {
            xs: "100%",
            sm: "40%",
          },
          height: "100vh",
        }}
      >
        <ChatHeader username={state.username} chat={chat} />

        <Messages chatId={chat} />

        <MessageForm chatId={chat} receipient={state} />
      </Stack>
    </Stack>
  );
};

export default Chat;
