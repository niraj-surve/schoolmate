import { Button, Dialog, DialogPanel, Title } from '@tremor/react';
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { FaXmark } from 'react-icons/fa6';

const DeleteNoticeModal = ({ isOpen, closeModal, fetchNotices, noticeData }) => {
    const apiKey = import.meta.env.VITE_API_URL;

  const onSubmit = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const data = {
      id: noticeData.id,
    };
    
    await axios
      .delete(`${apiKey}/admin/delete-notice`, { data, ...config })
      .then((res) => {
        if (res.data.successful) {
          toast.success("Notice deleted successfully..!", {
            position: "bottom-right",
          });
          closeModal();
          fetchNotices();
        }
        if(res.data.noticeNotExistsError){
          toast.error("Notice does not exist..!", {
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
      id="deleteNoticeModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-danger">Delete Notice</Title>
          <FaXmark
            className="text-lg text-danger cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <p>
          Are you sure want to delete the notice with subject{" "}
          <span className="text-danger">
            {noticeData.subject}
          </span>
          ?
        </p>
        <div className="mt-4">
          <Button
            variant="primary"
            className="btn-transition bg-danger border-danger hover:bg-white hover:border-danger hover:text-danger float-right"
            onClick={() => onSubmit()}
          >
            Delete
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  )
}

export default DeleteNoticeModal