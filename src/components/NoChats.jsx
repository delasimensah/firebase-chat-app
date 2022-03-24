import React from "react";

// mui
import { Stack, Button, Typography } from "@mui/material";

const NoChats = ({ setOpenNewChatDialog }) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ flexGrow: 1 }}
      spacing={1}
    >
      <Typography>No Messages</Typography>
      <Button
        sx={{ textTransform: "capitalize" }}
        onClick={() => setOpenNewChatDialog(true)}
      >
        Start a message
      </Button>
    </Stack>
  );
};

export default NoChats;
