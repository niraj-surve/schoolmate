import {
  Button,
  Dialog,
  DialogPanel,
  TextInput,
  Textarea,
  Title,
} from "@tremor/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";

const UpdateNoticeModal = ({
  isOpen,
  noticeData,
  fetchNotices,
  closeModal,
}) => {
  const apiKey = import.meta.env.VITE_API_URL;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: noticeData.id,
      to: noticeData.to,
      subject: noticeData.subject,
    },
  });

  const onSubmit = async (data) => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const requestData = {
      ...data,
      time: new Date(),
    };

    await axios
      .put(`${apiKey}/admin/update-notice`, requestData, config)
      .then((res) => {
        if (res.data.successful) {
          toast.success("Notice updated successfully..!", {
            position: "bottom-right",
          });
          reset();
          closeModal();
          fetchNotices();
        }
        if (res.data.noticeNotExistsError) {
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
      id="updateNoticeModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-warning">Update Notice</Title>
          <FaXmark
            className="text-lg text-danger cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <div className="flex flex-col gap-8">
            <TextInput
              className="hidden"
              {...register("id", { required: true })}
            />
            <span className="w-full">
              <TextInput
                {...register("to", { required: true })}
                error={!!errors.to}
                errorMessage="Invalid Receiver Name"
                placeholder="To"
              />
            </span>
            <span className="w-full">
              <TextInput
                {...register("subject", { required: true })}
                error={!!errors.subject}
                errorMessage="Invalid Subject"
                placeholder="Subject"
              />
            </span>
            <span className="w-full">
              <Textarea
                {...register("message", { required: true })}
                defaultValue={noticeData.message}
                error={!!errors.message}
                errorMessage="Invalid Message Body"
                placeholder="Message Body"
                rows={10}
              />
            </span>
            <Button
              type="submit"
              variant="primary"
              className="w-fit btn-transition bg-warning border-warning hover:bg-white hover:border-warning hover:text-warning self-end"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default UpdateNoticeModal;
