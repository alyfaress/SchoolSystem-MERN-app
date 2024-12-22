import React from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineChartSquareBar,
  HiOutlineUserGroup,
  HiOutlineOfficeBuilding,
  HiOutlineCalendar,
  HiOutlineCash,
  HiOutlineCog,
} from "react-icons/hi";

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed w-64 space-y-6 shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-900  h-16 flex items-center justify-center">
        <h3 className="text-xl font-bold tracking-wide">Employee Management</h3>
      </div>

      {/* Navigation Links */}
      <nav className="px-4 space-y-4">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center space-x-4 px-4 py-3 rounded-lg text-sm font-medium transition ${
              isActive
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-blue-600 hover:text-white"
            }`
          }
          end
        >
          <HiOutlineChartSquareBar className="text-xl" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `flex items-center space-x-4 px-4 py-3 rounded-lg text-sm font-medium transition ${
              isActive
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-blue-600 hover:text-white"
            }`
          }
        >
          <HiOutlineUserGroup className="text-xl" />
          <span>Employee</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `flex items-center space-x-4 px-4 py-3 rounded-lg text-sm font-medium transition ${
              isActive
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-blue-600 hover:text-white"
            }`
          }
        >
          <HiOutlineOfficeBuilding className="text-xl" />
          <span>Department</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `flex items-center space-x-4 px-4 py-3 rounded-lg text-sm font-medium transition ${
              isActive
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-blue-600 hover:text-white"
            }`
          }
        >
          <HiOutlineCalendar className="text-xl" />
          <span>Leave</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) =>
            `flex items-center space-x-4 px-4 py-3 rounded-lg text-sm font-medium transition ${
              isActive
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-blue-600 hover:text-white"
            }`
          }
        >
          <HiOutlineCash className="text-xl" />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/setting"
          className={({ isActive }) =>
            `flex items-center space-x-4 px-4 py-3 rounded-lg text-sm font-medium transition ${
              isActive
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-blue-600 hover:text-white"
            }`
          }
        >
          <HiOutlineCog className="text-xl" />
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
