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

const UpdateStudentModal = ({ isOpen, closeModal, userData, fetchStudents }) => {
  const apiKey = import.meta.env.VITE_API_URL;
  const MAX_STEPS = 4;

  const [gender, setGender] = useState(userData.gender);
  const [formStep, setFormStep] = useState(0);

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
      name: userData.name,
      fathersName: userData.fathersName,
      mothersName: userData.mothersName,
      pContactNo: userData.pContactNo,
      dob: userData.dob
        ? new Date(userData.dob).toISOString().split("T")[0]
        : "",
      address: userData.address,
      admissionDate: userData.admissionDate
      ? new Date(userData.admissionDate).toISOString().split("T")[0]
      : "",
      noInSiblings: userData.noInSiblings,
      income: userData.income,
      aadharNo: userData.aadharNo,
      religion: userData.religion,
      caste: userData.caste,
    },
  });

  const validateAdmissionDate = (value) => {
    const today = new Date();
    const selectedDate = new Date(value);

    return (
      value &&
      !isNaN(selectedDate.getTime()) && // Check if it's a valid date
      selectedDate <= today &&
      selectedDate.toISOString().split("T")[0] === value
    );
  };

  const onSubmit = async (data) => {
    console.log(formStep)
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const requestData = {
      ...data,
      gender: gender,
    };

    await axios
      .put(`${apiKey}/user/staff/update-student`, requestData, config)
      .then((res) => {
        if (res.data.successful) {
          toast.success("Student updated successfully..!", {
            position: "bottom-right",
          });
          reset();
          setGender(null);
          closeModal();
          fetchStudents();
        }
        if (res.data.regNoNotExistsError) {
          toast.error("Student with register number does not exist..!", {
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
      id="updateStudentModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-warning">Update Student Record</Title>
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
                          formStep === 1 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep} of {MAX_STEPS}
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
                      errorMessage="Invalid register number"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="name" className="text-sm">
                      Full Name
                    </label>
                    <TextInput
                      className="mt-1"
                      {...register("name", { required: true })}
                      error={!!errors.name}
                      errorMessage="Invalid name"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="fathersName" className="text-sm">
                      Father's Name
                    </label>
                    <TextInput
                      className="mt-1"
                      {...register("fathersName", { required: true })}
                      error={!!errors.fathersName}
                      errorMessage="Invalid name"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="mothersName" className="text-sm">
                      Mother's Name
                    </label>
                    <TextInput
                      className="mt-1"
                      {...register("mothersName", { required: true })}
                      error={!!errors.mothersName}
                      errorMessage="Invalid name"
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
                          formStep === 1 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep} of {MAX_STEPS}
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
                          formStep === 1 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="phone" className="text-sm">
                      Parent's Phone No
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("pContactNo", { required: true })}
                      enableStepper={false}
                      error={!!errors.pContactNo}
                      errorMessage="Invalid phone"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="admissionDate" className="text-sm">
                      Admission Date
                    </label>
                    <input
                      type="date"
                      {...register("admissionDate", {
                        required: "Please select admission date",
                        validate: (value) =>
                          validateAdmissionDate(value) ||
                          "Invalid admission date",
                      })}
                      id="admissionDate"
                      className={`w-full text-sm border rounded-lg mt-1 px-3 py-2 ${
                        errors.admissionDate ? "border-red-600" : ""
                      } focus:outline-none focus:ring focus:border-primary`}
                    />
                    <span className="text-sm font-opensans text-red-600">
                      {errors.admissionDate && errors.admissionDate.message}
                    </span>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="phone" className="text-sm">
                      No. in Siblings
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("noInSiblings", { required: true })}
                      enableStepper={false}
                      error={!!errors.noInSiblings}
                      errorMessage="Invalid Number"
                    />
                  </span>
                </section>
              )}

              {formStep === 3 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">Academic Information</h1>
                    <p className="flex items-center gap-2 cursor-pointer">
                      <FaCircleArrowLeft
                        className={`text-lg text-primary ${
                          formStep === 1 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="phone" className="text-sm">
                      Parent's Income
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("income", { required: true })}
                      enableStepper={false}
                      error={!!errors.income}
                      errorMessage="Invalid Income"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="phone" className="text-sm">
                      Aadhar Number
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("aadharNo", { required: true })}
                      enableStepper={false}
                      error={!!errors.aadharNo}
                      errorMessage="Invalid Aadhar No"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="religion" className="text-sm">
                      Religion
                    </label>
                    <TextInput
                      className="mt-1"
                      {...register("religion", { required: true })}
                      error={!!errors.religion}
                      errorMessage="Invalid religion"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="caste" className="text-sm">
                      Caste
                    </label>
                    <TextInput
                      className="mt-1"
                      {...register("caste", { required: true })}
                      error={!!errors.caste}
                      errorMessage="Invalid caste"
                    />
                  </span>
                </section>
              )}
            </div>
          </div>
          <div className="mt-4 float-right">
            <Button
              disabled={!isValid}
              onClick={formStep <= MAX_STEPS - 1 ? completeFormStep : null}
              type={formStep <= MAX_STEPS - 1 ? "button" : "submit"}
              className="text-white border btn-transition bg-warning border-warning hover:bg-white hover:border-warning hover:text-warning"
            >
              {formStep <= MAX_STEPS - 2 ? "Next Step" : "Update"}
            </Button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default UpdateStudentModal;
