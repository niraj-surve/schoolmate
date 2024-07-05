import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaPlus, FaSearch } from "react-icons/fa";
import {
  FaBackward,
  FaEye,
  FaFileExport,
  FaForward,
  FaPenToSquare,
  FaTrash,
} from "react-icons/fa6";
import { CSVLink } from "react-csv";
import { Card, TextInput, Title } from "@tremor/react";
import UpdateStudentModal from "../../../modals/staff/UpdateStudentModal/UpdateStudentModal";
import axios from "axios";
import { formatDate } from "../../../helpers/DateFormatter";
import AddStudentModal from "../../../modals/staff/AddStudentModal/AddStudentModal";
import ViewStudentModal from "../../../modals/staff/ViewStudentModal/ViewStudentModal";
import DeleteStudentModal from "../../../modals/staff/DeleteStudentModal/DeleteStudentModal";
import { MdFileUpload } from "react-icons/md";
import UploadStudentModal from "../../../modals/staff/UploadStudentModal/UploadStudentModal";

const Student = ({userData}) => {
  const apiKey = import.meta.env.VITE_API_URL;

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const [data, setData] = useState([]);
  const [student, setStudent] = useState(null);
  const [standard, setStandard] = useState(userData.standard);
  const [searchValue, setSearchValue] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const displayedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
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
    }

    await axios
      .post(`${apiKey}/user/staff/get-students`, requestData, config)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const headers = [
    { label: "Sr. No.", key: "srno" },
    { label: "Reg. No.", key: "regNo" },
    { label: "Roll. No.", key: "rollNo" },
    { label: "Name", key: "name" },
    { label: "Father's Name", key: "fathersName" },
    { label: "Mother's Name", key: "mothersName" },
    { label: "DOB", key: "dob" },
    { label: "Gender", key: "gender" },
    { label: "Standard", key: "standard" },
    { label: "Parent's Contact No", key: "pContactNo" },
    { label: "Address", key: "address" },
    { label: "Admission Date", key: "admissionDate" },
    { label: "No. in Siblings", key: "noInSiblings" },
    { label: "Parent's Income", key: "income" },
    { label: "Aadhar No", key: "aadharNo" },
    { label: "Religion", key: "religion" },
    { label: "Caste", key: "caste" },
  ];

  const csvData = data.map((item, index) => ({
    srno: index + 1,
    regNo: item.regNo,
    rollNo: item.rollNo,
    name: item.name,
    fathersName: item.fathersName,
    mothersName: item.mothersName,
    dob: item.dob,
    gender: item.gender,
    standard: standard,
    pContactNo: item.pContactNo,
    address: item.address,
    admissionDate: item.admissionDate,
    noInSiblings: item.noInSiblings,
    income: item.income,
    aadharNo: item.aadharNo,
    religion: item.religion,
    caste: item.caste,
  }));

  return (
    <div className="flex flex-col h-full justify-evenly items-center">
      <div className="w-full flex justify-between mb-8 font-opensans">
        <div className="flex gap-4">
          <TextInput
            className="w-64"
            icon={FaSearch}
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex items-center py-2 px-4 rounded-lg text-white border btn-transition bg-primary border-primary hover:bg-white hover:text-primary"
          >
            <FaPlus className="mr-2" />
            Add Student
          </button>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center py-2 px-4 rounded-lg text-white border btn-transition bg-primary border-primary hover:bg-white hover:text-primary"
          >
            <MdFileUpload className="mr-2" />
            Upload Data
          </button>
          <CSVLink
            data={csvData}
            headers={headers}
            filename="schoolmate_students.csv"
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
        <Title className="mb-6">{standard + " "} Standard</Title>
        {displayedData.length !== 0 ? (
          <table className="w-full text-center border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Roll. No.</th>
                <th>Name</th>
                <th>Parent's Phone</th>
                <th>Gender</th>
                <th colSpan={3}>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1 + currentPage * itemsPerPage}</td>
                  <td>{item.rollNo}</td>
                  <td>{item.name}</td>
                  <td>{item.pContactNo}</td>
                  <td>
                    {item.gender === "male"
                      ? "Male"
                      : item.gender === "female"
                      ? "Female"
                      : item.gender === "other"
                      ? "Other"
                      : item.gender}
                  </td>
                  <td>
                    <button
                      className="text-primary"
                      onClick={() => {
                        setStudent(item);
                        setViewModalOpen(true);
                      }}
                    >
                      <FaEye />
                    </button>
                  </td>
                  <td>
                    <button
                      className="text-warning"
                      onClick={() => {
                        setStudent(item);
                        setUpdateModalOpen(true);
                      }}
                    >
                      <FaPenToSquare />
                    </button>
                  </td>
                  <td>
                    <button
                      className="text-danger"
                      onClick={() => {
                        setStudent(item);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
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
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={
          "flex items-center bg-white mt-4 p-4 rounded-md w-fit shadow-md"
        }
        activeClassName={
          "mx-4 item-active border-solid px-3 py-1 border-primary border-2 rounded-full bg-info text-dark"
        }
        breakClassName={"mx-4"}
        breakLabel={"..."}
        disabledClassName={"text-gray-500"}
        nextClassName={"mx-4 px-3 text-dark"}
        nextLabel={<FaForward />}
        pageClassName={"font-medium mx-4"}
        previousClassName={"mx-4 px-3 text-dark"}
        previousLabel={<FaBackward />}
      />
      {addModalOpen && (
        <AddStudentModal
          isOpen={addModalOpen}
          fetchStudents={fetchStudents}
          standard={standard}
          closeModal={() => setAddModalOpen(false)}
        />
      )}
      {viewModalOpen && (
        <ViewStudentModal
          isOpen={viewModalOpen}
          closeModal={() => setViewModalOpen(false)}
          userData={student}
        />
      )}
      {updateModalOpen && (
        <UpdateStudentModal
          isOpen={updateModalOpen}
          fetchStudents={fetchStudents}
          closeModal={() => setUpdateModalOpen(false)}
          userData={student}
        />
      )}
      {deleteModalOpen && (
        <DeleteStudentModal
          isOpen={deleteModalOpen}
          closeModal={() => setDeleteModalOpen(false)}
          fetchStudents={fetchStudents}
          studentData={student}
        />
      )}
      {uploadModalOpen && (
        <UploadStudentModal
          isOpen={uploadModalOpen}
          fetchStudents={fetchStudents}
          closeModal={() => setUploadModalOpen(false)}
          userData={student}
        />
      )}
    </div>
  );
};

export default Student;
