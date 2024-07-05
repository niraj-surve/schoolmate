import React, { useEffect, useState } from "react";
import LoginImage from "../../assets/img/home/login-image.svg";
import { useNavigate } from "react-router-dom";
import { TextInput } from "@tremor/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

const Login = ({ setAuthenticated }) => {
  const apiKey = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${apiKey}/auth/login`, data);

      if (response.status === 200) {
        toast.success("Login successful..!", { position: "bottom-right" });

        const jwtToken = response.data.token;
        const refreshToken = response.data.refreshToken;
        const role = response.data.position;
        const standard = response.data.standard;
        const facility = response.data.facility
        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("role", role);
        setAuthenticated(true);
        reset();
        if(role === "admin"){
          navigate("/dashboard/admin");
        }else if(role === "staff"){
          localStorage.setItem("standard", standard);
          localStorage.setItem("facility", facility);
          navigate("/dashboard/staff");
        }else if(role === "principal"){
          navigate("/dashboard/principal");
        }
      }
    } catch (error) {
      toast.error("Invalid credentials..!", { position: "bottom-right" });
      console.error("User login failed..!\n", error);
    }
  };

  return (
    <section
      id="login"
      className="grid md:grid-cols-contact gap-16 items-center w-full md:h-[calc(100vh-64px)] max-md:px-4sm::px-1 md:2/44 md:px-14 py-20 bg-gray-100"
    >
      <div>
        <img className="w-full max-md:hidden" src={LoginImage} alt="" />
      </div>
      <div className="flex flex-col px-6 gap-10 max-md:items-center ">
        <h2 className="text-2xl md:text-4xl max-md:text-center font-black text-dark">
          Login to <span className="text-pink">SchoolMATE</span>
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 md:w-[70%] max-md:items-center"
        >
          <TextInput
            type="email"
            {...register("email", { required: true })}
            errorMessage={errors.email ? "Invalid email" : ""}
            error={!!errors.email}
            placeholder="Email"
          />
          <TextInput
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 16,
            })}
            errorMessage={
              errors.password
                ? "Password must be between 8 and 16 characters"
                : ""
            }
            error={!!errors.password}
            placeholder="Password"
          />

          <button
            type="submit"
            className="btn-transition font-bold font-opensans uppercase rounded-xl mb-4 px-4 py-2 w-fit border-2 text-white bg-pink border-pink hover:border-2 hover:text-pink hover:border-pink hover:bg-white"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;