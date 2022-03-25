import React, { useState, useEffect } from "react";

// context
import { useUser } from "../contexts/UserContext";

// firebase
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

// mui
import { Stack } from "@mui/material";

// components
import ChatListSkeleton from "../components/ChatListSkeleton";
import ChatListHeader from "../components/ChatListHeader";
import ChatList from "../components/ChatList";
import NoChats from "../components/NoChats";

const Chats = () => {
  const { currentUser } = useUser();
  const storedChatList = localStorage.getItem("chatlist")
    ? JSON.parse(localStorage.getItem("chatlist"))
    : [];

  const [chats, setChats] = useState(storedChatList);
  const [openNewChatDialog, setOpenNewChatDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const q = query(
      collection(db, "chats"),
      where("members", "array-contains", {
        id: currentUser.userId,
        username: currentUser.username,
      }),
      orderBy("createdAt", "desc")
    );

    if (!chats.length) {
      setLoading(true);
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const unreadMessages = data.filter((msg) => {
        return (
          msg.lastMessage?.read === false &&
          msg.lastMessage?.sender !== currentUser.username
        );
      });

      setUnread(unreadMessages.length);

      setChats(data);
      localStorage.setItem("chatlist", JSON.stringify(data));
      setLoading(false);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack justifyContent="center" alignItems="center">
      <Stack
        sx={{
          width: {
            xs: "100%",
            sm: "40%",
          },
          height: "100vh",
          position: "relative",
        }}
      >
        <ChatListHeader
          openNewChatDialog={openNewChatDialog}
          setOpenNewChatDialog={setOpenNewChatDialog}
          unread={unread}
        />

        {loading ? (
          <ChatListSkeleton />
        ) : (
          <>
            {chats.length ? (
              <ChatList chats={chats} />
            ) : (
              <NoChats setOpenNewChatDialog={setOpenNewChatDialog} />
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default Chats;
