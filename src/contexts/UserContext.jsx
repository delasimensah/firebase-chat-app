import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// firebase
import { onAuthStateChangedListener } from "../firebase/authentication";
import { getUserDocument } from "../firebase/users";

const UserContext = createContext({});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const storedUserData = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [currentUser, setCurrentUser] = useState(storedUserData);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        const userInfo = await getUserDocument(user.uid);
        localStorage.setItem("user", JSON.stringify(userInfo));
        setCurrentUser(userInfo);
      } else {
        localStorage.setItem("user", JSON.stringify(null));
        setCurrentUser(user);
      }
    });

    return unsubscribe;
  }, [navigate]);

  const value = { currentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
