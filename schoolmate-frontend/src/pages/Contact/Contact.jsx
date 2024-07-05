import React from "react";
import ContactImage from "../../assets/img/home/contact-image.png";
import { TextInput, Textarea } from "@tremor/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
  const apiKey = import.meta.env.VITE_API_URL;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data)
    try {
      await axios.post(`${apiKey}/home/send-contact-mail`, data).then((res) => {
        if (res.data.successful) {
          toast.success("Request Sent..!", { position: "bottom-right" });
          reset();
        }
      });
    } catch (error) {
      toast.error("Internal Server Error..!", { position: "bottom-right" });
    }
  };

  return (
    <section
      id="contact"
      className="md:grid max-md:flex max-md:flex-col-reverse max-md:gap-7 md:grid-cols-contact place-items-center bg-gray-100 opacity-90 px-14 max-md:px-8 md:h-[calc(100vh-64px)]"
    >
      <div
        id="contact-header"
        className="flex flex-col max-md:items-center md:gap-8 max-md:gap-4 md:pl-14 max-md:mb-8 max-md:w-full"
      >
        <div className="max-lg:text-[2rem] lg:text-[3rem] max-md:text-[1.6rem] sm:text[1.2rem] max-md:text-center font-extrabold text-dark">
          <h1>Get in touch</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex max-md:flex-col md:flex-wrap gap-4 max-md:w-full">
            <TextInput
              {...register("name", { required: true })}
              errorMessage={errors.name ? "Invalid name" : ""}
              error={!!errors.name}
              placeholder="Name"
            />
            <TextInput
              {...register("email", { required: true })}
              errorMessage={errors.email ? "Invalid name" : ""}
              error={!!errors.email}
              type="email"
              placeholder="Email"
            />
            <Textarea
              {...register("message", { required: true })}
              errorMessage={errors.message ? "Invalid message" : ""}
              error={!!errors.emamessageil}
              className="resize-none"
              rows={5}
              placeholder="Message"
            />
          </div>
          <button
            type="submit"
            className="btn-transition w-fit font-bold font-opensans uppercase rounded-xl mb-4 px-4 py-3 border-2 text-white bg-pink border-pink hover:border-2 hover:text-pink hover:border-pink hover:bg-white"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="">
        <img width={400} src={ContactImage} alt="" />
      </div>
    </section>
  );
};

export default Contact;
