import React, { useEffect, useState } from "react";
import { FaEye, FaFileExport, FaSearch } from "react-icons/fa";
import {
  Button,
  Card,
  Select,
  SelectItem,
  TextInput,
  Title,
} from "@tremor/react";
import axios from "axios";
import toast from "react-hot-toast";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";

const Attendance = ({ userData }) => {
  const apiKey = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [standard, setStandard] = useState(userData.standard);
  const [searchValue, setSearchValue] = useState("");
  const [selectedAttendance, setSelectedAttendance] = useState({});
  const [monthlyAttendance, setMonthlyAttendance] = useState(null);
  const [totalAttendance, setTotalAttendance] = useState(null);

  const getCurrentMonth = () => {
    const currentDate = new Date();
    const monthIndex = currentDate.getMonth();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthIndex];
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString("default", {
    month: "long",
  });

  const currentAcademicYear = `${
    currentYear - (currentMonth === "June" ? 0 : 1)
  }-${currentYear + (currentMonth === "June" ? 1 : 0)}`;

  const [month, setMonth] = useState(getCurrentMonth());

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const fetchStudents = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const requestData = {
      standard: standard,
    };

    try {
      const res = await axios.post(
        `${apiKey}/user/staff/get-students`,
        requestData,
        config
      );
      if (res.status === 200) {
        setData(res.data);

        const initialSelectedAttendance = {};
        res.data.forEach((student) => {
          const regNo = student.regNo;
          initialSelectedAttendance[regNo] = {};
          student.attendances.forEach((attendance) => {
            // Filter out dates that are not in the current month
            const currentMonthDates = Object.entries(attendance.dates)
              .filter(([date]) => {
                const dateObj = new Date(date);
                return (
                  dateObj.getMonth() === new Date().getMonth() &&
                  dateObj.getFullYear() === new Date().getFullYear()
                );
              })
              .reduce((obj, [date, status]) => {
                obj[date] = status ? "P" : "A";
                return obj;
              }, {});

            Object.entries(currentMonthDates).forEach(([date, status]) => {
              const formattedDate = new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              initialSelectedAttendance[regNo][formattedDate] = status;
            });
          });
          // Check if today's date is not already in selectedAttendance for this student
          const todayFormatted = new Date(today).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          if (!initialSelectedAttendance[regNo][todayFormatted]) {
            // Add today's date with an empty value
            initialSelectedAttendance[regNo][todayFormatted] = "";
          }
        });
        setSelectedAttendance(initialSelectedAttendance);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [standard]); // Depend on 'standard' instead of an empty array

  useEffect(() => {
    if (data.length > 0) {
      fetchMonthlyAndTotalAttendance(data);
    }
  }, [data]); // Depend on 'data' state

  const fetchMonthlyAndTotalAttendance = async (data) => {
    const jwtToken = localStorage.getItem("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const requestData = {
      students: data,
      month: month,
      academicYear: currentAcademicYear,
    };

    try {
      const res = await axios.post(
        `${apiKey}/user/staff/get-monthly-attendance`,
        requestData,
        config
      );
      if (res.status === 200) {
        setMonthlyAttendance(res.data.monthlyPercentages);
        setTotalAttendance(res.data.totalPercentages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRadioChange = (event, regNo, date) => {
    const { value } = event.target;
    setSelectedAttendance((prevAttendance) => ({
      ...prevAttendance,
      [regNo]: {
        ...prevAttendance[regNo],
        [date]: value,
      },
    }));
  };

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const onSubmit = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    const standard = localStorage.getItem("standard");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const requestData = filteredData.map((item, index) => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 since months are zero-based
      const day = String(currentDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      console.log("Current Date (Local):", formattedDate);

      return {
        regNo: item.regNo,
        academicYear: `${currentYear - (currentMonth === "June" ? 0 : 1)}-${
          currentYear + (currentMonth === "June" ? 1 : 0)
        }`,
        standard: standard,
        month: currentMonth,
        date: formattedDate,
        present:
          selectedAttendance[item.regNo][
            currentDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          ] === "P",
      };
    });

    console.log(requestData);

    await axios
      .post(`${apiKey}/user/staff/mark-attendance`, requestData, config)
      .then((res) => {
        if (res.data.successful) {
          toast.success("Attendance marked successfully..!", {
            position: "bottom-right",
          });
          fetchStudents();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error..!", { position: "bottom-right" });
      });
  };

  const headers = [
    { label: "Roll. No.", key: "rollNo" },
    { label: "Name", key: "name" },
    ...(filteredData.length > 0
      ? Object.keys(selectedAttendance[filteredData[0]?.regNo] || {}).map(
          (date) => ({
            label: date,
            key: date,
          })
        )
      : []),
    { label: "Monthly Attendance", key: "monthlyAttendance" },
    { label: "Total Attendance", key: "totalAttendance" },
  ];

  const csvData =
    filteredData.length > 0
      ? filteredData.map((student) => {
          const monthlyAttendance = Object.values(
            selectedAttendance[student.regNo] || {}
          )
            .map((status) => (status === "P" ? 1 : 0))
            .reduce((acc, val) => acc + val, 0);
          const totalAttendance = Object.values(
            selectedAttendance[student.regNo] || {}
          ).filter((status) => status === "P").length;
          const attendanceData = {
            rollNo: student.rollNo,
            name: student.name,
            regNo: student.regNo,
            // Add attendance data for each date
            ...Object.entries(selectedAttendance[student.regNo] || {}).reduce(
              (acc, [date, status]) => {
                acc[date] = status;
                return acc;
              },
              {}
            ),
            monthlyAttendance: monthlyAttendance,
            totalAttendance: totalAttendance,
          };
          return attendanceData;
        })
      : [];

  return (
    <div className="flex flex-col h-full justify-evenly items-center">
      <div className="w-full flex justify-between mb-8 font-opensans">
        <div className="flex gap-4">
          <TextInput
            className="w-64"
            icon={FaSearch}
            placeholder="Search Student..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={() =>
              navigate("/dashboard/staff/students/attendance/view")
            }
            className="flex items-center py-2 px-4 rounded-lg text-white border btn-transition bg-yellow border-yellow hover:bg-white hover:text-yellow"
          >
            <FaEye className="mr-2" />
            View Attendance
          </button>
          <CSVLink
            data={csvData}
            headers={headers}
            filename={`${month}_attendance_${standard}_standard.csv`}
          >
            <button
              onClick={() => exportData()}
              className="flex items-center py-2 px-4 rounded-lg text-white border btn-transition bg-green-600 border-green-600 hover:bg-white hover:text-green-600"
            >
              <FaFileExport className="mr-2" />
              Export
            </button>
          </CSVLink>
        </div>
      </div>
      <Card className="h-full">
        <div className="flex justify-between">
          <Title className="mb-6">{standard + " "} Standard</Title>
        </div>

        {filteredData.length !== 0 ? (
          <div className="flex flex-col h-[380px]">
            <div id="tableScroller" className="overflow-x-auto pr-2">
              <table className="w-full text-sm text-center border-collapse rounded-lg overflow-hidden">
                <thead>
                  <tr className="border-b-2">
                    <th colSpan={2} className="border-r-2">
                      Student
                    </th>
                    <th
                      colSpan={
                        Object.keys(selectedAttendance[filteredData[0].regNo])
                          .length || 1
                      }
                      className="border-r-2"
                    >
                      Dates
                    </th>

                    <th colSpan={2}>Attendance</th>
                  </tr>
                  <tr>
                    <th>Roll. No.</th>
                    <th className="border-r-2">Name</th>
                    {Object.keys(selectedAttendance[filteredData[0].regNo]).map(
                      (date, id) => (
                        <th key={id} className="border-r-2">
                          {date}
                        </th>
                      )
                    )}
                    <th>Monthly</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((student, index) => {
                    return (
                      <tr key={index}>
                        <td>{student.rollNo}</td>
                        <td>{student.name}</td>
                        {Object.keys(selectedAttendance[student.regNo]).map(
                          (date, id) => {
                            const formattedDate = new Date(
                              date
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            });
                            const isToday = formattedDate === today;
                            const attendanceStatus =
                              selectedAttendance[student.regNo][date];
                            return (
                              <td key={id}>
                                {isToday ? (
                                  <div className="flex justify-between">
                                    <div
                                      className={`attendance-radio border-2 rounded-lg cursor-pointer py-2 ${
                                        attendanceStatus === "P"
                                          ? "bg-danger btn-transition text-white"
                                          : ""
                                      }`}
                                    >
                                      <input
                                        id={`bordered-radio-1-${index}-${id}`}
                                        type="radio"
                                        value="P"
                                        name={`bordered-radio-${index}-${id}`}
                                        className="hidden"
                                        checked={attendanceStatus === "P"}
                                        onChange={(e) =>
                                          handleRadioChange(
                                            e,
                                            student.regNo,
                                            date
                                          )
                                        }
                                      />
                                      <label
                                        htmlFor={`bordered-radio-1-${index}-${id}`}
                                        className="w-full cursor-pointer px-4 py-2 text-sm font-medium"
                                      >
                                        P
                                      </label>
                                    </div>
                                    <div
                                      className={`attendance-radio border-2 rounded-lg cursor-pointer py-2 ${
                                        attendanceStatus === "A"
                                          ? "bg-danger btn-transition text-white"
                                          : ""
                                      }`}
                                    >
                                      <input
                                        id={`bordered-radio-2-${index}-${id}`}
                                        type="radio"
                                        value="A"
                                        name={`bordered-radio-${index}-${id}`}
                                        className="hidden"
                                        checked={attendanceStatus === "A"}
                                        onChange={(e) =>
                                          handleRadioChange(
                                            e,
                                            student.regNo,
                                            date
                                          )
                                        }
                                      />
                                      <label
                                        htmlFor={`bordered-radio-2-${index}-${id}`}
                                        className="w-full cursor-pointer px-4 py-2 text-sm font-medium"
                                      >
                                        A
                                      </label>
                                    </div>
                                  </div>
                                ) : (
                                  <div>{attendanceStatus}</div>
                                )}
                              </td>
                            );
                          }
                        )}
                        <td>
                          {monthlyAttendance &&
                            monthlyAttendance[student.regNo] &&
                            monthlyAttendance[student.regNo].toFixed(2)}
                          %
                        </td>
                        <td>
                          {totalAttendance &&
                            totalAttendance[student.regNo] &&
                            totalAttendance[student.regNo].toFixed(2)}
                          %
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Button
              onClick={() => onSubmit()}
              className="btn-transition fixed bottom-[40px] self-center bg-primary border-primary hover:bg-white hover:border-primary hover:text-primary"
            >
              Mark Attendance
            </Button>
          </div>
        ) : (
          <p className="text-center py-4 text-gray-600">
            Data is not available.
          </p>
        )}
      </Card>
    </div>
  );
};

export default Attendance;
