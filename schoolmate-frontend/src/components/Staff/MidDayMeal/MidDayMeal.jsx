import React, { useState, useEffect } from "react";
import { Card, Select, SelectItem } from "@tremor/react";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import AddMealModal from "../../../modals/staff/AddMealModal/AddMealModal";
import UpdateMealModal from "../../../modals/staff/UpdateMealModal/UpdateMealModal";
import DeleteMealModal from "../../../modals/staff/DeleteMealModal/DeleteMealModal";


const MidDayMeal = () => {
  const apiKey = import.meta.env.VITE_API_URL;

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [studentCount, setStudentCount] = useState(0);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [nextMonth, setNextMonth] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [mealData, setMealData] = useState(null);

  const setYearsAndMonths = async () => {
    // Get current year and next month
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();
  
    // Set default value for month
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  
    const nextMonthIndex = currentDate.getMonth() + 1; // Month index starts from 0, so add 1 for the next month
    const defaultMonthName = monthNames[nextMonthIndex % 12]; // Use modulo to ensure it cycles back to January after December
  
    setMonths(monthNames); // Set all months fetched from API
    setSelectedMonth(defaultMonthName);
    setNextMonth(defaultMonthName);
    setYears([currentYear]);
    setSelectedYear(currentYear);
    setCurrentYear(currentYear);
  };
  

  const getYearsAndMonths = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    await axios
      .get(`${apiKey}/user/staff/get-mdm-years`, config)
      .then((res) => {
        if (res.data) {
          setYears(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`${apiKey}/user/staff/get-mdm-months`, config)
      .then((res) => {
        if (res.data) {
          setMonths(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`${apiKey}/user/staff/get-all-students-count`, config)
      .then((res) => {
        if (res.data.count) {
          setStudentCount(res.data.count);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMDMData = async (year, month) => {
    const jwtToken = localStorage.getItem("jwtToken");

    const requestData = {
      year: year,
      month: month,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    await axios
      .post(`${apiKey}/user/staff/get-mdm-data-by-year`, requestData, config)
      .then((res) => {
        if (res.data !== "") {
          setMealData(res.data);
        } else {
          setYearsAndMonths()
          // getYearsAndMonths()
          setSelectedMonth(nextMonth);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setYearsAndMonths();
    getYearsAndMonths();
  }, []);

  useEffect(() => {
    if (selectedYear !== "" && selectedMonth !== "") {
      getMDMData(selectedYear, selectedMonth);
    }
  }, [selectedYear, selectedMonth]);

  const handleYearChange = (selected) => {
    setSelectedYear(selected);
  };

  const handleMonthChange = (selected) => {
    setSelectedMonth(selected);
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 w-full justify-between">
          <div className="flex gap-4">
            <Select
              enableClear={false}
              className="w-fit"
              placeholder="Select Year"
              value={selectedYear}
              onChange={handleYearChange}
            >
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </Select>
            <Select
              enableClear={false}
              className="w-fit"
              placeholder="Select Month"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </Select>
          </div>
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex items-center text-sm py-2 px-4 rounded-lg text-white border btn-transition bg-primary border-primary hover:bg-white hover:text-primary"
          >
            <FaPlus className="mr-2" />
            Add Meal Data
          </button>
        </div>
        <Card className="h-full px-14">
          {mealData !== null ? (
            <div className="flex flex-col text-sm gap-6">
              <div className="flex justify-between">
                <span className="text-2xl font-bold font-mulish">
                  Required Resources
                </span>
                <div className="flex gap-4">
                  {mealData !== null &&
                    mealData.year === currentYear &&
                    mealData.month === nextMonth && (
                      <div className="flex gap-4">
                        <button
                          className="bg-warning text-white px-4 py-2 rounded-lg btn-transition hover:bg-white hover:text-warning border border-warning flex items-center font-medium"
                          onClick={() => {
                            setUpdateModalOpen(true);
                          }}
                        >
                          <FaPenToSquare className="mr-1" />
                          Edit
                        </button>
                        <button
                          className="bg-danger text-white px-4 py-2 rounded-lg btn-transition hover:bg-white hover:text-danger border border-danger flex items-center font-medium"
                          onClick={() => {
                            setDeleteModalOpen(true);
                          }}
                        >
                          <FaTrash className="mr-1" />
                          Delete
                        </button>
                      </div>
                    )}
                </div>
              </div>
              <div className="flex gap-8 bg-dark py-4 px-8 rounded-lg justify-between">
                <span className="text-danger font-bold">
                  Year:{" "}
                  <span className="text-white font-medium">
                    {mealData.year}
                  </span>
                </span>
                <span className="text-danger font-bold">
                  Month:{" "}
                  <span className="text-white font-medium">
                    {mealData.month}
                  </span>
                </span>
                <span className="text-danger font-bold">
                  Total Students:{" "}
                  <span className="text-white font-medium">
                    {mealData.totalStudents}
                  </span>
                </span>
                <span className="text-danger font-bold">
                  Working Days:{" "}
                  <span className="text-white font-medium">
                    {mealData.workingDays}
                  </span>
                </span>
              </div>
              <div className="flex gap-20 px-8 justify-around">
                <div className="flex gap-16 justify-between">
                  <div className="flex flex-col gap-6">
                    <span className="text-primary font-bold">Tandul:</span>
                    <span className="text-primary font-bold">Turdal:</span>
                    <span className="text-primary font-bold">Mugdal:</span>
                    <span className="text-primary font-bold">Harbhara:</span>
                    <span className="text-primary font-bold">Mug:</span>
                    <span className="text-primary font-bold">Chavli:</span>
                    <span className="text-primary font-bold">Vatana:</span>
                  </div>
                  <div className="flex flex-col gap-6">
                    <span className="text-dark font-medium">
                      {mealData.tandul} Kg
                    </span>
                    <span className="text-dark font-medium">
                      {mealData.turdal} Kg
                    </span>
                    <span className="text-dark font-medium">
                      {mealData.mugdal} Kg
                    </span>
                    <span className="text-dark font-medium">
                      {mealData.harbhara} Kg
                    </span>
                    <span className="text-dark font-medium">
                      {mealData.mug} Kg
                    </span>
                    <span className="text-dark font-medium">
                      {mealData.chavli} Kg
                    </span>
                    <span className="text-dark font-medium">
                      {mealData.vatana} Kg
                    </span>
                  </div>
                </div>
                <div className="flex gap-16 justify-between">
                  <div className="flex flex-col gap-6">
                    <span className="text-primary font-bold">Oil:</span>
                    <span className="text-primary font-bold">Tikhat:</span>
                    <span className="text-primary font-bold">
                      Garam Masala:
                    </span>
                    <span className="text-primary font-bold">Mith:</span>
                    <span className="text-primary font-bold">Halad:</span>
                    <span className="text-primary font-bold">Jira:</span>
                    <span className="text-primary font-bold">Mohri:</span>
                  </div>
                  <div className="flex flex-col gap-6">
                    <span className="text-dark font-medium">
                      {mealData.oil} Ltr
                    </span>
                    <span className="text-dark font-medium">
                      {mealData.tikhat} Kg
                    </span>
                    <span className="text-dark font-medium">
                      {mealData.garamMasala} Kg
                    </span>
                    <span className="text-dark font-medium">
                      {mealData.mith} Kg
                    </span>
                    <span className="text-dark font-medium">
                      {mealData.halad} Kg
                    </span>
                    <span className="text-dark font-medium">
                      {mealData.jira} Kg
                    </span>
                    <span className="text-dark font-medium">
                      {mealData.mohri} Kg
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center py-4 text-gray-600">
              Data is not available.
            </p>
          )}
        </Card>
      </div>
      {addModalOpen && (
        <AddMealModal
          isOpen={addModalOpen}
          currentYear={currentYear}
          nextMonth={nextMonth}
          studentCount={studentCount}
          setYearsAndMonths={setYearsAndMonths}
          getYearsAndMonths={getYearsAndMonths}
          getMDMData={getMDMData}
          closeModal={() => setAddModalOpen(false)}
        />
      )}
      {updateModalOpen && (
        <UpdateMealModal
          isOpen={updateModalOpen}
          currentYear={currentYear}
          nextMonth={nextMonth}
          studentCount={studentCount}
          workingDays={mealData.workingDays}
          getMDMData={getMDMData}
          setYearsAndMonths={setYearsAndMonths}
          getYearsAndMonths={getYearsAndMonths}
          closeModal={() => setUpdateModalOpen(false)}
        />
      )}
      {deleteModalOpen && (
        <DeleteMealModal
          isOpen={deleteModalOpen}
          closeModal={() => setDeleteModalOpen(false)}
          setYearsAndMonths={setYearsAndMonths}
          getYearsAndMonths={getYearsAndMonths}
          getMDMData={getMDMData}
          mealData={mealData}
          setMealData={setMealData}
        />
      )}
    </div>
  );
};

export default MidDayMeal;
