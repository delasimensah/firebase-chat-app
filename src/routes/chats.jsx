import React, { useState, useEffect } from "react";

// context
import { useAuth } from "../contexts/UserContext";

// firebase
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { logout } from "../firebase/authentication.js";

// mui
import { Stack, Button, List, TextField, Typography } from "@mui/material";

// components
import ChatItem from "../components/ChatItem";
import SearchResult from "../components/SearchResult";
// import ChatListSkeleton from "../components/ChatListSkeleton";

const Chats = () => {
  const { currentUser } = useAuth();
  const storedChatList = localStorage.getItem("chatlist")
    ? JSON.parse(localStorage.getItem("chatlist"))
    : [];

  const [chats, setChats] = useState(storedChatList);
  // const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("username", "==", searchText)
    );

    // setLoading(true);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());

      setSearchResults(data);
    });

    return () => unsubscribe();
  }, [searchText]);

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
          position: "relative",
        }}
      >
        <Button
          onClick={() => {
            logout();
            localStorage.setItem("chatlist", []);
          }}
        >
          Logout
        </Button>

        <Stack sx={{}}>
          <TextField
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {searchText && (
            <Stack
              sx={{
                height: 100,
                width: "100%",
                zIndex: 5000,
                border: "1px solid black",
                background: "white",
                position: "absolute",
                top: 90,
                bottom: 0,
              }}
            >
              {searchResults.length ? (
                <List>
                  {searchResults.map((result, idx) => (
                    <SearchResult
                      key={idx}
                      result={result}
                      setSearchText={setSearchText}
                      chats={chats}
                    />
                  ))}
                </List>
              ) : (
                <Stack>
                  {" "}
                  <Typography>No results</Typography>
                </Stack>
              )}
            </Stack>
          )}
        </Stack>

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
