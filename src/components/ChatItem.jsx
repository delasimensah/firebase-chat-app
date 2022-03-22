import React from "react";
import { useNavigate } from "react-router-dom";

// mui
import {
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

const ChatItem = ({ chat, otherMember }) => {
  const navigate = useNavigate();

  return (
    <ListItem disablePadding>
      <ListItemButton
        disableRipple
        onClick={() => navigate(`chats/${chat.id}`)}
      >
        <ListItemAvatar>
          <Avatar>{otherMember.username.toUpperCase()[0]}</Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={
            <Typography sx={{ textTransform: "capitalize" }}>
              {otherMember.username}
            </Typography>
          }
          secondary={chat.lastMessage}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default ChatItem;