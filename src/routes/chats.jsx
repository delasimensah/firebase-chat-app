import React, { useState, useEffect } from "react";
import { IoLogOutOutline, IoCreateOutline } from "react-icons/io5";

// context
import { useAuth } from "../contexts/UserContext";

// firebase
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";

// mui
import {
  Stack,
  Button,
  List,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// components
import ChatItem from "../components/ChatItem";
// import ChatListSkeleton from "../components/ChatListSkeleton";
import LogoutDialog from "../components/dialogs/LogoutDialog";
import NewChatDialog from "../components/dialogs/NewChatDialog";

const CustomIconButton = styled(IconButton)({
  "&:hover": {
    background: "transparent",
  },
});

const Chats = () => {
  const { currentUser } = useAuth();
  const storedChatList = localStorage.getItem("chatlist")
    ? JSON.parse(localStorage.getItem("chatlist"))
    : [];

  const [chats, setChats] = useState(storedChatList);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openNewChatDialog, setOpenNewChatDialog] = useState(false);

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
          width: {
            xs: "100%",
            sm: "40%",
          },
          height: "100vh",
          position: "relative",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <>
            <Tooltip title="Logout">
              <CustomIconButton onClick={() => setOpenLogoutDialog(true)}>
                <IoLogOutOutline />
              </CustomIconButton>
            </Tooltip>

            <LogoutDialog
              handleClose={() => setOpenLogoutDialog(false)}
              open={openLogoutDialog}
            />
          </>

          <Typography sx={{ textTransform: "capitalize" }}>
            {currentUser.username}
          </Typography>

          <>
            <Tooltip title="New Chat">
              <CustomIconButton onClick={() => setOpenNewChatDialog(true)}>
                <IoCreateOutline />
              </CustomIconButton>
            </Tooltip>

            <NewChatDialog
              handleClose={() => setOpenNewChatDialog(false)}
              open={openNewChatDialog}
            />
          </>
        </Stack>

        {chats.length ? (
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
        ) : (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ flexGrow: 1 }}
            spacing={1}
          >
            <Typography>No Messages</Typography>
            <Button
              sx={{ textTransform: "capitalize" }}
              onClick={() => setOpenNewChatDialog(true)}
            >
              Start a message
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Chats;
