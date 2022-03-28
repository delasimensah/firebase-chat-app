import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stringToColor } from "../utils/stringToColor";
import Moment from "react-moment";

// context
import { useUser } from "../contexts/UserContext";

// firebase
import { db } from "../firebase/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

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
  } = useUser();

  const [onlineStatus, setOnlineStatus] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", otherMember.id), (doc) => {
      const { isOnline, activeTime } = doc.data();

      setOnlineStatus({ isOnline, activeTime });
    });

    return unsub;
  }, [otherMember.id]);

  return (
    <ListItem disablePadding>
      <ListItemButton
        disableRipple
        onClick={() =>
          navigate(`${chat.id}`, {
            state: { username: otherMember.username, objectID: otherMember.id },
          })
        }
      >
        <ListItemAvatar>
          <Badge
            color="error"
            badgeContent={chat[`${username}UnreadMessagesCount`]}
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
              {!onlineStatus && (
                <>
                  {chat.lastMessage?.sender === username && "Me: "}
                  {chat.lastMessage?.text}
                </>
              )}

              {onlineStatus && (
                <>
                  {onlineStatus.isOnline ? (
                    <>
                      {chat.lastMessage?.sender === username && "Me: "}
                      {chat.lastMessage?.text}
                    </>
                  ) : (
                    <>
                      Active <Moment fromNow>{onlineStatus?.activeTime}</Moment>
                    </>
                  )}
                </>
              )}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default ChatItem;
