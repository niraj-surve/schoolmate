import { Button, Dialog, DialogPanel, Title } from '@tremor/react';
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { FaXmark } from 'react-icons/fa6';

const DeleteTimetableModal = ({ isOpen, closeModal, fetchTimetables, timetableData }) => {
    const apiKey = import.meta.env.VITE_API_URL;

  const onSubmit = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const data = {
      standard: timetableData.standard,
    };
    
    await axios
      .delete(`${apiKey}/admin/delete-timetable`, { data, ...config })
      .then((res) => {
        if (res.data.successful) {
          toast.success("Timetable deleted successfully..!", {
            position: "bottom-right",
          });
          closeModal();
          fetchTimetables();
        }
        if(res.data.timetableNotExistsError){
          toast.error("Timetable does not exist..!", {
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
      id="deleteTimetableModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-danger">Delete Timetable</Title>
          <FaXmark
            className="text-lg text-danger cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <p>
          Are you sure want to delete the timetable of standard{" "}
          <span className="text-danger">
            {timetableData.standard}
          </span>
          ?
        </p>
        <div className="mt-8">
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
  )
}

export default DeleteTimetableModal