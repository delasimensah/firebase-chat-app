import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChangedListener } from "../firebase/authentication";
import { getUserDocument } from "../firebase/users";

const UserContext = createContext({});

export const useAuth = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        const userInfo = await getUserDocument(user.displayName);
        setCurrentUser(userInfo);
        navigate("/");
      } else {
        setCurrentUser(user);
        navigate("/auth");
      }
    });

    return unsubscribe;
  }, [navigate]);

  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
