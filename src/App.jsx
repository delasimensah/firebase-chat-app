import { Routes, Route } from "react-router-dom";

import Authentication from "./routes/authentication";
import Chats from "./routes/chats";
import Chat from "./routes/chat";

const App = () => {
  return (
    <Routes>
      <Route path="auth" element={<Authentication />} />
      <Route path="/" element={<Chats />} />
      <Route path="chat" element={<Chat />} />
    </Routes>
  );
};

export default App;
