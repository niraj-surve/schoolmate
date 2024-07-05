import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaPlus, FaSearch } from "react-icons/fa";
import {
  FaBackward,
  FaFileExport,
  FaForward,
  FaPenToSquare,
  FaTrash,
} from "react-icons/fa6";
import { CSVLink } from "react-csv";
import { Card, TextInput } from "@tremor/react";
import AddUserModal from "../../../modals/admin/AddUserModal/AddUserModal";
import UpdateUserModal from "../../../modals/admin/UpdateUserModal/UpdateUserModal";
import DeleteUserModal from "../../../modals/admin/DeleteUserModal/DeleteUserModal";
import axios from "axios";
import { formatDate } from "../../../helpers/DateFormatter";

const SchoolIAM = () => {
  const apiKey = import.meta.env.VITE_API_URL;

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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

  const fetchUsers = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    await axios
      .get(`${apiKey}/admin/get-users`, config)
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
    fetchUsers();
  }, []);

  const headers = [
    { label: "Sr. No.", key: "srno" },
    { label: "First Name", key: "fname" },
    { label: "Last Name", key: "lname" },
    { label: "DOB", key: "dob" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
  ];

  const csvData = data.map((item, index) => ({
    srno: index + 1,
    fname: item.fname,
    lname: item.lname,
    dob: item.dob,
    email: item.email,
    role: item.role,
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
            Add User
          </button>
        </div>
        <CSVLink
          data={csvData}
          headers={headers}
          filename="schoolmate_users.csv"
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
      <Card className="h-full">
        {displayedData.length !== 0 ? (
          <table className="w-full text-center border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Role</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1 + currentPage * itemsPerPage}</td>
                  <td>{item.fname + " " + item.lname}</td>
                  <td>{formatDate(item.dob)}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.position === "principal"
                      ? "Principal"
                      : item.position === "staff"
                      ? "Staff"
                      : item.position}
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
        <AddUserModal
          isOpen={addModalOpen}
          fetchUsers={fetchUsers}
          closeModal={() => setAddModalOpen(false)}
        />
      )}
      {updateModalOpen && (
        <UpdateUserModal
          isOpen={updateModalOpen}
          fetchUsers={fetchUsers}
          closeModal={() => setUpdateModalOpen(false)}
          userData={user}
        />
      )}
      {deleteModalOpen && (
        <DeleteUserModal
          isOpen={deleteModalOpen}
          closeModal={() => setDeleteModalOpen(false)}
          fetchUsers={fetchUsers}
          userData={user}
        />
      )}
    </div>
  );
};

export default SchoolIAM;
