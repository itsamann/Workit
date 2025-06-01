import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";

const SideMenu = ({ activeMenu }) => {
  const { user, logout } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      logout();
      return;
    }
    navigate(route);
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
  }, [user]);

  return (
    <>
      {/* Sidebar container */}
      <div
        className={`
          fixed top-[61px] left-0 z-30
          h-[calc(100vh-61px)]
          w-full md:w-64
          bg-white border-r border-gray-200/50
          overflow-y-auto
          transition-transform duration-300
          md:sticky md:top-[61px]
        `}
      >
        <div className="flex flex-col items-center justify-center mb-7 pt-5">
          <div className="relative">
            <img
              src={user?.profilePic || ""}
              alt="Profile"
              className="w-20 h-20 bg-slate-400 rounded-full"
            />
          </div>

          {user?.role === "admin" && (
            <div className="text-[10px] font-medium text-white bg-blue-600 px-3 py-0.5 rounded mt-1">
              Admin
            </div>
          )}
          <h5 className="text-gray-950 font-medium leading-6 mt-3">
            {user?.name || ""}
          </h5>
          <p className="text-[12px] text-gray-500">{user?.email || ""}</p>
        </div>

        {sideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] ${
              activeMenu === item.name
                ? "text-blue-600 bg-gradient-to-r from-blue-50/40 to-blue-100/50 border-r-4 border-blue-500"
                : "text-gray-700"
            } py-3 px-6 mb-3 cursor-pointer transition hover:bg-gray-50`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl" />
            {item.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default SideMenu;
