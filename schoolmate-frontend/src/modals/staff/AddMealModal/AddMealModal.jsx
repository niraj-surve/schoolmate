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
import { calculateAge } from "../../../helpers/AgeLimitter";
import toast from "react-hot-toast";
import { FaXmark, FaCircleArrowLeft } from "react-icons/fa6";

const AddMealModal = ({
  isOpen,
  currentYear,
  studentCount,
  nextMonth,
  setYearsAndMonths,
  getYearsAndMonths,
  getMDMData,
  closeModal,
}) => {
  const apiKey = import.meta.env.VITE_API_URL;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      year: currentYear,
      month: nextMonth,
      totalStudents: studentCount,
      workingDays: "",
      tandul: "",
      turdal: "",
      mugdal: "",
      harbhara: "",
      mug: "",
      chavli: "",
      oil: "",
      tikhat: "",
      garamMasala: "",
      mith: "",
      halad: "",
      jira: "",
      mohri: "",
    },
    mode: "all",
  });

  const onSubmit = async (data) => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    
    const {totalStudents, workingDays} = data;

    let tandul = totalStudents * workingDays * 0.15;
    let turdal = totalStudents * workingDays * 0.03;
    let mugdal = totalStudents * workingDays * 0.03;
    let harbhara = totalStudents * workingDays * 0.03;
    let mug = totalStudents * workingDays * 0.03;
    let chavli = totalStudents * workingDays * 0.03;
    let vatana = totalStudents * workingDays * 0.03;
    let oil = totalStudents * workingDays * 0.0075;
    let tikhat = totalStudents * workingDays * 0.0003;
    let garamMasala = totalStudents * workingDays * 0.0003;
    let mith = totalStudents * workingDays * 0.002;
    let halad = totalStudents * workingDays * 0.0005;
    let jira = totalStudents * workingDays * 0.0004;
    let mohri = totalStudents * workingDays * 0.0004;

    const requestData = {
      year: currentYear,
      month: nextMonth,
      totalStudents,
      workingDays,
      tandul: tandul,
      turdal: turdal,
      mugdal: mugdal,
      harbhara: harbhara,
      mug: mug,
      chavli: chavli,
      vatana: vatana,
      oil: oil,
      tikhat: tikhat,
      garamMasala: garamMasala,
      mith: mith,
      halad: halad,
      jira: jira,
      mohri: mohri
    }

    await axios
      .post(`${apiKey}/user/staff/add-mdm-data`, requestData, config)
      .then((res) => {
        if (res.data.successful) {
          toast.success("Meal added successfully..!", {
            position: "bottom-right",
          });
          reset();
          closeModal();
          getMDMData(currentYear, nextMonth);
          getYearsAndMonths();
          setYearsAndMonths();
        }else{
          toast.error("Meal already added..!", {
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
      id="addMealModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-primary">Add Meal</Title>
          <FaXmark
            className="text-lg text-danger cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-col">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 w-full">
              <section className="flex flex-col">
                <span  className="text-xs text-center mb-8 text-danger">*Note that the meal resources will be automatically calculated based on the total students and working days</span>
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
                      Month
                    </label>
                    <TextInput
                      disabled
                      className="mt-1"
                      {...register("month", { required: true })}
                    />
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="w-full mb-4">
                    <label htmlFor="totalStudents" className="text-sm">
                      Total Students
                    </label>
                    <TextInput
                      disabled
                      className="mt-1"
                      {...register("totalStudents", { required: true })}
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="workingDays" className="text-sm">
                      Working Days (In a month)
                    </label>
                    <NumberInput
                    placeholder=""
                    enableStepper={false}
                      className="mt-1"
                      {...register("workingDays", { required: true })}
                    />
                  </span>
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

export default AddMealModal;
