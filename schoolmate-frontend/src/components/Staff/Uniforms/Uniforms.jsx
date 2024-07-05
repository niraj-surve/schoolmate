import React, { useState, useEffect } from "react";
import { Card, Select, SelectItem } from "@tremor/react";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import AddMealModal from "../../../modals/staff/AddMealModal/AddMealModal";
import UpdateMealModal from "../../../modals/staff/UpdateMealModal/UpdateMealModal";
import DeleteMealModal from "../../../modals/staff/DeleteMealModal/DeleteMealModal";
import AddBooksModal from "../../../modals/staff/AddBooksModal/AddBooksModal";
import DeleteBooksModal from "../../../modals/staff/DeleteBooksModal/DeleteBooksModal";
import UpdateBooksModal from "../../../modals/staff/UpdateBooksModal/UpdateBooksModal";
import AddUniformsModal from "../../../modals/staff/AddUniformsModal/AddUniformsModal";
import DeleteUniformsModal from "../../../modals/staff/DeleteUniformsModal/DeleteUniformsModal";
import UpdateUniformsModal from "../../../modals/staff/UpdateUniformsModal/UpdateUniformsModal";

const Uniforms = () => {
  const apiKey = import.meta.env.VITE_API_URL;

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [standards, setStandards] = useState([]);
  const [selectedStandard, setSelectedStandard] = useState("");
  const [uniformsData, setUniformsData] = useState(null);

  const setYearsOptions = async () => {
    // Get current year and next month
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();

    setYears([currentYear]);
    setSelectedYear(currentYear);
    setCurrentYear(currentYear);
  };

  const getYearsAndStandards = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    await axios
      .get(`${apiKey}/user/staff/get-uniforms-years`, config)
      .then((res) => {
        if (res.data) {
          setYears(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`${apiKey}/user/staff/get-uniforms-standards`, config)
      .then((res) => {
        if (res.data) {
          setStandards(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`${apiKey}/user/staff/get-male-student-counts`, config)
      .then((res) => {
        if (res.data) {
          setMaleCount(res.data.count);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`${apiKey}/user/staff/get-female-student-counts`, config)
      .then((res) => {
        if (res.data) {
          setFemaleCount(res.data.count);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUniformsData = async (year, standard) => {
    console.log(year, standard)
    const jwtToken = localStorage.getItem("jwtToken");

    const requestData = {
      year: year,
      standard: standard,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    await axios
      .post(
        `${apiKey}/user/staff/get-uniform-data-by-year`,
        requestData,
        config
      )
      .then((res) => {
        if (res.data !== "") {
          setUniformsData(res.data);
        } else {
          setYearsOptions();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getYearsAndStandards();
    setYearsOptions();
  }, []);

  useEffect(() => {
    if (selectedYear !== "" && selectedStandard !== "") {
      getUniformsData(selectedYear, selectedStandard);
    }
  }, [selectedYear, selectedStandard]);

  const handleYearChange = (selected) => {
    setSelectedYear(selected);
  };

  const handleStandardChange = (selected) => {
    setSelectedStandard(selected);
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
              placeholder="Select Standard"
              value={selectedStandard}
              onChange={handleStandardChange}
            >
              {standards.map((standard) => (
                <SelectItem key={standard} value={standard}>
                  {standard}
                </SelectItem>
              ))}
            </Select>
          </div>
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex items-center text-sm py-2 px-4 rounded-lg text-white border btn-transition bg-primary border-primary hover:bg-white hover:text-primary"
          >
            <FaPlus className="mr-2" />
            Add Uniforms Data
          </button>
        </div>
        <Card className="h-full">
          {uniformsData !== null ? (
            <>
              <div className="flex mb-6 justify-between">
                <span className="text-2xl font-bold">Required Uniforms</span>
                <div className="flex gap-4">
                  {uniformsData !== null &&
                    uniformsData.year === currentYear && (
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
              <div className="flex gap-8 bg-dark py-4 px-8 mb-6 rounded-lg justify-between">
                <span className="text-danger font-bold">
                  Year:{" "}
                  <span className="text-white font-medium">
                    {uniformsData.year}
                  </span>
                </span>
                <span className="text-danger font-bold">
                  Standard:{" "}
                  <span className="text-white font-medium">
                    {uniformsData.standard}
                  </span>
                </span>
              </div>
              <div className="flex gap-20 px-8 justify-around">
                <div className="flex gap-16 justify-between">
                  <div className="flex flex-col gap-6">
                    <span className="text-primary font-bold">
                      No. of Girls:
                    </span>
                    <span className="text-primary font-bold">No. of Boys:</span>
                    <span className="text-primary font-bold">
                      No. of Total Students:
                    </span>
                    <span className="text-primary font-bold">
                      Uniforms Received by Girls:
                    </span>
                  </div>
                  <div className="flex flex-col gap-6">
                    <span className="text-dark font-medium">
                      {uniformsData.noOfGirls}
                    </span>
                    <span className="text-dark font-medium">
                      {uniformsData.noOfBoys}
                    </span>
                    <span className="text-dark font-medium">
                      {uniformsData.noOfTotalStudents}
                    </span>
                    <span className="text-dark font-medium">
                      {uniformsData.uniformsReceivedByGirls}
                    </span>
                  </div>
                </div>
                <div className="flex gap-16 justify-between">
                  <div className="flex flex-col gap-6">
                    <span className="text-primary font-bold">
                      Uniforms Received by Boys:
                    </span>
                    <span className="text-primary font-bold">
                      Uniforms to be Received by Girls:
                    </span>
                    <span className="text-primary font-bold">
                      Uniforms to be Received by Boys:
                    </span>
                    <span className="text-primary font-bold">
                      Total Uniforms to be Received:
                    </span>
                  </div>
                  <div className="flex flex-col gap-6">
                    <span className="text-dark font-medium">
                      {uniformsData.uniformsReceivedByBoys}
                    </span>
                    <span className="text-dark font-medium">
                      {uniformsData.uniformToBeReceivedByGirls}
                    </span>
                    <span className="text-dark font-medium">
                      {uniformsData.uniformToBeReceivedByBoys}
                    </span>
                    <span className="text-dark font-medium">
                      {uniformsData.totalUniformToBeReceived}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center py-4 text-gray-600">
              Data is not available.
            </p>
          )}
        </Card>
      </div>
      {addModalOpen && (
        <AddUniformsModal
          isOpen={addModalOpen}
          currentYear={currentYear}
          maleCount={maleCount}
          femaleCount={femaleCount}
          setYearsOptions={setYearsOptions}
          getYearsAndStandards={getYearsAndStandards}
          setStandard={(value) => setSelectedStandard(value)}
          getUniformsData={getUniformsData}
          closeModal={() => setAddModalOpen(false)}
        />
      )}
      {updateModalOpen && (
        <UpdateUniformsModal
          isOpen={updateModalOpen}
          currentYear={currentYear}
          maleCount={maleCount}
          femaleCount={femaleCount}
          setYearsOptions={setYearsOptions}
          getYearsAndStandards={getYearsAndStandards}
          setStandard={(value) => setSelectedStandard(value)}
          getUniformsData={getUniformsData}
          uniformsData={uniformsData}
          closeModal={() => setUpdateModalOpen(false)}
        />
      )}
      {deleteModalOpen && (
        <DeleteUniformsModal
          isOpen={deleteModalOpen}
          closeModal={() => setDeleteModalOpen(false)}
          setYearsOptions={setYearsOptions}
          getYearsAndStandards={getYearsAndStandards}
          setStandard={(value) => setSelectedStandard(value)}
          getUniformsData={getUniformsData}
          selectedStandard={selectedStandard}
          uniformsData={uniformsData}
          setUniformsData={setUniformsData}
        />
      )}
    </div>
  );
};

export default Uniforms;
