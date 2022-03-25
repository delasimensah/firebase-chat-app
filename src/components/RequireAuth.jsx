import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const RequireAuth = ({ children }) => {
  const { currentUser } = useUser();

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default RequireAuth;
