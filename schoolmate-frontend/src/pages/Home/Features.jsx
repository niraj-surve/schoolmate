import React from "react";
import { MdOutlineSportsKabaddi } from "react-icons/md";
import { RiParentFill } from "react-icons/ri";
import { FaSchool } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import { HiLightBulb } from "react-icons/hi";
import { FaChalkboardTeacher } from "react-icons/fa";
import FeatureCard from "../../components/FeatureCard/FeatureCard";

const Features = () => {
  return (
    <section id="features" className="md:p-14 max-md:py-10 max-md:p-4">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl text-dark font-bold mb-4">Our Features</h2>

        <div className="flex flex-wrap justify-center ">
          <FeatureCard
            icon={<FaSchool className="text-[1.7rem]" />}
            title="Our Campus"
            description="Safe, vibrant school encouraging curiosity, discovery, and imagination for young learners."
          />

          <FeatureCard
            icon={<FaChalkboardTeacher className="text-[1.7rem]" />}
            title="Expert Educators"
            description="Dedicated educators passionately support student growth,
                bringing expertise and fostering a student-centered environment."
          />

          <FeatureCard
            icon={<HiLightBulb className="text-[1.7rem]" />}
            title="Academic Excellence"
            description="We provide a well-rounded curriculum, fostering critical skills
                for lifelong success."
          />

          <FeatureCard
            icon={<MdOutlineSportsKabaddi className="text-[1.7rem]" />}
            title="Sports and Physical Activity"
            description="Our school's diverse sports programs instill discipline,
                collaboration, and perseverance, positively impacting academics
                and personal growth."
          />

          <FeatureCard
            icon={<RiParentFill className="text-[1.7rem]" />}
            title="Parent and Community Engagement"
            description="Transparent updates on progress and achievements enhance parent involvement."
          />

          <FeatureCard
            icon={<SiGoogleclassroom className="text-[1.7rem]" />}
            title="Creative Learning Spaces"
            description="Creative, interactive classrooms with flexible seating, multimedia, and tech for diverse learning."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
