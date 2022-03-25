import React from "react";
import Moment from "react-moment";

// mui
import { Stack, Typography } from "@mui/material";

// components
import Message from "./Message";

const MessageGroup = ({ message }) => {
  return (
    <Stack spacing={1}>
      <Typography
        sx={{ textAlign: "center", fontSize: "14px", color: "#7f8c8d" }}
      >
        <Moment format="MMMM Do YYYY">{message.date}</Moment>
      </Typography>

      <Stack sx={{ py: 1, px: "10px" }} spacing={1}>
        {message.messages.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </Stack>
    </Stack>
  );
};

export default MessageGroup;
