import React from "react";
import { useNavigate } from "react-router-dom";
import { stringToColor } from "../utils/stringToColor";

// context
import { useUser } from "../contexts/UserContext";

// firebase
import { checkIfExisitingChatHasBothMembers } from "../firebase/chats";

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
  const { currentUser } = useUser();
  const navigate = useNavigate();

  const handleCreateChat = async () => {
    const exists = await checkIfExisitingChatHasBothMembers(currentUser, hit);

    if (!exists.length) {
      navigate(`${currentUser.userId}_${hit.objectID}`, {
        state: { username: hit.username, objectID: hit.objectID },
      });
    } else {
      navigate(`${exists[0]}`, {
        state: { username: hit.username, objectID: hit.objectID },
      });
    }
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
