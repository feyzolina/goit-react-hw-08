import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isRefreshing = useSelector(state => state.auth.isRefreshing);

  if (isRefreshing) {
    return null;
  }

  return isLoggedIn ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;