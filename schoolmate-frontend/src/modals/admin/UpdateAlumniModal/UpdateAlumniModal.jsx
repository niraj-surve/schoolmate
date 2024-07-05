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
import { calculateAge } from "../../../helpers/AgeLimitter";

const UpdateAlumniModal = ({ isOpen, closeModal, userData, fetchAlumni }) => {
  const apiKey = import.meta.env.VITE_API_URL;
  const MAX_STEPS = 3;

  const [gender, setGender] = useState(userData.gender);
  const [formStep, setFormStep] = useState(0);
  const [admissionYear, setAdmissionYear] = useState(userData.admissionYear);
  const [passingYear, setPassingYear] = useState(userData.passingYear);

  const completeFormStep = () => {
    setFormStep((prev) => prev + 1);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      regNo: userData.regNo,
      fname: userData.fname,
      mname: userData.mname,
      lname: userData.lname,
      phone: userData.phone,
      dob: userData.dob
        ? new Date(userData.dob).toISOString().split("T")[0]
        : "",
      address: userData.address,
      currentStatus: userData.currentStatus,
    },
  });

  const currentYear = new Date().getFullYear();
  const startYear = 1947;
  const endYear = currentYear - 7;
  const passingYearsStart = startYear + 7;

  const admissionYears = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const passingYears = Array.from(
    { length: currentYear - passingYearsStart + 1 },
    (_, index) => passingYearsStart + index
  );

  const onSubmit = async (data) => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const requestData = {
      ...data,
      gender: gender,
      admissionYear: admissionYear,
      passingYear: passingYear,
    };

    await axios
      .put(`${apiKey}/admin/update-alumni`, requestData, config)
      .then((res) => {
        if (res.data.successful) {
          toast.success("Alumni updated successfully..!", {
            position: "bottom-right",
          });
          reset();
          setGender(null);
          setAdmissionYear(null);
          setPassingYear(null);
          closeModal();
          fetchAlumni();
        }
        if (res.data.emailNotExistsError) {
          toast.error("Alumni with email does not exist..!", {
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
      id="updateAlumniModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-warning">Update Alumni Record</Title>
          <FaXmark
            className="text-lg text-danger cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-col">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 w-full">
              {formStep === 0 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">Personal Information</h1>
                    <p className="flex items-center text-sm gap-2 cursor-pointer">
                      <FaCircleArrowLeft
                        className={`text-lg text-primary ${
                          formStep === 0 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="regNo" className="text-sm">
                      Registration Number
                    </label>
                    <NumberInput
                      className="mt-1"
                      enableStepper={false}
                      {...register("regNo", { required: true })}
                      error={!!errors.regNo}
                      errorMessage="Invalid registration number"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="fname" className="text-sm">
                      First Name
                    </label>
                    <TextInput
                      className="mt-1"
                      {...register("fname", { required: true })}
                      error={!!errors.fname}
                      errorMessage="Invalid first name"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="mname" className="text-sm">
                      Middle Name
                    </label>
                    <TextInput
                      className="mt-1"
                      {...register("mname", { required: true })}
                      error={!!errors.mname}
                      errorMessage="Invalid middle name"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="lname" className="text-sm">
                      Last Name
                    </label>
                    <TextInput
                      className="mt-1"
                      {...register("lname", { required: true })}
                      error={!!errors.lname}
                      errorMessage="Invalid last name"
                    />
                  </span>
                </section>
              )}

              {formStep === 1 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">Personal Information</h1>
                    <p className="flex items-center gap-2 cursor-pointer">
                      <FaCircleArrowLeft
                        className={`text-lg text-primary ${
                          formStep === 0 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="dob" className="text-sm">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      {...register("dob", {
                        required: "Please select date of birth",
                        validate: (value) =>
                          calculateAge(value) >= 18 ||
                          "Must be 18 years or older",
                      })}
                      placeholder="Date of Birth"
                      id="dob"
                      className={`w-full text-sm border rounded-lg mt-1 px-3 py-2 ${
                        errors.dob ? "border-red-600" : ""
                      } focus:outline-none focus:ring focus:border-primary`}
                    />
                    <span className="text-sm font-opensans text-red-600">
                      {errors.dob ? "Invalid date of birth" : ""}
                    </span>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="address" className="text-sm">
                      Address
                    </label>
                    <TextInput
                      className="mt-1"
                      {...register("address", { required: true })}
                      error={!!errors.address}
                      errorMessage="Invalid address"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="gender" className="text-sm">
                      Gender
                    </label>
                    <Select
                      className="mt-1"
                      enableClear={true}
                      value={gender !== null ? gender : undefined}
                      onChange={(selected) => setGender(selected)}
                      placeholder="Select Gender"
                    >
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </Select>
                  </span>
                </section>
              )}

              {formStep === 2 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">Academic Information</h1>
                    <p className="flex items-center gap-2 cursor-pointer">
                      <FaCircleArrowLeft
                        className={`text-lg text-primary ${
                          formStep === 0 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="AdYear" className="text-sm">
                      Admission Year
                    </label>
                    <Select
                      className="mt-1"
                      enableClear={true}
                      value={admissionYear !== null ? admissionYear : undefined}
                      onChange={(selected) => setAdmissionYear(selected)}
                      placeholder="Select Year"
                    >
                      {admissionYears.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </Select>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="PsYear" className="text-sm">
                      Passing Year
                    </label>
                    <Select
                      className="mt-1"
                      enableClear={true}
                      value={passingYear !== null ? passingYear : undefined}
                      onChange={(selected) => setPassingYear(selected)}
                      placeholder="Select Year"
                    >
                      {passingYears.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </Select>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="currentStatus" className="text-sm">
                      Current Status
                    </label>
                    <TextInput
                      className="mt-1"
                      {...register("currentStatus", { required: true })}
                      error={!!errors.currentStatus}
                      errorMessage="Invalid current status"
                    />
                  </span>
                </section>
              )}
            </div>
          </div>
          <div className="mt-4 float-right">
            <Button
              disabled={!isValid}
              onClick={formStep <= 2 ? completeFormStep : null}
              type={formStep <= 2 ? "button" : "submit"}
              className="text-white border btn-transition bg-warning border-warning hover:bg-white hover:border-warning hover:text-warning"
            >
              {formStep <= 1 ? "Next Step" : "Update"}
            </Button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default UpdateAlumniModal;
