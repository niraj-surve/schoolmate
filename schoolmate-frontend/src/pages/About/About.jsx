import React from "react";
import AboutImage from "../../assets/img/school/School0.png";

const About = () => {
  return (
    <section
      id="about"
      className="md:grid max-md:flex max-md:flex-col-reverse max-md:gap-7 md:grid-cols-about place-items-center bg-gray-100 opacity-90 px-14 md:px-8 md:pb-10 pt-10 md:gap-7"
    >
      <div
        id="about-header"
        className="flex flex-col max-md:items-center md:gap-4 max-md:gap-4 md:pl-14 max-md:mb-8"
      >
        <div className="max-lg:text-[2rem] lg:text-[3rem] max-md:text-[1.6rem] sm:text[1.2rem] max-md:text-center font-extrabold text-dark">
          <h1>
            About {" "}
            <span className="text-pink">School</span>
          </h1>
        </div>
        <p className="leading-6 max-md:text-center md:text-justify font-mulish">
          Jivan Shikshan School Guhagar No.1 is a premier educational school in
          Guhagar. Our school has a rich history of providing quality education
          to students from all walks of life. The school has a state-of-the-art
          infrastructure with well-equipped classrooms, laboratories, and sports
          facilities. The faculty is highly qualified and experienced, and the
          school has a strong emphasis on academic excellence. In addition to
          academics, the school also offers a variety of extracurricular
          activities to help students develop their holistically.
        </p>
        <h2 className="text-xl font-bold mt-4">Our Mission</h2>
        <p className="leading-6 max-md:text-center md:text-justify font-mulish">
        Our vision is to be a beacon of educational excellence, inspiring students to become confident, compassionate, and creative individuals who embrace learning as a lifelong journey. We aspire to create an educational environment where curiosity thrives, talents are nurtured, and each student's potential is fully realized. Through holistic education and a commitment to innovation, we aim to shape the leaders, thinkers, and change-makers of tomorrow.
        </p>
        <h2 className="text-xl font-bold mt-4">Our Vision</h2>
        <p className="leading-6 max-md:text-center md:text-justify font-mulish">
        Our mission is to provide a transformative educational experience that fosters intellectual growth, personal development, and social responsibility. Guided by a deep commitment to our students and community. We are committed to nurturing a generation of well-rounded, empowered individuals who possess the skills, knowledge, and values to thrive in a complex and interconnected world.
        </p>
      </div>
      <div className="flex h-full">
        <img className="object-cover rounded-3xl shadow-2xl" src={AboutImage} alt="" />
      </div>
    </section>
  );
};

export default About;
