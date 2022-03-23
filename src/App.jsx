import { Routes, Route, Navigate } from "react-router-dom";

// context
import { useAuth } from "./contexts/UserContext";

// routes
import Authentication from "./routes/authentication";
import Chats from "./routes/chats";
import Chat from "./routes/chat";

// components
import RequireAuth from "./components/RequireAuth";

const App = () => {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route
        path="auth"
        element={currentUser ? <Navigate to="/" replace /> : <Authentication />}
      />

      <Route
        path="/"
        element={
          <RequireAuth>
            <Chats />
          </RequireAuth>
        }
      />

      <Route
        path=":chat"
        element={
          <RequireAuth>
            <Chat />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default App;
