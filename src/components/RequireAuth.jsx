import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";

const RequireAuth = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
