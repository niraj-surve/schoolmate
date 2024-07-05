import {
  Button,
  Dialog,
  DialogPanel,
  Title,
} from "@tremor/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";

const GenerateTimetable = ({ isOpen, fetchTimetables, closeModal }) => {
  const apiKey = import.meta.env.VITE_API_URL;

  const [standard, setStandard] = useState(null);
  const subjects = [
    "Marathi",
    "English",
    "Science",
    "Hindi",
    "Mathematics",
    "Environmental Studies",
    "Work experience",
    "Drawing",
    "Physical Education",
    "History",
    "Geography",
  ];

  const [timetable, setTimetable] = useState(createEmptyTimetable());
  const [saturdayTimetable, setSaturdayTimetable] = useState(
    createEmptySaturdayTimetable()
  );
  const [dropdownsSelected, setDropdownsSelected] = useState(false);

  function createEmptyTimetable() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const periods = [
      "11_00 to 11_30",
      "11_30 to 12_00",
      "12_30 to 1_00",
      "1_00 to 1_30",
      "2_30 to 3_00",
      "3_00 to 3_30",
      "4_00 to 4_30",
      "4_30 to 5_00",
    ];

    const emptyTimetable = {};

    days.forEach((day) => {
      emptyTimetable[day] = {};
      periods.forEach((period) => {
        emptyTimetable[day][period] = { subject: ""};
      });
    });

    return emptyTimetable;
  }

  function createEmptySaturdayTimetable() {
    const days = ["Saturday"];
    const saturdayPeriods = [
      "7_30 to 8_00",
      "8_00 to 8_30",
      "8_30 to 9_00",
      "9_00 to 9_30",
      "10_00 to 10_30",
    ];

    const emptySaturdayTimetable = {};

    days.forEach((day) => {
      emptySaturdayTimetable[day] = {};
      saturdayPeriods.forEach((period) => {
        emptySaturdayTimetable[day][period] = { subject: ""};
      });
    });

    return emptySaturdayTimetable;
  }

  const handleSubjectSelect = (day, period, selectedSubject) => {
    setTimetable((prevTimetable) => ({
      ...prevTimetable,
      [day]: {
        ...prevTimetable[day],
        [period]: { ...prevTimetable[day][period], subject: selectedSubject },
      },
    }));
  };

  const handleSaturdaySubjectSelect = (day, period, selectedSubject) => {
    setSaturdayTimetable((prevTimetable) => ({
      ...prevTimetable,
      [day]: {
        ...prevTimetable[day],
        [period]: { ...prevTimetable[day][period], subject: selectedSubject },
      },
    }));
  };

  const resetTimetable = () => {
    setTimetable(createEmptyTimetable());
    setSaturdayTimetable(createEmptySaturdayTimetable());
    setStandard(null);
  };

  const handleSubmit = async (data) => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    await axios
      .post(`${apiKey}/admin/save-timetable`, data, config)
      .then((res) => {
        if (res.data.successful) {
          toast.success("Timetable generated successfully..!", {
            position: "bottom-right",
          });
          resetTimetable();
          closeModal();
          fetchTimetables();
        }
        if (res.data.timetableExistsError) {
          toast.error("Timetable for this standard already exists..!", {
            position: "bottom-right",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error..!", { position: "bottom-right" });
      });
  };

  const generateTimetable = () => {
    if (standard === "Select Standard") {
      toast.error("Please select the standard.", {
        position: "bottom-right",
      });
    } else if (dropdownsSelected) {
      console.log("Generating timetable...");
      const data = { standard, timetable, saturdayTimetable };
      handleSubmit(data);
    } else {
      toast.error("Please select all dropdowns.", {
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    const allDropdownsSelected = () => {
      for (const day in timetable) {
        for (const period in timetable[day]) {
          if (
            timetable[day][period].subject === ""
          ) {
            return false;
          }
        }
      }
      for (const day in saturdayTimetable) {
        for (const period in saturdayTimetable[day]) {
          if (
            saturdayTimetable[day][period].subject === ""
          ) {
            return false;
          }
        }
      }
      return true;
    };

    // Update dropdownsSelected state based on the selection status
    setDropdownsSelected(allDropdownsSelected());
  }, [timetable, saturdayTimetable]);

  return (
    <Dialog
      id="addTimetableModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-primary">Create Timetable</Title>
          <FaXmark
            className="text-lg text-danger cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <div className="flex flex-col gap-4 px-4 w-full">
          <div className="flex justify-between">
            <select
              className="border p-2 rounded w-fit shadow-md"
              onChange={(e) => setStandard(e.target.value)}
              placeholder="Select Standard"
              value={standard}
            >
              <option value="Select Standard">Select Standard</option>
              {Array.from({ length: 7 }, (_, index) => index + 1).map(
                (standard) => (
                  <option key={standard} value={standard}>
                    {`${standard}`}
                  </option>
                )
              )}
            </select>
            <Button
              className="btn-transition bg-danger border-danger hover:text-danger hover:bg-white hover:border-danger"
              onClick={() => resetTimetable()}
            >
              Reset
            </Button>
          </div>
          <div
            id="timetablesDiv"
            className="overflow-y-auto overflow-x-hidden h-[62vh]"
          >
            <h1 className="font-bold font-opensans my-4">Monday to Friday</h1>
            <div className="">
              <table className="table-auto text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-2"></th>
                    {Object.keys(timetable["Monday"]).map((period) => (
                      <th key={period} className="px-4 py-2">
                        {period}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(timetable).map((day) => (
                    <tr key={day}>
                      <td className="px-4 py-2">{day}</td>
                      {Object.keys(timetable[day]).map((period) => (
                        <td key={period} className="px-4 py-2">
                          <div className="space-y-2">
                            <select
                              value={timetable[day][period].subject}
                              onChange={(e) =>
                                handleSubjectSelect(day, period, e.target.value)
                              }
                              className="border p-2 rounded w-full shadow-md"
                            >
                              <option value="">Select Subject</option>
                              {subjects.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h1 className="font-bold font-opensans my-4">Saturday</h1>
            <div className="overflow-x-auto">
              <table className="table-auto text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-2"></th>
                    {Object.keys(saturdayTimetable["Saturday"]).map(
                      (period) => (
                        <th key={period} className="px-4 py-2">
                          {period}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(saturdayTimetable).map((day) => (
                    <tr key={day}>
                      <td className="px-4 py-2">{day}</td>
                      {Object.keys(saturdayTimetable[day]).map((period) => (
                        <td key={period} className="px-4 py-2">
                          <div className="space-y-2">
                            <select
                              value={saturdayTimetable[day][period].subject}
                              onChange={(e) =>
                                handleSaturdaySubjectSelect(
                                  day,
                                  period,
                                  e.target.value
                                )
                              }
                              className="border p-2 rounded w-full shadow-md"
                            >
                              <option value="">Select Subject</option>
                              {subjects.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Button
            size="xl"
            className="mt-4 w-fit self-center bg-success border-success hover:border-success hover:bg-white hover:text-success btn-transition"
            onClick={generateTimetable}
          >
            Generate
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default GenerateTimetable;
