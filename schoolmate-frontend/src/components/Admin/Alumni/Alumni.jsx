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
import AddAlumniModal from "../../../modals/admin/AddAlumniModal/AddAlumniModal";
import ViewAlumniModal from "../../../modals/admin/ViewAlumniModal/ViewAlumniModal";
import UpdateAlumniModal from "../../../modals/admin/UpdateAlumniModal/UpdateAlumniModal";
import DeleteAlumniModal from "../../../modals/admin/DeleteAlumniModal/DeleteAlumniModal";
import { formatDate, formatDateReverse } from "../../../helpers/DateFormatter";
import axios from "axios";
import { MdFileUpload } from "react-icons/md";
import UploadAlumniModal from "../../../modals/admin/UploadAlumniModal/UploadAlumniModal";

const Alumni = () => {
  const apiKey = import.meta.env.VITE_API_URL;

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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

  const fetchAlumni = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    await axios
      .get(`${apiKey}/admin/get-alumnis`, config)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          console.log(res.data)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const headers = [
    { label: "Reg. No.", key: "regNo" },
    { label: "First Name", key: "fname" },
    { label: "Middle Name", key: "mname" },
    { label: "Last Name", key: "lname" },
    { label: "DOB", key: "dob" },
    { label: "Gender", key: "gender" },
    { label: "Address", key: "address" },
    { label: "Phone", key: "phone" },
    { label: "Admission Year", key: "admissionYear" },
    { label: "Passing Year", key: "passingYear" },
    { label: "Current Status", key: "currentStatus" },
  ];

  const csvData = data.map((item, index) => ({
    regNo: item.regNo,
    fname: item.fname,
    mname: item.mname,
    lname: item.lname,
    dob: item.dob,
    gender: item.gender,
    address: item.address,
    phone: item.phone,
    admissionYear: item.admissionYear,
    passingYear: item.passingYear,
    currentStatus: item.currentStatus,
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
            Add Alumni
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
            filename="schoolmate_alumni.csv"
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
                <th>Reg. No.</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Passing Year</th>
                <th colSpan={3}>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1 + currentPage * itemsPerPage}</td>
                  <td>{item.regNo}</td>
                  <td>{item.fname + " " + item.lname}</td>
                  <td>{formatDate(item.dob)}</td>
                  <td>{item.passingYear}</td>
                  <td>
                    <button
                      className="text-primary"
                      onClick={() => {
                        setUser(item);
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
                        setUser(item);
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
                        setUser(item);
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
        <AddAlumniModal
          isOpen={addModalOpen}
          fetchAlumni={fetchAlumni}
          closeModal={() => setAddModalOpen(false)}
        />
      )}
      {viewModalOpen && (
        <ViewAlumniModal
          isOpen={viewModalOpen}
          closeModal={() => setViewModalOpen(false)}
          userData={user}
        />
      )}
      {updateModalOpen && (
        <UpdateAlumniModal
          isOpen={updateModalOpen}
          fetchAlumni={fetchAlumni}
          closeModal={() => setUpdateModalOpen(false)}
          userData={user}
        />
      )}
      {deleteModalOpen && (
        <DeleteAlumniModal
          isOpen={deleteModalOpen}
          fetchAlumni={fetchAlumni}
          closeModal={() => setDeleteModalOpen(false)}
          userData={user}
        />
      )}
      {uploadModalOpen && (
        <UploadAlumniModal
          isOpen={uploadModalOpen}
          fetchAlumni={fetchAlumni}
          closeModal={() => setUploadModalOpen(false)}
          userData={user}
        />
      )}
    </div>
  );
};

export default Alumni;
