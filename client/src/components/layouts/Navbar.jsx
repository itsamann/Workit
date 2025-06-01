import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { CheckSquare } from "lucide-react";
import { UserContext } from "../../context/userContext";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // Handle logo click
  const handleLogoClick = () => {
    if (!user) {
      navigate("/"); // If not logged in, go home or landing page
    } else if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  };

  return (
    <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-50">
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <div
        onClick={handleLogoClick}
        className="flex items-center space-x-2 cursor-pointer"
      >
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
          <CheckSquare className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold text-slate-900">Workit</span>
      </div>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
