import axios from "axios";
import React, { useEffect, useState } from "react";
import MaleFaculty from "../../assets/img/faculty/facultyMale.png";
import FemaleFaculty from "../../assets/img/faculty/facultyFemale.png";

const Faculty = () => {
  const apiKey = import.meta.env.VITE_API_URL;

  const [facultyData, setFacultyData] = useState(null);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get(`${apiKey}/home/get-staff`);
      if (response.status === 200) {
        setFacultyData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  return (
    <section id="faculty" className="bg-gray-100 py-10 max-md:px-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-dark">
        Meet Our Dedicated Faculty
      </h2>
      <p className="md:text-lg text-center text-gray-600 mb-8">
        Passionate educators committed to nurturing the potential of every
        student.
      </p>
      <div className="flex flex-wrap md:justify-between justify-center gap-2 md:px-14">
        {facultyData !== null && facultyData.map((faculty) => (
          <div
            key={faculty.id}
            className="bg-white flex gap-8 p-6 py-4 mb-6 w-[450px] rounded-lg shadow-md items-center"
          >
            <img
              src={
                faculty.gender === "male"
                  ? MaleFaculty
                  : faculty.gender === "female"
                  ? FemaleFaculty
                  : MaleFaculty
              }
              alt="faculty"
              className="h-[100px] w-[100px] mb-4 rounded-md object-cover"
            />
            <div className="w-full">
              <h3 className="text-xl font-bold mb-2">
                {faculty.fname + " " + faculty.lname}
              </h3>
              <p className="text-gray-600 mb-2">
                {faculty.position === "vicePrincipal"
                  ? "Vice Principal"
                  : faculty.position === "principal"
                  ? "Principal"
                  : faculty.position === "assistantTeacher"
                  ? "Assistant Teacher"
                  : faculty.position === "graduateTeacher"
                  ? "Graduate Teacher"
                  : faculty.position}
              </p>
              <p className="text-gray-600 mb-2">
                Qualification:{" "}
                {faculty.professionalQualification === "bEd"
                  ? "B.Ed."
                  : faculty.professionalQualification === "mEd"
                  ? "M.Ed."
                  : faculty.professionalQualification === "dEd"
                  ? "D.Ed."
                  : faculty.position}
              </p>
              <p className="text-gray-600 mb-2">Mobile: {faculty.phone}</p>
              <p className="text-gray-600 mb-2">Email: {faculty.email}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faculty;
