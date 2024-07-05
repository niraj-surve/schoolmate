import React, { useEffect, useState } from "react";
import { Button, Card } from "@tremor/react";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { FaEye, FaPenToSquare, FaTrash } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GenerateTimetable from "../../../modals/admin/AddTimetableModal/GenerateTimetable";
import ViewTimetableModal from "../../../modals/admin/ViewTimetableModal/ViewTimetableModal";
import UpdateTimetable from "../../../modals/admin/UpdateTimetableModal/UpdateTimetable";
import DeleteTimetableModal from "../../../modals/admin/DeleteTimetableModal/DeleteTimetableModal";

const Timetable = () => {
  const apiKey = import.meta.env.VITE_API_URL;

  const [addTimetableModal, setAddTimetableModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [updateTimetableModal, setUpdateTimetableModal] = useState(false);
  const [deleteTimetableModal, setDeleteTimetableModal] = useState(false);

  const [data, setData] = useState([]);
  const [timetable, setTimetable] = useState(null);

  const fetchTimetables = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const res = await axios.get(`${apiKey}/admin/get-timetables`, config);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTimetables();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Card className="h-[80vh]">
        <div className="flex flex-col gap-4 h-full">
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setAddTimetableModal(true);
              }}
              icon={PiPaperPlaneTiltFill}
              color="green"
              className="w-fit"
            >
              New Timetable
            </Button>
          </div>
          <Card className="h-full overflow-hidden">
            <div
              id="notices"
              className="rounded-lg overflow-y-auto pr-4 h-full"
            >
              {data.length !== 0 ? (
                data.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between bg-info mb-4 px-4 py-2 rounded-lg"
                  >
                    <div className="flex justify-between w-[calc(100%-7rem)] text-dark font-mulish">
                      <span className="flex gap-4 items-center">
                        <span className="font-medium">
                         Timetable of Standard <span className="font-black">{item.standard}</span>
                        </span>
                      </span>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setPreviewModal(true);
                          setTimetable(item);
                        }}
                        className="mx-2 text-primary"
                      >
                        <FaEye />
                      </button>
                      <button onClick={() => {
                          setUpdateTimetableModal(true);
                          setTimetable(item);
                        }} className="mx-2 text-warning">
                        <FaPenToSquare />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteTimetableModal(true);
                          setTimetable(item);
                        }}
                        className="mx-2 text-danger"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center w-full flex justify-center items-center py-4 text-gray-600">
                  No timetables available. Click on{" "}
                  <Button
                    size="xs"
                    icon={PiPaperPlaneTiltFill}
                    color="green"
                    className="w-fit mx-2 cursor-default hover:border-success"
                    disabled={true}
                  >
                    New Timetable
                  </Button>{" "}
                  to generate a new timetable.
                </p>
              )}
            </div>
          </Card>
        </div>
      </Card>

      {addTimetableModal && (
        <GenerateTimetable
          isOpen={addTimetableModal}
          fetchTimetables={fetchTimetables}
          closeModal={() => setAddTimetableModal(false)}
        />
      )}

      {previewModal && <ViewTimetableModal timetableData={timetable} closeModal={() => setPreviewModal(false)} isOpen={previewModal} />}

      {updateTimetableModal && (
        <UpdateTimetable
          isOpen={updateTimetableModal}
          timetableData={timetable}
          fetchTimetables={fetchTimetables}
          closeModal={() => setUpdateTimetableModal(false)}
        />
      )}

      {deleteTimetableModal && (
        <DeleteTimetableModal
          isOpen={deleteTimetableModal}
          timetableData={timetable}
          fetchTimetables={fetchTimetables}
          closeModal={() => setDeleteTimetableModal(false)}
        />
      )}
    </div>
  );
};

export default Timetable;
