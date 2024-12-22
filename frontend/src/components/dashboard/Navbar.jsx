import React from "react";
import { useAuth } from "../../context/authContext";
import { HiOutlineUserCircle, HiOutlineLogout } from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between h-16 px-6 bg-gray-800 shadow-md">
      <div className="flex items-center gap-3 text-white">
        <HiOutlineUserCircle className="text-2xl" />
        <p className="text-lg font-medium">Welcome, {user.name}</p>
      </div>
      <button
        onClick={logout}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-900 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full hover:from-blue-500 hover:to-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
      >
        <HiOutlineLogout className="text-lg" />
        Logout
      </button>
    </div>
  );
};

export default Navbar;
