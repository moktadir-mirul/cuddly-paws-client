import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import { Navigate, useLocation } from "react-router";
import useUserRole from "../Hooks/useUserRole";
import LoadingCard from "../Components/LoadingState/DefaultLoading";

const AdminRoute = ({ children }) => {
  const { user, pageLoading } = useContext(AuthContext);
  const { role, roleBasedLoading } = useUserRole();
  const location = useLocation();

  if (pageLoading || roleBasedLoading) {
    return <LoadingCard></LoadingCard>;
  }

  if (!user) {
    return <Navigate state={location?.pathname} to={"/login"}></Navigate>;
  }
  if (user && role !== "admin") {
    return <Navigate to={"/dashboard"}></Navigate>;
  }

  return children;
};

export default AdminRoute;
