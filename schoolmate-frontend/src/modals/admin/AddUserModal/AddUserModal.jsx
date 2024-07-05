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

const AddUserModal = ({ isOpen, fetchUsers, closeModal }) => {
  const apiKey = import.meta.env.VITE_API_URL;
  const MAX_STEPS = 3;

  const [position, setPosition] = useState(null);
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
      fname: "",
      lname: "",
      phone: "",
      dob: "",
      email: "",
      password: "",
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

    const requestData = {
      ...data,
      position: position,
    };

    await axios
      .post(`${apiKey}/admin/add-user`, requestData, config)
      .then((res) => {
        if (res.data.successful) {
          toast.success("User added successfully..!", {
            position: "bottom-right",
          });
          reset();
          setPosition(null);
          closeModal();
          fetchUsers();
        }
        if (res.data.emailExistsError) {
          toast.error("User with same email already exists..!", {
            position: "bottom-right",
          });
        }
        if (res.data.principalExistsError) {
          toast.error("User as Principal already exists..!", {
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
      id="addUserModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-primary">Add User</Title>
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
                    <label htmlFor="fname" className="text-sm">First Name</label>
                    <TextInput
                      className="mt-1"
                      {...register("fname", { required: true })}
                      error={!!errors.fname}
                      errorMessage="Invalid first name"
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
                </section>
              )}
              {formStep === 1 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">Contact Information</h1>
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
              {formStep === 2 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">User Information</h1>
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
                    <label htmlFor="role" className="text-sm">Role</label>
                    <Select
                      className="mt-1"
                      enableClear={true}
                      onChange={(selected) => setPosition(selected)}
                      placeholder="Select Role"
                    >
                      <SelectItem value="principal">Principal</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </Select>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="password" className="text-sm">Password</label>
                    <TextInput
                      className="mt-1"
                      {...register("password", { required: true })}
                      type="password"
                      error={!!errors.password}
                      errorMessage="Invalid password"
                    />
                  </span>
                </section>
              )}
            </div>
          </div>
          <div className="mt-4 float-right">
            <Button
              disabled={!isValid}
              onClick={formStep <= 1 ? completeFormStep : null}
              type={formStep <= 1 ? "button" : "submit"}
              className="btn-transition bg-primary border-primary hover:bg-white hover:border-primary hover:text-primary"
            >
              {formStep <= 1 ? "Next Step" : "Submit"}
            </Button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default AddUserModal;
