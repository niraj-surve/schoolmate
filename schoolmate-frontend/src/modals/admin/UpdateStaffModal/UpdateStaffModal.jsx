import {
  Button,
  DatePicker,
  Dialog,
  DialogPanel,
  NumberInput,
  Select,
  SelectItem,
  TextInput,
  Title,
} from "@tremor/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaXmark, FaCircleArrowLeft } from "react-icons/fa6";
import { calculateAge } from "../../../helpers/AgeLimitter";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateStaffModal = ({ isOpen, closeModal, userData, fetchStaff }) => {
  const apiKey = import.meta.env.VITE_API_URL;
  const MAX_STEPS = 5;

  const [gender, setGender] = useState(userData.gender);
  const [formStep, setFormStep] = useState(0);
  const [position, setPosition] = useState(userData.position);
  const [educationalQualification, setEducationalQualification] =
    useState(userData.educationalQualification);
  const [professionalQualification, setProfessionalQualification] =
    useState(userData.professionalQualification);

  const completeFormStep = () => {
    setFormStep((prev) => prev + 1);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fname: userData.fname,
      mname: userData.mname,
      lname: userData.lname,
      phone: userData.phone,
      dob: userData.dob
      ? new Date(userData.dob).toISOString().split("T")[0]
      : "",
      email: userData.email,
      address: userData.address,
      jobStartDate: userData.jobStartDate
      ? new Date(userData.jobStartDate).toISOString().split("T")[0]
      : "",
      retirementDate: userData.retirementDate
      ? new Date(userData.retirementDate).toISOString().split("T")[0]
      : "",
      schoolJoinedDate: userData.schoolJoinedDate
      ? new Date(userData.schoolJoinedDate).toISOString().split("T")[0]
      : "",
    },
  });

  const calculateRetirementDate = (dob) => {
    if (dob) {
      const dobDate = new Date(dob);
      dobDate.setFullYear(dobDate.getFullYear() + 60); // Assuming retirement age is 60
      const retirementDateString = dobDate.toISOString().split("T")[0];
      setValue("retirementDate", retirementDateString);
    }
  };

  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    setValue("dob", dobValue); // Update the form value for dob
    calculateRetirementDate(dobValue);
  };

  const validateSchoolJoinedDate = (value) => {
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
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const requestData = {
      ...data,
      gender: gender,
      position: position,
      educationalQualification: educationalQualification,
      professionalQualification: professionalQualification,
    };

    await axios
      .put(`${apiKey}/admin/update-staff`, requestData, config)
      .then((res) => {
        if (res.data.successful) {
          toast.success("Staff updated successfully..!", {
            position: "bottom-right",
          });
          reset();
          setGender(null);
          setPosition(null);
          setEducationalQualification(null);
          setProfessionalQualification(null);
          closeModal();
          fetchStaff();
        }
        if (res.data.emailNotExistsError) {
          toast.error("Staff with email does not exist..!", {
            position: "bottom-right",
          });
        }
        if (res.data.principalExistsError) {
          toast.error("Staff as Principal already exists..!", {
            position: "bottom-right",
          });
        }
        if (res.data.vicePrincipalExistsError) {
          toast.error("Staff as Vice Principal already exists..!", {
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
      id="addStaffModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-warning">Update Staff</Title>
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
                        className={`text-lg text-warning ${formStep === 0 ? "hidden" : "block"
                          }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                  <label htmlFor="fname" className="text-sm">First Name</label>
                    <TextInput
                    className="mt-1"
                      {...register("fname", { required: true })}
                      error={!!errors.fname}
                      errorMessage="Invalid first name"
                    />
                  </span>
                  <span className="w-full mb-4">
                  <label htmlFor="mname" className="text-sm">Middle Name</label>
                    <TextInput
                    className="mt-1"
                      {...register("mname", { required: true })}
                      error={!!errors.mname}
                      errorMessage="Invalid middle name"
                    />
                  </span>
                  <span className="w-full mb-4">
                  <label htmlFor="lname" className="text-sm">Last Name</label>
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
                        className={`text-lg text-primary ${formStep === 0 ? "hidden" : "block"
                          }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                  <label htmlFor="address" className="text-sm">Address</label>
                    <TextInput
                    className="mt-1"
                      {...register("address", { required: true })}
                      error={!!errors.address}
                      errorMessage="Invalid address"
                    />
                  </span>
                  <span className="w-full mb-4">
                  <label htmlFor="dob" className="text-sm">Date of Birth</label>
                    <input
                      type="date"
                      {...register("dob", {
                        required: "Please select date of birth",
                        validate: (value) =>
                          calculateAge(value) >= 18 ||
                          "Must be 18 years or older",
                      })}
                      onChange={handleDobChange}
                      id="dob"
                      className={`w-full text-sm border rounded-lg mt-1 px-3 py-2 ${errors.dob ? "border-red-600" : ""
                        } focus:outline-none focus:ring focus:border-primary`}
                    />
                    <span className="text-sm font-opensans text-red-600">
                      {errors.dob ? "Invalid date of birth" : ""}
                    </span>
                  </span>
                  <span className="w-full mb-4">
                  <label htmlFor="gender" className="text-sm">Gender</label>
                    <Select
                    className="mt-1"
                      enableClear={true}
                      value={gender !== null ? gender : undefined}
                      onChange={(selected) => setGender(selected)}
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
                    <h1 className="font-bold">Contact Information</h1>
                    <p className="flex items-center gap-2 cursor-pointer">
                      <FaCircleArrowLeft
                        className={`text-lg text-primary ${formStep === 0 ? "hidden" : "block"
                          }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                  <label htmlFor="phone" className="text-sm">Phone</label>
                    <NumberInput
                    className="mt-1"
                      {...register("phone", { required: true })}
                      enableStepper={false}
                      error={!!errors.phone}
                      errorMessage="Invalid phone"
                    />
                  </span>
                  <span className="w-full mb-4">
                  <label htmlFor="email" className="text-sm">Email</label>
                    <TextInput
                    className="mt-1"
                      {...register("email", { required: true })}
                      type="email"
                      error={!!errors.email}
                      errorMessage="Invalid email"
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
                        className={`text-lg text-primary ${formStep === 0 ? "hidden" : "block"
                          }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                  <label htmlFor="position" className="text-sm">Position</label>
                    <Select
                    className="mt-1"
                      enableClear={true}
                      value={position !== null ? position : undefined}
                      onChange={(selected) => setPosition(selected)}
                      placeholder="Select Position"
                    >
                      <SelectItem value="principal">Principal</SelectItem>
                      <SelectItem value="vicePrincipal">Vice Principal</SelectItem>
                      <SelectItem value="graduateTeacher">
                        Graduate Teacher
                      </SelectItem>
                      <SelectItem value="assistantTeacher">
                        Assistant Teacher
                      </SelectItem>
                    </Select>
                  </span>
                  <span className="w-full mb-4">
                  <label htmlFor="jobStartDate" className="text-sm">Job Start Date</label>
                    <input
                      type="date"
                      {...register("jobStartDate", {
                        required: "Please select job started date",
                        validate: (value) =>
                          validateSchoolJoinedDate(value) ||
                          "Invalid Job Started Date",
                      })}
                      id="jobStartDate"
                      className={`w-full text-sm border rounded-lg mt-1 px-3 py-2 ${errors.jobStartDate ? "border-red-600" : ""
                        } focus:outline-none focus:ring focus:border-primary`}
                    />
                    <span className="text-sm font-opensans text-red-600">
                      {errors.jobStartDate && errors.jobStartDate.message}
                    </span>
                  </span>
                  <span className="w-full mb-4">
                  <label htmlFor="retirementDate" className="text-sm">Retirement Date</label>
                    <input
                      disabled
                      type="date"
                      {...register("retirementDate", {
                        required: "Please select retirement date",
                      })}
                      id="retirementDate"
                      className={`w-full text-sm border rounded-lg mt-1 px-3 py-2 ${errors.retirementDate ? "border-red-600" : ""
                        } focus:outline-none focus:ring focus:border-primary`}
                    />
                    <span className="text-sm font-opensans text-red-600">
                      {errors.retirementDate &&
                        errors.retirementDate.type === "required" &&
                        "Select retirement Date"}
                    </span>
                  </span>
                  <span className="w-full mb-4">
                  <label htmlFor="schoolJoinedDate" className="text-sm">School Joined Date</label>
                    <input
                      type="date"
                      {...register("schoolJoinedDate", {
                        required: "Please select school joined date",
                        validate: (value) =>
                          validateSchoolJoinedDate(value) ||
                          "Invalid school joined date",
                      })}
                      id="schoolJoinedDate"
                      className={`w-full text-sm border rounded-lg mt-1 px-3 py-2 ${errors.schoolJoinedDate ? "border-red-600" : ""
                        } focus:outline-none focus:ring focus:border-primary`}
                    />
                    <span className="text-sm font-opensans text-red-600">
                      {errors.schoolJoinedDate && errors.schoolJoinedDate.message}
                    </span>
                  </span>
                </section>
              )}
              {formStep === 4 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">Education Information</h1>
                    <p className="flex items-center gap-2 cursor-pointer">
                      <FaCircleArrowLeft
                        className={`text-lg text-primary ${formStep === 0 ? "hidden" : "block"
                          }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                  <label htmlFor="educationalQualification" className="text-sm">Educational Qualification</label>
                    <Select
                    className="mt-1"
                      enableClear={true}
                      value={educationalQualification !== null ? educationalQualification : undefined}
                      onChange={(selected) => setEducationalQualification(selected)}
                      placeholder="Select Qualification"
                    >
                      <SelectItem value="ssc">SSC</SelectItem>
                      <SelectItem value="hsc">HSC</SelectItem>
                      <SelectItem value="ba">BA</SelectItem>
                      <SelectItem value="ma">MA</SelectItem>
                    </Select>
                  </span>
                  <span className="w-full mb-4">
                  <label htmlFor="professionalQualification" className="text-sm">Professional Qualification</label>
                    <Select
                    className="mt-1"
                      enableClear={true}
                      value={professionalQualification !== null ? professionalQualification : undefined}
                      onChange={(selected) =>
                        setProfessionalQualification(selected)
                      }
                      placeholder="Select Qualification"
                    >
                      <SelectItem value="bEd">B.Ed</SelectItem>
                      <SelectItem value="mEd">M.Ed</SelectItem>
                      <SelectItem value="dEd">D.Ed</SelectItem>
                    </Select>
                  </span>
                </section>
              )}
            </div>
          </div>
          <div className="mt-4 float-right">
            <Button
              disabled={!isValid}
              onClick={formStep <= 4 ? completeFormStep : null}
              type={formStep <= 4 ? "button" : "submit"}
              className="text-white border btn-transition bg-warning border-warning hover:bg-white hover:border-warning hover:text-warning"
            >
              {formStep <= 3 ? "Next Step" : "Update"}
            </Button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default UpdateStaffModal;