import React from "react";
import { useNavigate } from "react-router-dom";
import { stringToColor } from "../utils/stringToColor";

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
        onClick={() => navigate(`${chat.id}`, { state: otherMember.username })}
      >
        <ListItemAvatar>
          <Avatar
            sx={{
              bgcolor: stringToColor(otherMember.username),
            }}
          >
            {otherMember.username.toUpperCase()[0]}
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={
            <Typography sx={{ textTransform: "capitalize" }}>
              {otherMember.username}
            </Typography>
          }
          secondary={
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "200px",
              }}
            >
              {chat.lastMessage?.text}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default ChatItem;
