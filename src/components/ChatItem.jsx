import React from "react";
import { useNavigate } from "react-router-dom";
import { stringToColor } from "../utils/stringToColor";

// context
import { useAuth } from "../contexts/UserContext";

// mui
import {
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
  Stack,
} from "@mui/material";

const ChatItem = ({ chat, otherMember }) => {
  const navigate = useNavigate();
  const {
    currentUser: { username },
  } = useAuth();

  return (
    <ListItem disablePadding>
      <ListItemButton
        disableRipple
        onClick={() => navigate(`${chat.id}`, { state: otherMember.username })}
      >
        <ListItemAvatar>
          <Badge
            // variant="dot"
            // invisible={
            //   chat.lastMessage?.sender === username || chat.lastMessage?.read
            // }
            color="error"
            badgeContent={10}
            max={99}
          >
            <Avatar
              sx={{
                bgcolor: stringToColor(otherMember.username),
              }}
            >
              {otherMember.username.toUpperCase()[0]}
            </Avatar>
          </Badge>
        </ListItemAvatar>

        <ListItemText
          primary={
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography sx={{ textTransform: "capitalize" }} variant="body1">
                {otherMember.username}
              </Typography>
            </Stack>
          }
          secondary={
            <Typography
              variant="body2"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "200px",
                color: "#7f8c8d",
              }}
            >
              {chat.lastMessage.sender === username && "Me: "}
              {chat.lastMessage?.text}
            </Typography>
          }
        />
        {/* {chat.lastMessage && (
          <Badge
            variant="dot"
            invisible={
              chat.lastMessage.sender === username || chat.lastMessage.read
            }
            color="primary"
          />
        )} */}
      </ListItemButton>
    </ListItem>
  );
};

export default ChatItem;
