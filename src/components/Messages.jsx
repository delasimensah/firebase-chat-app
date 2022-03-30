import React, { useState, useEffect } from "react";
import { groupByDate } from "../utils/groupByDate";

// context
import { useUser } from "../contexts/UserContext";

// firebase
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { resetUreadMessageCount, updateLastMessage } from "../firebase/chats";

// mui
import { Stack, CircularProgress } from "@mui/material";

// components
import MessageGroup from "./MessageGroup";

const Messages = ({ chatId }) => {
  const {
    currentUser: { username },
  } = useUser();
  const [messages, setMessages] = useState([]);
  const [unGroupedMsgs, setUnGroupedMsgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recievedMessagesCount, setReceivedMessagesCount] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    if (recievedMessagesCount > 0) {
      resetUreadMessageCount(chatId, username);
    }
    updateLastMessage(chatId, username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recievedMessagesCount, chatId]);

  const getNextBatch = async () => {
    setLoadMore(true);

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "desc"),
      startAfter(lastMessage),
      limit(100)
    );

    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const newMessages = [...data.reverse(), ...unGroupedMsgs];
    setUnGroupedMsgs(newMessages);

    const groupedMessages = groupByDate(newMessages);

    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    setLastMessage(lastDoc);

    setMessages(groupedMessages);
    setLoadMore(false);
  };

  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "desc"),
      limit(100)
    );

    setLoading(true);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUnGroupedMsgs(data);

      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastMessage(lastDoc);

      const receivedMessages = data.filter((message) => {
        return message.sender !== username;
      });

      setReceivedMessagesCount(receivedMessages.length);

      const groupedMessages = groupByDate(data.reverse());

      setMessages(groupedMessages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [chatId, username]);

  return (
    <>
      {loading ? (
        <Stack
          sx={{ flexGrow: 1 }}
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="primary" size={30} />
        </Stack>
      ) : (
        <Stack
          sx={{ flexGrow: 1, overflowY: "auto" }}
          spacing={5}
          onScroll={(e) => {
            if (e.target.scrollTop === 0) {
              // todo load more messages
              if (lastMessage) {
                getNextBatch();
                console.log("called 3");
              }
            }
          }}
        >
          {loadMore && (
            <Stack alignItems="center">
              <CircularProgress color="primary" size={20} />
            </Stack>
          )}
          {messages.map((message) => {
            return <MessageGroup key={message.date} message={message} />;
          })}
        </Stack>
      )}
    </>
  );
};

export default Messages;
