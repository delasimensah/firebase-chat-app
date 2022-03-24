import React from "react";

// mui
import { Stack, Typography } from "@mui/material";

// components
import Message from "./Message";

const MessageGroup = ({ message }) => {
  console.log(message.messages);
  return (
    <Stack spacing={1}>
      <Typography sx={{ textAlign: "center" }}>{message.date}</Typography>

      <Stack sx={{ py: 1, px: "10px" }} spacing={1}>
        {message.messages.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </Stack>
    </Stack>
  );
};

export default MessageGroup;
