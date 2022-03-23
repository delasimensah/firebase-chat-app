import React from "react";
import { useNavigate } from "react-router-dom";
import { stringToColor } from "../utils/stringToColor";

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

const SearchResult = ({ hit }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleCreateChat = async () => {
    navigate(`${currentUser.userId}_${hit.objectID}`, { state: hit.username });
    await createChat(hit, currentUser);
  };

  return (
    <ListItem disablePadding>
      <ListItemButton disableRipple onClick={handleCreateChat}>
        <ListItemAvatar>
          <Avatar
            sx={{
              bgcolor: stringToColor(hit.username),
            }}
          >
            {hit.username.toUpperCase()[0]}
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={
            <Typography sx={{ textTransform: "capitalize" }}>
              {hit.username}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SearchResult;
