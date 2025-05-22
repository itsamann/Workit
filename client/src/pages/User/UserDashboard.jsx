import React from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  useUserAuth();
  return (
    <div>
      User Dashboard
      {JSON.stringify(user)}
    </div>
  );
};

export default UserDashboard;
