import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center gap-10 sm:max-2xl:gap-8 h-screen bg-transparent text-dark">
        <h1 className="font-extrabold text-[4rem] lg:text-[15rem] md:max-lg:text-[10rem] sm:max-md:text-[8rem]">Oops!</h1>
        <h4 className="font-bold text-[1.4rem] lg:text-[2rem] md:max-lg:text-[1.7rem] sm:max-md:text-[1.4rem]">404 - Page Not Found</h4>
        <p className="w-[70%] lg:max-xl:w-[40%] md:max-lg:w-[50%] mx-auto text-center font-mulish text-lg leading-7">
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <Link to="/">
          <button className="btn-transition bg-dark text-white border border-transparent font-bold uppercase p-4 rounded-xl hover:border-dark hover:bg-white hover:text-dark max-sm:text-[0.9rem] sm:max-2xl:text-lg">Go to Homepage</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
