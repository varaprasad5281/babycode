import { Navigate } from "react-router-dom";

export const ProtectRoutes = ({ children }) => {
  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export const PublicRoutes = ({ children }) => {
  if (!sessionStorage.getItem("token")) {
    return children;
  }
  return <Navigate to="/" />;
};
