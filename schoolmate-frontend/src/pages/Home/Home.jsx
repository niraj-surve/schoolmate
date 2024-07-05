import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Features from "./Features";
import Signup from "./Signup";
import Notice from "./Notice";

const Home = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Ensure the code inside useEffect runs only when count becomes 1
    if (count === 1) {
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
  }, [count]);

  // Increment the count state to trigger useEffect after the first render
  useEffect(() => {
    setCount(1);
  }, []);

  return (
    <div id="home" className="flex flex-col items-center w-full">
      <Hero />
      <section
        id="quote"
        className="flex items-center justify-center w-full h-20"
      >
        <h3 className="lg:text-xl max-md:text-md text-center font-black font-mulish text-white opacity-100">
          Jeevan Shikshan and SchoolMATE: A Dynamic Duo for Streamlined School
          Management.
        </h3>
      </section>
      <Features />
      <Notice />
      <Signup />
    </div>
  );
};

export default Home;
