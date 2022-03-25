import { createContext, useState, useContext } from "react";

const MessageContext = createContext({});

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [messageText, setMessageText] = useState("");

  const value = { messageText, setMessageText };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};
