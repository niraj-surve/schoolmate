import React from "react";
import SignupImage from "../../assets/img/home/signup-image.svg";
import { TextInput } from "@tremor/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

const Signup = () => {
  const apiKey = import.meta.env.VITE_API_URL;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await axios.post(`${apiKey}/home/send-enquiry-mail`, data).then((res) => {
        if (res.data.successful) {
          toast.success("Enquiry Sent..!", { position: "bottom-right" });
          reset();
        }
      });
    } catch (error) {
      toast.error("Internal Server Error..!", { position: "bottom-right" });
    }
  };

  return (
    <section
      id="signup"
      className="grid md:grid-cols-hero md:items-center gap-28 w-full max-md:px-10 md:px-14 py-20"
    >
      <div>
        <img className="w-full" src={SignupImage} alt="" />
      </div>
      <div className="md:px-6">
        <h2 className="text-4xl max-md:text-center font-black text-dark">
          Admission Enquiry
        </h2>
        <p className="mb-8 mt-2 max-md:text-center font-mulish font-semibold">
          Enquire now!
        </p>
        <form
          className="flex flex-col gap-4 md:mr-32 max-md:items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            {...register("fname", { required: true })}
            errorMessage={errors.fname ? "Invalid name" : ""}
            error={!!errors.fname}
            type="text"
            placeholder="First Name"
          />
          <TextInput
            {...register("lname", { required: true })}
            errorMessage={errors.lname ? "Invalid name" : ""}
            error={!!errors.lname}
            type="text"
            placeholder="Last Name"
          />
          <TextInput
            {...register("email", { required: true })}
            errorMessage={errors.email ? "Invalid name" : ""}
            error={!!errors.email}
            type="email"
            placeholder="Email"
          />
          <TextInput
            {...register("phone", { required: true })}
            errorMessage={errors.phone ? "Invalid name" : ""}
            error={!!errors.phone}
            type="phone"
            placeholder="Phone"
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

export default Signup;
