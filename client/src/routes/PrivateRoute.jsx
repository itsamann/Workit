import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/userContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useUser();

  // Show spinner while loading user data
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user role is allowed, render nested routes
  if (allowedRoles.includes(user.role)) {
    return <Outlet />;
  }

  // User is logged in but role is NOT allowed - redirect to their dashboard
  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (user.role === "user") {
    return <Navigate to="/user/dashboard" replace />;
  }

  // Default fallback: logout or redirect to login
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
