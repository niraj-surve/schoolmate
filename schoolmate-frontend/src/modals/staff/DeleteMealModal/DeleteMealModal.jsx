import { Button, Dialog, DialogPanel, Title } from "@tremor/react";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";

const DeleteMealModal = ({
  isOpen,
  closeModal,
  setYearsAndMonths,
  getYearsAndMonths,
  mealData,
  getMDMData,
  setMealData,
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
      year: mealData.year,
      month: mealData.month,
    };

    await axios
      .delete(`${apiKey}/user/staff/delete-mdm-data`, { data, ...config })
      .then((res) => {
        if (res.data.successful) {
          toast.success("Meal data deleted successfully..!", {
            position: "bottom-right",
          });
          getMDMData(mealData.year, mealData.month);
          setYearsAndMonths();
          getYearsAndMonths();
          setMealData(null);
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
          <Title className="mb-8 text-danger">Delete Meal</Title>
          <FaXmark
            className="text-lg text-danger cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <p>
          Are you sure want to delete the meal of{" "}
          <span className="text-danger">
            {mealData.month + " " + mealData.year}
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

export default DeleteMealModal;
