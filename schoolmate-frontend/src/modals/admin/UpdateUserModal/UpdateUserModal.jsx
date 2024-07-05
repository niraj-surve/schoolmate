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

const UpdateUserModal = ({ isOpen, fetchUsers, closeModal, userData }) => {
  const apiKey = import.meta.env.VITE_API_URL;
  const MAX_STEPS = 3;

  const [position, setPosition] = useState(userData.position);
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
      fname: userData.fname,
      lname: userData.lname,
      phone: userData.phone,
      dob: userData.dob
        ? new Date(userData.dob).toISOString().split("T")[0]
        : "",
      email: userData.email,
    },
    mode: "all",
  });

  const calculateAge = (dob) => {
    const currentDate = new Date();
    const dobDate = new Date(dob);
    const age = currentDate.getFullYear() - dobDate.getFullYear();

    // Check if the birthday has occurred this year
    if (
      currentDate.getMonth() < dobDate.getMonth() ||
      (currentDate.getMonth() === dobDate.getMonth() &&
        currentDate.getDate() < dobDate.getDate())
    ) {
      return age - 1;
    }

    return age;
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
      position: position,
    };

    await axios
      .put(`${apiKey}/admin/update-user`, requestData, config)
      .then((res) => {
        if (res.data.successful) {
          closeModal();
          toast.success("User updated successfully..!", {
            position: "bottom-right",
          });
          reset();
          fetchUsers();
        }
        if (res.data.principalExistsError) {
          closeModal();
          toast.error("User as Principal already exists..!", {
            position: "bottom-right",
          });
        }

        if (res.data.emailNotExistsError) {
          closeModal();
          toast.error("User does not exist..!", {
            position: "bottom-right",
          });
        }

        if (res.data.emailChangeError) {
          closeModal();
          toast.error("Email cannot be changed..!", {
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
      id="updateUserModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-warning">Update User</Title>
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
                    <label htmlFor="phone" className="text-sm">
                      Phone
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("phone", { required: true })}
                      enableStepper={false}
                      error={!!errors.phone}
                      errorMessage="Invalid phone"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="email" className="text-sm">
                      Email
                    </label>
                    <TextInput
                      className="mt-1"
                      {...register("email", { required: true })}
                      type="email"
                      disabled
                      title="Email cannot be changed"
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
                    <label htmlFor="role" className="text-sm">
                      Role
                    </label>
                    <Select
                      className="mt-1"
                      enableClear={true}
                      value={position !== null ? position : undefined}
                      onChange={(selected) => setPosition(selected)}
                      placeholder="Select Role"
                    >
                      <SelectItem value="principal">Principal</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </Select>
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

export default UpdateUserModal;
