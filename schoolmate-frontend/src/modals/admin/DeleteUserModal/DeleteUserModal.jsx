import {
  Button,
  Dialog,
  DialogPanel,
  Title,
} from "@tremor/react";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";

const DeleteUserModal = ({ isOpen, closeModal, fetchUsers, userData }) => {
  const apiKey = import.meta.env.VITE_API_URL;

  const onSubmit = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const data = {
      email: userData.email,
    };
    
    await axios
      .delete(`${apiKey}/admin/delete-user`, { data, ...config })
      .then((res) => {
        if (res.data.successful) {
          toast.success("User deleted successfully..!", {
            position: "bottom-right",
          });
          closeModal();
          fetchUsers();
        }
        if(res.data.emailNotExistsError){
          toast.error("User does not exist..!", {
            position: "bottom-right",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error..!", { position: "bottom-right" });
      });
  };

  return (
    <Dialog
      id="deleteUserModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-danger">Delete User</Title>
          <FaXmark
            className="text-lg text-danger cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <p>
          Are you sure want to delete the user with name{" "}
          <span className="text-danger">
            {userData.fname + " " + userData.lname}
          </span>
          ?
        </p>
        <div className="mt-4 float-right">
          <Button
            variant="primary"
            className="btn-transition bg-danger border-danger hover:bg-white hover:border-danger hover:text-danger"
            onClick={() => onSubmit()}
          >
            Delete
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default DeleteUserModal;
