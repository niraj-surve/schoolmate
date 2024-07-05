import { Button, NumberInput, TextInput } from "@tremor/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPhone, FaUser } from "react-icons/fa";

const ProfileDetailsPanel = ({ user, setUser }) => {
  const apiKey = import.meta.env.VITE_API_URL;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fname: user.fname,
      lname: user.lname,
      phone: user.phone,
    },
  });

  const setValues = (user) => {
    setValue("fname", user.fname);
    setValue("lname", user.lname);
    setValue("phone", user.phone);
  }

  const onDetailsSubmit = async (data) => {
    const { fname, lname, phone } = data;
    const jwtToken = localStorage.getItem("jwtToken");
    const requestData = { token: jwtToken, fname, lname, phone };
    try {
      const res = await axios.put(
        `${apiKey}/auth/update-profile`,
        requestData
      );
      if (res.status === 200) {
        setUser(res.data);
        setValues(res.data);
        toast.success("Profile details updated..!", {
          position: "bottom-right",
        });
      }
    } catch (err) {
      console.log("Error in updating the details..\n" + err);
    }
  };

  return (
    <div className="mt-10">
      <form
        onSubmit={handleSubmit(onDetailsSubmit)}
        className="flex flex-col items-center gap-8 mx-32"
      >
        <TextInput
          icon={FaUser}
          id="fname"
          defaultValue={user.fname}
          {...register("fname", {
            required: true,
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: "Invalid last name",
            },
          })}
          errorMessage={errors.fname ? "Invalid first name" : ""}
          error={!!errors.fname}
          placeholder="First Name"
        />
        <TextInput
          icon={FaUser}
          id="lname"
          defaultValue={user.lname}
          {...register("lname", {
            required: true,
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: "Invalid last name",
            },
          })}
          errorMessage={errors.lname ? "Invalid last name" : ""}
          error={!!errors.lname}
          placeholder="Last Name"
        />
        <NumberInput
          icon={FaPhone}
          defaultValue={user.phone}
          enableStepper={false}
          {...register("phone", {
            required: true,
          })}
          errorMessage={errors.phone ? "Invalid phone number" : ""}
          error={!!errors.phone}
          placeholder="Phone"
        />
        <Button type="submit" color="green">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ProfileDetailsPanel;
