import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import logo from "../../assets/img/logo/logo.svg";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [count, setCount] = useState(1); // Set initial count to 1

  useEffect(() => {
    // Ensure the code inside useEffect runs only when count becomes 1
    if (!document.querySelector("#google_translate_element")) {
      const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false
          },
          "google_translate_element"
        );
      };

      const addScript = document.createElement("script");
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);
      window.googleTranslateElementInit = googleTranslateElementInit;
    }
  }, []);

  const closeNavbar = () => {
    setIsNavOpen(false);
  };

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <div className="flex flex-col bg-white p-2">
        {/* Google Translate button */}
        <div id="google_translate_element" className="self-end"></div>
      </div>
      <nav className="relative flex flex-row items-center top-0 justify-between bg-white h-[64px] max-sm:px-4 w-full z-50 px-14">
        {/* Overlay to blur the content */}
        {isNavOpen && (
          <div
            className="fixed inset-0 bg-black opacity-30"
            onClick={closeNavbar}
          ></div>
        )}

        <Link to="/" className="flex flex-row items-center">
          <img className="h-[41.2px] pr-2" src={logo} alt="logo" />
          <h2 className="font-bold text-xl capitalize max-sm:text-lg">
            Jeevan <span className="text-pink">Shikshan</span>
          </h2>
        </Link>
        <div
          id="nav-list"
          className={`max-md:fixed max-md:top-0 max-md:-right-[250px] max-md:h-screen flex max-md:flex-col md:items-center max-md:w-[250px] pl-6 pt-1 gap-8 max-md:bg-slate-50 max-md:transition-[right] text-dark font-mulish z-[52] ${isNavOpen ? "max-md:right-0" : "max-md:-right-[250px]"
            }`}
        >
          <div className="md:hidden relative flex flex-row items-center">
            <img className="h-[41.2px] pr-2" src={logo} alt="logo" />
            <FaXmark
              className="absolute right-5 cursor-pointer"
              onClick={closeNavbar}
            />
          </div>
          <NavLink
            to="/"
            className="nav-link relative"
            onClick={closeNavbar}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="nav-link relative"
            onClick={closeNavbar}
          >
            About
          </NavLink>
          <NavLink
            to="/faculty"
            className="nav-link relative"
            onClick={closeNavbar}
          >
            Faculty
          </NavLink>
          <NavLink
            to="/contact"
            className="nav-link relative"
            onClick={closeNavbar}
          >
            Contact
          </NavLink>
          <NavLink
            to="/gallery"
            className="nav-link relative"
            onClick={closeNavbar}
          >
            Gallery
          </NavLink>
          <Link to="/login" onClick={closeNavbar}>
            <button className="btn-transition bg-yellow px-4 py-2 rounded-lg font-bold border border-yellow hover:border-yellow hover:bg-white shadow-lg hover:text-yellow">
              Log In
            </button>
          </Link>
        </div>
        <div
          id="nav-toggle"
          className="md:hidden flex flex-col items-center text-lg w-[35px] h-[35px] p-2 bg-pink rounded-lg cursor-pointer"
          onClick={toggleNavbar}
        >
          <FaBars className="text-dark text-lg" />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
