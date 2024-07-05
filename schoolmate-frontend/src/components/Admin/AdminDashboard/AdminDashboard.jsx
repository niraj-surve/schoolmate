import React, { useEffect, useState } from "react";
import { Flex, Grid } from "@tremor/react";
import { ImUserTie } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi2";
import { FaGraduationCap, FaUser } from "react-icons/fa6";
import { CustomAreaChart } from "../../AreaChart/CustomAreaChart";
import { CustomPieChart } from "../../PieChart/CustomPieChart";
import DashCard from "../../DashCard/DashCard";
import axios from "axios";
import { BiTransferAlt } from "react-icons/bi";

const AdminDashboard = () => {
  const apiKey = import.meta.env.VITE_API_URL;

  const [staffCount, setStaffCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [assistantCount, setAssistantCount] = useState(0);
  const [graduateCount, setGraduateCount] = useState(0);
  const [transferredStaffCount, setTransferredStaffCount] = useState(0);
  const [alumniCount, setAlumniCount] = useState(0);
  const [graduationRates, setGraduationRates] = useState({
    distinctYears: [],
    graduateStudentsCount: {},
  });
  const [incomeData, setIncomeData] = useState([]);
  const [casteData, setCasteData] = useState([]);

  const getCounts = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    await axios
      .get(`${apiKey}/auth/get-staff-count`, config)
      .then((res) => {
        if (res.status === 200) {
          setStaffCount(res.data.count);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`${apiKey}/auth/get-users-count`, config)
      .then((res) => {
        if (res.status === 200) {
          setUsersCount(res.data.count);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`${apiKey}/auth/get-students-count`, config)
      .then((res) => {
        if (res.status === 200) {
          setStudentsCount(res.data.count);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`${apiKey}/auth/get-transferred-staff-count`, config)
      .then((res) => {
        if (res.status === 200) {
          setTransferredStaffCount(res.data.count);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`${apiKey}/auth/get-assistant-teachers-count`, config)
      .then((res) => {
        if (res.status === 200) {
          setAssistantCount(res.data.count);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`${apiKey}/auth/get-graduate-teachers-count`, config)
      .then((res) => {
        if (res.status === 200) {
          setGraduateCount(res.data.count);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`${apiKey}/auth/get-alumni-count`, config)
      .then((res) => {
        if (res.status === 200) {
          setAlumniCount(res.data.count);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGraduationRates = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    await axios
      .get(`${apiKey}/auth/graduation-rates`, config)
      .then((res) => {
        if (res.status === 200) {
          setGraduationRates({
            distinctYears: res.data.distinctYears,
            graduateStudentsCount: res.data.graduateStudentsCountByYear,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getIncomeDataAndCasteData = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      await axios
        .get(`${apiKey}/auth/get-all-students-per-income`, config)
        .then((res) => {
          if (res.status === 200) {
            setIncomeData(res.data);
          }
        });
    } catch (error) {
      console.error("Error fetching income data:", error);
    }

    try {
      await axios
        .get(`${apiKey}/auth/get-all-students-per-caste`, config)
        .then((res) => {
          if (res.status === 200) {
            setCasteData(res.data);
          }
        });
    } catch (error) {
      console.error("Error fetching caste data:", error);
    }
  };

  const cardData = [
    {
      title: "Staff",
      count: staffCount,
      icon: ImUserTie,
      color: "violet",
      tooltip: "Total Teachers",
    },
    {
      title: "Students",
      count: studentsCount,
      icon: HiUserGroup,
      color: "green",
      tooltip: "Total Students",
    },
    {
      title: "Alumnis",
      count: alumniCount,
      icon: FaGraduationCap,
      color: "purple",
      tooltip: "Total Alumnis",
    },
    {
      title: "Transferred Staff",
      count: transferredStaffCount,
      icon: BiTransferAlt,
      color: "green",
      tooltip: "Total Transferred Staff",
    },
    {
      title: "Assistant Teachers",
      count: assistantCount,
      icon: ImUserTie,
      color: "purple",
      tooltip: "Total Assistant Teachers",
    },
    {
      title: "Graduate Teachers",
      count: graduateCount,
      icon: ImUserTie,
      color: "green",
      tooltip: "Total Graduate Teachers",
    },
    {
      title: "Users",
      count: usersCount,
      icon: FaUser,
      color: "purple",
      tooltip: "Total Users",
    },
  ];

  const studentsCountValueFormatter = (number) =>
    `${new Intl.NumberFormat("us").format(number).toString()} ${
      number === 1 ? "Student" : "Students"
    }`;

  useEffect(() => {
    getCounts();
    getGraduationRates();
    getIncomeDataAndCasteData();
  }, []);

  return (
    <div className="grid grid-cols-dashboard gap-8 h-full">
      <div className="flex flex-col">
        <Grid className="justify-between grid-cols-3 gap-2">
          {cardData.map((item, index) => (
            <DashCard
              key={index}
              title={item.title}
              icon={item.icon}
              color={item.color}
              count={item.count}
              tooltip={item.tooltip}
            />
          ))}
        </Grid>
        <div className="mt-6">
          <CustomAreaChart
            title={"Graduation Rates"}
            data={graduationRates.distinctYears
              .slice()
              .sort((a, b) => a - b)
              .map((year) => ({
                date: year,
                "Graduate Students":
                  graduationRates.graduateStudentsCount[year] || 0,
              }))}
            categories={["Graduate Students"]}
          />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <CustomPieChart
          title={"Students by Income"}
          data={incomeData}
          category={"count"}
          dataKey={"incomeGroup"}
          valueFormatter={studentsCountValueFormatter}
        />
        <CustomPieChart
          title={"Students by Caste"}
          data={casteData}
          category={"count"}
          dataKey={"caste"}
          valueFormatter={studentsCountValueFormatter}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
