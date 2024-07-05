import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaBackward, FaForward } from "react-icons/fa6";
import { Card, Select, SelectItem } from "@tremor/react";
import AddUserModal from "../../../modals/admin/AddUserModal/AddUserModal";
import UpdateUserModal from "../../../modals/admin/UpdateUserModal/UpdateUserModal";
import DeleteUserModal from "../../../modals/admin/DeleteUserModal/DeleteUserModal";
import axios from "axios";
import toast from "react-hot-toast";

const ClassTeacher = () => {
  const apiKey = import.meta.env.VITE_API_URL;

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const displayedData = data.slice(
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
      .get(`${apiKey}/user/principal/get-staff-users`, config)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const assignClassteacher = async (data) => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const requestData = {
      email: data.email,
      standard: data.standard,
    };

    await axios
      .put(`${apiKey}/user/principal/assign-classteacher`, requestData, config)
      .then((res) => {
        if (requestData.standard != "" && res.data.successful) {
          toast.success("Class assigned..!", {
            position: "bottom-right",
          });
          fetchUsers();
        } else if (requestData.standard === "" && res.data.successful) {
          toast.success("Class removed..!", {
            position: "bottom-right",
          });
          fetchUsers();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const standards = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th"];

  return (
    <div className="flex flex-col h-full justify-evenly items-center">
      <Card className="h-full">
        {displayedData.length !== 0 ? (
          <table className="w-full text-center border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Role</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1 + currentPage * itemsPerPage}</td>
                  <td>{item.fname + " " + item.lname}</td>
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
                    <Select
                      enableClear={false}
                      onChange={(selectedStandard) => {
                        let standardToSend = selectedStandard;
                        if (selectedStandard === "Clear") {
                          standardToSend = ""; // Set to empty string if "Clear" is selected
                        }
                        const updatedData = data.map((itemData) => {
                          if (itemData.email === item.email) {
                            return {
                              ...itemData,
                              standard: standardToSend || "", // Set to empty string if falsy
                            };
                          }
                          return itemData;
                        });
                        setData(updatedData);
                        assignClassteacher({
                          ...item,
                          standard: standardToSend,
                        });
                      }}
                      placeholder="No Class Assigned"
                      value={item.standard || ""}
                    >
                      <SelectItem value="Clear">Clear</SelectItem>
                      {standards
                        .filter((standard) => {
                          // Filter out the already assigned standard
                          return !data.find(
                            (d) =>
                              d.standard === standard && d.email !== item.email
                          );
                        })
                        .map((standard) => (
                          <SelectItem key={standard} value={standard}>
                            {standard}
                          </SelectItem>
                        ))}
                    </Select>
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
    </div>
  );
};

export default ClassTeacher;
