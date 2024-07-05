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

const DeleteAlumniModal = ({ isOpen, closeModal, fetchAlumni, userData }) => {
  const apiKey = import.meta.env.VITE_API_URL;

  const onSubmit = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const data = {
      regNo: userData.regNo,
    };
    
    await axios
      .delete(`${apiKey}/admin/delete-alumni`, { data, ...config })
      .then((res) => {
        if (res.data.successful) {
          toast.success("Staff deleted successfully..!", {
            position: "bottom-right",
          });
          closeModal();
          fetchAlumni();
        }
        if(res.data.regNoNotExistsError){
          toast.error("Alumni does not exist..!", {
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
      id="deleteAlumniModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-danger">Delete Alumni Record</Title>
          <FaXmark className="text-lg text-danger cursor-pointer" onClick={() => closeModal()} />
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

export default DeleteAlumniModal;