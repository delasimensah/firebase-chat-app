import React from "react";

// mui
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Skeleton,
} from "@mui/material";

const ChatListSkeleton = () => {
  const array = new Array(5).fill(0);

  return (
    <List sx={{ width: "100%" }}>
      {array.map((_) => {
        return (
          <ListItem>
            <ListItemAvatar>
              <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText primary={<Skeleton />} secondary={<Skeleton />} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default ChatListSkeleton;
