import React, { useEffect, useState } from "react";
import { FaCheckSquare, FaFileExport, FaSearch } from "react-icons/fa";
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

const ViewAttendance = ({ userData }) => {
  const apiKey = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [standard, setStandard] = useState(userData.standard);
  const [month, setMonth] = useState(null);
  const [academicYear, setAcademicYear] = useState(null);
  const [academicYears, setAcademicYears] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const fetchAttendance = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const requestData = {
      academicYear: academicYear,
      month: month,
      standard: standard,
    };

    try {
      const res = await axios.post(
        `${apiKey}/user/staff/view-previous-attendance`,
        requestData,
        config
      );
      if (res.status === 200) {
        setData(res.data.data);
      }
    } catch (err) {
      console.log(err);
      setData([]);
    }
  };

  const getAcademicYears = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const res = await axios.get(
        `${apiKey}/user/staff/get-academic-years`,
        config
      );
      if (res.status === 200) {
        setAcademicYears(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const months = [
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
    "April",
  ];

  useEffect(() => {
    getAcademicYears();
  }, []);

  useEffect(() => {
    if (academicYear !== null) {
      fetchAttendance();
    }
    if (month !== null) {
      fetchAttendance();
    }
  }, [academicYear, month]);

  const headers = [
    { label: "Reg. No.", key: "regNo" },
    { label: "Roll. No.", key: "rollNo" },
    { label: "Name", key: "name" },
    // Add individual date columns only if filteredData is not empty
    ...(filteredData.length > 0
      ? Object.entries(filteredData[0].dates)
          .sort(([date1], [date2]) => new Date(date1) - new Date(date2))
          .map(([date, _]) => ({
            label: date,
            key: date,
          }))
      : []),
    { label: "Monthly Attendance", key: "monthlyAttendance" },
    { label: "Total Attendance", key: "totalAttendance" },
  ];

  const CSVData = filteredData.map((student) => ({
    regNo: student.regNo,
    rollNo: student.rollNo,
    name: student.name,
    // Flatten dates object to have individual columns
    ...(filteredData.length > 0
      ? Object.fromEntries(
          Object.entries(student.dates)
            .sort(([date1], [date2]) => new Date(date1) - new Date(date2))
            .map(([date, status]) => [date, status])
        )
      : {}),
    monthlyAttendance: student.monthlyAttendance,
    totalAttendance: student.totalAttendance,
  }));

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
            onClick={() => navigate("/dashboard/staff/students/attendance")}
            className="flex items-center py-2 px-4 rounded-lg text-white border btn-transition bg-primary border-primary hover:bg-white hover:text-primary"
          >
            <FaCheckSquare className="mr-2" />
            Mark Today's Attendance
          </button>
          {filteredData.length !== 0 ? (
            <CSVLink
              data={CSVData}
              headers={headers}
              filename={`${month}_attendance_${standard}_standard.csv`} // Set filename
              className="flex items-center py-2 px-4 rounded-lg text-white border btn-transition bg-green-600 border-green-600 hover:bg-white hover:text-green-600"
            >
              <FaFileExport className="mr-2" />
              Export
            </CSVLink>
          ) : null}
        </div>
      </div>
      <Card className="h-full flex flex-col gap-8">
        <div className="flex gap-4">
          <Select
            className="mt-1 w-fit"
            enableClear={true}
            onChange={(selected) => {
              setAcademicYear(selected);
            }}
            placeholder="Select Academic Year"
          >
            {academicYears.map((item, index) => {
              // Extracting the first and last two characters of the year string
              const startYear = item.substring(0, 4);
              const endYear = item.substring(7, 10);

              // Combining the extracted years with a hyphen
              const formattedYear = `${startYear}-${endYear}`;

              return (
                <SelectItem key={index} value={item}>
                  {formattedYear}
                </SelectItem>
              );
            })}
          </Select>

          <Select
            className="mt-1 w-fit"
            enableClear={true}
            onChange={(selected) => {
              setMonth(selected);
            }}
            placeholder="Select Month"
          >
            {months.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>
        </div>
        {filteredData.length !== 0 ? (
          <div className="flex flex-col h-[420px]">
            <div id="tableScroller" className="overflow-x-auto pr-2">
              <table className="w-full text-sm text-center border-collapse rounded-lg overflow-hidden">
                <thead>
                  <tr className="border-b-2">
                    <th colSpan={2} className="border-r-2">
                      Student
                    </th>
                    <th
                      colSpan={Object.keys(filteredData[0].dates).length}
                      className="border-r-2"
                    >
                      Dates
                    </th>
                    <th colSpan={2}>Attendance</th>
                  </tr>
                  <tr className="border-b-2">
                    <th>Roll No.</th>
                    <th className="border-r-2">Name</th>
                    {Object.keys(filteredData[0].dates)
                      .sort((a, b) => new Date(a) - new Date(b))
                      .map((date, id) => (
                        <th key={id} className="border-r-2">
                          {date}
                        </th>
                      ))}
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
                        {Object.entries(student.dates)
                          .sort(
                            ([date1], [date2]) =>
                              new Date(date1) - new Date(date2)
                          )
                          .map(([date, status]) => (
                            <td key={date}>{status}</td>
                          ))}
                        <td>{student.monthlyAttendance.toFixed(2)}%</td>
                        <td>{student.totalAttendance.toFixed(2)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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

export default ViewAttendance;
