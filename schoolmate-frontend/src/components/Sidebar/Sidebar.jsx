import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import Logo from "../../assets/img/logo/logo.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  accountItems,
  menuItemsAdmin,
  menuItemsPrincipal,
  menuItemsStaff,
} from "./sidebarData.js";
import { BiSolidDashboard } from "react-icons/bi";
import { GiMeal } from "react-icons/gi";
import { RiShirtFill } from "react-icons/ri";
import { IoBookSharp } from "react-icons/io5";
import { PiStudentFill } from "react-icons/pi";
import { FaListCheck } from "react-icons/fa6";

const Sidebar = ({ setAuthenticated, role }) => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const standard = localStorage.getItem("standard");
  const facility = localStorage.getItem("facility");

  useEffect(() => {
    if (role === "admin") setMenuItems(menuItemsAdmin);
    else if (role === "staff") {
      setMenuItems(menuItemsStaff);
    } else if (role === "principal") setMenuItems(menuItemsPrincipal);
  }, [role]);

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } flex flex-col justify-between duration-500 h-screen p-5 pt-8 bg-dark relative`}
    >
      <div>
        <span
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 px-2 py-1 duration-500 bg-white border-dark ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        >
          <FaChevronLeft className="text-dark w-full" />
        </span>
        <div className="flex gap-x-4 items-center">
          <img
            src={Logo}
            className={`w-10 cursor-pointer duration-500 ${
              open ? "rotate-0" : "rotate-[360deg]"
            }`}
            alt=""
          />
          <h1
            className={`text-white origin-left font-medium ${
              !open ? "scale-x-0" : "scale-x-100"
            } duration-300`}
          >
            SchoolMATE
          </h1>
        </div>
        <ul className="flex flex-col gap-4 pt-6">
          {menuItems.map((menu, index) => (
            <NavLink
              key={index}
              to={menu.path}
              title={menu.title}
              className={`h-10 flex items-center gap-x-4 cursor-pointer py-2 duration-300 rounded-md ${
                location.pathname === menu.path
                  ? "bg-pink text-white"
                  : "text-gray-300 hover:bg-slate-600"
              }`}
            >
              <div className="">{menu.icon}</div>
              <span
                className={`${
                  !open ? "scale-x-0" : "scale-x-100"
                } origin-left duration-300`}
              >
                {menu.title}
              </span>
            </NavLink>
          ))}
          {standard !== (null || "") && role === "staff" && (
            <>
              <NavLink
                to={"/dashboard/staff/students"}
                title={"Students"}
                className={`h-10 flex items-center gap-x-4 cursor-pointer py-2 duration-300 rounded-md ${
                  location.pathname === "/dashboard/staff/students"
                    ? "bg-pink text-white"
                    : "text-gray-300 hover:bg-slate-600"
                }`}
              >
                <div className="">
                  <PiStudentFill className="w-10" />
                </div>
                <span
                  className={`${
                    !open ? "scale-x-0" : "scale-x-100"
                  } origin-left duration-300`}
                >
                  Students
                </span>
              </NavLink>
              <NavLink
                to={"/dashboard/staff/students/attendance"}
                title={"Attendance of Students"}
                className={`h-10 flex items-center gap-x-4 cursor-pointer py-2 duration-300 rounded-md ${
                  location.pathname === "/dashboard/staff/students/attendance"
                    ? "bg-pink text-white"
                    : "text-gray-300 hover:bg-slate-600"
                }`}
              >
                <div className="">
                  <FaListCheck className="w-10" />
                </div>
                <span
                  className={`${
                    !open ? "scale-x-0" : "scale-x-100"
                  } origin-left duration-300`}
                >
                  Attendance
                </span>
              </NavLink>
            </>
          )}

          {role === "staff" && facility != (null || "null" || "") && (
            <NavLink
              to={
                facility === "Mid-Day Meal"
                  ? "/dashboard/staff/mid-day-meal"
                  : facility === "Uniforms"
                  ? "/dashboard/staff/uniforms"
                  : facility === "Books"
                  ? "/dashboard/staff/books"
                  : "/dashboard/staff"
              }
              title={facility}
              className={`h-10 flex items-center gap-x-4 cursor-pointer py-2 duration-300 rounded-md ${
                location.pathname === "/dashboard/staff/mid-day-meal"
                  ? "bg-pink text-white"
                  : location.pathname === "/dashboard/staff/books"
                  ? "bg-pink text-white"
                  : location.pathname === "/dashboard/staff/uniforms"
                  ? "bg-pink text-white"
                  : "text-gray-300 hover:bg-slate-600"
              }`}
            >
              <div className="">
                {facility === "Mid-Day Meal" ? (
                  <GiMeal className="w-10" />
                ) : facility === "Uniforms" ? (
                  <RiShirtFill className="w-10" />
                ) : facility === "Books" ? (
                  <IoBookSharp className="w-10" />
                ) : (
                  <BiSolidDashboard className="w-10" />
                )}
              </div>
              <span
                className={`${
                  !open ? "scale-x-0" : "scale-x-100"
                } origin-left duration-300`}
              >
                {facility}
              </span>
            </NavLink>
          )}
        </ul>
      </div>
      <div className="flex flex-col gap-4 pt-6">
        {accountItems.map((item, index) => (
          <NavLink
            key={index}
            to={
              item.title === "Settings" && role === "admin"
                ? item.path.admin
                : item.title === "Settings" && role === "staff"
                ? item.path.staff
                : item.title === "Settings" && role === "principal"
                ? item.path.principal
                : item.path
            }
            onClick={() => {
              if (item.title === "Logout") {
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("role");
                localStorage.removeItem("standard");
                localStorage.removeItem("facility");
                setAuthenticated(false);
                navigate("/");
              }
            }}
            title={item.title}
            className={`h-10 flex items-center gap-x-4 cursor-pointer py-2 duration-300 rounded-md ${
              location.pathname === item.path
                ? "bg-pink text-white"
                : "text-gray-300 hover:bg-slate-600"
            }`}
          >
            <div className="">{item.icon}</div>
            <span
              className={`${
                !open ? "scale-x-0" : "scale-x-100"
              } origin-left duration-300`}
            >
              {item.title}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
