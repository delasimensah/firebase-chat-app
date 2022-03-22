import React from "react";

// context
import { useAuth } from "../contexts/UserContext";

// firebase
import { createChat } from "../firebase/chats";

// mui
import {
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

const SearchResult = ({ result, setSearchText }) => {
  const { currentUser } = useAuth();

  const handleCreateChat = async () => {
    await createChat(result, currentUser);
    setSearchText("");
  };
  return (
    <ListItem disablePadding>
      <ListItemButton disableRipple onClick={handleCreateChat}>
        <ListItemAvatar>
          <Avatar>{result.username.toUpperCase()[0]}</Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={
            <Typography sx={{ textTransform: "capitalize" }}>
              {result.username}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SearchResult;
