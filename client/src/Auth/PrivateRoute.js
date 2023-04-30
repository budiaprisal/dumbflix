import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext";

export function PrivateRouteLogin() {
  const [state] = useContext(UserContext);

  if (!state.isLogin) {
    return <Navigate to="/Auth" />;
  }
  return <Outlet />;
}

export function PrivateRouteUser() {
  const [state] = useContext(UserContext);

  if (state.user.role === "user") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export function PrivateRouteAdmin() {
  const [state] = useContext(UserContext);

  if (state.user.role !== "admin") {
    return <Navigate to="/listfilms" />;
  }
  return <Outlet />;
}
