import { IoIosPaper } from "react-icons/io";
import {
  FaGear,
  FaUserPen,
  FaTable,
  FaRightFromBracket,
} from "react-icons/fa6";
import { ImBooks } from "react-icons/im";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import { TbTransferVertical } from "react-icons/tb";

export const menuItemsAdmin = [
  {
    title: "Dashboard",
    icon: <BiSolidDashboard className="w-10" />,
    path: "/dashboard/admin",
  },
  {
    title: "IAM",
    icon: <FaUserPen className="w-10" />,
    path: "/dashboard/admin/iam",
  },
  {
    title: "Staff",
    icon: <FaChalkboardTeacher className="w-10" />,
    path: "/dashboard/admin/staff",
  },
  {
    title: "Transferred Staff",
    icon: <TbTransferVertical className="w-10" />,
    path: "/dashboard/admin/transferred-staff",
  },
  {
    title: "Alumni",
    icon: <FaUserGraduate className="w-10" />,
    path: "/dashboard/admin/alumni",
  },
  {
    title: "Timetable",
    icon: <FaTable className="w-10" />,
    path: "/dashboard/admin/timetable",
  },
  {
    title: "Noticeboard",
    icon: <IoIosPaper className="w-10" />,
    path: "/dashboard/admin/noticeboard",
  },
];

export const menuItemsStaff = [
  {
    title: "Dashboard",
    icon: <BiSolidDashboard className="w-10" />,
    path: "/dashboard/staff",
  },
  // {
  //   title: "Students",
  //   icon: <BiSolidDashboard className="w-10" />,
  //   path: "/dashboard/staff/students",
  // },
];

export const menuItemsPrincipal = [
  {
    title: "Dashboard",
    icon: <BiSolidDashboard className="w-10" />,
    path: "/dashboard/principal",
  },
  {
    title: "Manage Facility",
    icon: <ImBooks className="w-10" />,
    path: "/dashboard/principal/manage-facilities",
  },
  {
    title: "Classteachers",
    icon: <FaChalkboardTeacher className="w-10" />,
    path: "/dashboard/principal/classteachers",
  },
];

export const accountItems = [
  {
    title: "Settings",
    icon: <FaGear className="w-10" />,
    path: {
      admin: "/dashboard/admin/settings",
      staff: "/dashboard/staff/settings",
      principal: "/dashboard/principal/settings",
    },
  },
  {
    title: "Logout",
    icon: <FaRightFromBracket className="w-10" />,
  },
];
