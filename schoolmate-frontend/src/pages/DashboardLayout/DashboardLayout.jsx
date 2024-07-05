import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import AdminDashboard from "../../components/Admin/AdminDashboard/AdminDashboard";
import IAM from "../../components/Admin/IAM/IAM";
import Staff from "../../components/Admin/Staff/Staff";
import Alumni from "../../components/Admin/Alumni/Alumni";
import Noticeboard from "../../components/Admin/Noticeboard/Noticeboard";
import Timetable from "../../components/Admin/Timetable/Timetable";
import Settings from "../../components/Settings/Settings";
import axios from "axios";
import StaffDashboard from "../../components/Staff/StaffDashboard/StaffDashboard";
import PrincipalDashboard from "../../components/Principal/PrincipalDashboard/PrincipalDashboard";
import ClassTeacher from "../../components/Principal/ClassTeacher/ClassTeacher";
import Facility from "../../components/Principal/Facility/Facility";
import Students from "../../components/Staff/Student/Student";
import MidDayMeal from "../../components/Staff/MidDayMeal/MidDayMeal";
import Books from "../../components/Staff/Books/Books";
import Uniforms from "../../components/Staff/Uniforms/Uniforms";
import TransferredStaff from "../../components/Admin/TransferredStaff/TransferredStaff";
import Attendance from "../../components/Staff/Attendance/Attendance";
import ViewAttendance from "../../components/Staff/ViewAttendance/ViewAttendance";

const DashboardLayout = ({ setAuthenticated }) => {
  const apiKey = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  // Get the path of the current route
  const currentPath = location.pathname;

  const getUserDetails = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    const data = { token: jwtToken };
    await axios
      .post(`${apiKey}/auth/get-user`, data)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
        }
      })
      .catch((err) => {
        console.log("Error in getting the user details....\n" + err);
      });
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);
    getUserDetails();
  }, [getUserDetails]);

  return (
    <div className="flex">
      <Sidebar setAuthenticated={setAuthenticated} role={role} userData={user} />
      <div className="flex flex-col w-full">
        <div id="dash-header" className="h-[64px] bg-white w-full">
          <div
            id="profile"
            className="h-full flex items-center justify-end md:justify-between px-6"
          >
            <div className="font-semibold max-md:hidden uppercase text-dark tracking-wide font-opensans">
              {currentPath === "/dashboard/admin" ||
              currentPath === "/dashboard/staff" ||
              currentPath === "/dashboard/principal"
                ? "Dashboard"
                : currentPath === "/dashboard/admin/iam"
                ? "Identity and Access Management"
                : currentPath === "/dashboard/admin/staff"
                ? "Staff Management"
                : currentPath === "/dashboard/admin/staff"
                ? "Transferred Staff Management"
                : currentPath === "/dashboard/staff/students"
                ? "Manage Students"
                : currentPath === "/dashboard/staff/students/attendance"
                ? "Attendance of Students"
                : currentPath === "/dashboard/staff/students/attendance"
                ? "View Attendance"
                : currentPath === "/dashboard/admin/alumni"
                ? "Alumni Management"
                : currentPath === "/dashboard/admin/timetable"
                ? "Timetable Management"
                : currentPath === "/dashboard/admin/noticeboard"
                ? "Noticeboard Management"
                : currentPath === "/dashboard/principal/classteachers"
                ? "Assign Classteacher"
                : currentPath === "/dashboard/principal/manage-facilities"
                ? "Manage Facilities"
                : currentPath === "/dashboard/admin/settings" ||
                  currentPath === "/dashboard/staff/settings" ||
                  currentPath === "/dashboard/principal/settings"
                ? "Account Settings"
                : "Jeevan Shikshan School"}
            </div>
            <div className="flex p-2 rounded-lg cursor-pointer">
              <FaCircleUser className="text-3xl text-dark" />
              <span className="ml-4 text-dark font-mulish font-semibold">
                {user && user.fname + " " + user.lname}
              </span>
            </div>
          </div>
        </div>
        <div
          id="dash-main"
          className="p-7 flex-1 max-h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden"
        >
          {role === "admin" && (
            <Routes>
              <Route path="" element={<AdminDashboard />} />
              <Route path="/iam" element={<IAM />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/transferred-staff" element={<TransferredStaff />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/alumni" element={<Alumni />} />
              <Route path="/timetable" element={<Timetable />} />
              <Route path="/noticeboard" element={<Noticeboard />} />
              <Route
                path="/settings"
                element={<Settings user={user} setUser={setUser} />}
              />
            </Routes>
          )}
          {role === "staff" && (
            <Routes>
              <Route path="" element={<StaffDashboard />} />
              <Route path="/students" element={<Students userData={user} />} />
              <Route path="/mid-day-meal" element={<MidDayMeal />} />
              <Route path="/books" element={<Books />} />
              <Route path="/uniforms" element={<Uniforms />} />
              <Route path="/students/attendance" element={<Attendance userData={user} />} />
              <Route path="/students/attendance/view" element={<ViewAttendance userData={user} />} />
              <Route
                path="/settings"
                element={<Settings user={user} setUser={setUser} />}
              />
            </Routes>
          )}
          {role === "principal" && (
            <Routes>
              <Route path="" element={<PrincipalDashboard />} />
              <Route path="/classteachers" element={<ClassTeacher />} />
              <Route path="/manage-facilities" element={<Facility />} />
              <Route
                path="/settings"
                element={<Settings user={user} setUser={setUser} />}
              />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
