import React from "react";

// context
import { useAuth } from "../contexts/UserContext";

// mui
import { List } from "@mui/material";

// components
import ChatItem from "./ChatItem";

const ChatList = ({ chats }) => {
  const { currentUser } = useAuth();
  return (
    <List>
      {chats.map((chat) => {
        const otherMember = chat.members.find(
          (member) => member.id !== currentUser.userId
        );

        return <ChatItem key={chat.id} chat={chat} otherMember={otherMember} />;
      })}
    </List>
  );
};

export default ChatList;
