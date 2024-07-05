import React from "react";
import HeroImage from "../../assets/img/school/School0.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      id="hero"
      className="md:grid max-md:flex max-md:flex-col max-md:gap-7 md:grid-cols-hero place-items-center bg-white opacity-90 px-14 md:px-8 max-md:pb-10 md:h-[calc(100vh-64px)]"
    >
      <div className="max-md:mt-14 border-[6px] border-pink rounded-2xl">
        <img className="rounded-xl border-[6px] border-slate-50" src={HeroImage} alt="" />
      </div>
      <div
        id="hero-header"
        className="flex flex-col max-md:items-center gap-8 md:pl-14"
      >
        <div className="max-lg:text-[2rem] lg:text-[3rem] max-md:text-[1.6rem] sm:text[1.2rem] max-md:text-center font-extrabold text-dark">
          <h1>
            Jeevan Shikshan School {" "}
            <span className="text-pink">Guhagar No. 1</span>
          </h1>
        </div>
        <p className="leading-8 max-md:text-center">
          Guhagar's Jivan Shikshan School No.1, a government-aided institution,
          has offered quality education for over 50 years. Tailoring teaching
          methods to individual needs, our dedicated staff ensures a
          high-quality education in English, Marathi, math, science, and social
          studies. We also provide diverse extracurriculars like sports, arts,
          and music for holistic student development.
        </p>
        <Link to="about">
          <button className="btn-transition font-bold px-8 py-3 bg-pink text-white rounded-lg border border-pink hover:bg-white hover:text-pink hover:border-pink shadow-xl">
            About us
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
