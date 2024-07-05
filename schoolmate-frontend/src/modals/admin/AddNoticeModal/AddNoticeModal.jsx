import {
  Button,
  Dialog,
  DialogPanel,
  TextInput,
  Textarea,
  Title,
} from "@tremor/react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";

const AddNoticeModal = ({ isOpen, fetchNotices, closeModal }) => {
  const apiKey = import.meta.env.VITE_API_URL;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      to: "",
      subject: "",
      message: "",
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
      .post(`${apiKey}/admin/add-notice`, requestData, config)
      .then((res) => {
        if (res.data.successful) {
          toast.success("Notice created successfully..!", {
            position: "bottom-right",
          });
          reset();
          closeModal();
          fetchNotices();
        }
        if (res.data.noticeExistsError) {
          toast.error("Notice with the same subject already exists..!", {
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
      id="addNoticeModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-primary">Create Notice</Title>
          <FaXmark
            className="text-lg text-danger cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <div className="flex flex-col gap-8">
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
                error={!!errors.message}
                errorMessage="Invalid Message Body"
                placeholder="Message Body"
                rows={10}
              />
            </span>
            <Button
              type="submit"
              variant="primary"
              className="w-fit btn-transition bg-primary border-primary hover:bg-white hover:border-primary hover:text-primary self-end"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default AddNoticeModal;
