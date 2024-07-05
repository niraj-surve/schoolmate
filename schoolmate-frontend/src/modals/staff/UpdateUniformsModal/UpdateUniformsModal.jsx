import {
  Button,
  Dialog,
  DialogPanel,
  NumberInput,
  Select,
  SelectItem,
  TextInput,
  Title,
} from "@tremor/react";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaXmark, FaCircleArrowLeft } from "react-icons/fa6";

const UpdateUniformsModal = ({
  isOpen,
  currentYear,
  maleCount,
  femaleCount,
  setYearsOptions,
  getYearsAndStandards,
  setStandard,
  getUniformsData,
  uniformsData,
  closeModal,
}) => {
  const apiKey = import.meta.env.VITE_API_URL;

  const [selectedStandard, setSelectedStandard] = useState(uniformsData.standard);

  const standards = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th"];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      year: uniformsData.year,
      noOfGirls: uniformsData.noOfGirls,
      noOfBoys: uniformsData.noOfBoys,
      noOfTotalStudents: uniformsData.noOfTotalStudents,
      uniformsReceivedByGirls: uniformsData.uniformsReceivedByGirls,
      uniformsReceivedByBoys: uniformsData.uniformsReceivedByBoys,
      uniformToBeReceivedByGirls: uniformsData.uniformToBeReceivedByGirls,
      uniformToBeReceivedByBoys: uniformsData.uniformToBeReceivedByBoys,
      totalUniformToBeReceived: uniformsData.totalUniformToBeReceived,
    },
    mode: "all",
  });

  const onSubmit = async (data) => {
    if (!selectedStandard) {
      toast.error("Please select a standard", { position: "bottom-right" });
      return;
    }

    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    // Calculate the uniforms to be received
    const uniformToBeReceivedByGirls =
      data.noOfGirls - data.uniformsReceivedByGirls;
    const uniformToBeReceivedByBoys =
      data.noOfBoys - data.uniformsReceivedByBoys;
    const totalUniformToBeReceived =
    uniformToBeReceivedByGirls + uniformToBeReceivedByBoys;

    const requestData = {
      ...data,
      standard: selectedStandard,
      uniformToBeReceivedByGirls,
      uniformToBeReceivedByBoys,
      totalUniformToBeReceived
    };

    await axios
      .put(`${apiKey}/user/staff/update-uniform-data`, requestData, config)
      .then((res) => {
        console.log(res)
        if (res.data.successful) {
          toast.success("Uniform Data updated successfully..!", {
            position: "bottom-right",
          });
          reset();
          getUniformsData(currentYear, selectedStandard);
          setYearsOptions();
          getYearsAndStandards();
          setStandard(selectedStandard)
          closeModal();
        } else {
          toast.error("Uniform Data already added..!", {
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
      id="addUniformModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-primary">Update Uniform Data</Title>
          <FaXmark
            className="text-lg text-danger cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-col">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 w-full">
              <section className="flex flex-col">
                <div className="flex gap-4">
                  <span className="w-full mb-4">
                    <label htmlFor="year" className="text-sm">
                      Year
                    </label>
                    <TextInput
                      disabled
                      className="mt-1"
                      {...register("year", { required: true })}
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="month" className="text-sm">
                      Standard
                    </label>
                    <Select
                      enableClear={false}
                      disabled
                      className="w-full"
                      placeholder="Select Standard"
                      value={selectedStandard}
                      onChange={(selected) => setSelectedStandard(selected)}
                    >
                      {standards.map((standard) => (
                        <SelectItem key={standard} value={standard}>
                          {standard}
                        </SelectItem>
                      ))}
                    </Select>
                  </span>
                  <span className="w-full mb-4"></span>
                </div>
                <div className="flex gap-4">
                  <span className="w-full mb-4">
                    <label htmlFor="noOfGirls" className="text-sm">
                      No. of Girls
                    </label>
                    <NumberInput
                      placeholder=""
                      disabled
                      enableStepper={false}
                      className="mt-1"
                      {...register("noOfGirls", { required: true })}
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="noOfBoys" className="text-sm">
                      No. of Boys
                    </label>
                    <NumberInput
                      placeholder=""
                      disabled
                      enableStepper={false}
                      className="mt-1"
                      {...register("noOfBoys", { required: true })}
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="noOfTotalStudents" className="text-sm">
                      No. of Total Students
                    </label>
                    <NumberInput
                      placeholder=""
                      disabled
                      enableStepper={false}
                      className="mt-1"
                      {...register("noOfTotalStudents", { required: true })}
                    />
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="w-full mb-4">
                    <label
                      htmlFor="uniformsReceivedByGirls"
                      className="text-sm"
                    >
                      Uniforms Received By Girls
                    </label>
                    <NumberInput
                      placeholder="0"
                      enableStepper={false}
                      className="mt-1"
                      {...register("uniformsReceivedByGirls", {
                        required: true,
                      })}
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="uniformsReceivedByBoys" className="text-sm">
                      Uniforms Received By Boys
                    </label>
                    <NumberInput
                      placeholder="0"
                      enableStepper={false}
                      className="mt-1"
                      {...register("uniformsReceivedByBoys", {
                        required: true,
                      })}
                    />
                  </span>
                  <span className="w-full mb-4"></span>
                </div>
              </section>
            </div>
          </div>
          <div className="mt-4 float-right">
            <Button
              disabled={!isValid}
              type={"submit"}
              className="btn-transition bg-primary border-primary hover:bg-white hover:border-primary hover:text-primary"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default UpdateUniformsModal;
