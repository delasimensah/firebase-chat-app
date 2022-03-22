import React from "react";
import { IoSend } from "react-icons/io5";

// mui
import { Stack, TextField, IconButton, Typography } from "@mui/material";

const Chat = () => {
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
        <Stack sx={{ flexGrow: 1, overflowY: "auto" }}>
          <Typography>messages</Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ p: 2 }}>
          <TextField placeholder="Type message here" fullWidth />
          <IconButton>
            <IoSend />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Chat;
