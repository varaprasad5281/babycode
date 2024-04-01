import { checkAuth } from "../utils/helpers";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  if (checkAuth()) {
    return children;
  }
  return <Navigate to="/" />;
};
