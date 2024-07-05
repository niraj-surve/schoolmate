import { Button, Dialog, DialogPanel, Title } from "@tremor/react";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";

const DeleteUniformsModal = ({
  isOpen,
  closeModal,
  setYearsOptions,
  getYearsAndStandards,
  uniformsData,
  getUniformsData,
  setUniformsData,
}) => {
  const apiKey = import.meta.env.VITE_API_URL;

  const onSubmit = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const data = {
      year: uniformsData.year,
      standard: uniformsData.standard,
    };

    await axios
      .delete(`${apiKey}/user/staff/delete-uniform-data`, { data, ...config })
      .then((res) => {
        if (res.data.successful) {
          toast.success("Uniform data deleted successfully..!", {
            position: "bottom-right",
          });
          getUniformsData(uniformsData.year, uniformsData.standard);
          setYearsOptions();
          getYearsAndStandards();
          setUniformsData(null)
          closeModal();
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
          <Title className="mb-8 text-danger">Delete Uniform Data</Title>
          <FaXmark
            className="text-lg text-danger cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <p>
          Are you sure want to delete the uniforms data of{" " + uniformsData.standard}
          <span className="text-danger">
            of year{" " + uniformsData.year}
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

export default DeleteUniformsModal;
