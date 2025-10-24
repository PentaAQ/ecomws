import { Navigate } from "react-router-dom";
import { useSubcription } from "../stores/AuthStore";

export const RouteProtecter = ({ children, authenticate = true }) => {
  const { user } = useSubcription();
  if (authenticate === false) {
    if (!user) {
      return children;
    } else {
      return <Navigate to={"/admin"} replace />;
    }
  }
  if (authenticate) {
    if (user) {
      return children;
    } else {
      return <Navigate to={"/login"} replace />;
    }
  }

  return <Navigate to="/login" replace />;
};
