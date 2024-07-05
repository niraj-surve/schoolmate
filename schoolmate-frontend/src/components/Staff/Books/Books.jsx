import React, { useState, useEffect } from "react";
import { Card, Select, SelectItem } from "@tremor/react";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import AddBooksModal from "../../../modals/staff/AddBooksModal/AddBooksModal";
import DeleteBooksModal from "../../../modals/staff/DeleteBooksModal/DeleteBooksModal";
import UpdateBooksModal from "../../../modals/staff/UpdateBooksModal/UpdateBooksModal";

const Books = () => {
  const apiKey = import.meta.env.VITE_API_URL;

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [studentCount, setStudentCount] = useState(0);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [booksData, setBooksData] = useState(null);

  const setYearsOptions = async () => {
    // Get current year and next month
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();

    setYears([currentYear]);
    setSelectedYear(currentYear);
    setCurrentYear(currentYear);
  };

  const getYears = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    await axios
      .get(`${apiKey}/user/staff/get-books-years`, config)
      .then((res) => {
        if (res.data) {
          setYears(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBooksData = async (year) => {
    const jwtToken = localStorage.getItem("jwtToken");

    const requestData = {
      year: year,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    await axios
      .post(`${apiKey}/user/staff/get-books-data-by-year`, requestData, config)
      .then((res) => {
        if (res.data !== "") {
          setBooksData(res.data);
        } else {
          setYearsOptions();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getYears();
    setYearsOptions();
  }, []);

  useEffect(() => {
    if (selectedYear !== "") {
      getBooksData(selectedYear);
    }
  }, [selectedYear]);

  const handleYearChange = (selected) => {
    setSelectedYear(selected);
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
          </div>
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex items-center text-sm py-2 px-4 rounded-lg text-white border btn-transition bg-primary border-primary hover:bg-white hover:text-primary"
          >
            <FaPlus className="mr-2" />
            Add Books Data
          </button>
        </div>
        <Card className="h-full">
          <div className="flex mb-6 justify-between">
            <span className="text-2xl font-bold">Required Books</span>
            <div className="flex gap-4">
              {booksData !== null && booksData.year === currentYear && (
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
          {booksData !== null ? (
            <table className="w-full text-sm text-center border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th rowSpan={2} className="border-r">
                    Book
                  </th>
                  <th colSpan={7} className="border-b">
                    Standards
                  </th>
                </tr>
                <tr>
                  <th>1st</th>
                  <th>2nd</th>
                  <th>3rd</th>
                  <th>4th</th>
                  <th>5th</th>
                  <th>6th</th>
                  <th>7th</th>
                </tr>
              </thead>
              <tbody>
                {booksData !==null && booksData.books.map((item, index) => (
                  <tr key={index}>
                    <td>{item.subject}</td>
                    <td>{item.noBooksFirst}</td>
                    <td>{item.noBooksSecond}</td>
                    <td>{item.noBooksThird}</td>
                    <td>{item.noBooksFourth}</td>
                    <td>{item.noBooksFifth}</td>
                    <td>{item.noBooksSixth}</td>
                    <td>{item.noBooksSeventh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4 text-gray-600">
              Data is not available.
            </p>
          )}
        </Card>
      </div>
      {addModalOpen && (
        <AddBooksModal
          isOpen={addModalOpen}
          currentYear={currentYear}
          setYearsOptions={setYearsOptions}
          getYears={getYears}
          getBooksData={getBooksData}
          closeModal={() => setAddModalOpen(false)}
        />
      )}
      {updateModalOpen && (
        <UpdateBooksModal
          isOpen={updateModalOpen}
          currentYear={currentYear}
          getBooksData={getBooksData}
          setYearsOptions={setYearsOptions}
          getYears={getYears}
          booksData={booksData}
          closeModal={() => setUpdateModalOpen(false)}
        />
      )}
      {deleteModalOpen && (
        <DeleteBooksModal
          isOpen={deleteModalOpen}
          closeModal={() => setDeleteModalOpen(false)}
          setYearsOptions={setYearsOptions}
          getYears={getYears}
          getBooksData={getBooksData}
          booksData={booksData}
          setBooksData={setBooksData}
        />
      )}
    </div>
  );
};

export default Books;
