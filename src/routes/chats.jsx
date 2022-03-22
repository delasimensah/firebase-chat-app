import React, { useState, useEffect } from "react";

// context
import { useAuth } from "../contexts/UserContext";

// firebase
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { logout } from "../firebase/authentication.js";

// mui
import { Stack, Button, List } from "@mui/material";

// components
import ChatItem from "../components/ChatItem";
// import ChatListSkeleton from "../components/ChatListSkeleton";

const Chats = () => {
  const { currentUser } = useAuth();
  const storedChatList = localStorage.getItem("chatlist")
    ? JSON.parse(localStorage.getItem("chatlist"))
    : [];

  const [chats, setChats] = useState(storedChatList);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "chats"),
      where("members", "array-contains", {
        id: currentUser.userId,
        username: currentUser.username,
      })
    );

    // setLoading(true);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setChats(data);
      localStorage.setItem("chatlist", JSON.stringify(data));
      // setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <Stack justifyContent="center" alignItems="center">
      <Stack
        sx={{
          // border: "1px solid black",
          width: {
            xs: "100%",
            sm: "40%",
          },
          height: "100vh",
        }}
      >
        <Button onClick={() => logout()}>Logout</Button>

        <List>
          {chats.map((chat) => {
            const otherMember = chat.members.find(
              (member) => member.id !== currentUser.userId
            );

            return (
              <ChatItem key={chat.id} chat={chat} otherMember={otherMember} />
            );
          })}
        </List>
      </Stack>
    </Stack>
  );
};

export default Chats;
