import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaEye, FaPlus, FaSearch } from "react-icons/fa";
import {
  FaBackward,
  FaFileExport,
  FaForward,
  FaPenToSquare,
  FaTrash,
} from "react-icons/fa6";
import { Card, TextInput } from "@tremor/react";
import { CSVLink } from "react-csv";
import AddStaffModal from "../../../modals/admin/AddStaffModal/AddStaffModal";
import ViewStaffModal from "../../../modals/admin/ViewStaffModal/ViewStaffModal";
import UpdateStaffModal from "../../../modals/admin/UpdateStaffModal/UpdateStaffModal";
import DeleteStaffModal from "../../../modals/admin/DeleteStaffModal/DeleteStaffModal";
import axios from "axios";
import { formatDate } from "../../../helpers/DateFormatter";
import { BiTransferAlt } from "react-icons/bi";
import TransferStaffModal from "../../../modals/admin/TransferStaffModal/TransferStaffModal";
import { useNavigate } from "react-router-dom";
import { MdFileUpload } from "react-icons/md";
import UploadStaffModal from "../../../modals/admin/UploadStaffModal/UploadStaffModal";

const Staff = () => {
  const apiKey = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const filteredData = data.filter((item) =>
    item.fname.toLowerCase().includes(searchValue.toLowerCase())
  );

  const displayedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const fetchStaff = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    await axios
      .get(`${apiKey}/admin/get-staff`, config)
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
    fetchStaff();
  }, []);

  const headers = [
    { label: "Sr. No.", key: "srno" },
    { label: "First Name", key: "fname" },
    { label: "Middle Name", key: "mname" },
    { label: "Last Name", key: "lname" },
    { label: "DOB", key: "dob" },
    { label: "Email", key: "email" },
    { label: "Gender", key: "gender" },
    { label: "Address", key: "address" },
    { label: "Phone", key: "phone" },
    { label: "Position", key: "position" },
    { label: "Job Start Date", key: "jobStartDate" },
    { label: "Retirement Date", key: "retirementDate" },
    { label: "School Joined Date", key: "schoolJoinedDate" },
    { label: "Educational Qualification", key: "educationalQualification" },
    { label: "Professional Qualification", key: "professionalQualification" },
    { label: "Transferred", key: "transferred" },
  ];

  const csvData = data.map((item, index) => ({
    srno: index + 1,
    fname: item.fname,
    mname: item.mname,
    lname: item.lname,
    dob: item.dob,
    email: item.email,
    gender: item.gender,
    address: item.address,
    phone: item.phone,
    position: item.position,
    jobStartDate: item.jobStartDate,
    retirementDate: item.retirementDate,
    schoolJoinedDate: item.schoolJoinedDate,
    educationalQualification: item.educationalQualification,
    professionalQualification: item.professionalQualification,
    transferred: item.transferred,
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
            Add Staff
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
            filename="schoolmate_staff.csv"
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
        {displayedData.length !== 0 ? (
          <table className="w-full text-center border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Email</th>
                <th>Position</th>
                <th colSpan={4}>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1 + currentPage * itemsPerPage}</td>
                  <td>{item.fname + " " + item.lname}</td>
                  <td>{formatDate(item.dob)}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.position === "principal"
                      ? "Principal"
                      : item.position === "graduateTeacher"
                      ? "Graduate Teacher"
                      : item.position === "assistantTeacher"
                      ? "Assistant Teacher"
                      : item.position === "vicePrincipal"
                      ? "Vice Principal"
                      : item.position}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setUser(item);
                        setViewModalOpen(true);
                      }}
                      className="text-primary"
                    >
                      <FaEye />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setUser(item);
                        setUpdateModalOpen(true);
                      }}
                      className="text-warning"
                    >
                      <FaPenToSquare />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setUser(item);
                        setDeleteModalOpen(true);
                      }}
                      className="text-danger"
                    >
                      <FaTrash />
                    </button>
                  </td>
                  <td>
                    <button
                      title="Transfer"
                      onClick={() => {
                        setUser(item);
                        setTransferModalOpen(true);
                      }}
                      className="text-success"
                    >
                      <BiTransferAlt />
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
        <AddStaffModal
          isOpen={addModalOpen}
          closeModal={() => setAddModalOpen(false)}
          fetchStaff={fetchStaff}
        />
      )}
      {viewModalOpen && (
        <ViewStaffModal
          isOpen={viewModalOpen}
          userData={user}
          closeModal={() => setViewModalOpen(false)}
        />
      )}
      {updateModalOpen && (
        <UpdateStaffModal
          isOpen={updateModalOpen}
          fetchStaff={fetchStaff}
          closeModal={() => setUpdateModalOpen(false)}
          userData={user}
        />
      )}
      {deleteModalOpen && (
        <DeleteStaffModal
          isOpen={deleteModalOpen}
          fetchStaff={fetchStaff}
          closeModal={() => setDeleteModalOpen(false)}
          userData={user}
        />
      )}
      {transferModalOpen && (
        <TransferStaffModal
          isOpen={transferModalOpen}
          fetchStaff={fetchStaff}
          closeModal={() => setTransferModalOpen(false)}
          userData={user}
        />
      )}
      {uploadModalOpen && (
        <UploadStaffModal
          isOpen={uploadModalOpen}
          fetchStaff={fetchStaff}
          closeModal={() => setUploadModalOpen(false)}
          userData={user}
        />
      )}
    </div>
  );
};

export default Staff;
