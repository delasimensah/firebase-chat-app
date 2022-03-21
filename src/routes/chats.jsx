import React from "react";

// context
import { useAuth } from "../contexts/UserContext";

// firebase
import { logout } from "../firebase/authentication.js";

// mui
import { Button, Typography, Stack } from "@mui/material";

const Chats = () => {
  const { currentUser } = useAuth();

  return (
    <Stack>
      <Typography>Chats {currentUser?.username}</Typography>
      <Button onClick={() => logout()}>Logout</Button>
    </Stack>
  );
};

export default Chats;
